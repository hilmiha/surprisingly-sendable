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
                            height:"fit-content",
                            width:"fit-content",
                        }}
                    >
                        <div
                            style={{
                                display:'flex',
                                alignItems:'center',
                                justifyContent:'center',
                                backgroundColor:'var(--clr-surface-2)',
                                height:props.height?(`${props.height}px`):('100%'),
                                width:props.width?(`${props.width}px`):('100%'),
                                borderTopLeftRadius:`${props.borderRadiusTL??'0'}px`,
                                borderTopRightRadius:`${props.borderRadiusTR??'0'}px`,
                                borderBottomLeftRadius:`${props.borderRadiusBL??'0'}px`,
                                borderBottomRightRadius:`${props.borderRadiusBR??'0'}px`,
                            }}
                        >
                            <PiImageBold size={24}/>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default BlockImage
