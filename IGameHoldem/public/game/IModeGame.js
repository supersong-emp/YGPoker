import IUILabel from "../js/label.js";
import IUIImage from "../js/image.js";
import IUser from "../game/IUser.js";
import ICardDealer from "../game/ICardDealer.js";
import IUIText from "../js/text.js";
import IPotManager from "../game/IPotManager.js";
import IScaleEffect from "./IScaleEffect.js";

export default class IModeGame {
    constructor(socket, listButtons, listBgs, listImages, kSC, kTimer, isMobile) {
        this.socket = socket;
        this.listButtons = listButtons;
        this.listBgs = listBgs;
        this.listImages = listImages;

        this.listPlayers = [];
        this.strOptionCode = 0;
        this.strDeckcode = 0;
        this.cMaxPlayer = 0;

        this.iTotalBettingCoin = 0;
        this.iCallCoin = 0;
        
        //  Jackpot

        this.listLabels = [
            new IUILabel(1100,820 - 120,28,35,23,NumberImages4,150,150,this.iTotalBettingCoin.toString(),2),
            new IUILabel(1100,890 - 120,28, 35, 23,NumberImages4,150,150,this.iCallCoin.toString(),2),
            new IUILabel(1770, 825, 28, 35, 23, NumberImages0, 150, 180, this.iCallCoin.toString(),2),

            //new IUILabel(960, 100, 50, 50, 35, NumberImages5, 150, 160, this.iCallCoin.toString(),0),
        ];

        20,20
        20,850
        this.listTexts = [
            new IUIText(380, 88, 25, "B", 2),
            new IUIText(380, 148, 25, "1000000", 2),
        ];
        this.listDot = [
            new IUIImage(1120, 455, 10, 9, imageModeStandbyDot, 105, 90),
            new IUIImage(1135, 455, 10, 9, imageModeStandbyDot, 105, 90),
            new IUIImage(1150, 455, 10, 9, imageModeStandbyDot, 105, 90),
        ];
        
        this.listBettingButtons = [];
        this.listLocationButtons = [];
        // this.listLocationArrow = [];
        this.listTablePanel = [];
        this.listCardDeck = [];
        this.bEnableBetting = false;
        this.bEnableLocation = false;

        this.listDisableLocations = [];

        this.kSC = kSC;
        this.isMobile = isMobile;

        //this.listButtons[1].bEnable = false;
        this.listButtons[0].bEnable = false;

        this.bEnableDealingHandCard = false;
        this.fDealingCardElapsedTime = 0;
        this.iLastDealingCardLocation = 0;
        this.listHandCard = [];
        this.strHand = '';

        this.bEnableDealingFlop = false;
        this.bEnableDealingTurn = false;
        this.bEnableDealingRiver = false;
        this.bEnableDealingCard = false;
        this.fDealingFlopTime = 0;
        this.fDealingTurnTime = 0;
        this.fDealingRiverTime = 0;
        this.listTableCard = [];
        this.listTableCardTemp = [];

        //this.cMaxPlayer = 9;

        this.listImagesCard = [];
        for (let i = 0; i < 54; ++i) {
            let resource = new IUIImage(0, 0, 130, 180, imageCards[i], 167, 231);

            this.listImagesCard.push(resource);
        }
        this.listImagesCardFrame = new IUIImage(0,0,130,180,imageCardFrames[0],163,227);
        this.gameWinCeremony = new IUIImage(343,130,1241,560,imageWinCeremony,1241,560);
        this.gameAbstentionWin = new IUIImage(490,90,950,403,imageAbstentionWin,1241,560);
        this.gamewinMadePanel = new IUIImage(243,121,1441,800,imageWinMadePanel,1241,560);

        //test
        //this.listImagesCardFrame1 = new IUIImage(cTableCardVerticalLocations[0].x, cTableCardVerticalLocations[0].y, 130, 170, imageCardFrames[0], 163, 227);
        //this.listImagesCardFrame2 = new IUIImage(cTableCardVerticalLocations[1].x, cTableCardVerticalLocations[0].y, 130, 170, imageCardFrames[0], 163, 227);
        //this.listImagesCardFrame3 = new IUIImage(cTableCardVerticalLocations[2].x, cTableCardVerticalLocations[0].y, 130, 170, imageCardFrames[0], 163, 227);
        //this.listImagesCardFrame4 = new IUIImage(cTableCardVerticalLocations[3].x, cTableCardVerticalLocations[0].y, 130, 170, imageCardFrames[0], 163, 227);
        //this.listImagesCardFrame5 = new IUIImage(cTableCardVerticalLocations[4].x, cTableCardVerticalLocations[0].y, 130, 170, imageCardFrames[0], 163, 227);

        this.kTimer = kTimer;
        this.listCardDealer = [];
        this.iNumCards = 0;

        this.slider = [];
        this.mobileSliderBG = new IUIImage(kSC.GetLocation(ELocationIndex.MobileRaiseBar).x, kSC.GetLocation(ELocationIndex.MobileRaiseBar).y, 500, 700, imageMobileSliderBar, 500, 700);

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
        this.iCurrentY = 0;

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
        this.showdownbg = new IScaleEffect(0,0,0.7,0.35,1,1,kTimer,1920,1080,imageShowdownBg);
        this.showdown = new IScaleEffect(0,0,0.7,0.35,1,1,kTimer,1920,1080,imageShowdown);

        this.bPlaying = false;
        this.bShowdown = false;
        this.fShowDownElapsedTime = 0;

        this.resultpot = new IUILabel(965,630,28,35,23,NumberImages3,163,227,"0",0);
        this.bwin = false;
        this.bAbstentionWin = false;
        this.bRaiseButton = false;
        this.bMobileRaiseButton = false;

        this.bReserveButton = false;
        
        this.bEnableChat = false;

        if(isMobile)
        {
            this.listLabels[0].SetLocation(684,1010);
            this.listLabels[1].SetLocation(684,1080);
            this.listLabels[2].SetLocation(930,1730);
            this.listTexts[0].SetLocation(370,1570);
            this.listTexts[1].SetLocation(370,1607);
            //this.listTexts[2].SetLocation(370,1644);
            this.listDot[0].SetLocation(700,775);
            this.listDot[1].SetLocation(715,775);
            this.listDot[2].SetLocation(730,775);
            this.gameWinCeremony.SetLocation(-80,350);
            this.gameAbstentionWin.SetLocation(70,250);
            this.gamewinMadePanel.SetLocation(-180,341);
            this.resultpot.SetLocation(550,853);
        }
        else
        {

        }
    }

