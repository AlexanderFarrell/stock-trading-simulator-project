import {ElementBuilder} from "../elements/element_builder.js";
import {GetTextInput} from "../elements/text_input.js";
import {RadioBuilder} from "../elements/radio_input.js";
import {NewGame, StartingCashOptions} from "../../core/game.js";
import {Cash} from "../../core/cash.js";
import {GetButton} from "../elements/button.js";
import {template} from "../template/template.js";
import {PositionsScreen} from "./positions_screen.js";
import {ShowElement} from "../helpers/view_helper.js";

export class WelcomeScreen {
	constructor() {
		this.View = new ElementBuilder()
			.withId('WelcomeScreen')
			.build();
		
		let title = new ElementBuilder('h1')
			.withInnerHtml("Welcome")
			.build()
		
		let subTitle = new ElementBuilder('h2')
			.withInnerHtml("Start a New Game")
			.build()
		
		let nameContainer = new ElementBuilder()
			.withClass('KeyValueRow')
			.build();
		let label = new ElementBuilder('h3')
			.withInnerHtml('Name')
			.withEntireStyle('place-self: center')
			.build();
		
		
		this.NameInput = GetTextInput("Name");
		this.NameInput.value = "New Game";
		nameContainer.appendChild(label);
		nameContainer.appendChild(this.NameInput);
		
		
		let cashContainer = new ElementBuilder()
			.withClass('KeyValueRow')
			.build();
		let cashStartHeader = new ElementBuilder('h3')
			.withInnerHtml("Starting Cash")
			.withEntireStyle('place-self: center')
			.build();
		let cashOptionBuilder = new RadioBuilder('difficulty')
		for (const key in StartingCashOptions) {
			let cashAmount = new Cash(StartingCashOptions[key].cash);
			cashOptionBuilder.withOption(key, cashAmount.Display());
		}
		let cashOptions = cashOptionBuilder.build();
		cashOptions.style.justifySelf = "center";
		cashContainer.appendChild(cashStartHeader);
		cashContainer.appendChild(cashOptions);
		
		
		let notice = new ElementBuilder()
			.withClass("notice")
			.withInnerHtml(`Note: This app stores saved games locally via a very small amount of Local Storage. Local Storage is required to play.`)
			.build();
		let noticeA = new ElementBuilder()
			.withClass("notice")
			.withInnerHtml(`This game is a simulation, and information reflected is not guaranteed to be accurate, nor intended to be taken as advise. Shares are not actually bought or sold. By pressing Start Game, you agree that I am not responsible for financial decisions made or any losses or damages as a result of playing this game.`)
			.build();
		
		
		let console = new ElementBuilder()
			.withInnerHtml(``)
			.withEntireStyle('text-align: center')
			.withClass('ErrorConsole')
			.build();
		
		
		let startGame = GetButton('Start Game', () => {
			//Get our required fields.
			if (document.querySelector(`input[name = 'difficulty']:checked`) === null) {
				console.innerHTML = 'Please choose an amount of fake cash to start with.';
				return;
			}
			
			let n = this.NameInput.value;
			let c = StartingCashOptions[document.querySelector(`input[name = 'difficulty']:checked`).value];
			
			if (n !== undefined && n.length > 0 && c !== undefined){
				//Start the game!
				NewGame(this.NameInput.value, StartingCashOptions[document.querySelector(`input[name = 'difficulty']:checked`).value]);
				let pos = new PositionsScreen();
				template.ContentContainer.switchScreen(pos, pos.View);
				ShowElement(template.NavigationBar.View);
			} else if (n === undefined || n.length === 0) {
				console.innerHTML = 'Please enter a name for the game.';
			} else if (c === undefined){
				console.innerHTML = 'Please choose an amount of fake cash to start with.';
			}
		});
		
		
		
		this.View.appendChild(title);
		this.View.appendChild(subTitle);
		
		this.View.appendChild(nameContainer)
		
		this.View.appendChild(cashContainer)
		
		this.View.appendChild(notice)
		this.View.appendChild(noticeA)
		this.View.appendChild(startGame);
		this.View.appendChild(console);
	}
}