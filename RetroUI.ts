class Box {
    private id: string;
    private width: number;
    private height: number;
    private borderWidth: number;
    private borderHeight: number;
    private contentWidth: number;
    private contentHeight: number;
    private flavour: string;
    private rootElement: HTMLElement;
    public css: HTMLElement;
    private hidden: bool;

    constructor(id: string, width: number, height: number, flavour: string) {
        this.id = id;
        this.width = width;
        this.height = height;
        this.flavour = flavour;
        this.hidden = false;

        this.initMarkup();
        this.initCss();
    }

    private initMarkup():void {
        this.rootElement = document.createElement("section");
        this.rootElement.setAttribute("id", this.id);
        this.rootElement.setAttribute("class", "box " + this.flavour);

        var tmpElem = document.createElement("div");
        tmpElem.setAttribute("class", "border1");
        this.rootElement.appendChild(tmpElem);

        tmpElem = document.createElement("div");
        tmpElem.setAttribute("class", "content");
        this.rootElement.appendChild(tmpElem);
    }

    private initCss():void {
        this.borderWidth = this.width - 0.45;
        this.borderHeight = this.height - 0.4
        this.contentWidth = this.width - 0.7;
        this.contentHeight = this.height - .65;

        var cssSectionRule: string = "#" + this.id + " {" +
                                    "display: block;" + 
                                     "width: " + this.width + "em;" +
                                     "height: " + this.height + "em;} ";
        var cssBorderRule: string = "#" + this.id + " .border1 {" +
                                    "width: " + this.borderWidth + "em;" +
                                    "height: " + this.borderHeight + "em;} ";
        var cssContentRule: string = "#" + this.id + " .content {" +
                                     "width: " + this.contentWidth + "em;" +
                                     "height: " + this.contentHeight + "em;} ";
        var cssHiddenRule: string = "#" + this.id + " {" +
                                    "display: none;" +
                                    "}";
        var strCombinedRule: string = "";

        if (this.hidden == true) {
            strCombinedRule += cssBorderRule + cssContentRule + cssHiddenRule;
        } else {
            strCombinedRule += cssSectionRule + cssBorderRule + cssContentRule;
        }

        if (!this.css) {
            if (!document.getElementById("duiRuntimeStyle")) {
                this.css = document.createElement('style');
                this.css.setAttribute('type', 'text/css');
                this.css.setAttribute('id', 'duiRuntimeStyle');
                document.getElementsByTagName("head")[0].appendChild(this.css);
            } else {
                this.css = document.getElementById("duiRuntimeStyle");
            }
        }

        this.css.appendChild(document.createTextNode(strCombinedRule));
    }

    public GetId():string {
        return this.id;
    }

    public GetWidth():number {
        return this.width;
    }

    public GetHeight():number {
        return this.height;
    }

    public GetRootElement():HTMLElement {
        return this.rootElement;
    }

    public GetCss():HTMLElement {
        return this.css;
    }

    public GetFlavour():string {
        return this.flavour;
    }

    public SetWidth(width):void {
        this.width = width;
        this.initCss();
    }

    public SetHeight(height):void {
        this.height = height;
        this.initCss();
    }

    public SetDimensions(width, height):void {
        this.width = width;
        this.height = height;
        this.initCss();
    }

    public SetFlavour(flavour): void {
        this.flavour = flavour;

        var tmpClassString = this.rootElement.getAttribute('class');
        var newClassString = "";
        var arrClasses = tmpClassString.split(' ');
        for (var x = 0; x < arrClasses.length; x++) {
            if (arrClasses[x].trim() != "plain" &&
                arrClasses[x].trim() != "mint" &&
                arrClasses[x].trim() != "strawberry" &&
                arrClasses[x].trim() != "banana" &&
                arrClasses[x].trim() != "penut") {

                newClassString += arrClasses[x] + " ";
            }
        }

        newClassString += this.flavour;
        this.rootElement.setAttribute('class', newClassString);
    }

    public Hide():void {
        this.hidden = true;
        this.initCss();
    }

    public Show():void {
        this.hidden = false;
        this.initCss();
    }
}

