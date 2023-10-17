import IUIImage from "../js/image.js";
import IUIText from "../js/text.js";
import IUIProgressBar from "../js/progressbar.js";
import ICardDealer from "../game/ICardDealer.js";
import IChipDealer from "../game/IChipDealer.js";

export default class IUser{

    constructor(strID, iGameCoin, iLocation, iFxLocation, iAvatar, eUserType, kTimer, kSC, listHandCard, isMobile, strDeckcode)
    {
        console.log(`IUser::constructor : ${strID}, Coin ${iGameCoin}, iLocation:${iLocation}, iFxLocation :${iFxLocation}, iAvatar : ${iAvatar}, eUserType: ${eUserType}`);

        this.strID = strID;
        this.iGameCoin = iGameCoin;
        this.iLocation  = iLocation;
        this.iFxLocation = iFxLocation;
        this.iAvatar = parseInt(iAvatar);
        this.eUserType = eUserType;
        this.strDeckcode = strDeckcode;

        this.strPlayerType = '';
        this.bEnableRenderBettingType = false;
        this.iMaxPlayer = 0;
        this.iBettingType = -1;
        this.iBettingTypeRenderCounter = 0;
        this.listHandCard = [];
        //this.listHandCard = listHandCard;
        if ( listHandCard.length )
        {
            for ( let i in listHandCard )
            {
                //this.listHandCard.push(listHandCard[i]);
                this.listHandCard.push(listHandCard[i]);
            }
        }
        this.strHand = '';
        this.bFocus = false;
        this.bWinner = false;
        this.bBettingMode = false;
        this.bAbstentionWin = false;

        this.iBettingTime = 0;
        this.iOriginBettingTime = 0;
        this.strLastBetting = '';
        this.bRenderFocusMine = false;
        this.fFocusMineElapsedTime = 0;

        this.listCardDealer = [];

        this.listChipDealer = [];
        this.listCallCoin = [];

        this.listWinCards = [false, false];

        this.iAutoFoldCounter = 0;

        this.kSC = kSC;
        this.isMobile = isMobile;

        // this.x = cPlayerLocations[iFxLocation].x;
        // this.y = cPlayerLocations[iFxLocation].y;

        this.x = kSC.GetLocation(ELocationIndex.P1Table+iFxLocation).x;
        this.y = kSC.GetLocation(ELocationIndex.P1Table+iFxLocation).y;

        // this.x = this.ptLocations[iFxLocation].x;
        // this.y = this.ptLocations[iFxLocation].y;
        this.iCurrentX = this.x;
        this.iCurrentY = this.y;

        this.listImages = 
        [
            new IUIImage(this.iCurrentX, this.iCurrentY, 160, 160, imageOtherAvatarBase, 160, 160),
            new IUIImage(this.iCurrentX-6, this.iCurrentY-6, 172, 172, imageOtherAvatarPanel, 172, 172),
            new IUIImage(this.iCurrentX-6, this.iCurrentY-6, 172, 171, imageOtherfold, 172, 171),

            new IUIImage(this.iCurrentX-19, this.iCurrentY+120-35, 198, 150, imageOtherAvatarTimeline, 300, 150),
            new IUIImage(this.iCurrentX, this.iCurrentY+120, 160, 100, imageOtherBasePanel, 241, 102),

            new IUIImage(this.iCurrentX-70, this.iCurrentY+140, 305, 114, imageWinner, 305, 114),
            new IUIImage(this.iCurrentX-120, this.iCurrentY-40, 600, 250, imageWinnerWing, 1241, 560)
        ];

        this.listImagesPlayerType = 
        [
            // new IUIImage(this.iCurrentX+160, this.iCurrentY+150, 75, 75, imagePlayerType[0], 137, 137),
            // new IUIImage(this.iCurrentX+160, this.iCurrentY+150, 75, 75, imagePlayerType[1], 137, 137),
            // new IUIImage(this.iCurrentX+160, this.iCurrentY+150, 75, 75, imagePlayerType[2], 137, 137),
            new IUIImage(kSC.GetLocation(ELocationIndex.P1Type+iFxLocation).x, kSC.GetLocation(ELocationIndex.P1Type+iFxLocation).y, 50, 50, imagePlayerType[0], 137, 137),
            new IUIImage(kSC.GetLocation(ELocationIndex.P1Type+iFxLocation).x, kSC.GetLocation(ELocationIndex.P1Type+iFxLocation).y, 50, 50, imagePlayerType[1], 137, 137),
            new IUIImage(kSC.GetLocation(ELocationIndex.P1Type+iFxLocation).x, kSC.GetLocation(ELocationIndex.P1Type+iFxLocation).y, 50, 50, imagePlayerType[2], 137, 137),
            //new IUIImage(0, 0, 75, 75, imagePlayerType[0], 137, 137),
            //new IUIImage(0, 0, 75, 75, imagePlayerType[1], 137, 137),
            //new IUIImage(0, 0, 75, 75, imagePlayerType[2], 137, 137),

        ];

        this.listImagesBettingType = [];

        for ( let i = 0; i < 8; ++ i )
        {
            let imageBettingType = new IUIImage(this.iCurrentX, this.iCurrentY+170, 160, 51, imageBettings[i], 160, 51);
            this.listImagesBettingType.push(imageBettingType);
        }

        this.listImagesCard = [];
        for ( let i = 0; i < 54; ++ i )
        {
            //let imageCard = new IUIImage(this.iCurrentX+160, this.iCurrentY+50, 70, 110, imageCards[i], 163, 227);
            let imageCard = new IUIImage(this.iCurrentX+160, this.iCurrentY+50, 115, 150, imageCards[i], 167, 231);

            this.listImagesCard.push(imageCard);
        }
        this.listImageCardWinFrame = new IUIImage(this.iCurrentX+160, this.iCurrentY+50, 115, 150, imageCardFrames[0], 163, 227);

        const cardImage = (strDeckcode == 1) ? imageCards[52] : imageCards[53];
        this.listOpenCard1 = new IUIImage(this.iCurrentX+160, this.iCurrentY+50, 115, 150, cardImage, 167, 231);
        this.listOpenCard2 = new IUIImage(this.iCurrentX+160, this.iCurrentY+50, 115, 150, cardImage, 167, 231);

        this.renderCard1 = true;
        this.renderCard2 = true;
        this.isCardClicked = false;
        this.selectedCardIndex = null; // 0: OpenCard1, 1: OpenCard2
        this.mouse1Y = 0;
        this.mouse2Y = 0;
        // this.listImagesHand = [];
        // for ( let i = 0; i < 9; ++ i )
        // {
        //     //let image = new IUIImage(this.iCurrentX-155, this.iCurrentY-50, 300, 58, imagePokerHand[i], 300, 58);
        //     let image = new IUIImage(this.iCurrentX-70 , this.iCurrentY+65, 300, 58, imagePokerHand[i], 300, 58);

        //     this.listImagesHand.push(image);
        // }

        this.listImageAvatar = [];
        for ( let i = 0; i < 33; ++ i )
        {
            let image = new IUIImage(this.iCurrentX, this.iCurrentY, 160, 160, imageAvatar[i], 160, 160);

            this.listImageAvatar.push(image);
        }

        this.textlCoin = new IUIText(this.iCurrentX+ 80, this.iCurrentY + 155, 30, iGameCoin.toLocaleString(), 0);
        this.listProgressBar = [];
        for ( let i = 0; i < 3; ++ i )
        {
            let progressBar = new IUIProgressBar(this.iCurrentX+5, this.iCurrentY+165, 160, 15, imageProgressBar[i], 200, 34, kTimer);
            this.listProgressBar.push(progressBar);
        }
        //this.textName = new IUIText(this.iCurrentX + -80, this.iCurrentY + 200, 15, strID, 0);
        this.textName = new IUIText(this.iCurrentX+80, this.iCurrentY + 200, 30, strID, 0);
        this.textHand = new IUIText(this.iCurrentX+80, this.iCurrentY + 250, 20, '', 0);
        this.textCallCoin = new IUIText(kSC.GetLocation(ELocationIndex.TableCoin1+iFxLocation).x, kSC.GetLocation(ELocationIndex.TableCoin1+iFxLocation).y, 20, '', 0);
        
        this.m_fVR = 1;
        this.m_fHR = 1;

        this.kTimer = kTimer;
        this.iNumCards = 0;
        //this.iAvatar = Math.random()*2;

        this.fInterval = 0;
        this.bRender = false;
        this.bEnablePlay = false;

        this.bFold = false;
        this.bTrunFinish = false;
        this.ibettingCallCoin = 0;

        this.bReserveExit = false;
        this.bSpectator = true;
        this.bHandCardTurn = false;
        this.bShowCard = false;
    }

