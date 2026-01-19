import type { paperBlockPropsType } from "src/containers/canvas-module/context"
import PropertiesFieldSection from "../../properties-field-section"
import InputSelection from "src/components/ui/input-selection"
import { listFontFamilyRoot } from "src/containers/canvas-module/data/font-family"

const GlobalFontFamilyProperties = ({
    form,
    onChange
}:{
    form:paperBlockPropsType,
    onChange:(key: string, value: any) => void
}) =>{
    return(
        <PropertiesFieldSection txtLabel="Global Font Family">
            <div style={{display:'grid', gridTemplateColumns:'1fr', gap:'var(--space-100)', maxWidth:'100%'}}>
                <InputSelection
                    type="single"
                    option={listFontFamilyRoot}
                    value={form['fontFamily']?([form['fontFamily']]):([])}
                    onChange={(newValue)=>{onChange('fontFamily', newValue[0]||listFontFamilyRoot[0].id||'')}}
                />
            </div>
        </PropertiesFieldSection>
    )
}

export default GlobalFontFamilyProperties
