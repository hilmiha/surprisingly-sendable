import type { optionItemType } from "src/components/_types";

// Toggle collapse state
export const onCollapseButtonClick = (
    option: optionItemType,
    setCollapsed: React.Dispatch<React.SetStateAction<Set<string>>>
) => {
    setCollapsed(prev => {
        const newSet = new Set(prev);
        const nodeId = option.id
        const parentInsideNode = getParentIds(option)
        if (newSet.has(nodeId)){
            newSet.delete(nodeId)
            parentInsideNode.forEach((i)=>{
                newSet.delete(i)
            })
        }else{
            newSet.add(nodeId);
            parentInsideNode.forEach((i)=>{
                newSet.add(i)
            })
        }
        return newSet;
    });
};

// Get all parent IDs under an option
export const getParentIds = (option: optionItemType): string[] => {
    if (!option.childOption || option.childOption.length === 0) {
        return [];
    }

    return option.childOption
        .filter(child => child.childOption && child.childOption.length > 0)
        .map(child => child.id);
};


// Get all leaf IDs under an option
export const getLeafIds = (option: optionItemType): string[] => {
    if (!option.childOption || option.childOption.length === 0) {
        return [option.id];
    }

    return option.childOption.flatMap(getLeafIds);
};

// Get all disabled leaf IDs under an option
export const getDisabledLeafIds = (option: optionItemType): string[] => {
    if (!option.childOption || option.childOption.length === 0) {
        if(option.isDisabled){
            return [option.id];
        }
        return [];
    }

    return option.childOption.flatMap(getDisabledLeafIds);
};

// Determine option state from its leaf children
export const getNodeState = (option: optionItemType, checkedLeaves:Set<string>) => {
    if (!option.childOption || option.childOption.length === 0) {
        const isChecked = checkedLeaves.has(option.id);

        return({ 
            checked: isChecked, 
            indeterminate: false 
        })
    }

    const leafIds = getLeafIds(option);    
    const checkedCount = leafIds.filter((id) => checkedLeaves.has(id)).length;

    return {
        checked: checkedCount === leafIds.length,
        indeterminate: checkedCount > 0 && checkedCount < leafIds.length
    };
};

// On an option clicked
export const onOptionItemClick = (
    option: optionItemType, 
    isChecked: boolean, 
    checkedLeaves:Set<string>, 
    onChange?:(checkedLeafIds: string[]) => void
) => {
    const newValue = new Set(checkedLeaves);
    const leafIds = getLeafIds(option);
    const disabledIds = getDisabledLeafIds(option)
    const countSelectedLeaf = leafIds.filter((i)=>newValue.has(i))

    leafIds.forEach((id) => {
        if (isChecked && ((leafIds.length-disabledIds.length)!==countSelectedLeaf.length)) {
            newValue.add(id);
        } else {
            newValue.delete(id);
        }
    });

    if(isChecked){
        disabledIds.forEach((i)=>{
            newValue.delete(i)
        })
    }

    if(onChange){
        onChange([...newValue]);
    }
};

