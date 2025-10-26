import type { optionItemType } from "src/components/_types"

export const onOptionClick = (
    option:optionItemType,
    e:React.MouseEvent<HTMLButtonElement>,
    onClickFunction?:(idOption:string, option:optionItemType, e:React.MouseEvent<HTMLButtonElement>)=>void,
) =>{
    if(onClickFunction){
        onClickFunction(option.id, option, e)
    }
}