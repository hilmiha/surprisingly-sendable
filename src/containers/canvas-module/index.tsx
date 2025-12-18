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
                .replace('<ol>', `<ol style="color:${blockProps.textColor??''}; padding-left:2em; font-size:${(blockProps.fontSize)?(`${blockProps.fontSize}px`):('1em')}; font-family:${blockProps.fontFamily?fontFamilyDict[blockProps.fontFamily]??'':''}">`)
                .replace('<ul>', `<ul style="color:${blockProps.textColor??''}; padding-left:2em; font-size:${(blockProps.fontSize)?(`${blockProps.fontSize}px`):('1em')}; font-family:${blockProps.fontFamily?fontFamilyDict[blockProps.fontFamily]??'':''}">`)
        }else{
            let tag = blockProps.textType?(blockProps.textType):('p')
            htmlResult = htmlResult
                .replace('<p>', `<${tag} style="word-break: break-all; color:${blockProps.textColor??''}; text-align:${blockProps.textAlign??''}; font-size:${(blockProps.textType==='h1')?(h1SizeGloabl??'2em'):(blockProps.textType==='h2')?(h2SizeGloabl??'1.5em'):(blockProps.textType==='h3')?(h3SizeGloabl??'1.17em'):(blockProps.fontSize)?(`${blockProps.fontSize}px`):('1em')}; font-family:${blockProps.fontFamily?fontFamilyDict[blockProps.fontFamily]??'':''}">`)
                .replace('</p>', `</${tag}>`)
        }

        htmlResult = `<div style="width:100%">${htmlResult}</div>`

        return htmlResult
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
                blockContentHtml = `<div style="display:flex; height:fit-content; width:fit-content"><img src="${blockProps.imageSrcUrl}" style="height:${blockProps.height?(`${blockProps.height}px`):('100%')}; width:${blockProps.width?(`${blockProps.width}px`):('100%')}; border-top-left-radius:${(blockProps.borderRadiusTL)?`${blockProps.borderRadiusTL}px`:'0px'}; border-top-right-radius:${(blockProps.borderRadiusTR)?`${blockProps.borderRadiusTR}px`:'0px'}; border-bottom-left-radius:${(blockProps.borderRadiusBL)?`${blockProps.borderRadiusBL}px`:'0px'}; border-bottom-right-radius:${(blockProps.borderRadiusBR)?`${blockProps.borderRadiusBR}px`:'0px'}"/></div>`
            }else if(blockType==='button'){
                const textContentDelta = blockProps.textDelta
                const textContentHtml = textContentDelta?deltaToHtml(textContentDelta, blockType, blockProps):''
                blockContentHtml = `<a href="${blockProps.url??'#'}" target="_blank" style="background-color:${blockProps.buttonColor??'#f0f0f0'}; padding-top:${blockProps.contentPaddingTop||'0'}px; padding-right:${blockProps.contentPaddingRight||'0'}px; padding-bottom:${blockProps.contentPaddingBottom||'0'}px; padding-left:${blockProps.contentPaddingLeft||'0'}px; border-top-left-radius:${(blockProps.borderRadiusTL)?`${blockProps.borderRadiusTL}px`:'0px'}; border-top-right-radius:${(blockProps.borderRadiusTR)?`${blockProps.borderRadiusTR}px`:'0px'}; border-bottom-left-radius:${(blockProps.borderRadiusBL)?`${blockProps.borderRadiusBL}px`:'0px'}; border-bottom-right-radius:${(blockProps.borderRadiusBR)?`${blockProps.borderRadiusBR}px`:'0px'}; border:0px; color:${blockProps.textColor}; width:${(blockProps.buttonWidth==='full')?('100%'):('auto')}">${textContentHtml}</a>`
            }else{
                blockContentHtml = `<p>????</p>`
            }
            return(`<div style='display:flex; padding-top:${blockProps.paddingTop||'0'}px; padding-right:${blockProps.paddingRight||'0'}px; padding-bottom:${blockProps.paddingBottom||'0'}px; padding-left:${blockProps.paddingLeft||'0'}px; background-color:${blockProps.backgroundColor??'transparent'}; justify-content:${blockProps.justify??'unset'}; align-items:${blockProps.alignment??'unset'}; border-top-left-radius:${(!['button', 'image'].includes(blockValue.type))?`${blockProps.borderRadiusTL??'0'}px`:'0px'}; border-top-right-radius:${(!['button', 'image'].includes(blockValue.type))?`${blockProps.borderRadiusTR??'0'}px`:'0px'}; border-bottom-left-radius:${(!['button', 'image'].includes(blockValue.type))?`${blockProps.borderRadiusBL??'0'}px`:'0px'}; border-bottom-right-radius:${(!['button', 'image'].includes(blockValue.type))?`${blockProps.borderRadiusBR??'0'}px`:'0px'}'>${blockContentHtml}</div>`)
        }
    }

    const htmlValue = useDeepCompareMemo(()=>{
        const root = paperValue['root']
        const rootProps = root.props
        const rootHtml =`<!doctype html>
<html>
    <head>
        <style>
            * {margin:0px; line-height:normal}
            h1 {font-size:${rootProps.h1Size}px;}
            h2 {font-size:${rootProps.h2Size}px;}
            h3 {font-size:${rootProps.h3Size}px;}
        </style>
    </head>
    <body style="font-family:${fontFamilyDict[rootProps.fontFamily??'aria']}; background-color:${rootProps.backdropColor}; display:flex; justify-content:center;">
        <div style="background-color:${rootProps.backgroundColor}; width:600px; margin:40px; height:fit-content">
${root.childIds.map((i)=>peperBlockToHtml(i)).join(`\n`)}
        </div>
    </body>
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
                break;
            case "column":
                tampNewBlock['props']['columnCount'] = '2'
                tampNewBlock['props']['columnGap'] = '10'
                tampNewBlock['props']['alignment'] = 'center'
                tampNewBlock['props']['justify'] = 'center' 
                tampNewBlock['props']['column1Size'] = ''
                tampNewBlock['props']['column2Size'] = ''
                tampNewBlock['props']['column3Size'] = ''
                tampNewBlock['childIds'] = [`${tampId}_clm1`, `${tampId}_clm2`, `${tampId}_clm3`]
                tampPaperValue[`${tampId}_clm1`] = {
                    type:'container',
                    props:{
                        backgroundColor:undefined,
                        paddingTop:'16',
                        paddingRight:'24',
                        paddingBottom:'16',
                        paddingLeft:'24',
                    },
                    childIds:[],
                }
                tampPaperValue[`${tampId}_clm2`] = {
                    type:'container',
                    props:{
                        backgroundColor:undefined,
                        paddingTop:'16',
                        paddingRight:'24',
                        paddingBottom:'16',
                        paddingLeft:'24',
                    },
                    childIds:[],
                }
                tampPaperValue[`${tampId}_clm3`] = {
                    type:'container',
                    props:{
                        backgroundColor:undefined,
                        paddingTop:'16',
                        paddingRight:'24',
                        paddingBottom:'16',
                        paddingLeft:'24',
                    },
                    childIds:[],
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
        console.log(tampPaperValue)
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

    return(
        <CanvasModuleContext.Provider 
            value={{
                isDesktopView,
                setIsDesktopView,
                selectedId, 
                setSelectedId,
                paperValue,
                setPaperValue,
                addNewBlock,
                removeBlock,
                moveUpBlock,
                moveDownBlock,
                triggerRefreshListType, 
                setRefreshListType,
                htmlValue,
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

