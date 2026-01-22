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
            style={{
                textAlign:props.justify,
                height:props.height?(`${props.height}px`):('auto'),
            }}
        >
            <a
                href={props.url??undefined}
                style={{
                    textDecoration:"none"
                }}
                onClick={(e)=>{e.preventDefault()}}
            >
                {
                    (props.imageSrcUrl)?(
                        <img 
                            style={{
                                verticalAlign:"middle",
                                display:"inline-block",
                                maxWidth:'100%',
                                height:props.height?(`${props.height}px`):('auto'),
                                width:props.width?(`${props.width}px`):('auto'),
                                borderTopLeftRadius:`${props.borderRadiusTL??'0'}px`,
                                borderTopRightRadius:`${props.borderRadiusTR??'0'}px`,
                                borderBottomLeftRadius:`${props.borderRadiusBL??'0'}px`,
                                borderBottomRightRadius:`${props.borderRadiusBR??'0'}px`,
                            }}
                            src={props.imageSrcUrl}
                        />
                    ):(
                        <div
                            style={{
                                display:"flex",
                                justifyContent:props.justify,
                            }}
                        >
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
                                        justifyContent:'center',
                                        alignItems:'center'
                                    }}
                                >
                                    <PiImageBold size={20}/>
                                </div>
                            </div>
                        </div>
                    )
                }
            </a>
        </div>
        
    )
}

export default BlockImage
