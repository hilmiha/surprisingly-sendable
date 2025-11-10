import { useEffect, useState } from 'react'
import './add-block.scss'
import { PiArrowSquareRightBold, PiImageBold, PiListBulletsBold, PiPlusBold, PiRectangleBold, PiRectangleDashedBold, PiSquareSplitHorizontalBold, PiTextHBold, PiTextTBold } from "react-icons/pi"
import Button from "src/components/ui/button"
import Dropdown from "src/components/ui/dropdown"
import IconButton from "src/components/ui/icon-button"
import type { paperBlockType } from '../context'

const AddBlock = ({
    type,
    onClickBlockToAdd,
}:{
    type:"before" | "after",
    onClickBlockToAdd:(type:paperBlockType)=>void
}) =>{
    const [triggerClose, setTriggerClose] = useState<0|1>(0)

    const onClickOption = (type:paperBlockType) =>{
        onClickBlockToAdd(type)
        setTriggerClose(1)
    } 

    useEffect(()=>{
        if(triggerClose===1){
            setTriggerClose(0)
        }
    },[triggerClose])
    return(
        <>
            <Dropdown
                trigger={
                    <IconButton
                        className={`add-block-button add-block-${type}-container`}
                        icon={<PiPlusBold className="global-icon"/>}
                        txtLabel="Add Block"
                        appearance="primary"
                        isShowtooltip={false}
                    />
                }
                floatingConfig={{
                    placement:type==='before'?'top':'bottom',
                    fallbackPlacement:['top', 'bottom', 'left', 'right'],
                    width:420
                }}
                triggerClose={triggerClose}
            >
                <div className='add-block-option-container'>
                    <Button 
                        className="add-block-option-button" 
                        txtLabel={'Heading'} 
                        onClick={()=>{onClickOption('heading')}}
                        iconBefore={<PiTextHBold size={20} className="global-icon"/>}
                    />
                    <Button 
                        className="add-block-option-button" 
                        txtLabel={'Text'} 
                        onClick={()=>{onClickOption('text')}}
                        iconBefore={<PiTextTBold size={20} className="global-icon"/>}
                    />
                    <Button 
                        className="add-block-option-button" 
                        txtLabel={'List'} 
                        onClick={()=>{onClickOption('list')}}
                        iconBefore={<PiListBulletsBold size={20} className="global-icon"/>}
                    />
                    <Button 
                        className="add-block-option-button" 
                        txtLabel={'Image'} 
                        onClick={()=>{onClickOption('image')}}
                        iconBefore={<PiImageBold size={20} className="global-icon"/>}
                    />
                    <Button 
                        className="add-block-option-button" 
                        txtLabel={'Button'} 
                        onClick={()=>{onClickOption('button')}}
                        iconBefore={<PiArrowSquareRightBold size={20} className="global-icon"/>}
                    />
                    <Button 
                        className="add-block-option-button" 
                        txtLabel={'Container'} 
                        onClick={()=>{onClickOption('container')}}
                        iconBefore={<PiRectangleBold size={20} className="global-icon"/>}
                    />
                    <Button 
                        className="add-block-option-button" 
                        txtLabel={'Column'} 
                        onClick={()=>{onClickOption('column')}}
                        iconBefore={<PiSquareSplitHorizontalBold size={20} className="global-icon"/>}
                    />
                    <Button 
                        className="add-block-option-button" 
                        txtLabel={'Spacer'} 
                        onClick={()=>{onClickOption('spacer')}}
                        iconBefore={<PiRectangleDashedBold size={20} className="global-icon"/>}
                    />
                </div>
            </Dropdown>
        </>
    )
}

export default AddBlock