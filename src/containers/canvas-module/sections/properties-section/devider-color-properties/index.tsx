import type { paperBlockPropsType } from "src/containers/canvas-module/context"
import PropertiesFieldSection from "../../properties-field-section"
import InputColor from "src/components/ui/input-color"

const DeviderColorProperties = ({
    form,
    onChange
}:{
    form:paperBlockPropsType,
    onChange:(key: string, value: any) => void
}) =>{
    return(
        <PropertiesFieldSection txtLabel="Devider Color">
            <div style={{display:'grid', gridTemplateColumns:'1fr', gap:'var(--space-100)', maxWidth:'100%'}}>
                <InputColor
                    txtPlaceholder="Select color..."
                    value={form['deviderColor']}
                    onChange={(newValue)=>{onChange('deviderColor', newValue||"#FFFFFF")}}
                />
            </div>
        </PropertiesFieldSection>
    )
}

export default DeviderColorProperties