let ISocketList = require('./ISocketList');
let E = require('./IEnum');

let db = require('../db');

let big2solver = require('./IBig2Solver');

class IGame
{
    //constructor(strGameName, iDefaultCoin)
    constructor(strGameName, eGameType, strPassword, iDefaultCoin, iBettingTime, iMaxPlayers)
    {
        this.listUsers = new ISocketList();
        this.strGameName = strGameName;
        this.eGameType = eGameType;
        this.strPassword = strPassword;//New
        this.iDefaultCoin = iDefaultCoin;
        //this.iBuyIn = iBuyIn;//New
        this.iBettingTime = iBettingTime;//New
        this.eGameMode = E.EGameMode.Standby;
        this.iElapsedTime = 0;
        this.lUnique = Math.floor(Math.random()*100000);

        this.cMinEnablePlayer   = 2;
        //this.cMaxPlayer = 9;
        this.cMaxPlayer = iMaxPlayers;//New
        this.iDealerIndex = -1;
        this.iBettingLocationLast = -1;
        this.iDealerLocationLast = -1;
        
        this.iRecentPlayersBettingCoin = 0;
        this.iTotalBettingCoin = 0;

        this.listCardDeck = [];
        this.iCurrentDeckIndex = 0;
        this.listTableCard = [];

        this.listEnableBettingType = [];

        this.listPots = [];

        this.listWinCards = [];

        this.listDBUpdate = [];

        this.listReservationMode = [];
        this.iDelayTime = 0;

        this.bNewGame = true;
        this.bSetGame = false;
        this.bBetting = false;
        this.iPasscount = 0;
    }

    async GetOdds(strID)
    {
        const [list] = await db.sequelize.query(
        `SELECT  t1.fHoldemR AS fAdminR,
        t1.strID as strAdminID,
        t2.fHoldemR AS fPAdminR,
        t2.strID as strPAdminID,
        t3.fHoldemR AS fVAdminR,
        t3.strID as strVAdminID,
        t4.fHoldemR AS fAgentR,
        t4.strID as strAgentID,
        t5.fHoldemR AS fShopR,
        t5.strID as strShopID,
        t6.fHoldemR AS fUserR,
        t6.strID as strUserID

        FROM Users AS t1
        LEFT JOIN Users AS t2 ON t2.iParentID = t1.id
        LEFT JOIN Users AS t3 ON t3.iParentID = t2.id
        LEFT JOIN Users AS t4 ON t4.iParentID = t3.id
        LEFT JOIN Users AS t5 ON t5.iParentID = t4.id
        LEFT JOIN Users AS t6 ON t6.iParentID = t5.id
        WHERE t6.strID='${strID}';`);

        let object = {fAdmin:0, fPAdmin:0, fVAdmin:0, fAgent:0, fShop:0, fUser:0,strAdminID:'', strPAdminID:'', strVAdminID:'', strAgentID:'', strShopID:'', strUserID:strID};
        if ( list.length > 0 )
        {
            object = {
                fAdmin:list[0].fAdminR-list[0].fPAdminR, 
                fPAdmin:list[0].fPAdminR-list[0].fVAdminR, 
                fVAdmin:list[0].fVAdminR-list[0].fAgentR, 
                fAgent:list[0].fAgentR-list[0].fShopR, 
                fShop:list[0].fShopR, 
                fUser:list[0].fUserR,
                strAdminID:list[0].strAdminID,
                strPAdminID:list[0].strPAdminID,
                strVAdminID:list[0].strVAdminID,
                strAgentID:list[0].strAgentID,
                strShopID:list[0].strShopID,
            };
        }
        return object;
    }

    async UpdateDB()
    {
        //for ( let i in this.listDBUpdate )
        for ( let i = 0; this.listDBUpdate.length; ++ i )
        {
            const element = this.listDBUpdate[i];
            switch ( element.iDB )
            {
            case E.EDBType.Users:
                switch ( element.iSubDB )
                {
                case E.EUserDBType.UpdatePoint:
                    await db.Users.update({iCash:element.iCash}, {where:{strID:element.strID}});
                    this.listDBUpdate.splice(i, 1);
                    -- i;
                    break;
                }
                break;
            case E.EDBType.RecordBets:
                switch ( element.iSubDB )
                {
                case E.ERecordBetDBType.Create:
                    {
                        let odds = await this.GetOdds(element.strID);

                        const cRollingPAdmin = parseInt(odds.fPAdmin*element.iAmount*0.01);
                        const cRollingVAdmin = parseInt(odds.fVAdmin*element.iAmount*0.01);
                        const cRollingAgent = parseInt(odds.fAgent*element.iAmount*0.01);
                        const cRollingShop = parseInt(odds.fShop*element.iAmount*0.01);

                        // await db.RecordBets.create({
                        //     strID:element.strID,
                        //     iClass:element.iClass,
                        //     strGroupID:element.strGroupID,
                        //     iAmount:element.iAmount,
                        //     strBet:element.strBetting,
                        //     iRollingAdmin:parseInt(odds.fAdmin*element.iAmount*0.01),
                        //     iRollingPAdmin:parseInt(odds.fPAdmin*element.iAmount*0.01),
                        //     iRollingVAdmin:parseInt(odds.fVAdmin*element.iAmount*0.01),
                        //     iRollingAgent:parseInt(odds.fAgent*element.iAmount*0.01),
                        //     iRollingShop:parseInt(odds.fShop*element.iAmount*0.01),
                        // });

                        await db.RecordBets.create({
                            strID:element.strID,
                            iClass:element.iClass,
                            strGroupID:element.strGroupID,
                            iAmount:element.iAmount,
                            strBet:element.strBetting,
                            iRollingAdmin:parseInt(odds.fAdmin*element.iAmount*0.01),
                            iRollingPAdmin:cRollingShop,
                            iRollingVAdmin:cRollingVAdmin,
                            iRollingAgent:cRollingAgent,
                            iRollingShop:cRollingShop,
                        });

                        console.log(`########## Calculate Rolling`);
                        console.log(odds);

                        await db.Users.increment({iRolling:cRollingPAdmin}, {where:{strID:odds.strPAdminID}});
                        await db.Users.increment({iRolling:cRollingVAdmin}, {where:{strID:odds.strVAdminID}});
                        await db.Users.increment({iRolling:cRollingAgent}, {where:{strID:odds.strAgentID}});
                        await db.Users.increment({iRolling:cRollingShop}, {where:{strID:odds.strShopID}});


                        this.listDBUpdate.splice(i, 1);
                        -- i;
                    }
                }
                break;
            case E.EDBType.RecodrdGames:
                switch ( element.iSubDB )
                {
                    case E.ERecordResultBType.Create:
                        await db.ResultHoldems.create({lUnique:element.lUnique, strWinner:element.strWinner, strDesc:element.strDesc, iStartCoin:element.iStartCoin, strHand:element.strHand, strTablecard:element.strTablecard, iJackpot:element.iJackpot});

                        this.listDBUpdate.splice(i, 1);
                        
                        -- i;
                        break;
                }
                break;
            }
        }
    }

