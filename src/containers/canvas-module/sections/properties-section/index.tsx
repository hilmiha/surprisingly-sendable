import { useEffect, useRef, useState } from "react"
import { useCanvasModule, type paperBlockPropsType } from "../../context"
import IconButton from "src/components/ui/icon-button"
import { PiAlignBottomSimpleBold, PiAlignCenterHorizontalSimpleBold, PiAlignCenterVerticalSimpleBold, PiAlignLeftSimpleBold, PiAlignRightSimpleBold, PiAlignTopSimpleBold, PiTextAlignCenterBold, PiTextAlignJustifyBold, PiTextAlignLeftBold, PiTextAlignRightBold } from "react-icons/pi"
import ColumnCountProperties from "./column-count-properties"
import ColumnGapProperties from "./column-gap-properties"
import ColumnSizeProperties from "./column-size-properties"
import UrlProperties from "./url-properties"
import TextColorProperties from "./text-color-properties"
import HeadingTypeProperties from "./heading-type-properties"
import TextSizeProperties from "./text-size-properties"
import GlobalHeadingSizeProperties from "./global-heading-size-properties"
import GlobalFontFamilyProperties from "./global-font-family-properties"
import FontFamilyProperties from "./font-family-properties"
import BackdropColorProperties from "./backdrop-color-properties"
import PaperColorProperties from "./paper-color-properties"
import ListTypeProperties from "./list-type-properties"
import ImageUrlProperties from "./image-url-properties"
import ButtonColorProperties from "./button-color-properties"
import ButtonWidthProperties from "./button-width-properties"
import BorderRadiusProperties from "./border-radius-properties"
import BackgroundColorProperties from "./background-color-properties"
import PaddingContentProperties from "./padding-content-properties"
import DimentionProperties from "./dimension-properties"
import PaddingBlockProperties from "./padding-block-properties"
import TextAlignProperties from "./text-align-properties"

