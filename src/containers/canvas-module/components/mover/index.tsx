import IconButton from 'src/components/ui/icon-button'
import './styles.scss'
import { PiArrowDownBold, PiArrowUpBold, PiCopySimpleBold, PiDotsSixBold, PiTrashBold } from 'react-icons/pi'

const Mover = ({
    handleDragStart,
    handleDragEnd,
    onClickAction,
    isCopyable = true
}:{
    handleDragStart:(e:React.DragEvent<HTMLDivElement>)=>void
    handleDragEnd:(e:React.DragEvent<HTMLDivElement>)=>void
    onClickAction:(idButton:string)=>void
    isCopyable?: boolean
}) =>{

    return(
        <div className="mover-container global-radius">
            <div 
                style={{display:"flex", alignItems:'center', justifyContent:'center', height:'32px', width:'32px', borderRadius:'var(--space-100)'}}
                draggable
                onDragStart={(e)=>{handleDragStart(e)}}
                onDragEnd={(e)=>{handleDragEnd(e)}}
            >
                <PiDotsSixBold className='global-icon'/>
            </div>
            <IconButton
                icon={<PiArrowUpBold className='global-icon'/>}
                txtLabel='Move Up'
                onClick={()=>{onClickAction('move-up')}}
                isShowtooltip={false}
            />
            {
                (isCopyable)&&(
                    <IconButton
                        icon={<PiCopySimpleBold className='global-icon'/>}
                        txtLabel='Coppy'
                        onClick={()=>{onClickAction('copy')}}
                        isShowtooltip={false}
                    />
                )
            }
            <IconButton
                icon={<PiArrowDownBold className='global-icon'/>}
                txtLabel='Move down'
                onClick={()=>{onClickAction('move-down')}}
                isShowtooltip={false}
            />
            <IconButton
                icon={<PiTrashBold className='global-icon'/>}
                txtLabel='Remove'
                onClick={()=>{onClickAction('remove')}}
                isShowtooltip={false}
            />
        </div>
    )
}

export default Mover
