function zeroPad(nr,base){
    var  len = (String(base).length - String(nr).length)+1;
    return len > 0? new Array(len).join('0')+nr : nr;
}

//  Logo
var imageLogo = new Image();
imageLogo.onload = ()=> {
}
imageLogo.src = "images/logo_main.png"; //  305 x 114

// progressbar
var imageProgressBar = [];
for ( var i = 0; i < 3; ++i)
{
    imageProgressBar.push(new Image());
    imageProgressBar[i].src = `img/progressbar${zeroPad(i, 2)}.png`;  //  200 X 34
}

var NumberImages = [];
for ( var i = 0; i < 10; ++i)
{
    NumberImages.push(new Image());
    NumberImages[i].src = `img/numbers/n01${zeroPad(i, 10)}.png`;
}

var NumberImages3 = [];
for ( var i = 0; i < 10; ++i)
{
    NumberImages3.push(new Image());
    NumberImages3[i].src = `img/numbers/n03${zeroPad(i, 10)}.png`;
}
// var ButtonImages = [];
// for ( var i = 0; i < 2; ++i)
// {
//     ButtonImages.push(new Image());
//     ButtonImages[i].src = `img/button${i.toString()}.png`;
// }

// var SliderImages = [];
// for ( i = 0; i < 1; ++ i )
// {
//     SliderImages.push(new Image());
//     SliderImages[i].src = `img/slider${i.toString()}.png`;    
// }

//  BG
var imageGameBG = [];
for ( var i = 0; i < 3; ++i)
{
    imageGameBG.push(new Image());
    imageGameBG[i].src = `img/game/bg0${i.toString()}.png`;
}
// bgtext00~03 9 person, bgtext04~07 6 person
var imageTextBG = [];
for ( var i = 0; i < 2; ++i)
{
    imageTextBG.push(new Image());
    imageTextBG[i].src = `img/game/bgtext0${i.toString()}.png`;
}

//card deck
var imageGameDeck = [];
for ( var i = 0; i < 4; ++i)
{
    imageGameDeck.push(new Image());
    imageGameDeck[i].src = `img/game/deck0${i.toString()}.png`;
}

// var imageBGHoldem = new Image();
//     imageBGHoldem.onload = ()=> {
// }
// imageBGHoldem.src = "img/holdem_gamebg.png";

// var imageTable = new Image();
// imageTable.onload = ()=> {
// }
// imageTable.src = "img/holdem_table.png"; //  1544 x 770

// //  Betting Panel
// var imageBettingPanel = new Image();
// imageBettingPanel.onload = ()=> {
// }
// imageBettingPanel.src = "img/bettingpanel.png"; //  731 x 230

//  Betting Button
// var imageBettingButton = new Image();
// imageBettingButton.onload = ()=> {
// }
// imageBettingButton.src = "img/game/button_bet.png"; //  731 x 230

var imageBetButtons = [];
for ( var i = 0; i < 6; ++i)
{
    imageBetButtons.push(new Image());
    imageBetButtons[i].src = `img/game/button_bet${zeroPad(i, 2)}.png`;
}

var imageButtons = [];
for ( var i = 0; i < 9; ++i)
{
    imageButtons.push(new Image());
    imageButtons[i].src = `img/game/button_${zeroPad(i, 2)}.png`;
}

var imageModeStandby = new Image();
imageModeStandby.onload = ()=> {
}
imageModeStandby.src = "img/modestandby.png"; //  200 x 6

var imageModeStandbyDot = new Image();
imageModeStandbyDot.onload = ()=> {
}
imageModeStandbyDot.src = "img/modestandbydot.png";

//  Chips
var imageChips = [];
for ( var i = 0; i < 13; ++i)
{
    imageChips.push(new Image());
    imageChips[i].src = `img/chip/chip${zeroPad(i, 2)}.png`;

    //console.log(`img/chip/chip${zeroPad(i, 2)}.png`);
}

