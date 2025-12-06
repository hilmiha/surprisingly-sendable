import { useState } from "react"
import { CanvasModuleContext, type paperBlockType, type paperBlockValueType, type paperValueType } from "./context"
import './styles.scss'
import SuprisinglySendableTemplate from "./templates/suprisingly-sendable-template"
import EditorSection from "./sections/editor-section"
import PropertiesSection from "./sections/properties-section"
import { blockHeadingDefaultProps } from "./components/block-heading/default-props"
import { blockTextDefaultProps } from "./components/block-text/default-props"
import { blockListDefaultProps } from "./components/block-list/default-props"
import { blockImageDefaultProps } from "./components/block-image/default-props"
import { blockButtonDefaultProps } from "./components/block-button/default-props"

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

