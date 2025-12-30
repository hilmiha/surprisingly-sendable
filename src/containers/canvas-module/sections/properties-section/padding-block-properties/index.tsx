import type { paperBlockPropsType } from "src/containers/canvas-module/context"
import PropertiesFieldSection from "../../properties-field-section"
import InputText from "src/components/ui/input-text"
import { TbLayoutBottombarFilled, TbLayoutNavbarFilled, TbLayoutSidebarFilled, TbLayoutSidebarRightFilled } from "react-icons/tb"

const PaddingBlockProperties = ({
    form,
    onChange,
}:{
    form:paperBlockPropsType,
    onChange:(key: string, value: any) => void,
}) =>{

    return(
        <PropertiesFieldSection txtLabel="Block Padding">
            {
                ('paddingTop' in form) && (
                    <div style={{display:'grid', gridTemplateColumns:'0.33fr', gap:'var(--space-200)', justifyContent:'center', maxWidth:'100%'}}>
                        <InputText
                            type="number"
                            txtPlaceholder="Value..."
                            value={form['paddingTop']}
                            onChange={(newValue)=>{onChange('paddingTop', newValue)}}
                            onBlur={(_, newValue)=>{!newValue&&onChange('paddingTop', newValue||'0')}}
                            config={{
                                prefixElement:(<TbLayoutNavbarFilled className="global-icon"/>),
                                sufixElement:'px',
                                maxLength:3
                            }}
                            
                        />
                    </div>
                )
            }
            <div style={{display:'grid', alignItems:'center', gridTemplateColumns:'1fr 1fr 1fr', gap:'var(--space-200)', maxWidth:'100%', marginTop:'var(--space-200)'}}>
                {
                    ('paddingLeft' in form) && (
                        <InputText
                            type="number"
                            txtPlaceholder="Value..."
                            value={form['paddingLeft']}
                            onChange={(newValue)=>{onChange('paddingLeft', newValue)}}
                            onBlur={(_, newValue)=>{!newValue&&onChange('paddingLeft', newValue||'0')}}
                            config={{
                                prefixElement:(<TbLayoutSidebarFilled className="global-icon"/>),
                                sufixElement:'px',
                                maxLength:3
                            }}
                            
                        />
                    )
                }
                <div className="global-disbaled-bg" style={{border:"1px dashed var(--clr-border)", padding:'var(--space-200)'}}>
                    <div style={{backgroundColor:"var(--clr-surface-1)", border:"1px dashed var(--clr-border)", padding:'var(--space-100)'}}>
                        <p className="text-sm" style={{textAlign:'center', color:'var(--clr-surface-5)'}}>Content</p>
                    </div>
                </div>
                {
                    ('paddingRight' in form) && (
                        <InputText
                            type="number"
                            txtPlaceholder="Value..."
                            value={form['paddingRight']}
                            onChange={(newValue)=>{onChange('paddingRight', newValue)}}
                            onBlur={(_, newValue)=>{!newValue&&onChange('paddingRight', newValue||'0')}}
                            config={{
                                prefixElement:(<TbLayoutSidebarRightFilled className="global-icon"/>),
                                sufixElement:'px',
                                maxLength:3
                            }}
                        />
                    )
                }
            </div>
            {
                ('paddingBottom' in form) && (
                    <div style={{display:'grid', gridTemplateColumns:'0.33fr', gap:'var(--space-200)', justifyContent:'center', maxWidth:'100%', marginTop:'var(--space-200)'}}>
                        <InputText
                            type="number"
                            txtPlaceholder="Value..."
                            value={form['paddingBottom']}
                            onChange={(newValue)=>{onChange('paddingBottom', newValue)}}
                            onBlur={(_, newValue)=>{!newValue&&onChange('paddingBottom', newValue||'0')}}
                            config={{
                                prefixElement:(<TbLayoutBottombarFilled className="global-icon"/>),
                                sufixElement:'px',
                                maxLength:3
                            }}
                        />
                    </div>
                )
            }
            
        </PropertiesFieldSection>
    )
}

export default PaddingBlockProperties