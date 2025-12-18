import InputCode from "src/components/ui/input-code"
import { useCanvasModule } from "../../context"

const JSONSection = () =>{
    const {
        paperValue
    } = useCanvasModule()
    return(
        <div style={{padding:"var(--space-300)", maxHeight:'100%', overflow:'hidden'}}>
            <InputCode
                lang="json"
                value={JSON.stringify(paperValue, null, 4)}
                isDisabled={true}
                config={{
                    isAsPreview:true
                }}
            />
        </div>
    )
}

export default JSONSection