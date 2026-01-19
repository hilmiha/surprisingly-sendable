import "./styles.scss"
import IconButton from "src/components/ui/icon-button"
import { PiBracketsCurlyBold, PiCodeBold, PiDesktopBold, PiDeviceMobileBold, PiEyeBold, PiEyeSlashBold, PiPencilBold } from "react-icons/pi"
import Tabs from "src/components/ui/tabs"
import { useCanvasModule } from "../../context"
import { Activity, useState } from "react"
import CanvasSection from "../canvas-section"
import HTMLSection from "../html-section"
import PreviewSection from "../preview-section"
import JSONSection from "../json-section"
import Button from "src/components/ui/button"

const EditorSection = () =>{
    const {
        isDesktopView,
        setIsDesktopView,
        isShowHidden,
        setIsShowHidden
    } = useCanvasModule()
    
    const [tabSelected, setTabSelected] = useState('canvas')
    return(
        <div
            style={{
                display:'grid',
                height:'100%',
                gridTemplateRows:'max-content 1fr'
            }}
        >
            <div
                className="canvas-header"
            >
                <div style={{display:'flex', gap:'var(--space-100)', alignItems:'center'}}>
                    <Tabs
                        selectedItem={tabSelected}
                        onClickTabItem={(id)=>{setTabSelected(id)}}
                        tabItem={[
                            {id:'canvas', txtLabel:'Canvas', iconBefore:<PiPencilBold className="global-icon"/>},
                            {id:'preview', txtLabel:'Preview', iconBefore:<PiEyeBold className="global-icon"/>},
                            {id:'html', txtLabel:'HTML Output', iconBefore:<PiCodeBold className="global-icon"/>},
                            {id:'json', txtLabel:'JSON Output', iconBefore:<PiBracketsCurlyBold className="global-icon"/>},
                        ]}
                    />
                    <IconButton
                        className="header-action-button"
                        icon={<PiDesktopBold className="global-icon"/>}
                        txtLabel="Desktop view"
                        onClick={()=>{setIsDesktopView(true)}}
                        isSelected={isDesktopView}
                    />
                    <IconButton
                        className="header-action-button"
                        icon={<PiDeviceMobileBold className="global-icon"/>}
                        txtLabel="Mobile view"
                        onClick={()=>{setIsDesktopView(false)}}
                        isSelected={!isDesktopView}
                    />
                    <IconButton
                        className="header-action-button"
                        icon={isShowHidden?<PiEyeBold className="global-icon"/>:<PiEyeSlashBold className="global-icon"/>}
                        txtLabel={`Visibility ${isShowHidden?('On'):('Off')}`}
                        onClick={()=>{setIsShowHidden(!isShowHidden)}}
                        isSelected={!isDesktopView}
                    />
                </div>
                <div className="canvas-view-select-container">
                    <Button
                        txtLabel={'Cancel'}
                        appearance="subtle"
                        onClick={()=>{}}
                    />
                    <Button
                        txtLabel={'Save Template'}
                        appearance="primary"
                        onClick={()=>{}}
                    />
                    
                </div>
            </div>
            <Activity mode={(tabSelected==='canvas')?('visible'):('hidden')}>
                <CanvasSection/>
            </Activity>
            <Activity mode={(tabSelected==='preview')?('visible'):('hidden')}>
                <PreviewSection/>
            </Activity>
            <Activity mode={(tabSelected==='html')?('visible'):('hidden')}>
                <HTMLSection/>
            </Activity>
            <Activity mode={(tabSelected==='json')?('visible'):('hidden')}>
                <JSONSection/>
            </Activity>
        </div>
    )
}

export default EditorSection