    Initialize()
    {
        this.strPlayerType = '';
        this.bEnableRenderBettingType = false;
        this.iBettingType = -1;
        this.iBettingTypeRenderCounter = 0;
        this.listHandCard = [];
        this.strHand = '';
        this.bFocus = false;
        this.bWinner = false;
        this.bAbstentionWin = false;
        this.bBettingMode = false;
        this.bFold = false;

        this.bHandCardTurn = false;
        this.bShowCard = false;

        this.iNumCards = 0;
        //this.listTempHandCard = [];
        this.listCardDealer = [];
        this.listChipDealer = [];
        this.strLastBetting = '';
        this.textHand.UpdateCaption('');
        this.textCallCoin.UpdateCaption('');
        this.ibettingCallCoin = 0;

        this.renderCard1 = true;
        this.renderCard2 = true;
        this.isCardClicked = false;
        this.selectedCardIndex = null; // 0: OpenCard1, 1: OpenCard2
        this.mouse1Y = 0;
        this.mouse2Y = 0;
    }

    Render(ctx) 
    {
        for ( let i in this.listImages )
        {
            // if ( i == 2 && this.bFocus == false )
            //     continue;
            if ( i == 3 )
                continue;

            // if ( i == 4 && this.bWinner == false )
            //     continue;
            if ( i == 5 )
                continue;

            if ( i == 4 )
                continue;

            if ( i == 6 )
                continue;

            this.listImages[i].Render(ctx);
        }

        this.listImageAvatar[this.iAvatar].Render(ctx);
        //

        if ( this.fInterval >= 0 )
        {
            this.fInterval -= this.kTimer.GetElapsedTime();
            if ( this.fInterval <= 0 )
            {
                this.bRender = !this.bRender;
                this.fInterval = 0.5;
            }
        }
        if ( this.strLastBetting == 'Fold' )
        {
            this.bFold = true;
            this.listImages[2].Render(ctx);
            this.listImagesBettingType[5].Render(ctx);
        }

        if ( this.listHandCard.length > 0 )
        {
            if ( this.iFxLocation != 0 && this.strLastBetting == 'Fold' )
            {
                this.bFold = true;
                this.listImages[2].Render(ctx);
                this.listImagesBettingType[5].Render(ctx);
            }
            else if(this.bHandCardTurn == true)
            {
                for (let i in this.listHandCard) {
                    const x = this.x + (i * 100) - 25;
                    let y = this.y - 20;

                    this.listImagesCard[this.listHandCard[i]].RenderLocation(ctx, x, y);

                    if (i == 0 && this.renderCard1 == true) {
                        if(this.mouse1Y) y = this.mouse1Y;
                        this.listOpenCard1.RenderLocation(ctx, x, y);
                    } else if (i == 1 && this.renderCard2 == true) {
                        if(this.mouse2Y) y = this.mouse2Y;
                        this.listOpenCard2.RenderLocation(ctx, x, y);
                    }
                }
            }
            else
            {
                for ( let i in this.listHandCard )
                {
                    const x = this.x + (i*100) - 25;
                    const y = this.y - 20;
                    
                    if(this.bSpectator == false && this.bAbstentionWin == false)
                    {
                        this.listImagesCard[this.listHandCard[i]].RenderLocation(ctx, x, y);
                        if (i == 0) {
                            if (this.bWinner == true && this.listWinCards[0] == true) //&& this.bRender == true )
                                this.listImageCardWinFrame.RenderLocation(ctx, x, y);
                        }
                        else {
                            if (this.bWinner == true && this.listWinCards[1] == true) //&& this.bRender == true )
                                this.listImageCardWinFrame.RenderLocation(ctx, x, y);
                        }
                    }
                    else if(this.bAbstentionWin == true && this.iFxLocation != 0 && this.bShowCard == false)
                    {
                        if(this.strDeckcode == 1)
                        {
                            this.listImagesCard[52].RenderLocation(ctx, x, y);
                        }
                        else
                        {
                            this.listImagesCard[53].RenderLocation(ctx, x, y);
                        }
                    }
                    else
                    {
                        this.listImagesCard[this.listHandCard[i]].RenderLocation(ctx, x, y);
                    }
                        // if ( i == 0 ) {
                        //     this.listImagesCard[this.listHandCard[i]].RenderLR(ctx, x, y, 0);
                        //     if ( this.bWinner == true && this.listWinCards[0] == true ) //&& this.bRender == true )
                        //         this.listImageCardWinFrame.RenderLR(ctx, x, y, 0);
                        // }
                        // else {
                        //     this.listImagesCard[this.listHandCard[i]].RenderLR(ctx, x, y, 0);
                        //     if ( this.bWinner == true && this.listWinCards[1] == true )//&& this.bRender == true )
                        //         this.listImageCardWinFrame.RenderLR(ctx, x, y, 0);
                        // }
                }
            }
        }
        if ( this.bFocus == true )
        {
            // if ( this.iFxLocation == 0 )
            // {
                this.fFocusMineElapsedTime -= this.kTimer.GetElapsedTime();
                if ( this.fFocusMineElapsedTime < 0 )
                {
                    this.bRenderFocusMine = !this.bRenderFocusMine;
                    this.fFocusMineElapsedTime = 0.5;
                }

                if ( this.bRenderFocusMine == true)
                    this.listImages[3].Render(ctx);
            // }
            // else
            // {
            //     this.listImages[2].Render(ctx);
            // }
        }
        this.listImages[4].Render(ctx);

        // if ( this.bFocus == true )
        // {
        //     if ( this.iFxLocation == 0 )
        //     {
        //         this.fFocusMineElapsedTime -= this.kTimer.GetElapsedTime();
        //         if ( this.fFocusMineElapsedTime < 0 )
        //         {
        //             this.bRenderFocusMine = !this.bRenderFocusMine;
        //             this.fFocusMineElapsedTime = 0.5;
        //         }

        //         if ( this.bRenderFocusMine == true )
        //             this.listImages[2].Render(ctx);
        //     }
        //     else
        //     {
        //         this.listImages[2].Render(ctx);
        //     }
        // }
        for ( let i in this.listProgressBar )
        {
            this.listProgressBar[i].Render(ctx);
        }
        this.textlCoin.Render(ctx);
        //this.labelCoin.Render(ctx);
        this.textName.Render(ctx);
        this.textHand.Render(ctx);
        
        if ( this.bWinner == true )
        {
            this.listImages[6].Render(ctx);
            this.listImages[5].Render(ctx);
        }

        if ( this.strPlayerType == 'Dealer' )
        {
            this.listImagesPlayerType[0].Render(ctx);
        }
        else if ( this.strPlayerType == 'SB' )
        {
            this.listImagesPlayerType[1].Render(ctx);
        }
        else if ( this.strPlayerType == 'BB' )
        {
            this.listImagesPlayerType[2].Render(ctx);
        }

        // if ( this.listHandCard.length > 0 )
        // {
        //     for ( let i in this.listHandCard )
        //     {
        //         let iDefaultX = 180;
        //         if ( this.iFxLocation == 7 || this.iFxLocation == 8 )
        //             iDefaultX = -170;

        //         const x = this.x + iDefaultX + (i*80);
        //         const y = this.y + 20;

        //         //this.listImagesCard[this.listHandCard[i]].RenderLocation(ctx, x, y);
        //         if ( i == 0 )
        //             this.listImagesCard[this.listHandCard[i]].RenderLR(ctx, x, y, 350);
        //         else
        //             this.listImagesCard[this.listHandCard[i]].RenderLR(ctx, x, y, 10);
        //     }
        // }
       

        if ( this.iFxLocation == 0 && this.strLastBetting == 'Fold' )
        {
            const cOffset = parseInt(50 * this.fVR);
            this.listImagesBettingType[5].Render(ctx);
        }

        // if ( this.strHand != '')
        // {
        //     switch ( this.strHand )
        //     {
        //         case 'Pair':
        //             this.listImagesHand[0].Render(ctx);
        //             break;
        //         case 'Two Pair':
        //             this.listImagesHand[1].Render(ctx);
        //             break;
        //         case 'Three of a Kind':
        //             this.listImagesHand[2].Render(ctx);
        //             break;
        //         case 'Straight':
        //             this.listImagesHand[3].Render(ctx);
        //             break;
        //         case 'Flush':
        //             this.listImagesHand[4].Render(ctx);
        //             break;
        //         case 'Full House':
        //             this.listImagesHand[5].Render(ctx);
        //             break;
        //         case 'Four of a Kind':
        //             this.listImagesHand[6].Render(ctx);
        //             break;
        //         case 'Straight Flush':
        //             this.listImagesHand[7].Render(ctx);
        //             break;
        //         case 'Royal Flush':
        //             this.listImagesHand[8].Render(ctx);
        //             break;
        //     }
        // }

        //this.listImagesBettingType[0].Render(ctx);

        for ( let i in this.listCardDealer )
        {
            this.listCardDealer[i].Render(ctx);
        }

        if(this.bSpectator == false)
        {
            for ( let i in this.listChipDealer )
            {
                this.listChipDealer[i].Render(ctx);
            }
        }

         // 플랍, 리버, 턴 모드일때만 보이는거.
         if ( this.bEnableRenderBettingType ) 
         {
             if ( this.iBettingType != -1 && this.bWinner == false && this.bBettingMode == true)
             {
                 this.listImagesBettingType[this.iBettingType].Render(ctx);
                 if(this.ibettingCallCoin != 0)
                 {
                     this.textCallCoin.Render(ctx);
                 }
             }
         }
    }

