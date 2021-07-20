import {ViewSwitcher} from "../helper/view_switcher.js";
import {GetPositionsElement} from "./positions.js";
import {GetButton, GetIdDiv, GetTextInput} from "../helper/view_helper.js";
import {GetQuoteElement} from "./quote.js";

let switcher;

export function BuildGameElement(element){
    let title = document.createElement('div');
    title.innerHTML = "<h1>Title</h1>";

    let container = document.createElement('div');
    container.classList.add('ThreeColumn');
    let content = document.createElement('div');

    element.appendChild(container);
    element.appendChild(title);
    container.appendChild(GetMoneyElement());
    container.appendChild(GetPositionButton());
    container.appendChild(GetSearchElement());
    element.appendChild(content);

    switcher = new ViewSwitcher(content);
}

export function OnGameStart(){
    switcher.set_active(GetPositionsElement())
}

export function OnGameEnd(){
    switcher = undefined;
}

function GetSearchElement(){
    let element = GetIdDiv('SearchGame', []);

    //let title = document.createElement('div');
    //title.innerHTML = "<h2>Search</h2>"
    //element.appendChild(title);

    //let label = document.createElement('label');
    //label.setAttribute('for', 'Search')
    //label.innerHTML = "Search: ";
    let input = GetTextInput('Search Tickers');
    //element.appendChild(label);
    element.appendChild(input);
    element.appendChild(GetSearchButton(input));

    return element;
}

function GetMoneyElement(){
    let element = GetIdDiv('Money');
    element.innerHTML = "$200,000";

    return element;
}

function GetPositionButton(){
    let button = GetButton('Positions', () => {
        switcher.set_active(GetPositionsElement());
    });
    button.classList.add("Button");
    return button;
}

function GetSearchButton(input){
    let button = GetButton('Search', () => {
        switcher.set_active(GetQuoteElement(input.value));
    });
    button.classList.add("Button");
    return button;
}