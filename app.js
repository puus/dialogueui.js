var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Box = (function () {
    function Box(name, width, height, flavour) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.flavour = flavour;
        this.hidden = false;
        this.initMarkup();
        this.initCss();
    }
    Box.prototype.initMarkup = function () {
        this.rootElement = document.createElement("section");
        this.rootElement.setAttribute("id", this.name);
        this.rootElement.setAttribute("class", "box " + this.flavour);
        var tmpElem = document.createElement("div");
        tmpElem.setAttribute("class", "border1");
        this.rootElement.appendChild(tmpElem);
        tmpElem = document.createElement("div");
        tmpElem.setAttribute("class", "content");
        this.rootElement.appendChild(tmpElem);
    };
    Box.prototype.initCss = function () {
        this.borderWidth = this.width - 0.45;
        this.borderHeight = this.height - 0.4;
        this.contentWidth = this.width - 0.7;
        this.contentHeight = this.height - 0.65;
        var cssSectionRule = "#" + this.name + " {" + "display: block;" + "width: " + this.width + "em;" + "height: " + this.height + "em;} ";
        var cssBorderRule = "#" + this.name + " .border1 {" + "width: " + this.borderWidth + "em;" + "height: " + this.borderHeight + "em;} ";
        var cssContentRule = "#" + this.name + " .content {" + "width: " + this.contentWidth + "em;" + "height: " + this.contentHeight + "em;} ";
        var cssHiddenRule = "#" + this.name + " {" + "display: none;" + "}";
        var strCombinedRule = "";
        if(this.hidden == true) {
            strCombinedRule += cssBorderRule + cssContentRule + cssHiddenRule;
        } else {
            strCombinedRule += cssSectionRule + cssBorderRule + cssContentRule;
        }
        this.css = document.createElement('style');
        this.css.setAttribute('type', 'text/css');
        this.css.appendChild(document.createTextNode(strCombinedRule));
        document.getElementsByTagName("head")[0].appendChild(this.css);
    };
    Box.prototype.GetName = function () {
        return this.name;
    };
    Box.prototype.GetWidth = function () {
        return this.width;
    };
    Box.prototype.GetHeight = function () {
        return this.height;
    };
    Box.prototype.GetRootElement = function () {
        return this.rootElement;
    };
    Box.prototype.GetCss = function () {
        return this.css;
    };
    Box.prototype.getFlavour = function () {
        return this.flavour;
    };
    Box.prototype.SetWidth = function (width) {
        this.width = width;
        this.initCss();
    };
    Box.prototype.SetHeight = function (height) {
        this.height = height;
        this.initCss();
    };
    Box.prototype.SetDimensions = function (width, height) {
        this.width = width;
        this.height = height;
        this.initCss();
    };
    Box.prototype.Hide = function () {
        this.hidden = true;
        this.initCss();
    };
    Box.prototype.Show = function () {
        this.hidden = false;
        this.initCss();
    };
    Box.prototype.SetFlavour = function (flavour) {
        this.flavour = flavour;
        var tmpClassString = this.rootElement.getAttribute('class');
        var newClassString = "";
        var arrClasses = tmpClassString.split(' ');
        for(var x = 0; x < arrClasses.length; x++) {
            if(arrClasses[x].trim() != "plain" && arrClasses[x].trim() != "mint" && arrClasses[x].trim() != "strawberry" && arrClasses[x].trim() != "banana" && arrClasses[x].trim() != "penut") {
                newClassString += arrClasses[x] + " ";
            }
        }
        newClassString += this.flavour;
        this.rootElement.setAttribute('class', newClassString);
    };
    return Box;
})();
var DisplayBox = (function (_super) {
    __extends(DisplayBox, _super);
    function DisplayBox(name, width, height, flavour, title) {
        this.title = title;
        _super.call(this, name, width, height, flavour);
        this._initMarkup();
    }
    DisplayBox.prototype._initMarkup = function () {
        if(typeof this.title != "undefined" && this.title != "") {
            var tmpH1Elem = document.createElement('h1');
            tmpH1Elem.setAttribute('class', 'displayBoxHeading');
            tmpH1Elem.appendChild(document.createTextNode(this.title));
            this.GetRootElement().getElementsByClassName('content')[0].appendChild(tmpH1Elem);
        }
    };
    DisplayBox.prototype.HasH1 = function () {
        if(typeof this.GetRootElement().getElementsByTagName('h1')[0] != "undefined") {
            return true;
        } else {
            return false;
        }
    };
    DisplayBox.prototype.GetTitle = function () {
        return this.title;
    };
    DisplayBox.prototype.SetTitle = function (title) {
        this.title = title;
        var tmpContentElem = this.GetRootElement().getElementsByClassName('content')[0];
        if(this.HasH1()) {
            this.GetRootElement().getElementsByClassName('displayBoxHeading')[0].textContent = title;
        } else {
            var tmpH1Elem = document.createElement('h1');
            tmpH1Elem.setAttribute('class', 'displayBoxHeading');
            if(tmpContentElem.hasChildNodes()) {
                tmpContentElem.firstChild.insertBefore(tmpH1Elem);
            } else {
                tmpContentElem.appendChild(tmpH1Elem);
            }
        }
    };
    return DisplayBox;
})(Box);
var SelectionBox = (function (_super) {
    __extends(SelectionBox, _super);
    function SelectionBox(name, width, height, flavour, title, options, defaultIndex) {
        _super.call(this, name, width, height, flavour, title);
        this.optionsIndex = 0;
        this.currentIndex = 0;
        if(defaultIndex) {
            this.currentIndex = defaultIndex;
        }
        this.__initMarkup();
        if(typeof options === "undefined") {
            this.options = new Array();
        } else {
            this.options = options;
            this.optionsIndex = options.length;
            this.updateUlMarkup();
        }
    }
    SelectionBox.prototype.__initMarkup = function () {
        var tmpImgElem = document.createElement('img');
        var tmpUlElem = document.createElement('ul');
        tmpImgElem.setAttribute('class', 'cursor');
        tmpImgElem.setAttribute('src', 'img/cursor.gif');
        tmpUlElem.setAttribute('class', 'selectionList');
        this.GetRootElement().getElementsByClassName('content')[0].appendChild(tmpImgElem);
        this.GetRootElement().getElementsByClassName('content')[0].appendChild(tmpUlElem);
        this.updateCursorPosition();
    };
    SelectionBox.prototype.HasUl = function () {
        for(var x; x < this.GetRootElement().childNodes.length; x++) {
            if(this.GetRootElement().childNodes[x].nodeName == "ul") {
                return true;
            }
        }
        return false;
    };
    SelectionBox.prototype.AddOption = function (option) {
        this.options[this.optionsIndex] = option;
        this.updateUlMarkup();
        this.optionsIndex++;
    };
    SelectionBox.prototype.RemoveOption = function (index) {
        this.options.splice(index, 1);
        this.updateUlMarkup();
    };
    SelectionBox.prototype.GetOption = function (index) {
        return this.options[index];
    };
    SelectionBox.prototype.setOption = function (index, value) {
        this.options[index] = value;
        this.updateUlMarkup();
    };
    SelectionBox.prototype.GetCurrentOption = function () {
        return this.options[this.currentIndex];
    };
    SelectionBox.prototype.GetCurrentIndex = function () {
        return this.currentIndex;
    };
    SelectionBox.prototype.SetCurrentIndex = function (index) {
        this.currentIndex = index;
        this.updateCursorPosition();
    };
    SelectionBox.prototype.Up = function () {
        this.decCurrentIndex();
    };
    SelectionBox.prototype.Down = function () {
        this.incCurrentIndex();
    };
    SelectionBox.prototype.incCurrentIndex = function () {
        if(this.currentIndex == this.options.length - 1) {
            this.currentIndex = 0;
            this.updateCursorPosition();
            return;
        }
        this.currentIndex++;
        this.updateCursorPosition();
    };
    SelectionBox.prototype.decCurrentIndex = function () {
        if(this.currentIndex == 0) {
            this.currentIndex = this.options.length - 1;
            this.updateCursorPosition();
            return;
        }
        this.currentIndex--;
        this.updateCursorPosition();
    };
    SelectionBox.prototype.ConfirmSelection = function (callback) {
        //set class of current selection
        var tmpLiElem = this.GetRootElement().getElementsByClassName(this.currentIndex.toString())[0];
        tmpLiElem.attributes[0].value += " confirm";
        //remove cursor img
        var tmpImgElem = this.GetRootElement().getElementsByClassName('cursor')[0];
        var tmpContentElem = this.GetRootElement().getElementsByClassName('content')[0];
        tmpContentElem.removeChild(tmpImgElem);
        //call callback function if supplied
        if(typeof callback != "undefined") {
            callback();
        }
    };
    SelectionBox.prototype.updateCursorPosition = function () {
        var tmpImgElem = this.GetRootElement().getElementsByClassName('cursor')[0];
        var intOffset = 1.2;
        if(this.HasH1()) {
            intOffset += 2.3;
        }
        if(this.currentIndex != 0) {
            intOffset += (this.currentIndex * 1.9);
        }
        var css = document.createElement('style');
        css.setAttribute('type', 'text/css');
        css.appendChild(document.createTextNode("#" + this.GetName() + " .content .cursor {top:" + intOffset + "em;}"));
        document.getElementsByTagName("head")[0].appendChild(css);
    };
    SelectionBox.prototype.updateUlMarkup = function () {
        var tmpUlElem = this.GetRootElement().getElementsByClassName('selectionList')[0];
        if(tmpUlElem.hasChildNodes()) {
            while(tmpUlElem.firstChild) {
                tmpUlElem.removeChild(tmpUlElem.firstChild);
            }
        }
        for(var x = 0; x < this.options.length; x++) {
            var tmpLiElem = document.createElement('li');
            tmpLiElem.setAttribute('class', x.toString());
            tmpLiElem.innerHTML = this.options[x];
            tmpUlElem.appendChild(tmpLiElem);
        }
    };
    return SelectionBox;
})(DisplayBox);
var NameBox = (function (_super) {
    __extends(NameBox, _super);
    function NameBox(name, width, height, flavour) {
        _super.call(this, name, width, height, flavour);
        this.playerName = "";
        this._initMarkup();
    }
    NameBox.prototype._initMarkup = function () {
        for(var x = 1; x < 6; x++) {
            var tmpSpanElem = document.createElement('span');
            var strSpanClass = "";
            if(x == this.playerName.length + 1 || (x == 1 && this.playerName.length == 0)) {
                strSpanClass += " active";
                if(x == 1) {
                    strSpanClass += " first";
                }
            } else if(x == 1) {
                strSpanClass += " first";
            } else if(x == 5) {
                strSpanClass += " last";
            }
            if(x != this.playerName.length + 1) {
                if(this.playerName.charAt(x - 1) != "") {
                    tmpSpanElem.innerHTML = this.playerName.charAt(x - 1);
                } else {
                    tmpSpanElem.innerHTML = "&mdash;";
                }
            }
            tmpSpanElem.setAttribute('class', strSpanClass + " " + x.toString());
            this.GetRootElement().getElementsByClassName('content')[0].appendChild(tmpSpanElem);
        }
    };
    NameBox.prototype.SetName = function (name) {
        this.playerName = name;
        this.update();
    };
    NameBox.prototype.EnterChar = function (char) {
        if(char.length != 1) {
            return;
        }
        if(this.playerName.length < 5) {
            this.playerName += char;
        }
        this.update();
    };
    NameBox.prototype.Backspace = function () {
        if(this.playerName.length > 0) {
            this.playerName = this.playerName.slice(0, this.playerName.length - 1);
        }
        this.update();
    };
    NameBox.prototype.GetPlayerName = function () {
        return this.playerName;
    };
    NameBox.prototype.update = function () {
        var arrChar = new Array();
        for(var x = 0; x < this.playerName.length - 1; x++) {
            arrChar[x] = this.playerName.charAt(x);
        }
        //update markup
        var tmpContentElem = this.GetRootElement().getElementsByClassName("content")[0];
        while(tmpContentElem.hasChildNodes()) {
            tmpContentElem.removeChild(tmpContentElem.firstChild);
        }
        this._initMarkup();
    };
    return NameBox;
})(Box);
var TypeBox = (function (_super) {
    __extends(TypeBox, _super);
    function TypeBox(name, flavour, nameBox) {
        _super.call(this, name, 32.15, 16.6, flavour);
        this.nameBox = nameBox;
        this.options = new Array();
        this.optionsCursorMapping = new Array();
        this.currentPosition = [
            0, 
            0
        ];
        this.caps = true;
        //populate options
        this.options = [
            [
                'A', 
                'B', 
                'C', 
                'D', 
                'E', 
                'F', 
                'G', 
                'H', 
                'I', 
                '-', 
                ','
            ], 
            [
                'J', 
                'K', 
                'L', 
                'M', 
                'N', 
                'O', 
                'P', 
                'Q', 
                'R', 
                '\'', 
                '~'
            ], 
            [
                'S', 
                'T', 
                'U', 
                'V', 
                'W', 
                'X', 
                'Y', 
                'Z', 
                '.', 
                '/'
            ], 
            [
                '0', 
                '1', 
                '2', 
                '3', 
                '4', 
                '5', 
                '6', 
                '7', 
                '8', 
                '9', 
                '!', 
                '#'
            ], 
            [
                'CAPITAL', 
                'small', 
                '?', 
                '%'
            ], 
            [
                'Dont care', 
                'Backspace', 
                'OK'
            ]
        ];
        this.optionsCursorMapping = [
            [
                [
                    1.15, 
                    0.8
                ], 
                [
                    1.15, 
                    3.1
                ], 
                [
                    1.15, 
                    5.3
                ], 
                [
                    1.15, 
                    7.5
                ], 
                [
                    1.15, 
                    9.7
                ], 
                [
                    1.15, 
                    12
                ], 
                [
                    1.15, 
                    14.3
                ], 
                [
                    1.15, 
                    16.6
                ], 
                [
                    1.15, 
                    18.9
                ], 
                [
                    1.15, 
                    25.5
                ], 
                [
                    1.15, 
                    28.1
                ]
            ], 
            [
                [
                    3.7, 
                    0.8
                ], 
                [
                    3.7, 
                    3.1
                ], 
                [
                    3.7, 
                    5.3
                ], 
                [
                    3.7, 
                    7.5
                ], 
                [
                    3.7, 
                    9.7
                ], 
                [
                    3.7, 
                    12
                ], 
                [
                    3.7, 
                    14.3
                ], 
                [
                    3.7, 
                    16.6
                ], 
                [
                    3.7, 
                    18.9
                ], 
                [
                    3.7, 
                    25.5
                ], 
                [
                    3.7, 
                    28.1
                ]
            ], 
            [
                [
                    6.2, 
                    0.8
                ], 
                [
                    6.2, 
                    3.1
                ], 
                [
                    6.2, 
                    5.3
                ], 
                [
                    6.2, 
                    7.5
                ], 
                [
                    6.2, 
                    9.7
                ], 
                [
                    6.2, 
                    12
                ], 
                [
                    6.2, 
                    14.3
                ], 
                [
                    6.2, 
                    16.6
                ], 
                [
                    6.2, 
                    25.5
                ], 
                [
                    6.2, 
                    28.1
                ]
            ], 
            [
                [
                    8.7, 
                    0.8
                ], 
                [
                    8.7, 
                    3.1
                ], 
                [
                    8.7, 
                    5.3
                ], 
                [
                    8.7, 
                    7.5
                ], 
                [
                    8.7, 
                    9.7
                ], 
                [
                    8.7, 
                    12
                ], 
                [
                    8.7, 
                    14.3
                ], 
                [
                    8.7, 
                    16.6
                ], 
                [
                    8.7, 
                    18.9
                ], 
                [
                    8.7, 
                    21.2
                ], 
                [
                    8.7, 
                    25.5
                ], 
                [
                    8.7, 
                    28.1
                ]
            ], 
            [
                [
                    11.1, 
                    0.8
                ], 
                [
                    11.1, 
                    9.7
                ], 
                [
                    11.1, 
                    25.5
                ], 
                [
                    11.1, 
                    28.1
                ]
            ], 
            [
                [
                    13.6, 
                    0.8
                ], 
                [
                    13.6, 
                    16.6
                ], 
                [
                    13.6, 
                    28.1
                ]
            ]
        ];
        this._initMarkup();
        this._initCss();
    }
    TypeBox.prototype._initMarkup = function () {
        var tmpImgElem = document.createElement('img');
        tmpImgElem.setAttribute('src', 'img/cursor.gif');
        var tmpTableElem = document.createElement('table');
        tmpTableElem.setAttribute('class', 'typeTable');
        for(var x = 0; x < this.options.length; x++) {
            var tmpTrElem = document.createElement('tr');
            for(var y = 0; y < this.options[x].length; y++) {
                var tmpTdElem = document.createElement('td');
                if((x == 0 || x == 1) && y == 8) {
                    //colspan in first and second row
                    tmpTdElem.setAttribute('colspan', '3');
                } else if(x == 2 && y == 7) {
                    //colspan in the third row
                    tmpTdElem.setAttribute('colspan', '4');
                } else if(x == 4 && y == 0) {
                    //colspan for CAPITAL
                    tmpTdElem.setAttribute('colspan', '4');
                } else if(x == 4 && y == 1) {
                    tmpTdElem.setAttribute('colspan', '7');
                } else if(x == 5 && y == 0) {
                    tmpTdElem.setAttribute('colspan', '7');
                } else if(x == 5 && y == 1) {
                    tmpTdElem.setAttribute('colspan', '5');
                }
                if(x < 3) {
                    if(this.caps) {
                        tmpTdElem.innerHTML = this.options[x][y].toUpperCase();
                    } else {
                        tmpTdElem.innerHTML = this.options[x][y].toLowerCase();
                    }
                } else {
                    tmpTdElem.innerHTML = this.options[x][y];
                }
                tmpTrElem.appendChild(tmpTdElem);
                if(x == 3 && y == 9) {
                    var tmpExtraTd = document.createElement('td');
                    tmpTrElem.appendChild(tmpExtraTd);
                }
            }
            tmpTableElem.appendChild(tmpTrElem);
        }
        this.GetRootElement().getElementsByClassName('content')[0].appendChild(tmpImgElem);
        this.GetRootElement().getElementsByClassName('content')[0].appendChild(tmpTableElem);
    };
    TypeBox.prototype._reinitMarkup = function () {
        this.GetRootElement().getElementsByClassName('content')[0].removeChild(this.GetRootElement().getElementsByClassName('typeTable')[0]);
        this._initMarkup();
    };
    TypeBox.prototype._initCss = function () {
        var css = document.createElement('style');
        css.setAttribute('type', 'text/css');
        css.appendChild(document.createTextNode('#' + this.GetName() + ' .content table {' + 'width: 100%;' + 'height: 100%;' + 'padding: .5em 1.5em .5em 1.5em;' + '}' + '#' + this.GetName() + " .content table td {" + 'width: 8.33%;' + '}' + '#' + this.GetName() + ' .content {' + 'position: relative;' + '}' + '#' + this.GetName() + ' .content img {' + 'position: absolute;' + 'top: 1.15em; left: .8em;' + '}'));
        document.getElementsByTagName("head")[0].appendChild(css);
    };
    TypeBox.prototype.update = function () {
        var tmpArrElem = this.optionsCursorMapping[this.currentPosition[0]];
        var cursorTopValue = tmpArrElem[this.currentPosition[1]][0];
        var cursorLeftValue = tmpArrElem[this.currentPosition[1]][1];
        var css = document.createElement('style');
        css.setAttribute('type', 'text/css');
        css.appendChild(document.createTextNode('#' + this.GetName() + ' .content img {' + 'position: absolute;' + 'top: ' + cursorTopValue + 'em; left:' + cursorLeftValue + 'em;' + '}'));
        document.getElementsByTagName("head")[0].appendChild(css);
    };
    TypeBox.prototype.SetPosition = function (x, y) {
        this.currentPosition[0] = x;
        this.currentPosition[1] = y;
        this.update();
    };
    TypeBox.prototype.Up = function () {
        if(this.currentPosition[0] == 3 && this.currentPosition[1] == 8) {
            this.currentPosition[0] = 1;
        } else if(this.currentPosition[0] == 4 && (this.currentPosition[1] == 1)) {
            this.currentPosition[0] = 3;
            this.currentPosition[1] = 4;
        } else if(this.currentPosition[0] == 5 && (this.currentPosition[1] == 2)) {
            this.currentPosition[0] = 4;
            this.currentPosition[1] = 3;
        } else if(this.currentPosition[0] == 4 && (this.currentPosition[1] == 3)) {
            this.currentPosition[0] = 3;
            this.currentPosition[1] = 11;
        } else if(this.currentPosition[0] == 3 && (this.currentPosition[1] == 11)) {
            this.currentPosition[0] = 2;
            this.currentPosition[1] = 9;
        } else if(this.currentPosition[0] == 2 && (this.currentPosition[1] == 9)) {
            this.currentPosition[0] = 1;
            this.currentPosition[1] = 10;
        } else if(this.currentPosition[0] == 4 && (this.currentPosition[1] == 2)) {
            this.currentPosition[0] = 3;
            this.currentPosition[1] = 10;
        } else if(this.currentPosition[0] == 3 && (this.currentPosition[1] == 10)) {
            this.currentPosition[0] = 2;
            this.currentPosition[1] = 8;
        } else if(this.currentPosition[0] == 2 && (this.currentPosition[1] == 8)) {
            this.currentPosition[0] = 1;
            this.currentPosition[1] = 9;
        } else if(this.currentPosition[0] == 3 && (this.currentPosition[1] == 9)) {
            this.currentPosition[0] = 1;
            this.currentPosition[1] = 8;
        } else {
            if(this.currentPosition[0] > 0) {
                this.currentPosition[0]--;
            } else {
                this.currentPosition[0] = 5;
            }
        }
        this.update();
    };
    TypeBox.prototype.Down = function () {
        if(this.currentPosition[0] == 1 && this.currentPosition[1] == 8) {
            this.currentPosition[0] = 3;
        } else if(this.currentPosition[0] == 3 && (this.currentPosition[1] < 4)) {
            this.currentPosition[0] = 4;
            this.currentPosition[1] = 0;
        } else if(this.currentPosition[0] == 3 && (this.currentPosition[1] >= 4 && this.currentPosition[1] < 7)) {
            this.currentPosition[0] = 4;
            this.currentPosition[1] = 1;
        } else if(this.currentPosition[0] == 3 && (this.currentPosition[1] >= 7 && this.currentPosition[1] < 10)) {
            this.currentPosition[0] = 5;
            this.currentPosition[1] = 1;
        } else if(this.currentPosition[0] == 1 && (this.currentPosition[1] == 9)) {
            this.currentPosition[0] = 2;
            this.currentPosition[1] = 8;
        } else if(this.currentPosition[0] == 1 && (this.currentPosition[1] == 10)) {
            this.currentPosition[0] = 2;
            this.currentPosition[1] = 9;
        } else if(this.currentPosition[0] == 2 && (this.currentPosition[1] == 8)) {
            this.currentPosition[0] = 3;
            this.currentPosition[1] = 10;
        } else if(this.currentPosition[0] == 2 && (this.currentPosition[1] == 9)) {
            this.currentPosition[0] = 3;
            this.currentPosition[1] = 11;
        } else if(this.currentPosition[0] == 3 && (this.currentPosition[1] == 10)) {
            this.currentPosition[0] = 4;
            this.currentPosition[1] = 2;
        } else if(this.currentPosition[0] == 3 && (this.currentPosition[1] == 11)) {
            this.currentPosition[0] = 4;
            this.currentPosition[1] = 3;
        } else if(this.currentPosition[0] == 4 && (this.currentPosition[1] == 3)) {
            this.currentPosition[0] = 5;
            this.currentPosition[1] = 2;
        } else {
            if(this.currentPosition[0] < 5) {
                this.currentPosition[0]++;
            } else {
                this.currentPosition[0] = 0;
            }
        }
        this.update();
    };
    TypeBox.prototype.Left = function () {
        if(this.currentPosition[1] > 0) {
            this.currentPosition[1]--;
        } else {
            this.currentPosition[1] = this.options[this.currentPosition[0]].length - 1;
        }
        this.update();
    };
    TypeBox.prototype.Right = function () {
        if(this.currentPosition[1] < this.options[this.currentPosition[0]].length - 1) {
            this.currentPosition[1]++;
        } else {
            this.currentPosition[1] = 0;
        }
        this.update();
    };
    TypeBox.prototype.ConfirmSelection = function (callback) {
        var strSelection = this.options[this.currentPosition[0]][this.currentPosition[1]];
        switch(strSelection) {
            case "CAPITAL":
                this.caps = true;
                this._reinitMarkup();
                break;
            case "small":
                this.caps = false;
                this._reinitMarkup();
                break;
        }
        if(this.caps) {
            strSelection = strSelection.toUpperCase();
        } else {
            strSelection = strSelection.toLowerCase();
        }
        if(typeof callback != "undefined") {
            callback(strSelection);
        }
    };
    return TypeBox;
})(Box);
//@ sourceMappingURL=app.js.map
