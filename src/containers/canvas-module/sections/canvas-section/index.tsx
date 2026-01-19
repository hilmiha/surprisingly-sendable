import clsx from "clsx"
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
            className={clsx(
                "outside-block normal-scrollbar global-disbaled-bg",
            )}
            style={{
                display:"flex", 
                justifyContent:'center', 
                padding:'0px 60px',
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
                    backgroundColor:paperValue.root.props.backdropColor,
                    height:'fit-content',
                    width:`${isDesktopView?"100%":"370px"}`,
                    maxWidth:`${isDesktopView?"100%":"370px"}`,
                }}
            >
                <table
                    role="presentation" 
                    align="center"
                    width={'100%'}
                    cellPadding={0} 
                    cellSpacing={0}
                    border={0} 
                    style={{
                        margin:'0px auto',
                        maxWidth:'600px',
                        backgroundColor:paperValue.root.props.backgroundColor,
                    }}
                >
                    <tbody>
                        <tr>
                            <td>
                                {
                                    paperValue.root.childIds.map((i)=>(
                                        <Block key={i} id={i} parentId={'root'}/>
                                    ))
                                }
                            </td>
                        </tr>
                        <tr className="outside-block">
                            <td className="outside-block global-disbaled-bg" align="center" style={{border:'1px dashed var(--clr-border)', padding:'var(--space-100)'}}>
                                <AddBlockButton type="after" 
                                    onClickBlockToAdd={(type)=>{
                                        addNewBlock(type, '', 'root')
                                    }}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CanvasSection
