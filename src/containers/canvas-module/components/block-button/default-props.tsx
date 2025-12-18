import type { Delta } from "quill";
import type { paperBlockPropsType } from "../../context";

export const blockButtonDefaultProps:paperBlockPropsType = {
    'textDelta' : {"ops":[{"attributes":{"bold":true},"insert":"Button"},{"insert":"\n"}]} as Delta,
    'fontSize' : '14',
    'url' : '',
    'textAlign' : 'left',
    'buttonWidth' : 'auto',
    'buttonColor' : '#0F147A',
    'textColor' : '#FFFFFF',
    'borderRadiusTL' : '0',
    'borderRadiusTR' : '0',
    'borderRadiusBL' : '0',
    'borderRadiusBR' : '0',
    'contentPaddingTop' : '12',
    'contentPaddingBottom' : '12',
    'contentPaddingLeft' : '24',
    'contentPaddingRight' : '24',
} 