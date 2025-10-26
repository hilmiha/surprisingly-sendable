import { useState } from "react"
import CheckboxButton from "src/components/ui/checkbox-button"
import InputCode from "src/components/ui/input-code"
import PreviewBox from "src/containers/documentation-module/sections/preview-box"

const PreviewSection = () =>{
    const [isSelected, setIsSelected] = useState(false)

    return(
        <div 
            style={{
                display:'grid',
                gap:'var(--space-100)',
                marginTop:"var(--space-300)",
                alignItems:'center',
            }}
        >
            <PreviewBox>
                <div style={{display:"flex", justifyContent:'center'}}>
                    <CheckboxButton
                        isSelected={isSelected}
                        txtLabel="Checkbox Item"
                        txtSublabel="Lorem ipsum dolor sit amet"
                        onClick={(newValue)=>{setIsSelected(newValue)}}
                    />
                </div>
            </PreviewBox>
            <InputCode
                lang="tsx"
                isDisabled={true}
                value={sampleCode}
                style={{
                    inputCode:{
                        maxHeight:'50vh'
                    }
                }}
            />
        </div>
    )
}

export default PreviewSection


const sampleCode = `import { useState } from "react"
import CheckboxButton from "src/components/ui/checkbox-button"

const CheckboxButtonDemo = () =>{

    const [isSelected, setIsSelected] = useState(false)

    return(
        <CheckboxButton
            isSelected={isSelected}
            txtLabel="Checkbox Item"
            txtSublabel="Lorem ipsum dolor sit amet"
            onClick={(newValue)=>{setIsSelected(newValue)}}
        />
    )
}`