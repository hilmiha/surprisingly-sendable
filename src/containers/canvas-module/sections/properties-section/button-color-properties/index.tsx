import type { paperBlockPropsType } from "src/containers/canvas-module/context"
import PropertiesFieldSection from "../../properties-field-section"
import PropertiesColorField from "src/containers/canvas-module/components/properties-color-field"

const ButtonColorProperties = ({
    form,
    onChange
}:{
    form:paperBlockPropsType,
    onChange:(key: string, value: any) => void
}) =>{
    return(
        <PropertiesFieldSection txtLabel="Button Color">
            <div style={{display:'grid', gridTemplateColumns:'1fr', gap:'var(--space-100)', maxWidth:'100%'}}>
                <PropertiesColorField
                    value={form['buttonColor']}
                    onChange={(newValue)=>{
                        onChange('buttonColor', newValue)
                        if(newValue===undefined){
                            if(form['textColor']==='#FFFFFF'){
                                onChange('textColor', form['buttonColor']||'#0F147A')
                            }
                        }
                        if(!form['buttonColor']){
                            onChange('buttonColor', '#0F147A')
                            if('#0F147A'===form['textColor']){
                                onChange('textColor', '#FFFFFF')
                            }
                        }
                    }}
                />
            </div>
        </PropertiesFieldSection>
    )
}

export default ButtonColorProperties