    //  When i am in a game alone
    Initialize() {
        this.iTotalBettingCoin = 0;
        this.iCallCoin = 0;
        this.listLabels[0].UpdateCaption("0");
        this.listLabels[1].UpdateCaption("0");
        //this.listLabels[3].UpdateCaption("231320");
        this.bEnableBetting = false;
        //this.listButtons[1].bEnable = false;
        this.listButtons[0].bEnable = false;

        this.bEnableDealingHandCard = false;
        this.fDealingCardElapsedTime = 0;
        this.iLastDealingCardLocation = 0;
        this.listHandCard = [];
        this.bEnableDealingFlop = false;
        this.bEnableDealingTurn = false;
        this.bEnableDealingRiver = false;
        this.bEnableDealingCard = false;
        this.fDealingFlopTime = 0;
        this.fDealingTurnTime = 0;
        this.fDealingRiverTime = 0;
        this.listTableCard = [];
        this.listTableCardTemp = [];
        this.iNumCards = 0;
        this.listWinCards = [false, false, false, false, false];

        for (let i in this.listPlayers) {
            this.listPlayers[i].Initialize();
        }

        this.listPotManager = [];
        this.listTempPot = [];

        this.strWinnerHand = "";
        this.strWinnerDescr = [];

        this.bPlaying = false;

        this.bShowdown = false;
        this.fShowDownElapsedTime = 0;

        this.bwin = false;
        this.bAbstentionWin = false;
        this.bRaiseButton = false;
        this.bMobileRaiseButton = false;
        this.bReserveButton = false;
    }

    //  When leave the game
    Cleanup() {
        this.Initialize();
        this.listPlayers = [];
        this.socket.iLocation = 0;
    }

    // SetLandScape(kSC)
    // {
    //     this.kSC = kSC;
    //     this.listLabels[0].SetLocation(1100,820 - 120);
    //     this.listLabels[1].SetLocation(1100,890 - 120);
    //     this.listLabels[2].SetLocation(1570, 860);
    //     this.listTexts[0].SetLocation(370,920);
    //     this.listTexts[1].SetLocation(370,957);
    //     this.listTexts[2].SetLocation(370,994);
    //     this.listDot[0].SetLocation(1120,455);
    //     this.listDot[1].SetLocation(1135,455);
    //     this.listDot[2].SetLocation(1150,455);
    //     this.gameWinCeremony.SetLocation(343,130);
    //     this.gameAbstentionWin.SetLocation(490,90);
    //     this.gamewinMadePanel.SetLocation(243,121);
    //     this.mobileSliderBG.SetLocation(kSC.GetLocation(ELocationIndex.MobileRaiseBar).x, kSC.GetLocation(ELocationIndex.MobileRaiseBar).y);
    //     this.resultpot.SetLocation(965,630);
    // }

    // SetVertical(kSC)
    // {
    //     this.kSC = kSC;
    //     this.listLabels[0].SetLocation(684,1010);
    //     this.listLabels[1].SetLocation(684,1080);
    //     this.listLabels[2].SetLocation(900,1600);
    //     this.listTexts[0].SetLocation(370,1570);
    //     this.listTexts[1].SetLocation(370,1607);
    //     this.listTexts[2].SetLocation(370,1644);
    //     this.listDot[0].SetLocation(700,775);
    //     this.listDot[1].SetLocation(715,775);
    //     this.listDot[2].SetLocation(730,775);
    //     this.gameWinCeremony.SetLocation(343,130);
    //     this.gameAbstentionWin.SetLocation(490,90);
    //     this.gamewinMadePanel.SetLocation(243,121);
    //     this.mobileSliderBG.SetLocation(kSC.GetLocation(ELocationIndex.MobileRaiseBar).x, kSC.GetLocation(ELocationIndex.MobileRaiseBar).y);
    //     this.resultpot.SetLocation(965,630);
    // }

    StartGame() {
        this.bPlaying = true;
    }

    SetBettingButtons(buttons) {
        this.listBettingButtons = buttons;
    }

    SetSliderBar(slider, sliderButton) {
        this.slider = slider;
        this.sliderButton = sliderButton;
    }

    SetMaxPlayer(maxplayer) {
        this.cMaxPlayer = maxplayer;
    }

    SetLocationButtons(buttons) {
        if (this.strOptionCode == 1) {
            for (var i = 0; i < 9; ++i) {
                this.listLocationButtons.push(buttons[i]);
            }
        }
        else if (this.strOptionCode == 2) {
            for (var i = 9; i < 18; ++i) {
                this.listLocationButtons.push(buttons[i]);
            }
        }
    }

    SetLocationArrow(image) {
        //this.listLocationArrow = image;
    }

    SetTablePanel(image) {
        this.listTablePanel = image;
    }

