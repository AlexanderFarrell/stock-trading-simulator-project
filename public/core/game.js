import {Cash} from "./cash.js";
import {PositionsList} from "./position.js";

class Game {
	constructor() {
		this.Name = "New Game";
		this.Cash = new Cash(0.0);
		this.Positions = new PositionsList();
	}
	
	Buy(symbol, quantity, costPerShare) {
		try {
			let costTransaction = quantity * costPerShare;
			this.Positions.AddToPosition(symbol, quantity, costTransaction);
			this.Cash.Credit(costTransaction);
		} catch (e) {
			throw e;
		}
	}
	
	Sell(symbol, quantity, pricePerShare) {
		try {
			let revenueTransaction = pricePerShare * quantity;
			this.Positions.ReducePosition(symbol, quantity);
			this.Cash.Debit(revenueTransaction);
		} catch (e) {
			throw e;
		}
	}
}

export let game = null;

export function NewGame(name, startingCash){
	game = new Game();
}

export function LoadGame(name){
	if (GameExists(name)){
		let data = JSON.parse(window.localStorage.getItem(name));
		if (Game.isPrototypeOf(data)){
			game = data;
		} else {
			throw new Error(`The saved game named ${name} appears to be corrupted. We're sorry, `+
			`this file cannot be loaded.`);
		}
	} else {
		throw new Error("No saved game found named " + name);
	}
}

export function SaveGame(){
	if (game !== null){
		if (Game.isPrototypeOf(game)){
			window.localStorage.setItem(game.name, JSON.stringify(game));
		}
	}
	 else {
		throw new Error("Cannot save game, no game currently being played.");
	}
}

export function GameExists(name){
	return window.localStorage.getItem(name) !== undefined;
}

export let StartingCashOptions = {
	zero: {cash: 1},
	one: {cash: 10},
	two: {cash: 100},
	three: {cash: 1000},
	four: {cash: 10000},
	five: {cash: 100000},
	six: {cash: 1000000}
}