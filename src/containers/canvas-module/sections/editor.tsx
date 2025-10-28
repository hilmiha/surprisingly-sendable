import { useState } from "react"
import "./editor.scss"
import Block from "../components/block"
import IconButton from "src/components/ui/icon-button"
import { PiBracketsCurlyBold, PiCodeBold, PiDesktopBold, PiDeviceMobileBold, PiEyeBold, PiPencilBold } from "react-icons/pi"
import Tabs from "src/components/ui/tabs"
import { useCanvasModule } from "../context"
import AddBlock from "../components/add-block"

const Editor = () =>{
    const {
        setSelectedId,
        paperValue,
        addNewBlock
    } = useCanvasModule()
    
    const [isDesktopView, setIsDesktopView] = useState(true)
    
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
                        selectedItem="canvas"
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
            <div
                className="outside-block"
                style={{
                    display:'flex',
                    justifyContent:'center',
                    backgroundColor:paperValue.root.props.backdropColor,
                    height:'100%',
                    maxHeight:"100%",
                    overflow:'auto',
                }}
                onClick={(e)=>{
                    if(e.target && (e.target as HTMLDivElement)?.classList?.contains('outside-block')){
                        setSelectedId('root')
                    }
                }}
            >
                <div
                    className="outside-block"
                    style={{
                        width:`${isDesktopView?"600":"320"}px`,
                        minWidth:`${isDesktopView?"600":"320"}px`,
                        margin:'var(--space-500)',
                        backgroundColor:paperValue.root.props.backgroundColor,
                        height:'fit-content'
                    }}
                >
                    {
                        paperValue.root.childIds.map((i)=>(
                            <Block key={i} id={i} parentId={'root'}/>
                        ))
                    }
                    <div style={{display:'flex', justifyContent:'center', border:'1px dashed var(--clr-border)', padding:'var(--space-100)'}}>
                        <AddBlock type="after" 
                            onClickBlockToAdd={(type)=>{
                                addNewBlock(type, '', 'root')
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Editor