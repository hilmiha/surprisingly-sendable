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
                    <div 
                        style={{
                            display:'flex',
                            justifyContent:`${props.textAlign==='justify'?('left'):(props.textAlign as 'left'|'right'|'center')}`,
                            width:'100%'
                        }}
                    >
                        <div style={{
                            backgroundColor:props.buttonColor??'transparent',
                            paddingTop:`${props.contentPaddingTop}px`,
                            paddingBottom:`${props.contentPaddingBottom}px`,
                            paddingLeft:`${props.contentPaddingLeft}px`,
                            paddingRight:`${props.contentPaddingRight}px`,
                            borderTopLeftRadius:`${props.borderRadiusTL??'0'}px`,
                            borderTopRightRadius:`${props.borderRadiusTR??'0'}px`,
                            borderBottomLeftRadius:`${props.borderRadiusBL??'0'}px`,
                            borderBottomRightRadius:`${props.borderRadiusBR??'0'}px`,
                            borderTop:`${props.borderTop||'0'}px solid ${props.borderColor||'transparent'}`,
                            borderBottom:`${props.borderBottom||'0'}px solid ${props.borderColor||'transparent'}`,
                            borderLeft:`${props.borderLeft||'0'}px solid ${props.borderColor||'transparent'}`,
                            borderRight:`${props.borderRight||'0'}px solid ${props.borderColor||'transparent'}`,
                            color:props.textColor,
                            width:props.buttonWidth==='full'?'100%':'fit-content',
                        }}>
                            <TextContentEditor blockId={blockId}/>
                        </div>
                    </div>
                ):( 
                    <div 
                        style={{
                            textAlign:`${props.textAlign==='justify'?('left'):(props.textAlign as 'left'|'right'|'center')}`,
                            width:'100%'
                        }}
                    >
                        <a
                            href={props.url??'##'}
                            style={{
                                display:`${props.buttonWidth === 'full' ? 'block' : 'inline-block'}`,
                                backgroundColor:props.buttonColor??'transparent',
                                paddingTop:`${props.contentPaddingTop}px`,
                                paddingBottom:`${props.contentPaddingBottom}px`,
                                paddingLeft:`${props.contentPaddingLeft}px`,
                                paddingRight:`${props.contentPaddingRight}px`,
                                borderTopLeftRadius:`${props.borderRadiusTL??'0'}px`,
                                borderTopRightRadius:`${props.borderRadiusTR??'0'}px`,
                                borderBottomLeftRadius:`${props.borderRadiusBL??'0'}px`,
                                borderBottomRightRadius:`${props.borderRadiusBR??'0'}px`,
                                borderTop:`${props.borderTop||'0'}px solid ${props.borderColor||'transparent'}`,
                                borderBottom:`${props.borderBottom||'0'}px solid ${props.borderColor||'transparent'}`,
                                borderLeft:`${props.borderLeft||'0'}px solid ${props.borderColor||'transparent'}`,
                                borderRight:`${props.borderRight||'0'}px solid ${props.borderColor||'transparent'}`,
                                color:props.textColor,
                                textDecoration:'none',
                            }}
                            onClick={(e)=>{e.preventDefault()}}
                        >
                            <TextContentView blockId={blockId}/>
                        </a>
                    </div>
                )
            }
            
        </>
    )
}

export default BlockButton
