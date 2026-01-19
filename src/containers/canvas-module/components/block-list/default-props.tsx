import type { Delta } from "quill";
import type { paperBlockPropsType } from "../../context";

export const blockListDefaultProps:paperBlockPropsType = {
    'textDelta' : {"ops":[{"insert":"New List"},{"attributes":{"list":"bullet"},"insert":"\n"}]} as Delta,
    'listType' : 'bullet',
    'textColor' : '#000000',
    'fontSize' : '12',
    'fontFamily' : 'global',
    'borderRadiusTL' : '0',
    'borderRadiusTR' : '0',
    'borderRadiusBL' : '0',
    'borderRadiusBR' : '0',
    'borderColor':undefined,
    borderTop:'1',
    borderBottom:'1',
    borderLeft:'1',
    borderRight:'1',
    'visibility': 'both',
} 
