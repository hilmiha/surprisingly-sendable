import './styles.scss';
import clsx from 'clsx';
import * as ctrl from './controller';
import { useContext } from "react"
import { PiCircle } from 'react-icons/pi';
import { GlobalContext, type _GlobalContextType } from 'src/context/global-context';
import Tooltip from '../tooltip';
import type { globalAppearanceType, globalShapeType } from 'src/components/_types';
import Spinner from '../spinner';

const IconButton = ({
    ref = undefined,
    id = undefined,
    className = undefined,
    style = undefined,
    appearance = 'neutral',
    shape = undefined,
    icon = <PiCircle/>,
    txtLabel = '',
    isSelected = false,
    isDisabled = false,
    isLoading = false,
    isShowtooltip = true,
    onClick = undefined
}:_IconButton) =>{

    //Context start ====
    const {
        globalShape
    } = useContext(GlobalContext) as _GlobalContextType
    //Context end ====
    
    return(
        <Tooltip
            content={isShowtooltip?txtLabel:''}
        >
            <button
                ref={ref}
                id={id}
                className={
                    clsx(
                        className,
                        'icon-button',
                        appearance,
                        (shape)?(shape):(globalShape),
                        {
                            ['selected']:(isSelected),
                            ['disabled']:(isDisabled),
                            ['loading']:(isLoading),
                        },
                    )
                }
                style={style?.button}
                onClick={(e)=>{
                    if(!isDisabled){
                        ctrl.thisOnClick(e, onClick)
                    }
                }}
                disabled={isDisabled}
                aria-label={txtLabel}
            >
                <div
                    className='icon'
                    style={style?.icon}
                >
                    {
                        (isLoading)?(
                            <Spinner size='small'/>
                        ):(
                            icon
                        )
                    }
                </div>
            </button>
        </Tooltip>
        
    )
}

export default IconButton

interface _IconButton {
    ref?:React.Ref<HTMLButtonElement>;
    id?:string;
    className?:string;
    style?:iconButtonStyleType;
    appearance?:globalAppearanceType;
    shape?:globalShapeType;
    icon:React.ReactNode;
    txtLabel:string;
    isSelected?:boolean;
    isDisabled?:boolean;
    isLoading?:boolean;
    isShowtooltip?:boolean;
    onClick?:(e:React.MouseEvent<HTMLButtonElement>)=>void;
}

export type iconButtonStyleType = {
    button?:React.CSSProperties,
    icon?:React.CSSProperties
}
