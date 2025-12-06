import { useEffect, useRef, useState } from "react"
import { useCanvasModule, type paperBlockPropsType } from "../../context"
import InputColor from "src/components/ui/input-color"
import InputText from "src/components/ui/input-text"
import IconButton from "src/components/ui/icon-button"
import { PiAlignBottomSimpleBold, PiAlignCenterHorizontalSimpleBold, PiAlignCenterVerticalSimpleBold, PiAlignLeftSimpleBold, PiAlignTopSimpleBold, PiPlusBold, PiTextAlignCenterBold, PiTextAlignJustifyBold, PiTextAlignLeftBold, PiTextAlignRightBold, PiXBold } from "react-icons/pi"
import ColorPreview from "src/components/ui/color-picker/color-preview"
import InputSelection from "src/components/ui/input-selection"
import Button from "src/components/ui/button"
import Radio from "src/components/ui/radio-button/radio"
import { listFontFamily, listFontFamilyRoot } from "../../data/font-family"

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
            <div ref={topResizeable}></div>
            {
                ('columnCount' in form) && (
                    <div style={{marginBottom:'var(--space-200)'}}>
                        <p>Column Count</p>
                        <InputSelection
                            type="single"
                            option={[
                                {id:'1', txtLabel:'1', type:'option'},
                                {id:'2', txtLabel:'2', type:'option'},
                                {id:'3', txtLabel:'3', type:'option'},
                            ]}
                            value={[`${form['columnCount']}`]}
                            onChange={(newValue)=>{onChange('columnCount', newValue[0]||'2')}}
                            config={{
                                isHideClear:true,
                            }}
                        />
                    </div>
                    
                )
            }
            {
                ('columnGap' in form) && (
                    <div style={{marginBottom:'var(--space-200)'}}>
                        <p>Column Gap</p>
                        <InputText
                            type="number"
                            txtPlaceholder="Enter value..."
                            value={form['columnGap']}
                            onChange={(newValue)=>{onChange('columnGap', newValue)}}
                            config={{
                                isHideClear:true,
                                sufixElement:'px'
                            }}
                        />
                    </div>
                )
            }
            {
                ('url' in form) && (
                    <div style={{marginBottom:'var(--space-200)'}}>
                        <p>Url</p>
                        <InputText
                            type="text-no-space"
                            txtPlaceholder="Enter source..."
                            value={form['url']}
                            onChange={(newValue)=>{onChange('url', newValue)}}
                            config={{
                                isHideClear:true,
                            }}
                        />
                    </div>
                )
            }
            {
                ('textColor' in form) && (
                    <div style={{marginBottom:'var(--space-200)'}}>
                        <p>Text color</p>
                        <InputColor
                            txtPlaceholder="Select color..."
                            value={form['textColor']}
                            onChange={(newValue)=>{onChange('textColor', newValue||"#000000")}}
                            config={{
                                isHideClear:true
                            }}
                        />
                    </div>
                )
            }
            {
                ('textType' in form) && (
                    <div style={{marginBottom:'var(--space-200)'}}>
                        <p>Heading Type</p>
                        <div style={{display:'flex'}}>
                            <Button 
                                txtLabel='H1' 
                                onClick={()=>{onChange('textType', 'h1')}}
                                iconBefore={<Radio isSelected={form['textType']==='h1'}/>}
                                isSelected={form['textType']==='h1'}
                            />
                            <Button 
                                txtLabel='H2' 
                                onClick={()=>{onChange('textType', 'h2')}}
                                iconBefore={<Radio isSelected={form['textType']==='h2'}/>}
                                isSelected={form['textType']==='h2'}
                            />
                            <Button 
                                txtLabel='H3' 
                                onClick={()=>{onChange('textType', 'h3')}}
                                iconBefore={<Radio isSelected={form['textType']==='h3'}/>}
                                isSelected={form['textType']==='h3'}
                            />
                        </div>
                    </div>
                )
            }
            {
                ('fontSize' in form) && (
                    <div style={{marginBottom:'var(--space-200)'}}>
                        <p>Text size</p>
                        <InputText
                            type="number"
                            txtPlaceholder="Enter value..."
                            value={form['fontSize']}
                            onChange={(newValue)=>{onChange('fontSize', newValue)}}
                            config={{
                                isHideClear:true,
                                sufixElement:'px'
                            }}
                        />
                    </div>
                )
            }
            {
                ('h1Size' in form) && (
                    <div style={{marginBottom:'var(--space-200)'}}>
                        <p>Global Heading 1 size</p>
                        <InputText
                            type="number"
                            txtPlaceholder="Enter value..."
                            value={form['h1Size']}
                            onChange={(newValue)=>{onChange('h1Size', newValue)}}
                            config={{
                                isHideClear:true,
                                sufixElement:'px'
                            }}
                        />
                    </div>
                )
            }
            {
                ('h2Size' in form) && (
                    <div style={{marginBottom:'var(--space-200)'}}>
                        <p>Global Heding 2 size</p>
                        <InputText
                            type="number"
                            txtPlaceholder="Enter value..."
                            value={form['h2Size']}
                            onChange={(newValue)=>{onChange('h2Size', newValue)}}
                            config={{
                                isHideClear:true,
                                sufixElement:'px'
                            }}
                        />
                    </div>
                    
                )
            }
            {
                ('h3Size' in form) && (
                    <div style={{marginBottom:'var(--space-200)'}}>
                        <p>Global Heding 3 size</p>
                        <InputText
                            type="number"
                            txtPlaceholder="Enter value..."
                            value={form['h3Size']}
                            onChange={(newValue)=>{onChange('h3Size', newValue)}}
                            config={{
                                isHideClear:true,
                                sufixElement:'px'
                            }}
                        />
                    </div>
                    
                )
            }
            {
                ('fontFamily' in form) && (
                    <div style={{marginBottom:'var(--space-200)'}}>
                        <p>{selectedId==='root'?`Global font family`:`Font family`}</p>
                        <InputSelection
                            type="single"
                            option={selectedId==='root'?(listFontFamilyRoot):(listFontFamily)}
                            value={form['fontFamily']?([form['fontFamily']]):([])}
                            onChange={(newValue)=>{onChange('fontFamily', newValue[0]||((selectedId==='root')?(listFontFamilyRoot[0].id):(listFontFamily[0].id)))}}
                            config={{
                                isHideClear:true
                            }}
                        />
                    </div>
                )
            }
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
                                isHideClear:true,
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
                            config={{
                                isHideClear:true
                            }}
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
                                isHideClear:true,
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
                                isHideClear:true,
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
                                isHideClear:true,
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
                                isHideClear:true,
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
                                isHideClear:true,
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
                                isHideClear:true,
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
                                isHideClear:true,
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
                                isHideClear:true,
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
                                isHideClear:true,
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
                                isHideClear:true,
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
                            <IconButton
                                icon={<PiTextAlignJustifyBold className="global-icon"/>}
                                txtLabel="justify"
                                onClick={()=>{onChange('textAlign', 'justify')}}
                                isSelected={form['textAlign']==='justify'}
                            />
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
                            config={{
                                isHideClear:true
                            }}
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
                                            config={{
                                                isHideClear:true
                                            }}
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
                                icon={(paperValue[selectedId]?.type==='column')?(<PiAlignTopSimpleBold className="global-icon"/>):(<PiAlignLeftSimpleBold className="global-icon"/>)}
                                txtLabel="start"
                                onClick={()=>{onChange('alignment', 'start')}}
                                isSelected={form['alignment']==='start'}
                            />
                            <IconButton
                                icon={(paperValue[selectedId]?.type==='column')?(<PiAlignCenterVerticalSimpleBold className="global-icon"/>):(<PiAlignCenterHorizontalSimpleBold className="global-icon"/>)}
                                txtLabel="center"
                                onClick={()=>{onChange('alignment', 'center')}}
                                isSelected={form['alignment']==='center'}
                            />
                            <IconButton
                                icon={(paperValue[selectedId]?.type==='column')?(<PiAlignBottomSimpleBold className="global-icon"/>):(<PiAlignBottomSimpleBold className="global-icon"/>)}
                                txtLabel="end"
                                onClick={()=>{onChange('alignment', 'end')}}
                                isSelected={form['alignment']==='end'}
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
                                isHideClear:true,
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
                                isHideClear:true,
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
                                isHideClear:true,
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
                                isHideClear:true,
                                sufixElement:'px'
                            }}
                        />
                    </div>
                )
            }
            <p style={{wordWrap:'break-word'}}>
                {JSON.stringify(form)}
            </p>
        </div>
    )
}

export default PropertiesSection