    Update()
    {
        if ( this.iBettingTime > 0 )
        {
            this.iBettingTime -= this.kTimer.GetElapsedTime();
            let iValue = parseInt(this.iBettingTime);
            if ( iValue < 0 )
                iValue = 0;
            if(( this.iOriginBettingTime*0.7) <= iValue && this.iOriginBettingTime >= iValue ){
                this.listProgressBar[0].UpdateTime(iValue);
                this.listProgressBar[1].UpdateTime(0);
                this.listProgressBar[2].UpdateTime(0);
            }
            else if((this.iOriginBettingTime*0.3) <= iValue && (this.iOriginBettingTime*0.7) > iValue)
            {
                this.listProgressBar[1].UpdateTime(iValue);
                this.listProgressBar[0].UpdateTime(0);
                this.listProgressBar[2].UpdateTime(0);
            }
            else {
                this.listProgressBar[2].UpdateTime(iValue);
                this.listProgressBar[0].UpdateTime(0);
                this.listProgressBar[1].UpdateTime(0);
            }
        }

        // if ( this.iBettingTypeRenderCounter > 0 )
        // {
        //     -- this.iBettingTypeRenderCounter;
        //     if ( this.iBettingTypeRenderCounter <= 0 )
        //     {
        //         this.bEnableRenderBettingType = false;
        //         this.iBettingType = -1;
        //     }
        // }
        if(this.bSpectator == false)
        {
            for ( let i in this.listCardDealer )
            {
                this.listCardDealer[i].Update();
                if ( this.listCardDealer[i].iCompleteStep == 1 )
                {
                    soundPlaceCard.play();

                    this.listHandCard.push(this.listCardDealer[i].iCardIndex);
                    //this.listHandCard.push(this.listTempHandCard[i]);
                    this.listCardDealer[i].iCompleteStep = 2;
                    //this.listTempHandCard.splice(0, 1);
                    this.listCardDealer.splice(0, 1);
                }
            }
            for ( let i in this.listChipDealer )
            {
                this.listChipDealer[i].Update();
                if ( this.bBettingMode == false )
                    this.listChipDealer.splice(i, 1);
            }
        }
        else
        {
            for ( let i in this.listCardDealer )
            {
                for ( let i in this.listCardDealer )
            {
                this.listCardDealer[i].Update();
                if ( this.listCardDealer[i].iCompleteStep == 1 )
                {
                    soundPlaceCard.play();

                    this.listHandCard.push(52);
                    //this.listHandCard.push(this.listTempHandCard[i]);
                    this.listCardDealer[i].iCompleteStep = 2;
                    //this.listTempHandCard.splice(0, 1);
                    this.listCardDealer.splice(0, 1);
                }
            }
            }
        }
    }

