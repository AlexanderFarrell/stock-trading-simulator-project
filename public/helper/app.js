import {BuildHomeElement, OnHomeEnd, OnHomeStart} from "../home/home.js";
import {BuildGameElement, OnGameEnd, OnGameStart} from "../game/game.js";
import {DisplayMainElement} from "../template.js";
import {GetMainContainer} from "./view_helper.js";

export let app;

export class App {
    constructor() {
        this.States = GetAppStates();
        this.Active = null;
    }
    SwitchState(state) {
        if (this.Active !== null){
            this.Active.on_end();
        }

        this.Active = state;

        if (this.Active !== null){
            DisplayMainElement(GetMainContainer(this.Active.name, this.Active.view_builder));
            this.Active.on_start();
        }
    }
}

function GetAppStates() {
    return {
        home: {
            name: "Home",
            view_builder: BuildHomeElement,
            on_start: OnHomeStart,
            on_end: OnHomeEnd,
        },
        game: {
            name: "Game",
            view_builder: BuildGameElement,
            on_start: OnGameStart,
            on_end: OnGameEnd,
        }
    }
}