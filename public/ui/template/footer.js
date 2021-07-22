import {ElementBuilder} from "../elements/element_builder.js";

export class Footer {
	constructor() {
		let content = '<div><a href="https://github.com/AlexanderFarrell/stock-trading-simulator-project">GitHub Repository</a></div>';
		content += "<div>Stock Trading Simulator Project</div>";
		content += '<div><a href="https://ajf-wdd-class-portfolio.herokuapp.com/">Portfolio App</a></div>';
		
		this.View = new ElementBuilder()
			.withInnerHtml(content)
			.withId('footer')
			.build();
	}
}