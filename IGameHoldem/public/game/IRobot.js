export default class IRobot{

    constructor(account, iLocation)
    {
        this.socket = io('/game');
        this.account = account;
        this.iLocation = iLocation;
        this.bConnected = false;
        this.iElapsedTime = 0;
        this.bEnableBetting = false;
        this.iCallAmount = 0;
    }

    Update()
    {
        console.log('Update');

        this.iElapsedTime ++;
        if ( this.bConnected == false && this.iElapsedTime > 3 )
        {
            this.socket.emit('CM_JoinGame', this.account.strID, this.account.lUnique, this.account.iCoin, this.account.iAvatar, this.account.strOptionCode, this.account.strGroupID, this.account.iClass);
            this.bConnected = true;
        }

        if ( this.bEnableBetting == true && this.iElapsedTime > 2 )
        {
            let objectBetting = {strBetting:'Call', iAmount:this.iCallAmount};
            this.socket.emit('CM_Betting', objectBetting);
            this.bEnableBetting = false;
        }
    }

    OnIO()
    {
        this.socket.on('SM_RequestLogin', (data) => {

            //let account = {strID:'bbb', strPassword:'1111', iAvatar:5};

            console.log(`SM_RequestLogin`);
            this.socket.emit('CM_Login', this.account.strID, this.account.strPassword, this.account.iAvatar);
        });

        // 840114
        // socket.e

        this.socket.on('SM_Login', (data) => {

        console.log(`SM_Login`);
            console.log(data);
            this.socket.strID = data.strID;
            this.socket.iCoin = data.iCoin;
            this.socket.iAvatar = data.iAvatar;
        });

        this.socket.on('SM_EnterGame', (data) => {

            console.log('SM_EnterGame');
            console.log(data);

            this.socket.strID = data.strID;
            this.socket.iCoin = data.iCoin;
            this.socket.iPoint = data.iPoint;

            // this.Game.UpdateGameInfo(data.strGameName, data.iBlind);
            // this.Game.UpdatePoint(parseInt(data.iCoin));

            this.socket.emit('CM_SelectLocation', this.iLocation);
        });

        this.socket.on('SM_LeaveGame', (data) => {

            console.log('SM_LeaveGame');
            console.log(data);

            if ( data.result == 'OK' )
            {
                // this.Game.Initialize();
            }
        });

        this.socket.on('SM_JoinUser', (user) => {

        });

        this.socket.on('SM_JoinGame', (listPlayers, iMaxPlayer) => {

            console.log(`SM_JoinGame`);
            console.log(listPlayers);

            // this.Game.SetMaxPlayer(iMaxPlayer);
            // this.Game.ProcessLocation(listPlayers);
        });

        //  Game
        this.socket.on('SM_SelectLocation', (objectData) => {

            console.log(`SM_SelectLocation ${objectData.eResult}, ${objectData.iLocation}`);
            console.log(objectData);

            // if ( true == objectData.eResult )
            // {
            //     this.Game.ProcessLocationComplete(socket.strID, objectData.iCoin, objectData.iLocation, objectData.iAvatar);
            //     this.Game.UpdatePoint(parseInt(objectData.iPoint));
            // }
        });

        this.socket.on('SM_BroadcastJoinUser', (objectPlayer) => {

            console.log(`SM_BroadcastJoinUser`);
            console.log(objectPlayer);
        });

        this.socket.on('SM_BroadcastLeaveUser', (objectPlayer) => {

            console.log(`SM_BroadcastLeaveUser`);
            console.log(objectPlayer);

            // this.Game.RemoveUser(objectPlayer);
        });

        this.socket.on('SM_BroadcastPlaceUser', (objectPlayer) => {

            console.log(`SM_BroadcastPlaceUser`);
            console.log(objectPlayer);

            //this.Game.ProcessLocationSingle(objectPlayer);
        });

        this.socket.on('SM_EnableStartGame', () => {

            console.log(`SM_EnableStartGame`);

            //this.Game.listButtons[0].bEnable = true;
        });

        this.socket.on('SM_StartGame', (objectData) => {

            console.log(`SM_StartGame : eResult : ${objectData.eResult}`);
            console.log(objectData.listUser);
            // this.Game.EnableUserList(objectData.listUser);
            // this.Game.StartGame();
        })

        this.socket.on('SM_FullBroadcastPlayerType', (listData) => {

            console.log(`SM_FullBroadcastPlayerType`);
            console.log(listData);

            // this.Game.SetPlayerType(listData);
        });

        this.socket.on('SM_DefaultAnteSB', (objectData) => {

            console.log(`SM_DefaultAnteSB`);
            console.log(objectData);

            this.socket.emit('CM_DefaultAnteSB', objectData.iCoin);

            // this.Game.SetPlayerBetting(objectData.strID, objectData.iCoin, objectData.iBettingCoin, '');
            // this.Game.UpdateTotalBettingCoin(objectData.iTotalBettingCoin);
        });

        this.socket.on('SM_BroadcastDefaultAnteSB', (objectData) => {

            console.log(`SM_BroadcastDefaultAnteSB`);
            console.log(objectData);

            // this.Game.SetPlayerBetting(objectData.strID, objectData.iCoin, objectData.iBettingCoin, '');
            // this.Game.UpdateTotalBettingCoin(objectData.iTotalBettingCoin);
        });

        this.socket.on('SM_DefaultAnteBB', (objectData) => {

            console.log(`SM_DefaultAnteBB`);
            console.log(objectData);

            this.socket.emit('CM_DefaultAnteBB', objectData.iCoin);

            // this.Game.SetPlayerBetting(objectData.strID, objectData.iCoin, objectData.iBettingCoin, '');
            // this.Game.UpdateTotalBettingCoin(objectData.iTotalBettingCoin);
        });

        this.socket.on('SM_BroadcastDefaultAnteBB', (objectData) => {

            console.log(`SM_BroadcastDefaultAnteBB`);
            console.log(objectData);

            // this.Game.SetPlayerBetting(objectData.strID, objectData.iCoin, objectData.iBettingCoin, '');
            // this.Game.UpdateTotalBettingCoin(objectData.iTotalBettingCoin);
        });

        this.socket.on('SM_EnableBetting', (objectData) => {

            console.log(`SM_EnableBetting : Call ${objectData.iCallAmount}`);
            console.log(objectData.listEnableBettingType);

            // let objectBetting = {strBetting:'Call', iAmount:objectData.iCallAmount};
            // this.socket.emit('CM_Betting', objectBetting);

            this.bEnableBetting = true;
            this.iElapsedTime = 0;
            this.iCallAmount = objectData.iCallAmount;

        });

        this.socket.on('SM_Focus', (objectPlayer) => {

            console.log(`SM_Focus : ${objectPlayer.strID}`);
            // this.Game.Focus(objectPlayer.strID, objectPlayer.iBettingTime);
        });

        this.socket.on('SM_Mode', (objectData) => {

            console.log(`SM_Mode : ${objectData.eMode}`);

            // switch ( objectData.eMode )
            // {
            // case 'Standby':
            //     this.Game.Initialize();
            //     break;
            // }
        });

        this.socket.on('SM_FullBroadcastBetting', (objectData) => {

            console.log(`SM_FullBroadcastBetting`);
            console.log(objectData);

            // this.Game.SetPlayerBetting(objectData.strID, objectData.iCoin, objectData.iBettingCoin, objectData.strBetting);
            // this.Game.UpdateTotalBettingCoin(objectData.iTotalBettingCoin);
        });

        this.socket.on('SM_HandCard', (listCard, strHand, listPots) => {

            console.log(`SM_HandCard`);
            console.log(listCard);
            console.log(strHand);
            console.log(listPots);

            // this.Game.SetHandCard(listCard, strHand);
            // this.Game.UpdatePot(listPots);
        });

        this.socket.on('SM_FlopCard', (listCard, strHand, listPots) => {

            console.log(`SM_FlopCard`);
            console.log(listCard);
            console.log(strHand);

            // this.Game.SetFlopCard(listCard, strHand);
            // this.Game.UpdatePot(listPots);
        });

        this.socket.on('SM_TurnCard', (listCard, strHand, listPots) => {

            console.log(`SM_TurnCard`);
            console.log(listCard);
            console.log(strHand);

            // this.Game.SetTurnCard(listCard, strHand);
            // this.Game.UpdatePot(listPots);
        });

        this.socket.on('SM_RiverCard', (listCard, strHand, listPots) => {

        console.log(`SM_RiverCard`);
            console.log(listCard);
            console.log(strHand);

            // this.Game.SetRiverCard(listCard, strHand);
            // this.Game.UpdatePot(listPots);
        });

        this.socket.on('SM_Result', (listResult, listWinCards, strWinnerHand, strWinnerDescr, cPlayingUser, listPots) => {

            console.log(`SM_Result`);
            console.log(listResult);
            console.log(listWinCards);
            console.log(strWinnerHand);

            // this.Game.ProcessResult(listResult, listWinCards, strWinnerHand, strWinnerDescr, cPlayingUser);
            // this.Game.UpdatePot(listPots);
        });

        this.socket.on('SM_RebuyIn', (listObject) => {

            console.log(`SM_RebuyIn`);
            console.log(listObject);

            // this.Game.ProcessRebuyIn(listObject);
        });

        this.socket.on('SM_ShowDown',(listData) => {

            console.log(`SM_ShowDown`);
            this.Game.ProcessShowDown();
        });

        this.socket.on('SM_ShowDownTurnCard',(listData) => {

            console.log(`SM_ShowDownTurnCard`);
            console.log(listData);

            // this.Game.ProcessShowDownTurnCard(listData);
        });

        this.socket.on('SM_Error', (objectError) => {

            console.log(`SM_Error`);
            console.log(objectError);
        });
    }
}