//  Total
var imageTableTotalPanel = [];
for ( var i = 0; i < 2; ++i)
{
    imageTableTotalPanel.push(new Image());
    imageTableTotalPanel[i].src = `img/tabletotalpanel${zeroPad(i, 10)}.png`; //  308 x 57
}


//  Call
var imageTableCallPanel = [];
for ( var i = 0; i < 2; ++i)
{
    imageTableCallPanel.push(new Image());
    imageTableCallPanel[i].src = `img/tablecallpanel${zeroPad(i, 10)}.png`; //  308 x 57
}

var imageMyInfo = new Image();
imageMyInfo.onload = ()=> {
}
imageMyInfo.src = "img/myinfo.png"; //  300 x 100

// //  My Character
// var imageUserAvatarBase = new Image();
// imageUserAvatarBase.onload = ()=> {
// }
// imageUserAvatarBase.src = "img/useravatarbase.png"; //  245 x 245

// var imageUserAvatarPanel = new Image();
// imageUserAvatarPanel.onload = ()=> {
// }
// imageUserAvatarPanel.src = "img/useravatarpanel.png"; //  269 x 269

// var imageUserAvatarTimeline = new Image();
// imageUserAvatarTimeline.onload = ()=> {
// }
// imageUserAvatarTimeline.src = "img/useravatartimeline.png"; //  303 x 303

// var imageUserBasePanel = new Image();
// imageUserBasePanel.onload = ()=> {
// }
// imageUserBasePanel.src = "img/userbasepanel.png"; //  235 x 100

var imageUserPanel = new Image();
imageUserPanel.onload = ()=> {
}
imageUserPanel.src = "img/userpanel.png"; //  357 x 55

//  Other Character
var imageOtherAvatarBase = new Image();
imageOtherAvatarBase.onload = ()=> {
}
imageOtherAvatarBase.src = "img/otheravatarbase.png"; //  160 x 160

var imageOtherAvatarPanel = new Image();
imageOtherAvatarPanel.onload = ()=> {
}
imageOtherAvatarPanel.src = "img/otheravatarpanel.png"; //  172 x 172

var imageOtherAvatarTimeline = new Image();
imageOtherAvatarTimeline.onload = ()=> {
}
imageOtherAvatarTimeline.src = "img/otheravatartimeline.png"; //  186 x 186

var imageOtherBasePanel = new Image();
imageOtherBasePanel.onload = ()=> {
}
imageOtherBasePanel.src = "img/otherbasepanel.png"; //  241 x 102

var imageOtherfold = new Image();
imageOtherfold.onload = ()=> {
}
imageOtherfold.src = "img/otheravatarfold.png"; //  172 x 171

// //  Logo
// var imageLogo = new Image();
// imageLogo.onload = ()=> {
// }
// imageLogo.src = "images/logo_main.png"; //  305 x 114


//  Player Type
var imagePlayerType = new Image();
imagePlayerType.onload = ()=> {
}
imagePlayerType.src = "img/playertype00.png";

//  Card Panel
var imageBettings = [];
for ( var i = 0; i < 2; ++i)
{
    imageBettings.push(new Image());
    imageBettings[i].src = `img/betting${zeroPad(i, 10)}.png`;  //  188 x 50
}

//winner
var imageWinner = new Image();
imageWinner.onload = ()=> {
}
imageWinner.src = "img/winner.png"; //  305 x 114

//winner wing
var imageWinnerWing = new Image();
imageWinnerWing.onload = ()=> {
}
imageWinnerWing.src = "img/winnerwing.png";

//win ceremony
var imageWinCeremony = new Image();
imageWinCeremony.onload = ()=> {
}
imageWinCeremony.src = "img/winceremony.png"; 

//ranking
var imageRank = [];
for ( var i = 0; i < 4; ++i)
{
    imageRank.push(new Image());
    imageRank[i].src = `img/rank${zeroPad(i, 2)}.png`;  //  200 X 34
}

