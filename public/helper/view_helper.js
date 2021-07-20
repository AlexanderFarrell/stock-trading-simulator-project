///Gets a div which can be used as a button!
export function GetButton(innerHtml, onPress){
    let returnValue = document.createElement('div');
    returnValue.innerHTML = innerHtml;
    returnValue.addEventListener('mouseup', onPress);
    returnValue.addEventListener('touchend', onPress);
    returnValue.addEventListener('keyup', ev => {
        if (ev.key === "Enter" || ev.key === ' '){
            onPress();
        }
    })
    return returnValue;
}

export function BuildCollectionViews(dataSource, dataFactory, viewFactory, container) {
    let retVal = [];
    
    dataSource.forEach(datum => {
        retVal.push(viewFactory(dataFactory(datum)));
    })
    
    return retVal;
}

export class ElementBuilder {
    constructor(tag = 'div') {
        this._element = document.createElement(tag);
        return this;
    }
    withClass(i){
        this._element.classList.add(i);
        return this;
    }
    withClasses(classes){
        if (classes.forEach !== undefined){
            classes.forEach(i => {
                this._element.classList.add(i);
                return this;
            })
        }
    }
    withId(id){
        this._element.id = id;
        return this;
    }
    withInnerHtml(innerHtml){
        this._element.innerHTML = innerHtml;
        return this;
    }
    withAttribute(qualifiedName, value){
        this._element.setAttribute(qualifiedName, value);
        return this;
    }
    build(){
        return this._element;
    }
}

export function GetTextInput(placeholder = ""){
    let returnValue = document.createElement('input');
    returnValue.setAttribute("type", "text");
    returnValue.setAttribute("placeholder", placeholder);

    return returnValue;
}

export function GetIdDiv(id, classes = []){
    let returnValue = document.createElement('div');
    returnValue.id = id;

    if (classes.forEach !== undefined){
        classes.forEach(i => {
            returnValue.classList.add(i);
        })
    }

    return returnValue;
}

export function GetMainContainer(name, builder){
    let div =  GetIdDiv(name, ['MainContent']);
    builder(div);
    return div;
}