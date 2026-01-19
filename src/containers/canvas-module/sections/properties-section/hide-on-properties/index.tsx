import type { paperBlockPropsType } from "src/containers/canvas-module/context"
import PropertiesFieldSection from "../../properties-field-section"
import Button from "src/components/ui/button"
import Radio from "src/components/ui/radio-button/radio"
import { PiDeviceMobileBold, PiMonitorBold } from "react-icons/pi"

const HideOnProperties = ({
    form,
    onChange
}:{
    form:paperBlockPropsType,
    onChange:(key: string, value: any) => void
}) =>{
    return(
        <PropertiesFieldSection txtLabel="Hide On">
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:'var(--space-100)'}}>
                <Button
                    txtLabel={'off'}
                    onClick={()=>{onChange('visibility', 'both')}}
                    isSelected={form['visibility']==='both'}
                    iconBefore={<Radio isSelected={form['visibility']==='both'}/>}
                />
                <Button
                    txtLabel={<PiMonitorBold className="global-icon"/>}
                    onClick={()=>{onChange('visibility', 'hide-desktop')}}
                    isSelected={form['visibility']==='hide-desktop'}
                    iconBefore={<Radio isSelected={form['visibility']==='hide-desktop'}/>}
                />
                <Button
                    txtLabel={<PiDeviceMobileBold className="global-icon"/>}
                    onClick={()=>{onChange('visibility', 'hide-mobile')}}
                    isSelected={form['visibility']==='hide-mobile'}
                    iconBefore={<Radio isSelected={form['visibility']==='hide-mobile'}/>}
                />
            </div>
        </PropertiesFieldSection>
    )
}

export default HideOnProperties