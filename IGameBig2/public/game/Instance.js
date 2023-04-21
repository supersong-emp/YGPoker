import IGameMain from "../game/IGameMain.js";
import IModeGame from "../game/IModeGame.js";

import IScreenConfig from "../js/screenconfig.js";
import IUIButton from "../js/button.js";
import IUIImage from "../js/image.js";
import ITimer from "../game/ITimer.js";

let configScreen = new IScreenConfig(0, 0, 1920, 1080, window.innerWidth, window.innerHeight);

var cScreenWidth = configScreen.m_iCurrentWidth;
var cScreenHeight = configScreen.m_iCurrentHeight;

let canvas = $('<canvas id="maincanvas" width ="' + cScreenWidth + '" height="' + cScreenHeight + '"></canvas>');
let ctx = canvas.get(0).getContext("2d");
$(canvas).appendTo('#stage');

ctx.font = 'bold 24px georgia';
ctx.shadowColor = "black";
ctx.shadowBlur = 10;
ctx.lineWidth = 7;
function IsMobile()
{
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

configScreen.listDesktopLocationsH.push({x:1300, y:880});
configScreen.listDesktopLocationsH.push({x:1500, y:880});

configScreen.listMobileLocationH.push({x:1300, y:880});
configScreen.listMobileLocationH.push({x:1500, y:880});

//  PlayerLocation
for ( let i in cPlayerLocations)
{
    configScreen.listDesktopLocationsH.push({x:cPlayerLocations[i].x+20, y:cPlayerLocations[i].y+20});
}
//  PlayerLocation
for ( let i in cPlayerLocations)
{
    configScreen.listMobileLocationH.push({x:cPlayerLocations[i].x+20, y:cPlayerLocations[i].y+20});
}
//  Panel
configScreen.listDesktopLocationsH.push({x:806, y:810-90});
configScreen.listDesktopLocationsH.push({x:806, y:880-90});
//  Panel
configScreen.listMobileLocationH.push({x:806, y:810-90});
configScreen.listMobileLocationH.push({x:806, y:880-90});

configScreen.listDesktopLocationsH.push({x:20, y:850});    //  ELocationIndex.MyInfo
configScreen.listDesktopLocationsH.push({x:50, y:50});    //  ELocationIndex.Logo
configScreen.listDesktopLocationsH.push({x:660, y:380});    //  ELocationIndex.DialogStandby
configScreen.listDesktopLocationsH.push({x:905, y:265});    //  ELocationIndex.CardDeck

configScreen.listDesktopLocationsH.push({x:960-120, y:1040-150});    //  ELocationIndex.StartButton

configScreen.listMobileLocationH.push({x:20, y:850});    //  ELocationIndex.MyInfo
configScreen.listMobileLocationH.push({x:50, y:50});    //  ELocationIndex.Logo
configScreen.listMobileLocationH.push({x:660, y:380});    //  ELocationIndex.DialogStandby
configScreen.listMobileLocationH.push({x:905, y:265});    //  ELocationIndex.CardDeck

configScreen.listMobileLocationH.push({x:960-120, y:1040-150});    //  ELocationIndex.StartButton

//  Player Types
for ( let i in cPlayerTypeLocations )
    configScreen.listDesktopLocationsH.push({x:cPlayerTypeLocations[i].x, y:cPlayerTypeLocations[i].y});    //  ELocationIndex.P1Type
for ( let i in cTableCardLocations )
    configScreen.listDesktopLocationsH.push({x:cTableCardLocations[i].x, y:cTableCardLocations[i].y});    //  ELocationIndex.TableCard1
    //  Player Types
for ( let i in cPlayerTypeLocations )
    configScreen.listMobileLocationH.push({x:cPlayerTypeLocations[i].x, y:cPlayerTypeLocations[i].y});    //  ELocationIndex.P1Type
for ( let i in cTableCardLocations )
    configScreen.listMobileLocationH.push({x:cTableCardLocations[i].x, y:cTableCardLocations[i].y});    //  ELocationIndex.TableCard1

configScreen.listDesktopLocationsH.push({x:1600, y:700});//SortButton
configScreen.listMobileLocationH.push({x:1600, y:700});
configScreen.listDesktopLocationsH.push({x:600, y:990}); //족보 버튼 8개
configScreen.listDesktopLocationsH.push({x:700, y:990});
configScreen.listDesktopLocationsH.push({x:800, y:990});
configScreen.listDesktopLocationsH.push({x:900, y:990});
configScreen.listDesktopLocationsH.push({x:1020, y:990});
configScreen.listDesktopLocationsH.push({x:1120, y:990});
configScreen.listDesktopLocationsH.push({x:1240, y:990});
configScreen.listDesktopLocationsH.push({x:1360, y:990});
configScreen.listMobileLocationH.push({x:600, y:990});
configScreen.listMobileLocationH.push({x:700, y:990});
configScreen.listMobileLocationH.push({x:800, y:990});
configScreen.listMobileLocationH.push({x:900, y:990});
configScreen.listMobileLocationH.push({x:1020, y:990});
configScreen.listMobileLocationH.push({x:1120, y:990});
configScreen.listMobileLocationH.push({x:1240, y:990});
configScreen.listMobileLocationH.push({x:1360, y:990});

configScreen.listDesktopLocationsH.push({x:1700, y:880}); // tips 버튼
configScreen.listMobileLocationH.push({x:1700, y:880});

let buttonsGame =
[
    new IUIButton(configScreen.GetLocation(ELocationIndex.StartButton).x, configScreen.GetLocation(ELocationIndex.StartButton).y, 230, 90, OnClickGameStart, imageButtons[3], 189, 71, "",0),
    new IUIButton(configScreen.GetLocation(ELocationIndex.StartButton).x, configScreen.GetLocation(ELocationIndex.StartButton).y, 230, 90, OnClickGameReady, imageButtons[12], 173, 56, "Ready",40)
];

const cBettingButtonLocations = 
[
    {x:configScreen.GetLocation(ELocationIndex.SubmitButtonPass).x, y:configScreen.GetLocation(ELocationIndex.SubmitButtonPass).y},    //  패스
    {x:configScreen.GetLocation(ELocationIndex.SubmitButtonSubmit).x, y:configScreen.GetLocation(ELocationIndex.SubmitButtonSubmit).y},    //  등록
];


let buttonsGameBetting =
[
    new IUIButton(cBettingButtonLocations[0].x, cBettingButtonLocations[0].y, 180, 110, OnClickPass, imageBetButtons[3], 288, 143, "PASS",40),
    new IUIButton(cBettingButtonLocations[1].x, cBettingButtonLocations[1].y, 180, 110, OnClickSubmit, imageBetButtons[2], 288, 143, "PLAY",40),
    new IUIButton(configScreen.GetLocation(ELocationIndex.Tips).x, configScreen.GetLocation(ELocationIndex.Tips).y, 180, 110, OnClickTips, imageBetButtons[2], 288, 143, "tips",40),
];

let mobilebuttonsGameBetting =
[
    new IUIButton(cBettingButtonLocations[0].x, cBettingButtonLocations[0].y, 180, 110, OnClickPass, imageBetButtons[3], 288, 143, "PASS",40),
    new IUIButton(cBettingButtonLocations[1].x, cBettingButtonLocations[1].y, 180, 110, OnClickSubmit, imageBetButtons[2], 288, 143, "PLAY",40),
    new IUIButton(configScreen.GetLocation(ELocationIndex.Tips).x, configScreen.GetLocation(ELocationIndex.Tips).y, 180, 110, OnClickTips, imageBetButtons[2], 288, 143, "tips",40),
];

let buttonsGameLocation =
[
    new IUIButton(configScreen.GetLocation(ELocationIndex.P1Table).x, configScreen.GetLocation(ELocationIndex.P1Table).y, 150, 150, OnClickLocation1, imageButtons[5], 169.5, 181, "",0),
    new IUIButton(configScreen.GetLocation(ELocationIndex.P2Table).x, configScreen.GetLocation(ELocationIndex.P2Table).y, 150, 150, OnClickLocation2, imageButtons[5], 169.5, 181, "",0),
    new IUIButton(configScreen.GetLocation(ELocationIndex.P3Table).x, configScreen.GetLocation(ELocationIndex.P3Table).y, 150, 150, OnClickLocation3, imageButtons[5], 169.5, 181, "",0),
    new IUIButton(configScreen.GetLocation(ELocationIndex.P4Table).x, configScreen.GetLocation(ELocationIndex.P4Table).y, 150, 150, OnClickLocation4, imageButtons[5], 169.5, 181, "",0),
    // pink
    new IUIButton(configScreen.GetLocation(ELocationIndex.P1Table).x, configScreen.GetLocation(ELocationIndex.P1Table).y, 150, 150, OnClickLocation1, imageButtons[13], 169.5, 181, "",0),
    new IUIButton(configScreen.GetLocation(ELocationIndex.P2Table).x, configScreen.GetLocation(ELocationIndex.P2Table).y, 150, 150, OnClickLocation2, imageButtons[13], 169.5, 181, "",0),
    new IUIButton(configScreen.GetLocation(ELocationIndex.P3Table).x, configScreen.GetLocation(ELocationIndex.P3Table).y, 150, 150, OnClickLocation3, imageButtons[13], 169.5, 181, "",0),
    new IUIButton(configScreen.GetLocation(ELocationIndex.P4Table).x, configScreen.GetLocation(ELocationIndex.P4Table).y, 150, 150, OnClickLocation4, imageButtons[13], 169.5, 181, "",0),
];

// let imageGameLocationArrow =
// [
//     new IUIImage(configScreen.GetLocation(ELocationIndex.P1Table).x+25, configScreen.GetLocation(ELocationIndex.P1Table).y+45, 125, 125, imageArrow, 130, 130),
//     new IUIImage(configScreen.GetLocation(ELocationIndex.P2Table).x+25, configScreen.GetLocation(ELocationIndex.P2Table).y+45, 125, 125, imageArrow, 130, 130),
//     new IUIImage(configScreen.GetLocation(ELocationIndex.P3Table).x+25, configScreen.GetLocation(ELocationIndex.P3Table).y+45, 125, 125, imageArrow, 130, 130),
//     new IUIImage(configScreen.GetLocation(ELocationIndex.P4Table).x+25, configScreen.GetLocation(ELocationIndex.P4Table).y+45, 125, 125, imageArrow, 130, 130),
//     new IUIImage(configScreen.GetLocation(ELocationIndex.P5Table).x+25, configScreen.GetLocation(ELocationIndex.P5Table).y+45, 125, 125, imageArrow, 130, 130),
//     new IUIImage(configScreen.GetLocation(ELocationIndex.P6Table).x+25, configScreen.GetLocation(ELocationIndex.P6Table).y+45, 125, 125, imageArrow, 130, 130),
//     new IUIImage(configScreen.GetLocation(ELocationIndex.P7Table).x+25, configScreen.GetLocation(ELocationIndex.P7Table).y+45, 125, 125, imageArrow, 130, 130),
//     new IUIImage(configScreen.GetLocation(ELocationIndex.P8Table).x+25, configScreen.GetLocation(ELocationIndex.P8Table).y+45, 125, 125, imageArrow, 130, 130),
//     new IUIImage(configScreen.GetLocation(ELocationIndex.P9Table).x+25, configScreen.GetLocation(ELocationIndex.P9Table).y+45, 125, 125, imageArrow, 130, 130),
// ];
//imgtextbg0~3 9 person, 4~7 6 person
let imageBG = 
[
    new IUIImage(0, 0, 1920, 1080, imageGameBG[1], 1920, 1080),
    new IUIImage(0, 0, 1920, 1080, imageGameBG[2], 1920, 1080),
    new IUIImage(0, 0, 1920, 1080, imageTextBG[0], 1920, 1080),
    new IUIImage(0, 0, 1920, 1080, imageTextBG[1], 1920, 1080),
];

// let imageTablePanel = 
// [
//     new IUIImage(configScreen.GetLocation(ELocationIndex.PanelCall).x, configScreen.GetLocation(ELocationIndex.PanelCall).y, 308, 57, imageTableTotalPanel[0], 308, 57),
//     new IUIImage(configScreen.GetLocation(ELocationIndex.PanelCall).x, configScreen.GetLocation(ELocationIndex.PanelCall).y, 308, 57, imageTableTotalPanel[1], 308, 57)
// ];

let imagesGame =
[
    new IUIImage(configScreen.GetLocation(ELocationIndex.MyInfo).x, configScreen.GetLocation(ELocationIndex.MyInfo).y, 400, 200, imageMyInfo, 400, 200),
    new IUIImage(configScreen.GetLocation(ELocationIndex.Logo).x, configScreen.GetLocation(ELocationIndex.Logo).y, 150, 50, imageLogo, 150, 50),
    new IUIImage(configScreen.GetLocation(ELocationIndex.DialogStandby).x, configScreen.GetLocation(ELocationIndex.DialogStandby).y, 600, 200, imageModeStandby, 600, 200),
    //new IUIImage(660, 380, 30, 25, imageModeStandbyDot, 105, 90)
];

let imagesGameDeck = 
[
    new IUIImage(configScreen.GetLocation(ELocationIndex.CardDeck).x, configScreen.GetLocation(ELocationIndex.CardDeck).y, 120, 40, imageGameDeck[0], 351, 136),
    new IUIImage(configScreen.GetLocation(ELocationIndex.CardDeck).x, configScreen.GetLocation(ELocationIndex.CardDeck).y, 120, 40, imageGameDeck[1], 351, 136),//blue card
    new IUIImage(configScreen.GetLocation(ELocationIndex.CardDeck).x, configScreen.GetLocation(ELocationIndex.CardDeck).y, 120, 40, imageGameDeck[2], 351, 136),
    new IUIImage(configScreen.GetLocation(ELocationIndex.CardDeck).x, configScreen.GetLocation(ELocationIndex.CardDeck).y, 120, 40, imageGameDeck[3], 351, 136),//red card
];

let sortButton =
[
    new IUIButton(configScreen.GetLocation(ELocationIndex.SortButton).x, configScreen.GetLocation(ELocationIndex.SortButton).y, 300, 113, OnClickSortNum, imageButtons[14], 368, 143, "",0),
    new IUIButton(configScreen.GetLocation(ELocationIndex.SortButton).x, configScreen.GetLocation(ELocationIndex.SortButton).y, 300, 113, OnClickSortSuit, imageButtons[15], 368, 143, "",0)
];

let madeButton =
[
    new IUIButton(configScreen.GetLocation(ELocationIndex.Single).x, configScreen.GetLocation(ELocationIndex.Single).y, 100, 50, OnClickSingle, imageBetButtons[1], 278, 148, "single",20),
    new IUIButton(configScreen.GetLocation(ELocationIndex.Pair).x, configScreen.GetLocation(ELocationIndex.Pair).y, 100, 50, OnClickPair, imageBetButtons[1], 278, 148, "pair",20),
    new IUIButton(configScreen.GetLocation(ELocationIndex.Triple).x, configScreen.GetLocation(ELocationIndex.Triple).y, 100, 50, OnClickTriple, imageBetButtons[1], 278, 148, "triple",20),
    new IUIButton(configScreen.GetLocation(ELocationIndex.Straight).x, configScreen.GetLocation(ELocationIndex.Straight).y, 120, 50, OnClickStraight, imageBetButtons[1], 278, 148, "straight",20),
    new IUIButton(configScreen.GetLocation(ELocationIndex.Flush).x, configScreen.GetLocation(ELocationIndex.Flush).y, 100, 50, OnClickFlush, imageBetButtons[1], 278, 148, "flush",20),
    new IUIButton(configScreen.GetLocation(ELocationIndex.FullHouse).x, configScreen.GetLocation(ELocationIndex.FullHouse).y, 120, 50, OnClickFullhouse, imageBetButtons[1], 278, 148, "fullhouse",20),
    new IUIButton(configScreen.GetLocation(ELocationIndex.FourOfKind).x, configScreen.GetLocation(ELocationIndex.FourOfKind).y, 120, 50, OnClickFourcard, imageBetButtons[1], 278, 148, "fourcard",20),
    new IUIButton(configScreen.GetLocation(ELocationIndex.StraightFlush).x, configScreen.GetLocation(ELocationIndex.StraightFlush).y, 140, 50, OnClickStraightFlush, imageBetButtons[1], 278, 148, "straightflush",20)
];

let Timer = new ITimer();
let Game = new IModeGame(socket, buttonsGame, imageBG, imagesGame, configScreen, Timer);
let GameMain = new IGameMain(Game, socket, configScreen, Timer);

Game.SetBg(account.strOptionCode[2]);
Game.SetDeck(account.strOptionCode[3], imagesGameDeck);
if(IsMobile()){
    Game.SetBettingButtons(mobilebuttonsGameBetting, true);
    //Game.SetSliderBar(moblieSliderBar);
}
else 
{
    Game.SetBettingButtons(buttonsGameBetting, false);
    //Game.SetSliderBar(sliderBar);
}
Game.SetLocationButtons(buttonsGameLocation);

//Game.SetLocationArrow(imageGameLocationArrow);
//Game.SetTablePanel(imageTablePanel);
Game.SetSortButton(sortButton);
Game.SetMadeButton(madeButton);

GameMain.JoinGame();

await GameMain.OnIO();

let bLoaded = false;

$(window).load( ()=> {
    //alert();
    GameMain.bRenderLoadingScreen   = false;

    bLoaded = true;
  })

let Loop = () => {

    Timer.UpdateEnd();

    GameMain.Update();
    GameMain.Render(ctx);

    if ( false == bLoaded )
    {
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0,1920, 1080);

        ctx.drawImage(
        imageLogo, 
        0, 
        0, 
        305, 
        114, 
        100, 
        100, 
        305, 
        114);
    }

    Timer.UpdateStart();
}

