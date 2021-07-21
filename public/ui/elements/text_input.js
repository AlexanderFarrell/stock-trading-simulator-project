export function GetTextInput(placeholder = ""){
	let returnValue = document.createElement('input');
	returnValue.setAttribute("type", "text");
	returnValue.setAttribute("placeholder", placeholder);
	
	return returnValue;
}