import './styles.scss'
import clsx from "clsx"
import * as ctrl from './controller';
import { useContext, useEffect, useRef, useState } from "react"
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi"
import { GlobalContext, type _GlobalContextType } from 'src/context/global-context';
import type { globalShapeType } from 'src/components/_types';

const Accordion = ({
    id,
    isOpen = false,
    onClickTrigger = undefined,
    className = undefined,

    onOpen = undefined,
    onClose = undefined,

    isDisabled = false,

    txtLabel = '',
    iconBefore = undefined,
    children = undefined,

    maxHeightContent = undefined,
    style = undefined,
    shape = undefined
}:_Accordion) =>{

    //Context start ====
    const {
        globalShape
    } = useContext(GlobalContext) as _GlobalContextType
    //Context end ====
    
    const mountedOnce = useRef(false);
    const [isMounted, setIsMounted] = useState(isOpen)
    

    useEffect(()=>{
        if(isOpen && onOpen){
            mountedOnce.current = true
            onOpen(id)
        }
        if(!isOpen && onClose && mountedOnce.current){
            onClose(id)
        }

        if(isOpen){
            setIsMounted(true)
        }else{
            setTimeout(() => {
                setIsMounted(false)
            }, 300);
        }

    },[isOpen])

    return(
        <div
            className={clsx(
                'accordion-box',
                className
            )}
        >
            <button
                id={id}
                className={clsx(
                    "accordion-button",
                    (shape)?(shape):(globalShape),
                    (isOpen)?('open'):('close'),
                    {
                        ['disabled']:(isDisabled)
                    },
                )}
                style={style?.button}
                onClick={()=>{
                    if(!isDisabled){
                        ctrl.doClickAccordionButton(id, isOpen, onClickTrigger)
                    }
                }}
                disabled={isDisabled}
            >
                <div className="title-box">
                    {
                        (iconBefore)&&(
                            <div className='icon-before'>
                                {iconBefore}
                            </div>
                        )
                    }
                    {
                        (txtLabel)&&(
                            <div className='text-label-box'>
                                <span className='text-label'>{txtLabel}</span>
                            </div>
                        )
                    }
                </div>
                {
                    (!isDisabled)&&(
                        <div className="caret-box">
                            {
                                (isOpen)?(
                                    <PiCaretUpBold/>
                                ):(
                                    <PiCaretDownBold/>
                                )
                            }
                        </div>
                    )
                }
            </button>
            <div
                className={clsx(
                    "accordion-content-box",
                    (isOpen)?('open'):('close'),
                )}
                style={{
                    ...style?.contentBox,
                    height:isOpen?(maxHeightContent):(undefined)
                }}
            >
                <div 
                    className='content'
                >
                    {
                        (isMounted)&&(
                            <>
                                {children}
                            </>
                        )
                    }
                </div>
            </div>
            
        </div>
    )
}

export default Accordion

export interface _Accordion {
    id:string
    isOpen?:boolean
    onClickTrigger?:(id:string)=>void
    className?:string

    onOpen?:(id:string)=>void
    onClose?:(id:string)=>void

    isDisabled?:boolean

    txtLabel?:string
    iconBefore?:React.ReactNode
    children?:React.ReactNode

    maxHeightContent?:string | number
    style?:accordionStyleType
    shape?:globalShapeType
}

export type accordionStyleType = {
    button:React.CSSProperties,
    contentBox:React.CSSProperties,
}