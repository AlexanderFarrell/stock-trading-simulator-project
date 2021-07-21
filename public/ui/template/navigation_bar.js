import {ElementBuilder} from "../elements/element_builder.js";

export class NavigationBar {
	constructor() {
		this.View = new ElementBuilder()
			.withId('NavigationBar')
			.build();
	}
}