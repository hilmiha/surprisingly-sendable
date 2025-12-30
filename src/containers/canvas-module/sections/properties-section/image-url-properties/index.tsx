import type { paperBlockPropsType } from "src/containers/canvas-module/context"
import PropertiesFieldSection from "../../properties-field-section"
import InputTextarea from "src/components/ui/input-textarea"

const ImageUrlProperties = ({
    form,
    onChange
}:{
    form:paperBlockPropsType,
    onChange:(key: string, value: any) => void
}) =>{
    return(
        <PropertiesFieldSection txtLabel="Image URL">
            <div style={{display:'grid', gridTemplateColumns:'1fr', gap:'var(--space-100)', maxWidth:'100%'}}>
                <InputTextarea
                    type="text-no-space"
                    txtPlaceholder="Enter URL link..."
                    value={form['imageSrcUrl']}
                    onChange={(newValue)=>{onChange('imageSrcUrl', newValue)}}
                />
            </div>
        </PropertiesFieldSection>
    )
}

export default ImageUrlProperties