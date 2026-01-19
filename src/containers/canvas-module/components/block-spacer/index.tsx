import { useCanvasModule } from "../../context"

const BlockSpacer = ({
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
            height:props.height?(`${props.height}px`):('0px'),
            flexGrow:'1'
        }}>
        </div>
    )
}

export default BlockSpacer
