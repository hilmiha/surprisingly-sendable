import { useEffect, useMemo, useState } from "react"
import { useCanvasModule } from "../../context"
import type { Delta } from "quill"
import Wysiwyg from "src/components/ui/wysiwyg"
import { fontFamilyDict } from "../../data/font-family"

const TextContentEditor = ({
    blockId,
}:{
    blockId:string,
}) =>{
    const {
        paperValue,
        setPaperValue,
    } = useCanvasModule()

    const blockData = paperValue[blockId]
    const props = blockData.props
    const type = blockData.type

    const [deltaValue, setDeltaValue] = useState<Delta|undefined>(props.textDelta)
    
    useEffect(()=>{
        if(JSON.stringify(deltaValue)!==JSON.stringify(blockData['props']['textDelta'])){
            console.log('update from block')
            setPaperValue((prev)=>{
                const tamp = {...prev}
                tamp[blockId]['props']['textDelta'] = deltaValue
                return tamp
            })
        }
        
    },[JSON.stringify(deltaValue)])

    const fontGloabl = useMemo(()=>{
        return paperValue['root']['props']['fontFamily']??''
    },[])
    const h1SizeGloabl = useMemo(()=>{
        return paperValue['root']['props']['h1Size']?`${paperValue['root']['props']['h1Size']}px`:undefined
    },[])
    const h2SizeGloabl = useMemo(()=>{
        return paperValue['root']['props']['h2Size']?`${paperValue['root']['props']['h2Size']}px`:undefined
    },[])
    const h3SizeGloabl = useMemo(()=>{
        return paperValue['root']['props']['h3Size']?`${paperValue['root']['props']['h3Size']}px`:undefined
    },[])

    return(<Wysiwyg 
        className={`block-wysiwyg text-align-${props.textAlign}`} 
        type='floating' 
        txtPlaceholder='Enter text...'
        value={deltaValue}
        onChange={(newValue)=>{setDeltaValue(newValue)}}
        config={{
            moduleList:['bold', 'italic', 'underline', 'strike', 'subscript', 'superscript', 'color', 'link', 'clear'],
            disabledFormat:type==='list'?(['indent']):(['indent', 'list']),
            isDisableNewLine:(type==='text' || type==='list')?(false):(true),
            isListOnly:type==='list'
        }}
        style={{
            editorBox:{
                color:props.textColor,
                fontFamily:(props.fontFamily)?(props.fontFamily==='global')?(fontFamilyDict[fontGloabl]):(fontFamilyDict[props.fontFamily]):undefined,
                fontSize:(props.textType==='h1')?(h1SizeGloabl??'32px'):(props.textType==='h2')?(h2SizeGloabl??'24px'):(props.textType==='h3')?(h3SizeGloabl??'20'):(props.fontSize)?(`${props.fontSize}px`):('12px'),
                fontWeight:(props.textType)?('bold'):(undefined),
            }
        }}
    />)
}

export default TextContentEditor