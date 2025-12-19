import type { paperBlockPropsType } from "src/containers/canvas-module/context"
import PropertiesFieldSection from "../../properties-field-section"
import InputColor from "src/components/ui/input-color"

const TextColorProperties = ({
    form,
    onChange
}:{
    form:paperBlockPropsType,
    onChange:(key: string, value: any) => void
}) =>{
    return(
        <PropertiesFieldSection txtLabel="Text Color">
            <div style={{display:'grid', gridTemplateColumns:'1fr', gap:'var(--space-100)', maxWidth:'100%'}}>
                <InputColor
                    txtPlaceholder="Select color..."
                    value={form['textColor']}
                    onChange={(newValue)=>{onChange('textColor', newValue||"#000000")}}
                />
            </div>
        </PropertiesFieldSection>
    )
}

export default TextColorProperties