import TextContentView from "../text-content-view"
import TextContentEditor from "../text-content-editor"
import { useCanvasModule } from "../../context"

const BlockButton = ({
    blockId,
    isSelected
}:{
    blockId:string
    isSelected:boolean
}) =>{

    const {
        paperValue,
    } = useCanvasModule()

    const blockData = paperValue[blockId]
    const props = blockData.props

    return(
        <>
            {
                (isSelected)?(
                    <div style={{
                        backgroundColor:props.buttonColor??'#f0f0f0',
                        paddingTop:`${props.contentPaddingTop}px`,
                        paddingBottom:`${props.contentPaddingBottom}px`,
                        paddingLeft:`${props.contentPaddingLeft}px`,
                        paddingRight:`${props.contentPaddingRight}px`,
                        borderTopLeftRadius:`${props.borderRadiusTL??'0'}px`,
                        borderTopRightRadius:`${props.borderRadiusTR??'0'}px`,
                        borderBottomLeftRadius:`${props.borderRadiusBL??'0'}px`,
                        borderBottomRightRadius:`${props.borderRadiusBR??'0'}px`,
                        border:"0px",
                        color:props.textColor,
                        width:props.buttonWidth==='full'?'100%':'auto'
                    }}>
                        <TextContentEditor blockId={blockId}/>
                    </div>
                ):( 
                    <a
                        href={props.url??'##'}
                        style={{
                            backgroundColor:props.buttonColor??'#f0f0f0',
                            paddingTop:`${props.contentPaddingTop}px`,
                            paddingBottom:`${props.contentPaddingBottom}px`,
                            paddingLeft:`${props.contentPaddingLeft}px`,
                            paddingRight:`${props.contentPaddingRight}px`,
                            borderTopLeftRadius:`${props.borderRadiusTL??'0'}px`,
                            borderTopRightRadius:`${props.borderRadiusTR??'0'}px`,
                            borderBottomLeftRadius:`${props.borderRadiusBL??'0'}px`,
                            borderBottomRightRadius:`${props.borderRadiusBR??'0'}px`,
                            border:"0px",
                            color:props.textColor,
                            width:props.buttonWidth==='full'?'100%':'auto',
                            textAlign:props.alignment==='start'?('left'):(props.alignment==='end')?('right'):('center'),
                            textDecoration:'none',
                        }}
                        onClick={(e)=>{e.preventDefault()}}
                    >
                        <TextContentView blockId={blockId}/>
                    </a>
                )
            }
            
        </>
    )
}

export default BlockButton
