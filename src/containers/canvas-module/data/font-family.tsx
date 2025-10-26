import type { optionItemType } from "src/components/_types";

export const listFontFamily:optionItemType[] = [
    {id:'global', txtLabel:'Global Font'},
    {id:'aria', txtLabel:'Aria'},
    {id:'verdana', txtLabel:'Verdana'},
    {id:'tahoma', txtLabel:'Tahoma'},
    {id:'trebuchet-ms', txtLabel:'Trebuchet MS'},
    {id:'times-new-roman', txtLabel:'Times New Roman'},
    {id:'georgia', txtLabel:'Georgia'},
    {id:'garamond', txtLabel:'Garamond'},
    {id:'courier-new', txtLabel:'Courier New'},
    {id:'brush-script-mt', txtLabel:'Brush Script MT'},
]

export const listFontFamilyRoot:optionItemType[] = [
    {id:'aria', txtLabel:'Aria'},
    {id:'verdana', txtLabel:'Verdana'},
    {id:'tahoma', txtLabel:'Tahoma'},
    {id:'trebuchet-ms', txtLabel:'Trebuchet MS'},
    {id:'times-new-roman', txtLabel:'Times New Roman'},
    {id:'georgia', txtLabel:'Georgia'},
    {id:'garamond', txtLabel:'Garamond'},
    {id:'courier-new', txtLabel:'Courier New'},
    {id:'brush-script-mt', txtLabel:'Brush Script MT'},
]

export const fontFamilyDict:{[key:string]:string} = {
    "aria":"Arial, sans-serif",
    "verdana":"Verdana, sans-serif",
    "tahoma":"Tahoma, sans-serif",
    "trebuchet-ms":"'Trebuchet MS', sans-serif",
    "times-new-roman":"'Times New Roman', serif",
    "georgia":"Georgia, serif",
    "garamond":"Garamond, serif",
    "courier-new":"'Courier New', monospace",
    "brush-script-mt":"'Brush Script MT', cursive"
}