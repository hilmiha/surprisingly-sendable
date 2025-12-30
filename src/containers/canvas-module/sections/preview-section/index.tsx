import { useCanvasModule } from "../../context"

const PreviewSection = () =>{
    const {
        htmlValue
    } = useCanvasModule()
    return(
        <div
            style={{
                paddingTop:'calc(var(--space-400) + 1px)',
                maxHeight:"100%",
                overflow:'hidden',
            }}
        >
            <iframe
                srcDoc={htmlValue}
                style={{
                    width:'100%',
                    height:'100%',
                    border:'none'
                }}
            />
        </div>
    )
}

export default PreviewSection