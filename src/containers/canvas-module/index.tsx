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
        if(type==='heading'){
            tampNewBlock['props']['textDelta'] = {"ops":[{"insert":"New Title Block\n"}]} as Delta
            tampNewBlock['props']['textColor'] = '#000000'
            tampNewBlock['props']['textType'] = 'h1'
            tampNewBlock['props']['fontFamily'] = 'global'
            tampNewBlock['props']['textAlign'] = 'left'
        }
        if(type==='text'){
            tampNewBlock['props']['textDelta'] = {"ops":[{"insert":"New Text Block\n"}]} as Delta
            tampNewBlock['props']['textColor'] = '#000000'
            tampNewBlock['props']['fontSize'] = '14'
            tampNewBlock['props']['fontFamily'] = 'global'
            tampNewBlock['props']['textAlign'] = 'left'
        }
        if(type==='image'){
            tampNewBlock['props']['imageSrcUrl'] = ''
            tampNewBlock['props']['imageHref'] = ''
            tampNewBlock['props']['height'] = ''
            tampNewBlock['props']['width'] = ''
            tampNewBlock['props']['alignment'] = 'center'
        }
        if(isBefore){
            tampPaperValue[parentId].childIds = insertBefore(tampPaperValue[parentId].childIds, tampId, currentId)
        }else{
            tampPaperValue[parentId].childIds = insertAfter(tampPaperValue[parentId].childIds, tampId, currentId)
        }
        tampPaperValue[tampId] = tampNewBlock
        setPaperValue(tampPaperValue)
    } 

    const removeBlock = (id:string, parentId:string) => {
        setSelectedId('root')
        const tampPaperValue = {...paperValue}
        delete tampPaperValue[id];
        tampPaperValue[parentId].childIds = tampPaperValue[parentId].childIds.filter((i)=>i!==id)
        setPaperValue(tampPaperValue)
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
                    <ResizablePanel maxPanelSize={30} defaultPanelSize={25} minContentWidth="320px">
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

