var arrBoxes = new Array();
var arrAnswers = new Array();

function changeFlavours(flavour) {
    for (var x = 0; x < arrBoxes.length; x++) {
        arrBoxes[x].SetFlavour(flavour);
    }
}

$(document).ready(function () {

    var objNewGameBox = new SelectionBox('newGame', 31, 8, 'plain', '',
                                         ['&nbsp;1: Start New Game', '2: Start New Game', '3: Start New Game']);
    var objTextSpeedBox = new SelectionBox('textSpeed', 16, 10, 'plain', 'Please select text speed.',
                                           ['Fast', 'Medium', 'Slow'], 1);
    var objSoundModeBox = new SelectionBox('soundMode', 18, 8, 'plain', 'Please select sound setting.',
                                          ['Stereo', 'Mono']);
    var objFlavourBox = new SelectionBox('flavourSelect', 22, 14, 'plain', 'Which style windows do you prefer?',
                                         ['Plain flavour', 'Mint flavour', 'Strawberry flavour', 'Banana flavour', 'Penut flavour']);
    var objNameBox = new NameBox('nameBox', 8.2, 4, 'plain');
    var objMessageBox = new DisplayBox('messageBox', 17.6, 4, 'plain', 'Please name him.');
    var objTypeBox = new TypeBox('typeBox', 'plain', objNameBox);

    var objChar1Box = new DisplayBox('char1Box', 7.2, 4, 'plain', 'x');
    var objChar2Box = new DisplayBox('char2Box', 7.2, 4, 'plain', 'x');
    var objChar3Box = new DisplayBox('char3Box', 7.2, 4, 'plain', 'x');
    var objChar4Box = new DisplayBox('char4Box', 7.2, 4, 'plain', 'x');
    var objDogBox = new DisplayBox('dogBox', 7.2, 4, 'plain', 'x');
    var objFavFoodBox = new DisplayBox('favFoodBox', 12, 6, 'plain', 'x');
    var objCoolestThingBox = new DisplayBox('coolestThingBox', 12, 6, 'plain', 'x');
    var objEndBox = new DisplayBox('endBox', 29, 4, 'plain', 'Thank you for trying this Earthbound UI mockup.');


    arrBoxes = [objNewGameBox, objTextSpeedBox, objSoundModeBox, objFlavourBox, objNameBox, objMessageBox, objTypeBox,
                objChar1Box, objChar2Box, objChar3Box, objChar4Box, objDogBox, objFavFoodBox, objCoolestThingBox, objEndBox];

    document.getElementById('content').appendChild(objNewGameBox.rootElement);

    var state = 0;

    $(document).keyup(function (e) {
        switch (state) {
            case 0:
                switch (e.which) {
                    case 38:
                        objNewGameBox.Up();
                        break;
                    case 40:
                        objNewGameBox.Down();
                        break;
                    case 13:
                        objNewGameBox.ConfirmSelection(function () {
                            document.getElementById('content').appendChild(objTextSpeedBox.rootElement);
                            state = 1;
                        });
                        break;
                }
                break;

            case 1:
                switch (e.which) {
                    case 38:
                        objTextSpeedBox.Up();
                        break;
                    case 40:
                        objTextSpeedBox.Down();
                        break;
                    case 13:
                        objTextSpeedBox.ConfirmSelection(function () {
                            document.getElementById('content').appendChild(objSoundModeBox.GetRootElement());
                            state = 2;
                        });
                        break;
                }
                break;

            case 2:
                switch (e.which) {
                    case 38:
                        objSoundModeBox.Up();
                        break;
                    case 40:
                        objSoundModeBox.Down();
                        break;
                    case 13:
                        objSoundModeBox.ConfirmSelection(function () {
                            document.getElementById('content').appendChild(objFlavourBox.GetRootElement());
                            state = 3;
                        });
                        break;
                }
                break;

            case 3:
                switch (e.which) {
                    case 38:
                        objFlavourBox.Up();

                        switch (objFlavourBox.GetCurrentOption()) {
                            case "Plain flavour":
                                changeFlavours('plain');
                                break;
                            case "Mint flavour":
                                changeFlavours('mint');
                                break;
                            case "Strawberry flavour":
                                changeFlavours('strawberry');
                                break;
                            case "Banana flavour":
                                changeFlavours('banana');
                                break;
                            case "Penut flavour":
                                changeFlavours('penut');
                                break;
                        }
                        break;
                    case 40:
                        objFlavourBox.Down();
                        switch (objFlavourBox.GetCurrentOption()) {
                            case "Plain flavour":
                                changeFlavours('plain');
                                break;
                            case "Mint flavour":
                                changeFlavours('mint');
                                break;
                            case "Strawberry flavour":
                                changeFlavours('strawberry');
                                break;
                            case "Banana flavour":
                                changeFlavours('banana');
                                break;
                            case "Penut flavour":
                                changeFlavours('penut');
                                break;
                        }
                        break;
                    case 13:
                        objFlavourBox.ConfirmSelection(function () {

                            for (var y = 0; y < arrBoxes.length; y++) {
                                arrBoxes[y].Hide();
                            }

                            var tmpImgElem = document.createElement('img');
                            tmpImgElem.setAttribute('src', 'img/ness.gif');
                            tmpImgElem.setAttribute('class', 'charSprite');
                            tmpImgElem.setAttribute('id', 'sprite');

                            document.getElementById('content').appendChild(tmpImgElem);
                            document.getElementsByTagName('body')[0].appendChild(objNameBox.GetRootElement());
                            document.getElementsByTagName('body')[0].appendChild(objMessageBox.GetRootElement());
                            document.getElementById('content').appendChild(objTypeBox.GetRootElement());
                            objNameBox.Show();
                            objMessageBox.Show();
                            objTypeBox.Show();
                            state = 4;
                        });
                        break;
                }
                break;
            case 4:
                switch (e.which) {
                    case 38:
                        objTypeBox.Up();
                        break;
                    case 40:
                        objTypeBox.Down();
                        break;
                    case 39:
                        objTypeBox.Right();
                        break;
                    case 37:
                        objTypeBox.Left();
                        break;
                    case 13:
                        objTypeBox.ConfirmSelection(function (e) {
                            switch (e.toLowerCase()) {
                                case "backspace":
                                    objNameBox.Backspace();
                                    break;
                                case "ok":
                                    arrAnswers[arrAnswers.length] = objNameBox.GetPlayerName();
                                    objMessageBox.SetText('Name her, too.');
                                    objNameBox.SetName('');
                                    document.getElementById('sprite').setAttribute('src', 'img/girl.gif');
                                    objTypeBox.SetPosition(0, 0);
                                    state = 5;
                                    break;
                                case "dont care":
                                    objNameBox.SetName('Ness');
                                    objTypeBox.SetPosition(5, 2);
                                    break;
                                case "capital":
                                case "small":
                                    break;
                                default:
                                    objNameBox.EnterChar(e);
                                    break;
                            }
                        });
                        break;

                }
                break;
            case 5:
                switch (e.which) {
                    case 38:
                        objTypeBox.Up();
                        break;
                    case 40:
                        objTypeBox.Down();
                        break;
                    case 39:
                        objTypeBox.Right();
                        break;
                    case 37:
                        objTypeBox.Left();
                        break;
                    case 13:
                        objTypeBox.ConfirmSelection(function (e) {
                            switch (e.toLowerCase()) {
                                case "backspace":
                                    objNameBox.Backspace();
                                    break;
                                case "ok":
                                    arrAnswers[arrAnswers.length] = objNameBox.GetPlayerName();
                                    objMessageBox.SetText('Name your friend.');
                                    objNameBox.SetName('');
                                    document.getElementById('sprite').setAttribute('src', 'img/friend.gif');
                                    objTypeBox.SetPosition(0, 0);
                                    state = 6;
                                    break;
                                case "dont care":
                                    objNameBox.SetName('Paula');
                                    objTypeBox.SetPosition(5, 2);
                                    break;
                                case "capital":
                                case "small":
                                    break;
                                default:
                                    objNameBox.EnterChar(e);
                                    break;
                            }
                        });
                        break;

                }
                break;
            case 6:
                switch (e.which) {
                    case 38:
                        objTypeBox.Up();
                        break;
                    case 40:
                        objTypeBox.Down();
                        break;
                    case 39:
                        objTypeBox.Right();
                        break;
                    case 37:
                        objTypeBox.Left();
                        break;
                    case 13:
                        objTypeBox.ConfirmSelection(function (e) {
                            switch (e.toLowerCase()) {
                                case "backspace":
                                    objNameBox.Backspace();
                                    break;
                                case "ok":
                                    arrAnswers[arrAnswers.length] = objNameBox.GetPlayerName();
                                    objMessageBox.SetText('Name another friend.');
                                    objNameBox.SetName('');
                                    document.getElementById('sprite').setAttribute('src', 'img/anotherfriend.gif');
                                    objTypeBox.SetPosition(0, 0);
                                    state = 7;
                                    break;
                                case "dont care":
                                    objNameBox.SetName('Jeff');
                                    objTypeBox.SetPosition(5, 2);
                                    break;
                                case "capital":
                                case "small":
                                    break;
                                default:
                                    objNameBox.EnterChar(e);
                                    break;
                            }
                        });
                        break;

                }
                break;
            case 7:
                switch (e.which) {
                    case 38:
                        objTypeBox.Up();
                        break;
                    case 40:
                        objTypeBox.Down();
                        break;
                    case 39:
                        objTypeBox.Right();
                        break;
                    case 37:
                        objTypeBox.Left();
                        break;
                    case 13:
                        objTypeBox.ConfirmSelection(function (e) {
                            switch (e.toLowerCase()) {
                                case "backspace":
                                    objNameBox.Backspace();
                                    break;
                                case "ok":
                                    arrAnswers[arrAnswers.length] = objNameBox.GetPlayerName();
                                    objMessageBox.SetText('Name your pet.');
                                    objNameBox.SetName('');
                                    document.getElementById('sprite').setAttribute('src', 'img/dog.gif');
                                    objTypeBox.SetPosition(0, 0);
                                    state = 8;
                                    break;
                                case "dont care":
                                    objNameBox.SetName('Poo');
                                    objTypeBox.SetPosition(5, 2);
                                    break;
                                case "capital":
                                case "small":
                                    break;
                                default:
                                    objNameBox.EnterChar(e);
                                    break;
                            }
                        });
                        break;

                }
                break;
            case 8:
                switch (e.which) {
                    case 38:
                        objTypeBox.Up();
                        break;
                    case 40:
                        objTypeBox.Down();
                        break;
                    case 39:
                        objTypeBox.Right();
                        break;
                    case 37:
                        objTypeBox.Left();
                        break;
                    case 13:
                        objTypeBox.ConfirmSelection(function (e) {
                            switch (e.toLowerCase()) {
                                case "backspace":
                                    objNameBox.Backspace();
                                    break;
                                case "ok":
                                    arrAnswers[arrAnswers.length] = objNameBox.GetPlayerName();
                                    objMessageBox.SetText('Favorite homemade food?');
                                    objNameBox.SetName('');
                                    document.getElementById('sprite').setAttribute('src', 'img/qmark.gif');
                                    objTypeBox.SetPosition(0, 0);
                                    state = 9;
                                    break;
                                case "dont care":
                                    objNameBox.SetName('King');
                                    objTypeBox.SetPosition(5, 2);
                                    break;
                                case "capital":
                                case "small":
                                    break;
                                default:
                                    objNameBox.EnterChar(e);
                                    break;
                            }
                        });
                        break;
                }
                break;
            case 9:
                switch (e.which) {
                    case 38:
                        objTypeBox.Up();
                        break;
                    case 40:
                        objTypeBox.Down();
                        break;
                    case 39:
                        objTypeBox.Right();
                        break;
                    case 37:
                        objTypeBox.Left();
                        break;
                    case 13:
                        objTypeBox.ConfirmSelection(function (e) {
                            switch (e.toLowerCase()) {
                                case "backspace":
                                    objNameBox.Backspace();
                                    break;
                                case "ok":
                                    arrAnswers[arrAnswers.length] = objNameBox.GetPlayerName();
                                    objMessageBox.SetText('Whats your favorite thing?');
                                    objNameBox.SetName('');
                                    document.getElementById('sprite').setAttribute('src', 'img/qmark.gif');
                                    objTypeBox.SetPosition(0, 0);
                                    state = 10;
                                    break;
                                case "dont care":
                                    objNameBox.SetName('Steak');
                                    objTypeBox.SetPosition(5, 2);
                                    break;
                                case "capital":
                                case "small":
                                    break;
                                default:
                                    objNameBox.EnterChar(e);
                                    break;
                            }
                        });
                        break;
                }
                break;
            case 10:
                switch (e.which) {
                    case 38:
                        objTypeBox.Up();
                        break;
                    case 40:
                        objTypeBox.Down();
                        break;
                    case 39:
                        objTypeBox.Right();
                        break;
                    case 37:
                        objTypeBox.Left();
                        break;
                    case 13:
                        objTypeBox.ConfirmSelection(function (e) {
                            switch (e.toLowerCase()) {
                                case "backspace":
                                    objNameBox.Backspace();
                                    break;
                                case "ok":
                                    arrAnswers[arrAnswers.length] = objNameBox.GetPlayerName();
                                    //do stuff
                                    objChar1Box.SetText(arrAnswers[0]);
                                    objChar2Box.SetText(arrAnswers[1]);
                                    objChar3Box.SetText(arrAnswers[2]);
                                    objChar4Box.SetText(arrAnswers[3]);
                                    objDogBox.SetText(arrAnswers[4]);

                                    var tmpSpanElem = document.createElement('span');
                                    tmpSpanElem.setAttribute('style', 'display: block; clear: left; float: right; margin: 1em;');
                                    tmpSpanElem.appendChild(document.createTextNode(arrAnswers[5]));
                                    objFavFoodBox.SetText('Favorite food:');
                                    objFavFoodBox.GetRootElement().getElementsByClassName('displayBoxHeading')[0].appendChild(tmpSpanElem);


                                    tmpSpanElem = document.createElement('span');
                                    tmpSpanElem.setAttribute('style', 'display: block; clear: left; float: right; margin: 1em;');
                                    tmpSpanElem.appendChild(document.createTextNode(arrAnswers[6]));
                                    objCoolestThingBox.SetText('Coolest thing:');
                                    objCoolestThingBox.GetRootElement().getElementsByClassName('displayBoxHeading')[0].appendChild(tmpSpanElem);


                                    var tmpContentElem = document.getElementById('content');
                                    for (var y = 0; y < arrBoxes.length; y++) {
                                        arrBoxes[y].Hide();
                                    }

                                    objChar1Box.Show();
                                    objChar2Box.Show();
                                    objChar3Box.Show();
                                    objChar4Box.Show();
                                    objDogBox.Show();
                                    objFavFoodBox.Show();
                                    objCoolestThingBox.Show();
                                    objEndBox.Show();

                                    tmpContentElem.removeChild(document.getElementById('sprite'));

                                    var tmpImgElem = document.createElement('img');
                                    tmpImgElem.setAttribute('src', 'img/ness.gif');
                                    tmpImgElem.setAttribute('id', 'ness');
                                    tmpContentElem.appendChild(tmpImgElem);

                                    var tmpImgElem = document.createElement('img');
                                    tmpImgElem.setAttribute('src', 'img/girl.gif');
                                    tmpImgElem.setAttribute('id', 'paula');
                                    tmpContentElem.appendChild(tmpImgElem);

                                    var tmpImgElem = document.createElement('img');
                                    tmpImgElem.setAttribute('src', 'img/friend.gif');
                                    tmpImgElem.setAttribute('id', 'jeff');
                                    tmpContentElem.appendChild(tmpImgElem);

                                    var tmpImgElem = document.createElement('img');
                                    tmpImgElem.setAttribute('src', 'img/anotherfriend.gif');
                                    tmpImgElem.setAttribute('id', 'poo');
                                    tmpContentElem.appendChild(tmpImgElem);

                                    var tmpImgElem = document.createElement('img');
                                    tmpImgElem.setAttribute('src', 'img/dog.gif');
                                    tmpImgElem.setAttribute('id', 'king');
                                    tmpContentElem.appendChild(tmpImgElem);

                                    tmpContentElem.appendChild(objChar1Box.GetRootElement());
                                    tmpContentElem.appendChild(objChar2Box.GetRootElement());
                                    tmpContentElem.appendChild(objChar3Box.GetRootElement());
                                    tmpContentElem.appendChild(objChar4Box.GetRootElement());
                                    tmpContentElem.appendChild(objDogBox.GetRootElement());
                                    tmpContentElem.appendChild(objFavFoodBox.GetRootElement());
                                    tmpContentElem.appendChild(objCoolestThingBox.GetRootElement());
                                    tmpContentElem.appendChild(objEndBox.GetRootElement());
                                    state = 11;
                                    break;
                                case "dont care":
                                    objNameBox.SetName('Rock');
                                    objTypeBox.SetPosition(5, 2);
                                    break;
                                case "capital":
                                case "small":
                                    break;
                                default:
                                    objNameBox.EnterChar(e);
                                    break;
                            }
                        });
                        break;
                }
                break;
        }
    });
});