import IGameMain from "../game/IGameMain.js";
import IModeGame from "../game/IModeGame.js";

import IScreenConfig from "../js/screenconfig.js";
import IResourceManager from "../js/resourcemanager.js";
import IUILabel from "../js/label.js";
import IUISlider from "../js/slider.js";
import IUIButton from "../js/button.js";
import IUIImage from "../js/image.js";
import ITimer from "../game/ITimer.js";

function IsMobile()
{
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
var isFullscreen = false;
function checkFullscreen() {
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
        isFullscreen = true;
    } else {
        isFullscreen = false;
    }
}
//let configScreen = new IScreenConfig(0, 0, 1920, 1080, window.innerWidth, window.innerHeight);
let configScreen = null;
//let fullscreenResized = false;

if(IsMobile())
{
    configScreen = new IScreenConfig(0, 0, 1080, 1920, window.innerWidth, window.innerHeight, 'Mobile');
}
else
{
    configScreen = new IScreenConfig(0, 0, 1920, 1080, window.innerWidth, window.innerHeight, 'Desktop');
}

let ResourceManager = new IResourceManager();

var cScreenWidth = configScreen.m_iCurrentWidth;
var cScreenHeight = configScreen.m_iCurrentHeight;

let canvas = $('<canvas id="maincanvas" width ="' + cScreenWidth + '" height="' + cScreenHeight + '"></canvas>');
let ctx = canvas.get(0).getContext("2d");
$(canvas).appendTo('#stage');

ctx.font = 'bold 24px georgia';
ctx.shadowColor = "black";
ctx.shadowBlur = 10;
ctx.lineWidth = 7;

configScreen.LoadLocation('location.ini', configScreen.ProcessLocation, configScreen.listDH, configScreen.listDV, configScreen.listMH, configScreen.listMV);
ResourceManager.LoadResource('resource.ini', ResourceManager.ProcessResource, ResourceManager.listImages, ResourceManager.listLoads);

let buttonsGame = [];
let cBettingButtonLocations = [];
let buttonsGameBetting = [];
let mobilebuttonsGameBetting = [];
let buttonsGameLocation = [];
let imageBG = [];
let imageTablePanel = [];
let imagesGame = [];
let imagesGameDeck = [];
let buttonSlider = null;
let sliderBar = [];
let moblieSliderBar = [];
let sliderButton = [];

let Timer = new ITimer();
let Game = null;
let GameMain = null;



let bInit = false;
let bLoaded = false;

$(window).load( ()=> {
    //alert();

    //Init();

    //GameMain.bRenderLoadingScreen   = false;

    bLoaded = true;

    //bInit = true;
  })

let Loop = () => {

    Timer.UpdateEnd();

    console.log();
    if ( bInit == false && ResourceManager.bComplete == false )
    {
        console.log(`ResourceManager.listLoads.length : ${ResourceManager.listLoads.length}, ResourceManager.listImages.length : ${ResourceManager.listImages.length}`);

        if ( configScreen.listDH.length >= 68 && ResourceManager.listImages.length != 0 && ResourceManager.listLoads.length == ResourceManager.listImages.length )
        {
            Init();

            GameMain.bRenderLoadingScreen   = false;

            bInit = true;

            ResourceManager.bComplete = true;

            console.log(`### LoadComplete!`);
        }
    }

    if ( bInit == true )
    {
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
    }


    Timer.UpdateStart();
}

