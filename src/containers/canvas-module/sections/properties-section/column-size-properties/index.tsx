import type { paperBlockPropsType } from "src/containers/canvas-module/context"
import PropertiesFieldSection from "../../properties-field-section"
import InputText from "src/components/ui/input-text"

const ColumnSizeProperties = ({
    form,
    onChange
}:{
    form:paperBlockPropsType,
    onChange:(key: string, value: any) => void
}) =>{
    return(
        <PropertiesFieldSection txtLabel="Column Size">
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'var(--space-100)', maxWidth:'100%'}}>
                <InputText
                    type="number"
                    txtPlaceholder="Auto"
                    value={form['column1Size']}
                    onChange={(newValue)=>{onChange('column1Size', newValue)}}
                    config={{
                        sufixElement:'px',
                        maxLength:3
                    }}
                />
                <InputText
                    type="number"
                    txtPlaceholder="Auto"
                    value={form['column2Size']}
                    onChange={(newValue)=>{onChange('column2Size', newValue)}}
                    config={{
                        sufixElement:'px',
                        maxLength:3
                    }}
                />
                <InputText
                    type="number"
                    txtPlaceholder="Auto"
                    value={form['column3Size']}
                    onChange={(newValue)=>{onChange('column3Size', newValue)}}
                    config={{
                        sufixElement:'px',
                        maxLength:3
                    }}
                />
            </div>
        </PropertiesFieldSection>
    )
}

export default ColumnSizeProperties