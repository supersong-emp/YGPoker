var express = require('express');
const app = express();
var path = require('path');
const server = require('http').Server(app);
const io = require('socket.io')(server,{});
const cors = require('cors');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/account', require('./routes/account'));
app.use('/robot', require('./routes/robot'));

const db = require('./db');
db.sequelize.sync();

db.Fees.findOne().then((fee) => {

    console.log(`fee : ${fee.fHoldem}`);

    global.fHoldemFee = fee.fHoldem;

});


let Instance = require('./game/IGameInstance');
let IGameManager = require('./game/IGameManager');

let kGameManager = new IGameManager();
let instanceGame = new Instance(io, '/game', kGameManager);

instanceGame.OnIO(io);

global.strLobbyAddress = 'http://localhost:7000';
//global.strLobbyAddress = 'http://157.230.38.106:7000';

app.get('/', (req, res) => {
    res.send('welcome');
})

app.get('/robot', (req, res) => {
    res.render('robot');
})

app.post('/game', (req, res) => {

    console.log(`/game`);

    console.log(req.body);

    let account = {strID:req.body.strID, strPassword:req.body.strPassowrd, lUnique:req.body.lUnique, iCoin:req.body.iCoin, iAvatar:req.body.iAvatar, strOptionCode:req.body.strOptionCode, strGroupID:req.body.strGroupID, iClass:req.body.iClass, eUserType:req.body.eUserType};
    res.render('game', {account:account});
});


app.post('/create', (req, res) => {

    console.log(`/create`);
    console.log(req.body);
    console.log(req.body.strID);

    let data = req.body;

    let player = instanceGame.FindUser(req.body.strID);
    if ( null != player )
    {
        res.send({result:'Error', error:'AlreadyPlaying'});
    }
    else
    {
        //let result = this.GameManager.QuickJoin()
        //let result = kGameManager.QuickJoin(data.strRoomName, data.strPassword, data.iDefaultCoin, data.iBuyIn, data.iBettingTime, data.iNumPlayers, null);
        //let result = kGameManager.CreateGame(data.strRoomName, data.strPassword, data.iDefaultCoin, data.iBuyIn, data.iBettingTime, data.iMaxPlayer);
        
        let result = kGameManager.CreateGame(data.strRoomName, data.eGameType, data.strPassword, data.iDefaultCoin, data.iBettingTime, data.iMaxPlayer);
        //console.log(result);

        let listPlayer = [];
        for ( let i = 0; i < result.listUsers.GetLength(); ++ i )
        {
            const player = result.listUsers.GetSocket(i);
            //console.log(player);
            //const iCoin = player.iCoin+player.iCash;
            listPlayer.push({strID:player.strID, iCoin:player.iCoin, iLocation:player.iLocation, iAvatar:player.iAvatar});
        }

        if ( result != null )
        {
            res.send(
                {
                    result:'OK', 
                    lUnique:result.lUnique,
                    strGameName:result.strGameName,
                    eGameType:result.eGameType,
                    strPassword:result.strPassword,
                    iDefaultCoin:result.iDefaultCoin,
                    //iBuyIn:result.iBuyIn,
                    iBettingTime:result.iBettingTime,
                    iMaxPlayer:result.cMaxPlayer,
                    //iNumPlayer:result.listUsers.GetLength()
                    iNumPlayer:1,
                    listPlayer:listPlayer
                }
            );
        }
        else
        {
            res.send({result:'Error', error:'CantMakeRoom'});
        }
    }
});

app.post('/roominfo', (req, res) => {

    console.log(`/roominfo`);
    console.log(req.body);
    console.log(req.body.strID);

    let data = req.body;

    let result = kGameManager.GetRoomInfo(data.lUnique);
    if ( result != null )
    {
        let listPlayer = [];
        for ( let i = 0; i < result.listUsers.GetLength(); ++ i )
        {
            const player = result.listUsers.GetSocket(i);
            //console.log(player);
            //const iCoin = player.iCoin+player.iCash;
            listPlayer.push({strID:player.strID, iCoin:player.iCoin, iLocation:player.iLocation, iAvatar:player.iAvatar});
        }

        res.send(
            {
                result:'OK', 
                lUnique:result.lUnique,
                strGameName:result.strGameName,
                eGameType:result.eGameType,
                strPassword:result.strPassword,
                iDefaultCoin:result.iDefaultCoin,
                iBettingTime:result.iBettingTime,
                iMaxPlayer:result.cMaxPlayer,
                iNumPlayer:result.listUsers.GetLength(),
                listPlayer:listPlayer
            }
        );
    }
    else
    {
        res.send({result:'Error', error:'NotExistRoom',lUnique:data.lUnique});
    }
});