    OnSize(fHR, fVR)
    {
        this.m_fHR = fHR;
        this.m_fVR = fVR;
        //console.log("------------------------------this.m_fHRthis.m_fHR : " + this.m_fHR + " this.m_fVR.m_fVR : " + this.m_fVR);
        for ( let i in this.listImages )
        {
            this.listImages[i].OnSize(fHR, fVR);
        }

        for ( let i in this.listImagesPlayerType )
        {
            this.listImagesPlayerType[i].OnSize(fHR, fVR);
        }
        for ( let i in this.listImagesBettingType )
        {
            this.listImagesBettingType[i].OnSize(fHR, fVR);
        }
        for ( let i in this.listImagesCard )
        {
            this.listImagesCard[i].OnSize(fHR, fVR);
        }

        this.listImageCardWinFrame.OnSize(fHR, fVR);

        this.listOpenCard1.OnSize(fHR, fVR);
        this.listOpenCard2.OnSize(fHR, fVR);
        // for ( let i in this.listImagesHand )
        // {
        //     this.listImagesHand[i].OnSize(fHR, fVR);
        // }
        for ( let i in this.listImageAvatar )
        {
            this.listImageAvatar[i].OnSize(fHR, fVR);
        }
        for( let i in this.listProgressBar )
        {
            this.listProgressBar[i].OnSize(fHR, fVR);
        }
        // for ( let i in this.listCardDealer )
        // {
        //     this.listCardDealer[i].OnSize(fHR, fVR);
        // }
        // if(this.bSpectator == false)
        // {
        //     for ( let i in this.listChipDealer )
        //     {
        //         this.listChipDealer[i].OnSize(fHR, fVR);
        //     }
        // }
        this.iCurrentX = this.x * fHR;
        this.iCurrentY = this.y * fVR;

        this.textlCoin.OnSize(fHR, fVR);
        //this.labelCoin.OnSize(fHR, fVR);
        this.textName.OnSize(fHR, fVR);
        this.textHand.OnSize(fHR, fVR);
        this.textCallCoin.OnSize(fHR,fVR);
    }

