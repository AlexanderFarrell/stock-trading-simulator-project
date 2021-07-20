import {GetIdDiv} from "../helper/view_helper.js";

export function GetPositionsElement(){
    let element = GetIdDiv('Positions', ['GameView']);
    element.innerHTML = '<h2>Positions</h2>';

    return element;
}