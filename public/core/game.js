import {Cash} from "./cash.js";
import {Position, PositionsList} from "./position.js";

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
			SaveGame();
		} catch (e) {
			throw e;
		}
	}
	
	Sell(symbol, quantity, pricePerShare) {
		try {
			let revenueTransaction = pricePerShare * quantity;
			this.Positions.ReducePosition(symbol, quantity);
			this.Cash.Debit(revenueTransaction);
			SaveGame();
		} catch (e) {
			throw e;
		}
	}
}

export let game = null;

export function NewGame(name, startingCash){
	game = new Game();
	game.Name = name;
	game.Cash = new Cash(parseFloat(startingCash.cash))
}

export function LoadGame(name){
	if (GameExists(name)){
		let data = JSON.parse(window.localStorage.getItem(name));
		//game = data;
		game = Object.assign(new Game(), data);
		game.Cash = Object.assign(new Cash(), game.Cash);
		game.Positions = Object.assign(new PositionsList(), game.Positions);
		
		for (const i in game.Positions._positions){
			game.Positions._positions[i] = Object.assign(new Position(), game.Positions._positions[i]);
		}
		
		/*if (Game.isPrototypeOf(data)){
			game = data;
		} else {
			throw new Error(`The saved game named ${name} appears to be corrupted. We're sorry, `+
			`this file cannot be loaded.`);
		}*/
	} else {
		throw new Error("No saved game found named " + name);
	}
}

export function SaveGame(){
	if (game !== null){
		window.localStorage.setItem("Some", JSON.stringify(game));
	}
	 else {
		throw new Error("Cannot save game, no game currently being played.");
	}
}

export function GameExists(name){
	return window.localStorage.getItem(name) !== undefined && window.localStorage.getItem(name) !== null;
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