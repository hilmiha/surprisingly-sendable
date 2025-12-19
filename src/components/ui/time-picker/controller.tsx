import type { fieldErrorType } from "src/components/_types"
import type { timePickerConfigType } from "."

export const doValidateValue = (
    newValue:Date|undefined,
    onValidate:(error:fieldErrorType, newValue:Date|undefined)=>void,
    config:timePickerConfigType
) =>{
    let isError = false
    let errorMessage = ''

    if(config['isRequired'] && !isError){
        if(!newValue){
            isError = true
            errorMessage = 'This field cannot be empty!'
        }
    }
    // need to add more validation


    onValidate({isError:isError, errorMessage:errorMessage}, newValue)
}