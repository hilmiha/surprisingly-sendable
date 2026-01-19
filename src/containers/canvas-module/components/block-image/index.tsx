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
        <div
            style={{textAlign:props.justify}}
        >
            <a
                href={props.url??undefined}
                style={{
                    display:"inline-block",
                    textDecoration:"none"
                }}
                onClick={(e)=>{e.preventDefault()}}
            >
                {
                    (props.imageSrcUrl)?(
                        <div style={{
                            display:'flex',
                            height:"fit-content",
                            width:"fit-content",
                        }}>
                            <img 
                                style={{
                                    verticalAlign:"middle",
                                    display:"inline-block",
                                    maxWidth:'100%',
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
                                    verticalAlign:"middle",
                                    maxWidth:'100%',
                                    height:props.height?(`${props.height}px`):('100%'),
                                    width:props.width?(`${props.width}px`):('100%'),
                                    borderTopLeftRadius:`${props.borderRadiusTL??'0'}px`,
                                    borderTopRightRadius:`${props.borderRadiusTR??'0'}px`,
                                    borderBottomLeftRadius:`${props.borderRadiusBL??'0'}px`,
                                    borderBottomRightRadius:`${props.borderRadiusBR??'0'}px`,
                                    backgroundColor:'var(--clr-surface-2)',
                                    display:'flex',
                                }}
                            >
                                <PiImageBold size={22}/>
                            </div>
                        </div>
                    )
                }
            </a>
        </div>
        
    )
}

export default BlockImage
