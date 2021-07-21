import {Header} from "./header.js";
import {Footer} from "./footer.js";
import {ContentContainer} from "./content_container.js";
import {ElementBuilder} from "../elements/element_builder.js";
import {NavigationBar} from "./navigation_bar.js";

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
		this.View.appendChild(this.ContentContainer.View);
		this.View.appendChild(this.Footer.View);
		
		document.body.appendChild(this.View);
	}
}

export let template = new Template();