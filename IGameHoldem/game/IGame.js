let ISocketList = require('./ISocketList');
let E = require('./IEnum');

let poker = require('pokersolver').Hand;

let db = require('../db');
const user = require('../models/user');
const { ConnectionTimedOutError } = require('sequelize');

console.log(`###############################################`);
// var hand1 = poker.solve(['Ad', 'As', 'Jc', 'Th', '2d', '3c', 'Kd']);
// var hand2 = poker.solve(['Ad', 'As', 'Jc', 'Th', '2d', 'Qs', 'Qd']);
// var hand3 = poker.solve(['Ad', 'As', 'Jc', 'Th', '2d', 'Qs', 'Qd']);
// console.log(hand1.name);
// console.log(hand2.name);
// console.log(hand3.name);
// var winner = poker.winners([hand1, hand2, hand3]);
// console.log(winner);

// var handtest = poker.solve(['5c', 'Ts', 'Qs', '7s', 'Js', '3c', 'Kh']);
// //var handtest = poker.solve(['Tc', 'Ts', 'Qs', '7s', 'Js', '3c', 'Kh']);
// //var handtest = poker.solve(['Tc', 'Ts', 'Qs', 'Qc', 'Js', '3c', 'Kh']);
// //var handtest = poker.solve(['Tc', 'Ts', 'Qs', 'Td', 'Js', '3c', 'Kh']);
// //var handtest = poker.solve(['Tc', 'Ts', 'Qs', 'Td', 'Js', 'Qc', 'Kh']);
// //var handtest = poker.solve(['Tc', 'Ts', 'Th', 'Td', 'Js', 'Qc', 'Kh']);
// //var handtest = poker.solve(['Ad', 'Qd', 'Kd', 'Jd', 'Td', 'Qc', 'Kh']);
// //var handtest = poker.solve(['9d', 'Qd', 'Kd', 'Jd', 'Td', 'Qc', 'Kh']);
// let GetListValue = (descr, name) => {

//     let array = descr.split(', ');
//     let array2 = [];

//     if ( array.length < 2 && name != 'High Card' )
//         return array2;
    
//     if ( name == 'High Card' )
//         array.push(array[0]);

//     console.log(array);
//     let string = array[1];
//     console.log(string);

//     let index = string.indexOf(" & ");
//     if ( index != -1 )
//     {
//         //array2 = string.split(' & ');
//         array2 = string.split(' ');
//     }
//     else
//     {
//         index = string.indexOf(" over ");
//         if ( index != -1 ){
//             array2 = string.split(' ');
//         }
//         else
//             array2.push(string);
//     }
//     console.log('#####');
//     console.log(array2);

//     for ( let i in array2 )
//     {
//         array2[i] = array2[i].replace(' ', '');
//         array2[i] = array2[i].replace("'s", '');
//         array2[i] = array2[i].replace("d High", '');
//         array2[i] = array2[i].replace("h High", '');
//         array2[i] = array2[i].replace("c High", '');
//         array2[i] = array2[i].replace("s High", '');
//         array2[i] = array2[i].replace("High", '');
//         array2[i] = array2[i].replace("over", ',');
//         array2[i] = array2[i].replace("&", ',');
//     }

//     console.log('#########');
//     console.log(array2);

//     return array2;

// }

// var hand1 = poker.solve(['Ad', 'As', 'Jc', 'Th', '2d', '3c', 'Kd']);
// var hand2 = poker.solve(['Ad', 'As', 'Jc', 'Th', '2d', '3s', '4h']);
// var winner = poker.winners([hand1, hand2]); // hand2
// console.log(winner);
// for ( let i in winner ) {
//     console.log(winner[i].cards);
//     console.log(winner[i].cards[0].value);
// }

//var hand1 = poker.solve(['8h', 'Jd', 'Qd', 'Kd', 'Td', '3s', 'Kh']);
//var hand1 = poker.solve(['8h', 'Jh', 'Qh', 'Kh', 'Td', '3s', 'Ah']);
// var hand1 = poker.solve(['Th', 'Jd', 'Tc', '5d', '5c', '3s', 'Ah']);
// // console.log(hand1);s
// // console.log(hand1.cards);
// // console.log(hand1.cards[0].value+hand1.cards[0].suit);

// var hand1 = poker.solve(['Ad', 'As', 'Jc', 'Th', '2d', '3c', 'Kd']);
// var hand2 = poker.solve(['Ad', 'As', 'Jc', 'Th', '2d', '3s', '3h']);
// var hand3 = poker.solve(['Ad', 'As', 'Jc', 'Th', '2d', 'Qs', 'Qd']);
// var winner = poker.winners([hand1, hand2, hand3]); // hand2
// console.log(winner);
// console.log(`hand1 ${hand1.name}, ${hand1.descr}`);
// console.log(`hand2 ${hand2.name}`);
// console.log(`hand3 ${hand3.name}`);
// console.log(`Winner Length : ${winner.length}`);
// for ( let i in winner )
// {
//     console.log(`winner : ${winner[i].name}`);
// }
// console.log(hand1);
//console.log(hand1.values);

// var hand1 = poker.solve(['8h', 'Jd', 'Qd', 'Kd', 'Td', '3s', 'Kh']);
// console.log(hand1.name);
// console.log(hand1.descr);

// var hand2 = poker.solve(['8h', 'Jd', 'Qd', 'Kd', 'Td', 'Ks', 'Kh']);
// console.log(hand2.name);
// console.log(hand2.descr);

// var hand3 = poker.solve(['8h', 'Jd', 'Qd', 'Kd', 'Td', 'Ks', 'Kh']);
// console.log(hand3.name);
// console.log(hand3.descr);

// var hand4 = poker.solve(['8h', 'Jd', 'Qd', 'Kd', '8d', 'Ks', 'Kh']);
// console.log(hand4.name);
// console.log(hand4.descr);

// var hand5 = poker.solve(['Th', 'Jd', 'Qd', 'Kd', '8d', 'Ks', 'Kh']);
// console.log(hand5.name);
// console.log(hand5.descr);

// var hand6 = poker.solve(['9h', 'Jd', 'Qd', 'Kd', '8d', 'Ks', 'Kh']);
// console.log(hand6.name);
// console.log(hand6.descr);

// var winner = poker.winners([hand1, hand2, hand3, hand4, hand5, hand6]);
//  console.log(winner);
//  console.log(winner.length);
//  console.log(winner[0].name);

//  let RemoveWinner = (list, strHand) => {

//     //for ( let i in list )
//     for ( let i = 0; i < list.length;)
//     {
//         //console.log(`RemoveWinner : ${list[i].name}, ${strHand}`);

//         if ( list[i].hand.name == strHand )
//             list.splice(i, 1);
//         else 
//             ++ i;
//     }
//  }

//  let ArrangeWinner = () => {
    
//     let list = [{strID:'test', hand:hand1}, {strID:'test3', hand:hand2}, {strID:'test2', hand:hand3}, {strID:'test5', hand:hand4}, {strID:'test1', hand:hand5}, {strID:'test2', hand:hand6}];

//     while (1)
//     {
//         let winner = poker.winners(list);
//         if ( winner.length > 0)
//         {
//             console.log(`rank : ${winner[0].name}, winner length : ${winner.length}`);
            
//             RemoveWinner(list, winner[0].name);

//             console.log(`list length : ${list.length}`);
//         }
//         if ( list.length == 0 )
//         {
//             break;
//         }
//     }
//  }

//  ArrangeWinner();

// console.log(hand1.descr);

// let array = 
// [
//     0, 2, 3, 4,
//     5, 6, 7
// ];

// for ( let i = 0; i < array.length; ++ i )
// {
//     if ( array[0] < 5 )
//     {
//         let value = array[0];
//         array.shift();        
//         array.push(value);
//     }
// }
//console.log(array);

// let players = [];
// players.push({strID:'a', iCoin:10000, iBet:0});
// players.push({strID:'b', iCoin:20000, iBet:0});
// players.push({strID:'c', iCoin:30000, iBet:0});
// players.push({strID:'d', iCoin:40000, iBet:0});
// players.push({strID:'e', iCoin:50000, iBet:0});

// const cBet = 0;

// for ( let i in players )
// {
//     players[i].iBet += cBet;
//     players[i].
// }

// let list = 
// [
//     {strID:'a', iBetTotal:'50000'},
//     {strID:'b', iBetTotal:'30000'},
//     {strID:'c', iBetTotal:'150000'},
//     {strID:'d', iBetTotal:'130000'},
//     {strID:'e', iBetTotal:'10000'},
// ];

// //for ( let i in list )
// for ( let i = 0; i < list.length; ++ i )
// {
//     console.log(list[i]);
//     list.splice(i, 1);
//     --i;
// }

// console.log(`test`);
// console.log(list);

// function SortPotList(list)
// {
//     list.sort( (a,b)=> {

//         // if ( a.iBetTotal > b.iBetTotal )
//         //     return 1;
//         // if ( a.iBetTotal < b.iBetTotal )
//         //     return -1;
//         // return 0;
//         (a.iBetTotal - b.iBetTotal)

//     });
// }

// SortPotList(list);

// list.sort( (a,b) => {
//     return a.iBetTotal-b.iBetTotal;
// })

