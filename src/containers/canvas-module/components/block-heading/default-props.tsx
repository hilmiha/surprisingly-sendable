import type { Delta } from "quill";
import type { paperBlockPropsType } from "../../context";

export const blockHeadingDefaultProps:paperBlockPropsType = {
    textDelta: {"ops":[{"insert":"New Title Block\n"}]} as Delta,
    textColor: '#000000',
    textType: 'h1',
    fontFamily: 'global',
    textAlign: 'left',
    borderRadiusTL: '0',
    borderRadiusTR: '0',
    borderRadiusBL: '0',
    borderRadiusBR: '0',
} 