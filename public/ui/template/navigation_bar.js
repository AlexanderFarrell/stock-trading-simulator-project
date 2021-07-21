import {ElementBuilder} from "../elements/element_builder";

export class NavigationBar {
	constructor() {
		this.View = new ElementBuilder()
			.withId('NavigationBar')
			.build();
	}
}