import clsx from "clsx"
import AddBlockButton from "../../components/add-block-button"
import Block from "../../components/block"
import { useCanvasModule } from "../../context"
import { useEffect, useRef } from "react"
import { max } from "lodash"

const CanvasSection = ({
    canvasScrollPosition,
    setCanvasScrollPosition
}:{
    canvasScrollPosition:number
    setCanvasScrollPosition:React.Dispatch<React.SetStateAction<number>>,
}) =>{
    const {
        setSelectedId,
        paperValue,
        addNewBlock,
        isDesktopView,
    } = useCanvasModule()

    const sourceRef = useRef<HTMLDivElement | null>(null);
    const scrollTo = (y: number) => {
        const iframe = sourceRef.current;
        if (!iframe) return;

        iframe?.scrollTo({
            top: y,
        });
    };
    
    useEffect(()=>{
        scrollTo(max([canvasScrollPosition, 0])||0)
    },[])
    
    useEffect(() => {
        console.log('init',canvasScrollPosition)
        const el = sourceRef.current;
        if (!el) return;

        let timeout: number;

        const onScroll = () => {
            window.clearTimeout(timeout);
            timeout = window.setTimeout(() => {
                setCanvasScrollPosition(el.scrollTop);
                console.log('canvas', el.scrollTop)
            }, 90); // adjust delay
        };

        el.addEventListener("scroll", onScroll, { passive: true });
        return () => el.removeEventListener("scroll", onScroll);
    }, []);

    return(
        <div
            ref={sourceRef}
            className={clsx(
                "outside-block normal-scrollbar global-disbaled-bg",
            )}
            style={{
                display:"flex", 
                justifyContent:'center', 
                padding:'0px 0px',
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
