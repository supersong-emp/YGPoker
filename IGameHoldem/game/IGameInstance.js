let ISocketList = require('./ISocketList');

let axios = require('axios');

class IGameInstance
{
    constructor(io, namespaceIO, kGameManager)
    {
        this.io = io;
        this.namespaceIO = io.of(namespaceIO);
        this.listUsers = new ISocketList();

        this.GameManager = kGameManager;
    }

    async RequestAxios(strAddress, objectData)
    {
        console.log(`IGameInstance::RequestAxios ${strAddress}`);
        console.log(objectData);

        try {

            const customAxios = axios.create({});
            const response = await customAxios.post(strAddress, objectData, {headers:{ 'Accept-Encoding': 'application/json'}});
            console.log(response.data);
            if ( response.data.result == 'OK' )
                return {result:'OK', data:response.data};
            else
                return {result:'error', error:response.data.error};    
        }
        catch (error) {

            return {result:'error', error:'axios'};

        }
    }

    // async RequestAxios(strAddress, objectData)
    // {
    //     console.log(`IGameInstance::RequestAxios ${strAddress}`);
    //     console.log(objectData);

    //     try {

    //         const response = await axios.post(strAddress, objectData);
    //         console.log(response.data);
    //         if ( response.data.result == 'OK' )
    //             return {result:'OK', data:response.data};
    //         else
    //             return {result:'error', error:response.data.error};    
    //     }
    //     catch (error) {

    //         return {result:'error', error:'axios'};

    //     }
    // }

