class SelectionBox extends DisplayBox {
    options: string[];
    currentIndex: number;
    optionsIndex: number;

    constructor(name: string, width: number, height: number, flavour: string, title?: string, options?: string[], defaultIndex?: number) {
        super(name, width, height, flavour, title);

        this.optionsIndex = 0; this.currentIndex = 0;
        if (defaultIndex) {
            this.currentIndex = defaultIndex;
        }
        this.__initMarkup();

        if (typeof options === "undefined") {
            this.options = new Array();
        } else {
            this.options = options;
            this.updateUlMarkup();
        }
    }

    __initMarkup() {
        var tmpImgElem = document.createElement('img');
        var tmpUlElem = document.createElement('ul');

        tmpImgElem.setAttribute('class', 'cursor');
        tmpImgElem.setAttribute('src', 'img/cursor.gif');
        tmpUlElem.setAttribute('class', 'selectionList');

        this.rootElement.getElementsByClassName('content')[0].appendChild(tmpImgElem);
        this.rootElement.getElementsByClassName('content')[0].appendChild(tmpUlElem);

        this.updateCursorPosition();
    }

    testForUl() {
        for (var x: number; x < this.rootElement.childNodes.length; x++) {
            if (this.rootElement.childNodes[x].nodeName == "ul") {
                return true;
            }
        }

        return false;
    }

    addOption(option) {
        this.options[this.optionsIndex] = option;
        this.updateUlMarkup();
        this.optionsIndex++;
    }

    removeOption(index) {
        this.options.splice(index, 1);
        this.updateUlMarkup();
    }

    getOption(index) {
        return this.options[index];
    }

    setOption(index, value) {
        this.options[index] = value;
        this.updateUlMarkup();
    }

    getCurrentIndex() {
        return this.currentIndex;
    }

    setCurrentIndex(index) {
        this.currentIndex = index;
        this.updateCursorPosition();
    }

    incCurrentIndex() {
        if (this.currentIndex == this.options.length - 1) {
            this.currentIndex = 0;
            this.updateCursorPosition();
            return;
        }
        this.currentIndex++;
        this.updateCursorPosition();
    }

    decCurrentIndex() {
        if (this.currentIndex == 0) {
            this.currentIndex = this.options.length - 1;
            this.updateCursorPosition();
            return;
        }
        this.currentIndex--;
        this.updateCursorPosition();
    }

    confirmSelection(callback?) {
        //set class of current selection
        var tmpLiElem = this.rootElement.getElementsByClassName(this.currentIndex.toString())[0];
        tmpLiElem.attributes[0].value += " confirm";
        //remove cursor img
        var tmpImgElem = this.rootElement.getElementsByClassName('cursor')[0];
        var tmpContentElem = this.rootElement.getElementsByClassName('content')[0];
        tmpContentElem.removeChild(tmpImgElem);
        //call callback function if supplied
        if (typeof callback != "undefined") {
            callback();
        }
    }

    updateCursorPosition() {
        var tmpImgElem = this.rootElement.getElementsByClassName('cursor')[0];
        var intOffset = 0;

        if (this.testForH1()) {
            intOffset += 3.6;
        }

        if (this.currentIndex != 0) {
            intOffset += (this.currentIndex * 1.9);
        }

        var css = document.createElement('style');
        css.setAttribute('type', 'text/css');
        css.appendChild(document.createTextNode("#" + this.name + " .content .cursor {top:" + intOffset + "em;}"));
        document.getElementsByTagName("head")[0].appendChild(css);
    }

    updateUlMarkup() {
        var tmpUlElem = this.rootElement.getElementsByClassName('selectionList')[0];

        if (tmpUlElem.hasChildNodes()) {
            while (tmpUlElem.firstChild) {
                tmpUlElem.removeChild(tmpUlElem.firstChild);
            }
        }

        for (var x = 0; x < this.options.length; x++) {
            var tmpLiElem = document.createElement('li');
            tmpLiElem.setAttribute('class', x.toString());
            tmpLiElem.innerHTML = this.options[x];
            tmpUlElem.appendChild(tmpLiElem);
        }
    }
}
