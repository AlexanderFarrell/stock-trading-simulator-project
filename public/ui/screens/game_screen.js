import {ElementBuilder} from "../elements/element_builder.js";

export class GameScreen {
	constructor() {
		this.View = new ElementBuilder()
			.withId('GameScreen')
			.withInnerHtml('<h1>Game Settings</h1>')
			.build();
	}
}