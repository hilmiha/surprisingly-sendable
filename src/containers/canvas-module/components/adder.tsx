import './adder.scss'
import type { paperBlockType } from '../context'
import AddBlock from './add-block'

const Adder = ({
    onClickAction
}:{
    onClickAction:(idButton:paperBlockType)=>void
}) =>{
    return(
        <>
            <div className="adder-before adder-container global-radius">
                <AddBlock
                    type='before'
                    onClickBlockToAdd={onClickAction}
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
                    onClickBlockToAdd={onClickAction}
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