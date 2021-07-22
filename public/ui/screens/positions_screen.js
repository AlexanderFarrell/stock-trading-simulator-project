import {ElementBuilder} from "../elements/element_builder.js";
import {game} from "../../core/game.js";
import {Cash} from "../../core/cash.js";
import {GetPrice} from "../../core/api.js";
import {Transact} from "../views/transact.js";
import {GetButton} from "../elements/button.js";
import {template} from "../template/template.js";

export class PositionsScreen {
	constructor() {
		this.View = new ElementBuilder()
			.withId('PositionsScreen')
			.withInnerHtml('<h1>Positions</h1>')
			.build();
		
		let cash  = game.Cash._amount;
		let positionsValue = 0;
		let total = cash + positionsValue;
		
		let totalView = new ElementBuilder()
			//.withInnerHtml(`<h2>Total Value: ${new Cash(total).Display()}</h2>`)
			.withInnerHtml(`<h2>Total Value: Calculating...</h2>`)
			.build();
		let positionsValueView = new ElementBuilder()
			//.withInnerHtml(`<h3>Value in Positions: ${new Cash(positionsValue).Display()}</h3>`)
			.withInnerHtml(`<h3>Value in Positions: Calculating...</h3>`)
			.build();
		let cashView = new ElementBuilder()
			.withInnerHtml(`<h3>Cash: ${new Cash(cash).Display()}</h3>`)
			.build();
		
		this.View.appendChild(totalView);
		this.View.appendChild(positionsValueView);
		this.View.appendChild(cashView);
		
		let posToCalculate = Object.keys(game.Positions._positions).length;
		
		
		let positionsContainer = new ElementBuilder()
			.build();
		
		
		for (const p in game.Positions._positions){
			let posView = new ElementBuilder()
				.withClass('Container')
				.build();
			
			let quantity = game.Positions._positions[p].TotalQuantity();
			
			posView.appendChild(new ElementBuilder()
				.withInnerHtml(`<div class="Container" style="text-align: center">${p} - Shares: ${quantity} - Cost: ${game.Positions._positions[p].TotalCost()}`)
				.build())
			
			
			let valueView = new ElementBuilder()
				.withInnerHtml("Value: Calculating...")
				.withEntireStyle('text-align: center')
				.build();
			posView.appendChild(valueView);
			
			
			
			GetPrice(p)
				.then(data => {
					let price = parseFloat(data.quoteSummary.result[0].price.regularMarketPrice.raw);
					
					valueView.innerHTML = `Value: ${new Cash(price * quantity).Display()}`;
					
					positionsValue += price * quantity;
					posToCalculate -= 1;
					
					let transact = new Transact('sell', p, posView, price, () => {
						let posScreen = new PositionsScreen();
						template.ContentContainer.switchScreen(posScreen, posScreen.View);
					});
					let button = GetButton('Sell', () => {
						button.remove();
						posView.appendChild(transact.View);
					})
					posView.appendChild(button);
					
					if (posToCalculate === 0){
						totalView.innerHTML = `<h2>Total Value: ${new Cash(total).Display()}</h2>`;
						positionsValueView.innerHTML = `<h3>Value in Positions: ${new Cash(positionsValue).Display()}</h3>`;
					}
				})
				.catch(err => {
					console.error(err);
					valueView.innerHTML = `Value: Error Getting price`;
					positionsValue.innerHTML = `<h3>Value in Positions: Error.</h3>`
					totalView.innerHTML = `<h2>Total Value: Calculating...</h2>`;
					
					
				})
			this.View.appendChild(posView);
		}
		
		let positionsDisplay = new ElementBuilder()
			.withInnerHtml()
		
		if (posToCalculate === 0){
			totalView.innerHTML = `<h2>Total Value: ${new Cash(total).Display()}</h2>`;
			positionsValueView.innerHTML = `<h3>Value in Positions: ${new Cash(positionsValue).Display()}</h3>`;
		}
	}
}