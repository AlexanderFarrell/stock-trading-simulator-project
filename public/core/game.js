import {Cash} from "./cash";
const {PositionsList} = require("./position");

class Game {
	constructor() {
		this.Name = "New Game";
		this.CashAmount = new Cash(0.0);
		this.Positions = new PositionsList();
	}
	
	Buy(symbol, quantity, costPerShare) {
		try {
			let costTransaction = quantity * costPerShare;
			this.Positions.AddToPosition(symbol, quantity, costTransaction);
			this.CashAmount.Credit(costTransaction);
		} catch (e) {
			throw e;
		}
	}
	
	Sell(symbol, quantity, pricePerShare) {
		try {
			let revenueTransaction = pricePerShare * quantity;
			this.Positions.ReducePosition(symbol, quantity);
			this.CashAmount.Debit(revenueTransaction);
		} catch (e) {
			throw e;
		}
	}
}