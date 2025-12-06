import TextContentView from "../text-content-view"
import TextContentEditor from "../text-content-editor"

const BlockText = ({
    blockId,
    isSelected
}:{
    blockId:string
    isSelected:boolean
}) =>{

    return(
        <>
            {
                (isSelected)?(
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

export default BlockText
