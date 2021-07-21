import {ElementBuilder} from "../elements/element_builder";

export class WelcomeScreen {
	constructor() {
		this.View = new ElementBuilder()
			.withId('WelcomeScreen')
			.build();
	}
}