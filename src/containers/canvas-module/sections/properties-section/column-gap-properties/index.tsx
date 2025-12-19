import type { paperBlockPropsType } from "src/containers/canvas-module/context"
import PropertiesFieldSection from "../../properties-field-section"
import InputText from "src/components/ui/input-text"

const ColumnGapProperties = ({
    form,
    onChange
}:{
    form:paperBlockPropsType,
    onChange:(key: string, value: any) => void
}) =>{
    return(
        <PropertiesFieldSection txtLabel="Column Gap">
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'var(--space-100)', maxWidth:'100%'}}>
                <InputText
                    type="number"
                    txtPlaceholder="Value..."
                    value={form['columnGap']}
                    onChange={(newValue)=>{onChange('columnGap', newValue)}}
                    onBlur={(_, newValue)=>{!newValue&&onChange('columnGap', newValue||'0')}}
                    config={{
                        sufixElement:'px',
                        maxLength:2
                    }}
                />
            </div>
        </PropertiesFieldSection>
    )
}

export default ColumnGapProperties