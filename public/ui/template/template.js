import {Header} from "./header";
import {Footer} from "./footer";
import {ContentContainer} from "./content_container";
import {ElementBuilder} from "../elements/element_builder";
import {NavigationBar} from "./navigation_bar";

class Template {
	constructor() {
		this.Header = new Header();
		this.Footer = new Footer();
		this.NavigationBar = new NavigationBar();
		this.ContentContainer = new ContentContainer();
		
		this.View = new ElementBuilder()
			.withId('Template')
			.build();
		
		this.Header.View.appendChild(this.NavigationBar.View);
		
		this.View.appendChild(this.Header.View);
		this.View.appendChild(this.Footer.View);
		this.View.appendChild(this.ContentContainer.View);
	}
}

export let template = new Template();