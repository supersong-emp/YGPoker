
import IUILabel from "../js/label.js";
import IUIImage from "../js/image.js";
import IUser from "../game/IUser.js";
import IUIText from "../js/text.js";
import IUIButton from "../js/button.js";
import { canPlay,isValidPlay,generateValidCombinations,shouldAutoPass,isLowestCardValidPlay } from "../game/IBig2Solver.js"

const cTableCardLocationX = [
    500,
    500 + 173 + 20,
    500 + 173 * 2 + 40,
    500 + 173 * 3 + 60,
    500 + 173 * 4 + 80,
];
const cTableCardLocationY = 520 + 50;

export default class IModeGame {
    constructor(socket, listButtons, listBgs, listImages, kSC, kTimer) {
        this.socket = socket;
        this.listButtons = listButtons;
        this.listBgs = listBgs;
        this.listImages = listImages;

        this.listPlayers = [];
        this.strOptioncode = 0;
        this.strDeckcode = 0;
        this.cMaxPlayer = 0;

        this.iTotalBettingCoin = 0;
        this.iCallCoin = 0;
        // this.listLabels = [
        //     //new IUILabel(1100, 820-120, 35, 35, 20, NumberImages, 114, 114, this.iTotalBettingCoin.toString(), 2),
        //     //new IUILabel(1100, 890-120, 35, 35, 20, NumberImages, 114, 114, this.iCallCoin.toString(), 2),
        //     //new IUILabel(1100, 820 - 90, 28, 35, 23, NumberImages3, 163, 227, this.iTotalBettingCoin.toString(), 2)
        //     //new IUILabel(300, 920, 15, 20, 15, NumberImages3, 163, 227, '1000000', 2 ),
        // ];
        this.listTexts = [
            new IUIText(370, 920, 20, "1000000", 2),
            new IUIText(370, 957, 20, "RoomName", 2),
            new IUIText(370, 994, 20, "B", 2),
        ];
        this.listDot = [
            new IUIImage(1105, 455, 10, 9, imageModeStandbyDot, 105, 90),
            new IUIImage(1120, 455, 10, 9, imageModeStandbyDot, 105, 90),
            new IUIImage(1135, 455, 10, 9, imageModeStandbyDot, 105, 90),
        ];
        this.listBettingButtons = [];
        this.listLocationButtons = [];
        // this.listLocationArrow = [];
        //this.listTablePanel = [];
        this.listCardDeck = [];
        this.sortButton = [];
        this.madeButton = [];
        this.bEnableBetting = false;
        this.bEnableLocation = false;

        this.listDisableLocations = [];

        this.kSC = kSC;

        //this.listButtons[1].bEnable = false;
        this.listButtons[0].bEnable = false;

        this.bEnableDealingHandCard = false;
        this.fDealingCardElapsedTime = 0;
        this.iLastDealingCardLocation = 0;
        this.listHandCard = [];
        this.listHandCardNum = [];
        this.listTipCard = [];
        this.currentTipIndex = 0;
        //this.strHand = '';

        this.listTableCard = [];
        this.listTableCardTemp = [];

        //this.cMaxPlayer = 9;

        this.listImagesCard = [];
        for (let i = 0; i < 54; ++i) {
            let resource = new IUIImage(0, 0, 130, 180, imageCards[i], 167, 231);

            this.listImagesCard.push(resource);
        }

        this.listImagesCardFrame = new IUIImage(0, 0, 130, 180, imageCardFrames[0], 163, 227);
        this.gameWinCeremony = new IUIImage(0, 0, 1920, 1080, imageWinCeremony, 1920, 1080);
        this.imgrank1 = new IUIImage(500, 240, 100, 100, imageRank[0], 200, 200);
        this.imgrank2 = new IUIImage(500, 410, 100, 100, imageRank[1], 200, 200);
        this.imgrank3 = new IUIImage(500, 575, 100, 100, imageRank[2], 200, 200);
        this.imgrank4 = new IUIImage(500, 740, 100, 100, imageRank[2], 200, 200);
        this.imgrank1Avatar = new IUIImage(620, 240, 100, 100, imageAvatar[0], 160, 160);
        this.imgrank2Avatar = new IUIImage(620, 410, 100, 100, imageAvatar[1], 160, 160);
        this.imgrank3Avatar = new IUIImage(620, 575, 100, 100, imageAvatar[2], 160, 160);
        this.imgrank4Avatar = new IUIImage(620, 740, 100, 100, imageAvatar[3], 160, 160);
        this.textNickname1 = new IUIText(750, 270, 30, "aaa", 1);
        this.textNickname2 = new IUIText(750, 435, 30, "aaabbb", 1);
        this.textNickname3 = new IUIText(750, 605, 30, "aaaaaaaa", 1);
        this.textNickname4 = new IUIText(750, 780, 30, "aaaadsada", 1);
        this.textMoney1 = new IUIText(750, 330, 30, "100,000", 1);
        this.textMoney2 = new IUIText(750, 495, 30, "100,000", 1);
        this.textMoney3 = new IUIText(750, 665, 30, "100,000", 1);
        this.textMoney4 = new IUIText(750, 835, 30, "100,000", 1);
        this.textScore1 = new IUIText(1350, 310, 50, "0", 1);
        this.textScore2 = new IUIText(1350, 475, 50, "0", 1);
        this.textScore3 = new IUIText(1350, 640, 50, "0", 1);
        this.textScore4 = new IUIText(1350, 810, 50, "0", 1);

        //test
        // this.listImagesCardFrame1 = new IUIImage(cTableCardLocations[0].x, cTableCardLocations[0].y, 130, 170, imageCardFrames[0], 163, 227);
        // this.listImagesCardFrame2 = new IUIImage(cTableCardLocations[1].x, cTableCardLocations[0].y, 130, 170, imageCardFrames[0], 163, 227);
        // this.listImagesCardFrame3 = new IUIImage(cTableCardLocations[2].x, cTableCardLocations[0].y, 130, 170, imageCardFrames[0], 163, 227);
        // this.listImagesCardFrame4 = new IUIImage(cTableCardLocations[3].x, cTableCardLocations[0].y, 130, 170, imageCardFrames[0], 163, 227);
        // this.listImagesCardFrame5 = new IUIImage(cTableCardLocations[4].x, cTableCardLocations[0].y, 130, 170, imageCardFrames[0], 163, 227);

        this.kTimer = kTimer;
        this.listCardDealer = [];
        this.iNumCards = 0;

        this.ptDealerLocation = { x: cDealerLocation.x, y: cDealerLocation.y };

        this.listPotManager = [];
        this.listTempPot = [];

        this.kMainUser = null;

        this.iBlind = 0;
        this.listWinCards = [false, false, false, false, false];
        this.fInterval = 0;
        this.bRender = false;
        this.fInterval2 = 0;
        this.iRender = 0;
        this.strWinnerHand = "";
        this.strWinnerDescr = [];
        this.iCurrentX = 0;

        this.listResultCard = [];
        this.listImagesHand = [];
        for (let i = 0; i < 11; ++i) {
            //let image = new IUIImage(this.iCurrentX-155, this.iCurrentY-50, 300, 58, imagePokerHand[i], 300, 58);
            let image = new IUIImage(0, 0, 600, 600, imagePokerHand[i], 600, 600);

            this.listImagesHand.push(image);
        }
        this.listImagesHigh = [];
        for (let i = 0; i < 13; ++i) {
            let image = new IUIImage(0, 0, 600, 600, imageHighNum[i], 600, 600);

            this.listImagesHigh.push(image);
        }
        this.imageComma = new IUIImage(0, 0, 600, 600, imageComma, 600, 600);

        this.bPlaying = false;

        this.resultpot = new IUILabel(965, 630, 28, 35, 23, NumberImages3, 163, 227, "0", 0);
        this.bwin = false;
        this.bAbstentionWin = false;
        this.bRaiseButton = false;
        this.bMobileRaiseButton = false;
        this.bSortNum = true;
        this.bSubmit = false;
        

        this.iBettingCoin = 0;
        this.flags =[];
        this.currentTipIndices = {};
        this.iPasscount = 0;
    }

