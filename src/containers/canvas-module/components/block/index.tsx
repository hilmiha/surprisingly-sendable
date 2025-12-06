import { useMemo, useState } from 'react'
import './styles.scss'
import { useCanvasModule, type paperBlockPropsType } from '../../context'
import clsx from 'clsx'
import { fontFamilyDict } from '../../data/font-family'
import Adder from '../adder'
import Mover from '../mover'
import AddBlockButton from '../add-block-button'
import BlockHeading from '../block-heading'
import BlockText from '../block-text'
import BlockList from '../block-list'
import BlockImage from '../block-image'
import BlockButton from '../block-button'

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
            onClick={(e)=>{
                e.stopPropagation(); 
                if(!isSelected){
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
                        <BlockHeading blockId={id} isSelected={isSelected}/>
                    )
                }
                {
                    (blockData.type==='text')&&(
                        <BlockText blockId={id} isSelected={isSelected}/>
                    )
                }
                {
                    (blockData.type==='list')&&(
                        <BlockList blockId={id} isSelected={isSelected}/>
                    )
                }
                {
                    (blockData.type==='image')&&(
                        <BlockImage blockId={id}/>
                    )
                }
                {
                    (blockData.type==='button')&&(
                        <BlockButton blockId={id} isSelected={isSelected}/>
                    )
                }
                {
                    (blockData.type==='container')&&(
                        <ContainerBlock blockId={id} props={blockData.props}/>
                    )
                }
                {
                    (blockData.type==='column')&&(
                        <ColumnBlock blockId={id}/>
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

    const columnCount = paperValue[blockId]['props']['columnCount']
    
    return(
        <div
            style={{
                flexGrow:'1',
                display:'grid',
                alignItems:paperValue[blockId]['props']['alignment'],
                gridTemplateColumns:columnCount==='3'?('1fr 1fr 1fr'):(columnCount==='2')?('1fr 1fr'):('1fr'),
                gap:`${paperValue[blockId]['props']['columnGap']||'0'}px`,
            }}
        >
            {
                paperValue[blockId].childIds.map((i, index)=>{
                    if((columnCount==='3' && index>2) || (columnCount==='2' && index>1)){
                        return <></>
                    }
                    return(
                        <ContainerBlock key={i} blockId={i} props={paperValue[i]['props']}/>
                    )
                })
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
                margin:(isAllPaddingZero && paperValue[blockId]['childIds'].includes(selectedId))?'var(--space-50)':undefined,
                position:"relative"
            }}
        >
            {
                paperValue[blockId].childIds.map((i)=>(
                    <Block key={i} id={i} parentId={blockId}/>
                ))
            }
            {
                (paperValue[blockId].childIds.length<1)&&(
                    <div style={{display:'flex', justifyContent:'center', border:'1px dashed var(--clr-border)', padding:'var(--space-100)'}}>
                        <AddBlockButton type="after" 
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