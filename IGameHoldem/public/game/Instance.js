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
let configScreen = '';
//let fullscreenResized = false;

if(IsMobile())
{
    configScreen = new IScreenConfig(0, 0, 1080, 1920, window.innerWidth, window.innerHeight);
}
else
{
    configScreen = new IScreenConfig(0, 0, 1920, 1080, window.innerWidth, window.innerHeight);
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

/*
*/
// let reader = new FileReader();

//         reader.onload = (event) => {

//             const str = event.target.result;
//             const array = str.split('\r\n');

//             for ( let i in array )
//             {
//                 console.log(`${i}, ${array[i]}~)`);
//             }
//         }

//         let ReadINI = (file) => {
//             reader.readAsText(file);

//         }
//         const urlfile = 'http://localhost:5555/location.ini';
//         var xhr = new XMLHttpRequest();
//             xhr.open("GET", urlfile, true);
//             xhr.responseType = "blob";
//             // 파일이 로드될 때 실행되는 이벤트 핸들러
//             xhr.onload = function() {
//                 if (xhr.status === 200) {
//                 // 파일이 성공적으로 가져와진 경우
//                 var fileBlob = xhr.response;
//                 ReadINI(fileBlob);
//                 }
//             };
//             xhr.send();
//$(document).on('ready', async () => {

let iNumLoadCount = 0;

    await configScreen.LoadLocation('location.ini', configScreen.ProcessLocation);
    ResourceManager.LoadResource('resource.ini', ResourceManager.ProcessResource, ResourceManager.listImages, ResourceManager.listLoads);

//})
    //configScreen.LoadLocation('location.ini', configScreen.ProcessLocation);
    //ResourceManager.LoadResource('resource.ini', ResourceManager.ProcessResource, ResourceManager.listImages);

/*
*/


configScreen.listDesktopLocationsH.push({x:1030, y:828});
configScreen.listDesktopLocationsH.push({x:1175, y:828});
configScreen.listDesktopLocationsH.push({x:1325, y:828});
configScreen.listDesktopLocationsH.push({x:1500-30, y:910});
configScreen.listDesktopLocationsH.push({x:1300-15, y:910});
configScreen.listDesktopLocationsH.push({x:1100, y:910});
configScreen.listDesktopLocationsH.push({x:1700-45, y:910}); // bet button
configScreen.listMobileLocationH.push({x:1030, y:828});
configScreen.listMobileLocationH.push({x:1175, y:828});
configScreen.listMobileLocationH.push({x:1325, y:828});
configScreen.listMobileLocationH.push({x:1100, y:910});
configScreen.listMobileLocationH.push({x:1300-15, y:910});
configScreen.listMobileLocationH.push({x:1500-30, y:910});
configScreen.listMobileLocationH.push({x:1700-45, y:910}); // bet button
configScreen.listDesktopLocationsV.push({x:1030, y:950});
configScreen.listDesktopLocationsV.push({x:1175, y:950});
configScreen.listDesktopLocationsV.push({x:1325, y:950});
configScreen.listDesktopLocationsV.push({x:365, y:1800});
configScreen.listDesktopLocationsV.push({x:10, y:1800});
configScreen.listDesktopLocationsV.push({x:365, y:1800});
configScreen.listDesktopLocationsV.push({x:720, y:1800}); // bet vertical button
configScreen.listMobileLocationV.push({x:1100, y:828});
configScreen.listMobileLocationV.push({x:1175, y:828});
configScreen.listMobileLocationV.push({x:1325, y:828});
configScreen.listMobileLocationV.push({x:365, y:1800});
configScreen.listMobileLocationV.push({x:10, y:1800});
configScreen.listMobileLocationV.push({x:365, y:1800});
configScreen.listMobileLocationV.push({x:720, y:1800}); // bet vertical button
//  PlayerLocation
for ( let i in cPlayerLocations)
{
    configScreen.listDesktopLocationsH.push({x:cPlayerLocations[i].x+20, y:cPlayerLocations[i].y+20});
    configScreen.listDesktopLocationsV.push({x:cPlayerVerticalLocations[i].x+20, y:cPlayerVerticalLocations[i].y+20});
}
//  PlayerLocation
for ( let i in cPlayerLocations)
{
    configScreen.listMobileLocationH.push({x:cPlayerLocations[i].x+20, y:cPlayerLocations[i].y+20});
    configScreen.listMobileLocationV.push({x:cPlayerVerticalLocations[i].x+20, y:cPlayerVerticalLocations[i].y+20});
}
//  Panel
configScreen.listDesktopLocationsH.push({x:806, y:810-120});
configScreen.listDesktopLocationsH.push({x:806, y:880-120});
//  Panel
configScreen.listMobileLocationH.push({x:806, y:810-120});
configScreen.listMobileLocationH.push({x:806, y:880-120});
//  Panel
configScreen.listDesktopLocationsV.push({x:390, y:1000});
configScreen.listDesktopLocationsV.push({x:390, y:1070});
//  Panel
configScreen.listMobileLocationV.push({x:390, y:1000});
configScreen.listMobileLocationV.push({x:390, y:1070});

configScreen.listDesktopLocationsH.push({x:20, y:10});    //  ELocationIndex.MyInfo 850
configScreen.listDesktopLocationsH.push({x:50, y:50});    //  ELocationIndex.Logo
configScreen.listDesktopLocationsH.push({x:660, y:380});    //  ELocationIndex.DialogStandby
configScreen.listDesktopLocationsH.push({x:905, y:265});    //  ELocationIndex.CardDeck

configScreen.listDesktopLocationsH.push({x:960-120, y:1040-150});    //  ELocationIndex.StartButton

configScreen.listMobileLocationH.push({x:20, y:10});    //  ELocationIndex.MyInfo
configScreen.listMobileLocationH.push({x:50, y:50});    //  ELocationIndex.Logo
configScreen.listMobileLocationH.push({x:660, y:380});    //  ELocationIndex.DialogStandby
configScreen.listMobileLocationH.push({x:905, y:265});    //  ELocationIndex.CardDeck

configScreen.listMobileLocationH.push({x:960-120, y:1040-150});    //  ELocationIndex.StartButton

configScreen.listMobileLocationV.push({x:20, y:10});    //  ELocationIndex.MyInfo
configScreen.listMobileLocationV.push({x:50, y:50});    //  ELocationIndex.Logo
configScreen.listMobileLocationV.push({x:240, y:700});    //  ELocationIndex.DialogStandby
configScreen.listMobileLocationV.push({x:480, y:230});    //  ELocationIndex.CardDeck

configScreen.listMobileLocationV.push({x:525, y:1800});    //  ELocationIndex.StartButton

configScreen.listDesktopLocationsV.push({x:20, y:10});    //  ELocationIndex.MyInfo 1500
configScreen.listDesktopLocationsV.push({x:50, y:50});    //  ELocationIndex.Logo
configScreen.listDesktopLocationsV.push({x:240, y:700});    //  ELocationIndex.DialogStandby
configScreen.listDesktopLocationsV.push({x:480, y:230});    //  ELocationIndex.CardDeck

configScreen.listDesktopLocationsV.push({x:525, y:1800});    //  ELocationIndex.StartButton

//  Player Types
for ( let i in cPlayerTypeLocations )
    configScreen.listDesktopLocationsH.push({x:cPlayerTypeLocations[i].x, y:cPlayerTypeLocations[i].y});    //  ELocationIndex.P1Type
for ( let i in cTableCardLocations )
    configScreen.listDesktopLocationsH.push({x:cTableCardLocations[i].x, y:cTableCardLocations[i].y});    //  ELocationIndex.TableCard1
for ( let i in cChipLocations)
    configScreen.listDesktopLocationsH.push({x:cChipLocations[i].x, y:cChipLocations[i].y});    //  ELocationIndex.TableChip1
for ( let i in cChipCallTexts)
    configScreen.listDesktopLocationsH.push({x:cChipCallTexts[i].x, y:cChipCallTexts[i].y});    //  ELocationIndex.TableCoin1
//  Player Types
for ( let i in cPlayerTypeLocations )
    configScreen.listMobileLocationH.push({x:cPlayerTypeLocations[i].x, y:cPlayerTypeLocations[i].y});    //  ELocationIndex.P1Type
for ( let i in cTableCardLocations )
    configScreen.listMobileLocationH.push({x:cTableCardLocations[i].x, y:cTableCardLocations[i].y});    //  ELocationIndex.TableCard1
for ( let i in cChipLocations)
    configScreen.listMobileLocationH.push({x:cChipLocations[i].x, y:cChipLocations[i].y});    //  ELocationIndex.TableChip1
for ( let i in cChipCallTexts)
    configScreen.listMobileLocationH.push({x:cChipCallTexts[i].x, y:cChipCallTexts[i].y});    //  ELocationIndex.TableCoin1
//  Player Types
for (let i in cPlayerTypeLocations)
    configScreen.listDesktopLocationsV.push({ x: cPlayerTypeVerticalLocations[i].x, y: cPlayerTypeVerticalLocations[i].y });    //  ELocationIndex.P1Type
for (let i in cTableCardLocations)
    configScreen.listDesktopLocationsV.push({ x: cTableCardVerticalLocations[i].x, y: cTableCardVerticalLocations[i].y });    //  ELocationIndex.TableCard1
for (let i in cChipLocations)
    configScreen.listDesktopLocationsV.push({ x: cChipVerticalLocations[i].x, y: cChipVerticalLocations[i].y });    //  ELocationIndex.TableChip1
for (let i in cChipCallTexts)
    configScreen.listDesktopLocationsV.push({ x: cChipCallVerticalTexts[i].x, y: cChipCallVerticalTexts[i].y });    //  ELocationIndex.TableCoin1
//  Player Types
for (let i in cPlayerTypeVerticalLocations)
    configScreen.listMobileLocationV.push({ x: cPlayerTypeVerticalLocations[i].x, y: cPlayerTypeVerticalLocations[i].y });    //  ELocationIndex.P1Type
for (let i in cTableCardVerticalLocations)
    configScreen.listMobileLocationV.push({ x: cTableCardVerticalLocations[i].x, y: cTableCardVerticalLocations[i].y });    //  ELocationIndex.TableCard1
for (let i in cChipVerticalLocations)
    configScreen.listMobileLocationV.push({ x: cChipVerticalLocations[i].x, y: cChipVerticalLocations[i].y });    //  ELocationIndex.TableChip1
for (let i in cChipCallVerticalTexts)
    configScreen.listMobileLocationV.push({ x: cChipCallVerticalTexts[i].x, y: cChipCallVerticalTexts[i].y });    //  ELocationIndex.TableCoin1
configScreen.listDesktopLocationsH.push({x:1790, y:715});
configScreen.listDesktopLocationsH.push({x:1790, y:815}); // plus, minus button
configScreen.listDesktopLocationsH.push({x:1630, y:815}); // sliderbar
configScreen.listMobileLocationH.push({x:1800, y:650});
configScreen.listMobileLocationH.push({x:1800, y:750});// plus, minus button
configScreen.listMobileLocationH.push({x:1630, y:860}); // sliderbar
configScreen.listDesktopLocationsH.push({x:1670, y:345}); //mobile sliderbar
configScreen.listDesktopLocationsH.push({x:1060, y:195}); // MobileRaiseBar
configScreen.listMobileLocationH.push({x:1400, y:200});// mobile sliderbar
configScreen.listMobileLocationH.push({x:1400, y:200}); // MobileRaiseBar

configScreen.listDesktopLocationsV.push({x:1410, y:650});
configScreen.listDesktopLocationsV.push({x:1410, y:750}); // plus, minus button
configScreen.listDesktopLocationsV.push({x:1630, y:860}); // sliderbar
configScreen.listMobileLocationV.push({x:570, y:1690});
configScreen.listMobileLocationV.push({x:570, y:1590});// plus, minus button
configScreen.listMobileLocationV.push({x:1630, y:860}); // sliderbar
configScreen.listDesktopLocationsV.push({x:1700, y:300}); //mobile sliderbar
configScreen.listDesktopLocationsV.push({x:500, y:200}); // MobileRaiseBar
configScreen.listMobileLocationV.push({x:760, y:1120});// mobile sliderbar
configScreen.listMobileLocationV.push({x:560, y:1100}); // MobileRaiseBar

configScreen.listDesktopLocationsH.push({x:50, y:800}); // Chat 버튼
configScreen.listMobileLocationH.push({x:50, y:800});
configScreen.listDesktopLocationsH.push({x:150, y:800}); // GameLog 버튼
configScreen.listMobileLocationH.push({x:150, y:800});
configScreen.listDesktopLocationsH.push({x:960-128, y:-25}); // Jackpot
configScreen.listMobileLocationH.push({x:50, y:150});
configScreen.listDesktopLocationsH.push({x:730, y:950}); // ShowCard
configScreen.listMobileLocationH.push({x:730, y:800});

configScreen.listDesktopLocationsV.push({x:50, y:1600}); // Chat 버튼
configScreen.listMobileLocationV.push({x:50, y:1600});
configScreen.listDesktopLocationsV.push({x:150, y:1600}); // GameLog 버튼
configScreen.listMobileLocationV.push({x:150, y:1600});
configScreen.listDesktopLocationsV.push({x:50, y:150}); // Jackpot
configScreen.listMobileLocationV.push({x:50, y:150});
configScreen.listDesktopLocationsV.push({x:300, y:1600}); // ShowCard
configScreen.listMobileLocationV.push({x:300, y:1600});

configScreen.listDesktopLocationsH.push({x:1790, y:615}); // RaiseButton1
configScreen.listMobileLocationH.push({x:1800, y:550});
configScreen.listDesktopLocationsH.push({x:1790, y:515}); // RaiseButton2
configScreen.listMobileLocationH.push({x:1800, y:450});
configScreen.listDesktopLocationsH.push({x:1790, y:415}); // RaiseButton3
configScreen.listMobileLocationH.push({x:1800, y:350});
configScreen.listDesktopLocationsH.push({x:1790, y:315}); // RaiseButton4
configScreen.listMobileLocationH.push({x:1800, y:250});

configScreen.listDesktopLocationsV.push({x:50, y:150}); // RaiseButton1
configScreen.listMobileLocationV.push({x:50, y:150});
configScreen.listDesktopLocationsV.push({x:300, y:1600}); // RaiseButton2
configScreen.listMobileLocationV.push({x:300, y:1600});
configScreen.listDesktopLocationsV.push({x:50, y:150}); // RaiseButton3
configScreen.listMobileLocationV.push({x:50, y:150});
configScreen.listDesktopLocationsV.push({x:300, y:1600}); // RaiseButton4
configScreen.listMobileLocationV.push({x:300, y:1600});

let buttonsGame = [];
// [
//     //new IUIButton(1920-250, 0, 90, 80, OnClickLeave, imageButtons[7], 90, 80, ""),  //  나가기
//     //new IUIButton(960-120, 1040-150, 230, 90, OnClickGameStart, imageButtons[3], 189, 71, ""),
//     new IUIButton(configScreen.GetLocation(ELocationIndex.StartButton).x, configScreen.GetLocation(ELocationIndex.StartButton).y, 230, 90, OnClickGameStart, imageButtons[3], 189, 71, ""),
//     new IUIButton(configScreen.GetLocation(ELocationIndex.Chat).x, configScreen.GetLocation(ELocationIndex.Chat).y, 100, 60, OnClickGameChat, imageChat, 244, 162, "",0),
//     new IUIButton(configScreen.GetLocation(ELocationIndex.GameLog).x, configScreen.GetLocation(ELocationIndex.GameLog).y, 100, 60, OnClickGamelog, imageGamelog, 244, 156, "",0),
//     new IUIButton(configScreen.GetLocation(ELocationIndex.ShowCard).x, configScreen.GetLocation(ELocationIndex.ShowCard).y, 140, 80, OnClickShowCard, imageBetButtons[0], 495.75, 250, "보여주기")
// ];

const cBettingButtonLocations =
[
    {x:configScreen.GetLocation(ELocationIndex.BetButtonQuater).x, y:configScreen.GetLocation(ELocationIndex.BetButtonQuater).y},    //  Quater
    {x:configScreen.GetLocation(ELocationIndex.BetButtonHalf).x, y:configScreen.GetLocation(ELocationIndex.BetButtonHalf).y},    //  Half
    {x:configScreen.GetLocation(ELocationIndex.BetButtonFull).x, y:configScreen.GetLocation(ELocationIndex.BetButtonFull).y},    //  Full
    {x:configScreen.GetLocation(ELocationIndex.BetButtonCall).x, y:configScreen.GetLocation(ELocationIndex.BetButtonCall).y},    //  Call
    {x:configScreen.GetLocation(ELocationIndex.BetButtonFold).x, y:configScreen.GetLocation(ELocationIndex.BetButtonFold).y},    //  Fold
    {x:configScreen.GetLocation(ELocationIndex.BetButtonCheck).x, y:configScreen.GetLocation(ELocationIndex.BetButtonCheck).y},    //  Check
    {x:configScreen.GetLocation(ELocationIndex.BetButtonRaise).x, y:configScreen.GetLocation(ELocationIndex.BetButtonRaise).y},    //  Raise
    {x:configScreen.GetLocation(ELocationIndex.plusButton).x, y:configScreen.GetLocation(ELocationIndex.plusButton).y},    //  plus
    {x:configScreen.GetLocation(ELocationIndex.minusButton).x, y:configScreen.GetLocation(ELocationIndex.minusButton).y},    //  minus
    {x:configScreen.GetLocation(ELocationIndex.sliderBar).x, y:configScreen.GetLocation(ELocationIndex.sliderBar).y},    //  slider
    {x:configScreen.GetLocation(ELocationIndex.RaiseButton1).x, y:configScreen.GetLocation(ELocationIndex.RaiseButton1).y},    //  RaiseButton1
    {x:configScreen.GetLocation(ELocationIndex.RaiseButton2).x, y:configScreen.GetLocation(ELocationIndex.RaiseButton2).y},    //  RaiseButton2
    {x:configScreen.GetLocation(ELocationIndex.RaiseButton3).x, y:configScreen.GetLocation(ELocationIndex.RaiseButton3).y},    //  RaiseButton3
    {x:configScreen.GetLocation(ELocationIndex.RaiseButton4).x, y:configScreen.GetLocation(ELocationIndex.RaiseButton4).y},    //  RaiseButton4
];

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
        console.log(`ResourceManager.listLoads.length : ${ResourceManager.listLoads.length}, ResourceManager.listImages.length : ${ResourceManager.listImages.length}, ${iNumLoadCount}`);

        if ( ResourceManager.listImages.length != 0 && ResourceManager.listLoads.length == ResourceManager.listImages.length )
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


buttonsGame =
[
    //new IUIButton(1920-250, 0, 90, 80, OnClickLeave, imageButtons[7], 90, 80, ""),  //  나가기
    //new IUIButton(960-120, 1040-150, 230, 90, OnClickGameStart, imageButtons[3], 189, 71, ""),
    // new IUIButton(configScreen.GetLocation(ELocationIndex.StartButton).x, configScreen.GetLocation(ELocationIndex.StartButton).y, 230, 90, OnClickGameStart, imageButtons[3], 189, 71, ""),
    // new IUIButton(configScreen.GetLocation(ELocationIndex.Chat).x, configScreen.GetLocation(ELocationIndex.Chat).y, 100, 60, OnClickGameChat, imageChat, 244, 162, "",0),
    // new IUIButton(configScreen.GetLocation(ELocationIndex.GameLog).x, configScreen.GetLocation(ELocationIndex.GameLog).y, 100, 60, OnClickGamelog, imageGamelog, 244, 156, "",0),
    // new IUIButton(configScreen.GetLocation(ELocationIndex.ShowCard).x, configScreen.GetLocation(ELocationIndex.ShowCard).y, 140, 80, OnClickShowCard, imageBetButtons[0], 495.75, 250, "보여주기")

    new IUIButton(configScreen.GetLocation(ELocationIndex.StartButton).x, configScreen.GetLocation(ELocationIndex.StartButton).y, 230, 90, OnClickGameStart, imageButtons[3], 189, 71, ""),
    new IUIButton(configScreen.GetLocation(ELocationIndex.Chat).x, configScreen.GetLocation(ELocationIndex.Chat).y, 100, 74, OnClickGameChat, imageChat, 100, 74, ""),
    new IUIButton(configScreen.GetLocation(ELocationIndex.GameLog).x, configScreen.GetLocation(ELocationIndex.GameLog).y, 100, 74, OnClickGamelog, imageGamelog, 100, 74, ""),
    new IUIButton(configScreen.GetLocation(ELocationIndex.ShowCard).x, configScreen.GetLocation(ELocationIndex.ShowCard).y, 200, 90, OnClickShowCard, cardOpenButton, 100, 45, "")

];

buttonsGameBetting =
[
    new IUIButton(cBettingButtonLocations[0].x, cBettingButtonLocations[0].y, 140, 80, OnClickQuater, imageBetButtons[0], 495.75, 250, "쿼터"),
    new IUIButton(cBettingButtonLocations[1].x, cBettingButtonLocations[1].y, 140, 80, OnClickHalf, imageBetButtons[0], 495.75, 250, "하프"),
    new IUIButton(cBettingButtonLocations[2].x, cBettingButtonLocations[2].y, 140, 80, OnClickFull, imageBetButtons[0], 495.75, 250, "풀"),

    //new IUIButton(1213 + 150 * 2 + 10, 1023 + 5 + 60-150, 150, 60, OnClickAllin, imageBettingButton, 150, 80, "올인"),

    new IUIButton(cBettingButtonLocations[3].x, cBettingButtonLocations[3].y, 180, 100, OnClickCall, imageBetButtons[0], 495.75, 250, "콜",'blue'),
    new IUIButton(cBettingButtonLocations[4].x, cBettingButtonLocations[4].y, 180, 100, OnClickFold, imageBetButtons[0], 495.75, 250, "폴드",'gray'),
    new IUIButton(cBettingButtonLocations[5].x, cBettingButtonLocations[5].y, 180, 100, OnClickCheck, imageBetButtons[0], 495.75, 250, "체크",'yellow'),
    new IUIButton(cBettingButtonLocations[6].x, cBettingButtonLocations[6].y, 180, 100, OnclickMobileRaise, imageBetButtons[0], 495.75, 250, "레이스",'red'),

    // new IUIButton(cBettingButtonLocations[7].x, cBettingButtonLocations[7].y, 140, 80, OnClickPlus, imageBetButtons[0], 495.75, 250, "+"),
    // new IUIButton(cBettingButtonLocations[8].x, cBettingButtonLocations[8].y, 140, 80, OnClickMinus, imageBetButtons[0], 495.75, 250, "-"),
];

mobilebuttonsGameBetting =
[
    new IUIButton(cBettingButtonLocations[0].x, cBettingButtonLocations[0].y, 140, 80, OnClickMobileQuater, imageBetButtons[2], 278, 78, "QUARTER"),
    new IUIButton(cBettingButtonLocations[1].x, cBettingButtonLocations[1].y, 140, 80, OnClickMobileHalf, imageBetButtons[2], 278, 78, "HALF"),
    new IUIButton(cBettingButtonLocations[2].x, cBettingButtonLocations[2].y, 140, 80, OnClickMobileFull, imageBetButtons[2], 278, 78, "FULL"),

    //new IUIButton(1213 + 150 * 2 + 10, 1023 + 5 + 60-150, 150, 60, OnClickAllin, imageBettingButton, 150, 80, "올인"),

    new IUIButton(cBettingButtonLocations[3].x, cBettingButtonLocations[3].y, 350, 100, OnClickMobileCall, imageBetButtons[4], 278, 78,"콜",'blue'),
    new IUIButton(cBettingButtonLocations[4].x, cBettingButtonLocations[4].y, 350, 100, OnClickMobileFold, imageBetButtons[3], 278, 78, "폴드",'gray'),
    new IUIButton(cBettingButtonLocations[5].x, cBettingButtonLocations[5].y, 350, 100, OnClickMobileCheck, imageBetButtons[4], 278, 78, "체크",'yellow'),
    new IUIButton(cBettingButtonLocations[6].x, cBettingButtonLocations[6].y, 350, 100, OnclickMobileRaise, imageBetButtons[2], 278, 78, "레이스",'red'),
];

buttonsGameLocation =
[
    new IUIButton(configScreen.GetLocation(ELocationIndex.P1Table).x, configScreen.GetLocation(ELocationIndex.P1Table).y, 150, 150, OnClickLocation1, imageButtons[5], 180, 184, ""),
    new IUIButton(configScreen.GetLocation(ELocationIndex.P2Table).x, configScreen.GetLocation(ELocationIndex.P2Table).y, 150, 150, OnClickLocation2, imageButtons[5], 180, 184, ""),
    new IUIButton(configScreen.GetLocation(ELocationIndex.P3Table).x, configScreen.GetLocation(ELocationIndex.P3Table).y, 150, 150, OnClickLocation3, imageButtons[5], 180, 184, ""),
    new IUIButton(configScreen.GetLocation(ELocationIndex.P4Table).x, configScreen.GetLocation(ELocationIndex.P4Table).y+20, 150, 150, OnClickLocation4, imageButtons[5], 180, 184, ""),
    new IUIButton(configScreen.GetLocation(ELocationIndex.P5Table).x, configScreen.GetLocation(ELocationIndex.P5Table).y, 150, 150, OnClickLocation5, imageButtons[5], 180, 184, ""),
    new IUIButton(configScreen.GetLocation(ELocationIndex.P6Table).x, configScreen.GetLocation(ELocationIndex.P6Table).y, 150, 150, OnClickLocation6, imageButtons[5], 180, 184, ""),
    new IUIButton(configScreen.GetLocation(ELocationIndex.P7Table).x, configScreen.GetLocation(ELocationIndex.P7Table).y+20, 150, 150, OnClickLocation7, imageButtons[5], 180, 184, ""),
    new IUIButton(configScreen.GetLocation(ELocationIndex.P8Table).x, configScreen.GetLocation(ELocationIndex.P8Table).y, 150, 150, OnClickLocation8, imageButtons[5], 180, 184, ""),
    new IUIButton(configScreen.GetLocation(ELocationIndex.P9Table).x, configScreen.GetLocation(ELocationIndex.P9Table).y, 150, 150, OnClickLocation9, imageButtons[5], 180, 184, ""),
    // pink
    // new IUIButton(configScreen.GetLocation(ELocationIndex.P1Table).x, configScreen.GetLocation(ELocationIndex.P1Table).y, 150, 150, OnClickLocation1, imageButtons[13], 169.5, 181, ""),
    // new IUIButton(configScreen.GetLocation(ELocationIndex.P2Table).x, configScreen.GetLocation(ELocationIndex.P2Table).y, 150, 150, OnClickLocation2, imageButtons[13], 169.5, 181, ""),
    // new IUIButton(configScreen.GetLocation(ELocationIndex.P3Table).x, configScreen.GetLocation(ELocationIndex.P3Table).y, 150, 150, OnClickLocation3, imageButtons[13], 169.5, 181, ""),
    // new IUIButton(configScreen.GetLocation(ELocationIndex.P4Table).x, configScreen.GetLocation(ELocationIndex.P4Table).y, 150, 150, OnClickLocation4, imageButtons[13], 169.5, 181, ""),
    // new IUIButton(configScreen.GetLocation(ELocationIndex.P5Table).x, configScreen.GetLocation(ELocationIndex.P5Table).y, 150, 150, OnClickLocation5, imageButtons[13], 169.5, 181, ""),
    // new IUIButton(configScreen.GetLocation(ELocationIndex.P6Table).x, configScreen.GetLocation(ELocationIndex.P6Table).y, 150, 150, OnClickLocation6, imageButtons[13], 169.5, 181, ""),
    // new IUIButton(configScreen.GetLocation(ELocationIndex.P7Table).x, configScreen.GetLocation(ELocationIndex.P7Table).y, 150, 150, OnClickLocation7, imageButtons[13], 169.5, 181, ""),
    // new IUIButton(configScreen.GetLocation(ELocationIndex.P8Table).x, configScreen.GetLocation(ELocationIndex.P8Table).y, 150, 150, OnClickLocation8, imageButtons[13], 169.5, 181, ""),
    // new IUIButton(configScreen.GetLocation(ELocationIndex.P9Table).x, configScreen.GetLocation(ELocationIndex.P9Table).y, 150, 150, OnClickLocation9, imageButtons[13], 169.5, 181, ""),

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


    //new IUIImage(0, 0, 1920, 1080, imageGameBG[1], 1920, 1080),
    //new IUIImage(0, 0, 1920, 1080, imageGameBG[2], 1920, 1080),
    // new IUIImage(0, 0, 1920, 1080, imageTextBG[0], 1920, 1080),
    // new IUIImage(0, 0, 1920, 1080, imageTextBG[1], 1920, 1080),
    // new IUIImage(0, 0, 1920, 1080, imageTextBG[2], 1920, 1080),
    // new IUIImage(0, 0, 1920, 1080, imageTextBG[3], 1920, 1080),
    // new IUIImage(0, 0, 1920, 1080, imageTextBG[4], 1920, 1080),
    // new IUIImage(0, 0, 1920, 1080, imageTextBG[5], 1920, 1080),
    // new IUIImage(0, 0, 1920, 1080, imageTextBG[6], 1920, 1080),
    // new IUIImage(0, 0, 1920, 1080, imageTextBG[7], 1920, 1080),
    // new IUIImage(0, 0, 1080, 1920, imageGameBG[3], 768, 1365),
    // new IUIImage(0, 0, 1080, 1920, imageGameBG[4], 768, 1365),
];

imageTablePanel =
[
    // new IUIImage(configScreen.GetLocation(ELocationIndex.PanelCall).x, configScreen.GetLocation(ELocationIndex.PanelCall).y, 308, 57, imageTableTotalPanel[0], 308, 57),
    // new IUIImage(configScreen.GetLocation(ELocationIndex.PanelTotal).x, configScreen.GetLocation(ELocationIndex.PanelTotal).y, 308, 57, imageTableCallPanel[0], 308, 57),
    // new IUIImage(configScreen.GetLocation(ELocationIndex.PanelCall).x, configScreen.GetLocation(ELocationIndex.PanelCall).y, 308, 57, imageTableTotalPanel[1], 308, 57),
    // new IUIImage(configScreen.GetLocation(ELocationIndex.PanelTotal).x, configScreen.GetLocation(ELocationIndex.PanelTotal).y, 308, 57, imageTableCallPanel[1], 308, 57),

    new IUIImage(configScreen.GetLocation(ELocationIndex.PanelCall).x, configScreen.GetLocation(ELocationIndex.PanelCall).y, 308, 57, ResourceManager.GetImage(EImageIndex.BGTableTotalPanel01).image, 308, 57),
    new IUIImage(configScreen.GetLocation(ELocationIndex.PanelTotal).x, configScreen.GetLocation(ELocationIndex.PanelTotal).y, 308, 57, ResourceManager.GetImage(EImageIndex.BGTableCallPanel01).image, 308, 57),
    new IUIImage(configScreen.GetLocation(ELocationIndex.PanelCall).x, configScreen.GetLocation(ELocationIndex.PanelCall).y, 308, 57, ResourceManager.GetImage(EImageIndex.BGTableTotalPanel02).image, 308, 57),
    new IUIImage(configScreen.GetLocation(ELocationIndex.PanelTotal).x, configScreen.GetLocation(ELocationIndex.PanelTotal).y, 308, 57, ResourceManager.GetImage(EImageIndex.BGTableCallPanel02).image, 308, 57),

];

imagesGame =
[
    new IUIImage(configScreen.GetLocation(ELocationIndex.MyInfo).x, configScreen.GetLocation(ELocationIndex.MyInfo).y, 400, 200, imageMyInfo, 400, 200),// 위치만 일단 logo 위치로 잡아둔거임.
    //new IUIImage(configScreen.GetLocation(ELocationIndex.Logo).x, configScreen.GetLocation(ELocationIndex.Logo).y, 150, 50, imageLogo, 150, 50),
    new IUIImage(configScreen.GetLocation(ELocationIndex.DialogStandby).x, configScreen.GetLocation(ELocationIndex.DialogStandby).y, 600, 200, imageModeStandby, 600, 200),
    //new IUIImage(configScreen.GetLocation(ELocationIndex.Jackpot).x, configScreen.GetLocation(ELocationIndex.Jackpot).y, 256, 176, imageJackpot, 256, 176),
    //new IUIImage(660, 380, 30, 25, imageModeStandbyDot, 105, 90)
];

imagesGameDeck =
[
    // new IUIImage(configScreen.GetLocation(ELocationIndex.CardDeck).x, configScreen.GetLocation(ELocationIndex.CardDeck).y, 120, 40, imageGameDeck[0], 351, 136),
    // new IUIImage(configScreen.GetLocation(ELocationIndex.CardDeck).x, configScreen.GetLocation(ELocationIndex.CardDeck).y, 120, 40, imageGameDeck[1], 351, 136),//blue card
    // new IUIImage(configScreen.GetLocation(ELocationIndex.CardDeck).x, configScreen.GetLocation(ELocationIndex.CardDeck).y, 120, 40, imageGameDeck[2], 351, 136),
    // new IUIImage(configScreen.GetLocation(ELocationIndex.CardDeck).x, configScreen.GetLocation(ELocationIndex.CardDeck).y, 120, 40, imageGameDeck[3], 351, 136),//red card

    new IUIImage(configScreen.GetLocation(ELocationIndex.CardDeck).x, configScreen.GetLocation(ELocationIndex.CardDeck).y, 120, 40, ResourceManager.GetImage(EImageIndex.BGTableDeck01).image, 351, 136),
    new IUIImage(configScreen.GetLocation(ELocationIndex.CardDeck).x, configScreen.GetLocation(ELocationIndex.CardDeck).y, 120, 40, ResourceManager.GetImage(EImageIndex.BGTableDeck02).image, 351, 136),//blue card
    new IUIImage(configScreen.GetLocation(ELocationIndex.CardDeck).x, configScreen.GetLocation(ELocationIndex.CardDeck).y, 120, 40, ResourceManager.GetImage(EImageIndex.BGTableDeck03).image, 351, 136),
    new IUIImage(configScreen.GetLocation(ELocationIndex.CardDeck).x, configScreen.GetLocation(ELocationIndex.CardDeck).y, 120, 40, ResourceManager.GetImage(EImageIndex.BGTableDeck04).image, 351, 136),//red card


];
buttonSlider = new IUIButton(50, 80, 50, 80, null,imageButtons[6], 50, 80, "");
sliderBar =
[
    new IUISlider(configScreen.GetLocation(ELocationIndex.MobileSliderBar).x, configScreen.GetLocation(ELocationIndex.MobileSliderBar).y, 50, 400, imageSliderBar, 27, 200, buttonSlider,1),
    new IUIButton(cBettingButtonLocations[7].x, cBettingButtonLocations[7].y, 140, 80, OnClickPlus, imageButtons[9], 50, 50, ""),
    new IUIButton(cBettingButtonLocations[8].x, cBettingButtonLocations[8].y, 140, 80, OnClickMinus, imageButtons[8], 50, 50, ""),
    new IUIButton(cBettingButtonLocations[10].x, cBettingButtonLocations[10].y, 80, 80, OnClickAllin, imageButtons[7], 50, 50, "올인"),
    new IUIButton(cBettingButtonLocations[11].x, cBettingButtonLocations[11].y, 80, 80, OnClickFull, imageButtons[7], 50, 50, "풀"),
    new IUIButton(cBettingButtonLocations[12].x, cBettingButtonLocations[12].y, 80, 80, OnClickHalf, imageButtons[7], 50, 50, "하프"),
    new IUIButton(cBettingButtonLocations[13].x, cBettingButtonLocations[13].y, 80, 80, OnClickQuater, imageButtons[7], 50, 50, "쿼터"),

];

moblieSliderBar =
[
    new IUISlider(configScreen.GetLocation(ELocationIndex.MobileSliderBar).x, configScreen.GetLocation(ELocationIndex.MobileSliderBar).y, 230, 620, imageMobileSliderBar, 230, 620, '',1),
    // new IUIButton(cBettingButtonLocations[7].x, cBettingButtonLocations[7].y, 140, 80, OnClickPlus, imageBetButtons[0], 495.75, 250, "+"),
    // new IUIButton(cBettingButtonLocations[8].x, cBettingButtonLocations[8].y, 140, 80, OnClickMinus, imageBetButtons[0], 495.75, 250, "-"),
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
//가로세로 바뀌였을때 좌표 다시 잡아주는건데 세로 고정으로 하기로함.
// let UpdateLocation = () =>{

//     for (let i = 0; i < buttonsGameBetting.length; i++) {
//         let newPosition = configScreen.GetLocation(ELocationIndex.BetButtonQuater + i);  // Get the new position.
//         buttonsGameBetting[i].SetLocation(newPosition.x, newPosition.y);
//     }

//     for (let i = 0; i < mobilebuttonsGameBetting.length; i++) {
//         let newPosition = configScreen.GetLocation(ELocationIndex.BetButtonQuater + i);  // Get the new position.
//         mobilebuttonsGameBetting[i].SetLocation(newPosition.x, newPosition.y);
//     }

//     for (let i = 0; i < buttonsGameLocation.length; i++) {
//         let newPosition = configScreen.GetLocation(ELocationIndex.P1Table + i);  // Get the new position.
//         buttonsGameLocation[i].SetLocation(newPosition.x, newPosition.y);
//     }

//     imageTablePanel[0].SetLocation(configScreen.GetLocation(ELocationIndex.PanelCall).x,configScreen.GetLocation(ELocationIndex.PanelCall).y);
//     imageTablePanel[1].SetLocation(configScreen.GetLocation(ELocationIndex.PanelTotal).x,configScreen.GetLocation(ELocationIndex.PanelTotal).y);
//     imageTablePanel[2].SetLocation(configScreen.GetLocation(ELocationIndex.PanelCall).x,configScreen.GetLocation(ELocationIndex.PanelCall).y);
//     imageTablePanel[3].SetLocation(configScreen.GetLocation(ELocationIndex.PanelTotal).x,configScreen.GetLocation(ELocationIndex.PanelTotal).y);

//     imagesGame[0].SetLocation(configScreen.GetLocation(ELocationIndex.MyInfo).x, configScreen.GetLocation(ELocationIndex.MyInfo).y);
//     imagesGame[1].SetLocation(configScreen.GetLocation(ELocationIndex.Logo).x, configScreen.GetLocation(ELocationIndex.Logo).y);
//     imagesGame[2].SetLocation(configScreen.GetLocation(ELocationIndex.DialogStandby).x, configScreen.GetLocation(ELocationIndex.DialogStandby).y);

//     for (let i = 0; i < imagesGameDeck.length; i++) {
//         let newPosition = configScreen.GetLocation(ELocationIndex.CardDeck);  // Get the new position.
//         imagesGameDeck[i].SetLocation(newPosition.x, newPosition.y);
//     }
//     sliderBar[0].SetLocation(configScreen.GetLocation(ELocationIndex.sliderBar).x, configScreen.GetLocation(ELocationIndex.sliderBar).y);
//     moblieSliderBar[0].SetLocation(configScreen.GetLocation(ELocationIndex.MobileSliderBar).x, configScreen.GetLocation(ELocationIndex.MobileSliderBar).y);
//     moblieSliderBar[1].SetLocation(configScreen.GetLocation(ELocationIndex.plusButton).x, configScreen.GetLocation(ELocationIndex.plusButton).y);
//     moblieSliderBar[2].SetLocation(configScreen.GetLocation(ELocationIndex.minusButton).x, configScreen.GetLocation(ELocationIndex.minusButton).y);
// }

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
//     let tag4 =`<section id="chatting" class="w-full bg-[#070419] h-2/4 absolute top-[50%] bg-opacity-90">
//     <div class="flex pt-3 pb-5">
//     <div class="w-1/20 mr-1 ml-2">
//     <a href="javascript:OnClickChat();"><img src="img/chatbutton.png" alt="" class="cursor-pointer " width = "80" height = "36"></a>
//         </div>
//         <div class="w-1/20 relative">
//             <a href="javascript:OnClickLog();"><img src="img/gamelogbutton.png" alt="" class="cursor-pointer" width = "80" height = "36"></a>
//             <p class="absolute top-0 right-2 text-white font-bold" ></p>
//         </div>
//             <a href="javascript:OnClickChatClose();" class="close-button"></a>
//         </div>
//     </div>
//     <div class="w-11/12 mx-auto pb-10 relative">
//         <input id="inputChat" type="text" class="rounded px-3 py-2 w-full bg-neutral-700 text-white">
//         <button class="absolute top-0 right-0 leading-9 bg-rose-600 px-5 text-white font-semibold rounded" onclick="OnClickChatSend();">Send</button>
//     </div>
//     <div class="w-11/12 mx-auto h-screen">
//         <div id="chat" class="text-white text-xl overflow-y-scroll h-1/4 bg-opacity-75 bg-[#222222] px-3 py-2" >
//         </div>
//     </div>
// </section>`
// let tag5 =`<section id="game_log" class="w-full bg-[#070419] h-2/4 absolute top-[50%] bg-opacity-90">
//     <div class="flex pt-3 pb-5">
//         <div class="w-1/20 mr-1 ml-2">
//             <a href="javascript:OnClickChat();"><img src="img/chatbutton.png" alt="" class="cursor-pointer " width = "80" height = "36"></a>
//         </div>
//         <div class="w-1/20 relative">
//             <a href="javascript:OnClickLog();"><img src="img/gamelogbutton.png" alt="" class="cursor-pointer" width = "80" height = "36"></a>
//             <p class="absolute top-0 right-2 text-white font-bold" ></p>
//         </div>
//             <a href="javascript:OnClickLogClose();" class="close-button"></a>
//         </div>
//     </div>
//     <div class="w-11/12 mx-auto h-screen">
//         <div id="output_log" class="text-white text-xl overflow-y-scroll h-2/6 bg-opacity-75 bg-[#222222] px-3 py-2" >
//         </div>
//     </div>
// </section>`
    $('#stage').append(tag);
    $('#stage').append(tag2);
    $('#stage').append(tag3);
    // $('#stage').append(tag4);
    // $('#stage').append(tag5);

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