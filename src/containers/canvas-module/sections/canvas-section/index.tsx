import AddBlockButton from "../../components/add-block-button"
import Block from "../../components/block"
import { useCanvasModule } from "../../context"

const CanvasSection = () =>{
    const {
        setSelectedId,
        paperValue,
        addNewBlock,
        isDesktopView
    } = useCanvasModule()

    return(
        <div
            className="outside-block"
            style={{
                display:'flex',
                justifyContent:'center',
                backgroundColor:paperValue.root.props.backdropColor,
                height:'100%',
                maxHeight:"100%",
                overflow:'auto',
            }}
            onClick={(e)=>{
                if(e.target && (e.target as HTMLDivElement)?.classList?.contains('outside-block')){
                    setSelectedId('root')
                }
            }}
        >
            <div
                className="outside-block"
                style={{
                    width:`${isDesktopView?"600":"320"}px`,
                    minWidth:`${isDesktopView?"600":"320"}px`,
                    margin:'var(--space-500)',
                    backgroundColor:paperValue.root.props.backgroundColor,
                    height:'fit-content'
                }}
            >
                {
                    paperValue.root.childIds.map((i)=>(
                        <Block key={i} id={i} parentId={'root'}/>
                    ))
                }
                <div style={{display:'flex', justifyContent:'center', border:'1px dashed var(--clr-border)', padding:'var(--space-100)'}}>
                    <AddBlockButton type="after" 
                        onClickBlockToAdd={(type)=>{
                            addNewBlock(type, '', 'root')
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default CanvasSection