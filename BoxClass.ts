class Box {
    name: string;
    width: number;
    height: number;
    borderWidth: number;
    borderHeight: number;
    contentWidth: number;
    contentHeight: number;
    flavour: string;
    rootElement: HTMLElement;
    css: HTMLElement;

    constructor(name: string, width: number, height: number, flavour: string) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.flavour = flavour;

        this.initMarkup();
        this.initCss();
    }

    initMarkup() {
        this.rootElement = document.createElement("section");
        this.rootElement.setAttribute("id", this.name);
        this.rootElement.setAttribute("class", "box");

        var tmpElem = document.createElement("div");
        tmpElem.setAttribute("class", "border1");
        this.rootElement.appendChild(tmpElem);

        tmpElem = document.createElement("div");
        tmpElem.setAttribute("class", "content");
        this.rootElement.appendChild(tmpElem);
    }

    initCss() {
        this.borderWidth = this.width - 0.45;
        this.borderHeight = this.height - 0.4
        this.contentWidth = this.width - 0.7;
        this.contentHeight = this.height - .65;

        var cssSectionRule: string = "#" + this.name + " {" +
                                     "width: " + this.width + "em;" +
                                     "height: " + this.height + "em;} ";
        var cssBorderRule: string = "#" + this.name + " .border1 {" +
                                    "width: " + this.borderWidth + "em;" +
                                    "height: " + this.borderHeight + "em;} ";
        var cssContentRule: string = "#" + this.name + " .content {" +
                                     "width: " + this.contentWidth + "em;" +
                                     "height: " + this.contentHeight + "em;} ";

        this.css = document.createElement('style');
        this.css.setAttribute('type', 'text/css');
        this.css.appendChild(document.createTextNode(cssSectionRule + cssBorderRule + cssContentRule));
        document.getElementsByTagName("head")[0].appendChild(this.css);
    }

    getName() {
        return this.name;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    getHtml() {
        return this.rootElement;
    }

    getCss() {
        return this.css;
    }

    getFlavour() {
        return this.flavour;
    }

    setWidth(width) {
        this.width = width;
        this.initCss();
    }

    setHeight(height) {
        this.height = height;
        this.initCss();
    }

    setDimensions(width, height) {
        this.width = width;
        this.height = height;
        this.initCss();
    }

    setFlavour(flavour) {
        this.flavour = flavour;
    }
}