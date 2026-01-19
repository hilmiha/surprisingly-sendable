import { useCanvasModule } from "../../context"

const BlockDevider = ({
    blockId,
}:{
    blockId:string
}) =>{

    const {
        paperValue,
    } = useCanvasModule()

    const blockData = paperValue[blockId]
    const props = blockData.props

    return(
        <div style={{
            display:'block',
            flexGrow:'1'
        }}>
            <div 
                style={{
                    borderBottom:`${props.height||0}px solid ${props.deviderColor||'transparent'}`,
                    width:'100%'
                }}
            >
            </div>
        </div>
    )
}

export default BlockDevider
