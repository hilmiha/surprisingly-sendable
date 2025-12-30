import type { paperBlockPropsType } from "src/containers/canvas-module/context"
import PropertiesFieldSection from "../../properties-field-section"
import InputText from "src/components/ui/input-text"
import { TbRadiusBottomLeft, TbRadiusBottomRight, TbRadiusTopLeft, TbRadiusTopRight } from "react-icons/tb"

const BorderRadiusProperties = ({
    form,
    onChange
}:{
    form:paperBlockPropsType,
    onChange:(key: string, value: any) => void
}) =>{
    return(
        <PropertiesFieldSection txtLabel="Border Radius">
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'var(--space-100)', maxWidth:'100%', marginTop:'var(--space-100)'}}>
                {
                    ('borderRadiusTL' in form) && (
                        <InputText
                            type="number"
                            txtPlaceholder="Value..."
                            value={form['borderRadiusTL']}
                            onChange={(newValue)=>{onChange('borderRadiusTL', newValue)}}
                            onBlur={(_, newValue)=>{!newValue&&onChange('borderRadiusTL', newValue||'0')}}
                            config={{
                                prefixElement:(<TbRadiusTopLeft className="global-icon"/>),
                                sufixElement:'px',
                                maxLength:3
                            }}
                            
                        />
                    )
                }
                {
                    ('borderRadiusTR' in form) && (
                        <InputText
                            type="number"
                            txtPlaceholder="Value..."
                            value={form['borderRadiusTR']}
                            onChange={(newValue)=>{onChange('borderRadiusTR', newValue)}}
                            onBlur={(_, newValue)=>{!newValue&&onChange('borderRadiusTR', newValue||'0')}}
                            config={{
                                prefixElement:(<TbRadiusTopRight className="global-icon"/>),
                                sufixElement:'px',
                                maxLength:3
                            }}
                            
                        />
                    )
                }
                {
                    ('borderRadiusBL' in form) && (
                        <InputText
                            type="number"
                            txtPlaceholder="Value..."
                            value={form['borderRadiusBL']}
                            onChange={(newValue)=>{onChange('borderRadiusBL', newValue)}}
                            onBlur={(_, newValue)=>{!newValue&&onChange('borderRadiusBL', newValue||'0')}}
                            config={{
                                prefixElement:(<TbRadiusBottomLeft className="global-icon"/>),
                                sufixElement:'px',
                                maxLength:3
                            }}
                        />
                    )
                }
                {
                    ('borderRadiusBR' in form) && (
                        <InputText
                            type="number"
                            txtPlaceholder="Value..."
                            value={form['borderRadiusBR']}
                            onChange={(newValue)=>{onChange('borderRadiusBR', newValue)}}
                            onBlur={(_, newValue)=>{!newValue&&onChange('borderRadiusBR', newValue||'0')}}
                            config={{
                                prefixElement:(<TbRadiusBottomRight className="global-icon"/>),
                                sufixElement:'px',
                                maxLength:3
                            }}
                        />
                    )
                }
            </div>
        </PropertiesFieldSection>
    )
}

export default BorderRadiusProperties