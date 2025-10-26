import IconButton from 'src/components/ui/icon-button'
import './mover.scss'
import { PiArrowDownBold, PiArrowUpBold, PiTrashBold } from 'react-icons/pi'

const Mover = ({
    onClickAction
}:{
    onClickAction:(idButton:string)=>void
}) =>{
    return(
        <div className="mover-container global-radius">
            <IconButton
                icon={<PiArrowUpBold className='global-icon'/>}
                txtLabel='Move Up'
                onClick={()=>{onClickAction('move-up')}}
                isShowtooltip={false}
            />
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