let Init = async () => {

cBettingButtonLocations = 
[
    {x:configScreen.GetPosition(EPositionIndex.BetButtonQuater).x, y:configScreen.GetPosition(EPositionIndex.BetButtonQuater).y},    //  Quater
    {x:configScreen.GetPosition(EPositionIndex.BetButtonHalf).x, y:configScreen.GetPosition(EPositionIndex.BetButtonHalf).y},    //  Half
    {x:configScreen.GetPosition(EPositionIndex.BetButtonFull).x, y:configScreen.GetPosition(EPositionIndex.BetButtonFull).y},    //  Full
    {x:configScreen.GetPosition(EPositionIndex.BetButtonCall).x, y:configScreen.GetPosition(EPositionIndex.BetButtonCall).y},    //  Call
    {x:configScreen.GetPosition(EPositionIndex.BetButtonFold).x, y:configScreen.GetPosition(EPositionIndex.BetButtonFold).y},    //  Fold
    {x:configScreen.GetPosition(EPositionIndex.BetButtonCheck).x, y:configScreen.GetPosition(EPositionIndex.BetButtonCheck).y},    //  Check
    {x:configScreen.GetPosition(EPositionIndex.BetButtonRaise).x, y:configScreen.GetPosition(EPositionIndex.BetButtonRaise).y},    //  Raise
    {x:configScreen.GetPosition(EPositionIndex.plusButton).x, y:configScreen.GetPosition(EPositionIndex.plusButton).y},    //  plus
    {x:configScreen.GetPosition(EPositionIndex.minusButton).x, y:configScreen.GetPosition(EPositionIndex.minusButton).y},    //  minus
    {x:configScreen.GetPosition(EPositionIndex.sliderBar).x, y:configScreen.GetPosition(EPositionIndex.sliderBar).y},    //  slider
    {x:configScreen.GetPosition(EPositionIndex.RaiseButton1).x, y:configScreen.GetPosition(EPositionIndex.RaiseButton1).y},    //  RaiseButton1
    {x:configScreen.GetPosition(EPositionIndex.RaiseButton2).x, y:configScreen.GetPosition(EPositionIndex.RaiseButton2).y},    //  RaiseButton2
    {x:configScreen.GetPosition(EPositionIndex.RaiseButton3).x, y:configScreen.GetPosition(EPositionIndex.RaiseButton3).y},    //  RaiseButton3
    {x:configScreen.GetPosition(EPositionIndex.RaiseButton4).x, y:configScreen.GetPosition(EPositionIndex.RaiseButton4).y},    //  RaiseButton4
];


buttonsGame =
[
    new IUIButton(configScreen.GetPosition(EPositionIndex.StartButton).x, configScreen.GetPosition(EPositionIndex.StartButton).y, 230, 90, OnClickGameStart, imageButtons[3], 189, 71, ""),
    new IUIButton(configScreen.GetPosition(EPositionIndex.Chat).x, configScreen.GetPosition(EPositionIndex.Chat).y, 100, 74, OnClickGameChat, imageChat, 100, 74, ""),
    new IUIButton(configScreen.GetPosition(EPositionIndex.GameLog).x, configScreen.GetPosition(EPositionIndex.GameLog).y, 100, 74, OnClickGamelog, imageGamelog, 100, 74, ""),
    new IUIButton(configScreen.GetPosition(EPositionIndex.ShowCard).x, configScreen.GetPosition(EPositionIndex.ShowCard).y, 200, 90, OnClickShowCard, cardOpenButton, 100, 45, "")

];

buttonsGameBetting =
[
    new IUIButton(cBettingButtonLocations[0].x, cBettingButtonLocations[0].y, 140, 80, OnClickQuater, imageBetButtons[0], 495.75, 250, "쿼터"),
    new IUIButton(cBettingButtonLocations[1].x, cBettingButtonLocations[1].y, 140, 80, OnClickHalf, imageBetButtons[0], 495.75, 250, "하프"),
    new IUIButton(cBettingButtonLocations[2].x, cBettingButtonLocations[2].y, 140, 80, OnClickFull, imageBetButtons[0], 495.75, 250, "풀"),

    new IUIButton(cBettingButtonLocations[3].x, cBettingButtonLocations[3].y, 180, 100, OnClickCall, imageBetButtons[0], 495.75, 250, "콜",'blue'),
    new IUIButton(cBettingButtonLocations[4].x, cBettingButtonLocations[4].y, 180, 100, OnClickFold, imageBetButtons[0], 495.75, 250, "폴드",'gray'),
    new IUIButton(cBettingButtonLocations[5].x, cBettingButtonLocations[5].y, 180, 100, OnClickCheck, imageBetButtons[0], 495.75, 250, "체크",'yellow'),
    new IUIButton(cBettingButtonLocations[6].x, cBettingButtonLocations[6].y, 180, 100, OnclickMobileRaise, imageBetButtons[0], 495.75, 250, "레이스",'red'),
];

mobilebuttonsGameBetting =
[
    new IUIButton(cBettingButtonLocations[0].x, cBettingButtonLocations[0].y, 140, 80, OnClickMobileQuater, imageBetButtons[2], 278, 78, "QUARTER"),
    new IUIButton(cBettingButtonLocations[1].x, cBettingButtonLocations[1].y, 140, 80, OnClickMobileHalf, imageBetButtons[2], 278, 78, "HALF"),
    new IUIButton(cBettingButtonLocations[2].x, cBettingButtonLocations[2].y, 140, 80, OnClickMobileFull, imageBetButtons[2], 278, 78, "FULL"),

    new IUIButton(cBettingButtonLocations[3].x, cBettingButtonLocations[3].y, 350, 100, OnClickMobileCall, imageBetButtons[4], 278, 78,"콜",'blue'),
    new IUIButton(cBettingButtonLocations[4].x, cBettingButtonLocations[4].y, 350, 100, OnClickMobileFold, imageBetButtons[3], 278, 78, "폴드",'gray'),
    new IUIButton(cBettingButtonLocations[5].x, cBettingButtonLocations[5].y, 350, 100, OnClickMobileCheck, imageBetButtons[4], 278, 78, "체크",'yellow'),
    new IUIButton(cBettingButtonLocations[6].x, cBettingButtonLocations[6].y, 350, 100, OnclickMobileRaise, imageBetButtons[2], 278, 78, "레이스",'red'),
];

buttonsGameLocation =
[
    new IUIButton(configScreen.GetPosition(EPositionIndex.Player1).x, configScreen.GetPosition(EPositionIndex.Player1).y, 150, 150, OnClickLocation1, imageButtons[5], 180, 184, ""),
    new IUIButton(configScreen.GetPosition(EPositionIndex.Player2).x, configScreen.GetPosition(EPositionIndex.Player2).y, 150, 150, OnClickLocation2, imageButtons[5], 180, 184, ""),
    new IUIButton(configScreen.GetPosition(EPositionIndex.Player3).x, configScreen.GetPosition(EPositionIndex.Player3).y, 150, 150, OnClickLocation3, imageButtons[5], 180, 184, ""),
    new IUIButton(configScreen.GetPosition(EPositionIndex.Player4).x, configScreen.GetPosition(EPositionIndex.Player4).y+20, 150, 150, OnClickLocation4, imageButtons[5], 180, 184, ""),
    new IUIButton(configScreen.GetPosition(EPositionIndex.Player5).x, configScreen.GetPosition(EPositionIndex.Player5).y, 150, 150, OnClickLocation5, imageButtons[5], 180, 184, ""),
    new IUIButton(configScreen.GetPosition(EPositionIndex.Player6).x, configScreen.GetPosition(EPositionIndex.Player6).y, 150, 150, OnClickLocation6, imageButtons[5], 180, 184, ""),
    new IUIButton(configScreen.GetPosition(EPositionIndex.Player7).x, configScreen.GetPosition(EPositionIndex.Player7).y+20, 150, 150, OnClickLocation7, imageButtons[5], 180, 184, ""),
    new IUIButton(configScreen.GetPosition(EPositionIndex.Player8).x, configScreen.GetPosition(EPositionIndex.Player8).y, 150, 150, OnClickLocation8, imageButtons[5], 180, 184, ""),
    new IUIButton(configScreen.GetPosition(EPositionIndex.Player9).x, configScreen.GetPosition(EPositionIndex.Player9).y, 150, 150, OnClickLocation9, imageButtons[5], 180, 184, ""),
];

imageBG =
[
    new IUIImage(0, 0, 1920, 1080, ResourceManager.GetImage(EImageIndex.BG01).image, 1920, 1080),
    new IUIImage(0, 0, 1920, 1080, ResourceManager.GetImage(EImageIndex.BG02).image, 1920, 1080),
    new IUIImage(0, 0, 1080, 1920, ResourceManager.GetImage(EImageIndex.BG03).image, 768, 1365),
    new IUIImage(0, 0, 1080, 1920, ResourceManager.GetImage(EImageIndex.BG04).image, 768, 1365),

    new IUIImage(0, 0, 1920, 1080, ResourceManager.GetImage(EImageIndex.BGText01).image, 1920, 1080),
    new IUIImage(0, 0, 1920, 1080, ResourceManager.GetImage(EImageIndex.BGText02).image, 1920, 1080),
    new IUIImage(0, 0, 1920, 1080, ResourceManager.GetImage(EImageIndex.BGText03).image, 1920, 1080),
    new IUIImage(0, 0, 1920, 1080, ResourceManager.GetImage(EImageIndex.BGText04).image, 1920, 1080),
];

imageTablePanel =
[
    new IUIImage(configScreen.GetPosition(EPositionIndex.PanelCall).x, configScreen.GetPosition(EPositionIndex.PanelCall).y, 308, 57, ResourceManager.GetImage(EImageIndex.BGTableTotalPanel01).image, 308, 57),
    new IUIImage(configScreen.GetPosition(EPositionIndex.PanelTotal).x, configScreen.GetPosition(EPositionIndex.PanelTotal).y, 308, 57, ResourceManager.GetImage(EImageIndex.BGTableCallPanel01).image, 308, 57),
    new IUIImage(configScreen.GetPosition(EPositionIndex.PanelCall).x, configScreen.GetPosition(EPositionIndex.PanelCall).y, 308, 57, ResourceManager.GetImage(EImageIndex.BGTableTotalPanel02).image, 308, 57),
    new IUIImage(configScreen.GetPosition(EPositionIndex.PanelTotal).x, configScreen.GetPosition(EPositionIndex.PanelTotal).y, 308, 57, ResourceManager.GetImage(EImageIndex.BGTableCallPanel02).image, 308, 57),

];

imagesGame =
[
    new IUIImage(configScreen.GetPosition(EPositionIndex.MyInfo).x, configScreen.GetPosition(EPositionIndex.MyInfo).y, 400, 200, imageMyInfo, 400, 200),// 위치만 일단 logo 위치로 잡아둔거임.
    new IUIImage(configScreen.GetPosition(EPositionIndex.DialogStandby).x, configScreen.GetPosition(EPositionIndex.DialogStandby).y, 600, 200, imageModeStandby, 600, 200),
];

imagesGameDeck =
[
    new IUIImage(configScreen.GetPosition(EPositionIndex.CardDeck).x, configScreen.GetPosition(EPositionIndex.CardDeck).y, 120, 40, ResourceManager.GetImage(EImageIndex.BGTableDeck01).image, 351, 136),
    new IUIImage(configScreen.GetPosition(EPositionIndex.CardDeck).x, configScreen.GetPosition(EPositionIndex.CardDeck).y, 120, 40, ResourceManager.GetImage(EImageIndex.BGTableDeck02).image, 351, 136),//blue card
    new IUIImage(configScreen.GetPosition(EPositionIndex.CardDeck).x, configScreen.GetPosition(EPositionIndex.CardDeck).y, 120, 40, ResourceManager.GetImage(EImageIndex.BGTableDeck03).image, 351, 136),
    new IUIImage(configScreen.GetPosition(EPositionIndex.CardDeck).x, configScreen.GetPosition(EPositionIndex.CardDeck).y, 120, 40, ResourceManager.GetImage(EImageIndex.BGTableDeck04).image, 351, 136),//red card
];
buttonSlider = new IUIButton(50, 80, 50, 80, null,imageButtons[6], 50, 80, "");
sliderBar =
[
    new IUISlider(configScreen.GetPosition(EPositionIndex.MobileSliderBar).x, configScreen.GetPosition(EPositionIndex.MobileSliderBar).y, 50, 400, imageSliderBar, 27, 200, buttonSlider,1),
    new IUIButton(cBettingButtonLocations[7].x, cBettingButtonLocations[7].y, 140, 80, OnClickPlus, imageButtons[9], 50, 50, ""),
    new IUIButton(cBettingButtonLocations[8].x, cBettingButtonLocations[8].y, 140, 80, OnClickMinus, imageButtons[8], 50, 50, ""),
    new IUIButton(cBettingButtonLocations[10].x, cBettingButtonLocations[10].y, 80, 80, OnClickAllin, imageButtons[7], 50, 50, "올인"),
    new IUIButton(cBettingButtonLocations[11].x, cBettingButtonLocations[11].y, 80, 80, OnClickFull, imageButtons[7], 50, 50, "풀"),
    new IUIButton(cBettingButtonLocations[12].x, cBettingButtonLocations[12].y, 80, 80, OnClickHalf, imageButtons[7], 50, 50, "하프"),
    new IUIButton(cBettingButtonLocations[13].x, cBettingButtonLocations[13].y, 80, 80, OnClickQuater, imageButtons[7], 50, 50, "쿼터"),
];

moblieSliderBar =
[
    new IUISlider(configScreen.GetPosition(EPositionIndex.MobileSliderBar).x, configScreen.GetPosition(EPositionIndex.MobileSliderBar).y, 230, 620, imageMobileSliderBar, 230, 620, '',1),
];

sliderButton = [
    new IUIButton(cBettingButtonLocations[7].x, cBettingButtonLocations[7].y, 80, 80, OnClickPlus, imageButtons[9], 50, 50, ""),
    new IUIButton(cBettingButtonLocations[8].x, cBettingButtonLocations[8].y, 80, 80, OnClickMinus, imageButtons[8], 50, 50, ""),
    new IUIButton(cBettingButtonLocations[10].x, cBettingButtonLocations[10].y, 80, 80, OnClickAllin, imageButtons[7], 50, 50, "올인"),
    new IUIButton(cBettingButtonLocations[11].x, cBettingButtonLocations[11].y, 80, 80, OnClickFull, imageButtons[7], 50, 50, "풀"),
    new IUIButton(cBettingButtonLocations[12].x, cBettingButtonLocations[12].y, 80, 80, OnClickHalf, imageButtons[7], 50, 50, "하프"),
    new IUIButton(cBettingButtonLocations[13].x, cBettingButtonLocations[13].y, 80, 80, OnClickQuater, imageButtons[7], 50, 50, "쿼터"),
];

Game = new IModeGame(socket, buttonsGame, imageBG, imagesGame, configScreen, Timer, IsMobile());
GameMain = new IGameMain(Game, socket, configScreen, Timer);

Game.SetBg(account.strOptionCode[2]);
Game.SetDeck(account.strOptionCode[3], imagesGameDeck);
Game.SetSliderBar(moblieSliderBar,sliderButton);
if(IsMobile()){
    Game.SetBettingButtons(mobilebuttonsGameBetting);
}
else
{
    Game.SetBettingButtons(buttonsGameBetting);
}
Game.SetLocationButtons(buttonsGameLocation);

//Game.SetLocationArrow(imageGameLocationArrow);
Game.SetTablePanel(imageTablePanel);

GameMain.JoinGame();

await GameMain.OnIO();

GameMain.OnSize(configScreen.m_fWidthRate, configScreen.m_fHeightRate);
}


