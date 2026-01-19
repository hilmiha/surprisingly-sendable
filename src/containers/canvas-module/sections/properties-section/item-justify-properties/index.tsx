import { type paperBlockPropsType } from "src/containers/canvas-module/context"
import PropertiesFieldSection from "../../properties-field-section"
import Button from "src/components/ui/button"
import Radio from "src/components/ui/radio-button/radio"
import { PiAlignCenterHorizontalSimpleBold, PiAlignLeftSimpleBold, PiAlignRightSimpleBold } from "react-icons/pi"

const ItemJustifyProperties = ({
    form,
    onChange
}:{
    form:paperBlockPropsType,
    onChange:(key: string, value: any) => void
}) =>{
    return(
        <PropertiesFieldSection txtLabel="Justify">
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'var(--space-100)'}}>
                <Button
                    txtLabel={<PiAlignLeftSimpleBold className="global-icon"/>}
                    onClick={()=>{onChange('justify', 'left')}}
                    isSelected={form['justify']==='left'}
                    iconBefore={<Radio isSelected={form['justify']==='left'}/>}
                />
                <Button
                    txtLabel={<PiAlignCenterHorizontalSimpleBold className="global-icon"/>}
                    onClick={()=>{onChange('justify', 'center')}}
                    isSelected={form['justify']==='center'}
                    iconBefore={<Radio isSelected={form['justify']==='center'}/>}
                />
                <Button
                    txtLabel={<PiAlignRightSimpleBold className="global-icon"/>}
                    onClick={()=>{onChange('justify', 'right')}}
                    isSelected={form['justify']==='right'}
                    iconBefore={<Radio isSelected={form['justify']==='right'}/>}
                />
            </div>
        </PropertiesFieldSection>
    )
}

export default ItemJustifyProperties