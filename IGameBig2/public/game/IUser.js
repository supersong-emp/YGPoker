
import IUIImage from "../js/image.js";
import IUIText from "../js/text.js";
import IUIProgressBar from "../js/progressbar.js";
import ICardDealer from "../game/ICardDealer.js";
import { canPlay,isValidPlay,generateValidCombinations,isLowestCardValidPlay } from "../game/IBig2Solver.js"

export default class IUser{

    constructor(strID, iGameCoin, iLocation, iFxLocation, iAvatar, kTimer, kSC)
    {
        console.log(`IUser::constructor : ${strID}, Coin ${iGameCoin}, iLocation:${iLocation}, iFxLocation :${iFxLocation}, iAvatar : ${iAvatar}`);

        this.strID = strID;
        this.iGameCoin = iGameCoin;
        this.iLocation  = iLocation;
        this.iFxLocation = iFxLocation;
        this.iAvatar = parseInt(iAvatar);

        this.strPlayerType = '';
        this.bEnableRenderBettingType = false;
        this.iMaxPlayer = 0;
        this.iBettingType = -1;
        this.iBettingTypeRenderCounter = 0;
        this.listHandCard = [];
        this.listSelectCard = [];
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
        this.listCardSubmit = [];

        this.listCallCoin = [];

        this.listWinCards = [false, false];
        this.listTableCard = [];
        this.listSentCard = [];

        this.iAutoFoldCounter = 0;

        this.bplayuser = false;

        this.kSC = kSC;

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

        this.imagesPlayerType = new IUIImage(kSC.GetLocation(ELocationIndex.P1Type+iFxLocation).x, kSC.GetLocation(ELocationIndex.P1Type+iFxLocation).y, 50, 50, imagePlayerType, 137, 137);

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

        //this.labelCoin = new IUILabel(this.iCurrentX+ 80, this.iCurrentY + 130, 25, 25, 20, NumberImages, 124, 124, iGameCoin.toString(), 0);
        this.textlCoin = new IUIText(this.iCurrentX+ 80, this.iCurrentY + 155, 20, iGameCoin.toLocaleString(), 0);
        this.listProgressBar = [];
        for ( let i = 0; i < 3; ++ i )
        {
            let progressBar = new IUIProgressBar(this.iCurrentX+5, this.iCurrentY+165, 160, 15, imageProgressBar[i], 200, 34, kTimer);
            this.listProgressBar.push(progressBar);
        }
        this.textName = new IUIText(this.iCurrentX+80, this.iCurrentY + 200, 20, strID, 0);
        
        this.m_fVR = 1;
        this.m_fHR = 1;

        this.kTimer = kTimer;
        this.iNumCards = 0;
        //this.iAvatar = Math.random()*2;

        this.fInterval = 0;
        this.bRender = false;
        this.bEnablePlay = false;

        this.bFold = false;
        this.bTrunStart = false;
        this.ibettingCallCoin = 0;

        this.bCanPlay = false;
        this.iScore = 0;
        this.bStarter = false;
    }

