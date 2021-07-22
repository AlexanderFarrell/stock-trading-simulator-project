import {ElementBuilder} from "../elements/element_builder.js";
import {GetNumberInput} from "../elements/text_input.js";
import {GetButton} from "../elements/button.js";
import {GetPrice} from "../../core/api.js";
import {game} from "../../core/game.js";

export class Transact {
	constructor(type, ticker, container, costVal, on = null) {
		this.View = new ElementBuilder()
			.withClass('TransactView')
			.build();
		
		let input = GetNumberInput();
		let cost =  new ElementBuilder()
			.withInnerHtml('$0.00')
			.build();
		
		input.addEventListener('change', () => {
			cost.innerHTML = RefreshCost(input.value, costVal)
		})
		
		let confirm = GetButton(`Confirm ${type}`, () => {
			if (input.value == null || input.value < 1){
				container.appendChild(new ElementBuilder()
					.withClass('ErrorConsole')
					.withInnerHtml(`Must ${type} at least one share.`))
			}
			
			GetPrice(ticker)
				.then(data => {
					let price = parseFloat(data.quoteSummary.result[0].price.regularMarketPrice.raw);
					
					switch (type){
						case 'buy':
							game.Buy(ticker, parseInt(input.value), -price);
							break;
						case 'sell':
							game.Sell(ticker, parseInt(input.value), price);
							break;
						default:
							throw new Error("Unable to determine transaction.")
					}
					
					input.value = '0';
					if (on !== null){
						on();
					}
					
				})
				.catch(err => {
					console.error(err);
					container.appendChild(new ElementBuilder()
						.withClass('ErrorConsole')
						.withInnerHtml(err))
				})
		})
		
		this.View.appendChild(input);
		this.View.appendChild(cost);
		this.View.appendChild(confirm);
		
	}
}

function RefreshCost(shares, costPerShare){
	return `$${shares * -costPerShare}`;
}