    FindUser(strID)
    {
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            if ( this.listUsers.GetSocket(i).strID == strID )
                return this.listUsers.GetSocket(i);
        }
        return null;
    }

    OnIO(io)
    {
        this.namespaceIO.on('connection', (socket) => {

            console.log(`#---------------------------------- Socket Connection : ${socket.id}`);
            socket.eStage = 'STANDBY';
            socket.bConnection = true;
            //console.log(socket);
            this.AddUser(socket);
            if ( socket.strID == undefined )
            {
                console.log(`Emit SM_RequestLogin`);
                socket.emit('SM_RequestLogin');
            }

            socket.on('disconnect', async ()=> {

                let lUnique = socket.lUnique;
                console.log(`#---------------------------------- Socket Disconnection : ${socket.id}, ${socket.strID}, ${socket.eStage}, ${socket.lUnique}`);

                socket.bConnection = false;

                if ( true == this.GameManager.Leave(socket) )
                {
                    this.RemoveUser(socket);

                    //await this.RequestAxios('http://localhost:7000/removeroom', {lUnique:lUnique});
                    await this.RequestAxios(`${global.strLobbyAddress}/removeroom`, {lUnique:lUnique});
                }
                else
                {
                    this.RemoveUser(socket);

                    await this.RequestAxios(`${global.strLobbyAddress}/leaveroom`, {lUnique:lUnique});                    
                }

                this.PrintLobbyUsers();

                // //if ( socket.eStage == 'LOBBY' )
                // if ( socket.lUnique == undefined || socket.lUnique == -1 )
                // {
                //     this.RemoveUser(socket);
                // }
                // //else if ( socket.eStage == 'GAME' )
                // else
                // {
                //     this.GameManager.Leave(socket);
                // }
            });

            // this.GameManager.OnIO(io);

            socket.on('CM_Login', (strID, strPassword, iAvatar, eUserType) => {

                console.log(`CM_Login`);

                socket.strID = strID;
                socket.strPassword = strPassword;
                socket.eStage = 'LOBBY';
                socket.iLocation = -1;
                //socket.iCoin = 100000;
                socket.iAvatar = iAvatar;
                socket.eUserType = eUserType;
                // socket.iCoin = this.iCoinList[this.iCurrentCoin];
                // this.iCurrentCoin ++;
                // this.iCurrentCoin = Math.floor(this.iCurrentCoin%5);
                //socket.iCash = 200000;

                console.log(`${socket.strID}, ${socket.eStage}, ##### CM_Login Avatar : ${iAvatar}, eUserType : ${eUserType}`);

                this.PrintLobbyUsers();

                socket.emit('SM_Login', {result:'OK', strID:strID, iCoin:socket.iCoin, iAvatar:iAvatar, eUserType:eUserType});
           });

        socket.on('CM_JoinGame', (strID, lUnique, iCoin, iAvatar, strOptionCode, strGroupID, iClass, eUserType) => {

            console.log(`CM_JoinGame`);
            console.log(`strID : ${strID}, iCoin : ${iCoin}, lUnique : ${lUnique}, Avatar : ${iAvatar}, strGroupID : ${strGroupID}, eUserType : ${eUserType}`);

            socket.strID = strID;
            //socket.strPassword = strPassword;
            socket.eStage = 'LOBBY';
            socket.iLocation = -1;
            // socket.iCoin = iCoin;
            socket.iAvatar = iAvatar;
            socket.eUserType = eUserType;
            socket.strOptionCode = strOptionCode;
            socket.strGroupID = strGroupID;
            socket.iClass = iClass;
            let iBuyIn = parseInt(strOptionCode[1]) * 100;

            let instanceRoom = this.GameManager.Join(lUnique, socket);
            if ( instanceRoom != null )
            {
                console.log(`======================================= ${iBuyIn} : ${instanceRoom.iDefaultCoin}`);
                let iCash = parseInt(iCoin)-(parseInt(iBuyIn)*parseInt(instanceRoom.iDefaultCoin));
                if ( iCash < 0 )
                {
                    socket.emit('SM_Error', {error:'NotEnoughCoin'});
                }
                else
                {
                    console.log(`##### bRejoin : ${socket.bRejoin}`);
                    if ( socket.bRejoin == false )
                    {
                        socket.iCoin = (parseInt(iBuyIn)*parseInt(instanceRoom.iDefaultCoin));
                        socket.iCash = parseInt(iCash);
                        socket.emit('SM_EnterGame', {result:'OK', strID:strID, iCoin:iCoin, iCash:iCash, strGameName:instanceRoom.strGameName, iBlind:instanceRoom.iDefaultCoin, eUserType:eUserType});
                    }
                }
            }
                //socket.emit('SM_EnterGame', {result:'OK'});
            else 
                socket.emit('SM_Error', {error:'NotExistRoom',lUnique:lUnique});

            this.PrintLobbyUsers();
       });


            socket.on('CM_EnterLobby', () => {

                // let listRooms = [];

                // for ( let i in this.GameManager.listGames )
                // {
                //     let iNumPlayers = this.GameManager.listGames[i].listUsers.GetLength();

                //     listRooms.push(
                //         {iNo:i+1, strName:this.GameManager.listGames[i].strGameName, iNumPlayers:iNumPlayers}
                //     );
                // }

                let listRooms = this.GameManager.GetRoomList();

                socket.emit('SM_RoomList', listRooms);
            });

            socket.on('CM_RoomList', () => {

                let listRooms = this.GameManager.GetRoomList();

                socket.emit('SM_RoomList', listRooms);
            });

            socket.on('CM_RoomInfo', (lUnique) => {

                let roominfo = this.GameManager.GetRoomInfo(lUnique);

                socket.emit('SM_RoomInfo', roominfo);
            });
            // socket.on('CM_EnterGame', () => {

            //     console.log(`CM_EnterGame strID : ${socket.strID}`);

            //     socket.emit('SM_EnterGame', {result:'OK'});
            // });

            // socket.on('CM_LeaveGame', async () => {

            //     if ( true == this.GameManager.Leave(socket) )
            //     {
            //         this.RemoveUser(socket);
            //         await this.RequestAxios(`${global.strLobbyAddress}/removeroom`, {lUnique:lUnique});
            //     }
            //     else
            //     {
            //         this.RemoveUser(socket);
            //         await this.RequestAxios(`${global.strLobbyAddress}/leaveroom`, {lUnique:lUnique});                    
            //     }
            // });

            // socket.on('CM_QuickJoin', (data) => {

            //     console.log(`CM_QuickJoin`);

            //     console.log(`User Coin : ${socket.iCoin}, DefaultCoin : ${data.iDefaultCoin}`);

            //     const cBuyin = parseInt(data.iDefaultCoin) * 100;

            //     if ( socket.iCoin >= cBuyin )
            //     {
            //         this.GameManager.QuickJoin(data.iDefaultCoin, socket);
                
            //         this.RemoveUser(socket);
    
            //         socket.emit('SM_EnterGame', {result:'OK'});
            //     }
            //     else
            //     {
            //         socket.emit('SM_Error', {error:'NotEnoughBuyin'});
            //     }
            // });
            socket.on('CM_QuickJoin', (data) => {

                console.log(`CM_QuickJoin`);

                console.log(data);

                console.log(`User Coin : ${socket.iCoin}, DefaultCoin : ${data.iDefaultCoin}`);

                const cBuyin = parseInt(data.iDefaultCoin) * 100;

                if ( socket.iCoin >= cBuyin )
                {
                    //this.GameManager.QuickJoin(data.iDefaultCoin, socket);
                    let result = this.GameManager.QuickJoin(data.strRoomName, data.strPassword, data.iDefaultCoin, data.iBettingTime, data.iNumPlayers, socket);
                    if ( result != null )
                    {
                        //this.RemoveUser(socket);
                        //socket.emit('SM_EnterGame', {result:'OK', lUnique:result.lUnique});
                        socket.emit('SM_OpenGame', {result:'OK', lUnique:result.lUnique});
                    }
                    else
                    {
                        socket.emit('SM_Error', {error:'NotJoinableRoom'});
                    }
                }
                else
                {
                    socket.emit('SM_Error', {error:'NotEnoughBuyin'});
                }
            });

            // socket.on('CM_CreateRoom', (data) => {

            //     console.log(`CM_CreateRoom`);
            //     console.log(data);

            // });

            //  Game

            socket.on('CM_SelectLocation', (iLocation) => {

                console.log(`CM_SelectLocation ${iLocation}`);

                let ret = this.GameManager.SetLocation(socket, iLocation);

                console.log(`${socket.iLocation}, ${socket.strID}, ${socket.eStage}, ${socket.lUnique}, ##### Avatar : ${socket.iAvatar}`);

                socket.emit('SM_SelectLocation', {eResult:ret, iCoin:socket.iCoin, iCash:socket.iCash, iLocation:iLocation, iAvatar:socket.iAvatar, eUserType:socket.eUserType});
            });

            socket.on('CM_StartGame', () => {

                console.log(`CM_StartGame : lUnique(${socket.lUnique})`);

                let ret = this.GameManager.StartGame(socket.lUnique);
                let index = this.GameManager.FindGameIndex(socket.lUnique);
                let list = [];

                if ( -1 != index )
                {
                    list = this.GameManager.listGames[index].GetEnableUserList();
                }

                for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
                {
                    this.listUsers.GetSocket(i).emit('SM_StartGame', {eResult:ret, listUser:list});
                }
            });

            socket.on('CM_Exit', () => {
                socket.emit('SM_Exit');
            });

            socket.on('CM_ChatSend', (tag) => {

                console.log(`CM_ChatSend :`);
                console.log(tag);
                
                //socket.bClick = true;
                for (let i = 0; i < this.listUsers.GetLength(); ++i) {
                    //socket.emit('SM_ChatSend', {tag:tag, strID:this.listUsers.GetSocket(i).strID});
                    this.listUsers.GetSocket(i).emit('SM_ChatSend', {tag:tag});
                }
            });

            socket.on('CM_ChatClose', () => {
                socket.emit('SM_ChatClose');
            });

            socket.on('CM_ChatOpen', () => {
                socket.emit('SM_ChatOpen');
            });

            socket.on('CM_ManualRebuyin', () => {

                console.log(`CM_ManualRebuyin :`);
                socket.bMenualRebuyin = true;
            });

            socket.on('CM_DefaultAnteSB', (iCoin) => {

                console.log(`CM_DefaultAnteSB : ${iCoin}`);
                //socket.iCoin -= iCoin;
            });

            socket.on('CM_DefaultAnteBB', (iCoin) => {

                console.log(`CM_DefaultAnteBB : ${iCoin}`);
                //socket.iCoin -= iCoin;
            });

            socket.on('CM_Betting', (objectBetting) => {

                console.log(`CM_Betting : ${objectBetting.strBetting}, Amount : ${objectBetting.iAmount}`);

                this.GameManager.ProcessBetting(socket, objectBetting);
            });
        });
    }

    Update()
    {
        //this.GameManager.Update();
    }

    AddUser(socket)
    {
        console.log(`AddUser : ${socket.strID}`);

        this.listUsers.Add(socket);
        this.PrintLobbyUsers();
    }

    RemoveUser(socket)
    {
        this.listUsers.Remove(socket);
        this.PrintLobbyUsers();
    }

    PrintLobbyUsers()
    {
        console.log(`################################################## #Users`);
        
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
            console.log(`strID : ${this.listUsers.GetSocket(i).strID}, eStage : ${this.listUsers.GetSocket(i).eStage}`);
    }
}
module.exports = IGameInstance;