    Locate(iFxLocation)
    {
        this.iFxLocation = iFxLocation;

        // this.x = this.ptLocations[iFxLocation].x;
        // this.y = this.ptLocations[iFxLocation].y;
        this.x = this.kSC.GetLocation(ELocationIndex.P1Table+iFxLocation).x;
        this.y = this.kSC.GetLocation(ELocationIndex.P1Table+iFxLocation).y;

        this.iCurrentX = this.x;
        this.iCurrentY = this.y;

        this.listImages[0].SetLocation(this.iCurrentX, this.iCurrentY);
        this.listImages[1].SetLocation(this.iCurrentX-6, this.iCurrentY-6);
        this.listImages[2].SetLocation(this.iCurrentX-6, this.iCurrentY-6);
        //this.listImages[2].SetLocation(this.iCurrentX-19, this.iCurrentY+120-24);
        this.listImages[3].SetLocation(this.iCurrentX-19, this.iCurrentY+120-35);
        this.listImages[4].SetLocation(this.iCurrentX, this.iCurrentY+120);
        this.listImages[5].SetLocation(this.iCurrentX-70, this.iCurrentY+140);
        this.listImages[6].SetLocation(this.iCurrentX-120, this.iCurrentY-40);

        // this.listImages[0].SetLocation(this.iCurrentX, this.iCurrentY);
        // this.listImages[1].SetLocation(this.iCurrentX-6, this.iCurrentY-6);
        // this.listImages[2].SetLocation(this.iCurrentX-6, this.iCurrentY-6);
        // //this.listImages[2].SetLocation(this.iCurrentX-19, this.iCurrentY+120-24);
        // this.listImages[3].SetLocation(this.iCurrentX-19, this.iCurrentY+120-35);
        // this.listImages[4].SetLocation(this.iCurrentX, this.iCurrentY+120);
        // this.listImages[5].SetLocation(this.iCurrentX-70, this.iCurrentY+140);
        // this.listImages[6].SetLocation(this.iCurrentX-120, this.iCurrentY-40);

        for ( let i in this.listImagesPlayerType )
        {
            
            //this.listImagesPlayerType[i].SetLocation(this.iCurrentX+160, this.iCurrentY+150);
            if(this.isMobile == true)
            {
                this.listImagesPlayerType[i].SetLocation(cPlayerTypeVerticalLocations[iFxLocation].x, cPlayerTypeVerticalLocations[iFxLocation].y);
            }
            else 
            {
                this.listImagesPlayerType[i].SetLocation(cPlayerTypeLocations[iFxLocation].x, cPlayerTypeLocations[iFxLocation].y);
            }
        }

        for ( let i in this.listImagesBettingType )
        {
            this.listImagesBettingType[i].SetLocation(this.iCurrentX, this.iCurrentY+170);
        }

        // for ( let i in this.listImagesHand )
        // {
        //     //this.listImagesHand[i].SetLocation(this.iCurrentX - 155, this.iCurrentY - 50);
        //     this.listImagesHand[i].SetLocation(this.iCurrentX - 70, this.iCurrentY + 65);
        // }
        for ( let i in this.listImageAvatar )
        {
            this.listImageAvatar[i].SetLocation(this.iCurrentX, this.iCurrentY);
        }
        for ( let i in this.listProgressBar )
        {
            this.listProgressBar[i].SetLocation(this.iCurrentX+5, this.iCurrentY+165);
        }
        this.textlCoin.SetLocation(this.iCurrentX+ 80, this.iCurrentY + 155);
        //this.labelCoin.SetLocation(this.iCurrentX+ 80, this.iCurrentY + 130);
        //this.labelTime.SetLocation(this.iCurrentX- 25, this.iCurrentY + 180);
        //this.textName.SetLocation(this.iCurrentX + -80, this.iCurrentY + 200);
        this.textName.SetLocation(this.iCurrentX+80, this.iCurrentY + 200);
        this.textHand.SetLocation(this.iCurrentX+80, this.iCurrentY + 250);
        if(this.isMobile == true)
        {
            this.textCallCoin.SetLocation(cChipCallVerticalTexts[iFxLocation].x, cChipCallVerticalTexts[iFxLocation].y);
        }
        else
        {
            this.textCallCoin.SetLocation(cChipCallTexts[iFxLocation].x, cChipCallTexts[iFxLocation].y);
        }
        
        this.OnSize(this.m_fHR, this.m_fVR);
    }

