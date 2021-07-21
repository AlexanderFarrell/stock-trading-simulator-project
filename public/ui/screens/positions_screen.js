import {ElementBuilder} from "../elements/element_builder.js";

export class PositionsScreen {
	constructor() {
		this.View = new ElementBuilder()
			.withId('PositionsScreen')
			.withInnerHtml('Positions')
			.build();
	}
}