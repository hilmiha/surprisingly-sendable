import { useEffect, useState } from "react"
import { useCanvasModule, type paperBlockPropsType } from "../context"
import InputColor from "src/components/ui/input-color"
import InputText from "src/components/ui/input-text"
import IconButton from "src/components/ui/icon-button"
import { PiAlignCenterHorizontalBold, PiAlignLeftSimpleBold, PiAlignRightSimpleBold, PiPlusBold, PiTextAlignCenterBold, PiTextAlignJustifyBold, PiTextAlignLeftBold, PiTextAlignRightBold, PiXBold } from "react-icons/pi"
import ColorPreview from "src/components/ui/color-picker/color-preview"
import InputSelection from "src/components/ui/input-selection"
import Button from "src/components/ui/button"
import Radio from "src/components/ui/radio-button/radio"
import { listFontFamily, listFontFamilyRoot } from "../data/font-family"

const Properties = () =>{
    const {
        selectedId,
        paperValue,
        setPaperValue,
    } = useCanvasModule()

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
    },[selectedId])

    return(
        <div>
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
                ('imageSrcUrl' in form) && (
                    <div style={{marginBottom:'var(--space-200)'}}>
                        <p>Image url</p>
                        <InputText
                            type="text"
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
                                icon={<PiAlignLeftSimpleBold className="global-icon"/>}
                                txtLabel="start"
                                onClick={()=>{onChange('alignment', 'start')}}
                                isSelected={form['alignment']==='start'}
                            />
                            <IconButton
                                icon={<PiAlignCenterHorizontalBold className="global-icon"/>}
                                txtLabel="center"
                                onClick={()=>{onChange('alignment', 'center')}}
                                isSelected={form['alignment']==='center'}
                            />
                            <IconButton
                                icon={<PiAlignRightSimpleBold className="global-icon"/>}
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

export default Properties