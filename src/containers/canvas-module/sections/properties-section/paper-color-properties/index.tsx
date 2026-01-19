import type { paperBlockPropsType } from "src/containers/canvas-module/context"
import PropertiesFieldSection from "../../properties-field-section"
import PropertiesColorField from "src/containers/canvas-module/components/properties-color-field"

const PaperColorProperties = ({
    form,
    onChange
}:{
    form:paperBlockPropsType,
    onChange:(key: string, value: any) => void
}) =>{
    return(
        <PropertiesFieldSection txtLabel="Paper Color">
            <div style={{display:'grid', gridTemplateColumns:'1fr', gap:'var(--space-100)', maxWidth:'100%'}}>
                <PropertiesColorField
                    value={form['backgroundColor']}
                    onChange={(newValue)=>{onChange('backgroundColor', newValue||'')}}
                />
            </div>
        </PropertiesFieldSection>
    )
}

export default PaperColorProperties