class DisplayBox extends Box {
    private text: string;

    constructor(id: string, width: number, height: number, flavour: string, text?: string) {
        this.text = text;
        super(id, width, height, flavour);
        this._initMarkup();
    }

    private _initMarkup():void {
        if (typeof this.text != "undefined" && this.text != "") {
            var tmpH1Elem = document.createElement('h1');
            tmpH1Elem.setAttribute('class', 'displayBoxHeading');
            tmpH1Elem.appendChild(document.createTextNode(this.text));

            this.GetRootElement().getElementsByClassName('content')[0].appendChild(tmpH1Elem);
        }
    }

    public HasH1():bool {
        if (typeof this.GetRootElement().getElementsByTagName('h1')[0] != "undefined") { return true; }
        else {
            return false;
        }
    }

    public GetText():string {
        return this.text;
    }

    public SetText(text: string):void {
        this.text = text;

        var tmpContentElem = this.GetRootElement().getElementsByClassName('content')[0];
        
        if (this.HasH1()) {
            this.GetRootElement().getElementsByClassName('displayBoxHeading')[0].textContent = text;
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

class SelectionBox extends DisplayBox {
    private options: string[];
    private currentIndex: number;
    private optionsIndex: number;

    constructor(id: string, width: number, height: number, flavour: string, text?: string, options?: string[], defaultIndex?: number) {
        super(id, width, height, flavour, text);
        
        this.optionsIndex = 0; this.currentIndex = 0;
        if (defaultIndex) {
            this.currentIndex = defaultIndex;
        }
        this.__initMarkup();

        if (typeof options === "undefined") {
            this.options = new Array();
        } else {
            this.options = options;
            this.optionsIndex = options.length;
            this.updateUlMarkup();
        }
    }

    private __initMarkup():void {
        var tmpImgElem = document.createElement('img');
        var tmpUlElem = document.createElement('ul');

        tmpImgElem.setAttribute('class', 'cursor');
        tmpImgElem.setAttribute('src', 'img/cursor.gif');
        tmpUlElem.setAttribute('class', 'selectionList');

        this.GetRootElement().getElementsByClassName('content')[0].appendChild(tmpImgElem);
        this.GetRootElement().getElementsByClassName('content')[0].appendChild(tmpUlElem);

        this.updateCursorPosition();
    }

    private incCurrentIndex(): void {
        if (this.currentIndex == this.options.length - 1) {
            this.currentIndex = 0;
            this.updateCursorPosition();
            return;
        }
        this.currentIndex++;
        this.updateCursorPosition();
    }

    private decCurrentIndex(): void {
        if (this.currentIndex == 0) {
            this.currentIndex = this.options.length - 1;
            this.updateCursorPosition();
            return;
        }
        this.currentIndex--;
        this.updateCursorPosition();
    }

    private updateCursorPosition(): void {
        var tmpImgElem = this.GetRootElement().getElementsByClassName('cursor')[0];
        var intOffset = 1.2;

        if (this.HasH1()) {
            intOffset += 2.3;
        }

        if (this.currentIndex != 0) {
            intOffset += (this.currentIndex * 1.9);
        }

        this.GetCss().appendChild(document.createTextNode("#" + this.GetId() + " .content .cursor {top:" + intOffset + "em;}"));
    }

    private updateUlMarkup(): void {
        var tmpUlElem = this.GetRootElement().getElementsByClassName('selectionList')[0];

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

    public HasUl(): bool {
        for (var x: number; x < this.GetRootElement().childNodes.length; x++) {
            if (this.GetRootElement().childNodes[x].nodeName == "ul") {
                return true;
            }
        }

        return false;
    }

    public GetOption(index): string {
        return this.options[index];
    }

    public GetCurrentOption(): string {
        return this.options[this.currentIndex];
    }

    public GetCurrentIndex(): number {
        return this.currentIndex;
    }

    public setOption(index, value): void {
        this.options[index] = value;
        this.updateUlMarkup();
    }

    public SetCurrentIndex(index): void {
        this.currentIndex = index;
        this.updateCursorPosition();
    }

    public AddOption(option): void {
        this.options[this.optionsIndex] = option;
        this.updateUlMarkup();
        this.optionsIndex++;
    }

    public RemoveOption(index):void {
        this.options.splice(index, 1);
        this.updateUlMarkup();
    }

    public Up():void {
        this.decCurrentIndex();
    }

    public Down():void {
        this.incCurrentIndex();
    }

    public ConfirmSelection(callback?):void {
        //set class of current selection
        var tmpLiElem = this.GetRootElement().getElementsByClassName(this.currentIndex.toString())[0];
        tmpLiElem.attributes[0].value += " confirm";
        //remove cursor img
        var tmpImgElem = this.GetRootElement().getElementsByClassName('cursor')[0];
        var tmpContentElem = this.GetRootElement().getElementsByClassName('content')[0];
        tmpContentElem.removeChild(tmpImgElem);
        //call callback function if supplied
        if (typeof callback != "undefined") {
            callback();
        }
    }
}

class NameBox extends Box {
    private playerName: string;

    constructor(name: string, width: number, height: number, flavour: string) {
        super(name, width, height, flavour);
        this.playerName = "";
        this._initMarkup();
    }

    private _initMarkup():void {
        for (var x = 1; x < 6; x++) {
            var tmpSpanElem = document.createElement('span');

            var strSpanClass = "";
            if (x == this.playerName.length + 1 || (x == 1 && this.playerName.length == 0)) {
                strSpanClass += " active";
                if (x == 1) {
                    strSpanClass += " first"
                }
            } else if (x == 1) {
                strSpanClass += " first";
            } else if (x == 5) {
                strSpanClass += " last";
            }
            
            if (x != this.playerName.length + 1) {
                if (this.playerName.charAt(x - 1) != "") {
                    tmpSpanElem.innerHTML = this.playerName.charAt(x - 1);
                } else {
                    tmpSpanElem.innerHTML = "&mdash;";
                }
            }

            tmpSpanElem.setAttribute('class', strSpanClass + " " + x.toString());
            
            this.GetRootElement().getElementsByClassName('content')[0].appendChild(tmpSpanElem);
        }
    }

    public SetName(name: string):void {
        this.playerName = name;
        this.update();
    }

    public EnterChar(char: string):void {
        if (char.length != 1) { return; }

        if (this.playerName.length < 5) {
            this.playerName += char;
        }

        this.update();
    }

    public Backspace():void {
        if (this.playerName.length > 0) {
            this.playerName = this.playerName.slice(0, this.playerName.length - 1);
        }

        this.update();
    }

    public GetPlayerName():string {
        return this.playerName;
    }

    private update():void {
        var arrChar = new Array();
        for (var x = 0; x < this.playerName.length - 1; x++) {
            arrChar[x] = this.playerName.charAt(x);
        }

        //update markup
        var tmpContentElem = this.GetRootElement().getElementsByClassName("content")[0];
        while (tmpContentElem.hasChildNodes()) {
            tmpContentElem.removeChild(tmpContentElem.firstChild);
        }

        this._initMarkup();
    }
}

class TypeBox extends Box {
    private options: any;
    private optionsCursorMapping: any;
    private currentPosition: number[];
    private nameBox: NameBox;
    private caps: Boolean;

    constructor(id: string, flavour: string, nameBox: NameBox) {
        super(id, 32.15, 16.6, flavour);
        this.nameBox = nameBox;
        this.options = new Array();
        this.optionsCursorMapping = new Array();
        this.currentPosition = [0, 0];
        this.caps = true;
        
        //populate options
        this.options = [
            ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', '-', ','],
            ['J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', '\'', '~'],
            ['S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '.', '/'],
            ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '#'],
            ['CAPITAL', 'small', '?', '%'],
            ['Dont care', 'Backspace', 'OK']
        ];
        this.optionsCursorMapping = [
            [[1.15, 0.8], [1.15, 3.1], [1.15, 5.3], [1.15, 7.5], [1.15, 9.7], [1.15, 12], [1.15, 14.3],
            [1.15, 16.6], [1.15, 18.9], [1.15, 25.5], [1.15, 28.1]],

            [[3.7, 0.8], [3.7, 3.1], [3.7, 5.3], [3.7, 7.5], [3.7, 9.7], [3.7, 12], [3.7, 14.3],
            [3.7, 16.6], [3.7, 18.9], [3.7, 25.5], [3.7, 28.1]],

            [[6.2, 0.8], [6.2, 3.1], [6.2, 5.3], [6.2, 7.5], [6.2, 9.7], [6.2, 12], [6.2, 14.3],
            [6.2, 16.6], [6.2, 25.5], [6.2, 28.1]],

            [[8.7, 0.8], [8.7, 3.1], [8.7, 5.3], [8.7, 7.5], [8.7, 9.7], [8.7, 12], [8.7, 14.3],
            [8.7, 16.6], [8.7, 18.9], [8.7, 21.2], [8.7, 25.5], [8.7, 28.1]],

            [[11.1, 0.8], [11.1, 9.7], [11.1, 25.5], [11.1, 28.1]],

            [[13.6, 0.8], [13.6, 16.6], [13.6, 28.1]]
        ];

        this._initMarkup();
        this._initCss();
    }
    
    private _initMarkup():void {
        var tmpImgElem = document.createElement('img');
        tmpImgElem.setAttribute('src', 'img/cursor.gif');

        var tmpTableElem = document.createElement('table');
        tmpTableElem.setAttribute('class', 'typeTable');
        for (var x = 0; x < this.options.length; x++) {
            var tmpTrElem = document.createElement('tr');

            for (var y = 0; y < this.options[x].length; y++) {
                var tmpTdElem = document.createElement('td');
                if ((x == 0 || x == 1) && y == 8) { //colspan in first and second row
                    tmpTdElem.setAttribute('colspan', '3');
                } else if (x == 2 && y == 7) { //colspan in the third row
                    tmpTdElem.setAttribute('colspan', '4');
                } else if (x == 4 && y == 0) { //colspan for CAPITAL
                    tmpTdElem.setAttribute('colspan', '4');
                } else if (x == 4 && y == 1) {
                    tmpTdElem.setAttribute('colspan', '7');
                } else if (x == 5 && y == 0) {
                    tmpTdElem.setAttribute('colspan', '7');
                } else if (x == 5 && y == 1) {
                    tmpTdElem.setAttribute('colspan', '5');
                }

                if (x < 3) {
                    if (this.caps) {
                        tmpTdElem.innerHTML = this.options[x][y].toUpperCase();
                    } else {
                        tmpTdElem.innerHTML = this.options[x][y].toLowerCase();
                    }
                } else {
                    tmpTdElem.innerHTML = this.options[x][y];
                }
                tmpTrElem.appendChild(tmpTdElem);
                
                if (x == 3 && y == 9) {
                    var tmpExtraTd = document.createElement('td');
                    tmpTrElem.appendChild(tmpExtraTd);
                }
            }

            tmpTableElem.appendChild(tmpTrElem);
        }

        this.GetRootElement().getElementsByClassName('content')[0].appendChild(tmpImgElem);
        this.GetRootElement().getElementsByClassName('content')[0].appendChild(tmpTableElem);
    }

    private _reinitMarkup():void {
        this.GetRootElement().getElementsByClassName('content')[0].removeChild(this.GetRootElement().getElementsByClassName('typeTable')[0]);
        this._initMarkup();
    }

    private _initCss():void {
        this.css.appendChild(document.createTextNode(
            '#' + this.GetId() + ' .content table {' +
                'width: 100%;' +
                'height: 100%;' +
                'padding: .5em 1.5em .5em 1.5em;' +
            '}' +
            '#' + this.GetId() + " .content table td {" +
                'width: 8.33%;' +
            '}' +
            '#' + this.GetId() + ' .content {' +
                'position: relative;' +
            '}' +
            '#' + this.GetId() + ' .content img {' +
                'position: absolute;' +
                'top: 1.15em; left: .8em;' +
            '}'
        ));
    }

    private update():void {
        var tmpArrElem = this.optionsCursorMapping[this.currentPosition[0]];
        var cursorTopValue = tmpArrElem[this.currentPosition[1]][0];
        var cursorLeftValue = tmpArrElem[this.currentPosition[1]][1];

        this.css.appendChild(document.createTextNode(
            '#' + this.GetId() + ' .content img {' +
                'position: absolute;' +
                'top: ' + cursorTopValue + 'em; left:' + cursorLeftValue  + 'em;' +
            '}'
        ));
    }

    public SetPosition(x, y):void {
        this.currentPosition[0] = x;
        this.currentPosition[1] = y;
        this.update();
    }

    public Up():void {
        if (this.currentPosition[0] == 0 && this.currentPosition[1] == 1) {
            this.currentPosition[0] = 5;
            this.currentPosition[1] = 0;
        } else if (this.currentPosition[0] == 0 && this.currentPosition[1] == 2) {
            this.currentPosition[0] = 3;
            this.currentPosition[1] = 2;
        } else if (this.currentPosition[0] == 0 && this.currentPosition[1] == 3) {
            this.currentPosition[0] = 3;
            this.currentPosition[1] = 3;
        } else if (this.currentPosition[0] == 0 && this.currentPosition[1] == 4) {
            this.currentPosition[0] = 4;
            this.currentPosition[1] = 1;
        } else if (this.currentPosition[0] == 0 && this.currentPosition[1] == 5) {
            this.currentPosition[0] = 4;
            this.currentPosition[1] = 1;
        } else if (this.currentPosition[0] == 0 && this.currentPosition[1] == 6) {
            this.currentPosition[0] = 3;
            this.currentPosition[1] = 6;
        } else if (this.currentPosition[0] == 0 && this.currentPosition[1] == 7) {
            this.currentPosition[0] = 3;
            this.currentPosition[1] = 7;
        } else if (this.currentPosition[0] == 0 && this.currentPosition[1] == 8) {
            this.currentPosition[0] = 3;
            this.currentPosition[1] = 8;
        } else if (this.currentPosition[0] == 3 && this.currentPosition[1] == 8) {
            this.currentPosition[0] = 1;
        } else if (this.currentPosition[0] == 4 && (this.currentPosition[1] == 1)) {
            this.currentPosition[0] = 3;
            this.currentPosition[1] = 4;
        } else if (this.currentPosition[0] == 5 && (this.currentPosition[1] == 2)) {
            this.currentPosition[0] = 4;
            this.currentPosition[1] = 3;
        } else if (this.currentPosition[0] == 4 && (this.currentPosition[1] == 3)) {
            this.currentPosition[0] = 3;
            this.currentPosition[1] = 11;
        } else if (this.currentPosition[0] == 3 && (this.currentPosition[1] == 11)) {
            this.currentPosition[0] = 2;
            this.currentPosition[1] = 9;
        } else if (this.currentPosition[0] == 2 && (this.currentPosition[1] == 9)) {
            this.currentPosition[0] = 1;
            this.currentPosition[1] = 10;
        } else if (this.currentPosition[0] == 4 && (this.currentPosition[1] == 2)) {
            this.currentPosition[0] = 3;
            this.currentPosition[1] = 10;
        } else if (this.currentPosition[0] == 3 && (this.currentPosition[1] == 10)) {
            this.currentPosition[0] = 2;
            this.currentPosition[1] = 8;
        } else if (this.currentPosition[0] == 2 && (this.currentPosition[1] == 8)) {
            this.currentPosition[0] = 1;
            this.currentPosition[1] = 9;
        } else if (this.currentPosition[0] == 3 && (this.currentPosition[1] == 9)) {
            this.currentPosition[0] = 1;
            this.currentPosition[1] = 8;
        } else {
            if (this.currentPosition[0] > 0) {
                this.currentPosition[0]--;
            } else {
                this.currentPosition[0] = 5;
            }
        }
        this.update();
    }

    public Down():void {
        if (this.currentPosition[0] == 1 && this.currentPosition[1] == 8) {
            this.currentPosition[0] = 3;
        } else if (this.currentPosition[0] == 3 && (this.currentPosition[1] < 4)) {
            this.currentPosition[0] = 4;
            this.currentPosition[1] = 0;
        } else if (this.currentPosition[0] == 3 && (this.currentPosition[1] >= 4 && this.currentPosition[1] < 7)) {
            this.currentPosition[0] = 4;
            this.currentPosition[1] = 1;
        } else if (this.currentPosition[0] == 3 && (this.currentPosition[1] >= 7 && this.currentPosition[1] < 10)) {
            this.currentPosition[0] = 5;
            this.currentPosition[1] = 1;
        } else if (this.currentPosition[0] == 1 && (this.currentPosition[1] == 9)) {
            this.currentPosition[0] = 2;
            this.currentPosition[1] = 8;
        } else if (this.currentPosition[0] == 1 && (this.currentPosition[1] == 10)) {
            this.currentPosition[0] = 2;
            this.currentPosition[1] = 9;
        } else if (this.currentPosition[0] == 2 && (this.currentPosition[1] == 8)) {
            this.currentPosition[0] = 3;
            this.currentPosition[1] = 10;
        } else if (this.currentPosition[0] == 2 && (this.currentPosition[1] == 9)) {
            this.currentPosition[0] = 3;
            this.currentPosition[1] = 11;
        } else if (this.currentPosition[0] == 3 && (this.currentPosition[1] == 10)) {
            this.currentPosition[0] = 4;
            this.currentPosition[1] = 2;
        } else if (this.currentPosition[0] == 3 && (this.currentPosition[1] == 11)) {
            this.currentPosition[0] = 4;
            this.currentPosition[1] = 3;
        } else if (this.currentPosition[0] == 4 && (this.currentPosition[1] == 3)) {
            this.currentPosition[0] = 5;
            this.currentPosition[1] = 2;
        } else {
            if (this.currentPosition[0] < 5) {
                this.currentPosition[0]++;
            } else {
                this.currentPosition[0] = 0;
            }
        }
        this.update();
    }

    public Left():void {
        if (this.currentPosition[1] > 0) {
            this.currentPosition[1]--;
        } else {
            this.currentPosition[1] = this.options[this.currentPosition[0]].length - 1;
        }
        this.update();
    }

    public Right():void {
        if (this.currentPosition[1] < this.options[this.currentPosition[0]].length - 1) {
            this.currentPosition[1]++;
        } else {
            this.currentPosition[1] = 0;
        }
        this.update();
    }

    public ConfirmSelection(callback?):void {
        var strSelection:string = this.options[this.currentPosition[0]][this.currentPosition[1]];
        
        switch (strSelection) {
            case "CAPITAL":
                this.caps = true;
                this._reinitMarkup();
                break;
            case "small":
                this.caps = false;
                this._reinitMarkup();
                break;
        }

        if (this.caps) {
            strSelection = strSelection.toUpperCase();
        } else {
            strSelection = strSelection.toLowerCase();
        }

        if (typeof callback != "undefined") {
            callback(strSelection);
        }
    }
}