import type { paperBlockPropsType } from "src/containers/canvas-module/context"
import PropertiesFieldSection from "../../properties-field-section"
import InputText from "src/components/ui/input-text"

const HeightProperties = ({
    form,
    onChange
}:{
    form:paperBlockPropsType,
    onChange:(key: string, value: any) => void
}) =>{
    return(
        <PropertiesFieldSection txtLabel="Height">
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'var(--space-100)', maxWidth:'100%'}}>
                <InputText
                    type="number"
                    txtPlaceholder="Auto"
                    value={form['height']}
                    onChange={(newValue)=>{onChange('height', newValue)}}
                    onBlur={(_, newValue)=>{!newValue&&onChange('height', newValue)}}
                    config={{
                        sufixElement:'px',
                        maxLength:3
                    }}
                />
            </div>
        </PropertiesFieldSection>
    )
}

export default HeightProperties