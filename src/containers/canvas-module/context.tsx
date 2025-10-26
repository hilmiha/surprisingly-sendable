import type { Delta } from "quill"
import { createContext, useContext } from "react"
export type paperBlockType = 'text'|'image'|'button'|'spacer'|'main'
export type paperBlockPropsType = {
    "backdropColor"?:string,
    "backgroundColor"?:string,
    "textDelta"?:Delta,
    "textColor"?:string,
    "textType"?:string,
    "fontFamily"?:string,
    "fontSize"?:string,

    "imageSrcUrl"?:string,
    "imageHref"?:string,
    
    "height"?:string,
    "width"?:string,

    "paddingTop"?:string,
    "paddingRight"?:string,
    "paddingBottom"?:string,
    "paddingLeft"?:string,
    "alignment"?:'start' | 'center' | ' end',
    [key:string]:any
}
export type paperBlockValueType = {
    "type":paperBlockType,
    "props":paperBlockPropsType,
    "childIds":string[]
}
export type paperValueType = {
    [key:string]:paperBlockValueType
}

//Context
export interface CanvasModuleContextValue {
    selectedId: string, 
    setSelectedId: React.Dispatch<React.SetStateAction<string>>,
    paperValue: paperValueType,
    setPaperValue: React.Dispatch<React.SetStateAction<paperValueType>>,
    addNewBlock: (type:paperBlockType, currentId:string, parentId:string, isBefore?:boolean) => void
    removeBlock: (id:string, parentId:string) => void
    moveUpBlock: (id:string, parentId:string) => void
    moveDownBlock: (id:string, parentId:string) => void
}
export const CanvasModuleContext = createContext<CanvasModuleContextValue | null>(null);

export const useCanvasModule = () => {
    const ctx = useContext(CanvasModuleContext);
    if (!ctx) throw new Error('useDocModule must be used inside <CanvasModuleContext>'); //after i edit some of my code and save it. react hot reload. i move to page taht use this context it gives this error. it back to normal if i refresh the page. error only when hot reload
    return ctx;
};