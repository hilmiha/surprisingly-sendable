import './styles.scss'
import * as ctrl from './controller';
import clsx from 'clsx'
import { useContext, useMemo, useState } from 'react'
import { DayPicker, isDateRange, type CustomComponents, type DateRange, type Matcher, type Mode } from "react-day-picker"
import { GlobalContext, type _GlobalContextType } from 'src/context/global-context'
import type { globalShapeType } from 'src/components/_types'
import CalendarNavigation from './components/calendar-navigation'
import CalendarPickerArea from './components/calendar-picker-area'
import { addDays, closestIndexTo, endOfMonth, isAfter, isBefore, isSameDay, isWithinInterval, startOfDay, subDays } from 'date-fns';
import TimePicker from '../time-picker';

const Calendar = ({
    type = 'single',
    value = undefined,
    onChange = undefined,
    isDisabled = false,
    disabledDates = undefined,
    shape = undefined,
    calendarStart = undefined,
    calendarEnd = undefined,
    isHideTime = false,
    maxSelected = undefined
}:_Calendar) =>{
    
    //Context start ====
    const {
        globalShape,
    } = useContext(GlobalContext) as _GlobalContextType
    //Context end ====

    const [pickMode, setPickMode] = useState<pickModeType>('date')
    const calendarStartValue = useMemo(()=>{
        const now = new Date()
        if(calendarStart){
            return calendarStart
        }else{
            return new Date(now.getFullYear() - 100, 0, 1);
        }
    },[calendarStart])

    const calendarEndValue = useMemo(()=>{
        const now = new Date()
        if(calendarEnd){
            return endOfMonth(calendarEnd)
        }else{
            return new Date(now.getFullYear() + 5, 11, 31);
        }
    },[calendarEnd])

    const components = useMemo<Partial<CustomComponents>>(()=>{
        return ({
            MonthCaption:()=>{
                return<CalendarNavigation pickMode={pickMode} setPickMode={setPickMode}/>
            },
            Nav:()=>{
                return(<></>)
            },
            MonthGrid:(props)=>{
                return<CalendarPickerArea 
                    props={props} 
                    pickMode={pickMode} 
                    setPickMode={setPickMode}
                    calendarStartValue={calendarStartValue}
                    calendarEndValue={calendarEndValue}
                />
            },
        })
    },[pickMode, calendarStartValue, calendarEndValue])

    const disabledDatesAll = useMemo(() => {
        const result: validCalendarDisabledValue[] = [];

        if (disabledDates?.length) {
            result.push(...disabledDates);
        }

        // ─────────────────────────────
        // RANGE MODE
        // ─────────────────────────────
        if (type === 'range' && isDateRange(value) && value?.from) {
            const from = startOfDay(subDays(value.from, 1));
            result.push({
                from: new Date(1800, 0, 1),
                to: from,
            });
            if (maxSelected) {
                const maxTo = addDays(from, maxSelected + 1);
                result.push({
                    from: maxTo,
                    to: calendarEndValue,
                });
            }
        }
        console.log(result)

        // ─────────────────────────────
        // MULTIPLE MODE
        // ─────────────────────────────
        if (
            type === 'multiple' &&
            Array.isArray(value) &&
            value.length > 0 &&
            maxSelected
        ) {
            // Always include predefined disabled dates
            if (disabledDates?.length) {
                result.push(...disabledDates);
            }

            // When max selected reached → lock selection
            if (value.length === maxSelected) {
                result.push((date: Date) => {
                    // keep selected dates enabled
                    const isSelected = value.some(
                        selected =>
                        selected.toDateString() === date.toDateString()
                    );

                    // disable everything else
                    return !isSelected;
                });
            }
        }

        return result;
    }, [type, value, disabledDates, maxSelected, calendarEndValue]);
    
    return(
        <div 
            className={clsx(
                'calendar-box',
                (shape)?(shape):(globalShape),
                {
                    ['disabled']:isDisabled
                }
                
            )}
        >
            {
                (type==='multiple')?(
                    <DayPicker
                        startMonth={calendarStartValue}
                        endMonth={calendarEndValue}
                        defaultMonth={value?((value as Date[])[0]):(undefined)}
                        components={components}
                        mode='multiple'
                        selected={value as Date[] | undefined}
                        onSelect={(newValue)=>{ctrl.onValueChange(type, value, newValue, isDisabled, onChange)}}
                        disabled={disabledDatesAll}
                        fixedWeeks={true}
                        max={maxSelected}
                    />
                ):(type==='range')?(
                    <DayPicker
                        startMonth={calendarStartValue}
                        endMonth={calendarEndValue}
                        defaultMonth={value?((value as DateRange).from):(undefined)}
                        components={components}
                        mode='range'
                        selected={value as DateRange | undefined}
                        onSelect={(newValue)=>{
                            if(!value || !newValue){
                                ctrl.onValueChange(type, value, newValue, isDisabled, onChange)
                            }
                        }}
                        onDayClick={(clickedDate)=>{
                            if(value && isDateRange(value) && value.from && value.to){
                                const currentValueFrom = value.from
                                const currentValueTo = value.to
                                
                                let newValue = undefined
                                if(isSameDay(clickedDate, currentValueFrom) || isSameDay(clickedDate, currentValueTo)){

                                }else if(isWithinInterval(clickedDate, {start:currentValueFrom, end:currentValueTo})){
                                    const clesesTo = closestIndexTo(clickedDate, [currentValueFrom, currentValueTo]);
                                    if(clesesTo===0){
                                        newValue = {from:clickedDate, to:currentValueTo}
                                    }else{
                                        newValue = {from:currentValueFrom, to:clickedDate}
                                    }
                                }else if(isAfter(clickedDate, currentValueFrom)){
                                    newValue = {from:currentValueFrom, to:clickedDate}
                                }else if(isBefore(clickedDate, currentValueFrom)){
                                    newValue = {from:clickedDate, to:currentValueTo}
                                }
                                ctrl.onValueChange(type, value, newValue, isDisabled, onChange)

                            }
                        }}
                        disabled={disabledDatesAll}
                        fixedWeeks={true}
                        max={maxSelected}
                    />
                ):((type==='single' || type==='single-with-time'))?(
                    <DayPicker
                        startMonth={calendarStartValue}
                        endMonth={calendarEndValue}
                        defaultMonth={value?((value as Date)):(undefined)}
                        components={components}
                        mode='single'
                        selected={value as Date | undefined}
                        onSelect={(newValue)=>{ctrl.onValueChange(type, value, newValue, isDisabled, onChange)}}
                        disabled={disabledDatesAll}
                        fixedWeeks={true}
                        footer={(type==='single-with-time' && isHideTime===false)?(
                            <div style={{borderTop:'1px solid var(--clr-border)', marginTop:"var(--space-50)", paddingTop:'var(--space-100)', display:'flex', justifyContent:'center'}}>
                                <TimePicker value={value as Date | undefined} onChange={(newValue)=>{if(onChange){onChange(newValue)}}} isDisabled={isDisabled}/>
                            </div>
                        ):(undefined)}
                    />
                ):(
                    <>type problem</>
                )
            }
        </div>
        
    )
}

export default Calendar

interface _Calendar {
    type:calendarType;
    value?:validCalendarValue;
    onChange?:(newValue:validCalendarValue)=>void;
    isDisabled?:boolean;
    disabledDates?:validCalendarDisabledValue[];
    shape?:globalShapeType;
    calendarStart?:Date;
    calendarEnd?:Date;
    isHideTime?:boolean;
    maxSelected?:number
}
export type calendarType = Mode | 'single-with-time'
export type pickModeType = "date" | 'month' | 'year'
export type validCalendarDisabledValue = Matcher
export type validCalendarValue = Date | Date[] | DateRange | undefined
