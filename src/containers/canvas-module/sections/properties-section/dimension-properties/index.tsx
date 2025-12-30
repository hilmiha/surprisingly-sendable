import type { paperBlockPropsType } from "src/containers/canvas-module/context"
import PropertiesFieldSection from "../../properties-field-section"
import InputText from "src/components/ui/input-text"
import { PiArrowsHorizontalBold, PiArrowsVerticalBold } from "react-icons/pi"

const DimentionProperties = ({
    form,
    onChange
}:{
    form:paperBlockPropsType,
    onChange:(key: string, value: any) => void
}) =>{
    return(
        <PropertiesFieldSection txtLabel="Dimention">
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'var(--space-100)', maxWidth:'100%'}}>
                {
                    ('height' in form) && (
                        <InputText
                            type="number"
                            txtPlaceholder="Auto"
                            value={form['height']}
                            onChange={(newValue)=>{onChange('height', newValue)}}
                            onBlur={(_, newValue)=>{!newValue&&onChange('height', newValue)}}
                            config={{
                                prefixElement:(<PiArrowsVerticalBold className="gloabl-icon"/>),
                                sufixElement:'px',
                                maxLength:3
                            }}
                        />
                    )
                }
                {
                    ('width' in form) && (
                        <InputText
                            type="number"
                            txtPlaceholder="Auto"
                            value={form['width']}
                            onChange={(newValue)=>{onChange('width', newValue)}}
                            onBlur={(_, newValue)=>{!newValue&&onChange('width', newValue)}}
                            config={{
                                prefixElement:(<PiArrowsHorizontalBold className="gloabl-icon"/>),
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

export default DimentionProperties