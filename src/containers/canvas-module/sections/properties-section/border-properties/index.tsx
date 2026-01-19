import type { paperBlockPropsType } from "src/containers/canvas-module/context"
import PropertiesFieldSection from "../../properties-field-section"
import PropertiesColorField from "src/containers/canvas-module/components/properties-color-field"
import InputText from "src/components/ui/input-text"
import { TbBorderBottom, TbBorderLeft, TbBorderRight, TbBorderTop } from "react-icons/tb"

const BorderProperties = ({
    form,
    onChange
}:{
    form:paperBlockPropsType,
    onChange:(key: string, value: any) => void
}) =>{
    return(
        <PropertiesFieldSection txtLabel="Border">
            <div style={{display:'grid', gridTemplateColumns:'1fr', gap:'var(--space-100)', maxWidth:'100%'}}>
                <PropertiesColorField
                    value={form['borderColor']}
                    onChange={(newValue)=>{onChange('borderColor', newValue||'')}}
                    onClear={()=>{
                        onChange('borderTop', '1')
                        onChange('borderBottom', '1')
                        onChange('borderLeft', '1')
                        onChange('borderRight', '1')
                    }}
                    defaultColor='#F1F1F1'
                />
            </div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'var(--space-100)', maxWidth:'100%', marginTop:'var(--space-100)'}}>
                {
                    (!!form['borderColor'] && 'borderTop' in form) && (
                        <InputText
                            type="number"
                            txtPlaceholder="Value..."
                            value={form['borderTop']}
                            onChange={(newValue)=>{onChange('borderTop', newValue)}}
                            onBlur={(_, newValue)=>{!newValue&&onChange('borderTop', newValue||'0')}}
                            config={{
                                prefixElement:(<TbBorderTop className="global-icon"/>),
                                sufixElement:'px',
                                maxLength:2
                            }}
                            
                        />
                    )
                }
                {
                    (!!form['borderColor'] && 'borderBottom' in form) && (
                        <InputText
                            type="number"
                            txtPlaceholder="Value..."
                            value={form['borderBottom']}
                            onChange={(newValue)=>{onChange('borderBottom', newValue)}}
                            onBlur={(_, newValue)=>{!newValue&&onChange('borderBottom', newValue||'0')}}
                            config={{
                                prefixElement:(<TbBorderBottom className="global-icon"/>),
                                sufixElement:'px',
                                maxLength:2
                            }}
                            
                        />
                    )
                }
                {
                    (!!form['borderColor'] && 'borderLeft' in form) && (
                        <InputText
                            type="number"
                            txtPlaceholder="Value..."
                            value={form['borderLeft']}
                            onChange={(newValue)=>{onChange('borderLeft', newValue)}}
                            onBlur={(_, newValue)=>{!newValue&&onChange('borderLeft', newValue||'0')}}
                            config={{
                                prefixElement:(<TbBorderLeft className="global-icon"/>),
                                sufixElement:'px',
                                maxLength:2
                            }}
                        />
                    )
                }
                {
                    (!!form['borderColor'] && 'borderRight' in form) && (
                        <InputText
                            type="number"
                            txtPlaceholder="Value..."
                            value={form['borderRight']}
                            onChange={(newValue)=>{onChange('borderRight', newValue)}}
                            onBlur={(_, newValue)=>{!newValue&&onChange('borderRight', newValue||'0')}}
                            config={{
                                prefixElement:(<TbBorderRight className="global-icon"/>),
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

export default BorderProperties