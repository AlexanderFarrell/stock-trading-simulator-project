import {ElementBuilder} from "../elements/element_builder.js";
import {GetTextInput} from "../elements/text_input.js";
import {GetButton} from "../elements/button.js";
import {GetPrice} from "../../core/api.js";
import {SearchResultView} from "../views/search_result.js";

export class SearchScreen {
	constructor() {
		this.View = new ElementBuilder()
			.withId('SearchScreen')
			.withInnerHtml('<h1>Search</h1>')
			.build();
		
		
		let resultContainer = new ElementBuilder()
			.build();
		
		let searchBar = new ElementBuilder()
			.withEntireStyle(
				'display: grid; ' +
				'grid-template-columns: 3fr 1fr;')
			.build();
		let searchText = GetTextInput('Search by Stock Ticker...');
		searchText.setAttribute('tabindex', '1');
		searchText.addEventListener('input', () => {
			searchText.value.toUpperCase();
		})
		let searchButton = GetButton('Search', async () => {
			let data = await GetPrice(searchText.value);
			let resultView = new SearchResultView(data);
			resultContainer.innerHTML = '';
			resultContainer.appendChild(resultView.View);
		});
		searchButton.setAttribute('tabindex', '2');
		searchBar.appendChild(searchText);
		searchBar.appendChild(searchButton);
		
		
		this.View.appendChild(searchBar);
		this.View.appendChild(resultContainer);
	}
}