    Initialize()
    {
        this.iRecentPlayersBettingCoin = 0;
        this.iTotalBettingCoin = 0;

        this.listCardDeck = [];
        this.iCurrentDeckIndex = 0;
        this.listTableCard = [];
        this.listWinCards = [];

        this.listReservationMode = [];
        this.iDelayTime = 0;
        this.iPasscount

        this.bNewGame = true;
        let player = [];

        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            player = this.listUsers.GetSocket(i);

            //player.iTotalBettingCoin = 0;
            //player.iBettingCoin = 0;
            player.iStartCoin = player.iCoin;
            player.strLastBettingAction = '';
            player.listHandCard = [];
            player.strHand = '';
            //player.iWinCoin = 0;
            player.iRank = 4;
            //player.bSpectator = false;
            player.strDescr = '';
            player.bMenualRebuyin = false;

            player.emit('SM_Mode', {eMode:'Standby'});
        }
        if(this.GetScoreUserCount() > 0)
        {
            this.bSetGame = true;
            if(player.bSpectator == true)
            {
                player.bFold = true;
            }
        }
        else 
        {
            player.bSpectator = false;
        }
    }

    Join(socket)
    {
        console.log(`IGame::Join ${socket.strID}`);

        let listPlayers = [];
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            const user = this.listUsers.GetSocket(i);
            let objectPlayer = {strID:user.strID, iCoin:user.iCoin, iLocation:user.iLocation, iAvatar:user.iAvatar};
            listPlayers.push(objectPlayer);
            socket.iStartCoin = user.iCoin;
            if(i == 1) socket.bNewPlaying = false;
            else socket.bNewPlaying = true;
        }

        socket.eStage = 'GAME';
        socket.lUnique = this.lUnique;
        socket.iLocation = -1;
        socket.iTotalBettingCoin = 0;
        socket.iBettingCoin = 0;
        socket.strLastBettingAction = '';
        socket.listHandCard = [];
        socket.strHand = '';
        socket.strDescr = '';
        socket.iWinCoin = 0;
        socket.iRank = 4;
        socket.bEnable = false;
        socket.bSpectator = true;
        socket.bMenualRebuyin = false;
        socket.iScore = 0;
        socket.bFold = false;
        
        this.AddUser(socket);

        socket.emit('SM_JoinGame', listPlayers , this.cMaxPlayer);

        this.BroadcastJoinUser(socket);
    }

    Leave(socket)
    {
        console.log(`IGame::Leave ${socket.strID}`);

        // socket.eStage = 'LOBBY';
        // socket.lUnique = -1;
        // socket.iLocation = -1;

        console.log(`IGame::Leave ${this.strGameName}, ${socket.strID}`);

        this.BroadcastLeaveUser(socket);

        socket.eStage = 'LOBBY';
        socket.lUnique = -1;
        socket.iLocation = -1;

        //this.listUsers.PrintList(`IGame:${this.strGameName}`);
        return this.RemoveUser(socket);
    }

    GetNumUsers()
    {
        return this.listUsers.GetLength();
    }

    GetEnableUserList()
    {
        let list = [];
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            const player = this.listUsers.GetSocket(i);
            if ( player.iLocation != -1 && player.bEnable == true && player.strLastBettingAction != 'Fold' )
                list.push(player.strID);
        }
        return list;
    }

    GetScoreUserCount()
    {
        let count = 0;
        for ( let i = 0; i < this.listUsers.GetLength(); ++i)
        {
            const player = this.listUsers.GetSocket(i);
            if(player.iScore > 0)
            {
                count++;
            }
        }
        return count;
    }

    GetNumPlacedUser()
    {
        let iNumUsers = 0;
        //for ( let i in this.listUsers )
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            //console.log(this.listUsers.GetSocket(i));
            if ( this.listUsers.GetSocket(i).iLocation != -1 )
                ++ iNumUsers;
        }

        return iNumUsers;
    }

    GetNumPlayingUser()
    {
        console.log(`IGame::GetNumPlayingUser ${this.listUsers.GetLength()}`);

        let iNumUsers = 0;
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            const player = this.listUsers.GetSocket(i);

            console.log(`strID : ${player.strID}, bFold : ${player.bFold}, bEnable : ${player.bEnable}, iLocation : ${player.iLocation}`);

            //if ( this.listUsers.GetSocket(i).iLocation != -1 && this.listUsers.GetSocket(i).strLastBettingAction != 'Fold')
            //if ( this.listUsers.GetSocket(i).iLocation != -1 && this.listUsers.GetSocket(i).strLastBettingAction != 'Fold' && this.listUsers.GetSocket(i).bEnable == true )
            if ( player.iLocation != -1 && player.bFold == false && player.bEnable == true && player.bSpectator == false)
                ++ iNumUsers;
        }
        return iNumUsers;
    }

    //const EnumGameMode = Object.freeze({"Standby":0, "Start":1, "DefaultAnte":2, "BettingPreFlop":3, "Plob":4, "BettingFlop":5, "Turn":6, "BettingTurn":7, "River":8, "RiverBetting":9, "Result":10, "Celebration":11});
    Update()
    {
        ++ this.iElapsedTime;

        switch ( this.eGameMode )
        {
        case E.EGameMode.Standby:
            {
                const cPlayingUser = this.GetNumPlacedUser();
                //console.log(`IGame::Update : Standby : PlayingUsers = ${cPlayingUser}`);

                if ( this.cMinEnablePlayer <= cPlayingUser )
                {
                    this.SetMode(E.EGameMode.Start);

                    this.listUsers.GetSocket(0).emit('SM_EnableStartGame');
                }
            }
            break;
        case E.EGameMode.Start:
            //this.Start();
            break;
        case E.EGameMode.HandCard:
            if ( this.iElapsedTime > E.EGameTime.HandCard )
            {
                this.SetMode(E.EGameMode.BuildPlayerType);
            }
            break;
        case E.EGameMode.BuildPlayerType:
            if ( this.iElapsedTime > E.EGameTime.BuildPlayerType )
            {
                this.SetMode(E.EGameMode.SubmitCard);
            }                
            break;
        case E.EGameMode.SubmitCard:
            if( this.iElapsedTime > E.EGameTime.MyTurn)
            {

            }
            break;
        case E.EGameMode.Result:
            if ( this.iElapsedTime > E.EGameTime.Result )
            {
                this.SetMode(E.EGameMode.Standby);
            }
            break;
        }
    }

    SetMode(eGameMode)
    {
        console.log(`IGame::SetMode ${eGameMode}`);
        switch ( eGameMode )
        {
        case E.EGameMode.Standby:
            this.Initialize();
            break;
        case E.EGameMode.Start:
            this.Start();
            break;
        case E.EGameMode.HandCard:
            this.SetHandCard();
            break;
        case E.EGameMode.BuildPlayerType:
            this.BuildPlayerType();
            break;
        case E.EGameMode.SubmitCard:
            this.StartSubmitCard();
            break;
        case E.EGameMode.Result:
            this.ProcessResult();
            break;
        }
        this.eGameMode = eGameMode;
        this.iElapsedTime = 0;
        console.log(eGameMode);
    }

    Broadcast(socket, strEvent, objectData)
    {
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            if ( this.listUsers.GetSocket(i).strID != socket.strID ) 
            {
                this.listUsers.GetSocket(i).emit(strEvent, objectData);

                console.log(`Event ${strEvent}, strID : ${this.listUsers.GetSocket(i).strID}`);
            }                
        }
    }

    FullBroadcast(strEvent, objectData)
    {
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            this.listUsers.GetSocket(i).emit(strEvent, objectData);
            console.log(objectData);
        }
    }

    BroadcastJoinUser(socket)
    {
        console.log(`BroadcastJoinUser : ${this.listUsers.GetLength()}`);

        let objectPlayer = {strID:socket.strID, iLocation:socket.iLocation};

        this.Broadcast(socket, 'SM_BroadcastJoinUser', objectPlayer);
    }

    BroadcastLeaveUser(socket)
    {
        console.log(`BroadcastLeaveUser : ${this.listUsers.GetLength()}`);

        let objectPlayer = {strID:socket.strID, iLocation:socket.iLocation};

        this.Broadcast(socket, 'SM_BroadcastLeaveUser', objectPlayer);
    }

    BroadcastPlaceUser(socket)
    {
        console.log(`BroadcastPlaceUser`);

        let objectPlayer = {strID:socket.strID, iCoin:socket.iCoin, iLocation:socket.iLocation, iAvatar:socket.iAvatar};

        this.Broadcast(socket, 'SM_BroadcastPlaceUser', objectPlayer);
    }

    FullBroadcastPlayerType()
    {
        let list = [];
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            let player = this.listUsers.GetSocket(i);

            let objectPlayer = {strID:player.strID, strPlayerType:player.strPlayerType};
            list.push(objectPlayer);
        }

        this.FullBroadcast('SM_FullBroadcastPlayerType', list);
        // for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        // {
        //     this.listUsers.GetSocket(i).emit('SM_FullBroadcastPlayerType', list);
        // }
    }

    FullBroadcastPlayerBetting()
    {
        let list = [];
        //this.iTotalBettingCoin = this.listUsers.GetLength()*this.iDefaultCoin;
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            let player = this.listUsers.GetSocket(i);
            const iPlayerCoin = parseInt( player.iCoin - this.iDefaultCoin);

            player.iCoin = iPlayerCoin;
            let objectPlayer = {strID:player.strID, iCoin:player.iCoin ,iBettingCoin:this.iDefaultCoin};
            this.iTotalBettingCoin += parseInt(this.iDefaultCoin);
            console.log(`this.iTotalBettingCoin : ${this.iTotalBettingCoin}, iPlayerCoin : ${iPlayerCoin}`);
            list.push(objectPlayer);
        }

        this.FullBroadcast('SM_FullBroadcastBetting', list);
        // for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        // {
        //     this.listUsers.GetSocket(i).emit('SM_FullBroadcastPlayerType', list);
        // }
    }

    //FullBroadcastSubmit(socket, iCoin, iBettingCoin, strBetting, iTotalBettingCoin)
    FullBroadcastSubmit(socket, strBetting, list, bpass)
    {
        let objectPlayer = {strID:socket.strID, list:list, strBetting:strBetting, bpass:bpass};
        console.log(objectPlayer.list);
        console.log(list);
        this.FullBroadcast('SM_FullBroadcastSubmit', objectPlayer);
    }

    BroadcastFocus(socket, strID)
    {
        let objectPlayer = {strID:strID, iBettingTime:this.iBettingTime};

        this.Broadcast(socket, 'SM_Focus', objectPlayer);
    }

    FullBroadcastFocus(strID)
    {
        let objectPlayer = {strID:strID, iBettingTime:this.iBettingTime};
        
        this.FullBroadcast('SM_Focus', objectPlayer);
    }

    FullBroadcastShowdown()
    {
        let listData = [];
        
        this.FullBroadcast('SM_ShowDown', listData);
    }

    FullBroadcastHandCard()
    {
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            const player = this.listUsers.GetSocket(i);

            if ( player.bEnable == true && player.iLocation != -1 && player.strLastBettingAction != 'Fold' )
            {
                let listCards = this.listUsers.GetSocket(i).listHandCard;

                //this.listUsers.GetSocket(i).emit('SM_HandCard', listCards, objectHand.handname);
                this.listUsers.GetSocket(i).emit('SM_HandCard', listCards, this.listPots);
            }
        }
    }

    FullBroadcastResult()
    {
        let listResult = [];
        // let strWinnerHand = '';
        // let strWinnerDescr = '';
        const cPlayingUser = this.GetNumPlayingUser();
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            const player = this.listUsers.GetSocket(i);
            console.log(`-------------------- result : ${[player.iScore]}`);
            if ( player.iLocation == -1 || player.bEnable == false || player.bFold == true || player.bSpectator == true )
                continue;

            let objectData = {  
                strID:player.strID, 
                iRank:player.iRank,
                iWinCoin:player.iWinCoin,
                iCoin:player.iCoin,
                iAvatar:player.iAvatar,
                iScore:player.iScore,
                listHandCard:player.listHandCard
            };

            listResult.push(objectData);

            // if ( player.iRank == 1 )
            // {
            //     strWinnerHand = player.strHand;
            //     strWinnerDescr = player.strDescr;
            // }
            console.log(objectData);
        }

        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            const player = this.listUsers.GetSocket(i);
            if(player.bFold == false && player.bSpectator == false)
            {
                player.emit('SM_Result', listResult, cPlayingUser);
            }
        }
    }

    FullBroadcastRebuyIn()
    {
        let listObject = [];

        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            let player = this.listUsers.GetSocket(i);
            let iBuyIn = parseInt(player.strOptionCode[1]) * 100;
            const iEnableRebuyIn = player.strOptionCode[0];
            console.log(`FullBroadcastRebuyIn (iBuyIn : ${iBuyIn}): ${player.strID} iCash : ${player.iCash}, Option : ${player.strOptionCode}, iCoin : ${player.iCoin}, bMenualRebuyin : ${player.bMenualRebuyin}`);

            let bQuit = false;

            //if ( player.iCoin <= 0 )
            if ( iEnableRebuyIn == 1 || player.bMenualRebuyin == true)
            {
                const iRebuyInOdds = iBuyIn;
                const cRebuyInAmount = parseInt(this.iDefaultCoin)*iRebuyInOdds;

                console.log(`RebuyIn : ${iEnableRebuyIn}, Odds ${iRebuyInOdds}, Amount : ${cRebuyInAmount}`);

                // 리바인 사용하거나 수동 리바인 눌렀을떄.
                if ( player.iCash >= (cRebuyInAmount-parseInt(player.iCoin)))
                {
                    // player.iCoin = 100000;
                    // player.iCash -= 100000;
                    player.iCash -= (cRebuyInAmount-parseInt(player.iCoin));
                    player.iCoin = cRebuyInAmount;
                }
                else
                {
                    console.log(`Auto Quit : Not Enough Cash On RebuyIn`);
                    //player.emit('SM_Quit', {code:'NotEnoughCash'});
                    bQuit = true;
                }
                // console.log(`Auto Quit`);
                // player.emit('SM_Quit', {code:'NotEnoughCoin'})   
            }
            else if(iEnableRebuyIn == 0 && player.iCoin <= 0)//  리바인 사용 안함
            {
                bQuit = true;
            }
            player.bMenualRebuyin = false;
            let objectData = 
            { 
                strID:player.strID,
                iCoin:player.iCoin,
                iCash:player.iCash,
                bQuit:bQuit,
            };
            listObject.push(objectData);
        }

        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            this.listUsers.GetSocket(i).emit('SM_RebuyIn', listObject);
        }
    }

    AddUser(socket)
    {
        this.listUsers.Add(socket);
        this.PrintRoomUsers();
    }

    RemoveUser(socket)
    {
        this.listUsers.Remove(socket);
        this.PrintRoomUsers();

        return this.listUsers.GetLength();
    }

    SetLocation(socket, iLocation)
    {
        for ( let i = 0; i < this.listUsers.GetLength(); ++i )
        {
            if ( this.listUsers.GetSocket(i).iLocation == iLocation )
                return false;
        }
        socket.iLocation = iLocation;
        socket.bEnable = false;

        this.BroadcastPlaceUser(socket);
        //this.FullBroadcastPlaceUser();

        return true;
    }

    FindPlayer(strID)
    {
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            if ( strID == this.listUsers.GetSocket(i).strID )
                return this.listUsers.GetSocket(i);
        }
        return null;
    }

    FindPlayerNewPlaying()
    {
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            if ( this.listUsers.GetSocket(i).bNewPlaying == true )
                return this.listUsers.GetSocket(i);
        }
        return null;
    }

    FindPlayerInLocation(iLocation)
    {
        console.log(`IGame::FindPlayerInLocation : ${iLocation}`);

        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            console.log(`iLocation ${iLocation}, socket Location : ${this.listUsers.GetSocket(i).iLocation}`);
            if ( iLocation == this.listUsers.GetSocket(i).iLocation )
                return this.listUsers.GetSocket(i);
        }
        return null;
    }

    SortLocationList(list, target)
    {
        for ( let i = 0; i < list.length; ++i )
        {
            if ( list[0] < target )
            {
                let value = list[0];
                list.shift();        
                list.push(value);
            }
        }
    }

    FindNextPlayer(cLocation, cDealerLocation)
    {
        let list = [];
        for ( let i = 0; i < 4; ++ i )
        {
            const cLoc = Math.floor((cLocation+i)%4);
            if ( cLoc != cLocation && cLoc != cDealerLocation )
                list.push(cLoc);
        }
        this.SortLocationList(list, cDealerLocation);
        console.log(`IGame::FindNextPlayer cLocation : ${cLocation}, cDealerLocation : ${cDealerLocation}`);
        console.log(list);

        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
            console.log(`Player Location ${this.listUsers.GetSocket(i).strID}, ${this.listUsers.GetSocket(i).iLocation}`);

        for ( let j in list )
        {
            for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
            {
                //if ( this.listUsers.GetSocket(i).iLocation == list[j] ) {
                //if ( this.listUsers.GetSocket(i).iLocation == list[j] && this.listUsers.GetSocket(i).strLastBettingAction != 'Fold' ) {
                    if ( this.listUsers.GetSocket(i).iLocation == list[j] && 
                            this.listUsers.GetSocket(i).bFold == false && 
                            this.listUsers.GetSocket(i).bEnable == true &&
                            this.listUsers.GetSocket(i).bSpectator == false) 
                    {

                    console.log(`FindNextUser : ${list[j]}, socket : ${this.listUsers.GetSocket(i).strID}`);

                    return this.listUsers.GetSocket(i);
                }
            }     
        }
        return null;
    }

    GetPlayerLowestCard(player)
    {
        let objectCard = {iNumber:13, iSuit:0};

        for ( let i in player.listHandCard )
        {
            const number = player.listHandCard[i]%13;
            const suit = player.listHandCard[i]/4;

            if ( number != 0 && number != 1 && number < objectCard.iNumber )
            {
                objectCard.iNumber = number;
                objectCard.iSuit = suit;
            }
        }
        return objectCard;
    }

    CalculateLowestCardPlayer() {

        let tPlayer = null;
        let objectCurrent = null;

        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            const player = this.listUsers.GetSocket(i);
            if ( i == 0 )
            {
                tPlayer = player;
                objectCurrent = this.GetPlayerLowestCard(player);
            }
            else
            {
                let objectResult = this.GetPlayerLowestCard(player);
                console.log(objectResult);
                if ( objectResult.iNumber < objectCurrent.iNumber )
                {
                    tPlayer = player;
                    objectCurrent = objectResult;
                }                
                else if ( objectResult.iNumber == objectCurrent.iNumber )
                {
                    if ( objectResult.iSuit > objectCurrent.iSuit )
                    {
                        tPlayer = player;
                        objectCurrent = objectResult;
                    }
                }
            }
        }
        return tPlayer.iLocation;
    }

    BuildPlayerType() {
        console.log(`IGame::BuildPlayerType`);
  
        // 플레이어 수
        const cNumPlayers = this.listUsers.GetLength();
        let cPlayerType = 'Dealer'; // 딜러 선정 변수
        let listLocations = [];

        // 모든 플레이어의 strPlayerType과 bSpectator 초기화
        for (let i = 0; i < cNumPlayers; ++i) {
            this.listUsers.GetSocket(i).strPlayerType = '';
            //this.listUsers.GetSocket(i).bSpectator = false;
        }

        // 플레이어들의 위치를 배열에 담기
        for (let i = 0; i < cNumPlayers; ++i) {
            const player = this.listUsers.GetSocket(i);
            listLocations.push(player.iLocation);
        }

        // 딜러 선정
        let idealerlocation = this.CalculateLowestCardPlayer();
        const dealer = this.FindPlayerInLocation(idealerlocation);
        if (dealer !== null) {
            dealer.strPlayerType = cPlayerType;
            dealer.bNewPlaying = false;
            console.log(`IGame::BuildPlayerType : Player in location ${idealerlocation} is ${dealer.strID}`);
        } else {
            console.log(`IGame::BuildPlayerType : There is no user in the index ${idealerlocation}`);
        }
        if(this.GetScoreUserCount() == 0)
        {
            this.FullBroadcastPlayerBetting();
        }
        this.FullBroadcastPlayerType();
    }

    FindPlayerFromPlayerType(strType)
    {
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            let player = this.listUsers.GetSocket(i);
            if ( player.strPlayerType == strType )
            {
                return player;
            }
        }
        return null;
    }

    GetDealerLocation()
    {
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            const player = this.listUsers.GetSocket(i);

            if ( player.strPlayerType == 'Dealer' )
            {
                return player.iLocation;
            }
        }
        return -1;
    }

    GetBBLocation()
    {
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            const player = this.listUsers.GetSocket(i);

            if ( player.strPlayerType == 'BB' )
            {
                return player.iLocation;
            }
        }
        return -1;
    }

    StartSubmitCard()
    {
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            console.log(`strID : ${this.listUsers.GetSocket(i).strID}, strPlayerType : ${this.listUsers.GetSocket(i).strPlayerType}`);

            console.log(`Betting Amount : ${this.listUsers.GetSocket(i).strID}, ${this.listUsers.GetSocket(i).iTotalBettingCoin}`);
            this.listUsers.GetSocket(i).strLastBettingAction = '';
        }
        let player = null;
        if(this.bNewGame == true)
        {
            this.bNewGame = false;
            this.iBettingLocationLast = this.GetDealerLocation();
            player = this.FindPlayerInLocation(this.iBettingLocationLast);
        }
        else
        {
            player = this.FindNextPlayer(this.iBettingLocationLast, -1);
        }
        
        if ( null != player )
        {
            for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
            {
                let tplay = this.listUsers.GetSocket(i);

                if ( tplay.strID == player.strID )
                {
                    tplay.emit('SM_EnableSubmitCard', {iBettingTime:this.iBettingTime});
                }
                else
                    tplay.emit('SM_Focus', {strID:player.strID, iBettingTime:this.iBettingTime});
            }

            this.iBettingLocationLast = player.iLocation;
        }
        console.log(`Last Betting Location : ${this.iBettingLocationLast}`);
    }

    IsBettingComplete()
    {
        let listCheck = [];

        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            const player = this.listUsers.GetSocket(i);

            //console.log(`#IsBettingComplete : ${player.strID} : BetCoin : ${player.iTotalBettingCoin}, MaxBetCoin on Table : ${this.iRecentPlayersBettingCoin}`);

            if ( player.iLocation == -1 )
                continue;

            if ( player.bEnable == false )
                continue;

            //  Not bet yet
            if ( player.strLastBettingAction == '' )
            {
                listCheck.push(`IsBettingComplete index : ${i}, not bet`);
                return false;
            }

            // if ( player.iCoin > 0 && player.iTotalBettingCoin < this.iRecentPlayersBettingCoin )
            //     return false;
        }
        return true;
    }

    IsGameEnd()
    {
        console.log(`####################################################### IsGameEnd`);
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            const player = this.listUsers.GetSocket(i);

            console.log(`${player.strID}, ${player.bEnable}, ${player.strLastBettingAction}`);

            // if ( player.iLocation != -1 && player.bEnable != false && player.strLastBettingAction != 'Fold' )
            //     continue;

            console.log(`##### IsGameEnd ${player.strID}, iNumCards : ${player.listHandCard.length}`);

            if ( player.listHandCard.length == 0 && player.bFold == false && player.bSpectator == false)
                return true;
        }


        return false;
    }

    ProcessNextBetting()
    {
        let player = this.FindNextPlayer(this.iBettingLocationLast, -1);
        if ( null != player )
        {

            for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
            {
                let tplay = this.listUsers.GetSocket(i);

                if ( tplay.strID == player.strID )
                {

                    tplay.emit('SM_EnableSubmitCard', {iBettingTime:this.iBettingTime});
                }
                else
                    tplay.emit('SM_Focus', {strID:player.strID, iBettingTime:this.iBettingTime});
            }


            this.iBettingLocationLast = player.iLocation;
        }
        console.log(`Last Betting Location : ${this.iBettingLocationLast}`);
    }

    Betting(socket, strBetting)
    {
        socket.strLastBettingAction = strBetting;
    }

    RemoveCards(socket, listCards)
    {
        console.log(`########## RemoveCards : ${socket.strID}`);
        console.log(listCards);
        console.log('Mine');
        console.log(socket.listHandCard);

        for ( let i in listCards )
        {
            this.RemoveCard(socket, listCards[i]);
        }
        console.log('After');
        console.log(socket.listHandCard);
    }

    RemoveCard(socket, listcards)
    {
        for ( let i in socket.listHandCard )
        {
            console.log(`RemoveCard Compare : ${listcards.index} and ${socket.listHandCard[i]}`);
            if ( socket.listHandCard[i] == listcards.index )
            {
                console.log(`Removed ${listcards.index}`);
                socket.listHandCard.splice(i, 1);
                return;
            }
        }
    }

    ProcessSubmit(socket, objectBetting)
    {
        console.log("IGame::!!!!");
        console.log(objectBetting);
        socket.strLastBettingAction = objectBetting.strBetting;
        let bpass = false;

        //this.CalculateBettingAmount(socket, objectBetting);
        
        if ( socket.strLastBettingAction == 'Submit' )
        {
            this.RemoveCards(socket, objectBetting.list);
            this.iPasscount = 0;
        }
        if( objectBetting.strBetting == 'Pass')
        {
            this.iPasscount++;
        }
        const cEnablePlayer = this.GetNumPlayingUser();
        if( this.iPasscount == cEnablePlayer-1)
        {
            bpass = true
        }
        this.FullBroadcastSubmit(socket, objectBetting.strBetting, objectBetting.list, bpass);
        console.log(`##### ProcessSubmit : NumEnableUser ${cEnablePlayer} to Result`);
        if ( true == this.IsGameEnd() )
        {
            console.log(`##### isgameend()`);
            this.SetMode(E.EGameMode.Result);
        }
        else if ( true == this.IsBettingComplete() )
        {
            this.SetMode(E.EGameMode.SubmitCard);
        }
        else
        {
            this.ProcessNextBetting();
        }
    }

    Start()
    {
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            const player = this.listUsers.GetSocket(i);

            player.bSpectator = false;
            console.log(`IGame::Start strID : ${player.strID}`);
            if ( this.listUsers.GetSocket(i).iLocation != -1 )
            {
                console.log(`IGame::Start strID : ${player.strID} Enabled`);
                this.listUsers.GetSocket(i).bEnable = true;
            }                
        }
        return true;
    }

    SetHandCard()
    {
        let iStartLocation = null;
        for(let i in this.listUsers.GetLength())
        {
            iStartLocation = this.listUsers.GetSocket(i).iLocation;
        }

        let iCount = 0;
        //while(1)
        while ( iCount < 100 )
        {
            //let player = this.FindNextPlayer(-1, iStartLocation);
            let player = this.FindNextPlayer(iStartLocation, -1);
            if ( player != null )
            {
                console.log(`##### SendHandCard NextPlayer : ${player.strID}, CardLength : ${player.listHandCard.length}`);
                //if ( player.listHandCard.length < 2 )
                if ( player.listHandCard.length < 13 && player.bFold == false && player.bSpectator == false )
                {
                    const iCard = this.listCardDeck[this.iCurrentDeckIndex];
                    ++ this.iCurrentDeckIndex;
    
                    player.listHandCard.push(iCard);

                    iStartLocation = player.iLocation;
        
                    if ( true == this.IsCompleteHandCard() )
                    {
                        iCount = 100;
                        console.log(`################################################# Success`);
                        break;
                    }                        
                }
            }
            ++ iCount;
        }

        this.FullBroadcastHandCard();
    }

    ConvertCardIndex(index)
    {
        const cSuit = ['s', 'h', 'd', 'c'];
        const cRank = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];

        let suit = Math.floor(index / 13);
        let rank = Math.floor(index % 13);

        let result = cRank[rank]+cSuit[suit];
        return result;
    }

    ConvertCardList(list)
    {
        let result = [];
        for ( let i in list )
        {
            let data = this.ConvertCardIndex(list[i]);
            result.push(data)
        }
        return result;
    }

    ProcessResult()
    {
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            const player = this.listUsers.GetSocket(i);
            player.bNewPlaying = false;
        }

        this.ProcessWinner();

        this.FullBroadcastResult();

        //
        console.log(`this.bSetGame : ${this.bSetGame}`);
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            if ( this.listUsers.GetSocket(i).iLocation == -1 )
                continue;
            if ( this.listUsers.GetSocket(i).bEnable == false )
                continue;
            if( this.bSetGame == false )
            {
                const cCash = parseInt(this.listUsers.GetSocket(i).iCash) + parseInt(this.listUsers.GetSocket(i).iCoin);
                console.log(`${cCash} : ${this.listUsers.GetSocket(i).iCash} : ${this.listUsers.GetSocket(i).iCoin}`);
                this.listDBUpdate.push({iDB:E.EDBType.Users, iSubDB:E.EUserDBType.UpdatePoint, strID:this.listUsers.GetSocket(i).strID, iCash:cCash});
                this.listUsers.GetSocket(i).bFold = false;
                this.listUsers.GetSocket(i).iScore = 0;
            }
        }
    }

    ProcessRebuyIn()
    {
        this.FullBroadcastRebuyIn();
    }

    ProcessWinner()
    {
        this.CalculateRank();
        console.log(`CalculateRank : after ${this.GetPlayerFoldCount()}`);
        if(this.GetPlayerFoldCount() == 1)
        {
            this.CalculatePot();
        }

        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            let player = this.listUsers.GetSocket(i);
            console.log(`ProcessWinner : ${player.strID}, #Rank : ${player.iRank}, $Win : ${player.iWinCoin}, $Coin : ${player.iCoin}`);
        }
    }

    CalculateRank()
    {
        let list = [];
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            const player = this.listUsers.GetSocket(i);
            if ( player.iLocation == -1 || player.bEnable == false || player.bFold == true || player.bSpectator == true)
                continue;
            list.push({strID:player.strID, iNumCards:player.listHandCard.length});
        }

        let result = list.sort( (a, b) => {
            return a.iNumCards-b.iNumCards;
        });

        for ( let i in result )
        {
            const player = this.FindPlayer(result[i].strID);
            if ( player )
            {
                player.iRank = parseInt(i)+1;
                if(player.listHandCard.length >= 10)
                {
                    player.iScore += parseInt(20);
                }
                else 
                {
                    player.iScore += parseInt( player.listHandCard.length );
                }
            }
            if(player.iScore >= 31)
            {
                player.bFold = true;
            }
            console.log(`playerID : ${player.strID},result iRank : ${player.iRank}, iScore: ${player.iScore}, bFold : ${player.bFold}, GetPlayerFoldcount() : ${this.GetPlayerFoldCount()}`)
        }
        if(this.GetPlayerFoldCount() == 1)
        {
            this.bSetGame = false;
        }
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            const player = this.listUsers.GetSocket(i);

            console.log(`##### ${player.strID}, iRank : # ${player.iRank}`);
        }
    }
    GetPlayerFoldCount()
    {
        let count = 0;
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            if(this.listUsers.GetSocket(i).bFold == false)
            {
                count++;
            }
        }
        return count;
    }

    IsSameCard(cards1, cards2)
    {
        if ( cards1.length == cards2.length )
        {
            for ( let i in cards1 )
            {
                if ( cards1[i].value != cards2[i].value )                
                    return false;
            }

            return true;
        }
        return false;
    }

    RemoveWinnerList(list, objectHand)
    {
        for ( let i = 0; i < list.length;)
        {
            if ( true == this.IsSameCard(list[i].cards, objectHand.cards) )
            {
                list.splice(i, 1);
            }                
            else 
                ++ i;
        }
    }

    Shuffle()
    {
        this.listCardDeck = [];
        //this.listCardDeck = [0,25,12,21,50,36,9,1,29,30,40,10];
        for ( let i = 0; i < 52; ++ i )
            this.listCardDeck.push(i);
        
        for ( let index = this.listCardDeck.length-1; index > 0; -- index )
        {
            const random = Math.floor(Math.random() * (index+1));
            const temp = this.listCardDeck[index];
            this.listCardDeck[index] = this.listCardDeck[random];
            this.listCardDeck[random] = temp;
        }

        console.log(this.listCardDeck);
    }

    IsCompleteHandCard()
    {
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            let player = this.listUsers.GetSocket(i);

            if ( player.strLastBettingAction == 'Fold' || player.iLocation == -1 || player.bEnable == false )
                continue;

            if ( player.listHandCard.length != 13 )
            {
                console.log(`IGame::IsCompleteHandCard => HandCard Length : ${player.listHandCard.length}`);
                return false;
            }
        }
        return true;
    }

    StartGame()
    {
        this.Shuffle();
        this.Start();
        this.bSetGame = true;
        console.log(`IGame::StartGame`);
        //const cPlayingUser = this.GetNumPlacedUser();
        const cPlayingUser = this.GetNumPlayingUser();
        console.log(`IGame::StartGame => cPlayingUser : ${cPlayingUser}, GameMode ${this.eGameMode}`);
        if ( cPlayingUser >= this.cMinEnablePlayer && this.eGameMode == E.EGameMode.Start )
        {
            this.SetMode(E.EGameMode.HandCard);
            return true;
        }

        return false;
    }

    PrintRoomUsers()
    {
        console.log(`################################################## Room ${this.strGameName}, iCoin ${this.iDefaultCoin} : Users`);
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            console.log(`strID : ${this.listUsers.GetSocket(i).strID}, eStage : ${this.listUsers.GetSocket(i).eStage}, eLocation : ${this.listUsers.GetSocket(i).iLocation}`);
        }
    }

    //  Management Pots
    ProcessPot()
    {
        this.listPots = [];

        let listClone = this.ClonePlayers();

        for ( let i in listClone )
        {
            let player = listClone[i];

            if ( player.iCoin == 0 && player.strLastBettingAction != 'Fold' )
            {
                this.listPots.push({strID:player.strID, iStandard:player.iTotalBettingCoin, iPotAmount:0, listPlayer:[]});
            }
        }
        // if ( listPots.length <= 0 )
        //     listPots.push({strID:'', iStandard:99999999, iPotAmount:0, listPlayer:[]});

        this.listPots.sort( (a,b) => {
            return a.iStandard-b.iStandard;
        });

        for ( let i = 0; i < this.listPots.length; ++i )
        {
            const index = this.listPots.length-1-i;
            let prev = index-1;
            if ( prev != -1 )
            this.listPots[index].iStandard -= this.listPots[prev].iStandard;
        }
        
        console.log(`############################## ProcessPot`);

        for ( let i in this.listPots )
        {
            this.CalculatePotAmount(this.listPots[i], listClone);
        }

        let objectPot = this.CalculateExceptionPotAmount(listClone);
        if ( objectPot != null )
        this.listPots.push(objectPot);

        console.log(this.listPots);

        console.log(`############################## TotalBet On Table : ${this.iTotalBettingCoin}`);
    }

    ClonePlayers()
    {
        let listClone = [];
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            const player = this.listUsers.GetSocket(i);

            //if ( player.iLocation != -1 )
            if ( player.iLocation != -1 && player.bEnable == true )
            {
                let clone = {strID:player.strID, iCoin:player.iCoin, iTotalBettingCoin:player.iTotalBettingCoin, strLastBettingAction:player.strLastBettingAction};
                listClone.push(clone);
            }
        }
        return listClone;
    }

    CalculatePotAmount(kPot, listClone)
    {
        const iStandard = kPot.iStandard;

        for ( let i in listClone )
        {
            let iAmount = iStandard;
            if ( listClone[i].iTotalBettingCoin < iStandard )
                iAmount = listClone[i].iTotalBettingCoin;
            
            if ( iAmount > 0 )
            {
                kPot.iPotAmount += iAmount;
                if ( listClone[i].strLastBettingAction != 'Fold' )
                    kPot.listPlayer.push(listClone[i].strID);

                listClone[i].iTotalBettingCoin -= iAmount;
            }
        }
    }

    CalculateExceptionPotAmount(listClone)
    {
        let object = null;
        for ( let i in listClone )
        {
            if ( listClone[i].iTotalBettingCoin > 0 )
            {
                if ( object == null )
                {
                    object = {strID:'high', iStandard:99999, iPotAmount:listClone[i].iTotalBettingCoin, listPlayer:[listClone[i].strID]};
                }
                else
                {
                    object.iPotAmount += listClone[i].iTotalBettingCoin;
                    if ( listClone[i].strLastBettingAction != 'Fold' )
                        object.listPlayer.push(listClone[i].strID);
                }
                listClone[i].iTotalBettingCoin = 0;
            }
        }
        return object;
    }

    CalculatePot()
    {
        //let strWinner = '';
       
        let iWinCoin = parseInt(this.iTotalBettingCoin) - parseInt(this.iTotalBettingCoin * global.fHoldemFee * 0.01);
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            const player = this.listUsers.GetSocket(i);
            console.log("CalculatePot---------------- : " + iWinCoin)

            if ( player.iRank == 1 )
            {
                //console.log(`winner coin update : Win : ${iWinCoin}, winner.iWinCoin : ${player.iWinCoin}`);
                player.iWinCoin += iWinCoin;
                player.iCoin += iWinCoin;
                this.iTotalBettingCoin = 0;
            }
        }

        //디비에 결과값 저장.
        // let strDesc = '';
        // let strHand = '';
        // let strTablecard = '';
        // let iStartCoin = 0;
        // for ( let j = 0; j < this.listUsers.GetLength(); ++ j )
        // {
        //     if ( strDesc != '' )
        //     {
        //         strDesc += ',';
        //         strHand += ',';
        //     }

        //     let player = this.listUsers.GetSocket(j);

        //     iStartCoin = player.iStartCoin;
        //     strDesc += `${player.strID}:${player.iTotalBettingCoin}`;
        //     let handList = [];
        //     let idList = [];
        //     for( let k in player.listHandCard ){
        //         let card = player.listHandCard[k];
        //         let id = player.strID;
        //         if(!idList.includes(id)){
        //             idList.push(id);
        //             handList.push(`${id}:${card}`);
        //         } else {
        //             handList[idList.indexOf(id)] += `/${card}`;
        //         }
        //     }
        //     strHand += handList.join(',');
        // }
        // if(this.listTableCard.length == 0)
        // {
        //     strTablecard = 'not';
        // }
        // else
        // {
        //     for( let j in this.listTableCard )
        //     {
        //         if ( strTablecard != '' )
        //         {
        //             strTablecard += ',';
        //         }
        //         strTablecard += `${this.listTableCard[j]}`;
        //     }
        // }
        // console.log(`strHand : ${strHand} iStartcoin : ${iStartCoin} strTablecard : ${strTablecard}`);
        // console.log(`#######@@############################################################################################## updatedb caculatepot`);
        // this.listDBUpdate.push({iDB:E.EDBType.RecodrdGames, iSubDB:0, lUnique:this.lUnique, strWinner:strWinner, strDesc:strDesc, iStartCoin:iStartCoin, strHand:strHand, strTablecard:strTablecard, iJackpot:'0'});
    }

    CalculatePotWinner(kPot)
    {
        let listWinner = [];
        let iTargetRank = this.CalculatePotRanker(kPot);

        console.log(`Target Rank : ${iTargetRank}`);

        for ( let i in kPot.listPlayer )
        {
            let player = this.FindPlayer(kPot.listPlayer[i]);
            if ( player != null )
            {
                if ( player.iRank == iTargetRank )
                {
                    listWinner.push(player.strID);                    
                }
            }
        }
        return listWinner;
    }

    CalculatePotRanker(kPot)
    {
        let iRank = 999;
        
        for ( let i in kPot.listPlayer )
        {
            let player = this.FindPlayer(kPot.listPlayer[i]);
            if ( player != null )
            {
                console.log(`player.iRank : ${player.iRank}, parameter iRank : ${iRank}`);
                if ( iRank > player.iRank )
                {
                    iRank = player.iRank;
                }                
            }
        }
        return iRank;
    }

    ProcessWinCards(listCards, strHand)
    {
        const iLength = listCards.length;

        this.listWinCards = [];

        for ( let i = 0; i < iLength; ++ i )
        {
            let iIndex = this.GetCardIndex(listCards[i].value, listCards[i].suit);

            this.listWinCards.push(iIndex);
        }
        console.log(`##### Process Win Cards`);
        console.log(listCards);
        console.log(this.listWinCards);
    }

    GetCardIndex(rank, suit)
    {
        let iNumber = 0;
        switch ( rank )
        {
            case 'A':
                iNumber = 0;
                break;
            case '2':
                iNumber = 1;
                break;
            case '3':
                iNumber = 2;
                break;
            case '4':
                iNumber = 3;
                break;
            case '5':
                iNumber = 4;
                break;
            case '6':
                iNumber = 5;
                break;
            case '7':
                iNumber = 6;
                break;
            case '8':
                iNumber = 7;
                break;
            case '9':
                iNumber = 8;
                break;
            case 'T':
                iNumber = 9;
                break;
            case 'J':
                iNumber = 10;
                break;
            case 'Q':
                iNumber = 11;
                break;
            case 'K':
                iNumber = 12;
                break;
        }

        let iSuit = 0;
        switch ( suit )
        {
        case 's':
            iSuit = 0;
            break;
        case 'h':
            iSuit = 1;
            break;
        case 'd':
            iSuit = 2;
            break;
        case 'c':
            iSuit = 3;
            break;
        }
        return iSuit*13+iNumber;
    }
}
module.exports = IGame;