import { Fragment, useMemo, useState } from 'react'
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
import BlockSpacer from '../block-spacer'
import BlockDevider from '../block-devider'

const Block = ({
    id = "",
    parentId = 'root'
}:{
    id:string,
    parentId:string
}) =>{

    const {
        paperValue,
        setPaperValue,
        selectedId,
        setSelectedId,
        addNewBlock,
        removeBlock,
        moveUpBlock,
        moveDownBlock,
        copyDownBlock,
        draggedContent,
        setDraggedContent,
        isDesktopView,
        isShowHidden
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
        if(actionType==='copy'){
            copyDownBlock(id, parentId)
        }
    }
    const [isHoveredDropZone, setIsHoveredDropZone] = useState<boolean>(false);
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        setDraggedContent({id:id, parentId:parentId});
        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.setData('text/plain', id);
    };
    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDraggedContent(null);
    };
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsHoveredDropZone(true);
        e.dataTransfer.dropEffect = 'copy';
    };
    const handleDragLeave = () => {
        setIsHoveredDropZone(false);
    };
    const collectAllDescendantIds = (
        blockId: string,
    ): Set<string> => {
        const descendants = new Set<string>();
        
        const collectRecursive = (currentId: string) => {
            const block = paperValue[currentId];
            if (!block) return;
            
            // Add all direct children
            if (block.childIds && block.childIds.length > 0) {
                block.childIds.forEach(childId => {
                    descendants.add(childId);
                    // Recursively collect children of this child
                    collectRecursive(childId);
                });
            }
        };
        
        collectRecursive(blockId);
        return descendants;
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (draggedContent && draggedContent.id!==id) {
            console.log(`Item ${draggedContent.id} in ${draggedContent.parentId}, Dragged next after ${id} in ${parentId}`)
            const descendantsIds = collectAllDescendantIds(draggedContent.id)
            if(!descendantsIds.has(id)){
                setPaperValue((prev)=>{
                    const tamp = {...prev}
                    
                    const oldParent = prev[draggedContent.parentId].childIds.filter(i=>i!==draggedContent.id)
                    tamp[draggedContent.parentId].childIds = oldParent

                    const newParent:string[] = []
                    prev[parentId].childIds.forEach((i)=>{
                        newParent.push(i)
                        if(i===id){
                            newParent.push(draggedContent.id)
                        }
                    })
                    tamp[parentId].childIds = newParent

                    return tamp
                })
            }
        }
        if(isHoveredDropZone){
            setIsHoveredDropZone(false);
        }
        setDraggedContent(null);
    };

    return(
        <div style={{position:'relative'}}>
        <div
            className={clsx(
                'block-container',
                {
                    ['block-selected']:(isSelected),
                    ['block-hovered']:(isHover)
                }
            )}
            style={{
                display:((blockData.props.visibility==='hide-desktop'&&isDesktopView&&!isShowHidden)||(blockData.props.visibility==='hide-mobile'&&!isDesktopView&&!isShowHidden))?'none':'block'
            }}
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
                        <Mover onClickAction={(idButton)=>{onClickBlockAction(idButton)}} handleDragStart={(e)=>{handleDragStart(e)}} handleDragEnd={(e)=>{handleDragEnd(e)}}/>
                        <Adder onClickAction={(idButton, isBefore)=>{addNewBlock(idButton, id, parentId, isBefore)}}/>
                    </>
                )
            }
            <div
                className='paper-block-content'
                style={{
                    opacity:(blockData.props.visibility==='hide-desktop'&&isDesktopView)?('0.5'):((blockData.props.visibility==='hide-mobile'&&!isDesktopView))?('0.5'):('1'),
                    paddingTop:`${blockData.props.paddingTop||'0'}px`,
                    paddingRight:`${blockData.props.paddingRight||'0'}px`,
                    paddingBottom:`${blockData.props.paddingBottom||'0'}px`,
                    paddingLeft:`${blockData.props.paddingLeft||'0'}px`,
                    backgroundColor:`${blockData.props.backgroundColor??'transparent'}`,
                    fontFamily:fontFamilyDict[paperValue.root.props.fontFamily??'aria'],
                    borderTopLeftRadius:(!['button', 'image'].includes(blockData.type))?`${blockData.props.borderRadiusTL??'0'}px`:'0px',
                    borderTopRightRadius:(!['button', 'image'].includes(blockData.type))?`${blockData.props.borderRadiusTR??'0'}px`:'0px',
                    borderBottomLeftRadius:(!['button', 'image'].includes(blockData.type))?`${blockData.props.borderRadiusBL??'0'}px`:'0px',
                    borderBottomRightRadius:(!['button', 'image'].includes(blockData.type))?`${blockData.props.borderRadiusBR??'0'}px`:'0px',
                    borderTop:`${blockData.props.borderTop||'0'}px solid ${blockData.props.borderColor??'transparent'}`,
                    borderBottom:`${blockData.props.borderBottom||'0'}px solid ${blockData.props.borderColor??'transparent'}`,
                    borderLeft:`${blockData.props.borderLeft||'0'}px solid ${blockData.props.borderColor??'transparent'}`,
                    borderRight:`${blockData.props.borderRight||'0'}px solid ${blockData.props.borderColor??'transparent'}`,
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
                    (blockData.type==='spacer')&&(
                        <BlockSpacer blockId={id}/>
                    )
                }
                {
                    (blockData.type==='devider')&&(
                        <BlockDevider blockId={id}/>
                    )
                }
                {
                    (!['heading', 'text', "list", 'image', 'button', 'container', 'column', 'spacer', 'devider'].includes(blockData.type))&&(
                        <p>{blockData.type} coming soon...</p>
                    )
                }
            </div>
        </div>
        <div
            className={clsx(
                'drop-area',
                {
                    ['drop-area-active']:(draggedContent),
                    ['hovered-drop-area']:(isHoveredDropZone)
                }
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => {handleDrop(e)}}
        >
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

    const props = paperValue[blockId]['props']
    const columnCount = props['columnCount']
    
    return(
        <div
            style={{
                flexGrow:'1',
                display:'grid',
                alignItems:props['alignment'],
                justifyContent:props['justify'],
                gridTemplateColumns:`${props['column1Size']?(`${props['column1Size']}px`):('1fr')} ${(columnCount==='2' || columnCount==='3')?((props['column2Size'])?(`${props['column2Size']}px`):('1fr')):('')} ${columnCount==='3'?((props['column3Size'])?(`${props['column3Size']}px`):('1fr')):('')}`,
                gap:`${props['columnGap']||'0'}px`,
            }}
        >
            {
                paperValue[blockId].childIds.map((i, index)=>{
                    if((columnCount==='3' && index>2) || (columnCount==='2' && index>1) || (columnCount==='1' && index>0)){
                        return <Fragment key={i}/>
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
        setPaperValue,
        addNewBlock,
        draggedContent,
        setDraggedContent
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

    const [isHoveredDropZone, setIsHoveredDropZone] = useState<boolean>(false);
    
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsHoveredDropZone(true);
        e.dataTransfer.dropEffect = 'copy';
    };
    const handleDragLeave = () => {
        setIsHoveredDropZone(false);
    };

    const collectAllDescendantIds = (
        id: string,
    ): Set<string> => {
        const descendants = new Set<string>();
        
        const collectRecursive = (currentId: string) => {
            const block = paperValue[currentId];
            if (!block) return;
            
            // Add all direct children
            if (block.childIds && block.childIds.length > 0) {
                block.childIds.forEach(childId => {
                    descendants.add(childId);
                    // Recursively collect children of this child
                    collectRecursive(childId);
                });
            }
        };
        
        collectRecursive(id);
        return descendants;
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (draggedContent) {
            const descendantsIds = collectAllDescendantIds(draggedContent.id)
            if(!descendantsIds.has(blockId)){
                setPaperValue((prev)=>{
                    const tamp = {...prev}
                    
                    const oldParent = prev[draggedContent.parentId].childIds.filter(i=>i!==draggedContent.id)
                    tamp[draggedContent.parentId].childIds = oldParent

                    const newParent:string[] = [draggedContent.id]
                    tamp[blockId].childIds = newParent

                    return tamp
                })
            }
        }
        if(isHoveredDropZone){
            setIsHoveredDropZone(false);
        }
        setDraggedContent(null);
    };

    return(
        <div
            className={(paperValue[blockId].childIds.length<1)?("global-disbaled-bg"):('')}
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
                    <>
                        <div style={{display:'flex', justifyContent:'center', border:'1px dashed var(--clr-border)', padding:'var(--space-100)'}}>
                            <AddBlockButton type="after" 
                                onClickBlockToAdd={(type)=>{
                                    addNewBlock(type, '', blockId)
                                }}
                            />
                        </div>
                        <div
                            className={clsx(
                                'drop-area',
                                {
                                    ['drop-area-active']:(draggedContent),
                                    ['hovered-drop-area']:(isHoveredDropZone)
                                }
                            )}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => {handleDrop(e)}}
                        ></div>
                    </>
                )
            }
            
        </div>
    )
}