let MainLoop = setInterval(Loop, 16);

var canvasPosition = {
    x: canvas.offset().left,
    y: canvas.offset().top
  };

//canvas.on('click', function(e) {
if(IsMobile()){
    document.addEventListener('touchmove', function(e) {
        console.log("touchmove!!!!!!!!!!!!!!!!!!!!");
        console.log(e.touches.length);
        if (e.touches.length === 1) {
          var touch = {
            x: e.touches[0].clientX - canvasPosition.x,
            y: e.touches[0].clientY - canvasPosition.y + window.pageYOffset
          };
          GameMain.OnTouchMove(touch);
        }
      }, { passive: false });

      document.addEventListener('touchend', function(e) {
        console.log("touchend!!!!!!!!!!!!!!!!!!!!");

        GameMain.OnTouchEnd(); // touchend가 발생했을 때 호출할 함수를 정의합니다.
    }, false);
}
else
{
    //canvas.on('mousemove', function(e) {
    $(document).on('mousemove', '#stage', (e) => {

        var mouse = {
            x: e.clientX - canvasPosition.x,
            y: e.clientY - canvasPosition.y + window.pageYOffset
          };

        if ( bInit == true )
        GameMain.OnMouseMove(mouse);
    });

}
$(document).on('click', '#stage', (e) => {
    var mouse = {
        x: e.clientX - canvasPosition.x,
        y: e.clientY - canvasPosition.y + window.pageYOffset
    };
    if ( bInit == true )
    GameMain.OnClick(mouse);
});

