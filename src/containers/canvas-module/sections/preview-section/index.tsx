import { useCanvasModule } from "../../context"

const PreviewSection = () =>{
    const {
        htmlValue
    } = useCanvasModule()
    return(
        <iframe
            srcDoc={htmlValue}
            style={{
                width:'100%',
                height:'100%',
                border:'none'
            }}
        />
    )
}

export default PreviewSection