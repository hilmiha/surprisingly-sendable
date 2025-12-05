import type { Delta } from "quill"
import { useCanvasModule, } from "../../context"
import { useMemo } from "react"
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html"
import { fontFamilyDict } from "../../data/font-family"

const TextContentView = ({
    blockId
}:{
    blockId:string
}) =>{
    const {
        paperValue,
    } = useCanvasModule()

    const blockData = paperValue[blockId]
    const props = blockData.props
    const content = props.textDelta
    const type = blockData.type


    const h1SizeGloabl = useMemo(()=>{
        return paperValue['root']['props']['h1Size']?`${paperValue['root']['props']['h1Size']}px`:undefined
    },[paperValue['root']['props']['h1Size']])
    const h2SizeGloabl = useMemo(()=>{
        return paperValue['root']['props']['h2Size']?`${paperValue['root']['props']['h2Size']}px`:undefined
    },[paperValue['root']['props']['h2Size']])
    const h3SizeGloabl = useMemo(()=>{
        return paperValue['root']['props']['h3Size']?`${paperValue['root']['props']['h3Size']}px`:undefined
    },[paperValue['root']['props']['h3Size']])

    const deltaToHtml = (delta:Delta) => {
        const converter = new QuillDeltaToHtmlConverter(delta.ops, {
            inlineStyles: true, // Optional: makes html more styled without CSS
        });
        return converter.convert();
    };
    
    const contentHtml = useMemo(()=>{
        if(content){
            let htmlResult = deltaToHtml(content)
            if(type==='list'){
                htmlResult = htmlResult
                    .replace('<ol>', `<ol style="color:${props.textColor??''}; padding-left:2em; font-size:${(props.textType==='h1')?(h1SizeGloabl??'2em'):(props.textType==='h2')?(h2SizeGloabl??'1.5em'):(props.textType==='h3')?(h3SizeGloabl??'1.17em'):(props.fontSize)?(`${props.fontSize}px`):('1em')}; font-family:${props.fontFamily?fontFamilyDict[props.fontFamily]??'':''}">`)
                    .replace('<ul>', `<ul style="color:${props.textColor??''}; padding-left:2em; font-size:${(props.textType==='h1')?(h1SizeGloabl??'2em'):(props.textType==='h2')?(h2SizeGloabl??'1.5em'):(props.textType==='h3')?(h3SizeGloabl??'1.17em'):(props.fontSize)?(`${props.fontSize}px`):('1em')}; font-family:${props.fontFamily?fontFamilyDict[props.fontFamily]??'':''}">`)
            }else{
                let tag = props.textType?(props.textType):('p')
                htmlResult = htmlResult
                    .replace('<p>', `<${tag} style="color:${props.textColor??''}; text-align:${props.textAlign??''}; font-size:${(props.textType==='h1')?(h1SizeGloabl??'2em'):(props.textType==='h2')?(h2SizeGloabl??'1.5em'):(props.textType==='h3')?(h3SizeGloabl??'1.17em'):(props.fontSize)?(`${props.fontSize}px`):('1em')}; font-family:${props.fontFamily?fontFamilyDict[props.fontFamily]??'':''}">`)
                    .replace('</p>', `</${tag}>`)
            }
            return htmlResult
        }else{
            return '<p></p>'
        }
    },[content, props, h1SizeGloabl, h2SizeGloabl, h3SizeGloabl])

    return(
        <div 
            style={{width:'100%'}}
            dangerouslySetInnerHTML={{ __html: contentHtml }} 
        />
    )
}

export default TextContentView