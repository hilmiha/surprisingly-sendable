import './styles.scss'
import type { paperBlockType } from '../../context'
import AddBlockButton from '../add-block-button'

const Adder = ({
    onClickAction
}:{
    onClickAction:(type:paperBlockType, isBefore:boolean)=>void
}) =>{
    return(
        <>
            <div className="adder-before adder-container global-radius">
                <AddBlockButton
                    type='before'
                    onClickBlockToAdd={(type)=>{onClickAction(type, true)}}
                />
            </div>
            <div className="adder-after adder-container global-radius">
                <AddBlockButton
                    type='after'
                    onClickBlockToAdd={(type)=>{onClickAction(type, false)}}
                />
            </div>
        </>
    )
}

export default Adder