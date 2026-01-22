import { useEffect, useMemo, useRef } from "react"
import { useCanvasModule } from "../../context"
import { max } from "lodash"
import './styles.scss'
import clsx from "clsx"

const PreviewSection = ({
    canvasScrollPosition,
    setCanvasScrollPosition
}:{
    canvasScrollPosition:number,
    setCanvasScrollPosition:React.Dispatch<React.SetStateAction<number>>,
}) =>{
    const {
        htmlValue,
        isDesktopView
    } = useCanvasModule()

    const htmlPrev = useMemo(()=>{
        return htmlValue.replace('<style>','<style> \n ::-webkit-scrollbar { width: 0px; height: 0px; } \n')
    },[htmlValue])

    const iframeRef = useRef<HTMLDivElement | null>(null);

    const scrollTo = (y: number) => {
        const iframe = iframeRef.current;
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
        const el = iframeRef.current;
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
            ref={iframeRef}
            className="global-disbaled-bg normal-scrollbar"
            style={{
                maxHeight:"100%",
                overflow:'auto',
                display:'flex',
                justifyContent:'center',
                padding:'0px 0px',
                scrollbarGutter:'stable'
            }}
        >
            {/* <iframe
                ref={iframeRef}
                srcDoc={htmlPrev}
                style={{
                    width:(!isDesktopView)?'370px':'100%',
                    height:'100%',
                    border:'none'
                }}
            /> */}
            <div
                className={clsx(
                    "paper-block-content",
                    {
                        ['mobile-view']:(!isDesktopView),
                        ['desktop-view']:(isDesktopView)
                    }
                )}
                style={{
                    width:(!isDesktopView)?'370px':'100%',
                }}
                dangerouslySetInnerHTML={{ __html: htmlPrev }}
            />
        </div>
    )
}

export default PreviewSection