let MainLoop = setInterval(Loop, 16);

var canvasPosition = {
    x: canvas.offset().left,
    y: canvas.offset().top
  };

//canvas.on('click', function(e) {
$(document).on('click', '#stage', (e) => {
    var mouse = {
        x: e.clientX - canvasPosition.x,
        y: e.clientY - canvasPosition.y + window.pageYOffset
      };
    GameMain.OnClick(mouse);
});

//canvas.on('mousemove', function(e) {
$(document).on('mousemove', '#stage', (e) => {

    var mouse = {
        x: e.clientX - canvasPosition.x,
        y: e.clientY - canvasPosition.y + window.pageYOffset
      };
    GameMain.OnMouseMove(mouse);
});

//canvas.on('mousedown', function(e) {
$(document).on('mousedown', '#stage', (e) => {

    var mouse = {
        x: e.clientX - canvasPosition.x,
        y: e.clientY - canvasPosition.y + window.pageYOffset
      };
    GameMain.OnMouseDown(mouse);
});

//canvas.on('mouseup', function(e) {
$(document).on('mouseup', '#stage', (e) => {
    var mouse = {
        x: e.clientX - canvasPosition.x,
        y: e.clientY - canvasPosition.y + window.pageYOffset
      };
    // var mouse = {
    //     x: e.pageX - canvasPosition.x,
    //     y: e.pageY - canvasPosition.y
    // }
    GameMain.OnMouseUp(mouse);
});

