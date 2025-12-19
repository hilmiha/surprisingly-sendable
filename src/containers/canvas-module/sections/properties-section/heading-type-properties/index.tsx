import type { paperBlockPropsType } from "src/containers/canvas-module/context"
import PropertiesFieldSection from "../../properties-field-section"
import Button from "src/components/ui/button"
import Radio from "src/components/ui/radio-button/radio"

const HeadingTypeProperties = ({
    form,
    onChange
}:{
    form:paperBlockPropsType,
    onChange:(key: string, value: any) => void
}) =>{
    return(
        <PropertiesFieldSection txtLabel="Heading Type">
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'var(--space-100)'}}>
                <Button 
                    txtLabel='Heading 1' 
                    onClick={()=>{onChange('textType', 'h1')}}
                    iconBefore={<Radio isSelected={form['textType']==='h1'}/>}
                    isSelected={form['textType']==='h1'}
                />
                <Button 
                    txtLabel='Heading 2' 
                    onClick={()=>{onChange('textType', 'h2')}}
                    iconBefore={<Radio isSelected={form['textType']==='h2'}/>}
                    isSelected={form['textType']==='h2'}
                />
                <Button 
                    txtLabel='Heading 3' 
                    onClick={()=>{onChange('textType', 'h3')}}
                    iconBefore={<Radio isSelected={form['textType']==='h3'}/>}
                    isSelected={form['textType']==='h3'}
                />
            </div>
        </PropertiesFieldSection>
    )
}

export default HeadingTypeProperties