    SetPlayerType(strPlayerType)
    {
        this.strPlayerType = strPlayerType;
    }

    UpdateMyCoin(iCoin)
    {
        this.iGameCoin = iCoin;
        this.textlCoin.UpdateCaption(this.iGameCoin.toLocaleString());
    }

    SetBettingTime(iTime)
    {
        this.iBettingTime = iTime;
        this.iOriginBettingTime = parseInt(iTime);

        if ( iTime > 0)
        {
            for( let i in this.listProgressBar)
            {
                this.listProgressBar[i].UpdateTime(0);
                this.listProgressBar[i].SetBettingTime(parseInt(iTime));
                this.listProgressBar[i].bEnable = true;
            }
        }
    }

    Betting(strBetting, iCoin, iMyCoin)
    {
        if(this.bEnablePlay == true && this.bSpectator == false)
        {
            this.UpdateMyCoin(iMyCoin);
            this.SetBettingType(strBetting, iMyCoin);
            this.ibettingCallCoin += parseInt(iCoin);
            this.textCallCoin.UpdateCaption(this.ibettingCallCoin.toLocaleString());
            for( let i in this.listProgressBar)
            {
            this.listProgressBar[i].bEnable = false;
            this.listProgressBar[i].UpdateTime(0);
            }

            //
            const tx = this.x + 0;
            const ty = this.y + 20;

            // let x = cChipLocations[this.iFxLocation].x;
            // let y = cChipLocations[this.iFxLocation].y;
            let x = this.kSC.GetLocation(ELocationIndex.TableChip1+this.iFxLocation).x;
            let y = this.kSC.GetLocation(ELocationIndex.TableChip1+this.iFxLocation).y;

            // let x = 760;
            // let y = 600;

            //let dealer = new ICardDealer(x, y, tx, ty, this.m_fHR, this.m_fVR, this.kTimer, 70, 110, iCard);

            let dealer = new IChipDealer(tx, ty, x, y, this.m_fHR, this.m_fVR, this.kTimer, 40, 40, iCoin);
            this.listChipDealer.push(dealer);

            soundChipThrow.play();
        }
    }

