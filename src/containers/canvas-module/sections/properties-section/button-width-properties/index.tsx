import { type paperBlockPropsType } from "src/containers/canvas-module/context"
import PropertiesFieldSection from "../../properties-field-section"
import Button from "src/components/ui/button"
import Radio from "src/components/ui/radio-button/radio"

const ButtonWidthProperties = ({
    form,
    onChange
}:{
    form:paperBlockPropsType,
    onChange:(key: string, value: any) => void
}) =>{
    return(
        <PropertiesFieldSection txtLabel="Button Width">
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'var(--space-100)'}}>
                <Button
                    txtLabel="auto"
                    onClick={()=>{onChange('buttonWidth', 'auto')}}
                    isSelected={form['buttonWidth']==='auto'}
                    iconBefore={<Radio isSelected={form['buttonWidth']==='auto'}/>}
                />
                <Button
                    txtLabel="full"
                    onClick={()=>{onChange('buttonWidth', 'full')}}
                    isSelected={form['buttonWidth']==='full'}
                    iconBefore={<Radio isSelected={form['buttonWidth']==='full'}/>}
                />
            </div>
        </PropertiesFieldSection>
    )
}

export default ButtonWidthProperties