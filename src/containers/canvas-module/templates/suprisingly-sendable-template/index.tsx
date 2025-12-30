import Resizable from 'src/components/ui/resizable'
import './styles.scss'
import ResizablePanel from 'src/components/ui/resizable/resizable-panel'
import ResizableHandle from 'src/components/ui/resizable/resizable-handle'

const SuprisinglySendableTemplate = ({
    propertiesSection,
    children
}:{
    propertiesSection:React.ReactNode
    children:React.ReactNode
}) =>{
    return(
        <div className='suprisingly-sendable-template'>
            <div className='banner-box'>
                <div>
                    <p style={{textAlign:'center'}}><strong>This project is still in development 🚧</strong></p>
                </div>
            </div>
            <Resizable direction="horizontal">
                <ResizablePanel defaultPanelSize={75} minContentWidth="720px">
                    <>{children}</>
                </ResizablePanel>
                <ResizableHandle direction="horizontal"/>
                <ResizablePanel defaultPanelSize={30} minPanelSize={30} maxPanelSize={50}  minContentWidth="320px">
                    <div className="properties-panel-container">
                        {propertiesSection}
                    </div>
                </ResizablePanel>
            </Resizable>
        </div>
    )
} 

export default SuprisinglySendableTemplate