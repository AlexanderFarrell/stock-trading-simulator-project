import {DisplayMainElement} from "../template.js";
import {GetMainContainer} from "./view_helper.js";

export class ViewSwitcher {
    constructor(container) {
        this.Container = container;
        this.Active = null;
    }
    set_active(view) {
        this.Container.innerHTML = "";
        this.Active = view;

        if (this.Active !== null){
            this.Container.appendChild(this.Active)
        }
    }
}