//  Card Images
var imageCards = [];
for ( var i = 0; i < 54; ++i)
{
    imageCards.push(new Image());
    imageCards[i].src = `img/cards/card${zeroPad(i, 10)}.png`;  //  163 x 227
}

var imageCardFrames = [];
for ( var i = 0; i < 2; ++i)
{
    imageCardFrames.push(new Image());
    imageCardFrames[i].src = `img/cards/cardframe${zeroPad(i, 10)}.png`;  //  163 x 227
}

var imageHighNum = [];
for ( var i = 0; i < 13; ++i)
{
    imageHighNum.push(new Image());
    imageHighNum[i].src = `img/madetype/high${zeroPad(i, 10)}.png`;  //  452 x 74
}

var imageComma = new Image();
imageComma.onload = ()=> {
}
imageComma.src = "img/madetype/comma.png"; 

var imagePokerHand = [];
for ( var i = 0; i < 11; ++i)
{
    imagePokerHand.push(new Image());
    imagePokerHand[i].src = `img/madetype/hand${zeroPad(i, 10)}.png`;  //  452 x 74
}
var imagePokerHigh = [];
for ( var i = 0; i < 13; ++i)
{
    imagePokerHigh.push(new Image());
    imagePokerHigh[i].src = `img/madetype/high${zeroPad(i, 10)}.png`;  //  452 x 74
}

// var imagePokerHand = [];
// for ( var i = 0; i < 9; ++i)
// {
//     imagePokerHand.push(new Image());
//     imagePokerHand[i].src = `img/hand${zeroPad(i, 10)}.png`;  //  452 x 74
// }

var imageAvatar = [];
for ( var i = 0; i < 33; ++i)
{
    imageAvatar.push(new Image());
    imageAvatar[i].src = `img/avatars/avatar${zeroPad(i, 10)}.png`;  //  452 x 74
}

var landscapeImg = new Image();
landscapeImg.onload = ()=> {
}
landscapeImg.src = "img/game/landscape.png";

var verticalImg = new Image();
verticalImg.onload = ()=> {
}
verticalImg.src = "img/game/vertical.png";

var AndroidlandscapeImg = new Image();
AndroidlandscapeImg.onload = ()=> {
}
AndroidlandscapeImg.src = "img/game/android_landscape.png";

var AndroidverticalImg = new Image();
AndroidverticalImg.onload = ()=> {
}
AndroidverticalImg.src = "img/game/adroid_vertical.png";

var mobileRaiseBar = new Image();
mobileRaiseBar.onload = ()=> {
}
mobileRaiseBar.src = "img/game/raisebar.png";

let soundPlaceCard = new Audio('sounds/placecard.mp3');

let soundBettingType = [];
for ( var i = 0; i < 8; ++i)
{
    soundBettingType.push(new Audio(`sounds/betting0${i}.mp3`));
}

let soundGameStart = new Audio('sounds/gamestart.mp3');
let soundGameEnd = new Audio('sounds/gameend.mp3');
let soundGameWin = new Audio('sounds/gamewin.mp3');
let soundPlaceUser = new Audio('sounds/placeuser.mp3');
let soundLeaveUser = new Audio('sounds/leaveuser.mp3');

let soundClick = new Audio('sounds/click.mp3');
let soundEnableBetting = new Audio('sounds/enablebetting.mp3');
let soundEnableStartGame = new Audio('sounds/enablestartgame.mp3');

let soundChipThrow = new Audio('sounds/chipthrow.mp3');
let soundShowDown = new Audio('sounds/showdown.mp3');
let soundHertBeat = new Audio('sounds/hertbeat.mp3');

let soundcardflop = new Audio('sounds/cardflop.mp3');
let soundcardturn = new Audio('sounds/cardturn.mp3');
let soundcardriver = new Audio('sounds/cardriver.mp3');