    Initialize()
    {
        this.strPlayerType = '';
        this.bEnableRenderBettingType = false;
        this.iBettingType = -1;
        this.iBettingTypeRenderCounter = 0;
        this.listHandCard = [];
        this.listSelectCard = [];
        this.strHand = '';
        this.bFocus = false;
        this.bWinner = false;
        this.bAbstentionWin = false;
        this.bBettingMode = false;

        this.iNumCards = 0;
        //this.listTempHandCard = [];
        this.listCardDealer = [];
        this.listCardSubmit = [];
        this.strLastBetting = '';
        this.ibettingCallCoin = 0;
        this.bCanPlay = false;
        //this.listTableCard = [];
        this.listSentCard = [];
        this.bStarter = false;
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
        if ( this.iFxLocation != 0 && this.bFold == true )
        {
            //this.bFold = true;
            this.listImages[2].Render(ctx);
            //this.listImagesBettingType[5].Render(ctx);
        }
        
        if (this.listHandCard.length > 0) {
            for (let i in this.listHandCard) {
                //console.log(`IUser Handcards ${i}, ${this.listHandCard[i].index}`);

                const iOffset = this.iFxLocation == 0 ? 50 : 20;
                let iOffsetY = 0;

                if (this.listHandCard[i].select == true) {
                    iOffsetY = -50;
                }

                let tx = 0;
                let ty = 0;

                if (this.iFxLocation == 0) {
                    tx = this.x + 150 + (i * iOffset);
                    ty = this.y + iOffsetY;
                    this.listImagesCard[this.listHandCard[i].index].RenderLS(ctx, tx, ty, 1);
                }
                else if (this.iFxLocation == 1) {
                    tx = this.x + 150;
                    ty = this.y - 60 + (i * iOffset);
                    this.listImagesCard[this.listHandCard[i].index].RenderLSR(ctx, tx, ty, 0.7, 90);
                }
                else if (this.iFxLocation == 2) {
                    tx = this.x - 90 + (i * iOffset);
                    ty = this.y + 30;
                    this.listImagesCard[this.listHandCard[i].index].RenderLS(ctx, tx, ty, 0.7);
                }
                else if (this.iFxLocation == 3) {
                    tx = this.x - 95;
                    ty = this.y - 110 + (i * iOffset);
                    this.listImagesCard[this.listHandCard[i].index].RenderLSR(ctx, tx, ty, 0.7, 270);
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
  
        if ( this.bWinner == true )
        {
            this.listImages[6].Render(ctx);
            this.listImages[5].Render(ctx);
        }

        if ( this.strPlayerType == 'Dealer' )
        {
            this.imagesPlayerType.Render(ctx);
        }

        if ( this.iFxLocation == 0 && this.strLastBetting == 'Fold' )
        {
            //const cOffset = parseInt(50 * this.fVR);
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
        if( this.listSentCard.length > 0 )
        {
            for (let i in this.listSentCard) {
                //console.log(`IUser listSentCard ${i}, ${this.listSentCard[i].index}`);

                let tx = 0;
                let ty = 0;

                if (this.iFxLocation == 0) {
                    tx = this.x + 300 + (i * 80);
                    ty = this.y - 200;
                }
                else if (this.iFxLocation == 1) {
                    tx = this.x + 290 + (i * 80);
                    ty = this.y;
                }
                else if (this.iFxLocation == 2) {
                    tx = this.x - 100 + (i * 80);
                    ty = this.y + 220;
                }
                else if (this.iFxLocation == 3) {
                    tx = this.x - 200 - (i * 80);
                    ty = this.y;
                }
                this.listImagesCard[this.listSentCard[i].index].RenderLS(ctx, tx, ty, 0.7);
            }
        }
        for ( let i in this.listCardDealer )
        {
            this.listCardDealer[i].Render(ctx);
        }
        for ( let i in this.listCardSubmit )
        {
            this.listCardSubmit[i].Render(ctx);
        }
        if ( this.iBettingType != -1 && this.bWinner == false && this.bBettingMode == true)
        {
            this.listImagesBettingType[this.iBettingType].Render(ctx);
        }
    }

    handleCardSelection(i,mouse)
    {
        // //console.log(`IUser Handcards ${i}, ${this.listHandCard[i].index}`);
        //const card = this.listHandCard[i];
        //console.log(card);

        // // 마우스 클릭 위치가 카드 영역 내에 있는지 확인합니다.
        // const isMouseInsideCard = mouse.x >= card.iCurrentX && mouse.x <= card.iCurrentX + card.iCurrentWidth && mouse.y >= card.iCurrentY && mouse.y <= card.iCurrentY + card.iCurrentHeight;
            const iOffset = this.iFxLocation == 0 ? 50 : 20;

            const x = (this.x + 150 + (i * iOffset)) * this.m_fHR;
            const y = this.y * this.m_fVR;
            const width = ((this.x + 150 + (i * iOffset)) + 50) * this.m_fHR;
            const height = ((this.y) + 100) * this.m_fVR;

            //console.log(`x : ${x}, y : ${y}, width : ${width}, height : ${height}`);

            if (mouse.x > x && mouse.x < width && mouse.y > y && mouse.y < height) {
                this.listHandCard[i].select = !this.listHandCard[i].select;
                if (this.GetSelectCount() > 5) {
                    this.listHandCard[i].select = false;
                    return;
                }
                if (this.listHandCard[i].select == true) {
                    this.listSelectCard.push(this.listHandCard[i].index);
                }
                else {
                    this.listSelectCard = this.listSelectCard.filter(card => card !== this.listHandCard[i].index);
                }
                this.UpdateCanPlayStatus();
            }
    }

    UpdateCanPlayStatus() {
        console.log("UpdateCanPlayStatus");
        console.log(this.listTableCard);
        if(this.bStarter == true)
        {
            console.log(this.listSelectCard);
            const indexArray = this.listHandCard.map(card => card.index);
            console.log(indexArray);
            if(isLowestCardValidPlay(indexArray, this.listSelectCard))
            {
                this.bCanPlay = true;
                console.log("유효한 카드 조합입니다.");
            }
            else
            {
                this.bCanPlay = false;
                console.log("유효하지 않은 카드 조합입니다.");
            }
        }
        else
        {
            if (this.listTableCard.length != 0) {
                console.log(this.listTableCard);
                console.log(this.listSelectCard);
                if (canPlay(this.listSelectCard, this.listTableCard)) {
                    this.bCanPlay = true;
                    console.log("카드를 놓을 수 있습니다.");
                }
                else {
                    this.bCanPlay = false;
                    console.log("카드를 놓을 수 없습니다.");
                }
            }
            else {
                console.log(this.listSelectCard);
                if (isValidPlay(this.listSelectCard)) {
                    this.bCanPlay = true;
                    console.log("유효한 카드 조합입니다.");
                }
                else {
                    this.bCanPlay = false;
                    console.log("유효하지 않은 카드 조합입니다.");
                }
            }
        }
    }

    OnMouseDown(mouse)
    {
        //console.log(`IUser OnMouseDown : ${mouse.x}, ${mouse.y}`);
        if ( this.listHandCard.length > 0 )
        {
            for ( let i in this.listHandCard )
            {
                if(this.bTrunStart == true)
                this.handleCardSelection(i,mouse);
            }
        }
    }
    GetSelectCount()
    {
        let iCount = 0;
        for( let i in this.listHandCard )
        {
            if(this.listHandCard[i].select == true)
            {
                iCount++;
            }
        } 
        return iCount;
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

        for ( let i in this.listCardDealer )
        {
            this.listCardDealer[i].Update(20,1);
            if ( this.listCardDealer[i].iCompleteStep == 1 )
            {
                soundPlaceCard.play();
                const suit = Math.floor(this.listCardDealer[i].iCardIndex / 13);// 0: spade, 1: heart, 2: club, 3: diamond
                const num = this.listCardDealer[i].iCardIndex % 13;

                this.listHandCard.push({index:this.listCardDealer[i].iCardIndex, suit:suit, num:num, select:false});
                this.listCardDealer[i].iCompleteStep = 2;
                this.listCardDealer.splice(0, 1);
            }
        }

        for (let i = this.listCardSubmit.length - 1; i >= 0; i--)
        {
            this.listCardSubmit[i].Update(1,5);
            if ( this.listCardSubmit[i].iCompleteStep == 1 )
            {
                soundPlaceCard.play();
                //console.log(this.listCardSubmit[i].iCardIndex);
                this.listSentCard.push({index:this.listCardSubmit[i].iCardIndex});
                this.listCardSubmit[i].iCompleteStep = 2;
                this.listCardSubmit.splice(i, 1); // Use 'i' instead of '0'
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
        
        for ( let i in this.listImagesBettingType )
        {
            this.listImagesBettingType[i].OnSize(fHR, fVR);
        }
        for ( let i in this.listImagesCard )
        {
            this.listImagesCard[i].OnSize(fHR, fVR);
        }

        this.imagesPlayerType.OnSize(fHR, fVR);
        this.listImageCardWinFrame.OnSize(fHR, fVR);

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
        for ( let i in this.listCardDealer )
        {
            this.listCardDealer[i].OnSize(fHR, fVR);
        }
        for ( let i in this.listCardSubmit )
        {
            this.listCardSubmit[i].OnSize(fHR, fVR);
        }

        this.iCurrentX = this.x * fHR;
        this.iCurrentY = this.y * fVR;

        this.textlCoin.OnSize(fHR, fVR);
        //this.labelCoin.OnSize(fHR, fVR);
        this.textName.OnSize(fHR, fVR);
    }

    Locate(iFxLocation)
    {
        this.iFxLocation = iFxLocation;

        // this.x = this.ptLocations[iFxLocation].x;
        // this.y = this.ptLocations[iFxLocation].y;
        this.x = cPlayerLocations[iFxLocation].x;
        this.y = cPlayerLocations[iFxLocation].y;

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

        this.imagesPlayerType.SetLocation(cPlayerTypeLocations[iFxLocation].x, cPlayerTypeLocations[iFxLocation].y);

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
        // this.labelCoin = new IUILabel(this.iCurrentX+ 80, this.iCurrentY + 130, 30, 30, 15, NumberImages, 114, 114, iGameCoin.toString(), 0);
        // this.textName = new IUIText(this.iCurrentX + -80, this.iCurrentY + 200, 15, this.strID, 0);
        for ( let i in this.listProgressBar )
        {
            this.listProgressBar[i].SetLocation(this.iCurrentX+5, this.iCurrentY+165);
        }
        this.textlCoin.SetLocation(this.iCurrentX+ 80, this.iCurrentY + 155);
        //this.labelCoin.SetLocation(this.iCurrentX+ 80, this.iCurrentY + 130);
        //this.labelTime.SetLocation(this.iCurrentX- 25, this.iCurrentY + 180);
        //this.textName.SetLocation(this.iCurrentX + -80, this.iCurrentY + 200);
        this.textName.SetLocation(this.iCurrentX+80, this.iCurrentY + 200);
        this.OnSize(this.m_fHR, this.m_fVR);
    }

    SetPlayerType(strPlayerType)
    {
        this.strPlayerType = strPlayerType;
        if(strPlayerType == 'Dealer')
        {
            this.bStarter = true;
        }
    }

    SetSentReset()
    {
        this.listSentCard = [];
        this.listTableCard = [];
    }

    AddSentCard( listCard, strdeckcode, i)
    {
        if(listCard != null)
        {
            //this.listTableCard = [];
            this.listSentCard = [];
            //this.listSentCard.push(list);
            //this.listTableCard.push(listCard);
            //console.log(`Addsentcard : ${listCard}`);
        }
        else
        {
            this.listSentCard = [];
        }
        console.log(`################################################################# AddSentCard ${listCard}`);
        console.log(listCard);

        let tx = 0;
        let ty = 0;

        if ( this.iFxLocation == 0 )
        {
            tx = this.x + 300 + (i*80);
            ty = this.y - 200;
        }
        else if( this.iFxLocation == 1 )
        {
            tx = this.x + 290 + (i*80);
            ty = this.y;
        }
        else if( this.iFxLocation == 2 )
        {
            tx = this.x - 100 + (i*80);
            ty = this.y + 200;
        }
        else if( this.iFxLocation == 3 )
        {
            tx = this.x - 200 - (i*80);
            ty = this.y;
        }

        const fAngle = 0;
        
        let submit = new ICardDealer(this.x, this.y, tx, ty, this.m_fHR, this.m_fVR, this.kTimer, 80, 110, listCard, strdeckcode, fAngle);
        this.listCardSubmit.push(submit);
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

    ResetProgressbar()
    {
        for( let i in this.listProgressBar)
            {
                this.listProgressBar[i].UpdateTime(0);
                this.listProgressBar[i].bEnable = false;
            }
    }

    RemoveCard(index)
    {
        for ( let i in this.listHandCard )
        {
            if ( this.listHandCard[i].index == index )
            {
                this.listHandCard.splice(i, 1);
                return;
            }
        }
    }

    Betting(iCoin, iMyCoin)
    {
        this.UpdateMyCoin(iMyCoin);
        //this.ibettingCallCoin += parseInt(iCoin);
    }

    MyTurn(strBetting, listCards)
    {
        // this.UpdateMyCoin(iMyCoin);
        this.SetBettingType(strBetting);
        // this.ibettingCallCoin += parseInt(iCoin);
        console.log(listCards);
        //this.listTableCard = [];
        // for(let i in listCards)
        // {
        //      this.listTableCard.push(listCards[i].index);
        // }
        
        for( let i in this.listProgressBar)
        {
           this.listProgressBar[i].bEnable = false;
           this.listProgressBar[i].UpdateTime(0);
        }

        if ( this.iFxLocation == 0 )
        {
            for ( let i in listCards )
            {
                this.RemoveCard(listCards[i].index);
            }
        }
        else
        {
            this.listHandCard.splice(0, listCards.length);
        }
    }

    SetBettingType(strBettingType)
    {
        this.bEnableRenderBettingType = true;
        //this.iBettingTypeRenderCounter  = 1000;
        this.strLastBetting = strBettingType;

        switch ( strBettingType )
        {
            case 'Submit':
                this.iBettingType = 0;
                break;
            case 'Pass':
                this.iBettingType = 1;
                break;
        }
    }

    AddHandCard(iCard, strdeckcode)
    {
        console.log(`################################################################# AddHandCard ${iCard}`);

        let index = this.iNumCards;

        const iOffset = this.iFxLocation == 0 ? 50 : 20;

        let tx = 0;
        let ty = 0;
        let fAngle = 0;

        if ( this.iFxLocation == 0 )
        {
            tx = this.x + 150 + (index*iOffset);
            ty = this.y;
        }
        else if(this.iFxLocation == 1)
        {
            tx = this.x + 150;
            ty = this.y - 60 + (index*iOffset);
            fAngle = 90;
        }
        else if ( this.iFxLocation == 2 )
        {
            tx = this.x - 90 + (index*iOffset);
            ty = this.y + 30;
        }
        else if(this.iFxLocation == 3)
        {
            tx = this.x - 95;
            ty = this.y - 110 + (index*iOffset);
            fAngle = 270;
        }
        
        console.log(`cDealerLocation.x : ${cDealerLocation.x}, cDealerLocation.y : ${cDealerLocation.y}`);
        let dealer = new ICardDealer(cDealerLocation.x, cDealerLocation.y, tx, ty, this.m_fHR, this.m_fVR, this.kTimer, 80, 110, iCard, strdeckcode, fAngle);
        this.listCardDealer.push(dealer);

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
            //if (listWinCards[j] == this.listHandCard[i]) this.listWinCards[i] = true;
            if (listWinCards[j] == this.listHandCard[i].index) this.listWinCards[i] = true;
            }
        }
        console.log(this.listWinCards);
        }
}