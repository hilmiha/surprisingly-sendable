import "./styles.scss"
import IconButton from "src/components/ui/icon-button"
import { PiBracketsCurlyBold, PiCodeBold, PiDesktopBold, PiDeviceMobileBold, PiEyeBold, PiPencilBold } from "react-icons/pi"
import Tabs from "src/components/ui/tabs"
import { useCanvasModule } from "../../context"
import { Activity, useState } from "react"
import CanvasSection from "../canvas-section"
import HTMLSection from "../html-section"
import PreviewSection from "../preview-section"
import JSONSection from "../json-section"

const EditorSection = () =>{
    const {
        isDesktopView,
        setIsDesktopView
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
                <div>
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
                </div>
                <div className="canvas-view-select-container">
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