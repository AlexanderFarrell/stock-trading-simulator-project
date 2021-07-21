import {ElementBuilder} from "../elements/element_builder";

export class Footer {
	constructor() {
		this.View = new ElementBuilder('header')
			.build();
	}
}