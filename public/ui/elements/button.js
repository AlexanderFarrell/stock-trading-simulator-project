///Gets a div which can be used as a button!
import {ElementBuilder} from "./element_builder.js";

export function GetButton(innerHtml, onPress){
	return new ElementBuilder()
		.withInnerHtml(innerHtml)
		.withClass('Button')
		.withEvent('mouseup', onPress)
		.withEvent('touchend', onPress)
		.withEvent('keyup', ev => {
			if (ev.key === "Enter" || ev.key === ' ') {
				onPress();
			}
		})
		.build();
	
	/*let returnValue = document.createElement('div');
	returnValue.innerHTML = innerHtml;
	returnValue.addEventListener('mouseup', onPress);
	returnValue.addEventListener('touchend', onPress);
	returnValue.addEventListener('keyup', ev => {
		if (ev.key === "Enter" || ev.key === ' '){
			onPress();
		}
	})
	return returnValue;*/
}