import {template} from "./ui/template/template.js";
import {WelcomeScreen} from "./ui/screens/welcome_screen.js";
import {PositionsScreen} from "./ui/screens/positions_screen.js";
import {HideElement} from "./ui/helpers/view_helper.js";
import {SearchScreen} from "./ui/screens/search_screen.js";
import {GameScreen} from "./ui/screens/game_screen.js";
import {GameExists, LoadGame} from "./core/game.js";

if (GameExists("Some")) {
	LoadGame("Some");
	let positionsScreen = new PositionsScreen();
	template.ContentContainer.switchScreen(positionsScreen, positionsScreen.View);
} else {
	let welcomeScreen = new WelcomeScreen();
	template.ContentContainer.switchScreen(welcomeScreen, welcomeScreen.View);
	HideElement(template.NavigationBar.View);
}

/*{
	let welcomeScreen = new WelcomeScreen();
	template.ContentContainer.switchScreen(welcomeScreen, welcomeScreen.View);
	HideElement(template.NavigationBar.View);
}*/

template.NavigationBar.AddButton('Positions', () => {
	let positionsScreen = new PositionsScreen();
	template.ContentContainer.switchScreen(positionsScreen, positionsScreen.View);
})

template.NavigationBar.AddButton('Search', () => {
	let searchScreen = new SearchScreen();
	template.ContentContainer.switchScreen(searchScreen, searchScreen.View);
})

/*
template.NavigationBar.AddButton('Game', () => {
	let gameScreen = new GameScreen();
	template.ContentContainer.switchScreen(gameScreen, gameScreen.View);
})*/
