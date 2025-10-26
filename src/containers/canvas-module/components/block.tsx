import { useEffect, useMemo, useState } from 'react'
import './block.scss'
import Mover from './mover'
import { useCanvasModule, type paperBlockPropsType } from '../context'
import { PiImageBold } from 'react-icons/pi'
import clsx from 'clsx'
import type { Delta } from 'quill'
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { fontFamilyDict } from '../data/font-family'
import Wysiwyg from 'src/components/ui/wysiwyg'
import Adder from './adder'

const Block = ({
    id = "",
    parentId = 'root'
}:{
    id:string,
    parentId:string
}) =>{

    const {
        paperValue,
        selectedId,
        setSelectedId,
        addNewBlock,
        removeBlock,
        moveUpBlock,
        moveDownBlock
    } = useCanvasModule()

    const isSelected = useMemo(()=>{return selectedId===id}, [selectedId])
    const blockData = useMemo(()=>{return paperValue[id]},[JSON.stringify(paperValue[id])])
    const [isHover, setIsHover] = useState(false)

    const onClickBlockAction = (actionType:string) =>{
        if(actionType==='remove'){
            removeBlock(id, parentId)
        }
        if(actionType==='move-down'){
            moveDownBlock(id, parentId)
        }
        if(actionType==='move-up'){
            moveUpBlock(id, parentId)
        }
    }
    return(
        <div
            className={clsx(
                'block-container',
                {
                    ['block-selected']:(isSelected),
                    ['block-hovered']:(isHover)
                }
            )}
            style={{
                zIndex:(isSelected)?('1'):(isHover)?('0'):(undefined),
            }}
            onClick={()=>{if(selectedId!==id){setSelectedId(id)}}}
            onKeyDown={(e)=>{
                if(e.target && (e.target as HTMLDivElement).classList.contains('block-container') && (e.key===' ' || e.key==='Enter') && selectedId!==id){
                    setSelectedId(id)
                }
            }}
            onMouseEnter={()=>{setIsHover(true)}}
            onMouseLeave={()=>{setIsHover(false)}}
            tabIndex={0}
        >
            {
                (isSelected)&&(
                    <>
                        <Mover onClickAction={(idButton)=>{onClickBlockAction(idButton)}}/>
                        <Adder onClickAction={(idButton)=>{addNewBlock(idButton, id, parentId)}}/>
                    </>
                )
            }
            <div
                className='paper-block-content'
                style={{
                    display:'flex',
                    paddingTop:`${blockData.props.paddingTop||'0'}px`,
                    paddingRight:`${blockData.props.paddingRight||'0'}px`,
                    paddingBottom:`${blockData.props.paddingBottom||'0'}px`,
                    paddingLeft:`${blockData.props.paddingLeft||'0'}px`,
                    backgroundColor:`${blockData.props.backgroundColor??'transparent'}`,
                    fontFamily:fontFamilyDict[paperValue.root.props.fontFamily??'aria'],
                }}
            >
                {
                    (blockData.type==='text' && isSelected)&&(
                        <div style={{width:'100%'}}>
                            <TextContentEditor blockId={id} props={blockData.props}/>
                        </div>
                    )
                }
                {
                    (blockData.type==='text' && !isSelected)&&(
                        <TextContentComponent content={blockData.props.textDelta} props={blockData.props}/>
                    )
                }
                {
                    (blockData.type==='image')&&(
                        <>
                            {
                                (blockData.props.imageSrcUrl)?(
                                    <img 
                                        style={{
                                            height:blockData.props.height?(`${blockData.props.height}px`):('100%'),
                                            width:blockData.props.width?(`${blockData.props.width}px`):('100%')
                                        }}
                                        src={blockData.props.imageSrcUrl}
                                    />
                                ):(
                                    <div
                                        style={{
                                            backgroundColor:'var(--clr-surface-2)',
                                            height:blockData.props.height||'fit-content',
                                            width:blockData.props.width||'fit-content'
                                        }}
                                    >
                                        <PiImageBold size={48}/>
                                    </div>
                                )
                            }
                        </>
                    )
                }
                {
                    (!['text', 'image'].includes(blockData.type))&&(
                        <p>{blockData.type} coming soon...</p>
                    )
                }
            </div>
        </div>
    )
}

export default Block

const TextContentEditor = ({
    blockId,
    props,
}:{
    blockId:string,
    props:paperBlockPropsType
}) =>{
    const {
        paperValue,
        setPaperValue,
    } = useCanvasModule()

    const [deltaValue, setDeltaValue] = useState<Delta|undefined>(props.textDelta)
    
    useEffect(()=>{
        if(JSON.stringify(deltaValue)!==JSON.stringify(paperValue[blockId]['props']['textDelta'])){
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

    return(<Wysiwyg 
        className='block-wysiwyg' 
        type='floating' 
        txtPlaceholder='Enter text...'
        value={deltaValue}
        onChange={(newValue)=>{setDeltaValue(newValue)}}
        config={{
            moduleList:['bold', 'italic', 'underline', 'strike', 'subscript', 'superscript'],
            isDisableNewLine:true
        }}
        style={{
            editorBox:{
                color:props.textColor,
                fontFamily:(props.fontFamily)?(props.fontFamily==='global')?(fontFamilyDict[fontGloabl]):(fontFamilyDict[props.fontFamily]):undefined,
                fontSize:(props.fontSize)?(`${props.fontSize}px`):(props.textType==='h1')?('2em'):(props.textType==='h2')?('1.5em'):(props.textType==='h3')?('1.17em'):('1em'),
                fontWeight:(props.textType!=='normal')?('bold'):(undefined),
            }
        }}
    />)
}

const TextContentComponent = ({
    content,
    props
}:{
    content:Delta|undefined,
    props:paperBlockPropsType
}) =>{
    const deltaToHtml = (delta:Delta) => {
        const converter = new QuillDeltaToHtmlConverter(delta.ops, {
            inlineStyles: true, // Optional: makes html more styled without CSS
        });
        return converter.convert();
    };
    const contentHtml = useMemo(()=>{
        if(content){
            console.log(content)
            let htmlResult = deltaToHtml(content)
            console.log(htmlResult)
            const tag = props.textType!=='normal'?(props.textType):('p')
            htmlResult = htmlResult
                .replace('<p>', `<${tag} style="color:${props.textColor??''} ;font-size:${props.fontSize?(`${props.fontSize}px`):('')}; font-family:${props.fontFamily?fontFamilyDict[props.fontFamily]??'':''}">`)
                .replace('</p>', `</${tag}>`)
            
            
            return htmlResult
        }else{
            return '<p></p>'
        }
    },[content, props])

    return(
        <div 
            dangerouslySetInnerHTML={{ __html: contentHtml }} 
        />
    )
}