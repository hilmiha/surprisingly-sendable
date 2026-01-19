import { type paperBlockPropsType } from "src/containers/canvas-module/context"
import PropertiesFieldSection from "../../properties-field-section"
import Button from "src/components/ui/button"
import Radio from "src/components/ui/radio-button/radio"
import { PiTextAlignCenterBold, PiTextAlignJustifyBold, PiTextAlignLeftBold, PiTextAlignRightBold } from "react-icons/pi"

const TextAlignProperties = ({
    form,
    onChange
}:{
    form:paperBlockPropsType,
    onChange:(key: string, value: any) => void
}) =>{
    return(
        <PropertiesFieldSection txtLabel="Text Alignment">
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:'var(--space-100)'}}>
                <Button
                    txtLabel={<PiTextAlignLeftBold className="global-icon"/>}
                    onClick={()=>{onChange('textAlign', 'left')}}
                    isSelected={form['textAlign']==='left'}
                    iconBefore={<Radio isSelected={form['textAlign']==='left'}/>}
                />
                <Button
                    txtLabel={<PiTextAlignCenterBold className="global-icon"/>}
                    onClick={()=>{onChange('textAlign', 'center')}}
                    isSelected={form['textAlign']==='center'}
                    iconBefore={<Radio isSelected={form['textAlign']==='center'}/>}
                />
                <Button
                    txtLabel={<PiTextAlignRightBold className="global-icon"/>}
                    onClick={()=>{onChange('textAlign', 'right')}}
                    isSelected={form['textAlign']==='right'}
                    iconBefore={<Radio isSelected={form['textAlign']==='right'}/>}
                />
                <Button
                    txtLabel={<PiTextAlignJustifyBold className="global-icon"/>}
                    onClick={()=>{onChange('textAlign', 'justify')}}
                    isSelected={form['textAlign']==='justify'}
                    iconBefore={<Radio isSelected={form['textAlign']==='justify'}/>}
                />
            </div>
        </PropertiesFieldSection>
    )
}

export default TextAlignProperties
