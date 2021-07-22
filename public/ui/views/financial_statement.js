import {ElementBuilder} from "../elements/element_builder.js";
import {GetModule} from "../../core/api.js";
import {CamelToSpaces} from "../helpers/view_helper.js";

export class FinancialStatement {
	constructor(ticker, type, name, subName) {
		this.View = new ElementBuilder()
			.withInnerHtml(`<h1>${name}</h1>Loading...`)
			.withClass("Container")
			.build();
		
		GetModule(ticker, type)
			.then(data => {
				let assetProfile = data.quoteSummary.result[0][type][subName][0];
				let s = `<h1>${name}</h1>`;
				for (const key in assetProfile){
					if (assetProfile[key].fmt !== undefined){
						s += PrintBasic(key, assetProfile[key].fmt);
					}
					
				}
				
				this.View.innerHTML = s;
			})
			.catch(err => {
				this.View.classList.add('ErrorConsole');
				this.View.innerHTML = `Unable to get ${name} on ${ticker}`
			})
	}
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

