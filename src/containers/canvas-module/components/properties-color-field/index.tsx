import { PiPlusBold, PiXBold } from "react-icons/pi"
import ColorPreview from "src/components/ui/color-picker/color-preview"
import IconButton from "src/components/ui/icon-button"
import InputColor from "src/components/ui/input-color"

const PropertiesColorField = ({
    value,
    onChange
}:{
    value:string|undefined
    onChange:(newValue:string|undefined)=>void
}) => {
    return(
        <div style={{display:"flex", alignItems:'center', gap:'var(--space-200)'}}>
            {
                (value)?(
                    <div style={{flexGrow:'1'}}>
                        <InputColor
                            txtPlaceholder="Select color..."
                            value={value}
                            onChange={(newValue)=>{onChange(newValue||"#FFFFFF")}}
                        />
                    </div>
                ):(
                    <div style={{marginLeft:'var(--space-50)'}}><ColorPreview value="#FFFFFF00" isAllowAlpha={true} height="28px" width="28px"/></div>
                )
            }
            <IconButton
                icon={(value)?(<PiXBold className="global-icon"/>):(<PiPlusBold className="global-icon"/>)}
                txtLabel={(value)?("Remove color"):("Add Color")}
                onClick={()=>{
                    if(!value){
                        onChange("#FFFFFF")
                    }else{
                        onChange(undefined)
                    }
                }}
                tooltipPlacement="top-end"
                isShowtooltip={true}
            />
        </div>
    )
}

export default PropertiesColorField