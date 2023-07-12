function IsMobile()
{
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

let OnClickLeave = (game) => {

    // game.socket.emit('CM_LeaveGame');

    soundClick.play();
}

let OnClickGameStart = (game) => {

    game.listButtons[0].bEnable = false;

    game.socket.emit('CM_StartGame');

    soundClick.play();
}

let OnClickGameChat = (game) => {

    if (game.bEnableChat == false) {
        $('#chatting').show();
        $('#game_log').hide();
        game.bEnableChat = true;

        soundClick.play();
    }
}

let OnClickGamelog = (game) => {

    if (game.bEnableChat == false) {
        $('#chatting').hide();
        $('#game_log').show();
        game.bEnableChat = true;

        soundClick.play();
    }
}

let OnClickSettingOnGame = (game) => {
    
}

let OnClickLocation1 = (game) => {

    game.socket.emit('CM_SelectLocation', 0);

    soundClick.play();
}

let OnClickLocation2 = (game) => {
    
    game.socket.emit('CM_SelectLocation', 1);

    soundClick.play();
}

let OnClickLocation3 = (game) => {
    
    game.socket.emit('CM_SelectLocation', 2);

    soundClick.play();
}

let OnClickLocation4 = (game) => {
    
    game.socket.emit('CM_SelectLocation', 3);

    soundClick.play();
}

let OnClickLocation5 = (game) => {
    
    game.socket.emit('CM_SelectLocation', 4);

    soundClick.play();
}

let OnClickLocation6 = (game) => {
    
    game.socket.emit('CM_SelectLocation', 5);

    soundClick.play();
}

let OnClickLocation7 = (game) => {
    
    game.socket.emit('CM_SelectLocation', 6);

    soundClick.play();
}

let OnClickLocation8 = (game) => {
    
    game.socket.emit('CM_SelectLocation', 7);

    soundClick.play();
}

let OnClickLocation9 = (game) => {
    
    game.socket.emit('CM_SelectLocation', 8);

    soundClick.play();
}

//  Betting
// let OnClickQuater = (game) => {

//     console.log(`##### Call ${game.iCallCoin}, Total : ${game.iTotalBettingCoin}`);

//     let iAmount = game.iCallCoin + ((game.iCallCoin + game.iTotalBettingCoin) / 4);

//     let player = game.FindUser(game.socket.strID);

//     let objectBetting = {strBetting:'Quater', iAmount:iAmount};

//     console.log(`OnClickQuater : ${player.strID}, coin : ${player.iGameCoin}`);
//     if ( player != null )
//     {
//         console.log(`Found`);
//         if ( player.iGameCoin < iAmount )
//         {
//             console.log(`player : ${player.iCoin}, raise : ${iAmount}`);
//             objectBetting.iAmount = player.iGameCoin;
//             objectBetting.strBetting = 'Allin';
//         }        
//     }

//     game.socket.emit('CM_Betting', objectBetting);

//     game.bEnableBetting = false;
// }

let OnClickQuater = (game) => {

    console.log(`##### Call ${game.iCallCoin}, Total : ${game.iTotalBettingCoin}`);
    let player = game.FindUser(game.socket.strID);
    let iAmount = Math.floor(game.iCallCoin+((game.iCallCoin + game.iTotalBettingCoin) / 4));
    console.log(`##### Quater iAmount ${iAmount} player.iGameCoin : ${player.iGameCoin}`);
    if(player.iGameCoin < iAmount) iAmount = player.iGameCoin;
    game.SetRaiseButton();
    game.CheckBettingCoin(iAmount);
    //  Test
    
    if ( null != player )
    {
        let iValue = player.iGameCoin-game.iCallCoin;
        if ( iValue > 0 )
        {
            let delta = iAmount / iValue;

            game.slider[0].iCurrentLocation = Math.floor(delta*game.slider[0].iCurrentLocationMax);
            if ( game.slider[0].iCurrentLocation > game.slider[0].iCurrentLocationMax )
                game.slider[0].iCurrentLocation = game.slider[0].iCurrentLocationMax;

            game.slider[0].UpdateCurrentLocation();
        }        
    }    

    // let player = game.FindUser(game.socket.strID);

    // let objectBetting = {strBetting:'Quater', iAmount:iAmount};

    // console.log(`OnClickQuater : ${player.strID}, coin : ${player.iGameCoin}`);
    // if ( player != null )
    // {
    //     console.log(`Found`);
    //     if ( player.iGameCoin < iAmount )
    //     {
    //         console.log(`player : ${player.iCoin}, raise : ${iAmount}`);
    //         objectBetting.iAmount = player.iGameCoin;
    //         objectBetting.strBetting = 'Allin';
    //     }        
    // }

    // game.socket.emit('CM_Betting', objectBetting);

    // game.bEnableBetting = false;

    soundClick.play();
}

let OnClickHalf = (game) => {

    // let iAmount = (game.iCallCoin + (game.iCallCoin + game.iTotalBettingCoin)) / 2;

    // let objectBetting = {strBetting:'Half', iAmount:iAmount};

    // game.socket.emit('CM_Betting', objectBetting);

    // game.bEnableBetting = false;
    console.log(`##### Call ${game.iCallCoin}, Total : ${game.iTotalBettingCoin}`);
    let player = game.FindUser(game.socket.strID);
    let iAmount = Math.floor(game.iCallCoin+((game.iCallCoin + game.iTotalBettingCoin) / 2));

    console.log(`##### Half iAmount ${iAmount} player.iGameCoin : ${player.iGameCoin}`);
    if(player.iGameCoin < iAmount) iAmount = player.iGameCoin;
    game.SetRaiseButton();
    game.CheckBettingCoin(iAmount);
    //
    //  Test
    
    if ( null != player )
    {
        let iValue = player.iGameCoin-game.iCallCoin;
        if ( iValue > 0 )
        {
            let delta = iAmount / iValue;

            game.slider[0].iCurrentLocation = Math.floor(delta*game.slider[0].iCurrentLocationMax);
            if ( game.slider[0].iCurrentLocation > game.slider[0].iCurrentLocationMax )
                game.slider[0].iCurrentLocation = game.slider[0].iCurrentLocationMax;

            game.slider[0].UpdateCurrentLocation();
        }        
    }

    soundClick.play();
}

let OnClickFull = (game) => {

    // let iAmount = (game.iCallCoin + (game.iCallCoin + game.iTotalBettingCoin));

    // let objectBetting = {strBetting:'Full', iAmount:iAmount};

    // game.socket.emit('CM_Betting', objectBetting);

    // game.bEnableBetting = false;
    console.log(`##### Call ${game.iCallCoin}, Total : ${game.iTotalBettingCoin}`);
    let player = game.FindUser(game.socket.strID);
    let iAmount = Math.floor(game.iCallCoin+(game.iCallCoin + game.iTotalBettingCoin));
    if(player.iGameCoin < iAmount) iAmount = player.iGameCoin;
    
    console.log(`##### Full iAmount ${iAmount} player.icoin : ${player.iGameCoin}`);
    
    game.SetRaiseButton();
    game.CheckBettingCoin(iAmount);
    //
    //  Test
    if ( null != player )
    {
        let iValue = player.iGameCoin-game.iCallCoin;
        if ( iValue > 0 )
        {
            let delta = iAmount / iValue;

            game.slider[0].iCurrentLocation = Math.floor(delta*game.slider[0].iCurrentLocationMax);
            if ( game.slider[0].iCurrentLocation > game.slider[0].iCurrentLocationMax )
                game.slider[0].iCurrentLocation = game.slider[0].iCurrentLocationMax;

            game.slider[0].UpdateCurrentLocation();
        }        
    }
    soundClick.play();
}

let OnClickAllin = (game) => {

    // console.log(`Allin : ${game.socket.strID}`);

    // let player = game.FindUser(game.socket.strID);

    // console.log(`${player.strID}`);
    // console.log(player);

    // let objectBetting = {strBetting:'Allin', iAmount:player.iGameCoin};

    // game.socket.emit('CM_Betting', objectBetting);

    // game.bEnableBetting = false;
}

let OnClickCall = (game) => {

    let iAmount = game.iCallCoin;

    //let objectBetting = {strBetting:'Call', iAmount:iAmount};

    let player = game.FindUser(game.socket.strID);

    let objectBetting = {strBetting:'Call', iAmount:iAmount};

    console.log(`OnClickCall : ${player.strID}, coin : ${player.iGameCoin}`);
    if ( player != null )
    {
        console.log(`Found`);
        if ( player.iGameCoin < iAmount )
        {
            console.log(`player : ${player.iCoin}, raise : ${iAmount}`);
            objectBetting.iAmount = player.iGameCoin;
            objectBetting.strBetting = 'Allin';
        }        
    }

    game.socket.emit('CM_Betting', objectBetting);

    game.bEnableBetting = false;

    soundClick.play();

    game.kMainUser.iAutoFoldCounter = 0;
}

let OnClickFold = (game) => {

    let objectBetting = {strBetting:'Fold', iAmount:0};

    game.socket.emit('CM_Betting', objectBetting);

    game.bEnableBetting = false;

    soundClick.play();

    //game.kMainUser.iAutoFoldCounter = 0;
}

let OnClickCheck = (game) => {

    let objectBetting = {strBetting:'Check', iAmount:0};

    game.socket.emit('CM_Betting', objectBetting);

    game.bEnableBetting = false;

    soundClick.play();

    game.kMainUser.iAutoFoldCounter = 0;
}

let OnClickRaise = (game) => {

    // let objectBetting = {strBetting:'Raise', iAmount:0};

    // game.socket.emit('CM_Betting', objectBetting);

    // game.bEnableBetting = false;
    let iAmount =  game.listLabels[2].strCaption;
    console.log(`raise click : ${iAmount}`);
    game.bRaiseButton = false;
    game.bMobileRaiseButton = false;
    if ( iAmount == 0 )
        return;
    
    let player = game.FindUser(game.socket.strID);

    let objectBetting = {strBetting:'Raise', iAmount:iAmount};

    console.log(`OnClickQuater : ${player.strID}, coin : ${player.iGameCoin}`);
    if ( player != null )
    {
        console.log(`Found`);
        if ( player.iGameCoin < iAmount )
        {
            console.log(`player : ${player.iCoin}, raise : ${iAmount}`);
            objectBetting.iAmount = player.iGameCoin;
            objectBetting.strBetting = 'Allin';
        }
        else
        {
            // let iQuater = game.iCallCoin + ((game.iCallCoin + game.iTotalBettingCoin)/4);
            // let iHalf = game.iCallCoin + ((game.iCallCoin + game.iTotalBettingCoin)/2);
            // let iFull = game.iCallCoin + ((game.iCallCoin + game.iTotalBettingCoin));
            // if ( iAmount == iQuater )
            //     objectBetting.strBetting = 'Quater';
            // else if ( iAmount == iHalf )
            //     objectBetting.strBetting = 'Half';
            // else if ( iAmount == iFull )
            //     objectBetting.strBetting = 'Full';
        }
    }

    game.socket.emit('CM_Betting', objectBetting);

    game.bEnableBetting = false;

    soundClick.play();

    game.kMainUser.iAutoFoldCounter = 0;
}
let OnClickMobileQuater = (game) => {

    console.log(`##### Call ${game.iCallCoin}, Total : ${game.iTotalBettingCoin}`);
    let player = game.FindUser(game.socket.strID);
    let iAmount = Math.floor(game.iCallCoin+((game.iCallCoin + game.iTotalBettingCoin) / 4));
    console.log(`##### Quater iAmount ${iAmount} player.iGameCoin : ${player.iGameCoin}`);
    if(player.iGameCoin < iAmount) iAmount = player.iGameCoin;
    //game.SetRaiseButton();
    game.SetMobileRaiseButton();
    game.CheckBettingCoin(iAmount);
    //  Test
    
    if ( null != player )
    {
        let iValue = player.iGameCoin-game.iCallCoin;
        if ( iValue > 0 )
        {
            let delta = iAmount / iValue;

            game.slider[0].iCurrentLocation = Math.floor(delta*game.slider[0].iCurrentLocationMax);
            if ( game.slider[0].iCurrentLocation > game.slider[0].iCurrentLocationMax )
                game.slider[0].iCurrentLocation = game.slider[0].iCurrentLocationMax;

            game.slider[0].UpdateCurrentLocation();
        }        
    }    

    // let player = game.FindUser(game.socket.strID);

    // let objectBetting = {strBetting:'Quater', iAmount:iAmount};

    // console.log(`OnClickQuater : ${player.strID}, coin : ${player.iGameCoin}`);
    // if ( player != null )
    // {
    //     console.log(`Found`);
    //     if ( player.iGameCoin < iAmount )
    //     {
    //         console.log(`player : ${player.iCoin}, raise : ${iAmount}`);
    //         objectBetting.iAmount = player.iGameCoin;
    //         objectBetting.strBetting = 'Allin';
    //     }        
    // }

    // game.socket.emit('CM_Betting', objectBetting);

    // game.bEnableBetting = false;

    soundClick.play();
}

let OnClickMobileHalf = (game) => {

    // let iAmount = (game.iCallCoin + (game.iCallCoin + game.iTotalBettingCoin)) / 2;

    // let objectBetting = {strBetting:'Half', iAmount:iAmount};

    // game.socket.emit('CM_Betting', objectBetting);

    // game.bEnableBetting = false;
    console.log(`##### Call ${game.iCallCoin}, Total : ${game.iTotalBettingCoin}`);
    let player = game.FindUser(game.socket.strID);
    let iAmount = Math.floor(game.iCallCoin+((game.iCallCoin + game.iTotalBettingCoin) / 2));

    console.log(`##### Half iAmount ${iAmount} player.iGameCoin : ${player.iGameCoin}`);
    if(player.iGameCoin < iAmount) iAmount = player.iGameCoin;
    //game.SetRaiseButton();
    game.SetMobileRaiseButton();
    game.CheckBettingCoin(iAmount);
    //
    //  Test
    
    if ( null != player )
    {
        let iValue = player.iGameCoin-game.iCallCoin;
        if ( iValue > 0 )
        {
            let delta = iAmount / iValue;

            game.slider[0].iCurrentLocation = Math.floor(delta*game.slider[0].iCurrentLocationMax);
            if ( game.slider[0].iCurrentLocation > game.slider[0].iCurrentLocationMax )
                game.slider[0].iCurrentLocation = game.slider[0].iCurrentLocationMax;

            game.slider[0].UpdateCurrentLocation();
        }        
    }

    soundClick.play();
}

let OnClickMobileFull = (game) => {

    // let iAmount = (game.iCallCoin + (game.iCallCoin + game.iTotalBettingCoin));

    // let objectBetting = {strBetting:'Full', iAmount:iAmount};

    // game.socket.emit('CM_Betting', objectBetting);

    // game.bEnableBetting = false;
    console.log(`##### Call ${game.iCallCoin}, Total : ${game.iTotalBettingCoin}`);
    let player = game.FindUser(game.socket.strID);
    let iAmount = Math.floor(game.iCallCoin+(game.iCallCoin + game.iTotalBettingCoin));
    if(player.iGameCoin < iAmount) iAmount = player.iGameCoin;
    
    console.log(`##### Full iAmount ${iAmount} player.icoin : ${player.iGameCoin}`);
    
    //game.SetRaiseButton();
    game.SetMobileRaiseButton();
    game.CheckBettingCoin(iAmount);
    //
    //  Test
    if ( null != player )
    {
        let iValue = player.iGameCoin-game.iCallCoin;
        if ( iValue > 0 )
        {
            let delta = iAmount / iValue;

            game.slider[0].iCurrentLocation = Math.floor(delta*game.slider[0].iCurrentLocationMax);
            if ( game.slider[0].iCurrentLocation > game.slider[0].iCurrentLocationMax )
                game.slider[0].iCurrentLocation = game.slider[0].iCurrentLocationMax;

            game.slider[0].UpdateCurrentLocation();
        }        
    }
    soundClick.play();
}

let OnClickMobileCall = (game) => {

    let iAmount = game.iCallCoin;

    //let objectBetting = {strBetting:'Call', iAmount:iAmount};

    let player = game.FindUser(game.socket.strID);

    let objectBetting = {strBetting:'Call', iAmount:iAmount};

    console.log(`OnClickCall : ${player.strID}, coin : ${player.iGameCoin}`);
    if ( player != null )
    {
        console.log(`Found`);
        if ( player.iGameCoin < iAmount )
        {
            console.log(`player : ${player.iCoin}, raise : ${iAmount}`);
            objectBetting.iAmount = player.iGameCoin;
            objectBetting.strBetting = 'Allin';
        }        
    }

    game.socket.emit('CM_Betting', objectBetting);

    game.bEnableBetting = false;
    game.bMobileRaiseButton = false;
    game.bRaiseButton = false;

    soundClick.play();

    game.kMainUser.iAutoFoldCounter = 0;
}

let OnClickMobileFold = (game) => {

    let objectBetting = {strBetting:'Fold', iAmount:0};

    game.socket.emit('CM_Betting', objectBetting);

    game.bEnableBetting = false;
    game.bMobileRaiseButton = false;
    game.bRaiseButton = false;

    soundClick.play();

    //game.kMainUser.iAutoFoldCounter = 0;
}

let OnClickMobileCheck = (game) => {

    let objectBetting = {strBetting:'Check', iAmount:0};

    game.socket.emit('CM_Betting', objectBetting);

    game.bEnableBetting = false;
    game.bMobileRaiseButton = false;
    game.bRaiseButton = false;

    soundClick.play();

    game.kMainUser.iAutoFoldCounter = 0;
}

let OnclickMobileRaise = (game) => {
    if(game.bMobileRaiseButton == true)
    {
        let iAmount =  game.listLabels[2].strCaption;
        console.log(`raise click : ${iAmount}`);
        game.bRaiseButton = false;
        game.bMobileRaiseButton = false;
        if ( iAmount == 0 )
            return;
        
        let player = game.FindUser(game.socket.strID);

        let objectBetting = {strBetting:'Raise', iAmount:iAmount};

        console.log(`OnClickQuater : ${player.strID}, coin : ${player.iGameCoin}`);
        if ( player != null )
        {
            console.log(`Found`);
            if ( player.iGameCoin < iAmount )
            {
                console.log(`player : ${player.iCoin}, raise : ${iAmount}`);
                objectBetting.iAmount = player.iGameCoin;
                objectBetting.strBetting = 'Allin';
            }
            else
            {
                // let iQuater = game.iCallCoin + ((game.iCallCoin + game.iTotalBettingCoin)/4);
                // let iHalf = game.iCallCoin + ((game.iCallCoin + game.iTotalBettingCoin)/2);
                // let iFull = game.iCallCoin + ((game.iCallCoin + game.iTotalBettingCoin));
                // if ( iAmount == iQuater )
                //     objectBetting.strBetting = 'Quater';
                // else if ( iAmount == iHalf )
                //     objectBetting.strBetting = 'Half';
                // else if ( iAmount == iFull )
                //     objectBetting.strBetting = 'Full';
            }
        }

        game.socket.emit('CM_Betting', objectBetting);

        game.bEnableBetting = false;

        soundClick.play();

        game.kMainUser.iAutoFoldCounter = 0;
    }
    else
    {
        game.SetMobileRaiseButton();
    }
}


let OnClickPlus = (game) => {
    
}

let OnClickMinus = (game) => {
    
}