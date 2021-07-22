import {ElementBuilder} from "../elements/element_builder.js";
import {GetButton} from "../elements/button.js";

export class NavigationBar {
	constructor() {
		this.View = new ElementBuilder()
			.withId('NavigationBar')
			.build();
	}
	
	AddButton(innerHtml, onClick){
		let button = GetButton(innerHtml, onClick);
		this.View.appendChild(button);
	}
}