    SetBettingType(strBettingType, iMyCoin)
    {
        this.bEnableRenderBettingType = true;
        //this.iBettingTypeRenderCounter  = 1000;
        this.strLastBetting = strBettingType;

        switch ( strBettingType )
        {
            case 'Quater':
                this.iBettingType = 0;
                break;
            case 'Half':
                this.iBettingType = 1;
                break;
            case 'Full':
                this.iBettingType = 2;
                break;
            case 'Allin':
                this.iBettingType = 3;
                break;
            case 'Call':
                this.iBettingType = 4;
                break;
            case 'Fold':
                this.iBettingType = 5;
                break;
            case 'Check':
                this.iBettingType = 6;
                break;
            case 'Raise':
                this.iBettingType = 7;
                break;
            default:
                this.iBettingType = -1;
                break;
        }
        if ( this.iBettingType >= 0 && this.iBettingType <= 7 )
        {
            if(iMyCoin == 0 && (this.iBettingType == 7 || this.iBettingType == 4)) soundBettingType[3].play();
            else soundBettingType[this.iBettingType].play();
        }
    }

    AddHandCard(iCard, strdeckcode)
    {
        console.log(`################################################################# AddHandCard ${iCard}`);

        this.bHandCardTurn = true;
        // let iDefaultX = 180;
        // if ( this.iFxLocation == 7 || this.iFxLocation == 8 )
        //     iDefaultX = -170;

        let index = this.iNumCards;

        // const tx = this.x + iDefaultX + (index*80);
        // const ty = this.y + 20;

        // const tx = this.x + (index*70);
        // const ty = this.y;

        const tx = this.x + (index*100) - 25;
        const ty = this.y - 20;

        let fAngle = 0;
        // let fAngle = 350;
        // if ( this.iNumCards == 1 )
        //     fAngle = 10;

        //let dealer = new ICardDealer(x, y, tx, ty, this.m_fHR, this.m_fVR, this.kTimer, 70, 110, iCard, fAngle);
        //console.log("this.m_fHRthis.m_fHR : " + this.m_fHR + " this.m_fVR.m_fVR : " + this.m_fVR);
        let dealer = '';
        if(this.isMobile == true)
        {
            dealer = new ICardDealer(cDealerVerticalLocation.x,cDealerVerticalLocation.y, tx, ty, this.m_fHR, this.m_fVR, this.kTimer, 115, 150, iCard, strdeckcode, fAngle);
        }
        else
        {
            dealer = new ICardDealer(cDealerLocation.x, cDealerLocation.y, tx, ty, this.m_fHR, this.m_fVR, this.kTimer, 115, 150, iCard, strdeckcode, fAngle);
        }
        
        //let dealer = new ICardDealer(cDealerLocation.x, cDealerLocation.y, tx, ty, this.m_fHR, this.m_fVR, this.kTimer, 115, 150, iCard, strdeckcode);
        this.listCardDealer.push(dealer);

        //this.listHandCard.push(iCard);
        //this.listTempHandCard.push(iCard);

        ++ this.iNumCards;
    }

