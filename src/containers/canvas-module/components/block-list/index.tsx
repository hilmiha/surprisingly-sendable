import TextContentView from "../text-content-view"
import TextContentEditor from "../text-content-editor"
import { useCanvasModule } from "../../context"

const BlockList = ({
    blockId,
    isSelected
}:{
    blockId:string
    isSelected:boolean
}) =>{

    const {
        triggerRefreshListType
    } = useCanvasModule()

    return(
        <>
            {
                (isSelected && triggerRefreshListType===0)?(
                    <div style={{width:'100%'}}>
                        <TextContentEditor blockId={blockId}/>
                    </div>
                ):( 
                    <TextContentView blockId={blockId}/>
                )
            }
        </>
    )
}

export default BlockList