//canvas.on('mousedown', function(e) {
$(document).on('mousedown', '#stage', (e) => {

    var mouse = {
        x: e.clientX - canvasPosition.x,
        y: e.clientY - canvasPosition.y + window.pageYOffset
      };
      if ( bInit == true )
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
    if ( bInit == true )
    GameMain.OnMouseUp(mouse);
});

let OnSize = () =>
{
    cScreenWidth = window.innerWidth;
    cScreenHeight = window.innerHeight;

    //UpdateLocation();
    configScreen.OnSize(cScreenWidth, cScreenHeight);

    //console.log(configScreen);

    //console.log(`OnSize width : ${cScreenWidth}, height : ${cScreenHeight}`);

    if ( GameMain != null )
    GameMain.OnSize(configScreen.m_fWidthRate, configScreen.m_fHeightRate);


    canvas = $('<canvas width ="' + cScreenWidth + '" height="' + cScreenHeight + '"></canvas>');
    ctx = canvas.get(0).getContext("2d");
    $('#stage').empty();
    let tag2 = '';
    let tag = `
    <div id="popup_setting" class="setting-wrap" style="position: absolute; border-radius: 20px; z-index: 12; top:50%; left:50%; transform:translate(-50%, -50%); text-align: center; opacity:0.95;">
    <div class="close"><a href="javascript:OnClickSettingClose();"><img src="images/close.svg"></a></div>
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
        <button style="opacity:1.0 border-radius: 20px;" onclick="OnClickManualRebuyin();">수동 리바인</button>
        <button style="opacity:1.0 border-radius: 20px;" onclick="OnClickModifySetting();">수정</button>
    </div>`;
    if(IsMobile())
    {
        tag2 = `
        <div class="header-wrap" style="position: absolute; z-index: 11; top:0%; right:0%;">
        <div class="head-top">
                <span class="user-nav">
                    <ul>
                        <li><a href="javascript:OnClickClose();"><img src="images/close.svg"></a></li>
                        <li id="exit">나가기</li>
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
                        <li><a href="javascript:OnClickClose();"><img src="images/close.svg"></a></li>
                        <li id="exit">나가기</li>
                    </ul>
                </span>
            </div>
        </div>
        `;
    }
    let tag3 = `<div id="popup_message" class="message-wrap" style="position: absolute; border-radius: 20px; z-index: 12; top:50%; left:50%; transform:translate(-50%, -50%); text-align: center;">
        <div class="setting-form">
            <div class="title">메세지</div>
            <div class="form">
                <p id="message"></p>
            </div>
            <button style="opacity:1.0 border-radius: 20px;" onclick="OnClickMessageYes();">YES</button>
            <button style="opacity:1.0 border-radius: 20px;" onclick="OnClickMessageNo();">NO</button>
        </div>
    </div>
    <div id="popup_exit" class="message-wrap" style="position: absolute; border-radius: 20px; z-index: 12; top:50%; left:50%; transform:translate(-50%, -50%); text-align: center;">
        <div class="setting-form">
            <div class="title">나가기</div>
            <div class="form">
                <p id="message_exit"></p>
            </div>
            <button style="opacity:1.0 border-radius: 16px;" onclick="OnClickExitYes();">예</button>
            <button style="opacity:1.0 border-radius: 16px;" onclick="OnClickExitNo();">아니오</button>
        </div>
    </div>`;

    $('#stage').append(tag);
    $('#stage').append(tag2);
    $('#stage').append(tag3);

    $('#popup_setting').hide();
    $('#popup_message').hide();
    $('#popup_exit').hide();

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

let previousWidth = window.innerWidth;
let previousHeight = window.innerHeight;

const isIOS = /iPad|iPhone|iPod/i.test(navigator.userAgent);
if(isIOS) {
    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        if (window.innerWidth !== previousWidth || window.innerHeight !== previousHeight) {
            // Window size actually changed

            // Check if the device has been rotated
            if ((previousWidth > previousHeight && window.innerHeight > window.innerWidth) ||
                (previousWidth < previousHeight && window.innerHeight < window.innerWidth)) {
                // The device has been rotated
                console.log('장치가 회전되었습니다.');
                OnSize();
            }
        }
        else {
            if($('#chatting').is(':hidden') && $('#game_log').is(':hidden')) {
                // chatting 요소와 game_log 요소가 모두 숨겨져 있는 경우에 실행할 코드를 여기에 작성합니다.
                window.addEventListener('resize', OnSize, false);
            } else {
                // chatting 요소와 game_log 요소 중 하나라도 보이는 경우에 실행할 코드를 여기에 작성합니다.
                window.scrollTo(0, 0);
            }
        }
    });

    previousWidth = window.innerWidth;
    previousHeight = window.innerHeight;
}
else {
    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        if (window.innerWidth !== previousWidth || window.innerHeight !== previousHeight) {
            // Window size actually changed

            // Check if the device has been rotated
            if ((previousWidth > previousHeight && window.innerHeight > window.innerWidth) ||
                (previousWidth < previousHeight && window.innerHeight < window.innerWidth)) {
                // The device has been rotated
                console.log('장치가 회전되었습니다.');
                OnSize();
            } else {
                // The device has not been rotated, check for keyboard
                if (window.innerHeight < previousHeight * 0.4) {
                    console.log('키보드가 나타났습니다.');
                    // 키보드가 나타났을 때 수행하려는 동작을 여기에 작성
                } else {
                    console.log('키보드가 사라졌습니다.');
                    OnSize();
                    // 키보드가 사라졌을 때 수행하려는 동작을 여기에 작성
                }
            }
        }

        previousWidth = window.innerWidth;
        previousHeight = window.innerHeight;
    });
}

//window.addEventListener('resize', OnSize, false);