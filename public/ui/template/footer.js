import {ElementBuilder} from "../elements/element_builder.js";

export class Footer {
	constructor() {
		this.View = new ElementBuilder()
			.withInnerHtml('Stock Trading Simulator Project - <a href="https://ajf-wdd-class-portfolio.herokuapp.com/">Portfolio App</a>')
			.withId('footer')
			.build();
	}
}