// console.log(list);


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

        this.bShowdown = false;
        this.listReservationMode = [];
        this.iDelayTime = 0;

        this.iCurrentBettingID = '';

        // For Rolling
        this.listBet    = [];
        this.strIDjoker = '';
        this.eState = '';
        this.tableCards = [];
    }
    
    async GetOdds(strID)
    {
        let user = await db.Users.findOne({ where: { strID: strID } });

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

        let object = {fAdmin:0, fPAdmin:0, fVAdmin:0, fAgent:0, fShop:0, fUser:0,strAdminID:'', strPAdminID:'', strVAdminID:'', strAgentID:'', strShopID:'', strUserID:strID, eUserType:user.eUserType};
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
                    switch (element.iSubDB) {
                        case E.ERecordBetDBType.Create:
                            {
                                let odds = await this.GetOdds(element.strID);

                                const cRollingPAdmin = parseInt(odds.fPAdmin * element.iValidAmount * 0.01);
                                const cRollingVAdmin = parseInt(odds.fVAdmin * element.iValidAmount * 0.01);
                                const cRollingAgent = parseInt(odds.fAgent * element.iValidAmount * 0.01);
                                const cRollingShop = parseInt(odds.fShop * element.iValidAmount * 0.01);

                                if(odds.eUserType == 'JOKER')
                                {
                                    await db.RecordBets.create({
                                        strID: element.strID,
                                        iClass: element.iClass,
                                        strGroupID: element.strGroupID,
                                        iAmount: element.iAmount,
                                        strBet: element.strBetting,
                                        iRollingAdmin: 0,
                                        iRollingPAdmin: 0,
                                        iRollingVAdmin: 0,
                                        iRollingAgent: 0,
                                        iRollingShop: 0,
                                    });
                                }
                                else 
                                {
                                    await db.RecordBets.create({
                                        strID: element.strID,
                                        iClass: element.iClass,
                                        strGroupID: element.strGroupID,
                                        iAmount: element.iAmount,
                                        strBet: element.strBetting,
                                        iRollingAdmin: parseInt(odds.fAdmin * element.iValidAmount * 0.01),
                                        iRollingPAdmin: cRollingShop,
                                        iRollingVAdmin: cRollingVAdmin,
                                        iRollingAgent: cRollingAgent,
                                        iRollingShop: cRollingShop,
                                    });

                                    console.log(`########## Calculate Rolling`);
                                    console.log(odds);

                                    await db.Users.increment({ iRolling: cRollingPAdmin }, { where: { strID: odds.strPAdminID } });
                                    await db.Users.increment({ iRolling: cRollingVAdmin }, { where: { strID: odds.strVAdminID } });
                                    await db.Users.increment({ iRolling: cRollingAgent }, { where: { strID: odds.strAgentID } });
                                    await db.Users.increment({ iRolling: cRollingShop }, { where: { strID: odds.strShopID } });
                                }
                                this.listDBUpdate.splice(i, 1);
                                --i;
                                break;
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

        this.bShowdown = false;
        this.listReservationMode = [];
        this.iDelayTime = 0;

        this.listBet = [];
        this.strIDjoker = '';

        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            let player = this.listUsers.GetSocket(i);
            if(player.iLocation == -1)
            {
                player.bSpectator = true;
            }
            else
            {
                player.bSpectator = false;
            }

            player.iTotalBettingCoin = 0;
            player.iBettingCoin = 0;
            player.iStartCoin = player.iCoin;
            player.strLastBettingAction = '';
            player.listHandCard = [];
            player.strHand = '';
            player.iWinCoin = 0;
            player.iRank = 9;
            player.strDescr = '';
            player.bMenualRebuyin = false;
            player.bRejoin = false;

            player.emit('SM_Mode', {eMode:'Standby'});
        }
    }

    Join(socket)
    {
        console.log(`IGame::Join ${socket.strID}`);

        let exist = this.FindPlayer(socket.strID);
        if ( exist != null )
        {
            socket.eStage = exist.eStage;
            socket.lUnique = exist.lUnique;
            socket.iLocation = exist.iLocation;
            socket.iTotalBettingCoin = exist.iTotalBettingCoin;
            socket.iBettingCoin = exist.iBettingCoin;
            socket.strLastBettingAction = exist.strLastBettingAction;
            socket.listHandCard = exist.listHandCard;
            socket.strHand = exist.strHand;
            socket.strDescr = exist.strDescr;
            socket.iWinCoin = exist.iWinCoin;
            socket.iRank = exist.iRank;
            socket.bEnable = exist.bEnable;
            socket.bSpectator = exist.bSpectator;
            socket.bMenualRebuyin = exist.bMenualRebuyin;
            socket.bNewPlaying = exist.bNewPlaying;
            socket.iStartCoin = exist.iStartCoin;
            socket.iCoin = exist.iCoin;
            socket.iCash = exist.iCash;
            socket.bRejoin = true;
            socket.eUserType = exist.eUserType;

            this.SwitchUser(socket.strID, socket);

            let listPlayers = [];
            for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
            {
                const user = this.listUsers.GetSocket(i);

                if ( user.strID == socket.strID )
                    continue;

                let listHandCard = [];
                for ( let i in user.listHandCard )
                    listHandCard.push(52);

                //let objectPlayer = {strID:user.strID, iCoin:user.iCoin, iLocation:user.iLocation, iAvatar:user.iAvatar, listHandCard:user.listHandCard};
                let objectPlayer = {strID:user.strID, iCoin:user.iCoin, iLocation:user.iLocation, iAvatar:user.iAvatar, eUserType:user.eUserType,listHandCard:listHandCard};

                // for ( let i in objectPlayer.listHandCard )
                // {
                //     objectPlayer.listHandCard[i] = 52;
                // }

                listPlayers.push(objectPlayer);
                socket.iStartCoin = user.iCoin;
                if(i == 1) socket.bNewPlaying = false;
                else socket.bNewPlaying = true;
            }
            // socket.emit('SM_JoinGame', listPlayers , this.cMaxPlayer);
            // socket.emit('SM_SelectLocation', {eResult:true, iCoin:socket.iCoin, iPoint:socket.iPoint, iLocation:socket.iLocation, iAvatar:socket.iAvatar});      
            //socket.emit('SM_EnterGame', {result:'OK', strID:strID, iCoin:iCoin, iPoint:iPoint, strGameName:instanceRoom.strGameName, iBlind:instanceRoom.iDefaultCoin});

            let objectData = {eResult:true, strID:socket.strID, strGameName:this.strGameName, iBlind:this.iDefaultCoin, iCoin:socket.iCoin, iCash:socket.iCash, 
                iLocation:socket.iLocation, iAvatar:socket.iAvatar, eUserType:socket.eUserType,
                listHandCard:socket.listHandCard,
                listTableCard:this.listTableCard
            };

            socket.emit('SM_Rejoin', listPlayers, this.cMaxPlayer, objectData);
        }
        else
        {
            let listPlayers = [];
            for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
            {
                const user = this.listUsers.GetSocket(i);

                if ( user.strID == socket.strID )
                    continue;

                let listHandCard = [];
                for ( let i in user.listHandCard )
                    listHandCard.push(52);
               
                let objectPlayer = {strID:user.strID, iCoin:user.iCoin, iLocation:user.iLocation, iAvatar:user.iAvatar, eUserType:user.eUserType,listHandCard:listHandCard};
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
            socket.iRank = 9;
            socket.bEnable = false;
            socket.bSpectator = true;
            socket.bMenualRebuyin = false;
            socket.bRejoin = false;
            //socket.eUserType = user.eUserType;
            
            this.AddUser(socket);
    
            socket.emit('SM_JoinGame', listPlayers , this.cMaxPlayer);
    
            this.BroadcastJoinUser(socket);
        }
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
            {
                player.bSpectator = false;
                list.push(player.strID);
            }
        }
        return list;
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
            

            //if ( this.listUsers.GetSocket(i).iLocation != -1 && this.listUsers.GetSocket(i).strLastBettingAction != 'Fold')
            //if ( this.listUsers.GetSocket(i).iLocation != -1 && this.listUsers.GetSocket(i).strLastBettingAction != 'Fold' && this.listUsers.GetSocket(i).bEnable == true )
            if ( player.iLocation != -1 && player.strLastBettingAction != 'Fold' && player.bEnable == true && player.bSpectator == false)
            {
                console.log(`strID : ${player.strID}, eUserType : ${player.eUserType}, strLastBettingAction : ${player.strLastBettingAction}, bEnable : ${player.bEnable}, iLocation : ${player.iLocation}`);
                ++ iNumUsers;
            }
        }
        return iNumUsers;
    }

    GetPlayingUser()
    {
        let playerlist = [];
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            const player = this.listUsers.GetSocket(i);
            if(player.iLocation != -1 && player.bSpectator == false)
            {
                console.log(`IGame:::GetPlayingUser ---- strID : ${player.strID}, eUserType : ${player.eUserType}`);
                playerlist.push(player);
            }
        }
        return playerlist;
    }

    //const EnumGameMode = Object.freeze({"Standby":0, "Start":1, "DefaultAnte":2, "BettingPreFlop":3, "Plob":4, "BettingFlop":5, "Turn":6, "BettingTurn":7, "River":8, "RiverBetting":9, "Result":10, "Celebration":11});
    Update()
    {
        ++ this.iElapsedTime;

        //
        if ( this.iCurrentBettingID != '' )
        {
            const current = this.FindPlayer(this.iCurrentBettingID);
            if ( current )
            {
                if ( current.bRejoin == true )
                {
                    const iCallAmount = this.iRecentPlayersBettingCoin - current.iTotalBettingCoin;
                    if ( iCallAmount == 0 )
                    {
                        let objectBetting = {strBetting:'Check', iAmount:0};
                        this.ProcessBetting(current, objectBetting);
                    }
                    else 
                    {
                        let objectBetting = {strBetting:'Call', iAmount:iCallAmount};
                        this.ProcessBetting(current, objectBetting);                            
                    }
                    current.bRejoin = false;
                }
            }            
        }
        //

        if ( this.listReservationMode.length > 0 ){
            this.iDelayTime--;
            if ( this.iDelayTime <= 0 )
            {
                console.log("listReservationMode : " + this.listReservationMode[0]);
                this.FullBroadcastShowdownTurncard();
                this.SetMode(this.listReservationMode[0]);
                this.listReservationMode = [];
                this.iDelayTime = 0;

            }
        }
        switch ( this.eGameMode )
        {
        case E.EGameMode.Standby:
            {
                const cPlayingUser = this.GetNumPlacedUser();
                //console.log(`IGame::Update : Standby : PlayingUsers = ${cPlayingUser}`);

                if ( this.cMinEnablePlayer <= cPlayingUser )
                {
                    this.SetMode(E.EGameMode.Start);

                    let ret = this.StartGame();
                    let list = this.GetEnableUserList();

                    for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
                        this.listUsers.GetSocket(i).emit('SM_StartGame', {eResult:ret, listUser:list});
                    //this.listUsers.GetSocket(0).emit('SM_EnableStartGame');
                }
            }
            break;
        case E.EGameMode.Start:
            //this.Start();
            if ( this.iElapsedTime > E.EGameTime.Start )
            {
                this.SetMode(E.EGameMode.BuildPlayerType);
            }
            break;
        case E.EGameMode.BuildPlayerType:
            if ( this.iElapsedTime > E.EGameTime.BuildPlayerType )
            {
                this.SetMode(E.EGameMode.DefaultAnteSB);
                // if ( this.listUsers.GetLength() > 2 )
                //     this.SetMode(E.EGameMode.DefaultAnteSB);
                // else
                //     this.SetMode(E.EGameMode.DefaultAnteBB);
            }                
            break;
        case E.EGameMode.DefaultAnteSB:
            if ( this.iElapsedTime > E.EGameTime.DefaultAnteSB )
            {
                this.SetMode(E.EGameMode.DefaultAnteBB);
                // //  When user count 2, ModeBB doesn't work
                // if ( this.listUsers.GetLength() > 2 )
                //     this.SetMode(E.EGameMode.DefaultAnteBB);
                // else 
                //     this.SetMode(E.EGameMode.HandCard);
            }
            break;
        case E.EGameMode.DefaultAnteBB:
            if ( this.iElapsedTime > E.EGameTime.DefaultAnteBB )
            {
                this.SetMode(E.EGameMode.HandCard);
            }
            break;
        case E.EGameMode.HandCard:
            if ( this.iElapsedTime > E.EGameTime.HandCard )
            {
                if(this.bShowdown == true) this.SetMode(E.EGameMode.Flop);
                else this.SetMode(E.EGameMode.BettingPreFlop);
            }
            break;
        case E.EGameMode.BettingPreFlop:
            break;
        case E.EGameMode.Flop:
            if ( this.iElapsedTime > E.EGameTime.Flop )
            {
                if(this.bShowdown == true) this.SetMode(E.EGameMode.Turn);
                else this.SetMode(E.EGameMode.BettingFlop);
            }
            break;
        case E.EGameMode.BettingFlop:
            break;
        case E.EGameMode.Turn:
            if ( this.iElapsedTime > E.EGameTime.Turn )
            {
                if(this.bShowdown == true) this.SetMode(E.EGameMode.River);
                else
                this.SetMode(E.EGameMode.BettingTurn);
            }
            break;
        case E.EGameMode.BettingTurn:
            break;
        case E.EGameMode.River:
            if ( this.iElapsedTime > E.EGameTime.River )
            {
                if(this.bShowdown == true) this.SetMode(E.EGameMode.Result);
                else this.SetMode(E.EGameMode.BettingRiver);
            }
            break;
        case E.EGameMode.BettingRiver:
            break;    
        case E.EGameMode.Result:
            if ( this.iElapsedTime > E.EGameTime.Result )
            {
                //this.SetMode(E.EGameMode.Standby);
                this.SetMode(E.EGameMode.RebuyIn);
            }
            break;
        case E.EGameMode.RebuyIn:
            if ( this.iElapsedTime > E.EGameTime.RebuyIn )
            {
                this.SetMode(E.EGameMode.Standby);
            }
            break;
        }
    }

    SetMode(eGameMode)
    {
        console.log(`IGame::SetMode ${eGameMode}`);
        this.iCurrentBettingID = '';
        switch ( eGameMode )
        {
        case E.EGameMode.Standby:
            this.Initialize();
            break;
        case E.EGameMode.Start:
            //this.Start();
            this.StartGame();
            break;
        case E.EGameMode.BuildPlayerType:
            this.BuildPlayerType();
            console.log(`=>BuildPlayerType`);
            break;
        case E.EGameMode.DefaultAnteSB:
            this.DefaultAnteSB();
            break;
        case E.EGameMode.DefaultAnteBB:
            this.DefaultAnteBB();
            break;
        case E.EGameMode.HandCard:
            this.SetHandCard();
            break;
        case E.EGameMode.BettingPreFlop:
            this.StartBetting(true);
            break;
        case E.EGameMode.Flop:
            this.SetFlopCard();
            break;
        case E.EGameMode.BettingFlop:
            this.StartBetting(false);
            break;
        case E.EGameMode.Turn:
            this.SetTurnCard();
            break;
        case E.EGameMode.BettingTurn:
            this.StartBetting(false);
            break;
            case E.EGameMode.River:
            this.SetRiverCard();
            break;
        case E.EGameMode.BettingRiver:
            this.StartBetting(false);
            break;
        case E.EGameMode.Result:
            this.ProcessResult();
            break;
        case E.EGameMode.RebuyIn:
            this.ProcessRebuyIn();
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

    // FullBroadcastPlaceUser(socket)
    // {
    //     console.log(`FullBroadcastPlaceUser`);

    //     let objectPlayer = {strID:socket.strID, iCoin:socket.iCoin, iLocation:socket.iLocation};

    //     this.FullBroadcast('SM_FullBroadcastPlaceUser', objectPlayer);
    // }

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

    BroadcastDefaultAnteSB(socket, iCoin, iBettingCoin, iTotalBettingCoin)
    {
        let objectPlayer = {strID:socket.strID, iCoin:iCoin, iBettingCoin:iBettingCoin, iTotalBettingCoin:iTotalBettingCoin, listPots:this.listPots};

        this.Broadcast(socket, 'SM_BroadcastDefaultAnteSB', objectPlayer);
    }

    BroadcastDefaultAnteBB(socket, iCoin, iBettingCoin, iTotalBettingCoin)
    {
        let objectPlayer = {strID:socket.strID, iCoin:iCoin, iBettingCoin:iBettingCoin, iTotalBettingCoin:iTotalBettingCoin, listPots:this.listPots};

        this.Broadcast(socket, 'SM_BroadcastDefaultAnteBB', objectPlayer);
    }

    FullBroadcastBetting(socket, iCoin, iCash,iBettingCoin, strBetting, iTotalBettingCoin)
    {
        let objectPlayer = {strID:socket.strID, iCoin:iCoin, iCash:iCash,iBettingCoin:iBettingCoin, strBetting:strBetting, iTotalBettingCoin:iTotalBettingCoin, listPots:this.listPots};

        //this.Broadcast(socket, 'SM_BroadcastBetting', objectPlayer);

        // for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        // {
        //     this.listUsers.GetSocket(i).emit('SM_FullBroadcastBetting', objectPlayer);
        // }

        this.FullBroadcast('SM_FullBroadcastBetting', objectPlayer);
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

    FullBroadcastShowdownTurncard()
    {
        console.log ("_________________FullBroadcastShowdownTurncard");
        let listData = [];
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            const player = this.listUsers.GetSocket(i);

            if ( player.strLastBettingAction == 'Fold' )
                continue;
            if ( player.iLocation == -1 || player.bEnable == false )
                continue;


            let objectData = {  strID:player.strID, 
                                iCard1:player.listHandCard[0], 
                                iCard2:player.listHandCard[1],
                            };

            listData.push(objectData);
        }
        
        this.FullBroadcast('SM_ShowDownTurnCard', listData);
    }

    FullBroadcastHandCard()
    {
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            const player = this.listUsers.GetSocket(i);

            if ( player.bEnable == true && player.iLocation != -1 && player.strLastBettingAction != 'Fold' && player.bSpectator == false)
            {
                let listCards = this.listUsers.GetSocket(i).listHandCard;
                console.log("HandCard!!!!!!!!!!!!!!!!!");
                console.log(listCards);
                console.log(player.strID);
                let objectHand = this.ProcessPokerHand(player);

                //this.listUsers.GetSocket(i).emit('SM_HandCard', listCards, objectHand.handname);
                this.listUsers.GetSocket(i).emit('SM_HandCard', listCards, objectHand.handdescr, this.listPots);
            }
        }
    }

    FullBroadcastFlopCard()
    {
        console.log(this.listCardDeck);
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            const player = this.listUsers.GetSocket(i);
            let listCards = this.listTableCard;
            let objectHand = {};            
            console.log(player.bSpectator);
            if(player.bSpectator == false && player.iLocation != -1)
            {
                console.log(player.strID);
                console.log(listCards);
                objectHand = this.ProcessPokerHand(player);
            }
            
            this.listUsers.GetSocket(i).emit('SM_FlopCard', listCards, objectHand.handdescr, this.listPots);
            //this.listUsers.GetSocket(i).emit('SM_FlopCard', listCards, objectHand.handname);
        }
    }

    FullBroadcastTurnCard()
    {
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            const player = this.listUsers.GetSocket(i);
            let listCards = this.listTableCard;
            let objectHand = {};            
            console.log(player.bSpectator);
            if(player.bSpectator == false && player.iLocation != -1)
            {
                console.log(player.strID);
                console.log(listCards);
                objectHand = this.ProcessPokerHand(player);
            }
            this.listUsers.GetSocket(i).emit('SM_TurnCard', listCards, objectHand.handdescr, this.listPots);
            //this.listUsers.GetSocket(i).emit('SM_TurnCard', listCards, objectHand.handname);
        }
    }

    FullBroadcastRiverCard()
    {
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            const player = this.listUsers.GetSocket(i);
            let listCards = this.listTableCard;
            let objectHand = {};            
            console.log(player.bSpectator);
            if(player.bSpectator == false && player.iLocation != -1)
            {
                console.log(player.strID);
                console.log(listCards);
                objectHand = this.ProcessPokerHand(player);
            }
            this.listUsers.GetSocket(i).emit('SM_RiverCard', listCards, objectHand.handdescr, this.listPots);
            //this.listUsers.GetSocket(i).emit('SM_RiverCard', listCards, objectHand.handname);
        }
    }

    FullBroadcastResult()
    {
        let listResult = [];
        let strWinnerHand = '';
        let strWinnerDescr = '';
        const cPlayingUser = this.GetNumPlayingUser();
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            const player = this.listUsers.GetSocket(i);

            if ( player.strLastBettingAction == 'Fold' )
                continue;
                
            if ( player.iLocation == -1 || player.bEnable == false )
                continue;

            //let player = this.listUsers.GetSocket(i);

            let objectData = {  strID:player.strID, 
                                iCard1:player.listHandCard[0], 
                                iCard2:player.listHandCard[1], 
                                strHand:player.strHand,
                                iRank:player.iRank,
                                iWinCoin:player.iWinCoin,
                                iCoin:player.iCoin,
                                iCash:player.iCash,
                                strDescr:player.strDescr
                            };

            listResult.push(objectData);

            if ( player.iRank == 1 )
            {
                strWinnerHand = player.strHand;
                strWinnerDescr = player.strDescr;
            }
        }

        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            this.listUsers.GetSocket(i).emit('SM_Result', listResult, this.listWinCards, strWinnerHand, strWinnerDescr, cPlayingUser, this.listPots);
        }


    }

    // FullBroadcastRebuyIn()
    // {
    //     let listObject = [];

    //     for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
    //     {
    //         let player = this.listUsers.GetSocket(i);
    //         if ( player.iCoin <= 0 )
    //         {
    //             if ( player.iCash >= 100000 )
    //             {
    //                 player.iCoin = 100000;
    //                 player.iCash -= 100000;
    //             }
    //         }

    //         let objectData = 
    //         { 
    //             strID:player.strID,
    //             iCoin:player.iCoin
    //         };
    //         listObject.push(objectData);
    //     }

    //     for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
    //     {
    //         this.listUsers.GetSocket(i).emit('SM_RebuyIn', listObject);
    //     }
    // }

    FullBroadcastRebuyIn()
    {
        let listObject = [];

        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            let player = this.listUsers.GetSocket(i);
            let iBuyIn = parseInt(player.strOptionCode[1]) * 100;
            const iEnableRebuyIn = player.strOptionCode[0];
            console.log(`FullBroadcastRebuyIn (iBuyIn : ${iBuyIn}): ${player.strID} Cash : ${player.iCash}, Option : ${player.strOptionCode}, iCoin : ${player.iCoin}, bMenualRebuyin : ${player.bMenualRebuyin}`);

            let bQuit = false;

            if(player.iCoin <= parseInt(this.iDefaultCoin*2)){
                if ( iEnableRebuyIn == 1)
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
                    player.bMenualRebuyin = false;
                }
                else if(iEnableRebuyIn == 0)//  리바인 사용 안함
                {
                    bQuit = true;
                }
            }
            else if (player.bMenualRebuyin == true) {
                const iRebuyInOdds = iBuyIn;
                const cRebuyInAmount = parseInt(this.iDefaultCoin) * iRebuyInOdds;

                console.log(`RebuyIn : ${iEnableRebuyIn}, Odds ${iRebuyInOdds}, Amount : ${cRebuyInAmount}`);

                // 리바인 사용하거나 수동 리바인 눌렀을떄.
                if (player.iCash >= (cRebuyInAmount - parseInt(player.iCoin))) {
                    // player.iCoin = 100000;
                    // player.iCash -= 100000;
                    player.iCash -= (cRebuyInAmount - parseInt(player.iCoin));
                    player.iCoin = cRebuyInAmount;
                }
                else {
                    console.log(`Auto Quit : Not Enough Cash On RebuyIn`);
                    //player.emit('SM_Quit', {code:'NotEnoughCash'});
                    bQuit = true;
                }
            }
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

    SwitchUser(strID, socket)
    {
        const index = this.FindPlayerIndex(strID);
        if ( index != -1 )
        {

            console.log(`##### SwitchUser : ${index}`);
            this.listUsers.listSockets.splice(index, 1);
            this.listUsers.listSockets.splice(index, 0, socket);

            console.log(`${this.listUsers.listSockets.length}`);
        }
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
    
    FindPlayerIndex(strID)
    {
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            if ( strID == this.listUsers.GetSocket(i).strID )
                return i;
        }
        return -1;
    }

    FindPlayer(strID)
    {
        //console.log("FindPlayer!!!!!!!!!!!!");
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

    // FindNextPlayer(cLocation, cDealerLocation)
    // {
    //     let list = [];
    //     for ( let i = 0; i < 9; ++ i )
    //     //for ( let i = 0; i < this.cMaxPlayer; ++ i )
    //     //for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
    //     {
    //         //const cLoc = (cLocation+i)%9;
    //         const cLoc = Math.floor((cLocation+i)%9);
    //         if ( cLoc != cLocation && cLoc != cDealerLocation )
    //             list.push(cLoc);
    //     }
    //     this.SortLocationList(list, cDealerLocation);
    //     console.log(`IGame::FindNextPlayer cLocation : ${cLocation}, cDealerLocation : ${cDealerLocation}`);
    //     console.log(list);

    //     for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
    //         console.log(`Player Location ${this.listUsers.GetSocket(i).strID}, ${this.listUsers.GetSocket(i).iLocation}`);

    //     for ( let j in list )
    //     {
    //         for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
    //         {
    //             //if ( this.listUsers.GetSocket(i).iLocation == list[j] ) {
    //             if ( this.listUsers.GetSocket(i).iLocation == list[j] && this.listUsers.GetSocket(i).strLastBettingAction != 'Fold' ) {

    //                 console.log(`FindNextUser : ${list[j]}, socket : ${this.listUsers.GetSocket(i).strID}`);

    //                 return this.listUsers.GetSocket(i);
    //             }
    //         }     
    //     }
    //     return null;
    // }
    FindNextPlayer(cLocation, cDealerLocation)
    {
        let list = [];
        for ( let i = 0; i < 9; ++ i )
        {
            const cLoc = Math.floor((cLocation+i)%9);
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
                            this.listUsers.GetSocket(i).strLastBettingAction != 'Fold' && 
                            this.listUsers.GetSocket(i).bEnable == true &&
                            this.listUsers.GetSocket(i).bSpectator == false ) 
                    {

                    console.log(`FindNextUser : ${list[j]}, socket : ${this.listUsers.GetSocket(i).strID}`);

                    return this.listUsers.GetSocket(i);
                }
            }     
        }
        return null;
    }

    // FindNextPlayer(cLocation, cDealerLocation)
    // {
    //     let list = [];
    //     for ( let i = 0; i < this.cMaxPlayer; ++ i )
    //     {
    //         //const cLoc = (cLocation+i)%9;
    //         const cLoc = Math.floor((cLocation+i)%9);
    //         if ( cLoc != cLocation && cLoc != cDealerLocation )
    //             list.push(cLoc);
    //     }
    //     this.SortLocationList(list, cDealerLocation);
    //     console.log(`IGame::FindNextPlayer cLocation : ${cLocation}, cDealerLocation : ${cDealerLocation}`);
    //     console.log(list);

    //     for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
    //         console.log(`Player Location ${this.listUsers.GetSocket(i).strID}, ${this.listUsers.GetSocket(i).iLocation}`);

    //     for ( let j in list )
    //     {
    //         for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
    //         {
    //             //if ( this.listUsers.GetSocket(i).iLocation == list[j] ) {
    //             if ( this.listUsers.GetSocket(i).iLocation == list[j] && this.listUsers.GetSocket(i).strLastBettingAction != 'Fold' ) {

    //                 console.log(`FindNextUser : ${list[j]}, socket : ${this.listUsers.GetSocket(i).strID}`);

    //                 return this.listUsers.GetSocket(i);
    //             }
    //         }     
    //     }
    //     return null;
    // }

    BuildPlayerType()
    {
        console.log(`IGame::BuildPlayerType`);
        //const cMaxUsers = this.listUsers.GetLength();
        let cDealerLocation = 0;
        let iNextLocation = 0;

        //  Default Setting about Player Types
        //  User will get the type based on Default Player types
        let cNumPlayerType = 3;
        let cPlayerType = ['Dealer', 'SB', 'BB'];
        //const cPlayingUser = this.GetNumPlacedUser();
        const cPlayingUser = this.GetNumPlayingUser();
        if ( 2 == cPlayingUser )
        {
            cNumPlayerType = 2;
            cPlayerType = ['Dealer', 'BB'];
        }

        //  Location of the User on the Table
        let listLocations = [];

        //  Initialize All Players Type to null
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            this.listUsers.GetSocket(i).strPlayerType = '';
            //this.listUsers.GetSocket(i).bSpectator = false;
        }
        
        //  Build Location List
        if (this.iDealerLocationLast == -1)
        {
            // listUsers의 길이만큼 반복
            for (let i = 0;  i < this.listUsers.GetLength(); i++) {
                let currentLocation = this.listUsers.GetSocket(i).iLocation;
                // console.log(this.listUsers.GetSocket(i).strID);
                // console.log(currentLocation);
                if (currentLocation != -1) {
                    // console.log(currentLocation);
                    cDealerLocation = currentLocation;
                    break;  // 적절한 위치를 찾았으므로 반복문 종료
                }
            }
            // console.log(cDealerLocation);
            // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        }
        else{
            let player = this.FindNextPlayer(this.iDealerLocationLast, -1);
            cDealerLocation = player.iLocation;
        }
        iNextLocation = cDealerLocation
        listLocations.push(iNextLocation);
        this.Shuffle(cDealerLocation);

        for ( let i = 0; i < this.listUsers.GetLength()-1; ++ i )
        {
            let player = this.FindNextPlayer(iNextLocation, cDealerLocation);

            //  If player is null it's occured Critical-Error!!!
            if ( null != player )
            {
                //  Add next players index to array
                listLocations.push(player.iLocation);
                iNextLocation = player.iLocation;
            }
        }
        console.log("-------------------cDealerLocation : " + cDealerLocation + " iNextLocation : " + iNextLocation);

        //  Setting the Type of Player by PlayerType Constant Values
        for ( let i = 0; i < cNumPlayerType; ++ i )
        {
            console.log(`Find Location ${i}, listLocations ${listLocations[i]}`);
            let player = this.FindPlayerInLocation(listLocations[i]);

            if ( null != player )
            {
                player.strPlayerType = cPlayerType[i];
                player.bNewPlaying = false;
                console.log(`IGame::BuildPlayerType : Player in location ${i} is ${player.strID}`);
            }
            else 
            {
                console.log(`IGame::BuildPlayerType : There is no user in the index ${i}`);
            }
        }

        console.log(`BuildPlayerType : FullBroadcast`);
        this.iDealerLocationLast = cDealerLocation;
        
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

    StartBetting(bPreFlopBetting)
    {
        console.log(`------------------------------------------------------------------------------- StartBetting`);
        this.eState = 'PREFLOP';
        //  Test Console
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            console.log(`strID : ${this.listUsers.GetSocket(i).strID}, strPlayerType : ${this.listUsers.GetSocket(i).strPlayerType}`);

            console.log(`Betting Amount : ${this.listUsers.GetSocket(i).strID}, ${this.listUsers.GetSocket(i).iTotalBettingCoin}`);

            if ( this.listUsers.GetSocket(i).strLastBettingAction != 'Fold' )
                this.listUsers.GetSocket(i).strLastBettingAction = '';
        }
        //

        this.iBettingLocationLast = this.GetDealerLocation();
        if ( bPreFlopBetting == true )
            this.iBettingLocationLast = this.GetBBLocation();
        // const cEnablePlayer = this.GetNumPlayingUser();
        // if ( cEnablePlayer == 2 && bPreFlopBetting == true )
        // {
        //     this.iBettingLocationLast = this.GetNoneDealerLocation();
        // }

        //this.listEnableBettingType = ['Quater', 'Half', 'Full', 'Check', 'Fold', 'Allin'];
        //let cDealerLocation = this.listUsers.GetSocket(this.iDealerIndex).iLocation;
        if ( true == bPreFlopBetting )
        {
            //cDealerLocation = this.iBettingLocationLast;
            this.listEnableBettingType.push('Call');
        }

        //let player = this.FindNextPlayer(-1, cDealerLocation);
        let player = this.FindNextPlayer(this.iBettingLocationLast, -1);
        if ( null != player )
        {
            for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
            {
                let tplay = this.listUsers.GetSocket(i);

                if ( tplay.strID == player.strID )
                {
                    this.iCurrentBettingID = tplay.strID;
                    console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ tplay strID : ${tplay.strID}, bConnection : ${tplay.bConnection}`);

                    if ( tplay.bConnection == true )
                    {
                        const iCallAmount = this.iRecentPlayersBettingCoin - player.iTotalBettingCoin;
                        //this.CalculateEnableBettingList(tplay, 0, bPreFlopBetting);
                        this.CalculateEnableBettingList(tplay, iCallAmount, bPreFlopBetting);
                        tplay.emit('SM_EnableBetting', {iCallAmount:iCallAmount, listEnableBettingType:this.listEnableBettingType, iBettingTime:this.iBettingTime, handcard:tplay.listHandCard, strIDjoker:this.strIDjoker, eState:this.eState, iDefaultCoin:this.iDefaultCoin, tableCards:this.tableCards, iTotalBettingCoin:this.iTotalBettingCoin, iCoin:tplay.iCoin});
                    }
                    else
                    {
                        const iCallAmount = this.iRecentPlayersBettingCoin - player.iTotalBettingCoin;
                        if ( iCallAmount == 0 )
                        {
                            let objectBetting = {strBetting:'Check', iAmount:0};
                            this.ProcessBetting(tplay, objectBetting);
                        }
                        else 
                        {
                            let objectBetting = {strBetting:'Call', iAmount:iCallAmount};
                            this.ProcessBetting(tplay, objectBetting);                            
                        }
                    }
                }
                else
                    tplay.emit('SM_Focus', {strID:player.strID, iBettingTime:this.iBettingTime});
            }

            this.iBettingLocationLast = player.iLocation;
        }
        console.log(`Last Betting Location : ${this.iBettingLocationLast}`);
    }

    CalculateBettingAmount(socket, objectBetting)
    {
        const strBetting = objectBetting.strBetting;

        // if ( strBetting == 'Fold' )
        // {
        //     const cEnablePlayer = this.GetNumPlayingUser();
        //     if ( cEnablePlayer <= 1 )
        //     {
        //         this.SetMode(E.EGameMode.Result);
        //         return;
        //     }
        // }

        const cAmount = parseInt(objectBetting.iAmount);

        const iCallAmount = this.iRecentPlayersBettingCoin - socket.iTotalBettingCoin;
        let iAmount = 0;
        let iPot = this.iTotalBettingCoin;
        let iPotAfterCall = this.iTotalBettingCoin + iCallAmount;

        console.log(`CalculateBettingAmount : strID : ${socket.strID} ${strBetting}, socket.iCoin : ${socket.iCoin}, iPot : ${iPot}, iCall : ${iCallAmount}, PlayerTotalBet : ${socket.iTotalBettingCoin}, RecentPlayerBet : ${this.iRecentPlayersBettingCoin}`);

        switch ( strBetting )
        {
            case 'Quater':
                iAmount = iCallAmount + Math.floor(iPotAfterCall / 4);
                //this.iRecentPlayersBettingCoin = socket.iTotalBettingCoin + iAmount;
                //this.listEnableBettingType = ['Quater', 'Half', 'Full', 'Allin', 'Fold', 'Raise', 'Call'];
                break;
            case 'Half':
                iAmount = iCallAmount + Math.floor(iPotAfterCall / 2);
                //this.iRecentPlayersBettingCoin = socket.iTotalBettingCoin + iAmount;
                //this.listEnableBettingType = ['Half', 'Full', 'Allin', 'Fold', 'Raise', 'Call'];
                break;
            case 'Full':
                iAmount = iCallAmount + iPotAfterCall;
                //this.iRecentPlayersBettingCoin = socket.iTotalBettingCoin + iAmount;
                //this.listEnableBettingType = ['Full', 'Allin', 'Fold', 'Raise', 'Call'];
                break;
            case 'Allin':
                iAmount = socket.iCoin;
                //this.iRecentPlayersBettingCoin = socket.iTotalBettingCoin + iAmount;
                //this.listEnableBettingType = ['Allin', 'Fold', 'Call'];
                break;
            case 'Call':
                //iAmount = this.iRecentPlayersBettingCoin - socket.iTotalBettingCoin;
                iAmount = iCallAmount;
                //this.iRecentPlayersBettingCoin = socket.iTotalBettingCoin + iAmount;
                break;
            case 'Fold':
                iAmount = 0;
                break;
            case 'Check':
                iAmount = 0;
                //this.iRecentPlayersBettingCoin = socket.iTotalBettingCoin + iAmount;
                //this.listEnableBettingType = ['Quater', 'Half', 'Full', 'Allin', 'Fold', 'Raise', 'Check'];
                break;
            case 'Raise':
                //iAmount = (this.iRecentPlayersBettingCoin - socket.iTotalBettingCoin) * 2;
                //iAmount = iCallAmount + iPot * 2;
                iAmount = cAmount;
                //this.iRecentPlayersBettingCoin = socket.iTotalBettingCoin + iAmount;
                //this.listEnableBettingType = ['Allin', 'Fold', 'Raise', 'Call'];
                break;
        }

        console.log(`################################################## BettingAmount Comparing : Client ${cAmount}, Server ${iAmount}`);

        //this.Betting(socket, iAmount, strBetting);
        this.Betting(socket, cAmount, strBetting);

        //this.CalculateEnableBettingList(strBetting);

        // socket.strLastBettingAction = strBetting;
        // socket.iBettingCoin = iAmount;
        // socket.iTotalBettingCoin += iAmount;
        // socket.iCoin -= socket.iBettingCoin;

        // this.iTotalBettingCoin += iAmount;
    }

    CalculateEnableBettingList(player, iCallAmount, bPreFlop)
    {
        this.listEnableBettingType = [];

        this.listEnableBettingType.push('Fold');

        //if ( iCallAmount == 0 || player.iCoin == 0 )
        //if ( (iCallAmount == 0 || player.iCoin == 0) && bPreFlop == false )

        console.log(`####################################################################################################`);
        console.log(`########### CalculateEnableBettingList`);
        console.log(`iCallAmount ${iCallAmount}, eGameMode : ${this.eGameMode}, bPreFlop : ${bPreFlop}`);

        //if ( (iCallAmount == 0 || player.iCoin == 0) && this.eGameMode != E.EGameMode.BettingPreFlop && false == bPreFlop )
        if ( iCallAmount == 0 || player.iCoin == 0 )
        {            
            this.listEnableBettingType.push('Check');
        }
        else
            this.listEnableBettingType.push('Call');
        
        if ( iCallAmount < player.iCoin )
            //this.listEnableBettingType.push('Allin');
            this.listEnableBettingType.push('Raise');

        // const cQuaterAmount = iCallAmount + this.iTotalBettingCoin;
        // const cHalfAmount = ;
        // const cFullAmount = ;

        if ( player.iCoin > 0 && player.iCoin >= iCallAmount ) {
            this.listEnableBettingType.push('Quater');
            this.listEnableBettingType.push('Half');
            this.listEnableBettingType.push('Full');
        }
            

        //if ( player.iCoin)
    }

    // IsBettingComplete()
    // {
    //     let listCheck = [];
    //     let iAmount = 0;
    //     for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
    //     {
    //         const player = this.listUsers.GetSocket(i);
    //         //  Not bet yet
    //         if ( player.strLastBettingAction == '' )
    //         {
    //             listCheck.push(`IsBettingComplete index : ${i}, not bet`);
    //             return false;
    //         }

    //         if ( player.strLastBettingAction != 'Fold' )
    //         {
    //             if ( iAmount == 0 )
    //             {
    //                 iAmount = player.iTotalBettingCoin;
    //                 listCheck.push(`IsBettingComplete index : ${i}, amount : ${iAmount}`);
    //             }
    //             else if ( iAmount > 0 )
    //             {
    //                 if ( player.iTotalBettingCoin != iAmount )
    //                 {
    //                     listCheck.push(`IsBettingComplete index : ${i}, amount : ${iAmount}, player : ${player.iTotalBettingCoin}`);
    //                     return false;
    //                 }
    //             }
    //         }
    //     }
    //     return true;
    // }

    FindUserAtBettingList(listAlign, strID)
    {
        for ( let i in listAlign )
        {
            if ( listAlign[i].strID == strID )
            {
                return i;
            }
        }
        return -1;
    }

    ComputeEachBetting()
    {
        let listPlayerAlign = [];
        for ( let i in this.listBet )
        {
            const index = this.FindUserAtBettingList(listPlayerAlign, this.listBet[i].strID);
            if ( -1 == index )
            {
                listPlayerAlign.push({strID:this.listBet[i].strID, iBet:parseInt(this.listBet[i].iAmount)});
            }
            else
            {
                listPlayerAlign[index].iBet += parseInt(this.listBet[i].iAmount);
            }
        }

        if ( listPlayerAlign.length > 0 )
        {
            let iLowest = listPlayerAlign[0].iBet;
            for ( let i = 1; i < listPlayerAlign.length; ++ i )
            {
                if ( iLowest > listPlayerAlign[i].iBet )
                    iLowest = listPlayerAlign[i].iBet;
            }

            for ( let i in listPlayerAlign )
            {
                listPlayerAlign[i].iBet = iLowest;
            }
        }

        return listPlayerAlign;
    }

    CalculateValidAmount(listAlign, strID, iAmount)
    {
        const index = this.FindUserAtBettingList(listAlign, strID);
        if ( index == -1 )
        {
            console.log(`Error`);
            return 0;
        }
        else
        {
            if ( listAlign[index].iBet <= 0 )
                return 0;
            else if ( listAlign[index].iBet >= iAmount )
            {
                listAlign[index].iBet -= iAmount;
                return iAmount;
            }
            else if ( listAlign[index].iBet < iAmount )
            {
                const cAmount = listAlign[index].iBet;
                listAlign[index].iBet = 0;
                return cAmount;
            }
        }
        return 0;
    }

    UpdateCompletedBetting()
    {
        console.log(`IGame::UpdateComputedBetting`);
        console.log(this.listBet);

        const listData = this.ComputeEachBetting();

        console.log(`Align`);
        console.log(listData);

        for ( let i in this.listBet )
        {
            const iValidAmount = this.CalculateValidAmount(listData, this.listBet[i].strID, this.listBet[i].iAmount);

            console.log(`strID : ${this.listBet[i].strID}, iAmount : ${this.listBet[i].iAmount}, iValidAmount : ${iValidAmount}`);

            this.listDBUpdate.push({
                iDB:E.EDBType.RecordBets, 
                iSubDB:0, 
                strID:this.listBet[i].strID, 
                iAmount:this.listBet[i].iAmount, 
                iValidAmount:iValidAmount, 
                strBetting:this.listBet[i].strBetting, 
                strGroupID:this.listBet[i].strGroupID, 
                iClass:this.listBet[i].iClass});
        }

        this.listBet = [];
    }

    IsBettingComplete()
    {
        let listCheck = [];
        let iAmount = 0;
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            const player = this.listUsers.GetSocket(i);

            console.log(`#IsBettingComplete : ${player.strID} : BetCoin : ${player.iTotalBettingCoin}, MaxBetCoin on Table : ${this.iRecentPlayersBettingCoin}`);

            if ( player.iLocation == -1 )
                continue;

            if ( player.bEnable == false )
                continue;
            
            if ( player.strLastBettingAction == 'Fold' )
                continue;

            //  Not bet yet
            if ( player.strLastBettingAction == '' )
            {
                listCheck.push(`IsBettingComplete index : ${i}, not bet`);
                return false;
            }

            if ( player.iCoin > 0 && player.iTotalBettingCoin < this.iRecentPlayersBettingCoin )
                return false;
        }
        return true;
    }

    IsShowdown()
    {
        let iNumCoinUsers = 0;

        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            const player = this.listUsers.GetSocket(i);

            if ( player.iLocation != -1 && player.bEnable != false && player.strLastBettingAction != 'Fold' && player.iCoin > 0 )
                ++  iNumCoinUsers;
        }

        if ( iNumCoinUsers > 1 )
        {
            return false;
        }

        return true;
    }

    // GetPlayerMaxBetAmount()
    // {
    //     let iTotal = 0;

    //     for ( let i = 0; i < )
    // }

    ProcessNextBetting()
    {
        //
        let player = this.FindNextPlayer(this.iBettingLocationLast, -1);
        if ( null != player )
        {
            let iCallAmount = this.iRecentPlayersBettingCoin - player.iTotalBettingCoin;
            if ( iCallAmount < 0 )
                iCallAmount = 0;
            console.log(`IGame::ProcessBetting CallAmount : ${iCallAmount}, RecentPlayers Coin : ${this.iRecentPlayersBettingCoin}, My Coin : ${player.iTotalBettingCoin}`);

            for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
            {
                let tplay = this.listUsers.GetSocket(i);

                if ( tplay.strID == player.strID )
                {
                    this.iCurrentBettingID = tplay.strID;
                    if ( tplay.bConnection == true )
                    {
                        this.CalculateEnableBettingList(tplay, iCallAmount, false);

                        tplay.emit('SM_EnableBetting', {iCallAmount:iCallAmount, listEnableBettingType:this.listEnableBettingType, iBettingTime:this.iBettingTime,handcard:tplay.listHandCard, strIDjoker:this.strIDjoker, eState:this.eState, iDefaultCoin:this.iDefaultCoin, tableCards:this.tableCards, iTotalBettingCoin:this.iTotalBettingCoin, iCoin:tplay.iCoin});
                    }
                    else
                    {
                        if ( iCallAmount == 0 )
                        {
                            let objectBetting = {strBetting:'Check', iAmount:0};
                            this.ProcessBetting(tplay, objectBetting);
                        }
                        else 
                        {
                            let objectBetting = {strBetting:'Call', iAmount:iCallAmount};
                            this.ProcessBetting(tplay, objectBetting);                            
                        }
                    }
                }
                else
                    tplay.emit('SM_Focus', {strID:player.strID, iBettingTime:this.iBettingTime});
            }


            this.iBettingLocationLast = player.iLocation;
        }
        console.log(`Last Betting Location : ${this.iBettingLocationLast}`);
    }

    Betting(socket, iAmount, strBetting)
    {
        const iBettingCoin = parseInt(iAmount);
        const iPlayerCoin = socket.iCoin - iBettingCoin;

        socket.iCoin = iPlayerCoin;
        socket.iTotalBettingCoin += iBettingCoin;
        socket.iBettingCoin = iBettingCoin;
        socket.strLastBettingAction = strBetting;

        this.iTotalBettingCoin += iBettingCoin;

        //if ( socket.strLastBettingAction != 'Fold' &&)
        if ( this.iRecentPlayersBettingCoin < socket.iTotalBettingCoin )
            this.iRecentPlayersBettingCoin = socket.iTotalBettingCoin;
        this.iBettingLocationLast   = socket.iLocation;

        console.log(`##### Betting : ${socket.strID}, Bet : ${iAmount}, TotalBet : ${socket.iTotalBettingCoin}, TableTotal : ${this.iTotalBettingCoin}`);

        //  Origin
        //this.listDBUpdate.push({iDB:E.EDBType.RecordBets, iSubDB:0, strID:socket.strID, iAmount:iAmount, strBetting:strBetting, strGroupID:socket.strGroupID, iClass:socket.iClass});
        //  Change
        this.listBet.push({iDB:E.EDBType.RecordBets, iSubDB:0, strID:socket.strID, iAmount:iAmount, strBetting:strBetting, strGroupID:socket.strGroupID, iClass:socket.iClass});

        for ( let i = 0; i < this.listUsers.GetLength(); ++i )
        {
            console.log(`id : ${this.listUsers.GetSocket(i).strID}, total-bet : ${this.listUsers.GetSocket(i).iTotalBettingCoin}, action : ${this.listUsers.GetSocket(i).strLastBettingAction}`);
        }

        console.log(`Table : ${this.iTotalBettingCoin}`);

        //this.ProcessPot(socket, iAmount, strBetting);
        this.ProcessPot();
    }

    ProcessBetting(socket, objectBetting)
    {
        this.CalculateBettingAmount(socket, objectBetting);
        this.FullBroadcastBetting(socket, socket.iCoin, socket.iCash, socket.iBettingCoin, objectBetting.strBetting, this.iTotalBettingCoin);

        const cEnablePlayer = this.GetNumPlayingUser();
        console.log(`##### ProcessBetting : NumEnableUser ${cEnablePlayer} to Result`);

        if ( cEnablePlayer <= 1 )
        {
            console.log(`##### ProcessBetting : ${cEnablePlayer} to Result`);

            this.SetMode(E.EGameMode.Result);
            return;
        }
        else if ( this.IsBettingComplete() )
        {
            //  For Rolling 
            this.UpdateCompletedBetting();
            //  end of For Rolling

            //  Checking Showdown
            this.bShowdown = this.IsShowdown();

            if ( this.bShowdown == true )
            {
                this.FullBroadcastShowdown();
                console.log(`############################################### Showdown`);

                this.iDelayTime = 5;
                switch ( this.eGameMode )
                {
                    case E.EGameMode.BettingPreFlop:
                        this.listReservationMode.push(E.EGameMode.Flop);
                        break;
                    case E.EGameMode.BettingFlop:
                        this.listReservationMode.push(E.EGameMode.Turn);
                        break;
                    case E.EGameMode.BettingTurn:
                        this.listReservationMode.push(E.EGameMode.River);
                        break;
                    case E.EGameMode.BettingRiver:
                        this.listReservationMode.push(E.EGameMode.Result);
                    break;
                } 
            }
            else if(this.bShowdown == false)
            {
                console.log(`############################################### NOT Showdown`);
                switch ( this.eGameMode )
                {
                    case E.EGameMode.BettingPreFlop:
                        this.SetMode(E.EGameMode.Flop);
                        break;
                    case E.EGameMode.BettingFlop:
                        this.SetMode(E.EGameMode.Turn);
                        break;
                    case E.EGameMode.BettingTurn:
                        this.SetMode(E.EGameMode.River);
                        break;
                    case E.EGameMode.BettingRiver:
                        this.SetMode(E.EGameMode.Result);
                    break;
                }
            }
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

            console.log(`IGame::Start strID : ${player.strID}`);
            if ( this.listUsers.GetSocket(i).iLocation != -1 )
            {
                console.log(`IGame::Start strID : ${player.strID} Enabled`);
                this.listUsers.GetSocket(i).bEnable = true;
            }                
        }
        return true;
    }

    DefaultAnteSB()
    {
        let socket = null;
        //const cPlayingUser = this.GetNumPlacedUser();
        const cPlayingUser = this.GetNumPlayingUser();
        if ( cPlayingUser == 2 )
            socket = this.FindPlayerFromPlayerType("Dealer");
        else
            socket = this.FindPlayerFromPlayerType("SB");

        //let socket = this.FindPlayerFromPlayerType("SB");
        if ( null != socket )
        {
            console.log(`##### DefaultAnteSB : iBlind ${this.iDefaultCoin}`);
            // first play game sb 1000 betting
            this.FullBroadcastFocus(socket.strID);
            this.Betting(socket, this.iDefaultCoin, 'SB');
            socket.bNewPlaying = false;
            // const iBettingCoin = this.iDefaultCoin;
            // const iPlayerCoin = socket.iCoin - iBettingCoin;
            // socket.iCoin = iPlayerCoin;
            // socket.iTotalBettingCoin += iBettingCoin;
            // this.iTotalBettingCoin += iBettingCoin;
            // this.iRecentPlayersBettingCoin = iBettingCoin;
            // this.iBettingLocationLast   = socket.iLocation;

            const objectData = {
                strID:socket.strID, 
                iCoin:socket.iCoin, 
                iCash:socket.iCash,
                iBettingCoin:this.iDefaultCoin, 
                iTotalBettingCoin:this.iTotalBettingCoin,
                listPots:this.listPots,
            };

            console.log(`IGame::DefaultAnteSB`);
            console.log(objectData);

            if ( socket.bConnection == true )
                socket.emit('SM_DefaultAnteSB', objectData);

            //this.BroadcastDefaultAnteSB(socket, iPlayerCoin, iBettingCoin, this.iTotalBettingCoin);
            this.BroadcastDefaultAnteSB(socket, objectData.iCoin, objectData.iBettingCoin, objectData.iTotalBettingCoin);
            return;
        }
    }

    DefaultAnteBB()
    {
        let socket = this.FindPlayerFromPlayerType("BB");
    
        if ( null != socket )
        {
            console.log(`##### DefaultAnteBB : iBlind ${this.iDefaultCoin}`);

            this.FullBroadcastFocus(socket.strID);

            // const iBettingCoin = this.iDefaultCoin*2;
            // const iPlayerCoin = socket.iCoin - iBettingCoin;
            // socket.iCoin = iPlayerCoin;
            // socket.iTotalBettingCoin += iBettingCoin;
            // this.iTotalBettingCoin += iBettingCoin;
            // this.iBettingLocationLast   = socket.iLocation;
            // this.iRecentPlayersBettingCoin  = iBettingCoin;

            this.Betting(socket, this.iDefaultCoin*2, 'BB');

            const objectData = {
                strID:socket.strID, 
                iCoin:socket.iCoin, 
                iCash:socket.iCash,
                iBettingCoin:this.iDefaultCoin*2, 
                iTotalBettingCoin:this.iTotalBettingCoin,
                listPots:this.listPots,
            };

            if ( socket.bConnection == true )
                socket.emit('SM_DefaultAnteBB', objectData);

            //this.BroadcastDefaultAnteBB(socket, iPlayerCoin, iBettingCoin, this.iTotalBettingCoin);
            this.BroadcastDefaultAnteBB(socket, objectData.iCoin, objectData.iBettingCoin, objectData.iTotalBettingCoin);
        }
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            let player = this.FindPlayerNewPlaying();

            if ( null != player && player.bNewPlaying != false)
            {
                player.bNewPlaying = false;
                this.Betting(player, this.iDefaultCoin*2, 'BB');
                const objectData = {
                    strID:player.strID, 
                    iCoin:player.iCoin,
                    iCash:player.iCash,
                    iBettingCoin:this.iDefaultCoin*2, 
                    iTotalBettingCoin:this.iTotalBettingCoin,
                    listPots:this.listPots,
                };
                socket.emit('SM_DefaultAnteBB', objectData);

                this.BroadcastDefaultAnteBB(player, objectData.iCoin, objectData.iBettingCoin, objectData.iTotalBettingCoin);
            }
            else 
            {
                console.log(`IGame::DefaultAnteBB : There is no user in the index ${i}`);
            }
        }
        //first game join user BB betting
    }

    SetHandCard()
    {
        let iStartLocation = this.iDealerLocationLast;

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
                if ( player.listHandCard.length < 2 && player.strLastBettingAction != 'Fold' && player.bEnable == true )
                {
                    const iCard = this.listCardDeck[this.iCurrentDeckIndex];
                    ++ this.iCurrentDeckIndex;
                    console.log(iCard);
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

    SetFlopCard()
    {
        //let listFlopCard = [];
        for ( let i = 0; i < 3; ++ i )
        {
            const iCard = this.listCardDeck[this.iCurrentDeckIndex];
            ++ this.iCurrentDeckIndex;
            //listFlopCard.push(iCard);

            this.listTableCard.push(iCard);
        }
        this.eState = 'FLOP';
        this.FullBroadcastFlopCard();
    }

    SetTurnCard()
    {
        const iCard = this.listCardDeck[this.iCurrentDeckIndex];
        ++ this.iCurrentDeckIndex;
        //listFlopCard.push(iCard);

        this.listTableCard.push(iCard);
        this.eState = 'TURN';
        this.FullBroadcastTurnCard();
    }

    SetRiverCard()
    {
        const iCard = this.listCardDeck[this.iCurrentDeckIndex];
        ++ this.iCurrentDeckIndex;
        //listFlopCard.push(iCard);

        this.listTableCard.push(iCard);
        this.eState = 'RIVER';
        this.FullBroadcastRiverCard();
    }

    ConvertCardIndex(index)
    {
        const cSuit = ['s', 'h', 'c', 'd'];
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

            if ( this.listUsers.GetSocket(i).strLastBettingAction == 'Fold' )
                continue;
            if ( this.listUsers.GetSocket(i).iLocation == -1 )
                continue;
            if ( this.listUsers.GetSocket(i).bEnable == false )
                continue;
            if ( this.listUsers.GetSocket(i).bSpectator == true)
                continue;

            const objectHand = this.ProcessPokerHand(this.listUsers.GetSocket(i));
            // let listCard = [];

            // for ( let i in this.listTableCard )
            //     listCard.push(this.listTableCard[i]);

            // listCard.push(this.listUsers.GetSocket(i).listHandCard[0]);
            // listCard.push(this.listUsers.GetSocket(i).listHandCard[1]);
            
            // let hand = this.ConvertCardList(listCard);

            // let pokerhand = poker.solve(hand);
            // let handname = pokerhand.name;
            // if ( handname == 'Straight Flush')
            // {
            //     if ( pokerhand.descr == 'Royal Flush' )
            //     handname = 'Royal Flush';
            // }

            // this.listUsers.GetSocket(i).strHand = handname;
            // this.listUsers.GetSocket(i).objectHand = pokerhand;

            this.listUsers.GetSocket(i).strHand = objectHand.handname;
            this.listUsers.GetSocket(i).objectHand = objectHand.pokerhand;
            this.listUsers.GetSocket(i).strDescr = objectHand.handdescr;

            // console.log(listCard);
            // console.log(hand);
            // console.log(pokerhand.name);
        }

        this.ProcessWinner();

        this.FullBroadcastResult();

        //  
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            if ( this.listUsers.GetSocket(i).iLocation == -1 )
                continue;
            if ( this.listUsers.GetSocket(i).bEnable == false )
                continue;
            if ( this.listUsers.GetSocket(i).bSpectator == true)
                continue;

            const cCash = parseInt(this.listUsers.GetSocket(i).iCash) + parseInt(this.listUsers.GetSocket(i).iCoin);
            this.listDBUpdate.push({iDB:E.EDBType.Users, iSubDB:E.EUserDBType.UpdatePoint, strID:this.listUsers.GetSocket(i).strID, iCash:cCash});
        }
    }

    ProcessPokerHand(player)
    {
        let listCard = [];

        for ( let i in this.listTableCard )
            listCard.push(this.listTableCard[i]);

        listCard.push(player.listHandCard[0]);
        listCard.push(player.listHandCard[1]);

        console.log("ProcessPokerHand!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log(listCard);
        
        let hand = this.ConvertCardList(listCard);

        let pokerhand = poker.solve(hand);
        let handname = pokerhand.name;
        if ( handname == 'Straight Flush')
        {
            if ( pokerhand.descr == 'Royal Flush' )
            handname = 'Royal Flush';
        }
        if ( handname == 'Straight')
        {
            if ( pokerhand.descr == 'Straight, A High' )
            handname = 'Mountain';
        }

        return {pokerhand:pokerhand, handname:handname, handdescr:pokerhand.descr};
    }

    ProcessRebuyIn()
    {
        this.FullBroadcastRebuyIn();
    }

    ProcessWinner()
    {
        this.CalculateRank();

        this.CalculatePot();

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

            if ( player.strLastBettingAction == 'Fold' || player.iLocation == -1 || player.bEnable == false )
                continue;

            //if ( this.listUsers)

            list.push(this.listUsers.GetSocket(i).objectHand);
        }

        let iRank = 0;
        while (1)
        {
            let winner = poker.winners(list);
            if ( winner.length > 0 )
            {
                ++ iRank;

                //this.RemoveWinnerList(list, winner[0].name);

                for ( let j in winner )
                {
                    //this.RemoveWinnerList(list, winner[j].descr);
                    this.RemoveWinnerList(list, winner[j]);

                    for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
                    {
                        const player = this.listUsers.GetSocket(i);
    
                        if ( player.iLocation == -1 || player.bEnable == false || player.strLastBettingAction == 'Fold' )
                            continue;
    
                        if ( true == this.IsSameCard(player.objectHand.cards, winner[j].cards) )
                            player.iRank = iRank;
    
                        if ( player.iRank == 1 ) {
                            this.ProcessWinCards(player.objectHand.cards, winner[j].name);
                        }                            
                    }
    
                }
            }

            if ( list.length == 0 )
                break;
        }
    }

    // Divide(iRank)
    // {

    // }

    //
    // RemoveWinnerList(list, strHand)
    // {
    //     for ( let i = 0; i < list.length;)
    //     {
    //         if ( list[i].name == strHand )
    //             list.splice(i, 1);
    //         else 
    //             ++ i;
    //     }
    // }

    // RemoveWinnerList(list, strHandDescr)
    // {
    //     for ( let i = 0; i < list.length;)
    //     {
    //         if ( list[i].descr == strHandDescr )
    //             list.splice(i, 1);
    //         else 
    //             ++ i;
    //     }
    // }

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
            //if ( list[i].descr == strHandDescr )
            // if ( list[i].cards[0].value == objectHand.cards[0].value && 
            //     list[i].cards[1].value == objectHand.cards[1].value && 
            //     list[i].cards[2].value == objectHand.cards[2].value &&
            //     list[i].cards[3].value == objectHand.cards[3].value &&
            //     list[i].cards[4].value == objectHand.cards[4].value )
            if ( true == this.IsSameCard(list[i].cards, objectHand.cards) )
            {
                list.splice(i, 1);
            }                
            else 
                ++ i;
        }
    }

    
    //  ArrangeWinner = () => {
        
    //     let list = [{strID:'test', hand:hand1}, {strID:'test3', hand:hand2}, {strID:'test2', hand:hand3}, {strID:'test5', hand:hand4}, {strID:'test1', hand:hand5}, {strID:'test2', hand:hand6}];
    
    //     while (1)
    //     {
    //         let winner = poker.winners(list);
    //         if ( winner.length > 0)
    //         {
    //             console.log(`rank : ${winner[0].name}, winner length : ${winner.length}`);
                
    //             RemoveWinner(list, winner[0].name);
    
    //             console.log(`list length : ${list.length}`);
    //         }
    //         if ( list.length == 0 )
    //         {
    //             break;
    //         }
    //     }
    //  }
    //

    Shuffle(dealLocation)
    {
        this.listCardDeck = [];
        for (let i = 0; i < 52; ++i)
            this.listCardDeck.push(i);

        this.listCardDeck = this.shuffleArray(this.listCardDeck);

        let players = this.GetPlayingUser();
        let currentLocation = dealLocation;
        let handCards = {};
        let tableCards = null;

        for (let i = 0; i < players.length; i++) {
            console.log(`${players[i].iLocation} , ${currentLocation}`);
            let currentPlayer = players.find(player => player.iLocation == currentLocation);
            //console.log(currentPlayer);
            //if (currentPlayer.eUserType == 'JOKER' && Math.random() < 0.15) {
            if (currentPlayer.eUserType == 'JOKER') {
                console.log("JOKER!!!!");
                let winningType = this.chooseWinningType();
                this.strIDjoker = currentPlayer.strID;
                let { handCards: winningHand, tableCards: cardsOnTable } = this.chooseWinningCards(currentPlayer.iLocation, winningType);
                handCards = { ...handCards, ...winningHand }; // merging winningHand into handCards
                tableCards = cardsOnTable;

                for (let j = 0; j < players.length; j++) {
                    console.log(`${players[j].iLocation} , ${currentPlayer.iLocation}`);
                    if (players[j].iLocation != currentPlayer.iLocation) {
                        console.log(winningType, tableCards, Object.values(handCards).flat());
                        console.log(`!!!!!!!!!!!@@@@@@@@@@@@@@@@`);
                        handCards[players[j].iLocation] = this.chooseLosingHandCards(winningType, tableCards, Object.values(handCards).flat());
                    }
                }
                break;
            }

            if (i < players.length - 1) // 마지막 플레이어가 아닐 경우에만 다음 플레이어 위치를 찾는다.
            {
                currentLocation = this.FindNextPlayer(currentLocation, dealLocation).iLocation;
            }
        }

        if (tableCards && handCards) {
            let sortedHandCards = [];
            let currentLocation = dealLocation;
            
            // 첫 번째 라운드에서 모든 플레이어에게 카드 한 장씩 분배
            for (let i = 0; i < players.length; i++) {
                //console.log(handCards[currentLocation]);
                sortedHandCards.push(handCards[currentLocation][0]);
                if (i < players.length - 1) {
                    currentLocation = this.FindNextPlayer(currentLocation, dealLocation).iLocation;
                }
            }
            
            // 위치 초기화
            currentLocation = dealLocation;
            
            // 두 번째 라운드에서 모든 플레이어에게 카드 한 장씩 분배
            for (let i = 0; i < players.length; i++) {
                sortedHandCards.push(handCards[currentLocation][1]);
                if (i < players.length - 1) {
                    currentLocation = this.FindNextPlayer(currentLocation, dealLocation).iLocation;
                }
            }
            
            console.log(tableCards);
            console.log(sortedHandCards);
            this.listCardDeck = sortedHandCards.concat(tableCards);
            this.tableCards = tableCards;
        }
        else
        {
            this.tableCards = this.listCardDeck.slice(players.length * 2, players.length * 2 + 5);
        }
        
        console.log(this.listCardDeck);
    }

    shuffleArray(array)
    {
        for(let i = array.length - 1; i > 0; i--)
        {
            const j = Math.floor(Math.random() * i)
            const temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }

        return array
    }

    chooseWinningType()
    {
        let rand = Math.random() * 100;

        if (rand < 0.000154) {
            return 'RoyalStraightFlush';
        } else if (rand < 0.00139) {
            return 'StraightFlush';
        } else if (rand < 0.0240) {
            return 'FourOfAKind';
        } else if (rand < 0.1441) {
            return 'FullHouse';
        } else if (rand < 0.1965) {
            return 'Flush';
        } else if (rand < 0.3925) {
            return 'Straight';
        } else if (rand < 2.1128) {
            return 'ThreeOfAKind';
        } else if (rand < 20) {
            return 'TwoPair';
        } else {
            return 'OnePair';
        }
    }
    
    chooseWinningCards(iLocation, handType) {
        let suit, number, startNumber;
        let cards, tableCards, extraCards;
        let handCards = {};
        let exclude;
        let firstPairNumber, secondPairNumber;
        console.log(iLocation, handType);

        switch (handType) {
            case 'HighCard':
                do {
                    cards = this.getUniqueRandomNumbers(7, 0, 51);
                    handCards[iLocation] = [cards.pop(), cards.pop()];
                    tableCards = cards;
                } while (!this.checkForCombination(handCards[iLocation].concat(tableCards), 'HighCard') || handCards[iLocation].length !== 2 || tableCards.length !== 5);
                break;

            case 'OnePair':
                do {
                    exclude = [];
                    number = Math.floor(Math.random() * 13);
                    cards = [number, number + 13];
                    this.shuffleArray(cards);
                    handCards[iLocation] = [cards.pop()];
                    exclude = cards.concat(handCards[iLocation]);
                    extraCards = this.getUniqueRandomNumbers(5, 0, 51, exclude);
                    cards = cards.concat(extraCards);
                    this.shuffleArray(cards);
                    handCards[iLocation].push(cards.pop());
                    //exclude = cards.concat(handCards[iLocation]);
                    //cards = cards.concat(extraCards);
                    tableCards = cards;
                } while (!this.checkForCombination(handCards[iLocation].concat(tableCards), 'OnePair') || handCards[iLocation].length !== 2 || tableCards.length !== 5);
                break;

            case 'TwoPair':
                do {
                    exclude = [];
                    firstPairNumber = Math.floor(Math.random() * 13);
                    do {
                        secondPairNumber = Math.floor(Math.random() * 13);
                    } while (secondPairNumber == firstPairNumber);
                    cards = [firstPairNumber, firstPairNumber + 13, secondPairNumber, secondPairNumber + 13];
                    this.shuffleArray(cards);
                    handCards[iLocation] = [cards.pop()];
                    exclude = cards.concat(handCards[iLocation]);
                    extraCards = this.getUniqueRandomNumbers(3, 0, 51, exclude);
                    cards = cards.concat(extraCards);
                    this.shuffleArray(cards);
                    handCards[iLocation].push(cards.pop());
                    //exclude = cards.concat(handCards[iLocation]);
                    tableCards = cards;
                } while (!this.checkForCombination(handCards[iLocation].concat(tableCards), 'TwoPair') || handCards[iLocation].length !== 2 || tableCards.length !== 5);
                break;

            case 'ThreeOfAKind':
                do {
                    exclude = [];
                    number = Math.floor(Math.random() * 13);
                    cards = [number, number + 13, number + 26];
                    this.shuffleArray(cards);
                    handCards[iLocation] = [cards.pop()];
                    exclude = cards.concat(handCards[iLocation]);
                    extraCards = this.getUniqueRandomNumbers(4, 0, 51, exclude);
                    cards = cards.concat(extraCards);
                    this.shuffleArray(cards);
                    handCards[iLocation].push(cards.pop());
                    //exclude = cards.concat(handCards[iLocation]);                    
                    tableCards = cards;
                } while (!this.checkForCombination(handCards[iLocation].concat(tableCards), 'ThreeOfAKind') || handCards[iLocation].length !== 2 || tableCards.length !== 5);
                break;

            case 'Straight':
                do {
                    exclude = [];
                    startNumber = Math.floor(Math.random() * 9);
                    cards = [];
                    for (let i = 0; i < 5; i++) {
                        cards.push(startNumber + i);
                    }
                    this.shuffleArray(cards);
                    handCards[iLocation] = [cards.pop()];
                    exclude = cards.concat(handCards[iLocation]);
                    extraCards = this.getUniqueRandomNumbers(2, 0, 51, exclude);
                    cards = cards.concat(extraCards);
                    this.shuffleArray(cards);
                    handCards[iLocation].push(cards.pop());
                    //exclude = cards.concat(handCards[iLocation]);
                    tableCards = cards;
                } while (!this.checkForCombination(handCards[iLocation].concat(tableCards), 'Straight') || handCards[iLocation].length !== 2 || tableCards.length !== 5);
                break;

            case 'Flush':
                do {
                    exclude = [];
                    suit = Math.floor(Math.random() * 4);
                    cards = [];
                    for (let i = 0; i < 5; i++) {
                        cards.push(suit * 13 + i);
                    }
                    this.shuffleArray(cards);
                    handCards[iLocation] = [cards.pop()];
                    exclude = cards.concat(handCards[iLocation]);
                    extraCards = this.getUniqueRandomNumbers(2, 0, 51, exclude);
                    cards = cards.concat(extraCards);
                    this.shuffleArray(cards);
                    handCards[iLocation].push(cards.pop());
                    //exclude = cards.concat(handCards[iLocation]);
                    tableCards = cards;
                } while (!this.checkForCombination(handCards[iLocation].concat(tableCards), 'Flush') || handCards[iLocation].length !== 2 || tableCards.length !== 5);
                break;

            case 'FullHouse':
                do {
                    exclude = [];
                    number = Math.floor(Math.random() * 13);
                    let anotherNumber;
                    do {
                        anotherNumber = Math.floor(Math.random() * 13);
                    } while (anotherNumber === number);
                    cards = [number, number + 13, number + 26, anotherNumber, anotherNumber + 13];
                    this.shuffleArray(cards);
                    handCards[iLocation] = [cards.pop()];
                    exclude = cards.concat(handCards[iLocation]);
                    extraCards = this.getUniqueRandomNumbers(2, 0, 51, exclude);
                    cards = cards.concat(extraCards);
                    this.shuffleArray(cards);
                    handCards[iLocation].push(cards.pop());
                    //exclude = cards.concat(handCards[iLocation]);
                    tableCards = cards;
                } while (!this.checkForCombination(handCards[iLocation].concat(tableCards), 'FullHouse') || handCards[iLocation].length !== 2 || tableCards.length !== 5);
                break;

            case 'FourOfAKind':
                do {
                    exclude = [];
                    number = Math.floor(Math.random() * 13);
                    cards = [number, number + 13, number + 26, number + 39];
                    this.shuffleArray(cards);
                    handCards[iLocation] = [cards.pop()];
                    exclude = cards.concat(handCards[iLocation]);
                    extraCards = this.getUniqueRandomNumbers(3, 0, 51, exclude);
                    cards = cards.concat(extraCards);
                    this.shuffleArray(cards);
                    handCards[iLocation].push(cards.pop());
                    //exclude = cards.concat(handCards[iLocation]);
                    tableCards = cards;
                } while (!this.checkForCombination(handCards[iLocation].concat(tableCards), 'FourOfAKind') || handCards[iLocation].length !== 2 || tableCards.length !== 5);
                break;

            case 'StraightFlush':
                do {
                    exclude = [];
                    startNumber = Math.floor(Math.random() * 9);
                    suit = Math.floor(Math.random() * 4);
                    cards = [];
                    for (let i = 0; i < 5; i++) {
                        cards.push(suit * 13 + startNumber + i);
                    }
                    this.shuffleArray(cards);
                    handCards[iLocation] = [cards.pop()];
                    exclude = cards.concat(handCards[iLocation]);
                    extraCards = this.getUniqueRandomNumbers(2, 0, 51, exclude);
                    cards = cards.concat(extraCards);
                    this.shuffleArray(cards);
                    handCards[iLocation].push(cards.pop());
                    //exclude = cards.concat(handCards[iLocation]);
                    tableCards = cards;
                } while (!this.checkForCombination(handCards[iLocation].concat(tableCards), 'StraightFlush') || handCards[iLocation].length !== 2 || tableCards.length !== 5);
                break;

            case 'RoyalFlush':
                do {
                    exclude = [];
                    suit = Math.floor(Math.random() * 4);
                    cards = [suit * 13 + 8, suit * 13 + 9, suit * 13 + 10, suit * 13 + 11, suit * 13 + 12];
                    this.shuffleArray(cards);
                    handCards[iLocation] = [cards.pop()];
                    exclude = cards.concat(handCards[iLocation]);
                    extraCards = this.getUniqueRandomNumbers(2, 0, 51, exclude);
                    cards = cards.concat(extraCards);
                    this.shuffleArray(cards);
                    handCards[iLocation].push(cards.pop());
                    //exclude = cards.concat(handCards[iLocation]);
                    tableCards = cards;
                } while (!this.checkForCombination(handCards[iLocation].concat(tableCards), 'RoyalFlush') || handCards[iLocation].length !== 2 || tableCards.length !== 5);
                break;

            default:
                throw new Error('Invalid hand type');
        }
        // Return the hand cards and table cards
        return { handCards, tableCards };
    }
    
    checkForCombination(cards) {
        if(this.isRoyalFlush(cards)) {
            return true;
        }
        if(this.isStraightFlush(cards)) {
            return true;
        }
        if(this.isFourOfAKind(cards)) {
            return true;
        }
        if(this.isFullHouse(cards)) {
            return true;
        }
        if(this.isFlush(cards)) {
            return true;
        }
        if(this.isStraight(cards)) {
            return true;
        }
        if(this.isThreeOfAKind(cards)) {
            return true;
        }
        if(this.isTwoPair(cards)) {
            return true;
        }
        if(this.isOnePair(cards)) {
            return true;
        }
        if(this.isHighCard(cards))
        {
            return true;
        }
        // If none of the above combinations are found, it means it's a high card
        return false;
    }

    isHighCard(cards) {
        // If none of the other hand types are found, it is a high card
        return !this.isOnePair(cards) &&
            !this.isTwoPair(cards) &&
            !this.isThreeOfAKind(cards) &&
            !this.isStraight(cards) &&
            !this.isFlush(cards) &&
            !this.isFullHouse(cards) &&
            !this.isFourOfAKind(cards) &&
            !this.isStraightFlush(cards) &&
            !this.isRoyalFlush(cards);
    }

    isOnePair(cards) {
        const values = cards.map(card => this.getCardValue(card));
        const valueCounts = new Array(13).fill(0);
        values.forEach(value => valueCounts[value]++);
        return valueCounts.some(count => count === 2);
    }
    
    isTwoPair(cards) {
        const values = cards.map(card => this.getCardValue(card));
        const valueCounts = new Array(13).fill(0);
        values.forEach(value => valueCounts[value]++);
        return valueCounts.filter(count => count === 2).length === 2;
    }
    
    isThreeOfAKind(cards) {
        const values = cards.map(card => this.getCardValue(card));
        const valueCounts = new Array(13).fill(0);
        values.forEach(value => valueCounts[value]++);
        return valueCounts.some(count => count === 3);
    }
    
    isStraight(cards) {
        const values = cards.map(card => this.getCardValue(card)).sort((a, b) => a - b);
        let isStraight = true;
        for (let i = 0; i < values.length - 1; i++) {
            if (values[i + 1] - values[i] !== 1) {
                isStraight = false;
                break;
            }
        }
        // Check for Ace-low straight
        if (!isStraight && values[0] === 0 && values[4] === 12) {
            isStraight = true;
            for (let i = 1; i < values.length - 1; i++) {
                if (values[i + 1] - values[i] !== 1) {
                    isStraight = false;
                    break;
                }
            }
        }
        return isStraight;
    }
    
    isFlush(cards) {
        const suits = cards.map(card => this.getCardSuit(card));
        return suits.every(suit => suit === suits[0]);
    }
    
    isFullHouse(cards) {
        return this.isOnePair(cards) && this.isThreeOfAKind(cards);
    }
    
    isFourOfAKind(cards) {
        const values = cards.map(card => this.getCardValue(card));
        const valueCounts = new Array(13).fill(0);
        values.forEach(value => valueCounts[value]++);
        return valueCounts.some(count => count === 4);
    }
    
    isStraightFlush(cards) {
        return this.isFlush(cards) && this.isStraight(cards);
    }
    
    isRoyalFlush(cards) {
        const values = cards.map(card => this.getCardValue(card)).sort((a, b) => a - b);
        return this.isFlush(cards) && values[0] === 8 && values[4] === 12;
    }

    chooseLosingHandCards(winningType, tableCards, allHandCards) {
        let listdeck = Array.from({length: 52}, (_, i) => i);
        let cardPool = this.removeCardsFromPool(listdeck, [...allHandCards, ...tableCards]);
        // Determine a losing hand type based on the winning type
        let losingHand = this.determineLosingHandType(winningType, tableCards, cardPool);
        
        console.log("chooseLosingHandCards!!!");
        console.log(losingHand);
        // Return the losing hand
        return losingHand;
    }    

    determineLosingHandType(winningType, tableCards, cardPool) {
        let possibleHands = this.getPossibleHands(cardPool, tableCards, winningType);
            
        // sort possibleHands by rank in ascending order
        console.log(winningType,tableCards,cardPool);
        console.log(possibleHands);
        possibleHands.sort((handA, handB) => {
            return this.compareHandRank(this.checkHandRank(handA), this.checkHandRank(handB));
        });
        
        let losingHandType = possibleHands[0];
        
        return losingHandType;
    }
    
    getPossibleHands(cardPool, tableCards, winningType) {
        let possibleHands = [];
        if (winningType === 'HighCard') {
            for (let i = 0; i < cardPool.length - 1; i++) {
                for (let j = i + 1; j < cardPool.length; j++) {
                    let fullHand = [cardPool[i], cardPool[j], ...tableCards];
                    let handRank = this.checkHandRank(fullHand);
                    if (handRank === 'HighCard') {
                        possibleHands.push([cardPool[i], cardPool[j]]);
                    }
                }
            }
        } else {
            for (let i = 0; i < cardPool.length - 1; i++) {
                for (let j = i + 1; j < cardPool.length; j++) {
                    let fullHand = [cardPool[i], cardPool[j], ...tableCards];
                    let handRank = this.checkHandRank(fullHand);
                    if (this.compareHandRank(handRank, winningType) < 0) {
                        possibleHands.push([cardPool[i], cardPool[j]]);
                    }
                }
            }
        }
        return possibleHands;
    }

    checkHandRank(hand) {
        hand.sort((a, b) => this.getCardValue(b) - this.getCardValue(a));
    
        let sameCards = 1;
        let pairs = [];
        let triples = [];
        let fourOfAKind = [];
        for (let i = 0; i < hand.length - 1; i++) {
            if (this.getCardValue(hand[i]) === this.getCardValue(hand[i + 1])) {
                sameCards++;
            } else {
                if (sameCards === 2) pairs.push(this.getCardValue(hand[i]));
                else if (sameCards === 3) triples.push(this.getCardValue(hand[i]));
                else if (sameCards === 4) fourOfAKind.push(this.getCardValue(hand[i]));
    
                sameCards = 1;
            }
        }
    
        // Add the last card to the appropriate array
        if (sameCards === 2) pairs.push(this.getCardValue(hand[hand.length - 1]));
        else if (sameCards === 3) triples.push(this.getCardValue(hand[hand.length - 1]));
        else if (sameCards === 4) fourOfAKind.push(this.getCardValue(hand[hand.length - 1]));
    
        let straight = this.isStraighthand(hand);
        let flush = this.isFlushhand(hand);
        if (straight && flush) {
            return this.getCardValue(hand[0]) === 12 ? 'RoyalFlush' : 'StraightFlush';
        }
    
        if (fourOfAKind.length === 1) return 'FourOfAKind';
    
        if (triples.length === 1 && pairs.length > 0) return 'FullHouse';
    
        if (flush) return 'Flush';
    
        if (straight) return 'Straight';
    
        if (triples.length === 1) return 'ThreeOfAKind';
    
        if (pairs.length === 2) return 'TwoPair';
    
        if (pairs.length === 1) return 'OnePair';
    
        return 'HighCard';
    }
    
    isStraighthand(hand) {
        for (let i = 0; i < hand.length - 1; i++) {
            if (this.getCardValue(hand[i]) - 1 !== this.getCardValue(hand[i + 1])) {
                return false;
            }
        }
    
        if (this.getCardValue(hand[hand.length - 1]) === 0 && this.getCardValue(hand[0]) === 12) return true;
    
        return true;
    }
    
    isFlushhand(hand) {
        for (let i = 0; i < 4; i++) {
            if (this.getCardSuit(hand[i]) !== this.getCardSuit(hand[i + 1])) {
                return false;
            }
        }
        return true;
    }
    
    compareHandRank(a, b) {
        let pokerHandRank = ['HighCard', 'OnePair', 'TwoPair', 'ThreeOfAKind', 'Straight', 'Flush', 'FullHouse', 'FourOfAKind', 'StraightFlush', 'RoyalFlush'];
        return pokerHandRank.indexOf(a) - pokerHandRank.indexOf(b);
    }
    
    getUniqueRandomNumbers(count, min, max, exclude = []) {
        let numbers = [];
    
        while (numbers.length < count) {
            let num = Math.floor(Math.random() * (max - min + 1)) + min;
    
            // 이미 선택된 숫자나 제외해야하는 숫자가 아닌 경우에만 숫자를 추가합니다.
            if (!numbers.includes(num) && !exclude.includes(num)) {
                numbers.push(num);
            }
        }
    
        return numbers;
    }

    removeCardsFromPool(cardPool, cardsToRemove) {
        return cardPool.filter(card => !cardsToRemove.includes(card));
    }

    getCardValue(card) {
        return card % 13;
    }
    
    getCardSuit(card) {
        return Math.floor(card / 13);
    }

    IsCompleteHandCard()
    {
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            let player = this.listUsers.GetSocket(i);

            if ( player.strLastBettingAction == 'Fold' || player.iLocation == -1 || player.bEnable == false )
                continue;

            if ( player.listHandCard.length != 2 )
            {
                console.log(`IGame::IsCompleteHandCard => HandCard Length : ${player.listHandCard.length}`);
                return false;
            }
        }
        return true;
    }

    StartGame()
    {
        this.Start();
        console.log(`IGame::StartGame`);
        //const cPlayingUser = this.GetNumPlacedUser();
        const cPlayingUser = this.GetNumPlayingUser();
        //this.Shuffle();
        console.log(`IGame::StartGame => cPlayingUser : ${cPlayingUser}, GameMode ${this.eGameMode}`);
        if ( cPlayingUser >= this.cMinEnablePlayer && this.eGameMode == E.EGameMode.Start )
        {
            this.SetMode(E.EGameMode.BuildPlayerType);
            return true;
        }

        return false;
    }

    PrintRoomUsers()
    {
        console.log(`################################################## Room ${this.strGameName}, iCoin ${this.iDefaultCoin} : Users`);
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            console.log(`strID : ${this.listUsers.GetSocket(i).strID}, eUserType:${this.listUsers.GetSocket(i).eUserType}, eStage : ${this.listUsers.GetSocket(i).eStage}, eLocation : ${this.listUsers.GetSocket(i).iLocation}`);
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
            if ( player.iLocation != -1 && player.bEnable == true  && player.bSpectator == false)
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
        let strWinner = '';

        for ( let i in this.listPots )
        {
            let listWinner = this.CalculatePotWinner(this.listPots[i]);

            if ( listWinner.length <= 0 )
                continue;

            console.log(`listWinner length : ${listWinner.length}, PotAmount ${this.listPots[i].iPotAmount}`);

            let iWinCoin = Math.floor(this.listPots[i].iPotAmount / listWinner.length);

            //iWinCoin = iWinCoin - parseInt(iWinCoin * global.fHoldemFee * 0.01);

            for ( let j in listWinner )
            {
                // if ( strWinner != '' )
                // {
                //     strWinner += ',';
                // }

                let winner = this.FindPlayer(listWinner[j]);
                if ( winner != null )
                {
                    console.log(`winner coin update : Win : ${iWinCoin}, winner.iWinCoin : ${winner.iWinCoin}`);
                    if(winner.iRank == 1)
                    {
                        iWinCoin = iWinCoin - parseInt(iWinCoin * global.fHoldemFee * 0.01);
                        if (strWinner.includes(winner.strID))
                        {
                            let previousCoins = Number(strWinner.split(":")[1]);
                            iWinCoin += previousCoins;
                            strWinner = `${winner.strID}:${iWinCoin}`;
                        }
                        else
                        {
                            strWinner += `${winner.strID}:${iWinCoin}`;
                        }
                    }
                    winner.iWinCoin += iWinCoin;
                    winner.iCoin += iWinCoin;
                }                
            }
        }
        
        let strDesc = '';
        let strHand = '';
        let strTablecard = '';
        let strWincard = '';
        let iStartCoin = 0;
        for ( let j = 0; j < this.listUsers.GetLength(); ++ j )
        {
            if ( strDesc != '' )
            {
                strDesc += ',';
                strHand += ',';
            }

            let player = this.listUsers.GetSocket(j);

            iStartCoin = player.iStartCoin;
            strDesc += `${player.strID}:${player.iTotalBettingCoin}`;
            let handList = [];
            let idList = [];
            for( let k in player.listHandCard ){
                let card = player.listHandCard[k];
                let id = player.strID;
                if(!idList.includes(id)){
                    idList.push(id);
                    handList.push(`${id}:${card}`);
                } else {
                    handList[idList.indexOf(id)] += `/${card}`;
                }
            }
            strHand += handList.join(',');
        }
        if(this.listTableCard.length == 0)
        {
            strTablecard = 'not';
        }
        else
        {
            for( let j in this.listTableCard )
            {
                if ( strTablecard != '' )
                {
                    strTablecard += ',';
                }
                strTablecard += `${this.listTableCard[j]}`;
            }
            if(this.listWinCards.length != 0)
            {
                for( let j in this.listWinCards )
                {
                    if ( strWincard != '' )
                    {
                        strWincard += ',';
                    }
                    strWincard += `${this.listWinCards[j]}`;
                }
            }
            else
            {
                strWincard = 'not';
            }
        }
        
        console.log(`strHand : ${strHand} iStartcoin : ${iStartCoin} strTablecard : ${strTablecard} strWincard : ${strWincard}`);
        console.log(`#######@@############################################################################################## updatedb caculatepot`);
        this.listDBUpdate.push({iDB:E.EDBType.RecodrdGames, iSubDB:0, lUnique:this.lUnique, strWinner:strWinner, strDesc:strDesc, iStartCoin:iStartCoin, strHand:strHand, strTablecard:strTablecard, iJackpot:'0'});
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
        // let iLength = 0;
        // switch ( strHand )
        // {
        //     case 'Pair':
        //         iLength = 2;
        //         break;
        //     case 'Two Pair':
        //         iLength = 4;
        //         break;
        //     case 'Three of a Kind':
        //         iLength = 3;
        //         break;
        //     case 'Straight':
        //         iLength = 5;
        //         break;
        //     case 'Flush':
        //         iLength = 5;
        //         break;
        //     case 'Full House':
        //         iLength = 5;
        //         break;
        //     case 'Four of a Kind':
        //         iLength = 4;
        //         break;
        //     case 'Straight Flush':
        //         iLength = 5;
        //         break;
        //     case 'Royal Flush':
        //         iLength = 5;
        //         break;
        // }

        //const iLength = 5;
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