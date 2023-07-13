var createError = require('http-errors');
var express = require('express');
const app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const server = require('http').Server(app);
const io = require('socket.io')(server,{});

const cors = require('cors');
//const layout = require('express-ejs-layouts');

const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const passportconfig = require('./passport');

const schedule = require('node-schedule');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.use(layout);
// app.set('layout', 'common/layout');
// app.set('layout extractScripts', true);

app.use(cors());

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'administrator#',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: (4 * 60 * 60 * 1000) },
    passport: {}
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passportconfig();

schedule.scheduleJob('0 0 0 * * *', async()=> {
//schedule.scheduleJob('* * * * * *', async()=> {

    let users = await db.Users.findAll();

    for ( let i in users )
    {
        await db.Users.update({iCashBase:users[i].iCash, iPointBase:users[i].iPoint}, {where:{id:users[i].id}});
    }
    
});


// db
const db = require('./db');
db.sequelize.sync();

app.use('/account', require('./routes/account'));
app.use('/announcement', require('./routes/announcement'));


//global.strGameAddress = 'http://localhost:5555'
//global.strGameAddress = 'http://157.230.38.106:5555';
global.strGameAddress = 'https://ygpo888.net';

//global.strBig2Address = 'http://localhost:5556';
global.strBig2Address = 'https://ygpokerbig2.net';

let Instance = require('./game/ILobby');
const { get } = require('http');
//let IGameManager = require('./game/IGameManager');

//let kGameManager = new IGameManager();
//let instanceApp = new Instance(io, '/', null, null);
let 
instanceApp = new Instance(io, '/');
//let instanceGame = new Instance(io, '/game', kGameManager, 'Game');

instanceApp.OnIO(io);
// instanceGame.OnIO(io);

const cPort = 7000;

app.get('/', (req, res) => {
    //res.render('login');

    // if ( req.user == null )
    //     res.redirect('/account/login');
    
    // else
    //     res.redirect('/');
    console.log(req.user);
    let iLogin = 0;
    if ( req.user != null )
        iLogin = 1;
    res.render('index', {iLogin:iLogin, user:req.user});

});

app.get('/lobby', (req, res) => {

    console.log(`/lobby`);

    if ( req.user == null )
        res.redirect('/account/login');
    else
    {
        console.log(req.user.strID);

        //let account = {strID:req.user.strID, strPassword:req.user.strPassword, iCoin:req.user.iCash, iAvatar};
        let account = req.user;
        res.render('lobby', {iLayout:0, account:account, user:req.user, rooms:instanceApp.listRooms});
    }
});

// let GetAddress = (eGameType) => {

//     switch ( eGameType )
//     {
//         case '0':
//             return '157.230.38.106:5555/game';
//             //return 'localhost:5555/game';
//     }
//     return '';
// }

// app.post('/game', (req, res) => {

//     console.log('/game');
//     console.log(req.body);

//     const strAddress = GetAddress(req.body.eGameType);

//     let account = {strAddress:strAddress, strID:req.user.strID, strPassword:req.user.strPassowrd, lUnique:req.body.lUnique, iCoin:req.body.iCoin};
//     res.render('game', {account:account});
// });

app.post('/login', (req, res) => {

    console.log(req.body);

    let account = {strID:req.body.strID, strPassword:req.body.strPassword};

    res.render('game', {account:account});
});

app.post('/removeroom', (req, res) => {

    console.log(`/removeroom`);
    console.log(req.body);

    instanceApp.RemoveRoom(req.body.lUnique);
});

app.post('/leaveroom', (req, res) => {

    console.log(`/leaveroom`);
    console.log(req.body);

    instanceApp.LeaveRoom(req.body.lUnique);

});

app.post('/quitroom', (req, res) => {

    console.log(`/removeroom`);
    console.log(req.body);

    instanceApp.LeaveGame(req.body.strID);
});

app.post('/request_roomlist', async (req, res) => {

    console.log('/request_roomlist');

    let list = [];
    for ( let i in instanceApp.listRooms )
    {
        let objectData = instanceApp.listRooms[i];

        list.push(objectData)
    }
    res.send(list);
});

app.post('/request_onlineuser', async (req, res) => {

    console.log('/request_onlineuser');
    console.log(`${instanceApp.listUsers.GetLength()}`);
    let listUsers = [];

    for ( let i = 0; i < instanceApp.listUsers.GetLength(); ++ i )
    {
        if ( instanceApp.listUsers.GetSocket(i).strID != undefined )
        {
            listUsers.push(instanceApp.listUsers.GetSocket(i).strID);
        }
    }

    console.log(listUsers);

    res.send({result:'OK', list:listUsers});
});

server.listen(cPort, ()=> {

    console.log(`YGGames Server Started At ${cPort}`);

    //console.log(`value is ${8000/10000}`);
});

setInterval(async () => {

//    kGameManager.Update();

    instanceApp.Update();

}, 1000);