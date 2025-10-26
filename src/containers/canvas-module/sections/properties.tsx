import { useEffect, useState } from "react"
import { useCanvasModule, type paperBlockPropsType } from "../context"
import InputColor from "src/components/ui/input-color"
import InputText from "src/components/ui/input-text"
import IconButton from "src/components/ui/icon-button"
import { PiPlusBold, PiXBold } from "react-icons/pi"
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
                ('textType' in form) && (
                    <div style={{display:'flex'}}>
                        <Button 
                            txtLabel='Normal' 
                            onClick={()=>{onChange('textType', 'normal')}}
                            iconBefore={<Radio isSelected={form['textType']==='normal'}/>}
                            isSelected={form['textType']==='normal'}
                        />
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
                )
            }
            {
                ('textColor' in form) && (
                    <InputColor
                        txtPlaceholder="Select color..."
                        value={form['textColor']}
                        onChange={(newValue)=>{onChange('textColor', newValue||"#000000")}}
                        config={{
                            isHideClear:true
                        }}
                    />
                )
            }
            {
                ('fontSize' in form) && (
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
                )
            }
            {
                ('fontFamily' in form) && (
                    <InputSelection
                        type="single"
                        option={selectedId==='root'?(listFontFamilyRoot):(listFontFamily)}
                        value={form['fontFamily']?([form['fontFamily']]):([])}
                        onChange={(newValue)=>{onChange('fontFamily', newValue[0]||((selectedId==='root')?(listFontFamilyRoot[0].id):(listFontFamily[0].id)))}}
                        config={{
                            isHideClear:true
                        }}
                    />
                )
            }
            {
                ('imageSrcUrl' in form) && (
                    <InputText
                        type="text"
                        txtPlaceholder="Enter source..."
                        value={form['imageSrcUrl']}
                        onChange={(newValue)=>{onChange('imageSrcUrl', newValue)}}
                        config={{
                            isHideClear:true,
                        }}
                    />
                )
            }
            {
                ('height' in form) && (
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
                )
            }
            {
                ('width' in form) && (
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
                )
            }
            {
                ('backdropColor' in form) && (
                    <InputColor
                        txtPlaceholder="Select color..."
                        value={form['backdropColor']}
                        onChange={(newValue)=>{onChange('backdropColor', newValue||'#FFFFFF')}}
                        config={{
                            isHideClear:true
                        }}
                    />
                )
            }
            {
                ('backgroundColor' in form) && (
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
                )
            }
            {
                ('paddingTop' in form) && (
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
                )
            }
            {
                ('paddingRight' in form) && (
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
                )
            }
            {
                ('paddingBottom' in form) && (
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
                )
            }
            {
                ('paddingLeft' in form) && (
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
                )
            }
            {JSON.stringify(form)}
        </div>
    )
}

export default Properties