    SetWinCards(listWinCards)
    {
        console.log(`User WinCards`);
        console.log(listWinCards);
        console.log(this.listHandCard);

        this.listWinCards = [false, false];
        for (let i in this.listHandCard) {
            for (let j in listWinCards) {
            if (listWinCards[j] == this.listHandCard[i]) this.listWinCards[i] = true;
            }
        }
        console.log(this.listWinCards);
    }
    
    Down(mouse) {  
        if(this.bHandCardTurn == true) {
            if(this.renderCard1 == true || this.renderCard2 == true) {
                this.selectCard(mouse);
                this.initialMouseY = mouse.y;  // 마우스의 초기 Y 좌표 저장
            }
        }
    }
    
    Over(mouse) {
        if (this.isCardClicked) {
            const yOffset = mouse.y - this.initialMouseY;  // 움직인 거리 계산
    
            // yOffset이 양수일 경우에만 위치를 업데이트
            if (yOffset > 0) {
                if (this.selectedCardIndex == 0) {
                    this.mouse1Y = this.y + yOffset;  
                } else if (this.selectedCardIndex == 1) {
                    this.mouse2Y = this.y + yOffset;
                }
            }
        }
    }
    
    Up() {
        if (this.isCardClicked) {
            if (this.selectedCardIndex == 0) {
                this.renderCard1 = false;
            } else if (this.selectedCardIndex == 1) {
                this.renderCard2 = false;
            }
        }
        
        this.isCardClicked = false; // 플래그 초기화
        this.selectedCardIndex = null; // 선택된 카드 초기화
    }

    getCardBounds(i) {
        let offsetX = 0;
        let offsetY = 0;
        
        if (i == 0 && this.mouse1Y > 0) {
            offsetY = this.mouse1Y - this.y;  // Y 변화량 계산
        } else if (i == 1 && this.mouse2Y > 0) {
            offsetY = this.mouse2Y - this.y;  // Y 변화량 계산
        }
    
        const x = ((this.x - 25 + (i * 100)) + offsetX) * this.m_fHR;
        const y = ((this.y - 20) + offsetY) * this.m_fVR;
        const width = (this.x - 25 + (i * 100) + 100) * this.m_fHR;
        const height = (this.y - 20 + 100) * this.m_fVR;
    
        return {
            x: x,
            y: y,
            width: width,
            height: height
        };
    }

    isInsideBounds(mouse, bounds) {
    
        return mouse.x > bounds.x && 
               mouse.x < bounds.width && 
               mouse.y > bounds.y && 
               mouse.y < bounds.height;
    }
    
    selectCard(mouse) {
        console.log(`IUser selectCard : ${mouse.x}, ${mouse.y}`);
        const bounds1 = this.getCardBounds(0);
        const bounds2 = this.getCardBounds(1);
        
        if (this.isInsideBounds(mouse, bounds1)) {
            this.selectedCardIndex = 0;
            this.isCardClicked = true;
            this.renderCard1 = true;
        } else if (this.isInsideBounds(mouse, bounds2)) {
            this.selectedCardIndex = 1;
            this.isCardClicked = true;
            this.renderCard2 = true;
        } else {
            this.isCardClicked = false;
        }
    }
}