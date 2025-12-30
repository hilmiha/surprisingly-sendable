import type { paperBlockPropsType } from "src/containers/canvas-module/context"
import PropertiesFieldSection from "../../properties-field-section"
import InputText from "src/components/ui/input-text"
import { TbLayoutBottombarFilled, TbLayoutNavbarFilled, TbLayoutSidebarFilled, TbLayoutSidebarRightFilled } from "react-icons/tb"

const PaddingContentProperties = ({
    form,
    onChange,
    contentLabel = 'Content'
}:{
    form:paperBlockPropsType,
    onChange:(key: string, value: any) => void,
    contentLabel?:string
}) =>{

    return(
        <PropertiesFieldSection txtLabel="Content Padding">
            {
                ('contentPaddingTop' in form) && (
                    <div style={{display:'grid', gridTemplateColumns:'0.33fr', gap:'var(--space-200)', justifyContent:'center', maxWidth:'100%'}}>
                        <InputText
                            type="number"
                            txtPlaceholder="Value..."
                            value={form['contentPaddingTop']}
                            onChange={(newValue)=>{onChange('contentPaddingTop', newValue)}}
                            onBlur={(_, newValue)=>{!newValue&&onChange('contentPaddingTop', newValue||'0')}}
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
                    ('contentPaddingLeft' in form) && (
                        <InputText
                            type="number"
                            txtPlaceholder="Value..."
                            value={form['contentPaddingLeft']}
                            onChange={(newValue)=>{onChange('contentPaddingLeft', newValue)}}
                            onBlur={(_, newValue)=>{!newValue&&onChange('contentPaddingLeft', newValue||'0')}}
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
                        <p className="text-sm" style={{textAlign:'center', color:'var(--clr-surface-5)'}}>{contentLabel}</p>
                    </div>
                </div>
                {
                    ('contentPaddingRight' in form) && (
                        <InputText
                            type="number"
                            txtPlaceholder="Value..."
                            value={form['contentPaddingRight']}
                            onChange={(newValue)=>{onChange('contentPaddingRight', newValue)}}
                            onBlur={(_, newValue)=>{!newValue&&onChange('contentPaddingRight', newValue||'0')}}
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
                ('contentPaddingBottom' in form) && (
                    <div style={{display:'grid', gridTemplateColumns:'0.33fr', gap:'var(--space-200)', justifyContent:'center', maxWidth:'100%', marginTop:'var(--space-200)'}}>
                        <InputText
                            type="number"
                            txtPlaceholder="Value..."
                            value={form['contentPaddingBottom']}
                            onChange={(newValue)=>{onChange('contentPaddingBottom', newValue)}}
                            onBlur={(_, newValue)=>{!newValue&&onChange('contentPaddingBottom', newValue||'0')}}
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

export default PaddingContentProperties