import {template} from "./ui/template/template.js";
import {WelcomeScreen} from "./ui/screens/welcome_screen.js";

{
	let welcomeScreen = new WelcomeScreen();
	template.ContentContainer.switchScreen(welcomeScreen, welcomeScreen.View);
}