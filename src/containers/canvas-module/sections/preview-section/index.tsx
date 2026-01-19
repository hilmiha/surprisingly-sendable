import { useCanvasModule } from "../../context"

const PreviewSection = () =>{
    const {
        htmlValue,
        isDesktopView
    } = useCanvasModule()

    return(
        <div
            className="global-disbaled-bg normal-scrollbar"
            style={{
                maxHeight:"100%",
                overflow:'auto',
                display:'flex',
                justifyContent:'center',
                padding:'0px 60px',
            }}
        >
            <iframe
                srcDoc={htmlValue}
                style={{
                    width:(!isDesktopView)?'370px':'100%',
                    height:'100%',
                    border:'none'
                }}
            />
            {/* <div
                className="paper-block-content"
                style={{
                    width:(!isDesktopView)?'370px':'100%',
                }}
                dangerouslySetInnerHTML={{ __html: htmlValue }}
            /> */}
        </div>
    )
}

export default PreviewSection
