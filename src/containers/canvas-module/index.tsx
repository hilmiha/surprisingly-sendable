import Resizable from "src/components/ui/resizable"
import ResizableHandle from "src/components/ui/resizable/resizable-handle"
import ResizablePanel from "src/components/ui/resizable/resizable-panel"
import Editor from "./sections/editor"
import { useState } from "react"
import { CanvasModuleContext, type paperBlockType, type paperBlockValueType, type paperValueType } from "./context"
import Properties from "./sections/properties"
import './styles.scss'
import type { Delta } from "quill"

const CanvasModule = () =>{
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
                tampNewBlock['props']['textDelta'] = {"ops":[{"insert":"New Title Block\n"}]} as Delta
                tampNewBlock['props']['textColor'] = '#000000'
                tampNewBlock['props']['textType'] = 'h1'
                tampNewBlock['props']['fontFamily'] = 'global'
                tampNewBlock['props']['textAlign'] = 'left'
                tampNewBlock['props']['borderRadiusTL'] = '0'
                tampNewBlock['props']['borderRadiusTR'] = '0'
                tampNewBlock['props']['borderRadiusBL'] = '0'
                tampNewBlock['props']['borderRadiusBR'] = '0'
                break;
            case "text":
                tampNewBlock['props']['textDelta'] = {"ops":[{"insert":"New Text Block\n"}]} as Delta
                tampNewBlock['props']['textColor'] = '#000000'
                tampNewBlock['props']['fontSize'] = '14'
                tampNewBlock['props']['fontFamily'] = 'global'
                tampNewBlock['props']['textAlign'] = 'left'
                tampNewBlock['props']['borderRadiusTL'] = '0'
                tampNewBlock['props']['borderRadiusTR'] = '0'
                tampNewBlock['props']['borderRadiusBL'] = '0'
                tampNewBlock['props']['borderRadiusBR'] = '0'
                break;
            case "list":
                tampNewBlock['props']['textDelta'] = {"ops":[{"insert":"New List"},{"attributes":{"list":"bullet"},"insert":"\n"}]} as Delta
                tampNewBlock['props']['listType'] = 'bullet'
                tampNewBlock['props']['textColor'] = '#000000'
                tampNewBlock['props']['fontSize'] = '14'
                tampNewBlock['props']['fontFamily'] = 'global'
                tampNewBlock['props']['borderRadiusTL'] = '0'
                tampNewBlock['props']['borderRadiusTR'] = '0'
                tampNewBlock['props']['borderRadiusBL'] = '0'
                tampNewBlock['props']['borderRadiusBR'] = '0'
                break;
            case "image":
                tampNewBlock['props']['imageSrcUrl'] = ''
                tampNewBlock['props']['imageHref'] = ''
                tampNewBlock['props']['height'] = ''
                tampNewBlock['props']['width'] = ''
                tampNewBlock['props']['alignment'] = 'center'
                tampNewBlock['props']['borderRadiusTL'] = '0'
                tampNewBlock['props']['borderRadiusTR'] = '0'
                tampNewBlock['props']['borderRadiusBL'] = '0'
                tampNewBlock['props']['borderRadiusBR'] = '0'
                break;
            case "button":
                tampNewBlock['props']['textDelta'] = {"ops":[{"attributes":{"bold":true},"insert":"Button"},{"insert":"\n"}]} as Delta
                tampNewBlock['props']['fontSize'] = '14'
                tampNewBlock['props']['url'] = ''
                tampNewBlock['props']['alignment'] = 'center'
                tampNewBlock['props']['buttonWidth'] = 'auto'
                tampNewBlock['props']['buttonColor'] = '#0F147A'
                tampNewBlock['props']['textColor'] = '#FFFFFF'
                tampNewBlock['props']['borderRadiusTL'] = '0'
                tampNewBlock['props']['borderRadiusTR'] = '0'
                tampNewBlock['props']['borderRadiusBL'] = '0'
                tampNewBlock['props']['borderRadiusBR'] = '0'
                tampNewBlock['props']['contentPaddingTop'] = '12'
                tampNewBlock['props']['contentPaddingBottom'] = '12'
                tampNewBlock['props']['contentPaddingLeft'] = '24'
                tampNewBlock['props']['contentPaddingRight'] = '24'
                break;
            case "container":
                break;
            case "column":
                tampNewBlock['props']['columnCount'] = '2'
                tampNewBlock['props']['alignment'] = 'center'
                tampNewBlock['childIds'] = [`${tampId}_clm1`, `${tampId}_clm2`]
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
        <CanvasModuleContext.Provider value={{
            selectedId, 
            setSelectedId,
            paperValue,
            setPaperValue,
            addNewBlock,
            removeBlock,
            moveUpBlock,
            moveDownBlock,
            triggerRefreshListType, 
            setRefreshListType
        }}>
            <div
                style={{
                    height:"100dvh",
                    maxHeight:"100dvh",
                    display:'grid',
                    gridTemplateRows:'max-content 1fr'
                }}
            >
                <div>
                    <div
                        style={{
                            backgroundColor:'var(--clr-orange-200)',
                            padding:'var(--space-100) var(--space-200)'
                        }}
                    >
                        <p style={{textAlign:'center'}}><strong>This project is still in development 🚧</strong></p>
                    </div>
                </div>
                <Resizable direction="horizontal">
                    <ResizablePanel defaultPanelSize={75} minContentWidth="720px">
                        <><Editor/></>
                    </ResizablePanel>
                    <ResizableHandle direction="horizontal"/>
                    <ResizablePanel defaultPanelSize={30} minPanelSize={30} maxPanelSize={50}  minContentWidth="320px">
                        <div className="properties-panel-container">
                            <Properties/>
                        </div>
                    </ResizablePanel>
                </Resizable>
            </div>
            
        </CanvasModuleContext.Provider>
    )
}

export default CanvasModule

