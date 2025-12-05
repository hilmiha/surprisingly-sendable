import TextContentView from "../text-content-view"
import TextContentEditor from "../text-content-editor"

const BlockHeading = ({
    id,
    isSelected
}:{
    id:string
    isSelected:boolean
}) =>{

    return(
        <>
            {
                (isSelected)?(
                    <div style={{width:'100%'}}>
                        <TextContentEditor blockId={id}/>
                    </div>
                ):( 
                    <TextContentView blockId={id}/>
                )
            }
        </>
    )
}

export default BlockHeading
