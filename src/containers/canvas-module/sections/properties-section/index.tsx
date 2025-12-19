import { useEffect, useRef, useState } from "react"
import { useCanvasModule, type paperBlockPropsType } from "../../context"
import InputColor from "src/components/ui/input-color"
import InputText from "src/components/ui/input-text"
import IconButton from "src/components/ui/icon-button"
import { PiAlignBottomSimpleBold, PiAlignCenterHorizontalSimpleBold, PiAlignCenterVerticalSimpleBold, PiAlignLeftSimpleBold, PiAlignRightSimpleBold, PiAlignTopSimpleBold, PiPlusBold, PiTextAlignCenterBold, PiTextAlignJustifyBold, PiTextAlignLeftBold, PiTextAlignRightBold, PiXBold } from "react-icons/pi"
import ColorPreview from "src/components/ui/color-picker/color-preview"
import Button from "src/components/ui/button"
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

const PropertiesSection = () =>{
    const {
        selectedId,
        triggerRefreshListType,
        setRefreshListType,
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
                {
                    ("listType" in form) && (
                        <div style={{marginBottom:'var(--space-200)'}}>
                            <p>Button Width</p>
                            <div style={{display:'flex'}}>
                                <Button
                                    txtLabel="bullet"
                                    onClick={()=>{
                                        if(form['listType']!=='bullet'){
                                            onChange('listType', 'bullet')
                                            const cnovertDelta = JSON.stringify(form['textDelta']).replaceAll(`"list":"ordered"`, `"list":"bullet"`)
                                            onChange('textDelta', JSON.parse(cnovertDelta))
                                            setTimeout(() => {
                                                setRefreshListType(1)
                                            }, 100);
                                            setTimeout(() => {
                                                setRefreshListType(0)
                                            }, 500);
                                        }
                                    }}
                                    isSelected={form['listType']==='bullet'}
                                />
                                <Button
                                    txtLabel="ordered"
                                    onClick={()=>{
                                        if(form['listType']!=='ordered'){
                                            onChange('listType', 'ordered')
                                            const cnovertDelta = JSON.stringify(form['textDelta']).replaceAll(`"list":"bullet"`, `"list":"ordered"`)
                                            onChange('textDelta', JSON.parse(cnovertDelta))
                                            setTimeout(() => {
                                                setRefreshListType(1)
                                            }, 100);
                                            setTimeout(() => {
                                                setRefreshListType(0)
                                            }, 500);
                                        }
                                    }}
                                    isSelected={form['listType']==='ordered'}
                                />
                            </div>
                        </div>
                    )
                }
                {
                    ('imageSrcUrl' in form) && (
                        <div style={{marginBottom:'var(--space-200)'}}>
                            <p>Image url</p>
                            <InputText
                                type="text-no-space"
                                txtPlaceholder="Enter source..."
                                value={form['imageSrcUrl']}
                                onChange={(newValue)=>{onChange('imageSrcUrl', newValue)}}
                                config={{
                                }}
                            />
                        </div>
                    )
                }
                {
                    ('buttonColor' in form) && (
                        <div style={{marginBottom:'var(--space-200)'}}>
                            <p>Button color</p>
                            <InputColor
                                txtPlaceholder="Select color..."
                                value={form['buttonColor']}
                                onChange={(newValue)=>{onChange('buttonColor', newValue||"#000000")}}
                            />
                        </div>
                    )
                }
                {
                    ("buttonWidth" in form) && (
                        <div style={{marginBottom:'var(--space-200)'}}>
                            <p>Button Width</p>
                            <div style={{display:'flex'}}>
                                <Button
                                    txtLabel="auto"
                                    onClick={()=>{onChange('buttonWidth', 'auto')}}
                                    isSelected={form['buttonWidth']==='auto'}
                                />
                                <Button
                                    txtLabel="full"
                                    onClick={()=>{onChange('buttonWidth', 'full')}}
                                    isSelected={form['buttonWidth']==='full'}
                                />
                            </div>
                        </div>
                    )
                }
                {
                    ('borderRadiusTL' in form) && (
                        <div style={{marginBottom:'var(--space-200)'}}>
                            <p>Border raidus top left</p>
                            <InputText
                                type="number"
                                txtPlaceholder="Enter value..."
                                value={form['borderRadiusTL']}
                                onChange={(newValue)=>{onChange('borderRadiusTL', newValue)}}
                                onBlur={(_, newValue)=>{!newValue&&onChange('borderRadiusTL', newValue||'0')}}
                                config={{
                                    sufixElement:'px'
                                }}
                            />
                        </div>
                    )
                }
                {
                    ('borderRadiusTR' in form) && (
                        <div style={{marginBottom:'var(--space-200)'}}>
                            <p>Border raidus top right</p>
                            <InputText
                                type="number"
                                txtPlaceholder="Enter value..."
                                value={form['borderRadiusTR']}
                                onChange={(newValue)=>{onChange('borderRadiusTR', newValue)}}
                                onBlur={(_, newValue)=>{!newValue&&onChange('borderRadiusTR', newValue||'0')}}
                                config={{
                                    sufixElement:'px'
                                }}
                            />
                        </div>
                    )
                }
                {
                    ('borderRadiusBL' in form) && (
                        <div style={{marginBottom:'var(--space-200)'}}>
                            <p>Border raidus bottom left</p>
                            <InputText
                                type="number"
                                txtPlaceholder="Enter value..."
                                value={form['borderRadiusBL']}
                                onChange={(newValue)=>{onChange('borderRadiusBL', newValue)}}
                                onBlur={(_, newValue)=>{!newValue&&onChange('borderRadiusBL', newValue||'0')}}
                                config={{
                                    sufixElement:'px'
                                }}
                            />
                        </div>
                    )
                }
                {
                    ('borderRadiusBR' in form) && (
                        <div style={{marginBottom:'var(--space-200)'}}>
                            <p>Border raidus bottom right</p>
                            <InputText
                                type="number"
                                txtPlaceholder="Enter value..."
                                value={form['borderRadiusBR']}
                                onChange={(newValue)=>{onChange('borderRadiusBR', newValue)}}
                                onBlur={(_, newValue)=>{!newValue&&onChange('borderRadiusBR', newValue||'0')}}
                                config={{
                                    sufixElement:'px'
                                }}
                            />
                        </div>
                    )
                }
                {
                    ('contentPaddingTop' in form) && (
                        <div style={{marginBottom:'var(--space-200)'}}>
                            <p>Content Padding top</p>
                            <InputText
                                type="number"
                                txtPlaceholder="Enter value..."
                                value={form['contentPaddingTop']}
                                onChange={(newValue)=>{onChange('contentPaddingTop', newValue)}}
                                onBlur={(_, newValue)=>{!newValue&&onChange('contentPaddingTop', newValue||'0')}}
                                config={{
                                    sufixElement:'px'
                                }}
                            />
                        </div>
                    )
                }
                {
                    ('contentPaddingBottom' in form) && (
                        <div style={{marginBottom:'var(--space-200)'}}>
                            <p>Content Padding Bottom</p>
                            <InputText
                                type="number"
                                txtPlaceholder="Enter value..."
                                value={form['contentPaddingBottom']}
                                onChange={(newValue)=>{onChange('contentPaddingBottom', newValue)}}
                                onBlur={(_, newValue)=>{!newValue&&onChange('contentPaddingBottom', newValue||'0')}}
                                config={{
                                    sufixElement:'px'
                                }}
                            />
                        </div>
                    )
                }
                {
                    ('contentPaddingRight' in form) && (
                        <div style={{marginBottom:'var(--space-200)'}}>
                            <p>Content Padding Right</p>
                            <InputText
                                type="number"
                                txtPlaceholder="Enter value..."
                                value={form['contentPaddingRight']}
                                onChange={(newValue)=>{onChange('contentPaddingRight', newValue)}}
                                onBlur={(_, newValue)=>{!newValue&&onChange('contentPaddingRight', newValue||'0')}}
                                config={{
                                    sufixElement:'px'
                                }}
                            />
                        </div>
                    )
                }
                {
                    ('contentPaddingLeft' in form) && (
                        <div style={{marginBottom:'var(--space-200)'}}>
                            <p>Content Padding Left</p>
                            <InputText
                                type="number"
                                txtPlaceholder="Enter value..."
                                value={form['contentPaddingLeft']}
                                onChange={(newValue)=>{onChange('contentPaddingLeft', newValue)}}
                                onBlur={(_, newValue)=>{!newValue&&onChange('contentPaddingLeft', newValue||'0')}}
                                config={{
                                    sufixElement:'px'
                                }}
                            />
                        </div>
                    )
                }
                {
                    ('height' in form) && (
                        <div style={{marginBottom:'var(--space-200)'}}>
                            <p>Height</p>
                            <InputText
                                type="number"
                                txtPlaceholder="Enter value..."
                                value={form['height']}
                                onChange={(newValue)=>{onChange('height', newValue)}}
                                config={{
                                    sufixElement:'px'
                                }}
                            />
                        </div>
                    )
                }
                {
                    ('width' in form) && (
                        <div style={{marginBottom:'var(--space-200)'}}>
                            <p>Width</p>
                            <InputText
                                type="number"
                                txtPlaceholder="Enter value..."
                                value={form['width']}
                                onChange={(newValue)=>{onChange('width', newValue)}}
                                config={{
                                    sufixElement:'px'
                                }}
                            />
                        </div>
                    )
                }
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
                {
                    ('backdropColor' in form) && (
                        <div style={{marginBottom:'var(--space-200)'}}>
                            <p>Backdrop background</p>
                            <InputColor
                                txtPlaceholder="Select color..."
                                value={form['backdropColor']}
                                onChange={(newValue)=>{onChange('backdropColor', newValue||'#FFFFFF')}}
                            />
                        </div>
                    )
                }
                {
                    ('backgroundColor' in form) && (
                        <div style={{marginBottom:'var(--space-200)'}}>
                            <p>{selectedId==='root'?`Paper background`:'Background'}</p>
                            <div style={{display:"flex", alignItems:'center'}}>
                                {
                                    (form['backgroundColor'])?(
                                        <div style={{flexGrow:'1'}}>
                                            <InputColor
                                                txtPlaceholder="Select color..."
                                                value={form['backgroundColor']}
                                                onChange={(newValue)=>{onChange('backgroundColor', newValue||"#FFFFFF")}}
                                            />
                                        </div>
                                    ):(
                                        <div style={{marginLeft:'var(--space-50)'}}><ColorPreview value="#FFFFFF00" isAllowAlpha={true} height="28px" width="28px"/></div>
                                    )
                                }
                                <IconButton
                                    icon={(form['backgroundColor'])?(<PiXBold className="global-icon"/>):(<PiPlusBold className="global-icon"/>)}
                                    txtLabel={(form['backgroundColor'])?("Remove background color"):("Add color")}
                                    onClick={()=>{
                                        if(!form['backgroundColor']){
                                            onChange('backgroundColor', "#FFFFFF")
                                        }else{
                                            onChange('backgroundColor', undefined)
                                        }
                                    }}
                                    isShowtooltip={false}
                                />
                            </div>
                        </div>
                    )
                }
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
                {
                    ('paddingTop' in form) && (
                        <div style={{marginBottom:'var(--space-200)'}}>
                            <p>Padding top</p>
                            <InputText
                                type="number"
                                txtPlaceholder="Enter value..."
                                value={form['paddingTop']}
                                onChange={(newValue)=>{onChange('paddingTop', newValue)}}
                                onBlur={(_, newValue)=>{!newValue&&onChange('paddingTop', newValue||'0')}}
                                config={{
                                    sufixElement:'px'
                                }}
                            />
                        </div>
                    )
                }
                {
                    ('paddingBottom' in form) && (
                        <div style={{marginBottom:'var(--space-200)'}}>
                            <p>Padding Bottom</p>
                            <InputText
                                type="number"
                                txtPlaceholder="Enter value..."
                                value={form['paddingBottom']}
                                onChange={(newValue)=>{onChange('paddingBottom', newValue)}}
                                onBlur={(_, newValue)=>{!newValue&&onChange('paddingBottom', newValue||'0')}}
                                config={{
                                    sufixElement:'px'
                                }}
                            />
                        </div>
                    )
                }
                {
                    ('paddingRight' in form) && (
                        <div style={{marginBottom:'var(--space-200)'}}>
                            <p>Padding Right</p>
                            <InputText
                                type="number"
                                txtPlaceholder="Enter value..."
                                value={form['paddingRight']}
                                onChange={(newValue)=>{onChange('paddingRight', newValue)}}
                                onBlur={(_, newValue)=>{!newValue&&onChange('paddingRight', newValue||'0')}}
                                config={{
                                    sufixElement:'px'
                                }}
                            />
                        </div>
                    )
                }
                {
                    ('paddingLeft' in form) && (
                        <div style={{marginBottom:'var(--space-200)'}}>
                            <p>Padding Left</p>
                            <InputText
                                type="number"
                                txtPlaceholder="Enter value..."
                                value={form['paddingLeft']}
                                onChange={(newValue)=>{onChange('paddingLeft', newValue)}}
                                onBlur={(_, newValue)=>{!newValue&&onChange('paddingLeft', newValue||'0')}}
                                config={{
                                    sufixElement:'px'
                                }}
                            />
                        </div>
                    )
                }
            </div>
            <p style={{wordWrap:'break-word'}}>
                {JSON.stringify(form)}
            </p>
        </div>
    )
}

export default PropertiesSection