import {App} from "./helper/app.js";
import {SetUpTemplate} from './template.js';

let app = new App();
SetUpTemplate(app);

app.SwitchState(app.States.home);

