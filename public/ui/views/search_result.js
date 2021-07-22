import {ElementBuilder} from "../elements/element_builder.js";
import {FinancialStatement} from "./financial_statement.js";
import {GetModule} from "../../core/api.js";
import {CamelToSpaces} from "../helpers/view_helper.js";
import {GetButton} from "../elements/button.js";
import {Transact} from "./transact.js";

export class SearchResultView {
	constructor(data) {
		this.View = new ElementBuilder()
			.withInnerHtml('<h5>Loading...</h5>')
			.build();
		
		let core = data.quoteSummary.result[0];
		
		if (core === null || core === undefined){
		
		} else {
			this.View.innerHTML = '';
			this.View.appendChild(GetStockElement(core))
		}
		
		console.log(data);
	}
}

function GetStockElement(data){
	let basic = new ElementBuilder()
		.withInnerHtml(
			`<h1>${data.price.currencySymbol}${data.price.regularMarketPrice.raw}</h1>`
			+ `<h3>${data.price.symbol}</h3>`
			+ `<h5>${data.price.longName}</h5>`
		)
		.withClass("Container")
		.build();
	
	let transact = new Transact('buy', data.price.symbol, basic, parseFloat(data.price.regularMarketPrice.raw));
	let button = GetButton('Buy', () => {
		button.remove();
		basic.appendChild(transact.View);
	})
	basic.appendChild(button);
	
	let details = GetDetailsElement(data.price.symbol);
	
	let balance = new FinancialStatement(data.price.symbol, 'balanceSheetHistory', 'Balance Sheet', 'balanceSheetStatements');
	let income = new FinancialStatement(data.price.symbol, 'incomeStatementHistory', 'Income Sheet', 'incomeStatementHistory');
	let cashflow = new FinancialStatement(data.price.symbol, 'cashflowStatementHistory', 'Cash Flow Statement', 'cashflowStatements');
	
	
	
	let container = new ElementBuilder()
		.withClass('SearchResultColumn')
		.build();
	let container2 = new ElementBuilder()
		.withClass('SearchResultColumn')
		.build();
	
	container.appendChild(basic);
	container.appendChild(details);
	container2.appendChild(balance.View);
	container2.appendChild(income.View);
	container.appendChild(cashflow.View);
	
	let retVal = new ElementBuilder()
		.withClass('SearchResultView')
		.build();
	retVal.appendChild(container);
	retVal.appendChild(container2);
	
	return retVal;
}

function GetDetailsElement(ticker){
	let details = new ElementBuilder()
		.withInnerHtml("Loading details...")
		.withClass('Container')
		.build();
	
	GetModule(ticker, 'assetProfile')
		.then(data => {
			let assetProfile = data.quoteSummary.result[0].assetProfile;
			let s = '';
			for (const key in assetProfile){
				s += PrintBasic(key, assetProfile[key]);
			}
			
			details.innerHTML = s;
		})
		.catch(err => {
			details.innerHTML = `Unable to get details on ${ticker}`
		})
	
	return details;
}

function PrintBasic(key, value){
	if (typeof value == 'string' || typeof value == 'number'){
		return `<div class="KeyValueRow"><div>${CamelToSpaces(key)}</div><div>${value}</div></div>`
	} else {
		return '';
	}
	
	/*if (typeof value !== "object" && Array.isArray(value))
	{
		return `<div class="KeyValueRow"><div>${key}</div><div>${value}</div></div>`;
	} else {
		return '';
	}*/
}

function GetNoneFoundElement(){
	return new ElementBuilder()
		.withClass("ErrorConsole")
		.withInnerHtml("No results found.")
		.build();
}