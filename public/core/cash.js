export class Cash {
	constructor(amount = 0) {
		this._amount = amount;
	}
	
	///Adds to the cash amount.
	Debit(amount) {
		if (amount < 0) {
			throw new Error("Attempted to debit a negative amount");
		}
		
		this._amount += amount;
	}
	
	///Removes from the cash amount.
	Credit(amount) {
		if (amount > 0) {
			throw new Error("Attempted to credit a positive amount");
		}
		
		this._amount -= amount;
	}
	
	Display(){
		return `$${this._amount.toLocaleString()}`
	}
	
	HasAtLeast(amount) {
		return this._amount >= amount;
	}
}