const PropertiesSection = () =>{
    const {
        selectedId,
        triggerRefreshListType,
        paperValue,
        setPaperValue,
    } = useCanvasModule()
    
    const topResizeable = useRef<HTMLDivElement | null>(null)

    const [form, setForm] = useState<paperBlockPropsType>(paperValue['root']['props'])
    const onChange = (key:string, value:any) =>{
        setForm((prev)=>{
            const tamp = {...prev}
            tamp[key] = value
            return tamp
        })
    }

    const syncToCanvas = (id:string) =>{
        setPaperValue((prev)=>{
            const tamp = {...prev}
            tamp[id]['props'] = {...form}
            return tamp
        })
    }
    useEffect(()=>{
        const id = selectedId||'root'
        if(JSON.stringify(form)!==JSON.stringify(paperValue[id]['props'])){
            console.log('update from properies')
            syncToCanvas(id)
        }
    },[JSON.stringify(form)])

    useEffect(()=>{
        const id = selectedId||'root'
        setForm(paperValue[id]['props'])
        if(topResizeable.current){
            topResizeable.current.scrollIntoView({behavior:'smooth'})
        }
    },[selectedId, triggerRefreshListType])


    return(
        <div>
            <div ref={topResizeable} style={{paddingTop:'var(--space-200)'}}></div>
            <div style={{display:'grid', gap:'var(--space-200)'}}>
                {('textType' in form) && (<HeadingTypeProperties form={form} onChange={onChange}/>)}
                {('columnCount' in form) && (<ColumnCountProperties form={form} onChange={onChange}/>)}
                {('columnCount' in form) && (<ColumnSizeProperties form={form} onChange={onChange}/>)}
                {('columnGap' in form) && (<ColumnGapProperties form={form} onChange={onChange}/>)}
                {('url' in form) && (<UrlProperties form={form} onChange={onChange}/>)}
                {('textColor' in form) && (<TextColorProperties form={form} onChange={onChange}/>)}
                {('fontSize' in form) && (<TextSizeProperties form={form} onChange={onChange}/>)}
                {('h1Size' in form || 'h2Size' in form || 'h3Size' in form) && (<GlobalHeadingSizeProperties form={form} onChange={onChange}/>)}
                {('fontFamily' in form && selectedId==='root') && (<GlobalFontFamilyProperties form={form} onChange={onChange}/>)}
                {('fontFamily' in form && selectedId!=='root') && (<FontFamilyProperties form={form} onChange={onChange}/>)}
                {('listType' in form) && (<ListTypeProperties form={form} onChange={onChange}/>)}
                {('imageSrcUrl' in form) && (<ImageUrlProperties form={form} onChange={onChange}/>)}
                {('buttonColor' in form) && (<ButtonColorProperties form={form} onChange={onChange}/>)}
                {('buttonWidth' in form) && (<ButtonWidthProperties form={form} onChange={onChange}/>)}
                {('height' in form || 'width' in form) && (<DimentionProperties form={form} onChange={onChange}/>)}
                {('textAlign' in form) && (<TextAlignProperties form={form} onChange={onChange}/>)}
                
                {
                    ("textAlign" in form) && (
                        <div style={{marginBottom:'var(--space-200)'}}>
                            <p>Text align</p>
                            <div style={{display:'flex'}}>
                                <IconButton
                                    icon={<PiTextAlignLeftBold className="global-icon"/>}
                                    txtLabel="left"
                                    onClick={()=>{onChange('textAlign', 'left')}}
                                    isSelected={form['textAlign']==='left'}
                                />
                                <IconButton
                                    icon={<PiTextAlignCenterBold className="global-icon"/>}
                                    txtLabel="center"
                                    onClick={()=>{onChange('textAlign', 'center')}}
                                    isSelected={form['textAlign']==='center'}
                                />
                                <IconButton
                                    icon={<PiTextAlignRightBold className="global-icon"/>}
                                    txtLabel="right"
                                    onClick={()=>{onChange('textAlign', 'right')}}
                                    isSelected={form['textAlign']==='right'}
                                />
                                {
                                    (paperValue[selectedId].type!=='button')&&(
                                        <IconButton
                                            icon={<PiTextAlignJustifyBold className="global-icon"/>}
                                            txtLabel="justify"
                                            onClick={()=>{onChange('textAlign', 'justify')}}
                                            isSelected={form['textAlign']==='justify'}
                                        />
                                    )
                                }
                            </div>
                        </div>
                    )
                }
                {('borderRadiusTL' in form || 'borderRadiusTR' in form || 'borderRadiusBL' in form || 'borderRadiusBR' in form ) && (<BorderRadiusProperties form={form} onChange={onChange}/>)}
                {('contentPaddingTop' in form || 'contentPaddingBottom' in form || 'contentPaddingRight' in form || 'contentPaddingLeft' in form ) && (<PaddingContentProperties form={form} onChange={onChange} contentLabel={paperValue[selectedId]['type']==='button'?('Label'):('')}/>)}
                {('backdropColor' in form) && (<BackdropColorProperties form={form} onChange={onChange}/>)}
                {('backgroundColor' in form && selectedId==='root') && (<PaperColorProperties form={form} onChange={onChange}/>)}
                {('backgroundColor' in form && selectedId!=='root') && (<BackgroundColorProperties form={form} onChange={onChange}/>)}
                {
                    ("alignment" in form) && (
                        <div style={{marginBottom:'var(--space-200)'}}>
                            <p>Alignment</p>
                            <div style={{display:'flex'}}>
                                <IconButton
                                    icon={<PiAlignTopSimpleBold className="global-icon"/>}
                                    txtLabel="start"
                                    onClick={()=>{onChange('alignment', 'start')}}
                                    isSelected={form['alignment']==='start'}
                                />
                                <IconButton
                                    icon={<PiAlignCenterVerticalSimpleBold className="global-icon"/>}
                                    txtLabel="center"
                                    onClick={()=>{onChange('alignment', 'center')}}
                                    isSelected={form['alignment']==='center'}
                                />
                                <IconButton
                                    icon={<PiAlignBottomSimpleBold className="global-icon"/>}
                                    txtLabel="end"
                                    onClick={()=>{onChange('alignment', 'end')}}
                                    isSelected={form['alignment']==='end'}
                                />
                            </div>
                        </div>
                    )
                }
                {
                    ("justify" in form) && (
                        <div style={{marginBottom:'var(--space-200)'}}>
                            <p>Justify</p>
                            <div style={{display:'flex'}}>
                                <IconButton
                                    icon={<PiAlignLeftSimpleBold className="global-icon"/>}
                                    txtLabel="left"
                                    onClick={()=>{onChange('justify', 'left')}}
                                    isSelected={form['justify']==='left'}
                                />
                                <IconButton
                                    icon={<PiAlignCenterHorizontalSimpleBold className="global-icon"/>}
                                    txtLabel="center"
                                    onClick={()=>{onChange('justify', 'center')}}
                                    isSelected={form['justify']==='center'}
                                />
                                <IconButton
                                    icon={<PiAlignRightSimpleBold className="global-icon"/>}
                                    txtLabel="right"
                                    onClick={()=>{onChange('justify', 'right')}}
                                    isSelected={form['justify']==='right'}
                                />
                            </div>
                        </div>
                    )
                }
                {('paddingTop' in form || 'paddingBottom' in form || 'paddingRight' in form || 'paddingLeft' in form ) && (<PaddingBlockProperties form={form} onChange={onChange}/>)}
            </div>
        </div>
    )
}

export default PropertiesSection