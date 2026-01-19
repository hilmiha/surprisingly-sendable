import { type paperBlockPropsType } from "src/containers/canvas-module/context"
import PropertiesFieldSection from "../../properties-field-section"
import Button from "src/components/ui/button"
import Radio from "src/components/ui/radio-button/radio"
import { PiAlignBottomSimpleBold, PiAlignCenterVerticalSimpleBold, PiAlignTopSimpleBold } from "react-icons/pi"

const ItemAlignProperties = ({
    form,
    onChange
}:{
    form:paperBlockPropsType,
    onChange:(key: string, value: any) => void
}) =>{
    return(
        <PropertiesFieldSection txtLabel="Alignment">
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'var(--space-100)'}}>
                <Button
                    txtLabel={<PiAlignTopSimpleBold className="global-icon"/>}
                    onClick={()=>{onChange('alignment', 'start')}}
                    isSelected={form['alignment']==='start'}
                    iconBefore={<Radio isSelected={form['alignment']==='start'}/>}
                />
                <Button
                    txtLabel={<PiAlignCenterVerticalSimpleBold className="global-icon"/>}
                    onClick={()=>{onChange('alignment', 'center')}}
                    isSelected={form['alignment']==='center'}
                    iconBefore={<Radio isSelected={form['alignment']==='center'}/>}
                />
                <Button
                    txtLabel={<PiAlignBottomSimpleBold className="global-icon"/>}
                    onClick={()=>{onChange('alignment', 'end')}}
                    isSelected={form['alignment']==='end'}
                    iconBefore={<Radio isSelected={form['alignment']==='end'}/>}
                />
            </div>
        </PropertiesFieldSection>
    )
}

export default ItemAlignProperties