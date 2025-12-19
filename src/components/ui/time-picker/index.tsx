import './styles.scss'
import * as ctrl from './controller';
import { useEffect, useMemo, useState } from "react";
import { PiClockBold, PiWarningBold } from "react-icons/pi";
import { pad2 } from "src/helper/calendar-helper";
import InputText from "../input-text";
import type { fieldErrorType } from 'src/components/_types';

export type timePickerConfigType = {
    isRequired?:boolean
    isHideMinute?:boolean
    isHideSecond?:boolean
}

const TimePicker = ({
    value,
    isDisabled,
    onChange,
    error = undefined,
    onValidate = undefined,
    triggerValidate = 0,
    config = undefined,
}: {
    value: Date | undefined;
    onChange: (newValue:Date | undefined)=>void;
    isDisabled?:boolean
    error?:fieldErrorType;
    onValidate?:(error:fieldErrorType, newValue:Date | undefined)=>void;
    triggerValidate?:0|1;
    config?:timePickerConfigType;
}) => {
    const date = useMemo(() => {
        return value ?? new Date(0, 0, 0, 0, 0, 0);
    }, [value]);

    // raw editing states
    const [hourRaw, setHourRaw] = useState<string>(pad2(date.getHours()));
    const [minuteRaw, setMinuteRaw] = useState<string>(pad2(date.getMinutes()));
    const [secondRaw, setSecondRaw] = useState<string>(pad2(date.getSeconds()));

    // sync with external date when value changes outside
    useMemo(() => {
        setHourRaw(pad2(date.getHours()));
        setMinuteRaw(pad2(date.getMinutes()));
        setSecondRaw(pad2(date.getSeconds()));
    }, [date]);

    const clamp = (num: number, max: number) =>
        Math.min(Math.max(num, 0), max);

    const handleBlur = (part: "hour" | "minute" | "second", raw: string) => {
        let num = parseInt(raw, 10);
        if (isNaN(num)) num = 0;

        let clamped = 0;
        if (part === "hour") clamped = clamp(num, 23);
        if (part === "minute" || part === "second") clamped = clamp(num, 59);

        const newDate = new Date(date);
        if (part === "hour") newDate.setHours(clamped);
        if (part === "minute") newDate.setMinutes(clamped);
        if (part === "second") newDate.setSeconds(clamped);

        if(config?.isHideMinute){
            newDate.setMinutes(0);
        }

        if(config?.isHideSecond){
            newDate.setSeconds(0);
        }

        onChange(newDate);

        // set back padded string
        if (part === "hour") setHourRaw(pad2(clamped));
        if (part === "minute") setMinuteRaw(pad2(clamped));
        if (part === "second") setSecondRaw(pad2(clamped));
    };

    useEffect(()=>{
        if(triggerValidate===1){
            if(onValidate && config){
                ctrl.doValidateValue(value, onValidate,config)
            }
        }
    },[triggerValidate])

    return (
        <div className='time-picker-box'>
            <div className="time-picker">
                {/* Hours */}
                <div className="icon-box">
                    <PiClockBold className="global-icon"/>
                </div>
                <InputText
                    className="input-time"
                    type="number-text"
                    value={hourRaw}
                    onChange={(newValue) => {
                        if (/^\d*$/.test(newValue)) setHourRaw(newValue);
                    }}
                    onBlur={(_, val) => handleBlur("hour", val)}
                    isDisabled={isDisabled?isDisabled:!value}
                    error={{isError:error?.isError||false, errorMessage:''}}
                    config={{
                        maxLength: 2,
                    }}
                />
                
                {/* Minutes */}
                {
                    (!config?.isHideMinute)&&(
                        <>
                            <p style={{padding:'var(--space-0) var(--space-50)'}}>:</p>
                            <InputText
                                className="input-time"
                                type="number-text"
                                value={minuteRaw}
                                onChange={(newValue) => {
                                    if (/^\d*$/.test(newValue)) setMinuteRaw(newValue);
                                }}
                                onBlur={(_, val) => handleBlur("minute", val)}
                                isDisabled={isDisabled?isDisabled:!value}
                                error={{isError:error?.isError||false, errorMessage:''}}
                                config={{
                                    maxLength: 2,
                                }}
                            />
                        </>
                    )
                }
                

                {/* Seconds */}
                {
                    (!config?.isHideSecond)&&(
                        <>
                            <p style={{padding:'var(--space-0) var(--space-50)'}}>:</p>
                            <InputText
                                className="input-time"
                                type="number-text"
                                value={secondRaw}
                                onChange={(newValue) => {
                                    if (/^\d*$/.test(newValue)) setSecondRaw(newValue);
                                }}
                                onBlur={(_, val) => handleBlur("second", val)}
                                isDisabled={isDisabled?isDisabled:!value}
                                error={{isError:error?.isError||false, errorMessage:''}}
                                config={{
                                    maxLength: 2,
                                }}
                            />
                        </>
                    )
                }
                
            </div>
            {
                (error&& error.isError && error.errorMessage)&&(
                    <div className='error-box'>
                        <PiWarningBold className='global-icon'/>
                        <p>{error.errorMessage}</p>
                    </div>
                )
            }
        </div>
    );
};

export default TimePicker;
