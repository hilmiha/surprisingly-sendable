import type { paperBlockPropsType } from "src/containers/canvas-module/context"
import PropertiesFieldSection from "../../properties-field-section"
import InputText from "src/components/ui/input-text"
import { PiArrowsHorizontalBold } from "react-icons/pi"

const PaperDimentionProperties = ({
    form,
    onChange,
    
}:{
    form:paperBlockPropsType,
    onChange:(key: string, value: any) => void
}) =>{
    return(
        <PropertiesFieldSection txtLabel="Paper Max Dimention">
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'var(--space-100)', maxWidth:'100%'}}>
                {
                    ('width' in form) && (
                        <InputText
                            type="number"
                            txtPlaceholder="Auto"
                            value={form['width']}
                            onChange={(newValue)=>{onChange('width', newValue)}}
                            onBlur={(_, newValue)=>{!newValue&&onChange('width', newValue)}}
                            isDisabled={true}
                            config={{
                                prefixElement:(<PiArrowsHorizontalBold className="global-icon"/>),
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

export default PaperDimentionProperties