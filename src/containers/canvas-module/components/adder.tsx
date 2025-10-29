import './adder.scss'
import type { paperBlockType } from '../context'
import AddBlock from './add-block'

const Adder = ({
    onClickAction
}:{
    onClickAction:(type:paperBlockType, isBefore:boolean)=>void
}) =>{
    return(
        <>
            <div className="adder-before adder-container global-radius">
                <AddBlock
                    type='before'
                    onClickBlockToAdd={(type)=>{onClickAction(type, true)}}
                />
                {/* <IconButton
                    icon={<PiPlusBold className='global-icon'/>}
                    txtLabel='Add Before'
                    onClick={()=>{onClickAction('before')}}
                    isShowtooltip={false}
                /> */}
            </div>
            <div className="adder-after adder-container global-radius">
                <AddBlock
                    type='after'
                    onClickBlockToAdd={(type)=>{onClickAction(type, false)}}
                />
                {/* <IconButton
                    icon={<PiPlusBold className='global-icon'/>}
                    txtLabel='Add After'
                    onClick={()=>{onClickAction('after')}}
                    isShowtooltip={false}
                /> */}
            </div>
        </>
    )
}

export default Adder