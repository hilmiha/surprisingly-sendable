import type { paperBlockPropsType } from "src/containers/canvas-module/context"
import PropertiesFieldSection from "../../properties-field-section"
import InputTextarea from "src/components/ui/input-textarea"

const UrlProperties = ({
    form,
    onChange
}:{
    form:paperBlockPropsType,
    onChange:(key: string, value: any) => void
}) =>{
    return(
        <PropertiesFieldSection txtLabel="URL Direction">
            <div style={{display:'grid', gridTemplateColumns:'1fr', gap:'var(--space-100)', maxWidth:'100%'}}>
                <InputTextarea
                    type="text-no-space"
                    txtPlaceholder="Enter URL link..."
                    value={form['url']}
                    onChange={(newValue)=>{onChange('url', newValue)}}
                />
            </div>
        </PropertiesFieldSection>
    )
}

export default UrlProperties