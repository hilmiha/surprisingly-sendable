import type { paperBlockPropsType } from "src/containers/canvas-module/context"
import PropertiesFieldSection from "../../properties-field-section"
import InputText from "src/components/ui/input-text"

const ColumnSizeProperties = ({
    form,
    onChange
}:{
    form:paperBlockPropsType,
    onChange:(key: string, value: any) => void
}) =>{
    return(
        <PropertiesFieldSection txtLabel="Column Size">
            <div style={{display:'grid', gridTemplateColumns:form['columnCount']==='3'?'1fr 1fr 1fr':form['columnCount']==='2'?('1fr 1fr'):('1fr'), gap:'var(--space-100)', maxWidth:'100%'}}>
                <InputText
                    type="number"
                    txtPlaceholder="Auto"
                    value={form['column1Size']}
                    onChange={(newValue)=>{onChange('column1Size', newValue)}}
                    config={{
                        prefixElement:'C1',
                        sufixElement:'px',
                        maxLength:3
                    }}
                />
                {
                    (form['columnCount']==='2' || form['columnCount']==='3')&&(
                        <InputText
                            type="number"
                            txtPlaceholder="Auto"
                            value={form['column2Size']}
                            onChange={(newValue)=>{onChange('column2Size', newValue)}}
                            config={{
                                prefixElement:'C2',
                                sufixElement:'px',
                                maxLength:3
                            }}
                        />
                    )
                }
                
                {
                    (form['columnCount']==='3')&&(
                        <InputText
                            type="number"
                            txtPlaceholder="Auto"
                            value={form['column3Size']}
                            onChange={(newValue)=>{onChange('column3Size', newValue)}}
                            config={{
                                prefixElement:'C3',
                                sufixElement:'px',
                                maxLength:3,
                            }}
                        />
                    )
                }
                
            </div>
        </PropertiesFieldSection>
    )
}

export default ColumnSizeProperties
