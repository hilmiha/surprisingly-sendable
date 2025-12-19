import type { paperBlockPropsType } from "src/containers/canvas-module/context"
import PropertiesFieldSection from "../../properties-field-section"
import InputText from "src/components/ui/input-text"

const GlobalHeadingSizeProperties = ({
    form,
    onChange
}:{
    form:paperBlockPropsType,
    onChange:(key: string, value: any) => void
}) =>{
    return(
        <PropertiesFieldSection txtLabel="Global Heading Size">
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'var(--space-100)', maxWidth:'100%'}}>
                {
                    ('h1Size' in form) && (
                        <InputText
                            type="number"
                            txtPlaceholder="Value..."
                            value={form['h1Size']}
                            onChange={(newValue)=>{onChange('h1Size', newValue)}}
                            onBlur={(_, newValue)=>{!newValue&&onChange('h1Size', newValue||'32')}}
                            config={{   
                                prefixElement:'H1',
                                sufixElement:'px',
                                maxLength:2
                            }}
                        />
                    )
                }
                {
                    ('h2Size' in form) && (
                        <InputText
                            type="number"
                            txtPlaceholder="Value..."
                            value={form['h2Size']}
                            onChange={(newValue)=>{onChange('h2Size', newValue)}}
                            onBlur={(_, newValue)=>{!newValue&&onChange('h2Size', newValue||'24')}}
                            config={{
                                prefixElement:'H2',
                                sufixElement:'px',
                                maxLength:2
                            }}
                        />
                    )
                }
                {
                    ('h3Size' in form) && (
                        <InputText
                            type="number"
                            txtPlaceholder="Value..."
                            value={form['h3Size']}
                            onChange={(newValue)=>{onChange('h3Size', newValue)}}
                            onBlur={(_, newValue)=>{!newValue&&onChange('h3Size', newValue||'20')}}
                            config={{
                                prefixElement:'H3',
                                sufixElement:'px',
                                maxLength:2
                            }}
                        />
                    )
                }
            </div>
        </PropertiesFieldSection>
    )
}

export default GlobalHeadingSizeProperties