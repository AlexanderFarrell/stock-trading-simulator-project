export function HideElement(element){
	//element.style.visibility = 'hidden';
	//element.hidden = true;
	element.style.display = "none";
}

export function ShowElement(element){
	//element.style.visibility = 'visible';
	//element.hidden = false;
	element.style.display = "initial";
}

export function ToggleElement(element) {
	element.hidden = !element.hidden;
}

export function CamelToSpaces(s){
	let retVal = s.charAt(0).toUpperCase();
	
	for (let i = 1; i < s.length; i++){
		let c = s.charAt(i);
		
		if (c === c.toUpperCase()){
			retVal += ' ' + c.toUpperCase();
		} else {
			retVal += c;
		}
	}
	
	return retVal;
}