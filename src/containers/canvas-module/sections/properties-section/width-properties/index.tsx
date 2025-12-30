import type { paperBlockPropsType } from "src/containers/canvas-module/context"
import PropertiesFieldSection from "../../properties-field-section"
import InputText from "src/components/ui/input-text"

const WidthProperties = ({
    form,
    onChange
}:{
    form:paperBlockPropsType,
    onChange:(key: string, value: any) => void
}) =>{
    return(
        <PropertiesFieldSection txtLabel="Width">
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'var(--space-100)', maxWidth:'100%'}}>
                <InputText
                    type="number"
                    txtPlaceholder="Auto"
                    value={form['width']}
                    onChange={(newValue)=>{onChange('width', newValue)}}
                    onBlur={(_, newValue)=>{!newValue&&onChange('width', newValue)}}
                    config={{
                        sufixElement:'px',
                        maxLength:3
                    }}
                />
            </div>
        </PropertiesFieldSection>
    )
}

export default WidthProperties