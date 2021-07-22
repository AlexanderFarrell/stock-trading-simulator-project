import {ElementBuilder} from "../elements/element_builder.js";
import {game} from "../../core/game.js";

export class PositionsScreen {
	constructor() {
		this.View = new ElementBuilder()
			.withId('PositionsScreen')
			.withInnerHtml('<h1>Positions</h1>')
			.build();
		
		let totalView = new ElementBuilder()
			.withInnerHtml(`<h3>Total Value: ${0}</h3>`)
			.build();
		let positionsValueView = new ElementBuilder()
			.withInnerHtml(`<h3>Value in Positions: ${0}</h3>`)
			.build();
		let cashView = new ElementBuilder()
			.withInnerHtml(`<h3>Cash: ${game.Cash.Display()}</h3>`)
			.build();
		
		this.View.appendChild(totalView);
		this.View.appendChild(positionsValueView);
		this.View.appendChild(cashView);
	}
}