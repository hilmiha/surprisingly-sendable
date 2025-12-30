import { useCanvasModule, type paperBlockPropsType } from "src/containers/canvas-module/context"
import PropertiesFieldSection from "../../properties-field-section"
import Button from "src/components/ui/button"
import Radio from "src/components/ui/radio-button/radio"

const ListTypeProperties = ({
    form,
    onChange
}:{
    form:paperBlockPropsType,
    onChange:(key: string, value: any) => void
}) =>{
    const {
        setRefreshListType,
    } = useCanvasModule()
    return(
        <PropertiesFieldSection txtLabel="List Type">
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'var(--space-100)'}}>
                <Button
                    txtLabel="bullet"
                    onClick={()=>{
                        if(form['listType']!=='bullet'){
                            onChange('listType', 'bullet')
                            const cnovertDelta = JSON.stringify(form['textDelta']).replaceAll(`"list":"ordered"`, `"list":"bullet"`)
                            onChange('textDelta', JSON.parse(cnovertDelta))
                            setTimeout(() => {
                                setRefreshListType(1)
                            }, 100);
                            setTimeout(() => {
                                setRefreshListType(0)
                            }, 500);
                        }
                    }}
                    isSelected={form['listType']==='bullet'}
                    iconBefore={<Radio isSelected={form['listType']==='bullet'}/>}
                />
                <Button
                    txtLabel="ordered"
                    onClick={()=>{
                        if(form['listType']!=='ordered'){
                            onChange('listType', 'ordered')
                            const cnovertDelta = JSON.stringify(form['textDelta']).replaceAll(`"list":"bullet"`, `"list":"ordered"`)
                            onChange('textDelta', JSON.parse(cnovertDelta))
                            setTimeout(() => {
                                setRefreshListType(1)
                            }, 100);
                            setTimeout(() => {
                                setRefreshListType(0)
                            }, 500);
                        }
                    }}
                    isSelected={form['listType']==='ordered'}
                    iconBefore={<Radio isSelected={form['listType']==='ordered'}/>}
                />
            </div>
        </PropertiesFieldSection>
    )
}

export default ListTypeProperties