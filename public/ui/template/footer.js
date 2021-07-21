import {ElementBuilder} from "../elements/element_builder.js";

export class Footer {
	constructor() {
		this.View = new ElementBuilder('footer')
			.build();
	}
}