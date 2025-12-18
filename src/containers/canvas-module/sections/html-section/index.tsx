import InputCode from "src/components/ui/input-code"
import { useCanvasModule } from "../../context"

const HTMLSection = () =>{
    const {
        htmlValue
    } = useCanvasModule()
    return(
        <div style={{padding:"var(--space-500)"}}>
            <InputCode
                lang="html"
                value={htmlValue}
                isDisabled={true}
                config={{
                    isAsPreview:true
                }}
            />
        </div>
    )
}

export default HTMLSection