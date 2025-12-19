import type { paperBlockPropsType } from "src/containers/canvas-module/context"
import PropertiesFieldSection from "../../properties-field-section"
import Button from "src/components/ui/button"
import Radio from "src/components/ui/radio-button/radio"

const ColumnCountProperties = ({
    form,
    onChange
}:{
    form:paperBlockPropsType,
    onChange:(key: string, value: any) => void
}) =>{
    return(
        <PropertiesFieldSection txtLabel="Column Count">
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'var(--space-100)'}}>
                <Button 
                    txtLabel='1 Column' 
                    onClick={()=>{onChange('columnCount', '1')}}
                    iconBefore={<Radio isSelected={form['columnCount']==='1'}/>}
                    isSelected={form['columnCount']==='1'}
                />
                <Button 
                    txtLabel='2 Column' 
                    onClick={()=>{onChange('columnCount', '2')}}
                    iconBefore={<Radio isSelected={form['columnCount']==='2'}/>}
                    isSelected={form['columnCount']==='2'}
                />
                <Button 
                    txtLabel='3 Column' 
                    onClick={()=>{onChange('columnCount', '3')}}
                    iconBefore={<Radio isSelected={form['columnCount']==='3'}/>}
                    isSelected={form['columnCount']==='3'}
                />
            </div>
        </PropertiesFieldSection>
    )
}

export default ColumnCountProperties