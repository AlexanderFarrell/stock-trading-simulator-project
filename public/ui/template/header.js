import {ElementBuilder} from "../elements/element_builder";

export class Header {
	constructor() {
		this.View = new ElementBuilder('header')
			.build();
	}
}
