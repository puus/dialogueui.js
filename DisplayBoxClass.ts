class DisplayBox extends Box {
    title: string;

    constructor(name: string, width: number, height: number, flavour: string, title?: string) {
        this.title = title;
        super(name, width, height, flavour);
        this._initMarkup();
    }

    _initMarkup() {
        if (typeof this.title != "undefined") {
            var tmpH1Elem = document.createElement('h1');
            tmpH1Elem.setAttribute('class', 'displayBoxHeading');
            tmpH1Elem.appendChild(document.createTextNode(this.title));

            this.rootElement.getElementsByClassName('content')[0].appendChild(tmpH1Elem);
        } else {
            //debugging
            var tmpH1Elem = document.createElement('h1');
            tmpH1Elem.setAttribute('class', 'displayBoxHeading');
            tmpH1Elem.appendChild(document.createTextNode('title was undefined'));

            this.rootElement.getElementsByClassName('content')[0].appendChild(tmpH1Elem);
        }
    }

    testForH1() {
        if (this.rootElement.getElementsByTagName('h1')) { return true; }
        else {
            return false;
        }
    }

    getTitle() {
        return this.title;
    }

    setTitle(title: string) {
        this.title = title;

        var tmpContentElem = this.rootElement.getElementsByClassName('content')[0];

        if (this.testForH1()) {
            this.rootElement.getElementsByClassName('displayBoxHeading')[0].textContent = title;
        } else {
            var tmpH1Elem = document.createElement('h1');
            tmpH1Elem.setAttribute('class', 'displayBoxHeading');
            if (tmpContentElem.hasChildNodes()) {
                tmpContentElem.firstChild.insertBefore(tmpH1Elem);
            } else {
                tmpContentElem.appendChild(tmpH1Elem);
            }
        }
    }
}