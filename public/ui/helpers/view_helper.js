export function HideElement(element){
	element.style.visibility = 'hidden';
}

export function ShowElement(element){
	element.style.visibility = 'visible';
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