app.post('/join', (req, res) => {

    console.log(`/join`);
    console.log(req.body);
    console.log(req.body.strID);

    let data = req.body;

    let player = instanceGame.FindUser(req.body.strID);
    if ( null != player )
    {
        res.send({result:'Error', error:'AlreadyPlaying'});
    }
    else
    {
       //let result = this.GameManager.QuickJoin()
        //let result = kGameManager.Join(data.lUnique, null);
        let result = kGameManager.CheckJoin(data.lUnique, null);
        let iBuyin = parseInt(req.body.strOptionCode[1]) *100;

        let listPlayer = [];
        for ( let i = 0; i < result.listUsers.GetLength(); ++ i )
        {
            const player = result.listUsers.GetSocket(i);
            //console.log(player);
            //const iCoin = player.iCoin+player.iCash;
            listPlayer.push({strID:player.strID, iCoin:player.iCoin, iLocation:player.iLocation, iAvatar:player.iAvatar});
        }
        if ( result != null )
        {
            if ( parseInt(iBuyin) <= parseInt(req.body.iCoin) )
            {
                res.send(
                    {
                        result:'OK', 
                        lUnique:result.lUnique,
                        strGameName:result.strGameName,
                        eGameType:result.eGameType,
                        strPassword:result.strPassword,
                        iDefaultCoin:result.iDefaultCoin,
                        //iBuyIn:result.iBuyIn,
                        iBettingTime:result.iBettingTime,
                        iMaxPlayer:result.cMaxPlayer,
                        iNumPlayer:result.listUsers.GetLength(),
                        listPlayer:listPlayer
                    }
                );
            }
            else
            {
                res.send({result:'Error', error:'NotEnoughCoin'});
            }
        }
        else
        {
            res.send({result:'Error', error:'NotExistRoom',lUnique:data.lUnique});
        }
    }
});

app.post('/quickjoin', (req, res) => {

    console.log(`/quickjoin`);
    console.log(req.body);
    console.log(req.body.strID);

    let data = req.body;

    let player = instanceGame.FindUser(req.body.strID);
    if ( null != player )
    {
        res.send({result:'Error', error:'AlreadyPlaying'});
    }
    else
    {
        //let result = this.GameManager.QuickJoin()
        let result = kGameManager.QuickJoin(data.strRoomName, data.eGameType, data.strPassword, data.iDefaultCoin, data.iBettingTime, data.iNumPlayers, null);

        let listPlayer = [];
        for ( let i = 0; i < result.listUsers.GetLength(); ++ i )
        {
            const player = result.listUsers.GetSocket(i);
            //console.log(player);
            //const iCoin = player.iCoin+player.iCash;
            listPlayer.push({strID:player.strID, iCoin:player.iCoin, iLocation:player.iLocation, iAvatar:player.iAvatar});
        }
        if ( result != null )
        {
            res.send(
                {
                    result:'OK', 
                    lUnique:result.lUnique,
                    strGameName:result.strGameName,
                    eGameType:result.eGameType,
                    strPassword:result.strPassword,
                    iDefaultCoin:result.iDefaultCoin,
                    //iBuyIn:result.iBuyIn,
                    iBettingTime:result.iBettingTime,
                    iMaxPlayer:result.cMaxPlayer,
                    iNumPlayer:result.listUsers.GetLength(),
                    listPlayer:listPlayer
                }
            );
        }
        else
        {
            res.send({result:'Error', error:'CantJoin'});
        }
    }
});

app.post('/request_roomlist', async (req, res) => {

    console.log('/request_roomlist');

    let list = [];
    for ( let i in kGameManager.listGames )
    {
        let game = kGameManager.listGames[i];

        let strUsers = '';
        //for ( let i in game.listUsers )
        for ( let i = 0; i < game.listUsers.GetLength(); ++ i )
        {
            const player = game.listUsers.GetSocket(i);
            strUsers+=`(${player.strID}:${player.iCoin})`;
        }

        let objectData = {
            
            lUnique:game.lUnique, 
            strGameName:game.strGameName,
            strPassword:game.strPassword,
            iDefaultCoin:game.iDefaultCoin,
            //iBuyIn:game.iBuyIn,
            iBettingTime:game.iBettingTime,
            iMaxPlayer:game.cMaxPlayer,
            iNumPlayer:game.listUsers.GetLength(),
            strUsers:strUsers,
        };

        list.push(objectData)
    }

    console.log(list);

    res.send(list);
});

const cPort = 5555;

server.listen(cPort, ()=> {

    console.log(`IOCGames Server Started At ${cPort}`);

    //console.log(`value is ${8000/10000}`);
})

setInterval(async () => {

    kGameManager.Update();

    await kGameManager.UpdateDB();
    //instanceApp.Update();

    //instanceGame.PrintLobbyUsers();

}, 1000);
