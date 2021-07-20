import {BuildHomeElement} from "./home/home.js";
import {GetButton, GetMainContainer} from "./helper/view_helper.js";
import {BuildGameElement} from "./game/game.js";

let navMenu = document.getElementById("NavButtons");
let mainContent = document.getElementById("MainContent");

function GetNavButton(text, onPress = null){
    let returnValue = GetButton('', onPress);
    returnValue.innerText = text;
    returnValue.classList.add("NavButton");
    return returnValue;
}

export function DisplayMainElement(element){
    mainContent.innerHTML = "";
    mainContent.appendChild(element);
}

export function DisplayMainHtml(html){
    mainContent.innerHTML = html;
}

export function SetUpTemplate(app){
    navMenu.innerHTML = "";
    //navMenu.appendChild(GetNavButton('Categories'))
    //navMenu.appendChild(GetNavButton('Articles'))
    //navMenu.appendChild(GetNavButton('Journal'))
    //navMenu.appendChild(GetNavButton('About'))

    // navMenu.appendChild(GetNavButton('Home', () => {
    //     DisplayMainElement(GetMainContainer('Home', BuildHomeElement));
    // }))
    // navMenu.appendChild(GetNavButton('Game', () => {
    //     DisplayMainElement(GetMainContainer('Game', BuildGameElement));
    // }))

    for (const [key, value] of Object.entries(app.States)) {
        console.log(value);
        navMenu.appendChild(GetNavButton(value.name, () => {
                app.SwitchState(value);
            }));
    }
}