    SetBg(optioncode) {
        this.strOptionCode = optioncode;
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
    // AddUser(user)
    // {
    //     this.listPlayers.push(user);
    // }

    AddUser(strID, iCoin, iLocation, iFxLocation, iAvatar, eUserType, listHandCard, strDeckcode) {
        let user = new IUser(strID,iCoin,iLocation,iFxLocation,iAvatar,eUserType,this.kTimer,this.kSC,listHandCard,this.isMobile, strDeckcode);
        console.log("AddUser bSpectator!!!!!");
        console.log(user.bSpectator);
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
        //for ( let i = 0; i < this.cMaxPlayer; ++ i )
        for (let i = 0; i < 9; ++i) {
            //const cLoc = (cLocation + i) % this.cMaxPlayer;
            const cLoc = (cLocation + i) % 9;
            if (cLoc != cLocation && cLoc != cDealerLocation) list.push(cLoc);
        }
        // console.log(`IGame::FindNextPlayer cLocation : ${cLocation}, cDealerLocation : ${cDealerLocation}`);
        this.SortLocationList(list, cDealerLocation);
        //console.log(list);

        // for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        //     console.log(`Player Location ${this.listUsers.GetSocket(i).strID}, ${this.listUsers.GetSocket(i).iLocation}`);

        for (let j in list) {
            //for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
            for (let i in this.listPlayers) {
                //if ( this.listUsers.GetSocket(i).iLocation == list[j] ) {
                //if ( this.listPlayers[i].iLocation == list[j] )
                if (
                    this.listPlayers[i].iLocation == list[j] &&
                    true == this.listPlayers[i].bEnablePlay
                ) {
                    // console.log(
                    //     `F.N.P : ${this.listPlayers[i].strID}, ${this.listPlayers[i].iLocation}`
                    // );
                    return this.listPlayers[i];
                }

                //}
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
            if (this.listPlayers[i].iNumCards != 2) {
                return false;
            }
        }
        return true;
    }

    RemoveUser(objectPlayer) {
        console.log(`RemoveUser : Length(${this.listPlayers.length})`);

        this.socket.emit('CM_LeaveGame', objectPlayer.strID);
        
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

    RenderBG(ctx)
    {
        const cOptionCode = parseInt(this.strOptionCode);
        console.log(`cOptionCode : ${cOptionCode}, ${this.listBgs.length}`);

        switch ( cOptionCode )
        {
        case 1:
            if(this.isMobile == true)
            {
                this.listBgs[2].Render(ctx);
            }
            else
            {
                this.listBgs[0].Render(ctx);
            }
            this.listTablePanel[0].Render(ctx);
            this.listTablePanel[1].Render(ctx);
            if ( this.cMaxPlayer == 6 )
            {
                this.listBgs[6].Render(ctx);
            }
            else
            {
                this.listBgs[4].Render(ctx);
            }
            break;
        case 2:
            if(this.isMobile == true)
            {
                this.listBgs[3].Render(ctx);
            }
            else
            {
                this.listBgs[1].Render(ctx);
            }
            this.listTablePanel[2].Render(ctx);
            this.listTablePanel[3].Render(ctx);
            if ( this.cMaxPlayer == 6 )
            {
                this.listBgs[7].Render(ctx);    
            }
            else
            {
                this.listBgs[5].Render(ctx);
            }
            break;
        }

        for (let i in this.listCardDeck) {
            this.listCardDeck[i].Render(ctx)
        }
    }

    Render(ctx) {
        // ctx.fillStyle = "black";
        // ctx.fillRect(0, 0, 1920, 1080);

        this.RenderBG(ctx);
        

        for (let i in this.listImages) {
            //if ( i == 5 && this.kMainUser.iLocation != -1 )
            if (i == 1 && this.bPlaying == true && this.kMainUser != null && this.kMainUser.iLocation == -1) continue;
            if (i == 1 && this.kMainUser == null) continue;
            if (i == 1 && this.bPlaying == true) continue;
            if(i == 0 && this.isMobile == true) continue;
            this.listImages[i].Render(ctx);
        }
        if (
            this.bPlaying == false &&
            this.kMainUser != null &&
            this.kMainUser.iLocation != -1
        ) {
            this.listDot[this.iRender].Render(ctx);
        }
        if(this.kMainUser != null)
        {
            for (let i in this.listButtons) {
                if(i==3 && (!this.bwin || !this.kMainUser.bAbstentionWin)) continue;
                this.listButtons[i].Render(ctx);
            }
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
            if(this.isMobile == false)
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

        if (this.bwin == true) {
            this.gameWinCeremony.Render(ctx);
            this.resultpot.Render(ctx);
        }
        if (this.bwin == true && this.bAbstentionWin == false) {
            this.gamewinMadePanel.Render(ctx);
        }
        if (this.listTableCard.length > 0) {
            for (let i in this.listTableCard) {
                // if(this.kSC.vertical == true)
                // {
                //     this.listImagesCard[this.listTableCard[i]].CardRenderTurn(ctx,this.kSC.GetLocation(ELocationIndex.TableCard1 + parseInt(i)).x,this.kSC.GetLocation(ELocationIndex.TableCard1 + parseInt(i)).y,this.kTimer,i,this.strDeckcode);

                //     if (this.listWinCards[i] == true && this.bAbstentionWin == false) {
                //         this.listImagesCardFrame.RenderLocation(ctx,this.kSC.GetLocation(ELocationIndex.TableCard1 + parseInt(i)).x,this.kSC.GetLocation(ELocationIndex.TableCard1 + parseInt(i)).y,);
                //     }
                // }
                // else if(this.kSC.landscape == true)
                // {
                //     this.listImagesCard[this.listTableCard[i]].CardRenderTurn(ctx,this.kSC.GetLocation(ELocationIndex.TableCard1 + parseInt(i)).x,this.kSC.GetLocation(ELocationIndex.TableCard1 + parseInt(i)).y,this.kTimer,i,this.strDeckcode);

                //     if (this.listWinCards[i] == true && this.bAbstentionWin == false) {
                //         this.listImagesCardFrame.RenderLocation(ctx,this.kSC.GetLocation(ELocationIndex.TableCard1 + parseInt(i)).x,this.kSC.GetLocation(ELocationIndex.TableCard1 + parseInt(i)).y,);
                //     }
                // }
                this.listImagesCard[this.listTableCard[i]].CardRenderTurn(ctx,this.kSC.GetLocation(ELocationIndex.TableCard1 + parseInt(i)).x,this.kSC.GetLocation(ELocationIndex.TableCard1 + parseInt(i)).y,this.kTimer,i,this.strDeckcode);

                    if (this.listWinCards[i] == true && this.bAbstentionWin == false) {
                        this.listImagesCardFrame.RenderLocation(ctx,this.kSC.GetLocation(ELocationIndex.TableCard1 + parseInt(i)).x,this.kSC.GetLocation(ELocationIndex.TableCard1 + parseInt(i)).y,);
                    }
            }
        }
        if (this.bAbstentionWin == true) {
            this.gameAbstentionWin.Render(ctx);
        }

        for (let i in this.listCardDealer) {
            this.listCardDealer[i].Render(ctx);
        }
        //test
        //  this.gameWinCeremony.Render(ctx);
        //  this.resultpot.Render(ctx);
        // this.gameAbstentionWin.Render(ctx);
        // this.listImagesCardFrame1.Render(ctx);
        // this.listImagesCardFrame2.Render(ctx);
        // this.listImagesCardFrame3.Render(ctx);
        // this.listImagesCardFrame4.Render(ctx);
        // this.listImagesCardFrame5.Render(ctx);
        if (this.bShowdown == true) {
            this.showdownbg.Render(ctx);
            this.showdown.Render(ctx);
        }

        if (this.strWinnerHand != "") {
            switch (this.strWinnerHand) {
                case "High Card":
                    if(this.isMobile == true)
                    {
                        this.listImagesHand[0].RenderLocation(ctx, 330, 235);
                    }
                    else 
                    {
                        this.listImagesHand[0].RenderLocation(ctx, 760, 71);
                    }
                    break;
                case "Pair":
                    if(this.isMobile == true)
                    {
                        this.listImagesHand[1].RenderLocation(ctx, 290, 235);
                    }
                    else
                    {
                        this.listImagesHand[1].RenderLocation(ctx, 720, 71);
                    }
                    break;
                case "Two Pair":
                    if(this.isMobile == true)
                    {
                        this.listImagesHand[2].RenderLocation(ctx, 320, 235);
                    }
                    else
                    {
                        this.listImagesHand[2].RenderLocation(ctx, 750, 71);
                    }
                    break;
                case "Three of a Kind":
                    if(this.isMobile == true)
                    {
                        this.listImagesHand[3].RenderLocation(ctx, 290, 235);
                    }
                    else
                    {
                        this.listImagesHand[3].RenderLocation(ctx, 720, 71);
                    }
                    break;
                case "Straight":
                    if(this.isMobile == true)
                    {
                        this.listImagesHand[4].RenderLocation(ctx, 320, 235);
                    }
                    else
                    {    
                        this.listImagesHand[4].RenderLocation(ctx, 750, 71);
                    }
                    break;
                case "Mountain":
                    if(this.isMobile == true)
                    {
                        this.listImagesHand[5].RenderLocation(ctx, 250, 235);
                    }
                    else
                    {
                        this.listImagesHand[5].RenderLocation(ctx, 680, 71);
                    }
                    break;
                case "Flush":
                    if(this.isMobile == true)
                    {
                        this.listImagesHand[6].RenderLocation(ctx, 290, 235);
                    }
                    else
                    {
                        this.listImagesHand[6].RenderLocation(ctx, 720, 71);
                    }
                    break;
                case "Full House":
                    if(this.isMobile == true)
                    {
                        this.listImagesHand[7].RenderLocation(ctx, 335, 235);
                    }
                    else
                    {
                        this.listImagesHand[7].RenderLocation(ctx, 765, 71);
                    }
                    break;
                case "Four of a Kind":
                    if(this.isMobile == true)
                    {
                        this.listImagesHand[8].RenderLocation(ctx, 290, 235);
                    }
                    else
                    {
                        this.listImagesHand[8].RenderLocation(ctx, 720, 71);
                    }
                    break;
                case "Straight Flush":
                    if(this.isMobile == true)
                    {
                        this.listImagesHand[9].RenderLocation(ctx, 350, 235);
                    }
                    else
                    {
                        this.listImagesHand[9].RenderLocation(ctx, 780, 71);
                    }
                    break;
                case "Royal Flush":
                    if(this.isMobile == true)
                    {
                        this.listImagesHand[10].RenderLocation(ctx, 250, 235);
                    }
                    else
                    {
                        this.listImagesHand[10].RenderLocation(ctx, 680, 71);
                    }
                    break;
            }
        }
        if (this.strWinnerDescr[0] != '' && this.strWinnerHand != 'Mountain') {
            for (let i in this.strWinnerDescr) {

                switch (this.strWinnerDescr[i]) {
                    case "Ac":
                        this.listImagesHigh[0].RenderLocation(ctx, this.iCurrentX + (i * 40), this.iCurrentY);
                        break;
                    case "A":
                        this.listImagesHigh[0].RenderLocation(ctx, this.iCurrentX + (i * 40), this.iCurrentY);
                        break;
                    case "2":
                        this.listImagesHigh[1].RenderLocation(ctx, this.iCurrentX + (i * 40), this.iCurrentY);
                        break;
                    case "3":
                        this.listImagesHigh[2].RenderLocation(ctx, this.iCurrentX + (i * 40), this.iCurrentY);
                        break;
                    case "4":
                        this.listImagesHigh[3].RenderLocation(ctx, this.iCurrentX + (i * 40), this.iCurrentY);
                        break;
                    case "5":
                        this.listImagesHigh[4].RenderLocation(ctx, this.iCurrentX + (i * 40), this.iCurrentY);
                        break;
                    case "6":
                        this.listImagesHigh[5].RenderLocation(ctx, this.iCurrentX + (i * 40), this.iCurrentY);
                        break;
                    case "7":
                        this.listImagesHigh[6].RenderLocation(ctx, this.iCurrentX + (i * 40), this.iCurrentY);
                        break;
                    case "8":
                        this.listImagesHigh[7].RenderLocation(ctx, this.iCurrentX + (i * 40), this.iCurrentY);
                        break;
                    case "9":
                        this.listImagesHigh[8].RenderLocation(ctx, this.iCurrentX + (i * 40), this.iCurrentY);
                        break;
                    case "10":
                        this.listImagesHigh[9].RenderLocation(ctx, this.iCurrentX + (i * 40), this.iCurrentY);
                        break;
                    case "J":
                        this.listImagesHigh[10].RenderLocation(ctx, this.iCurrentX + (i * 40), this.iCurrentY);
                        break;
                    case "Q":
                        this.listImagesHigh[11].RenderLocation(ctx, this.iCurrentX + (i * 40), this.iCurrentY);
                        break;
                    case "K":
                        this.listImagesHigh[12].RenderLocation(ctx, this.iCurrentX + (i * 40), this.iCurrentY);
                        break;
                    case ",":
                        this.imageComma.RenderLocation(ctx, this.iCurrentX + (i * 40), this.iCurrentY+14);
                        break;
                }
            }
        }
        // this.mobileSliderBG.Render(ctx);
        // for (let i in this.slider) {
        //   this.slider[i].Render(ctx);
        // }
        
        if (true == this.bEnableBetting) {
            if (this.bMobileRaiseButton == true) {
                this.mobileSliderBG.Render(ctx);
                for (let i in this.slider) {
                    this.slider[i].Render(ctx);
                }
                for (let i in this.sliderButton){
                    this.sliderButton[i].Render(ctx);
                }
            }
            for (let i in this.listBettingButtons) {
                this.listBettingButtons[i].Render(ctx);
            }
        }
        for (let i in this.listLabels) {
            if (i == 2 && this.bEnableBetting == false) continue;
            if(this.bMobileRaiseButton == true && this.bEnableBetting == true)
            {
                this.listLabels[2].Render(ctx);
                this.listLabels[i].Render(ctx);
            }
            else
            {
                //this.listLabels[3].UpdateCaption("1234567890");
                this.listLabels[0].Render(ctx);
                this.listLabels[1].Render(ctx);
                //this.listLabels[3].Render(ctx);
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

        if (this.listTempPot.length > 0) {
            let bUpdate = true;
            for (let i in this.listPlayers) {
                if (this.listPlayers[i].listChipDealer.length > 0) bUpdate = false;
            }

            if (true == bUpdate) {
                this.listPotManager = [];
                for (let i in this.listTempPot) {
                    let k = '';
                    if(this.isMobile == true)
                    {
                        k = new IPotManager(300 + i * 200,950,this.kTimer,40,40,this.kSC.m_fWidthRate,this.kSC.m_fHeightRate);
                    }
                    else
                    {
                        k = new IPotManager(650 + i * 200,620,this.kTimer,40,40,this.kSC.m_fWidthRate,this.kSC.m_fHeightRate);
                    }
                    k.UpdatePot(this.listTempPot[i].iPotAmount);
                    this.listPotManager.push(k);
                }

                this.listTempPot = [];
            }
        }

        //  Hand Card
        if (true == this.bEnableDealingHandCard) {
            //++ this.fDealingCardElapsedTime;
            this.fDealingCardElapsedTime += this.kTimer.GetElapsedTime();

            //if ( this.fDealingCardElapsedTime > 30 )
            if (this.fDealingCardElapsedTime > 0.2) {
                let player = this.FindNextPlayer(this.iLastDealingCardLocation, -1);
                if (null != player) {
                    //if ( player.listHandCard.length < 2 )
                    //if ( player.listTempHandCard.length < 2 )
                    if (player.iNumCards < 2) {
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
                        }
                    }
                }
            }
        }
        if (this.bShowdown == true) {
            this.fShowDownElapsedTime += this.kTimer.GetElapsedTime();

            if (this.fShowDownElapsedTime > 0.3 && this.fShowDownElapsedTime < 0.5)
                soundShowDown.play();
            else if (
                this.fShowDownElapsedTime > 0.5 &&
                this.fShowDownElapsedTime < 1.0
            )
                soundHertBeat.play();
            else if (this.fShowDownElapsedTime > 3.2) {
                this.fShowDownElapsedTime = 0;
                this.bShowdown = false;
                this.showdown.Clear();
                this.showdownbg.Clear();
            }
        } else {
            // ++ this.fDealingCardElapsedTime;
            if (this.listTableCardTemp.length > 0) {
                if (this.bEnableDealingCard == true) {
                    this.fDealingCardElapsedTime += this.kTimer.GetElapsedTime();
                    if (this.fDealingCardElapsedTime > 0.2) {
                        this.fDealingCardElapsedTime = 0;

                        //let dealer = new ICardDealer(1080, 500, listX[this.iNumCards], 520+50, this.kSC.m_fWidthRate, this.kSC.m_fHeightRate, this.kTimer, 130, 170, this.listTableCardTemp[0]);
                        //let dealer = new ICardDealer(cDealerLocation.x, cDealerLocation.y, cTableCardLocations[this.iNumCards].x+20, cTableCardLocations[this.iNumCards].y+50, this.kSC.m_fWidthRate, this.kSC.m_fHeightRate, this.kTimer, 130, 170, this.listTableCardTemp[0]);
                        let dealer = '';
                        if(this.isMobile == true)
                        {
                            dealer = new ICardDealer(cDealerVerticalLocation.x,cDealerVerticalLocation.y,this.kSC.GetLocation(ELocationIndex.TableCard1 + this.iNumCards).x,this.kSC.GetLocation(ELocationIndex.TableCard1 + this.iNumCards).y,this.kSC.m_fWidthRate,this.kSC.m_fHeightRate,this.kTimer,130,170, this.listTableCardTemp[0], this.strDeckcode);
                        }
                        else
                        {
                            dealer = new ICardDealer(cDealerLocation.x,cDealerLocation.y,this.kSC.GetLocation(ELocationIndex.TableCard1 + this.iNumCards).x,this.kSC.GetLocation(ELocationIndex.TableCard1 + this.iNumCards).y,this.kSC.m_fWidthRate,this.kSC.m_fHeightRate,this.kTimer,130,170, this.listTableCardTemp[0], this.strDeckcode);
                        } 
                        //let dealer = new ICardTurnAnim(cDealerLocation.x, cDealerLocation.y, cTableCardLocations[this.iNumCards].x, cTableCardLocations[this.iNumCards].y, this.kSC.m_fWidthRate, this.kSC.m_fHeightRate, this.kTimer, 130, 170, this.listTableCardTemp[0]);
                        this.listCardDealer.push(dealer);

                        this.listTableCardTemp.shift();

                        ++this.iNumCards;

                        //if ( this.listTableCard.length == 3 )
                        //if ( this.listTableCard.length == this.listTableCardTemp.length )
                        if (this.listTableCardTemp.length == 0) {
                            this.bEnableDealingCard = false;
                            this.bEnableDealingFlop = false;
                            this.bEnableDealingTurn = false;
                            this.bEnableDealingRiver = false;
                        }
                    }
                }
            }
            for (let i in this.listCardDealer) {
                this.listCardDealer[i].Update();
                if (this.listCardDealer[i].iCompleteStep == 1) {
                    soundPlaceCard.play();

                    this.listTableCard.push(this.listCardDealer[i].iCardIndex);
                    this.listCardDealer[i].iCompleteStep = 2;
                    this.listCardDealer.splice(0, 1);
                }
            }
        }

        if (this.bEnableDealingFlop == true) {
            this.fDealingFlopTime += this.kTimer.GetElapsedTime();

            if (this.fDealingFlopTime < 0.7 && this.fDealingFlopTime > 0.5) {
                soundcardflop.play();
                //console.log(this.fDealingFlopTime);
            }
            else if (this.fDealingFlopTime > 1.2) {
                this.bEnableDealingCard = true;
                this.UpdateStrHandName();
                this.SetPlayerBettingDelete();
            }
        }
        if (this.bEnableDealingTurn == true) {
            this.fDealingTurnTime += this.kTimer.GetElapsedTime();

            if (this.fDealingTurnTime < 0.7 && this.fDealingTurnTime > 0.5) {
                soundcardturn.play();
                //console.log(this.fDealingTurnTime);
            }
            else if (this.fDealingTurnTime > 1.2) {
                this.bEnableDealingCard = true;
                this.UpdateStrHandName();
                this.SetPlayerBettingDelete();
            }
        }
        if (this.bEnableDealingRiver == true) {
            this.fDealingRiverTime += this.kTimer.GetElapsedTime();

            if (this.fDealingRiverTime < 0.7 && this.fDealingRiverTime > 0.5) {
                soundcardriver.play();
                //console.log(this.fDealingRiverTime);
            }
            else if (this.fDealingRiverTime > 1.2) {
                this.bEnableDealingCard = true;
                this.UpdateStrHandName();
                this.SetPlayerBettingDelete();
            }
        }

        if (this.kMainUser != null) {
            if (this.kMainUser.bFocus == true &&this.kMainUser.iBettingTime <= 0 &&this.bEnableBetting == true) {
                console.log(`Auto Fold ${this.iCallCoin}`);
                if (this.iCallCoin == 0) {
                    OnClickCheck(this);
                } 
                else {
                    OnClickFold(this);
                }
                this.kMainUser.iAutoFoldCounter++;
                if (this.kMainUser.iAutoFoldCounter >= 3) {
                    //this.RemoveUser(this.kMainUser);
                    window.close();
                }
            }
            if($('#chatting').is(':hidden') && $('#game_log').is(':hidden')) {
                // chatting 요소와 game_log 요소가 모두 숨겨져 있는 경우에 실행할 코드를 여기에 작성합니다.
                this.bEnableChat = false;
            } else {
                // chatting 요소와 game_log 요소 중 하나라도 보이는 경우에 실행할 코드를 여기에 작성합니다.
                this.bEnableChat = true;
            }
        }
        
        let exitText = $("#exit").text();

        if (!this.bReserveButton && 
            ((this.kMainUser && this.kMainUser.bFold == true && this.kMainUser.bReserveExit == true) || 
            (this.bPlaying == false && exitText == '나가기 예약'))) {
            this.bReserveButton = true;
            //this.RemoveUser(this.kMainUser);
            window.close();
        }
    }

    ProcessLocation(listPlayers) {
        this.bEnableLocation = true;

        this.listDisableLocations = [];

        for (let i in listPlayers) {
            if (listPlayers[i].iLocation != -1) {
                //const objectPlayer = {strID:listPlayers[i].strID, iLocation:listPlayers[].iLocation}

                //this.ProcessLocationSingle(listPlayers[i]);
                this.listDisableLocations.push(listPlayers[i].iLocation);
                let listHandCard = [];
        
                console.log(
                    `############# ${listPlayers[i].strID}, ${listPlayers[i].iLocation}`
                );
                this.AddUser(
                    listPlayers[i].strID,
                    listPlayers[i].iCoin,
                    listPlayers[i].iLocation,
                    listPlayers[i].iLocation,
                    listPlayers[i].iAvatar,
                    listPlayers[i].eUserType,
                    listHandCard,
                    this.strDeckcode
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
        let iFx = (objectPlayer.iLocation - iMyLocation + 9) % 9;

        //this.AddUser(objectPlayer.strID, objectPlayer.iLocation, objectPlayer.iLocation);
        this.AddUser(objectPlayer.strID,objectPlayer.iCoin,objectPlayer.iLocation,iFx,objectPlayer.iAvatar, objectPlayer.eUserType, [],this.strDeckcode);
    }

    ProcessLocationComplete(strID, iCoin, iLocation, iAvatar, eUserType, listHandCard) {
        this.bEnableLocation = false;

        this.socket.iLocation = iLocation;
        console.log(`MyLocation On C : ${this.socket.iLocation}`);
        let currentHandcard = listHandCard;
        for (let i in this.listPlayers) {
            let iFx = (this.listPlayers[i].iLocation - iLocation + 9) % 9;
            console.log(
                `Target iFx : ${iFx}, Mine : ${iLocation}, Target Origin : ${this.listPlayers[i].iLocation}, ${this.listPlayers[i].bSpectator}`
            );

            this.listPlayers[i].Locate(iFx);
            this.listPlayers[i].OnSize(this.kSC.m_fWidthRate, this.kSC.m_fHeightRate);
        }
        
        //this.AddUser(strID, iCoin, iLocation, 0, iAvatar, this.kTimer, this.kSC);
        this.AddUser(strID, iCoin, iLocation, 0, iAvatar, eUserType, currentHandcard, this.strDeckcode);
    }

    IsEnableLocation(iLocation) {
        for (let i in this.listDisableLocations) {
            if (iLocation == this.listDisableLocations[i]) return false;
        }
        return true;
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

    SetPlayerBetting(strID, iCoin, iBettingCoin, strBetting) {
        let player = this.FindUser(strID);
        //player.
        player.bBettingMode = true;
        if (null != player) {
            player.Betting(strBetting, iBettingCoin, iCoin);

        }
    }

    SetPlayerBettingDelete() {
        for (let i in this.listPlayers) {
            this.listPlayers[i].bBettingMode = false;
            this.listPlayers[i].ibettingCallCoin = 0;
        }
    }

    SetPlayerExit(strID) {
        console.log(`SetPlayerExit`);
        let player = this.FindUser(strID);

        let exitElement = $('#exit').text();

        if (null != player) {
            if(exitElement == '나가기')
            {
                player.bReserveButton = false;
            }
            else
            {
                player.bReserveExit = true;
            }
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
        if (array2.length > 1 && this.isMobile == false) 
        {
            this.iCurrentX = 550;
            this.iCurrentY = 71;
        }
        else if(array2.length > 1 && this.isMobile == true) 
        {
            this.iCurrentX = 110;
            this.iCurrentY = 235;
        }
        else if(this.isMobile == true) 
        {
            this.iCurrentX = 200;
            this.iCurrentY = 235;
        }
        else 
        {
            this.iCurrentX = 610;
            this.iCurrentY = 71;
        }
        return array2;
    }

    UpdateTotalBettingCoin(iCoin) {
        this.iTotalBettingCoin = iCoin;
        this.listLabels[0].UpdateCaption(this.iTotalBettingCoin.toString());
    }

    UpdateCallCoin(iCoin) {
        this.iCallCoin = iCoin;
        this.listLabels[1].UpdateCaption(this.iCallCoin.toString());
    }

    UpdateJackpot(iJackpot) {
        this.iJackpot = iJackpot;
        //this.listLabels[3].UpdateCaption(this.iJackpot.toString());
    }

    UpdateGameInfo(strGameName, iBlind) {
        //this.listTexts[1].UpdateCaption(`${strGameName}   ${parseInt(iBlind)/1000}K / ${parseInt(iBlind)*2/1000}K`);
        //this.listTexts[1].UpdateCaption(strGameName);
        this.listTexts[0].UpdateCaption(
            `${parseInt(iBlind) / 1000}K / ${(parseInt(iBlind) * 2) / 1000}K`
        );
        this.iBlind = parseInt(iBlind);
    }

    UpdatePoint(iPoint) {
        this.listTexts[1].UpdateCaption(iPoint.toLocaleString());
    }

    UpdateStrHandName() {
        if(this.kMainUser != null)
        {
            if(this.kMainUser.bEnablePlay == true)
            {
                this.kMainUser.textHand.UpdateCaption(this.strHand);
            }
        }
    }

    CheckBettingCoin(iCoin) {
        this.listLabels[2].UpdateCaption(iCoin.toString());
        //console.log(`Raise iCoin : ${iCoin}`);
        this.slider[0].InitLocation();
        // let player = this.FindUser(this.socket.strID);
        // if ( player != null )
        // {
        //     this.slider.SetBar(iCoin, iCoin, player.iGameCoin);
        // }
        //this.slider.iCurrentBar = 1;
        // //  Test
        // let player = this.FindUser(this.socket.strID);
        // if ( null != player )
        // {
        //     this.slider.iCurrentLocationMax;
        // }
    }
    SetRaiseButton() {
        this.bRaiseButton = true;
        this.bMobileRaiseButton = true;
    }
    SetMobileRaiseButton() {
        this.bMobileRaiseButton = true;
        this.bRaiseButton = true;
    }

    SetPreFlop()
    {
        for (let i in this.listPlayers) {
            this.listPlayers[i].bHandCardTurn = false;
        }
    }

    EnableBetting(objectData) {
        console.log(`IModeGame::EnableBetting ${objectData.iCallAmount}`);

        this.bEnableBetting = true;
        this.bRaiseButton = false;
        this.bMobileRaiseButton = false;
        //this.listLabels[1].UpdateCaption(objectData.iCallAmount.toString());
        this.UpdateCallCoin(objectData.iCallAmount);

        //this.CheckBettingCoin(objectData.iCallAmount);
        this.CheckBettingCoin(objectData.iCallAmount + this.iBlind);

        for (let i in this.listBettingButtons) {
            this.listBettingButtons[i].bEnable = false;
        }

        for (let i in objectData.listEnableBettingType) {
            switch (objectData.listEnableBettingType[i]) {
                case "Quater":
                    this.listBettingButtons[0].bEnable = false;
                    break;
                case "Half":
                    this.listBettingButtons[1].bEnable = false;
                    break;
                case "Full":
                    this.listBettingButtons[2].bEnable = false;
                    break;
                case "Allin":
                    //this.listBettingButtons[3].bEnable = true;
                    break;
                case "Call":
                    this.listBettingButtons[3].bEnable = true;
                    break;
                case "Fold":
                    this.listBettingButtons[4].bEnable = true;
                    break;
                case "Check":
                    this.listBettingButtons[5].bEnable = true;
                    break;
                case "Raise":
                    this.listBettingButtons[6].bEnable = true;
                    break;
            }
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

    SetHandCard(listCard, strHand) {
        let player = this.FindUserFromPlayerType("Dealer");
        //player.listHandCard = listCard;
        this.bEnableDealingHandCard = true;
        this.iLastDealingCardLocation = player.iLocation;
        this.listHandCard = listCard;
        this.strHand = strHand;

        // let mainuser = this.FindUser(this.socket.strID);
        // mainuser.strHand.UpdateCaption(strHand);
        //this.kMainUser.textHand.UpdateCaption(strHand);
        this.UpdateStrHandName();
    }

    SetFlopCard(listCard, strHand) {
        this.bEnableDealingFlop = true;
        this.fDealingFlopTime = 0;
        this.listTableCardTemp = listCard;
        this.strHand = strHand;
        //this.kMainUser.textHand.UpdateCaption(strHand);
    }
    SetTurnCard(listCard, strHand) {
        //this.listTableCard.push(listCard[3]);
        this.bEnableDealingTurn = true;
        this.fDealingTurnTime = 0;
        this.listTableCardTemp.push(listCard[3]);
        this.strHand = strHand;
        //this.kMainUser.textHand.UpdateCaption(strHand);
    }

    SetRiverCard(listCard, strHand) {
        //this.listTableCard.push(listCard[4]);
        this.bEnableDealingRiver = true;
        this.fDealingRiverTime = 0;
        this.listTableCardTemp.push(listCard[4]);
        this.strHand = strHand;
        //this.kMainUser.textHand.UpdateCaption(strHand);
    }

    ShowCard(objectData)
    {
        console.log(objectData.iCard1);
        console.log(objectData.iCard2);
        let player = this.FindUser(objectData.strID);
        if (null != player) {
            console.log(
                `player Location : ${player.iLocation}, ID : ${player.strID}`
            );
            player.listHandCard[0] = objectData.iCard1;
            player.listHandCard[1] = objectData.iCard2;
            player.bShowCard = true;
        }
    }

    SetTableCard(listCard)
    {
        this.listTableCard = listCard;
        this.iNumCards = listCard.length;
    }

    ProcessShowDown() {
        this.bShowdown = true;
    }

    ProcessShowDownTurnCard(listData) {
        for (let i in listData) {
            let player = this.FindUser(listData[i].strID);
            if (null != player) {
                console.log(
                    `player Location : ${player.iLocation}, ID : ${player.strID}`
                );

                player.listHandCard[0] = listData[i].iCard1;
                player.listHandCard[1] = listData[i].iCard2;
            }
        }
    }

    ProcessResult(listResult, listWinCards, strWinnerHand, strWinnerDescr, cPlayingUser) {
        console.log(
            `ProcessResult : NumWinners ${listResult.length} cPlayingUser : ${cPlayingUser} `
        );
        //
        this.bwin = true;
        if (cPlayingUser == 1) {
            this.bAbstentionWin = true;
        }
        for (let i in this.listPlayers) {
            this.listPlayers[i].bFocus = false;
        }
        for (let i in listResult) {
            let player = this.FindUser(listResult[i].strID);
            if (cPlayingUser == 1) {
                player.bAbstentionWin = true;
                //player.bWinner = true;
            }
            if (null != player) {
                console.log(
                    `Winner Location : ${player.iLocation}, ID : ${player.strID}`
                );
                player.bBettingMode = false;
                if (listResult[i].iRank == 1) {
                    player.bWinner = true;
                    player.iWinCoin = listResult[i].iWinCoin;
                    //player.listHandCard[0] = listResult[i].iCard1;
                    //player.listHandCard[1] = listResult[i].iCard2;
                    //player.strHand = listResult[i].strHand;
                    //player.SetWinCards(listWinCards);
                }
                if (cPlayingUser > 1 && this.bAbstentionWin == false) {
                    player.listHandCard[0]= listResult[i].iCard1;
                    player.listHandCard[1] = listResult[i].iCard2;
                    player.strHand = listResult[i].strHand;
                    player.SetWinCards(listWinCards);
                }
                player.UpdateMyCoin(listResult[i].iCoin);

                if (player.iWinCoin != null) {
                    console.log(`WinCoin : ${player.iWinCoin}, ID : ${player.strID}`);
                    this.resultpot.UpdateCaption(player.iWinCoin.toString());
                }
            }
        }
        if (this.bAbstentionWin == false) {
            this.SetWinCards(listWinCards);
            this.strWinnerHand = strWinnerHand;
            this.strWinnerDescr = this.SetWinnerHighText(strWinnerDescr);
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
                        //this.RemoveUser(listObject[i]);
                        if (window.confirm("리바인 금액이 부족합니다.")) {
                            window.close();
                        }
                        else {
                            window.close();
                        }
                    }
                    else this.UpdatePoint(listObject[i].iCash);
                }
            }
        }
    }

    UpdatePot(listPots) {
        this.listTempPot = [];

        for (let i in listPots) this.listTempPot.push(listPots[i]);

        console.log(`### UpdatePot`);
        console.log(listPots);

        // this.listPotManager = [];

        // for ( let i in listPots )
        // {
        //     let k = new IPotManager(650 + (i * 200), 600, this.kTimer, 50, 50, this.kSC.m_fWidthRate, this.kSC.m_fHeightRate);
        //     k.UpdatePot(listPots[i].iPotAmount);
        //     this.listPotManager.push(k);
        // }
    }

    OnIO() { }

    OnSize(fHR, fVR) {
        this.showdown.OnSize(fHR, fVR);
        this.showdownbg.OnSize(fHR, fVR);
        this.gameWinCeremony.OnSize(fHR, fVR);
        this.gameAbstentionWin.OnSize(fHR, fVR);
        this.gamewinMadePanel.OnSize(fHR, fVR);
        this.resultpot.OnSize(fHR, fVR);
        this.imageComma.OnSize(fHR, fVR);

        //test
        // this.listImagesCardFrame1.OnSize(fHR, fVR);
        // this.listImagesCardFrame2.OnSize(fHR, fVR);
        // this.listImagesCardFrame3.OnSize(fHR, fVR);
        // this.listImagesCardFrame4.OnSize(fHR, fVR);
        // this.listImagesCardFrame5.OnSize(fHR, fVR);

        //this.ptDealerLocation.x = cDealerLocation.x * fHR;
        //this.ptDealerLocation.y = cDealerLocation.y * fVR;
        //this.mobileSliderBG.OnSize(fHR, fVR);
        for (let i in this.slider) {
            this.slider[i].OnSize(fHR, fVR);
        }
        for (let i in this.sliderButton) {
            this.sliderButton[i].OnSize(fHR, fVR);
        }
        for (let i in this.listBgs) {
            this.listBgs[i].OnSize(fHR, fVR);
        }
        for (let i in this.listCardDeck) {
            this.listCardDeck[i].OnSize(fHR, fVR);
        }

        for (let i in this.listTablePanel) {
            this.listTablePanel[i].OnSize(fHR, fVR);
        }

        for (let i in this.listImages) {
            this.listImages[i].OnSize(fHR, fVR);
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
        // for (let i in this.listLocationArrow) {
        //   this.listLocationArrow[i].OnSize(fHR, fVR);
        // }
        for (let i in this.listPlayers) {
            this.listPlayers[i].OnSize(fHR, fVR);
        }

        for (let i in this.listLabels) {
            this.listLabels[i].OnSize(fHR, fVR);
        }
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

        if (true == this.bEnableBetting) {
            for (let i in this.listBettingButtons)
                this.listBettingButtons[i].Click(mouse, this);
            for (let i in this.sliderButton)
                this.sliderButton[i].Click(mouse,this);
        }

        if (true == this.bEnableLocation) {
            for (let i in this.listLocationButtons) {
                if (true == this.IsEnableLocation(i))
                    this.listLocationButtons[i].Click(mouse, this);
            }
        }
    }

    OnMouseMove(mouse) {
        if (this.isMobile == false) {
            for (let i in this.listPlayers) {
                this.listPlayers[i].Over(mouse);
            }

            for (let i in this.listButtons) {
                this.listButtons[i].Over(mouse);
            }

            if (true == this.bEnableBetting) {
                for (let i in this.listBettingButtons)
                    this.listBettingButtons[i].Over(mouse);
                for (let i in this.sliderButton)
                    this.sliderButton[i].Over(mouse);
            }

            if (true == this.bEnableLocation) {
                for (let i in this.listLocationButtons) {
                    this.listLocationButtons[i].Over(mouse);
                }
            }
            if (true == this.bEnableBetting) {
                
            }
            
            if (true == this.slider[0].Over(mouse)) {
                //console.log(this.slider.iCurrentBar);
                console.log(this.slider.iCurrentLocation);

                let player = this.FindUser(this.socket.strID);
                if (player != null) {
                    console.log(`player coin : ${player.iGameCoin}`);

                    let term = player.iGameCoin - this.iCallCoin;
                    if (term > 0) {
                        let fDelta = term / 100;

                        let iCurrentCoin =
                            this.iCallCoin +
                            this.iBlind +
                            Math.floor(fDelta * this.slider[0].iCurrentBar);
                        if (iCurrentCoin < this.iBlind) iCurrentCoin = this.iBlind;
                        // iCurrentCoin = Math.floor(iCurrentCoin / 100);
                        // iCurrentCoin = Math.floor(iCurrentCoin * 100);
                        iCurrentCoin = Math.floor(iCurrentCoin / this.iBlind) * this.iBlind;
                        // if ( this.slider.iCurrentBar == 100 )
                        //     iCurrentCoin = player.iGameCoin;
                        if (iCurrentCoin > player.iGameCoin) iCurrentCoin = player.iGameCoin;

                        console.log(`iCoin : ${iCurrentCoin}`);
                        this.listLabels[2].UpdateCaption(iCurrentCoin.toString());
                    }
                }
            }
        }
    }
    OnTouchMove(touch) {
        if (this.isMobile == true) {
            if (true == this.slider[0].Touch(touch)) {
                //console.log(this.slider.iCurrentBar);
                console.log(this.slider.iCurrentLocation);
                //this.slider[0].UpdateCurrentLocation();
                let player = this.FindUser(this.socket.strID);
                if (player != null) {
                    let term = player.iGameCoin - this.iCallCoin;
                    console.log(`player coin : ${player.iGameCoin}, this.iGameCoin : ${this.iCallCoin}, term : ${term}`);
                    if (term > 0) {
                        let fDelta = term / 100;
                        console.log(this.slider[0].iCurrentBar);
                        let iCurrentCoin =
                            this.iCallCoin +
                            this.iBlind +
                            Math.floor(fDelta * this.slider[0].iCurrentBar);
                        if (iCurrentCoin < this.iBlind) iCurrentCoin = this.iBlind;
                        // iCurrentCoin = Math.floor(iCurrentCoin / 100);
                        // iCurrentCoin = Math.floor(iCurrentCoin * 100);
                        iCurrentCoin = Math.floor(iCurrentCoin / this.iBlind) * this.iBlind;
                        // if ( this.slider.iCurrentBar == 100 )
                        //     iCurrentCoin = player.iGameCoin;
                        if (iCurrentCoin > player.iGameCoin) iCurrentCoin = player.iGameCoin;

                        console.log(`iCoin : ${iCurrentCoin}`);
                        this.listLabels[2].UpdateCaption(iCurrentCoin.toString());
                    }
                }
            }
        }
    }
    OnTouchEnd()
    {
        if (this.isMobile == true) {

        }
    }

    OnMouseDown(mouse) {
        for (let i in this.listPlayers) {
            this.listPlayers[i].Down(mouse);
        }

        for (let i in this.listButtons) {
            this.listButtons[i].Down(mouse);
        }

        if (true == this.bEnableBetting) {
            for (let i in this.listBettingButtons)
                this.listBettingButtons[i].Down(mouse);
            for (let i in this.sliderButton)
                this.sliderButton[i].Down(mouse);
        }

        if (true == this.bEnableLocation) {
            for (let i in this.listLocationButtons) {
                this.listLocationButtons[i].Down(mouse);
            }
        }
        //this.slider.Down(mouse);
        if (true == this.slider[0].Down(mouse) && this.bRaiseButton == false) {
            //if (true == this.slider[0].Down(mouse)) {
            //console.log(this.slider.iCurrentBar);
            //console.log(this.slider.iCurrentLocation);

            let player = this.FindUser(this.socket.strID);
            if (player != null) {
                console.log(`player coin : ${player.iGameCoin}`);

                let term = player.iGameCoin - this.iCallCoin;
                if (term > 0) {
                    let fDelta = term / 100;

                    let iCurrentCoin =
                        this.iCallCoin +
                        this.iBlind +
                        Math.floor(fDelta * this.slider[0].iCurrentBar);
                    if (iCurrentCoin < this.iBlind) iCurrentCoin = this.iBlind;
                    // iCurrentCoin = Math.floor(iCurrentCoin / 100);
                    // iCurrentCoin = Math.floor(iCurrentCoin * 100);
                    iCurrentCoin = Math.floor(iCurrentCoin / this.iBlind);
                    iCurrentCoin = Math.floor(iCurrentCoin * this.iBlind);
                    // if ( this.slider.iCurrentBar == 100 )
                    //     iCurrentCoin = player.iGameCoin;
                    if (iCurrentCoin > player.iGameCoin) iCurrentCoin = player.iGameCoin;

                    console.log(`iCoin : ${iCurrentCoin}`);

                    this.listLabels[2].UpdateCaption(iCurrentCoin.toString());
                }
            }
        }
    }

    OnMouseUp(mouse) {
        for (let i in this.listPlayers) {
            this.listPlayers[i].Up(mouse);
        }

        for (let i in this.listButtons) {
            this.listButtons[i].Up(mouse);
        }

        if (true == this.bEnableBetting) {
            for (let i in this.listBettingButtons)
                this.listBettingButtons[i].Up(mouse);
            for (let i in this.sliderButton)
                this.sliderButton[i].Up(mouse);
        }

        if (true == this.bEnableLocation) {
            for (let i in this.listLocationButtons) {
                this.listLocationButtons[i].Up(mouse);
            }
        }

        this.slider[0].Up(mouse);
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
            if (null != player) 
            {
                player.bEnablePlay = true;
                if(player.iLocation != -1)
                {
                    player.bSpectator = false;
                }
            }
        }
    }
}