    //  When i am in a game alone
    Initialize() {
        this.iTotalBettingCoin = 0;
        this.iCallCoin = 0;
        //this.listLabels[0].UpdateCaption("0");
        //this.listLabels[1].UpdateCaption("0");
        this.bEnableBetting = false;
        //this.listButtons[1].bEnable = false;
        this.listButtons[0].bEnable = false;

        this.bEnableDealingHandCard = false;
        this.fDealingCardElapsedTime = 0;
        this.iLastDealingCardLocation = 0;
        this.listHandCard = [];
        this.listHandCardNum = [];
        this.listTableCard = [];
        this.listTableCardTemp = [];
        this.listResultCard = [];
        this.currentTipIndex = 0;
        this.iNumCards = 0;
        this.listWinCards = [false, false, false, false, false];
        this.bSort = false;

        for (let i in this.listPlayers) {
            this.listPlayers[i].Initialize();
        }

        this.listPotManager = [];
        this.listTempPot = [];

        this.strWinnerHand = "";
        this.strWinnerDescr = [];

        this.bPlaying = false;

        this.bwin = false;
        this.bRaiseButton = false;
        this.bMobileRaiseButton = false;
        this.bSortNum = true;
        this.bSubmit = false;
        this.flags =[];
        this.iPasscount = 0;

        //this.iBettingCoin = 0;
        // this.listImagesHand = [];
        // for ( let i = 0; i < 9; ++ i )
        // {
        //     //let image = new IUIImage(this.iCurrentX-155, this.iCurrentY-50, 300, 58, imagePokerHand[i], 300, 58);
        //     let image = new IUIImage(810, 511, 300, 58, imagePokerHand[i], 300, 58);

        //     this.listImagesHand.push(image);
        // }

        //        this.Cleanup();
    }

    //  When leave the game
    Cleanup() {
        this.Initialize();
        this.listPlayers = [];
        this.socket.iLocation = 0;
    }

    StartGame() {
        this.bPlaying = true;
    }

    SetBettingButtons(buttons, isMobile) {
        this.listBettingButtons = buttons;
        this.SetSubmitState(3)
        this.isMobile = isMobile;
    }

    SetMaxPlayer(maxplayer) {
        this.cMaxPlayer = maxplayer;
    }

    SetLocationButtons(buttons) {
        if (this.strOptioncode == 1) {
            //for ( var i = 0; i < 9; ++i)
            for (var i = 0; i < 4; ++i) {
                this.listLocationButtons.push(buttons[i]);
            }
        }
        else if (this.strOptioncode == 2) {
            for (var i = 4; i < 8; ++i) {
                this.listLocationButtons.push(buttons[i]);
            }
        }
    }

    // SetTablePanel(image) {
    //     this.listTablePanel = image;
    // }

    SetSortButton(sortButton) {
        this.sortButton = sortButton;
    }

    SetMadeButton(madeButton)
    {
        this.madeButton = madeButton;
    }

    SetBg(optioncode) {
        this.strOptioncode = optioncode;
    }

    SetDeck(deckcode, image) {
        this.strDeckcode = deckcode;
        if (this.strDeckcode == 1) {
            for (var i = 0; i < 3; ++i) {
                this.listCardDeck.push(image[i]);
            }
        }
        else if (this.strDeckcode == 2) {
            this.listCardDeck = image;
        }
    }
    SetTableReset(){
        console.log("SetTableReset!!!");
        this.listTableCard = [];
        //const player = this.FindUser(strID);
        //player.SetSentReset();
        this.kMainUser.listTableCard = [];
        this.kMainUser.listSentCard = [];
    }
    // AddUser(user)
    // {
    //     this.listPlayers.push(user);
    // }
    SetSubmitState(state) {
        this.listBettingButtons[1].SetState(state);
    }

    AddUser(strID, iCoin, iLocation, iFxLocation, iAvatar) {
        let user = new IUser(
            strID,
            iCoin,
            iLocation,
            iFxLocation,
            iAvatar,
            this.kTimer,
            this.kSC,
        );
        user.OnSize(
            this.kSC.m_fWidthRate,
            this.kSC.m_fHeightRate
        );

        this.listPlayers.push(user);

        if (this.socket.strID == strID) {
            this.kMainUser = user;
        }
    }

    FindUser(strID) {
        for (let i in this.listPlayers) {
            if (this.listPlayers[i].strID == strID) return this.listPlayers[i];
        }
        return null;
    }

    FindUserFromPlayerType(strPlayerType) {
        for (let i in this.listPlayers) {
            if (this.listPlayers[i].strPlayerType == strPlayerType)
                return this.listPlayers[i];
        }
        return null;
    }

    FindUserPassCount()
    {
        let count = 0;
        for(let i in this.listPlayers)
        {
            if(this.listPlayers[i].strLastBetting == 'Pass')
            {count++}
        }
        return count;
    }

    IsFirstTurn(strID)
    {
        const player = this.FindUser(strID);
        console.log("IsfirstTurn :",player.listHandCard.length);
        if(player.listHandCard.length == 13)
        {
            return true;
        }
        else
            return false;
    }

    SortLocationList(list, target) {
        for (let i = 0; i < list.length; ++i) {
            if (list[0] < target) {
                let value = list[0];
                list.shift();
                list.push(value);
            }
        }
    }

    FindNextPlayer(cLocation, cDealerLocation) {
        let list = [];
        for (let i = 0; i < 4; ++i) {
            const cLoc = (cLocation + i) % 4;
            if (cLoc != cLocation && cLoc != cDealerLocation)
                list.push(cLoc);
        }
        this.SortLocationList(list, cDealerLocation);

        for (let j in list) {
            for (let i in this.listPlayers) {
                if (this.listPlayers[i].iLocation == list[j] && true == this.listPlayers[i].bEnablePlay) {
                    console.log(`F.N.P : ${this.listPlayers[i].strID}, ${this.listPlayers[i].iLocation}`);
                    return this.listPlayers[i];
                }
            }
        }
        return null;
    }

