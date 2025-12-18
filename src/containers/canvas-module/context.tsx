import type { Delta } from "quill"
import { createContext, useContext } from "react"
export type paperBlockType = 'heading'|'text'|'list'|'image'|'button'|'container'|'spacer'|'main'|'column'
export type paperBlockPropsType = {
    "backdropColor"?:string,
    "h1Size"?:string,
    "h2Size"?:string,
    "h3Size"?:string,

    "backgroundColor"?:string,
    "textDelta"?:Delta,
    "textColor"?:string,
    "textType"?:string,
    "textAlign"?:'left' | "right" | 'center' | 'justify',
    "fontFamily"?:string,
    "fontSize"?:string,

    "textContent"?:string,
    "url"?:string,
    "buttonWidth"?:'full' | 'auto',
    "buttonColor"?:string
    "borderRadiusTL"?:string,
    "borderRadiusTR"?:string,
    "borderRadiusBL"?:string,
    "borderRadiusBR"?:string,

    "listType"?:'ordered'|'bullet'

    "alignment"?:'start' | 'center' | 'end',
    "justify"?:'left' | 'center' | 'right',
    "imageSrcUrl"?:string,
    "imageHref"?:string,
    
    "height"?:string,
    "width"?:string,

    "contentPaddingTop"?:string,
    "contentPaddingRight"?:string,
    "contentPaddingBottom"?:string,
    "contentPaddingLeft"?:string,

    "paddingTop"?:string,
    "paddingRight"?:string,
    "paddingBottom"?:string,
    "paddingLeft"?:string,

    "columnCount"?:string,
    "columnGap"?:string,
    "column1Size"?:string,
    "column2Size"?:string,
    "column3Size"?:string,
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
    isDesktopView:boolean, 
    setIsDesktopView:React.Dispatch<React.SetStateAction<boolean>>,
    selectedId: string, 
    setSelectedId: React.Dispatch<React.SetStateAction<string>>,
    paperValue: paperValueType,
    setPaperValue: React.Dispatch<React.SetStateAction<paperValueType>>,
    addNewBlock: (type:paperBlockType, currentId:string, parentId:string, isBefore?:boolean) => void
    removeBlock: (id:string) => void
    moveUpBlock: (id:string, parentId:string) => void
    moveDownBlock: (id:string, parentId:string) => void

    triggerRefreshListType: 0 | 1, 
    setRefreshListType: React.Dispatch<React.SetStateAction<0 | 1>>,

    htmlValue:string
}
export const CanvasModuleContext = createContext<CanvasModuleContextValue | null>(null);

export const useCanvasModule = () => {
    const ctx = useContext(CanvasModuleContext);
    if (!ctx) throw new Error('useDocModule must be used inside <CanvasModuleContext>'); //after i edit some of my code and save it. react hot reload. i move to page taht use this context it gives this error. it back to normal if i refresh the page. error only when hot reload
    return ctx;
};