$(document).on('touchstart', '#stage', (e) => {
    var mouse = {
        x: e.clientX - canvasPosition.x,
        y: e.clientY - canvasPosition.y + window.pageYOffset
      };
    // var mouse = {
    //     x: e.pageX - canvasPosition.x,
    //     y: e.pageY - canvasPosition.y
    // }
    GameMain.OnMouseUp(mouse);
});

$(document).on('touchmove', '#stage', (e) => {
    var mouse = {
        x: e.clientX - canvasPosition.x,
        y: e.clientY - canvasPosition.y + window.pageYOffset
      };
    // var mouse = {
    //     x: e.pageX - canvasPosition.x,
    //     y: e.pageY - canvasPosition.y
    // }
    GameMain.OnMouseUp(mouse);
});

let OnSize = () =>
{
    cScreenWidth = window.innerWidth;
    cScreenHeight = window.innerHeight;

    configScreen.OnSize(cScreenWidth, cScreenHeight);

    //console.log(configScreen);

    //console.log(`OnSize width : ${cScreenWidth}, height : ${cScreenHeight}`);

    GameMain.OnSize(configScreen.m_fWidthRate, configScreen.m_fHeightRate);

    canvas = $('<canvas width ="' + cScreenWidth + '" height="' + cScreenHeight + '"></canvas>');
    ctx = canvas.get(0).getContext("2d");
    $('#stage').empty();
    let tag2 = '';
    let tag = `
    <div id="popup_setting" class="setting-wrap" style="position: absolute; z-index: 12; top:50%; left:50%; transform:translate(-50%, -50%); text-align: center; opacity:0.95;">
    <div class="close"><a href="javascript:OnClickSettingClose();"><img src="images/close_menu.svg"></a></div>
    <div class="setting-form">
        <div class="title">설정</div>
        <div class="form">
            <ul>
                <li>리바인</li>
                <li>
                    <span><input type="radio" id="radioRebuyInOn" name="radioRebuyin"><font>on</font></span>
                    <span><input type="radio" id="radioRebuyInOff" name="radioRebuyin"><font>off</font></span>
                </li>
            </ul>
            <ul>
                <li>리바인 설정</li>
                <li>
                    <select id="selectRebuyIn">
                        <option value="100">100%</option>
                        <option value="200">200%</option>
                        <option value="300">300%</option>
                    </select>
                </li>
            </ul>
        </div>
        <button onclick="OnClickManualRebuyin();">수동 리바인</button>
        <button style="opacity:1.0" onclick="OnClickModifySetting();">수정</button>
    </div>`;
    if(IsMobile())
    {
        tag2 = `
        <div class="header-wrap" style="position: absolute; z-index: 11; top:0%; right:0%;">
        <div class="head-top"> 
                <span class="user-nav">
                    <ul>
                        <li><a href="javascript:OnClickClose();"><img src="images/close_menu.svg"></a></li>
                        <li>나가기</li>
                    </ul>

                    <ul>
                        <li><a href="javascript:OnClickSetting();"><img src="images/setting_icon.svg"></a></li>
                        <li>설정</li>
                    </ul>
                </span>
            </div>
        </div>
        `;
    }
    else 
    {
        tag2 = `
        <div class="header-wrap" style="position: absolute; z-index: 11; top:0%; right:0%;">
        <div class="head-top"> 
                <span class="user-nav">
                    <ul class="openFullscreen">
                        <li><img src="images/full_size.svg"></li>
                        <li>전체화면</li>
                    </ul>
                    <ul>
                        <li><a href="javascript:OnClickSetting();"><img src="images/setting_icon.svg"></a></li>
                        <li>설정</li>
                    </ul>
                    <ul>
                        <li><a href="javascript:OnClickClose();"><img src="images/close_menu.svg"></a></li>
                        <li>나가기</li>
                    </ul>
                </span>
            </div>
        </div>
        `;
    }
    $('#stage').append(tag);
    $('#stage').append(tag2);

    $('#popup_setting').hide();
    //$('.header-wrap').hide();

    let iRebuyIn = account.strOptionCode[0];
    let iRebuyInLevel = account.strOptionCode[1];

    if ( iRebuyIn == 0 )
    {
        $('#radioRebuyInOff').prop('checked', true);
        $('#radioRebuyInOn').prop('checked', false);
    }
    else
    {
        $('#radioRebuyInOff').prop('checked', false);
        $('#radioRebuyInOn').prop('checked', true);                
    }
    $('#selectRebuyIn').val(parseInt(iRebuyInLevel)*100);

    
    $(canvas).appendTo('#stage');

    canvasPosition = {
        x: canvas.offset().left,
        y: canvas.offset().top
      };
}

OnSize();

window.addEventListener('resize', OnSize, false);