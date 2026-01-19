import { useState } from "react"
import { CanvasModuleContext, type paperBlockPropsType, type paperBlockType, type paperBlockValueType, type paperValueType } from "./context"
import './styles.scss'
import SuprisinglySendableTemplate from "./templates/suprisingly-sendable-template"
import EditorSection from "./sections/editor-section"
import PropertiesSection from "./sections/properties-section"
import { blockHeadingDefaultProps } from "./components/block-heading/default-props"
import { blockTextDefaultProps } from "./components/block-text/default-props"
import { blockListDefaultProps } from "./components/block-list/default-props"
import { blockImageDefaultProps } from "./components/block-image/default-props"
import { blockButtonDefaultProps } from "./components/block-button/default-props"
import { useDeepCompareMemo } from "src/hook/useDeepCompareMemo"
import { fontFamilyDict } from "./data/font-family"
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html"
import type { Delta } from "quill"

const CanvasModule = () =>{
    const [isDesktopView, setIsDesktopView] = useState(true)
    const [isShowHidden, setIsShowHidden] = useState(true)
    const [selectedId, setSelectedId] = useState('root')
    const [paperValue, setPaperValue] = useState<paperValueType>({
        root:{
            type:'main',
            props:{
                "backdropColor":'#FFFFFF',
                "backgroundColor":'#FFFFFF',
                "fontFamily":'aria',
                "h1Size":'32',
                "h2Size":'24',
                "h3Size":'20',
            	"width":'600',
            },
            childIds:[]
        }
    })

    //Start converting to HTML ==================================
    const deltaToHtml = (delta:Delta, type:paperBlockType, blockProps:paperBlockPropsType) => {
        const converter = new QuillDeltaToHtmlConverter(delta.ops, {
            inlineStyles: true, // Optional: makes html more styled without CSS
        });
        let htmlResult = converter.convert();

        const h1SizeGloabl = paperValue['root']['props']['h1Size']?`${paperValue['root']['props']['h1Size']}px`:undefined
        const h2SizeGloabl = paperValue['root']['props']['h2Size']?`${paperValue['root']['props']['h2Size']}px`:undefined
        const h3SizeGloabl = paperValue['root']['props']['h3Size']?`${paperValue['root']['props']['h3Size']}px`:undefined

        if(type==='list'){
            htmlResult = htmlResult
            .replace('<ul>', `<ul style="color:${blockProps.textColor??''}; padding-left:1.5em; font-size:${(blockProps.fontSize)?(`${blockProps.fontSize}px`):('12px')}; ${blockProps.fontFamily?`font-family:${(blockProps.fontFamily&&blockProps.fontFamily!=='global')?fontFamilyDict[blockProps.fontFamily]??'':''}`:''}">`)
            .replace('<ol>', `<ol style="color:${blockProps.textColor??''}; padding-left:1.5em; font-size:${(blockProps.fontSize)?(`${blockProps.fontSize}px`):('12px')}; ${blockProps.fontFamily?`font-family:${(blockProps.fontFamily&&blockProps.fontFamily!=='global')?fontFamilyDict[blockProps.fontFamily]??'':''}`:''}">`)
        }else{
            let tag = blockProps.textType?(blockProps.textType):('p')
            htmlResult = htmlResult
                .replace('<p>', `<${tag} style="word-break: break-word; color:${blockProps.textColor??''}; text-align:${blockProps.textAlign??''}; font-size:${(blockProps.textType==='h1')?(h1SizeGloabl??'32px'):(blockProps.textType==='h2')?(h2SizeGloabl??'24px'):(blockProps.textType==='h3')?(h3SizeGloabl??'20px'):(blockProps.fontSize)?(`${blockProps.fontSize}px`):('12px')}; ${(blockProps.fontFamily&&blockProps.fontFamily!=='global')?`font-family:${blockProps.fontFamily?fontFamilyDict[blockProps.fontFamily]??'':''}`:''}">`)
                .replace('</p>', `</${tag}>`)
        }

        htmlResult = `${htmlResult}`

        return htmlResult
    };
    const getColumnHtmlY = (id: string, width: string, alignment: string) => {
        const blockValue = paperValue[id];
        let blockFinalString = '';

        blockValue.childIds.forEach((j) => {
            blockFinalString += peperBlockToHtml(j) || '';
        });

        // Use valing="top" to ensure content starts at the top of the column
        return `<td style="box-sizing:content-box; vertical-align:${alignment}; padding-left:0; padding-right:0px; ${width?(`width:${width}`):('')}">
                    ${blockFinalString}
                </td>`;
    };
    
    const wrapWithVisibility = (content: string, visibility: 'both' | 'hide-mobile' | 'hide-desktop') => {
        if (visibility === 'hide-mobile') {
            return `<div class="hide-mobile">${content}</div>`;
        }
        
        if (visibility === 'hide-desktop') {
            // Wrap in MSO comments to ensure Outlook Desktop hides it
            return `
            <div class="hide-desktop show-mobile" style="display:none; max-height:0px; overflow:hidden;">
                ${content}
            </div>
            `;
        }

        return content; // 'both'
    };

    const peperBlockToHtml = (id:string) =>{
        const blockValue = paperValue[id]
        if(blockValue){
            

            const blockProps = blockValue.props
            const blockType = blockValue.type
            let blockContentHtml = ''

            if(
                blockType==='heading'||
                blockType==='text'||
                blockType==='list'
            ){
                const content = blockProps.textDelta
                blockContentHtml = content?deltaToHtml(content, blockType, blockProps):''
            }else if(blockType==='image'){
                blockContentHtml = `<div style="text-align:${blockProps.justify}"><a ${blockProps.url ? `href="${blockProps.url}" target="_blank"` : ``} style="display:inline-block; text-decoration:none;"><img src="${blockProps.imageSrcUrl}" style="text-align:center; vertical-align:middle; display:inline-block; max-width:100%; height:${blockProps.height?(`${blockProps.height}px`):('100%')}; width:${blockProps.width?(`${blockProps.width}px`):('100%')}; border-radius:${blockProps.borderRadiusTL||0}px ${blockProps.borderRadiusTR||0}px ${blockProps.borderRadiusBR||0}px ${blockProps.borderRadiusBL||0}px;"/></a></div>`
            }else if(blockType==='button'){
                const textContentDelta = blockProps.textDelta
                const textContentHtml = textContentDelta?deltaToHtml(textContentDelta, blockType, blockProps):''
                blockContentHtml = `<div style="text-align:${blockProps.textAlign}"><a href="${blockProps.url??'#'}" target="_blank" style="display:${blockProps.buttonWidth === 'full' ? 'block' : 'inline-block'};background-color:${blockProps.buttonColor??'transparent'}; padding-top:${blockProps.contentPaddingTop||'0'}px; padding-right:${blockProps.contentPaddingRight||'0'}px; padding-bottom:${blockProps.contentPaddingBottom||'0'}px; padding-left:${blockProps.contentPaddingLeft||'0'}px; border-top-left-radius:${(blockProps.borderRadiusTL)?`${blockProps.borderRadiusTL}px`:'0px'}; border-top-right-radius:${(blockProps.borderRadiusTR)?`${blockProps.borderRadiusTR}px`:'0px'}; border-bottom-left-radius:${(blockProps.borderRadiusBL)?`${blockProps.borderRadiusBL}px`:'0px'}; border-bottom-right-radius:${(blockProps.borderRadiusBR)?`${blockProps.borderRadiusBR}px`:'0px'}; border:0px; color:${blockProps.textColor}; text-decoration:none">${textContentHtml}</a></div>`
            }else if(blockType==='container'){
                blockContentHtml = `<div>${blockValue.childIds.map((i)=>(peperBlockToHtml(i))).join('')}</div>`
            }else if(blockType==='column'){
                // Helper to determine width
                const getWidth = (index: number, props: paperBlockPropsType) => {
                    const size = props[`column${index + 1}Size`];
                    if(size){
                        return `${size}px`
                    }
                    return ''
                };

                const columnCount = parseInt(blockProps.columnCount || '1');
                
                let columnsHtml = '';

                // Generate each <td> based on the column count
                for (let i = 0; i < columnCount; i++) {
                    const columnId = blockValue.childIds[i];
                    if (columnId) {
                        const width = getWidth(i, blockProps);
                        columnsHtml += getColumnHtmlY(columnId, width, `${(blockProps.alignment==='start'?('top'):(blockProps.alignment==='end')?('bottom'):('middle'))}`);
                    }
                }

                // Wrap everything in a table
                blockContentHtml = `
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;border-collapse:collapse"><tr>${columnsHtml}</tr></table>`;
            }else if(blockType==='spacer'){
                blockContentHtml = `<div style="display:block; height:${blockProps.height?(`${blockProps.height}px`):('0px')}"></div>`
            }else if(blockType==='devider'){
                blockContentHtml = `<div style="display:block"><div style="border-bottom:${blockProps.height?(`${blockProps.height}px`):('0px')} solid ${blockProps.deviderColor??'transparent'};width:100%;"></div></div>`
            }else{
                blockContentHtml = `<p>????</p>`
            }
            
            blockContentHtml = `<div style='padding-top:${blockProps.paddingTop||'0'}px; padding-right:${blockProps.paddingRight||'0'}px; padding-bottom:${blockProps.paddingBottom||'0'}px; padding-left:${blockProps.paddingLeft||'0'}px; background-color:${blockProps.backgroundColor??'transparent'}; border-top-left-radius:${(!['button', 'image'].includes(blockValue.type))?`${blockProps.borderRadiusTL??'0'}px`:'0px'}; border-top-right-radius:${(!['button', 'image'].includes(blockValue.type))?`${blockProps.borderRadiusTR??'0'}px`:'0px'}; border-bottom-left-radius:${(!['button', 'image'].includes(blockValue.type))?`${blockProps.borderRadiusBL??'0'}px`:'0px'}; border-bottom-right-radius:${(!['button', 'image'].includes(blockValue.type))?`${blockProps.borderRadiusBR??'0'}px`:'0px'}; border-top:${blockProps.borderTop||'0'}px solid ${blockProps.borderColor??'transparent'}; border-bottom:${blockProps.borderBottom||'0'}px solid ${blockProps.borderColor??'transparent'}; border-left:${blockProps.borderLeft||'0'}px solid ${blockProps.borderColor??'transparent'}; border-right:${blockProps.borderRight||'0'}px solid ${blockProps.borderColor??'transparent'}'>${blockContentHtml}</div>`
            if(blockProps.visibility){
                blockContentHtml = wrapWithVisibility(blockContentHtml, blockProps.visibility)
            }
            return(blockContentHtml)
        }
    }

    const htmlValue = useDeepCompareMemo(()=>{
        const root = paperValue['root']
        const rootProps = root.props
        const rootHtml =`<!doctype html>
<html>
    <head>
        <style>
            * {margin:0px; line-height:normal;}
            h1 {font-size:32px;}
            h2 {font-size:24px;}
            h3 {font-size:20px;}
            p {font-size:12px;}

            /* Hide on Mobile */
            @media only screen and (max-width: 600px) {
                .hide-mobile {
                    display: none !important;
                }
                .show-mobile {
                    display: block !important; /* or table, depending on element */
                    max-height: none !important;
                    overflow: visible !important;
                }
            }

            /* Hide on Desktop */
            .hide-desktop {
                display: none; /* Hidden by default on desktop */
                max-height: 0px;
                overflow: hidden;
            }
        </style>
    </head>
    <body>
        <div style="background-color:${rootProps.backdropColor||'transparent'}; height:fit-content; width:100%; font-family:${fontFamilyDict[rootProps.fontFamily ?? 'aria']};">
            <table 
                role="presentation" 
                align="center" 
                width="100%" 
                cellpadding="0" 
                cellspacing="0" 
                border="0"
                style="margin:0px auto; max-width:600px; background-color:${rootProps.backgroundColor||'transparent'}"
            >
                <tbody>
                    <tr>
                        <td>
<!-- Main email content -->
${root.childIds.map(i => peperBlockToHtml(i)).join('\n')}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    <body>
</html>`
        return rootHtml
    },[JSON.stringify(paperValue)])
    //End converting to HTML ==================================

    const [triggerRefreshListType, setRefreshListType] = useState<0|1>(0)

    function insertBefore(arr:string[], valueToInsert:string, beforeValue:string) {
        const index = arr.indexOf(beforeValue);
        arr.splice(index === -1 ? arr.length : index, 0, valueToInsert);
        return arr;
    }

    function insertAfter(arr:string[], valueToInsert:string, afterValue:string) {
        const index = arr.indexOf(afterValue);
        const insertIndex = index === -1 ? arr.length : index + 1;
        arr.splice(insertIndex, 0, valueToInsert);
        return arr;
    }

    function moveUp(arr:string[], value:string) {
        const index = arr.indexOf(value);
        if (index > 0) {
            [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
        }
        return arr;
    }

    function moveDown(arr:string[], value:string) {
        const index = arr.indexOf(value);
        if (index !== -1 && index < arr.length - 1) {
            [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
        }
        return arr;
    }

    const addNewBlock = (type:paperBlockType, currentId:string, parentId:string, isBefore?:boolean) =>{
        const tampPaperValue:paperValueType = {...paperValue}
        const tampId = `block_${new Date().getTime()}`
        const tampNewBlock:paperBlockValueType = {
            type:type,
            props:{
                backgroundColor:undefined,
                paddingTop:'16',
                paddingRight:'24',
                paddingBottom:'16',
                paddingLeft:'24',
            },
            childIds:[],
        }
        switch (type) {
            case "heading":
                tampNewBlock['props'] = {
                    ...tampNewBlock['props'],
                    ...blockHeadingDefaultProps
                }
                break;
            case "text":
                tampNewBlock['props'] = {
                    ...tampNewBlock['props'],
                    ...blockTextDefaultProps
                }
                break;
            case "list":
                tampNewBlock['props'] = {
                    ...tampNewBlock['props'],
                    ...blockListDefaultProps
                }
                break;
            case "image":
                tampNewBlock['props'] = {
                    ...tampNewBlock['props'],
                    ...blockImageDefaultProps
                }
                break;
            case "button":
                tampNewBlock['props'] = {
                    ...tampNewBlock['props'],
                    ...blockButtonDefaultProps
                }
                break;
            case "container":
                tampNewBlock['props'] = {
                    ...tampNewBlock['props'],
                    borderRadiusTL: '0',
                    borderRadiusTR: '0',
                    borderRadiusBL: '0',
                    borderRadiusBR: '0',
                    borderColor:undefined,
                    borderTop:'1',
                    borderBottom:'1',
                    borderLeft:'1',
                    borderRight:'1',
                    'visibility': 'both',
                }
                break;
            case "column":
                tampNewBlock['props']['columnCount'] = '2'
                tampNewBlock['props']['columnGap'] = '2'
                tampNewBlock['props']['alignment'] = 'center'
                tampNewBlock['props']['justify'] = 'center' 
                tampNewBlock['props']['column1Size'] = ''
                tampNewBlock['props']['column2Size'] = ''
                tampNewBlock['props']['column3Size'] = ''
                tampNewBlock['props']['visibility'] = 'both'
                tampNewBlock['childIds'] = [`${tampId}_clm1`, `${tampId}_clm2`, `${tampId}_clm3`]
                tampPaperValue[`${tampId}_clm1`] = {
                    type:'container',
                    props:{},
                    childIds:[],
                }
                tampPaperValue[`${tampId}_clm2`] = {
                    type:'container',
                    props:{},
                    childIds:[],
                }
                tampPaperValue[`${tampId}_clm3`] = {
                    type:'container',
                    props:{},
                    childIds:[],
                }
                break;
            case "devider":
                tampNewBlock['props'] = {
                    deviderColor:'#F1F1F1',
                    height:'2',
                    paddingTop:'16',
                    paddingRight:'0',
                    paddingBottom:'16',
                    paddingLeft:'0',
                    'visibility': 'both',
                }
                break;
            case "spacer":
                tampNewBlock['props'] = {
                    backgroundColor:undefined,
                    height:'40',
                    'visibility': 'both',
                }
                break;
            default:
                break;
        }
        
        if(isBefore){
            tampPaperValue[parentId].childIds = insertBefore(tampPaperValue[parentId].childIds, tampId, currentId)
        }else{
            tampPaperValue[parentId].childIds = insertAfter(tampPaperValue[parentId].childIds, tampId, currentId)
        }
        tampPaperValue[tampId] = tampNewBlock
        setPaperValue(tampPaperValue)
    } 

    function removeBlock(targetId:string) {
        // Clone so we don't mutate the original
        const newBlocks = { ...paperValue };

        // Helper: recursively delete children
        function deleteRecursively(id:string) {
            const block = newBlocks[id];
            if (!block) return;

            // Delete all its children first
            if (block.childIds && block.childIds.length > 0) {
                for (const childId of block.childIds) {
                    deleteRecursively(childId);
                }
            }

            // Then delete itself
            delete newBlocks[id];
        }

        // Find the parent (to remove the reference from childIds)
        for (const [_, block] of Object.entries(newBlocks)) {
            if (block.childIds?.includes(targetId)) {
                block.childIds = block.childIds.filter(id => id !== targetId);
            }
        }

        // Recursively delete the target block and descendants
        deleteRecursively(targetId);

        setPaperValue(newBlocks)
        setSelectedId('root')
    }

    const moveUpBlock = (id:string, parentId:string) =>{
        const tampPaperValue = {...paperValue}
        tampPaperValue[parentId].childIds = moveUp(tampPaperValue[parentId].childIds, id)
        setPaperValue(tampPaperValue)
    }

    const moveDownBlock = (id:string, parentId:string) =>{
        const tampPaperValue = {...paperValue}
        tampPaperValue[parentId].childIds = moveDown(tampPaperValue[parentId].childIds, id)
        setPaperValue(tampPaperValue)
    }

    // const copyDownBlock = (id:string, parentId:string) =>{
    //     const tampPaperValue = {...paperValue}
    //     const tampNewId = `block_${new Date().getTime()}`
    //     tampPaperValue[tampNewId] = cloneDeep(tampPaperValue[id])
        
    //     const tampNewParentChild:string[] = []
        // tampPaperValue[parentId].childIds.forEach((i)=>{
        //     tampNewParentChild.push(i)
        //     if(i===id){
        //         tampNewParentChild.push(tampNewId)
        //     }
        // })
        // tampPaperValue[parentId].childIds = tampNewParentChild
    //     setPaperValue(tampPaperValue)
    // }
    const duplicateBlock = (
        blockId: string,
        blocks: paperValueType
    ) => {
        const newBlocks: paperValueType = {};
        const idMap: Map<string, string> = new Map();

        let idCounter = 0;
        const generateUniqueId = (): string => {
            const timestamp = new Date().getTime();
            idCounter++;
            return `block_${timestamp}_${idCounter}`;
        };

        // Recursive function to clone a block and all its children
        const cloneBlock = (originalId: string): string => {
            // If we already cloned this block, return the mapped ID
            if (idMap.has(originalId)) {
                return idMap.get(originalId)!;
            }

            const originalBlock = blocks[originalId];
            if (!originalBlock) {
                console.warn(`Block ${originalId} not found`);
                return originalId;
            }

            // Generate new unique ID
            const newId = generateUniqueId();
            idMap.set(originalId, newId);

            // Clone the block structure
            const clonedBlock = {
                type: originalBlock.type,
                props: { ...originalBlock.props },
                childIds: [] as string[],
            };

            // Recursively clone all children
            if (originalBlock.childIds && originalBlock.childIds.length > 0) {
                clonedBlock.childIds = originalBlock.childIds.map(childId => cloneBlock(childId));
            }

            newBlocks[newId] = clonedBlock;
            return newId;
        };

        // Start the cloning process
        const newRootId = cloneBlock(blockId);

        console.log(newBlocks)
        console.log(newRootId)
        return {newRootId, newBlocks}
    };
    const copyDownBlock = (id:string, parentId:string) =>{
        console.log(parentId)
        const {
            newRootId,
            newBlocks
        } = duplicateBlock(id, paperValue)

        const tampPaperValue = {...paperValue, ...newBlocks}
        const tampNewParentChild:string[] = []
        tampPaperValue[parentId].childIds.forEach((i)=>{
            tampNewParentChild.push(i)
            if(i===id){
                tampNewParentChild.push(newRootId)
            }
        })
        tampPaperValue[parentId].childIds = tampNewParentChild

        setPaperValue(tampPaperValue)
    }

    const [draggedContent, setDraggedContent] = useState<{id:string, parentId:string} | null>(null);

    return(
        <CanvasModuleContext.Provider 
            value={{
                isDesktopView,
                setIsDesktopView,
                isShowHidden,
                setIsShowHidden,
                selectedId, 
                setSelectedId,
                paperValue,
                setPaperValue,
                addNewBlock,
                removeBlock,
                moveUpBlock,
                moveDownBlock,
                copyDownBlock,
                triggerRefreshListType, 
                setRefreshListType,
                htmlValue,

                draggedContent, 
                setDraggedContent,
            }}
        >
            <SuprisinglySendableTemplate
                propertiesSection={<PropertiesSection/>}
            >
                <EditorSection/>
            </SuprisinglySendableTemplate>
        </CanvasModuleContext.Provider>
    )
}

export default CanvasModule

