import {SetUpTemplate} from './template.js';
import {App} from "./helper/app.js";

let app = new App();
SetUpTemplate(app);

app.SwitchState(app.States.home);

