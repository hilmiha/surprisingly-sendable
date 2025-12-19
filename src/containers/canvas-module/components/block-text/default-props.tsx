import type { Delta } from "quill";
import type { paperBlockPropsType } from "../../context";

export const blockTextDefaultProps:paperBlockPropsType = {
    'textDelta' : {"ops":[{"insert":"New Text Block\n"}]} as Delta,
    'textColor' : '#000000',
    'fontSize' : '12',
    'fontFamily' : 'global',
    'textAlign' : 'left',
    'borderRadiusTL' : '0',
    'borderRadiusTR' : '0',
    'borderRadiusBL' : '0',
    'borderRadiusBR' : '0',
} 