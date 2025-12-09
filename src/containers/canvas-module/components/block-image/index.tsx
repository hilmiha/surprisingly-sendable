import { useCanvasModule } from "../../context"
import { PiImageBold } from "react-icons/pi"

const BlockImage = ({
    blockId
}:{
    blockId:string
}) =>{
    const {
        paperValue,
    } = useCanvasModule()

    const blockData = paperValue[blockId]
    const props = blockData.props
    return(
        <>
            {
                (props.imageSrcUrl)?(
                    <div style={{
                        display:'flex',
                        height:"fit-content",
                        width:"fit-content",
                    }}>
                        <img 
                            style={{
                                height:props.height?(`${props.height}px`):('100%'),
                                width:props.width?(`${props.width}px`):('100%'),
                                borderTopLeftRadius:`${props.borderRadiusTL??'0'}px`,
                                borderTopRightRadius:`${props.borderRadiusTR??'0'}px`,
                                borderBottomLeftRadius:`${props.borderRadiusBL??'0'}px`,
                                borderBottomRightRadius:`${props.borderRadiusBR??'0'}px`,
                            }}
                            src={props.imageSrcUrl}
                        />
                    </div>
                ):(
                    <div
                        style={{
                            display:'flex',
                            backgroundColor:'var(--clr-surface-2)',
                            height:props.height||'fit-content',
                            width:props.width||'fit-content',
                        }}
                    >
                        <PiImageBold size={48}/>
                    </div>
                )
            }
        </>
    )
}

export default BlockImage