    IsCompleteHandCard() {
        //for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        for (let i in this.listPlayers) {
            //let player = this.listUsers.GetSocket(i);
            //if ( player.listHandCard.length != 2 )
            //if ( this.listPlayers[i].listHandCard.length != 2 )
            if (this.listPlayers[i].iNumCards != 13) {
                return false;
            }
        }
        return true;
    }

    GetUserFoldCount(){
        let count = 0;
        for (let i in this.listPlayers) {
            if(this.listPlayers[i].bFold == false)
            {
                count++;
            }
        }
        console.log("GetUserFoldCount  :   ",count);
        return count;
    }

    UpdateCanPlayStatus() {
        if(this.kMainUser.bStarter == true)
        {
            if(isLowestCardValidPlay(this.listHandCardNum, this.kMainUser.listSelectCard))
            {
                this.bSubmit = true;
                this.kMainUser.bCanPlay = true;
                console.log("유효한 카드 조합입니다.");
            }
            else
            {
                this.bSubmit = false;
                this.kMainUser.bCanPlay = false;
                console.log("유효하지 않은 카드 조합입니다.");
            }
        }
        else
        {
            if (this.kMainUser.listTableCard.length != 0) {
                console.log(this.kMainUser.listSelectCard);
                console.log(this.kMainUser.listTableCard);
                if (canPlay(this.kMainUser.listSelectCard, this.kMainUser.listTableCard)) {
                    this.bSubmit = true;
                    this.kMainUser.bCanPlay = true;
                    console.log("카드를 놓을 수 있습니다.");
                }
                else {
                    this.bSubmit = false;
                    this.kMainUser.bCanPlay = false;
                    console.log("카드를 놓을 수 없습니다.");
                }
            }
            else {
                console.log(this.listSelectCard);
                if (isValidPlay(this.kMainUser.listSelectCard)) {
                    this.bSubmit = true;
                    this.kMainUser.bCanPlay = true;
                    console.log("유효한 카드 조합입니다.");
                }
                else {
                    this.bSubmit = false;
                    this.kMainUser.bCanPlay = false;
                    console.log("유효하지 않은 카드 조합입니다.");
                }

            }
        }
    }


    GetTipsCard() {
        console.log("GetTipsCard");
        console.log(this.kMainUser.listHandCard.length);
        console.log(this.listTipCard.length);

        if (this.listTipCard.length === 0) {
            return;
        }

        this.currentTipIndex = this.listTipCard.length - 1;
        const tip = this.listTipCard[this.currentTipIndex];

        this.kMainUser.listSelectCard = [];
        for(let i in this.kMainUser.listHandCard)
        {
            this.kMainUser.listHandCard[i].select = false;
        }
        for (let j = 0; j < this.kMainUser.listHandCard.length; j++) {
            this.kMainUser.listHandCard[j].select = tip.cards.includes(this.kMainUser.listHandCard[j].index);
            if(this.kMainUser.listHandCard[j].select)
            {
                //console.log(this.kMainUser.listHandCard[j].index);
                this.kMainUser.listSelectCard.push(this.kMainUser.listHandCard[j].index);
            }
        }

        if (this.listTipCard.length > 1) {
            this.listTipCard.splice(this.currentTipIndex, 1);
        }
        this.UpdateCanPlayStatus();
    }

    GetMadeButton(type) {
        // 필터링된 카드 조합을 가져옵니다.
        const filteredCards = this.listMadeCard.filter(tip => tip.type === type);
    
        // 선택된 카드를 초기화합니다.
        this.kMainUser.listSelectCard = [];
    
        if (filteredCards.length > 0) {
            // 현재 인덱스가 저장되어 있지 않으면 초기화합니다.
            if (this.currentTipIndices[type] === undefined) {
                this.currentTipIndices[type] = filteredCards.length - 1;
            }
        
            // 인덱스가 배열의 범위를 벗어나지 않도록 조정합니다.
            this.currentTipIndices[type] = this.currentTipIndices[type] % filteredCards.length;
        
            // 현재 인덱스의 카드 조합을 선택합니다.
            const selectedCards = filteredCards[this.currentTipIndices[type]].cards;
    
            // listHandCard에서 선택된 카드를 찾고 select 프로퍼티를 업데이트합니다.
            for (let i = 0; i < this.kMainUser.listHandCard.length; i++) {
                this.kMainUser.listHandCard[i].select = selectedCards.includes(this.kMainUser.listHandCard[i].index);
    
                // 선택된 카드를 listSelectCard에 추가합니다.
                if (this.kMainUser.listHandCard[i].select) {
                    this.kMainUser.listSelectCard.push(this.kMainUser.listHandCard[i].index);
                }
            }
    
            // 인덱스를 감소시키고 처음 조합에 도달한 경우 인덱스를 배열의 마지막 인덱스로 초기화합니다.
            this.currentTipIndices[type] = (this.currentTipIndices[type] - 1 + filteredCards.length) % filteredCards.length;
            this.UpdateCanPlayStatus();
        }
    }

    UpdateFlags()
    {
        this.flags = {
            isSingle: false,
            isPair: false,
            isTriple: false,
            isStraight: false,
            isFlush: false,
            isFullHouse: false,
            isFourOfAKind: false,
            isStraightFlush: false,
        };
        console.log(this.listTipCard);
        this.listTipCard.forEach((tip) => {
            this.flags['is' + tip.type.charAt(0).toUpperCase() + tip.type.slice(1)] = true;
        });
        console.log(this.flags);
    }
    SettingMadeButton() {
        console.log("SettingMadeButton");
         // 버튼 위치 초기화
        this.resetMadeButtonPositions();

        let offsetX = 0;
        for (let i = 0; i < this.madeButton.length; i++) {
            const buttonType = Object.keys(this.flags)[i];
            const currentButton = this.madeButton[i];
            currentButton.bEnable = this.flags[buttonType];
            if (this.flags[buttonType]) {
                currentButton.SetLocationX(offsetX);
            } else {
                offsetX += currentButton.width;
                //this.madeButton[i-1].SetLocationX(offsetX);
                currentButton.SetLocationX(-1000); // 버튼을 화면 밖으로 이동
            }
        }
    }

    resetMadeButtonPositions()
    {
        for (let i = 0; i < this.madeButton.length; i++) {
            this.madeButton[i].SetOriginalLocation(this.kSC.GetLocation(ELocationIndex.Single + parseInt(i)).x);
            //console.log(this.kSC.GetLocation(ELocationIndex.Single + parseInt(i)).x);
        }
    }

    RemoveUser(objectPlayer) {
        console.log(`RemoveUser : Length(${this.listPlayers.length})`);
        for (let i in this.listPlayers) {
            console.log(
                `RemoveUser : ${objectPlayer.strID}, ${this.listPlayers[i].strID}`
            );
            if (this.listPlayers[i].strID == objectPlayer.strID) {
                this.listPlayers.splice(i, 1);
                console.log(`RemoveUser Length : ${this.listPlayers.length}`);

                if (true == this.bEnableLocation) {
                    for (let j in this.listDisableLocations) {
                        if (this.listDisableLocations[j] == objectPlayer.iLocation) {
                            this.listDisableLocations.splice(j, 1);
                        }
                    }
                }

                return;
            }
        }
    }
    RemoveCard(index) {
        for (let i in this.listHandCardNum) {
            if (this.listHandCardNum[i] == index) {
                this.listHandCardNum.splice(i, 1);
                return;
            }
        }
    }

    Render(ctx) {
        // ctx.fillStyle = "black";
        // ctx.fillRect(0, 0, 1920, 1080);

        if (parseInt(this.strOptioncode) == 1) {
            this.listBgs[0].Render(ctx);
            //this.listTablePanel[0].Render(ctx);
            this.listBgs[3].Render(ctx);
        } else if (parseInt(this.strOptioncode) == 2) {
            this.listBgs[1].Render(ctx);
            //this.listTablePanel[1].Render(ctx);
            this.listBgs[2].Render(ctx);
        }
        for (let i in this.listCardDeck) {
            this.listCardDeck[i].Render(ctx)
        }
        if (this.bSort == true) {
            if (this.bSortNum == true) {
                this.sortButton[1].Render(ctx);
            }
            else {
                this.sortButton[0].Render(ctx);
            }
        }
        if (true == this.bEnableBetting) {
            for(let i in this.madeButton)
            {
                this.madeButton[i].Render(ctx);
            }
        }
        for (let i in this.listImages) {
            //if ( i == 5 && this.kMainUser.iLocation != -1 )
            if (i == 2 && this.bPlaying == true && this.kMainUser != null && this.kMainUser.iLocation == -1) continue;
            if (i == 2 && this.kMainUser == null) continue;
            if (i == 2 && this.bPlaying == true) continue;
            this.listImages[i].Render(ctx);
        }
        if (
            this.bPlaying == false &&
            this.kMainUser != null &&
            this.kMainUser.iLocation != -1
        ) {
            this.listDot[this.iRender].Render(ctx);
        }

        for (let i in this.listButtons) {
            this.listButtons[i].Render(ctx);
        }

        if (true == this.bEnableLocation) {
            for (let i in this.listLocationButtons) {
                if (true == this.IsEnableLocation(i)) {
                    // this.fArrowElapsedTime -= this.kTimer.GetElapsedTime();
                    // if ( this.fArrowElapsedTime < 0 )
                    // {
                    //     this.bRenderArrow = !this.bRenderArrow;
                    //     this.fArrowElapsedTime = 0.5;
                    // }
                    // if ( this.bRenderArrow == true ){}

                    this.listLocationButtons[i].Render(ctx);
                    // if(this.bRender == true){
                    //   this.listLocationArrow[i].Render(ctx);
                    // }
                }
            }
        }

        for (let i in this.listTexts) {
            this.listTexts[i].Render(ctx);
        }

        for (let i in this.listPlayers) {
            this.listPlayers[i].Render(ctx);
        }
        for (let i in this.listPotManager) {
            this.listPotManager[i].Render(ctx);
        }
        if (this.fInterval >= 0) {
            this.fInterval -= this.kTimer.GetElapsedTime();
            if (this.fInterval <= 0) {
                this.bRender = !this.bRender;
                this.fInterval = 0.4;
            }
        }

        if (this.fInterval2 >= 0) {
            this.fInterval2 += this.kTimer.GetElapsedTime();
            if (this.fInterval2 >= 0 && this.fInterval2 < 0.2) {
                this.iRender = 0;
            }
            else if (this.fInterval2 > 0.2 && this.fInterval2 < 0.4) {
                this.iRender = 1;
            }
            else if (this.fInterval2 > 0.4 && this.fInterval2 < 0.6) {
                this.iRender = 2;
            }
            else if (this.fInterval2 > 0.6) {
                this.fInterval2 = 0;
            }
        }
        // for (let i in this.listLabels) {
        //     this.listLabels[i].Render(ctx);
        // }
        for (let i in this.listCardDealer) {
            this.listCardDealer[i].Render(ctx);
        }
        //test
        //this.gameWinCeremony.Render(ctx);
        //  this.resultpot.Render(ctx);
        // this.listImagesCardFrame1.Render(ctx);
        // this.listImagesCardFrame2.Render(ctx);
        // this.listImagesCardFrame3.Render(ctx);
        // this.listImagesCardFrame4.Render(ctx);
        // this.listImagesCardFrame5.Render(ctx);

        if (this.strWinnerHand != "") {
            switch (this.strWinnerHand) {
                case "High Card":
                    this.listImagesHand[0].RenderLocation(ctx, 760, 71);
                    break;
                case "Pair":
                    this.listImagesHand[1].RenderLocation(ctx, 720, 71);
                    break;
                case "Two Pair":
                    this.listImagesHand[2].RenderLocation(ctx, 750, 71);
                    break;
                case "Three of a Kind":
                    this.listImagesHand[3].RenderLocation(ctx, 720, 71);
                    break;
                case "Straight":
                    this.listImagesHand[4].RenderLocation(ctx, 750, 71);
                    break;
                case "Mountain":
                    this.listImagesHand[5].RenderLocation(ctx, 680, 71);
                    break;
                case "Flush":
                    this.listImagesHand[6].RenderLocation(ctx, 720, 71);
                    break;
                case "Full House":
                    this.listImagesHand[7].RenderLocation(ctx, 765, 71);
                    break;
                case "Four of a Kind":
                    this.listImagesHand[8].RenderLocation(ctx, 720, 71);
                    break;
                case "Straight Flush":
                    this.listImagesHand[9].RenderLocation(ctx, 780, 71);
                    break;
                case "Royal Flush":
                    this.listImagesHand[10].RenderLocation(ctx, 680, 71);
                    break;
            }
        }
        if (this.strWinnerDescr[0] != '' && this.strWinnerHand != 'Mountain') {
            for (let i in this.strWinnerDescr) {

                switch (this.strWinnerDescr[i]) {
                    case "Ac":
                        this.listImagesHigh[0].RenderLocation(ctx, this.iCurrentX + (i * 40), 71);
                        break;
                    case "A":
                        this.listImagesHigh[0].RenderLocation(ctx, this.iCurrentX + (i * 40), 71);
                        break;
                    case "2":
                        this.listImagesHigh[1].RenderLocation(ctx, this.iCurrentX + (i * 40), 71);
                        break;
                    case "3":
                        this.listImagesHigh[2].RenderLocation(ctx, this.iCurrentX + (i * 40), 71);
                        break;
                    case "4":
                        this.listImagesHigh[3].RenderLocation(ctx, this.iCurrentX + (i * 40), 71);
                        break;
                    case "5":
                        this.listImagesHigh[4].RenderLocation(ctx, this.iCurrentX + (i * 40), 71);
                        break;
                    case "6":
                        this.listImagesHigh[5].RenderLocation(ctx, this.iCurrentX + (i * 40), 71);
                        break;
                    case "7":
                        this.listImagesHigh[6].RenderLocation(ctx, this.iCurrentX + (i * 40), 71);
                        break;
                    case "8":
                        this.listImagesHigh[7].RenderLocation(ctx, this.iCurrentX + (i * 40), 71);
                        break;
                    case "9":
                        this.listImagesHigh[8].RenderLocation(ctx, this.iCurrentX + (i * 40), 71);
                        break;
                    case "10":
                        this.listImagesHigh[9].RenderLocation(ctx, this.iCurrentX + (i * 40), 71);
                        break;
                    case "J":
                        this.listImagesHigh[10].RenderLocation(ctx, this.iCurrentX + (i * 40), 71);
                        break;
                    case "Q":
                        this.listImagesHigh[11].RenderLocation(ctx, this.iCurrentX + (i * 40), 71);
                        break;
                    case "K":
                        this.listImagesHigh[12].RenderLocation(ctx, this.iCurrentX + (i * 40), 71);
                        break;
                    case ",":
                        this.imageComma.RenderLocation(ctx, this.iCurrentX + (i * 40), 85);
                        break;
                }
            }
        }
        //test gamewinceremony
        // this.gameWinCeremony.Render(ctx);
        // for (let i = 0; i < 4; i++) {
        //   // 렌더링 순위에 따라 UI 요소 배열을 순서대로 추가합니다.
        //   const elements = [
        //     this[`imgrank${i + 1}`],
        //     this[`imgrank${i + 1}Avatar`],
        //     this[`textNickname${i + 1}`],
        //     this[`textMoney${i + 1}`],
        //     this[`textScore${i + 1 }`]
        //   ];

        //   // UI 요소 배열을 순서대로 렌더링합니다.
        //   for (const element of elements) {
        //     element.Render(ctx);
        //   }
        // }
        if (this.bwin == true) {
            this.gameWinCeremony.Render(ctx);
            for (let i = 0; i < this.listPlayers.length; i++) {
                // 렌더링 순위에 따라 UI 요소 배열을 순서대로 추가합니다.
                const elements = [
                    this[`imgrank${i + 1}`],
                    this[`imgrank${i + 1}Avatar`],
                    this[`textNickname${i + 1}`],
                    this[`textMoney${i + 1}`],
                    this[`textScore${i + 1}`]
                ];

                // UI 요소 배열을 순서대로 렌더링합니다.
                for (const element of elements) {
                    element.Render(ctx);
                }
            }
            if (this.listResultCard.length > 0) {
                // listResultCard가 객체이면 배열로 변환
                if (!Array.isArray(this.listResultCard)) {
                    this.listResultCard = [this.listResultCard];
                }
                const iOffset = 20;
                let tx = 0;
                let ty = 0;

                console.log(this.listResultCard);
                for (let i in this.listResultCard) {
                    const iRank = this.listResultCard[i].iRank;
                    const listHandCard = this.listResultCard[i].listHandCard;
                    if (iRank == 2) {
                        for(let j in listHandCard) {
                            tx = 900 + (j * iOffset);
                            ty = 410;
                            this.listImagesCard[listHandCard[j]].RenderLS(ctx, tx, ty, 0.5);
                        }
                    } else if (iRank == 3) {
                        for(let j in listHandCard) {
                            tx = 900 + (j * iOffset);
                            ty = 575;
                            this.listImagesCard[listHandCard[j]].RenderLS(ctx, tx, ty, 0.5);
                        }
                    } else if (iRank == 4) {
                        for(let j in listHandCard) {
                            tx = 900 + (j * iOffset);
                            ty = 740;
                            this.listImagesCard[listHandCard[j]].RenderLS(ctx, tx, ty, 0.5);
                        }
                    }
                }
            }
        }
        if (true == this.bEnableBetting) {
            for (let i in this.listBettingButtons) {
                this.listBettingButtons[i].Render(ctx);
                if ((this.kMainUser.bCanPlay == true && this.bSubmit == true)) {
                    this.SetSubmitState(0);
                }
                else if(this.kMainUser.bCanPlay == true){
                    this.bSubmit = true;
                    this.SetSubmitState(0);
                }
                else {
                    this.bSubmit = false;
                    this.kMainUser.bCanPlay = false;
                    this.SetSubmitState(3);
                }
            }
        }
    }

    Update() {
        for (let i in this.listPlayers) {
            this.listPlayers[i].Update();
        }

        for (let i in this.listPotManager) {
            this.listPotManager[i].Update();
        }
        //  Hand Card
        if (true == this.bEnableDealingHandCard) {
            //++ this.fDealingCardElapsedTime;
            this.fDealingCardElapsedTime += this.kTimer.GetElapsedTime();

            //if ( this.fDealingCardElapsedTime > 30 )
            if (this.fDealingCardElapsedTime > 0.05) {
                let player = this.FindNextPlayer(this.iLastDealingCardLocation, -1);
                if (null != player) {
                    //if ( player.listHandCard.length < 2 )
                    //if ( player.listTempHandCard.length < 2 )
                    if (player.iNumCards < 13) {
                        this.fDealingCardElapsedTime = 0;

                        if (player.strID == this.socket.strID) {
                            //player.listHandCard.push(this.listHandCard[player.listHandCard.length]);

                            console.log(`player.AddHandCard() : ${this.listHandCard.length}`);
                            console.log(player.iNumCards);
                            console.log(this.listHandCard);

                            player.AddHandCard(this.listHandCard[player.iNumCards], this.strDeckcode);
                        }
                        //player.listHandCard.push(52);
                        else if (this.strDeckcode == 1) player.AddHandCard(52, this.strDeckcode);
                        else if (this.strDeckcode == 2) player.AddHandCard(53, this.strDeckcode);

                        this.iLastDealingCardLocation = player.iLocation;

                        if (true == this.IsCompleteHandCard()) {
                            this.bEnableDealingHandCard = false;
                            this.bSort = true;
                        }
                    }
                }
            }
        }

        // if (this.kMainUser != null) {
        //   if (
        //     this.kMainUser.bFocus == true &&
        //     this.kMainUser.iBettingTime <= 0 &&
        //     this.bEnableBetting == true
        //   ) {
        //     console.log(`Auto Fold ${this.iCallCoin}`);

        //     if (this.iCallCoin == 0) {
        //       OnClickCheck(this);
        //     } else OnClickFold(this);

        //     this.kMainUser.iAutoFoldCounter++;
        //     if (this.kMainUser.iAutoFoldCounter >= 3) {
        //       window.close();
        //     }
        //   }
        // }
    }

    ProcessLocation(listPlayers) {
        this.bEnableLocation = true;

        this.listDisableLocations = [];

        for (let i in listPlayers) {
            if (listPlayers[i].iLocation != -1) {
                //const objectPlayer = {strID:listPlayers[i].strID, iLocation:listPlayers[].iLocation}

                //this.ProcessLocationSingle(listPlayers[i]);
                this.listDisableLocations.push(listPlayers[i].iLocation);

                console.log(
                    `############# ${listPlayers[i].strID}, ${listPlayers[i].iLocation}`
                );
                this.AddUser(
                    listPlayers[i].strID,
                    listPlayers[i].iCoin,
                    listPlayers[i].iLocation,
                    listPlayers[i].iLocation,
                    listPlayers[i].iAvatar,
                );
            }
        }
        console.log(`ProcessLocation`);
        console.log(this.listDisableLocations);
    }

    // ProcessLocationSingle(objectPlayer)
    // {
    //     console.log(objectPlayer);
    //     console.log(`ProcessLocationSingle ${objectPlayer.strID}, ${objectPlayer.iLocation}, MyPlace : ${this.socket.iLocation}`);

    //      this.listDisableLocations.push(objectPlayer.iLocation);

    //     console.log(`MyLocation : ${this.socket.iLocation}`);
    //     let iFx = ((objectPlayer.iLocation - this.socket.iLocation)+9) % 9;

    //     //this.AddUser(objectPlayer.strID, objectPlayer.iLocation, objectPlayer.iLocation);
    //     this.AddUser(objectPlayer.strID, objectPlayer.iCoin, objectPlayer.iLocation, iFx);
    // }

    ProcessLocationSingle(objectPlayer) {
        console.log(objectPlayer);
        console.log(
            `ProcessLocationSingle ${objectPlayer.strID}, ${objectPlayer.iLocation}, MyPlace : ${this.socket.iLocation}, Avatar : ${objectPlayer.iAvatar}`
        );

        let iMyLocation = 0;
        if (this.socket.iLocation != undefined) iMyLocation = this.socket.iLocation;
        this.listDisableLocations.push(objectPlayer.iLocation);

        console.log(`MyLocation : ${iMyLocation}`);
        let iFx = (objectPlayer.iLocation - iMyLocation + 4) % 4;

        //this.AddUser(objectPlayer.strID, objectPlayer.iLocation, objectPlayer.iLocation);
        this.AddUser(
            objectPlayer.strID,
            objectPlayer.iCoin,
            objectPlayer.iLocation,
            iFx,
            objectPlayer.iAvatar,
            this.kTimer,
            this.kSC
        );
    }

    ProcessLocationComplete(strID, iCoin, iLocation, iAvatar) {
        this.bEnableLocation = false;

        this.socket.iLocation = iLocation;
        console.log(`MyLocation On C : ${this.socket.iLocation}`);

        for (let i in this.listPlayers) {
            //let iFx = (this.listPlayers[i].iLocation - iLocation + 9) % 9;
            let iFx = (this.listPlayers[i].iLocation - iLocation + 4) % 4;
            console.log(`Target iFx : ${iFx}, Mine : ${iLocation}, Target Origin : ${this.listPlayers[i].iLocation}`);

            this.listPlayers[i].Locate(iFx);
            this.listPlayers[i].OnSize(this.kSC.m_fWidthRate, this.kSC.m_fHeightRate);
        }

        this.AddUser(strID, iCoin, iLocation, 0, iAvatar, this.kTimer, this.kSC);
    }

    IsEnableLocation(iLocation) {
        for (let i in this.listDisableLocations) {
            if (iLocation == this.listDisableLocations[i]) return false;
        }
        return true;
    }

    SetTableCard(strID, listTableCard)
    {
        const player = this.FindUser(strID);
        for( let i in listTableCard)
        {
            player.AddSentCard(listTableCard[i].index,this.strDeckcode, i);
        }
    }
    SetPlayerType(listData) {
        console.log(`SetPlayerType : ${listData.length}`);

        for (let i in listData) {
            console.log(`${listData[i].strID}, ${listData[i].strPlayerType}`);
            let player = this.FindUser(listData[i].strID);
            console.log(player);
            if (null != player) {
                console.log(`SetPlayerType : ${listData[i].strPlayerType}`);
                player.SetPlayerType(listData[i].strPlayerType);
            }
        }
    }
    SetPlayerTurn(strID, strBetting, listCards) {
        let player = this.FindUser(strID);
        if(!this.IsFirstTurn(strID))
        {
            player.bStarter = false;
        }
        if (strBetting == 'Pass')
        {
            player.listSentCard = [];
        }
        else {
            console.log(listCards);
            player.bBettingMode = true;
            if (null != player) {
                //this.listTableCard = [];
                this.listTableCardTemp = listCards;
                player.MyTurn(strBetting, listCards);
                console.log("SetPlayerTurn");
                console.log(listCards);
                if(listCards != null)
                {
                    this.listTableCard = [];
                }
                for (let i in listCards) {
                    console.log(`listcards : ${listCards[i]}`);
                    this.listTableCard.push(listCards[i].index);
                    this.RemoveCard(listCards[i].index);
                    for(let j in this.listPlayers)
                    {
                        this.listPlayers[j].listTableCard = [];
                        this.listPlayers[j].listTableCard.push(listCards[i].index);
                    }
                    //++this.iNumCards;
                }
                this.iNumCards = 0;
            }
        }
    }

    SetPlayerBetting(listData) {
        //this.iBettingCoin = listData[i].iBettingCoin;
        for (let i in this.listPlayers) {
            this.iBettingCoin = listData[i].iBettingCoin;
            let player = this.FindUser(listData[i].strID);
            //let iMyCoin = parseInt(listData[i].iCoin)-parseInt(listData[i].iBettingCoin);
            if (null != player) {
                this.iTotalBettingCoin += parseInt(listData[i].iBettingCoin);
                player.Betting(listData[i].iBettingCoin, listData[i].iCoin);
            }
        }
    }

    SetPlayerBettingDelete() {
        for (let i in this.listPlayers) {
            this.listPlayers[i].bBettingMode = false;
            this.listPlayers[i].ibettingCallCoin = 0;
        }
    }

    SetWinnerHighText(descr, strHandName) {
        let array = descr.split(', ');
        let array2 = [];

        if (array.length < 2 && strHandName != 'High Card')
            return array2;

        if (strHandName == 'High Card') {
            array.push(array[0]);
        }
        let string = array[1];

        let index = string.indexOf(" & ");
        if (index != -1) {
            array2 = string.split(' ');
        }
        else {
            index = string.indexOf(" over ");
            if (index != -1) {
                array2 = string.split(' ');
            }
            else {
                array2.push(string);
            }
        }
        for (let i in array2) {
            array2[i] = array2[i].replace(' ', '');
            array2[i] = array2[i].replace("'s", '');
            array2[i] = array2[i].replace("d High", '');
            array2[i] = array2[i].replace("h High", '');
            array2[i] = array2[i].replace("c High", '');
            array2[i] = array2[i].replace("s High", '');
            array2[i] = array2[i].replace("High", '');
            array2[i] = array2[i].replace("over", ',');
            array2[i] = array2[i].replace("&", ',');
        }
        if (array2.length > 1) this.iCurrentX = 550;
        else this.iCurrentX = 610;

        return array2;
    }

    UpdateTotalBettingCoin() {
        console.log(this.iTotalBettingCoin);
        //this.iTotalBettingCoin = iCoin;
        //this.listLabels[0].UpdateCaption(this.iTotalBettingCoin.toString());
    }

    UpdateGameInfo(strGameName, iBlind) {
        //this.listTexts[1].UpdateCaption(`${strGameName}   ${parseInt(iBlind)/1000}K / ${parseInt(iBlind)*2/1000}K`);
        this.listTexts[1].UpdateCaption(strGameName);
        this.listTexts[2].UpdateCaption(
            `${(parseInt(iBlind) * 2) / 1000}K`
        );
        this.iBlind = parseInt(iBlind);
    }

    UpdatePoint(iPoint) {
        this.listTexts[0].UpdateCaption(iPoint.toLocaleString());
    }

    EnableBetting(strID,objectData) {
        //console.log(`IModeGame::EnableBetting ${objectData.iCallAmount}`);
        console.log("EnableBetting");
        console.log(shouldAutoPass(this.listHandCardNum, this.listTableCard));
        if(shouldAutoPass(this.listHandCardNum, this.listTableCard))
        {
            console.log("shouldAutoPass!!!");
            let list = [];

            let objectBetting = {strBetting:'Pass', list:list };
            this.socket.emit('CM_Submit', objectBetting);
            this.bEnableBetting = false;
            this.kMainUser.bTrunStart = false;
            return;
        }
        let player = this.FindUser(strID);
        player.bBettingMode = false;
        player.bTrunStart = true;
        player.bCanPlay = false;
        this.bSubmit = false;
        //this.listLabels[1].UpdateCaption(objectData.iCallAmount.toString());
        this.bEnableBetting = true;
        this.bRaiseButton = false;
        //this.CheckBettingCoin(objectData.iCallAmount);
        //this.CheckBettingCoin(objectData.iCallAmount + this.iBlind);
        this.listTipCard = [];
        this.listMadeCard = [];
        this.listMadeCard = [];
        this.listTipCard = generateValidCombinations(this.listHandCardNum, this.listTableCard);
        this.listMadeCard = generateValidCombinations(this.listHandCardNum, this.listTableCard);
        this.UpdateFlags();
        this.SettingMadeButton();
        for (let i in this.listBettingButtons) {
            this.listBettingButtons[i].bEnable = true;
        }
    }

    Focus(strID, iBettingTime) {
        for (let i in this.listPlayers) {
            this.listPlayers[i].bFocus = false;
            //this.listPlayers[i].iBettingTime = 0;
            this.listPlayers[i].SetBettingTime(0);
        }

        let player = this.FindUser(strID);
        if (null != player) {
            player.bFocus = true;
            //player.iBettingTime = parseInt(iBettingTime);
            player.SetBettingTime(iBettingTime);
        }
    }

    SetHandCard(listCard) {
        //let player = this.FindUserFromPlayerType("Dealer");
        //player.listHandCard = listCard;
        this.bEnableDealingHandCard = true;
        //this.iLastDealingCardLocation = player.iLocation;
        this.listHandCard = listCard;
        console.log("SetHandCard");
        console.log(this.listHandCard);
        for (let i in this.listHandCard) {
            this.listHandCardNum.push(this.listHandCard[i]);
            //console.log(this.listHandCard[i].index);
        }

        // let mainuser = this.FindUser(this.socket.strID);
        // mainuser.strHand.UpdateCaption(strHand);
        //this.kMainUser.textHand.UpdateCaption(strHand);
    }

    ProcessResult(listResult, cPlayingUser) {
        console.log(`ProcessResult : NumWinners ${listResult.length} cPlayingUser : ${cPlayingUser}`);
        console.log(listResult);
        this.bwin = true;
        //this.listResultCard = {};
        for (let i in this.listPlayers) {
            this.listPlayers[i].bFocus = false;
        }
        for (let i in listResult) {
            let player = this.FindUser(listResult[i].strID);
            if (null != player) {
                console.log(
                    `Winner Location : ${player.iLocation}, ID : ${player.strID}`
                );
                player.bBettingMode = false;
                let resultCoin = '0';
                if(listResult[i].iRank != 1)
                {
                    this.listResultCard.push({iRank:listResult[i].iRank,listHandCard: i === 0 ? null : listResult[i].listHandCard});
                }
                if (listResult[i].iWinCoin > 0) {
                    resultCoin = '-' + this.iBettingCoin.toString();
                    this.iBettingCoin = 0;
                }
                if (listResult[i].iRank == 1) {
                    player.bWinner = true;
                    player.iWinCoin = listResult[i].iWinCoin;
                    this.textNickname1.UpdateCaption(listResult[i].strID);
                    this.textMoney1.UpdateCaption(listResult[i].iWinCoin.toString());
                    this.imgrank1Avatar.sprite = imageAvatar[listResult[i].iAvatar];
                    this.textScore1.UpdateCaption(listResult[i].iScore);
                }
                else if (listResult[i].iRank == 2) {
                    this.textNickname2.UpdateCaption(listResult[i].strID);
                    this.textMoney2.UpdateCaption(resultCoin);
                    this.imgrank2Avatar.sprite = imageAvatar[listResult[i].iAvatar];
                    this.textScore2.UpdateCaption(listResult[i].iScore);
                }
                else if (listResult[i].iRank == 3) {
                    this.textNickname3.UpdateCaption(listResult[i].strID);
                    this.textMoney3.UpdateCaption(resultCoin);
                    this.imgrank3Avatar.sprite = imageAvatar[listResult[i].iAvatar];
                    this.textScore3.UpdateCaption(listResult[i].iScore);
                }
                else if (listResult[i].iRank == 4) {
                    this.textNickname4.UpdateCaption(listResult[i].strID);
                    this.textMoney4.UpdateCaption(resultCoin);
                    this.imgrank4Avatar.sprite = imageAvatar[listResult[i].iAvatar];
                    this.textScore4.UpdateCaption(listResult[i].iScore);
                }
                player.UpdateMyCoin(listResult[i].iCoin);
                player.ResetProgressbar();
                if (player.iWinCoin != null) {
                    console.log(`WinCoin : ${player.iWinCoin}, ID : ${player.strID}`);
                    this.resultpot.UpdateCaption(player.iWinCoin.toString());
                }
            }
        }
    }

    ProcessRebuyIn(listObject) {
        for (let i in listObject) {
            let player = this.FindUser(listObject[i].strID);
            if (null != player) {
                player.UpdateMyCoin(listObject[i].iCoin);

                console.log(`ProcessRebuyIn : strID : ${this.socket.strID}`);

                //if ( listObject[i].strID == this.socket.strID && listObject[i].iCoin == 0 )
                if (listObject[i].strID == this.socket.strID) {
                    if (listObject[i].bQuit == true) {
                        //this.socket.emit('CM_LeaveGame');
                        this.RemoveUser(listObject[i])
                        if (window.confirm("리바인 금액이나 리바인 설정을 확인해주세요")) {
                            window.close();
                        }
                        else {
                            window.close();
                        }
                    }
                    else this.UpdatePoint(listObject[i].iPoint);
                }
            }
        }
    }

    OnIO() { }

    OnSize(fHR, fVR) {
        this.gameWinCeremony.OnSize(fHR, fVR);
        this.imgrank1.OnSize(fHR, fVR);
        this.imgrank2.OnSize(fHR, fVR);
        this.imgrank3.OnSize(fHR, fVR);
        this.imgrank4.OnSize(fHR, fVR);
        this.imgrank1Avatar.OnSize(fHR, fVR);
        this.imgrank2Avatar.OnSize(fHR, fVR);
        this.imgrank3Avatar.OnSize(fHR, fVR);
        this.imgrank4Avatar.OnSize(fHR, fVR);
        this.textNickname1.OnSize(fHR, fVR);
        this.textNickname2.OnSize(fHR, fVR);
        this.textNickname3.OnSize(fHR, fVR);
        this.textNickname4.OnSize(fHR, fVR);
        this.textMoney1.OnSize(fHR, fVR);
        this.textMoney2.OnSize(fHR, fVR);
        this.textMoney3.OnSize(fHR, fVR);
        this.textMoney4.OnSize(fHR, fVR);
        this.textScore1.OnSize(fHR, fVR);
        this.textScore2.OnSize(fHR, fVR);
        this.textScore3.OnSize(fHR, fVR);
        this.textScore4.OnSize(fHR, fVR);
        this.resultpot.OnSize(fHR, fVR);
        this.imageComma.OnSize(fHR, fVR);

        //test
        // this.listImagesCardFrame1.OnSize(fHR, fVR);
        // this.listImagesCardFrame2.OnSize(fHR, fVR);
        // this.listImagesCardFrame3.OnSize(fHR, fVR);
        // this.listImagesCardFrame4.OnSize(fHR, fVR);
        // this.listImagesCardFrame5.OnSize(fHR, fVR);

        this.ptDealerLocation.x = cDealerLocation.x * fHR;
        this.ptDealerLocation.y = cDealerLocation.y * fVR;
        for (let i in this.listBgs) {
            this.listBgs[i].OnSize(fHR, fVR);
        }
        for (let i in this.listCardDeck) {
            this.listCardDeck[i].OnSize(fHR, fVR);
        }

        // for (let i in this.listTablePanel) {
        //     this.listTablePanel[i].OnSize(fHR, fVR);
        // }

        for (let i in this.listImages) {
            this.listImages[i].OnSize(fHR, fVR);
        }

        for (let i in this.sortButton) {
            this.sortButton[i].OnSize(fHR, fVR);
        }

        for (let i in this.madeButton) {
            this.madeButton[i].OnSize(fHR, fVR);
        }

        for (let i in this.listButtons) {
            this.listButtons[i].OnSize(fHR, fVR);
        }

        for (let i in this.listBettingButtons) {
            this.listBettingButtons[i].OnSize(fHR, fVR);
        }

        for (let i in this.listLocationButtons) {
            this.listLocationButtons[i].OnSize(fHR, fVR);
        }

        for (let i in this.listPlayers) {
            this.listPlayers[i].OnSize(fHR, fVR);
        }

        // for (let i in this.listLabels) {
        //     this.listLabels[i].OnSize(fHR, fVR);
        // }
        for (let i in this.listDot) {
            this.listDot[i].OnSize(fHR, fVR);
        }
        for (let i in this.listTexts) {
            this.listTexts[i].OnSize(fHR, fVR);
        }

        for (let i in this.listImagesCard) {
            this.listImagesCard[i].OnSize(fHR, fVR);
        }
        this.listImagesCardFrame.OnSize(fHR, fVR);

        for (let i in this.listCardDealer) {
            this.listCardDealer[i].OnSize(fHR, fVR);
        }

        for (let i in this.listPotManager) {
            this.listPotManager[i].OnSize(fHR, fVR);
        }

        for (let i in this.listImagesHand) {
            this.listImagesHand[i].OnSize(fHR, fVR);
        }
        for (let i in this.listImagesHigh) {
            this.listImagesHigh[i].OnSize(fHR, fVR);
        }

    }

    OnClick(mouse) {
        for (let i in this.listButtons) {
            this.listButtons[i].Click(mouse, this);
        }

        if (this.bSortNum == true) this.sortButton[1].Click(mouse, this);
        else this.sortButton[0].Click(mouse, this);

        for(let i in this.madeButton)
        {
            this.madeButton[i].Click(mouse, this);
        }

        if (true == this.bEnableBetting) {
            for (let i in this.listBettingButtons)
                this.listBettingButtons[i].Click(mouse, this);
        }
        if (true == this.bEnableLocation) {
            for (let i in this.listLocationButtons) {
                if (true == this.IsEnableLocation(i))
                    this.listLocationButtons[i].Click(mouse, this);
            }
        }
    }

    OnMouseMove(mouse) {
        for (let i in this.listButtons) {
            this.listButtons[i].Over(mouse);
        }
        if (this.bSortNum == true) this.sortButton[1].Over(mouse);
        else this.sortButton[0].Over(mouse);
        if (true == this.bEnableBetting) {
            for (let i in this.listBettingButtons)
                this.listBettingButtons[i].Over(mouse);
        }

        for(let i in this.madeButton)
        {
            this.madeButton[i].Over(mouse, this);
        }

        if (true == this.bEnableLocation) {
            for (let i in this.listLocationButtons) {
                this.listLocationButtons[i].Over(mouse);
            }
        }
    }

    OnMouseDown(mouse) {

        for (let i in this.listPlayers) {
            this.listPlayers[i].OnMouseDown(mouse);
        }

        for (let i in this.listButtons) {
            this.listButtons[i].Down(mouse);
        }
        if (this.bSortNum == true) this.sortButton[1].Down(mouse);
        else this.sortButton[0].Down(mouse);
        if (true == this.bEnableBetting) {
            for (let i in this.listBettingButtons)
                this.listBettingButtons[i].Down(mouse);
        }

        for(let i in this.madeButton)
        {
            this.madeButton[i].Down(mouse, this);
        }

        if (true == this.bEnableLocation) {
            for (let i in this.listLocationButtons) {
                this.listLocationButtons[i].Down(mouse);
            }
        }
    }

    OnMouseUp(mouse) {
        for (let i in this.listButtons) {
            this.listButtons[i].Up(mouse);
        }
        if (this.bSortNum == true) this.sortButton[1].Up(mouse);
        else this.sortButton[0].Up(mouse);

        if (true == this.bEnableBetting) {
            for (let i in this.listBettingButtons)
                this.listBettingButtons[i].Up(mouse);
        }

        for(let i in this.madeButton)
        {
            this.madeButton[i].Up(mouse, this);
        }

        if (true == this.bEnableLocation) {
            for (let i in this.listLocationButtons) {
                this.listLocationButtons[i].Up(mouse);
            }
        }

    }

    SetWinCards(listWinCards) {
        console.log(`SetWinCards`);
        console.log(this.listTableCard);
        console.log(listWinCards);

        this.listWinCards = [false, false, false, false, false];
        for (let i in this.listTableCard) {
            for (let j in listWinCards) {
                if (listWinCards[j] == this.listTableCard[i])
                    this.listWinCards[i] = true;
            }
        }
    }

    EnableUserList(listUser) {
        for (let i in listUser) {
            let player = this.FindUser(listUser[i]);
            if (null != player) player.bEnablePlay = true;
        }
    }
}
