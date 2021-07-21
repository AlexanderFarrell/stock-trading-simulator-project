import {ElementBuilder} from "../elements/element_builder";

export class ContentContainer {
	constructor() {
		this.Screen = null;
		this.ScreenElement = null;
		
		this.View = new ElementBuilder()
			.withId('ContentContainer')
			.build();
	}
	
	switchScreen(screen, view){
		this.View.innerHTML = '';
		
		this.Screen = screen;
		this.ScreenElement = view;
		
		if (this.ScreenElement !== undefined && this.ScreenElement !== null) {
			this.View.appendChild(this.ScreenElement);
		}
	}
}