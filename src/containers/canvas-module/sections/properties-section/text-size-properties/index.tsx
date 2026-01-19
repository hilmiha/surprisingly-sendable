import type { paperBlockPropsType } from "src/containers/canvas-module/context"
import PropertiesFieldSection from "../../properties-field-section"
import InputText from "src/components/ui/input-text"

const TextSizeProperties = ({
    form,
    onChange
}:{
    form:paperBlockPropsType,
    onChange:(key: string, value: any) => void
}) =>{
    return(
        <PropertiesFieldSection txtLabel="Text Size">
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'var(--space-100)', maxWidth:'100%'}}>
                <InputText
                    type="number"
                    txtPlaceholder="Value..."
                    value={form['fontSize']}
                    onChange={(newValue)=>{onChange('fontSize', newValue)}}
                    onBlur={(_, newValue)=>{!newValue&&onChange('fontSize', newValue||'12')}}
                    config={{
                        sufixElement:'px',
                        maxLength:2
                    }}
                />
            </div>
        </PropertiesFieldSection>
    )
}

export default TextSizeProperties
