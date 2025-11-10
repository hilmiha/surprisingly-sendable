import { useEffect, useMemo, useState } from 'react'
import './block.scss'
import Mover from './mover'
import { useCanvasModule, type paperBlockPropsType, type paperBlockType } from '../context'
import { PiImageBold } from 'react-icons/pi'
import clsx from 'clsx'
import type { Delta } from 'quill'
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { fontFamilyDict } from '../data/font-family'
import Wysiwyg from 'src/components/ui/wysiwyg'
import Adder from './adder'
import AddBlock from './add-block'

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
        moveDownBlock,
        triggerRefreshListType
    } = useCanvasModule()

    const isSelected = useMemo(()=>{return selectedId===id}, [selectedId])
    const blockData = useMemo(()=>{return paperValue[id]},[JSON.stringify(paperValue[id])])
    const [isHover, setIsHover] = useState(false)

    const onClickBlockAction = (actionType:string) =>{
        if(actionType==='remove'){
            removeBlock(id)
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
                // zIndex:(isSelected)?('1'):(isHover)?('0'):(undefined),
            }}
            onClick={(e)=>{
                e.stopPropagation(); 
                if(selectedId!==id){
                    setSelectedId(id)
                }
            }}
            onKeyDown={(e)=>{
                e.stopPropagation()
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
                        <Adder onClickAction={(idButton, isBefore)=>{addNewBlock(idButton, id, parentId, isBefore)}}/>
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
                    justifyContent:blockData.props.alignment??undefined,
                    borderTopLeftRadius:(!['button', 'image'].includes(blockData.type))?`${blockData.props.borderRadiusTL??'0'}px`:undefined,
                    borderTopRightRadius:(!['button', 'image'].includes(blockData.type))?`${blockData.props.borderRadiusTR??'0'}px`:undefined,
                    borderBottomLeftRadius:(!['button', 'image'].includes(blockData.type))?`${blockData.props.borderRadiusBL??'0'}px`:undefined,
                    borderBottomRightRadius:(!['button', 'image'].includes(blockData.type))?`${blockData.props.borderRadiusBR??'0'}px`:undefined,
                }}
            >
                {
                    (blockData.type==='heading')&&(
                        <>
                            {
                                (isSelected)?(
                                    <div style={{width:'100%'}}>
                                        <TextContentEditor blockId={id} type={blockData.type} props={blockData.props}/>
                                    </div>
                                ):( 
                                    <TextContentComponent content={blockData.props.textDelta} type={blockData.type} props={blockData.props}/>
                                )
                            }
                        </>
                        
                    )
                }
                {
                    (blockData.type==='text')&&(
                        <>
                            {
                                (isSelected)?(
                                    <div style={{width:'100%'}}>
                                        <TextContentEditor blockId={id} type={blockData.type} props={blockData.props}/>
                                    </div>
                                ):( 
                                    <TextContentComponent content={blockData.props.textDelta} type={blockData.type} props={blockData.props}/>
                                )
                            }
                        </>
                        
                    )
                }
                {
                    (blockData.type==='list')&&(
                        <>
                            {
                                (isSelected && triggerRefreshListType===0)?(
                                    <div style={{width:'100%'}}>
                                        <TextContentEditor blockId={id} type={blockData.type} props={blockData.props}/>
                                    </div>
                                ):( 
                                    <TextContentComponent content={blockData.props.textDelta} type={blockData.type} props={blockData.props}/>
                                )
                            }
                        </>
                        
                    )
                }
                {
                    (blockData.type==='image')&&(
                        <>
                            {
                                (blockData.props.imageSrcUrl)?(
                                    <div>
                                        <img 
                                            style={{
                                                height:blockData.props.height?(`${blockData.props.height}px`):('100%'),
                                                width:blockData.props.width?(`${blockData.props.width}px`):('100%'),
                                                borderTopLeftRadius:`${blockData.props.borderRadiusTL??'0'}px`,
                                                borderTopRightRadius:`${blockData.props.borderRadiusTR??'0'}px`,
                                                borderBottomLeftRadius:`${blockData.props.borderRadiusBL??'0'}px`,
                                                borderBottomRightRadius:`${blockData.props.borderRadiusBR??'0'}px`,
                                            }}
                                            src={blockData.props.imageSrcUrl}
                                        />
                                    </div>
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
                    (blockData.type==='button')&&(
                        <>
                            {
                                (isSelected)?(
                                    <div style={{
                                        backgroundColor:blockData.props.buttonColor??'#f0f0f0',
                                        paddingTop:`${blockData.props.contentPaddingTop}px`,
                                        paddingBottom:`${blockData.props.contentPaddingBottom}px`,
                                        paddingLeft:`${blockData.props.contentPaddingLeft}px`,
                                        paddingRight:`${blockData.props.contentPaddingRight}px`,
                                        borderTopLeftRadius:`${blockData.props.borderRadiusTL??'0'}px`,
                                        borderTopRightRadius:`${blockData.props.borderRadiusTR??'0'}px`,
                                        borderBottomLeftRadius:`${blockData.props.borderRadiusBL??'0'}px`,
                                        borderBottomRightRadius:`${blockData.props.borderRadiusBR??'0'}px`,
                                        border:"0px",
                                        color:blockData.props.textColor,
                                        width:blockData.props.buttonWidth==='full'?'100%':'auto'
                                    }}>
                                        <TextContentEditor 
                                            blockId={id} 
                                            type={blockData.type}
                                            props={{
                                                ...blockData.props,
                                                textAlign:blockData.props.alignment==='start'?('left'):(blockData.props.alignment==='end')?('right'):('center'),
                                                isButton:true
                                            }}
                                        />
                                    </div>
                                ):( 
                                    <a
                                        href={blockData.props.url??'##'}
                                        style={{
                                            backgroundColor:blockData.props.buttonColor??'#f0f0f0',
                                            paddingTop:`${blockData.props.contentPaddingTop}px`,
                                            paddingBottom:`${blockData.props.contentPaddingBottom}px`,
                                            paddingLeft:`${blockData.props.contentPaddingLeft}px`,
                                            paddingRight:`${blockData.props.contentPaddingRight}px`,
                                            borderTopLeftRadius:`${blockData.props.borderRadiusTL??'0'}px`,
                                            borderTopRightRadius:`${blockData.props.borderRadiusTR??'0'}px`,
                                            borderBottomLeftRadius:`${blockData.props.borderRadiusBL??'0'}px`,
                                            borderBottomRightRadius:`${blockData.props.borderRadiusBR??'0'}px`,
                                            border:"0px",
                                            color:blockData.props.textColor,
                                            width:blockData.props.buttonWidth==='full'?'100%':'auto',
                                            textAlign:blockData.props.alignment==='start'?('left'):(blockData.props.alignment==='end')?('right'):('center'),
                                            textDecoration:'none',
                                        }}
                                        onClick={(e)=>{e.preventDefault()}}
                                    >
                                        <TextContentComponent content={blockData.props.textDelta} type={blockData.type} props={blockData.props}/>
                                    </a>
                                )
                            }
                            
                        </>
                    )
                }
                {
                    (blockData.type==='column')&&(
                        <ColumnBlock blockId={id}/>
                    )
                }
                {
                    (blockData.type==='container')&&(
                        <ContainerBlock blockId={id} props={blockData.props}/>
                    )
                }
                {
                    (!['heading', 'text', "list", 'image', 'button', 'container', 'column'].includes(blockData.type))&&(
                        <p>{blockData.type} coming soon...</p>
                    )
                }
            </div>
        </div>
    )
}

export default Block

const ColumnBlock = ({
    blockId
}:{
    blockId:string
}) =>{
    const {
        paperValue,
    } = useCanvasModule()
    
    return(
        <div
            style={{
                flexGrow:'1',
                display:'grid',
                alignItems:paperValue[blockId]['props']['alignment'],
                gridTemplateColumns:'1fr 1fr',
            }}
        >
            {
                paperValue[blockId].childIds.map((i)=>(
                    <ContainerBlock key={i} blockId={i} props={paperValue[i]['props']}/>
                ))
            }
        </div>
    )
}

const ContainerBlock = ({
    blockId,
}:{
    blockId:string,
    props:paperBlockPropsType
}) =>{
    const {
        selectedId,
        paperValue,
        addNewBlock
    } = useCanvasModule()
    const isAllPaddingZero = useMemo(()=>{
        if(
            paperValue[blockId].props.paddingBottom==='0'&&
            paperValue[blockId].props.paddingTop==='0'&&
            paperValue[blockId].props.paddingLeft==='0'&&
            paperValue[blockId].props.paddingRight==='0'
        ){
            return true
        }else{
            return false
        }
    },[
        paperValue[blockId].props.paddingBottom,
        paperValue[blockId].props.paddingTop,
        paperValue[blockId].props.paddingLeft,
        paperValue[blockId].props.paddingRight,
    ])
    return(
        <div
            style={{
                flexGrow:'1',
                margin:(isAllPaddingZero && paperValue[blockId]['childIds'].includes(selectedId))?'var(--space-50)':undefined
            }}
        >
            {
                paperValue[blockId].childIds.map((i)=>(
                    <Block key={i} id={i} parentId={blockId}/>
                ))
            }
            {
                (paperValue[blockId].childIds.length<1)&&(
                    <div style={{display:'flex', justifyContent:'center', border:'1px dashed var(--clr-border)', padding:'var(--space-100)', margin:'var(--space-50)'}}>
                        <AddBlock type="after" 
                            onClickBlockToAdd={(type)=>{
                                addNewBlock(type, '', blockId)
                            }}
                        />
                    </div>
                )
            }
        </div>
    )
}

const TextContentEditor = ({
    blockId,
    type,
    props,
}:{
    blockId:string,
    type:paperBlockType
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
            moduleList:['bold', 'italic', 'underline', 'strike', 'subscript', 'superscript'],
            disabledFormat:type==='list'?(['indent']):(['indent', 'list']),
            isDisableNewLine:(type==='text' || type==='list')?(false):(true),
            isListOnly:type==='list'
        }}
        style={{
            editorBox:{
                color:props.textColor,
                fontFamily:(props.fontFamily)?(props.fontFamily==='global')?(fontFamilyDict[fontGloabl]):(fontFamilyDict[props.fontFamily]):undefined,
                fontSize:(props.textType==='h1')?(h1SizeGloabl??'2em'):(props.textType==='h2')?(h2SizeGloabl??'1.5em'):(props.textType==='h3')?(h3SizeGloabl??'1.17em'):(props.fontSize)?(`${props.fontSize}px`):('1em'),
                fontWeight:(props.textType)?('bold'):(undefined),
            }
        }}
    />)
}

const TextContentComponent = ({
    content,
    type,
    props
}:{
    content:Delta|undefined,
    type:paperBlockType
    props:paperBlockPropsType
}) =>{
    const {
        paperValue,
    } = useCanvasModule()

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