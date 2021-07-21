class Position {
	constructor() {
		this._buys = [];
		this._firstBuyDate = Date.now();
	}
	
	TotalCost(){
		return this._buys
			.map(buy => buy.cost)
			.reduce((item, collect) => collect + item, 0);
	}
	
	TotalQuantity(){
		return this._buys
			.map(buy => buy.quantity)
			.reduce((item, collect) => collect + item, 0);
	}
	
	HasAtLeast(amount){
		return this.TotalQuantity() >= amount;
	}
	
	AddToPosition(quantity, cost){
		this._buys.push({
			quantity: quantity,
			cost: cost
		})
	}
	
	ReducePosition(quantity){
		if (this.HasAtLeast(quantity)){
			while (quantity > 0){
				let buy = this._buys[0];
				
				//Simulates FIFO selling, whereby shares purchased first are sold first.
				if (buy.quantity <= quantity){
					
					let q = buy.quantity;
					this._buys.shift();
					quantity -= q;
					
				} else {
					
					let costPerShare = buy.cost/buy.quantity;
					let costToReduce = costPerShare * quantity;
					buy.cost -= costToReduce;
					
					buy.quantity -= quantity;
					quantity = 0;
					
				}
			}
		} else {
			throw new Error(`Not enough shares to reduce by ${quantity}. Only ${this.TotalQuantity()} simulated ` +
				`shares owned. This simulation does not support selling shares which are not owned.`);
		}
	}
}

export class PositionsList {
	constructor() {
		this._positions = {};
	}
	
	HasPosition(name) {
		return this._positions[name] !== undefined;
	}
	
	HasAtLeast(name, quantity){
		return this.HasPosition(name) ||
			this._positions[name].quantity >= quantity;
	}
	
	AddToPosition(name, quantity, cost){
		if (!this.HasPosition(name)){
			this._positions[name] = new Position();
		}
		
		this._positions[name].AddToPosition(quantity, cost);
	}
	
	ReducePosition(name, quantity){
		this._positions[name].ReducePosition(name, quantity);
		if (this._positions[name].quantity === 0){
			delete this._positions[name];
		}
	}
}