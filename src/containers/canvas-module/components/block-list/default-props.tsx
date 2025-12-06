import type { Delta } from "quill";
import type { paperBlockPropsType } from "../../context";

export const blockListDefaultProps:paperBlockPropsType = {
    'textDelta' : {"ops":[{"insert":"New List"},{"attributes":{"list":"bullet"},"insert":"\n"}]} as Delta,
    'listType' : 'bullet',
    'textColor' : '#000000',
    'fontSize' : '14',
    'fontFamily' : 'global',
    'borderRadiusTL' : '0',
    'borderRadiusTR' : '0',
    'borderRadiusBL' : '0',
    'borderRadiusBR' : '0',
} 