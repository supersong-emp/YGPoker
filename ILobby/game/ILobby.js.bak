let ISocketList = require('./ISocketList');

let axios = require('axios');

class ILobby
{
    constructor(io, namespaceIO)
    {
        this.io = io;
        this.namespaceIO = io.of(namespaceIO);
        this.listUsers = new ISocketList();

        this.listRooms = [];
    }

    GetAddress(eGameType)
    {
        // if ( eGameType == 0 )
        // {
        //     return `${global.strGameAddress}/game`;

        //     //const strAddress = 'http://157.230.38.106:5555';

        //     //return 'http://localhost:5555/game';
        //     //return 'http://157.230.38.106:5555/game';
        // }
        let strAddress = '';
        if ( eGameType == 'HOLDEM' )
        {
            strAddress = global.strGameAddress;
            //const strAddress = 'http://localhost:5555';
            //const strAddress = 'http://157.230.38.106:5555';
        }
        else if ( eGameType == 'BIG2' )
        {
            strAddress = global.strBig2Address;
        }
        
        return `${strAddress}/game`;
    }

    OnIO(io)
    {
        this.namespaceIO.on('connection', (socket) => {

            console.log(`#${this.strType} ---------------------------------- Socket Connection : ${socket.id}`);
            socket.eStage = 'STANDBY';
            this.AddUser(socket);
            if ( socket.strID == undefined )
            {
                socket.emit('SM_RequestLogin');
            }

            socket.on('disconnect', ()=> {

                console.log(`#${this.strType} ---------------------------------- Socket Disconnection : ${socket.id}, ${socket.strID}, ${socket.eStage}, ${socket.lUnique}`);

                this.RemoveUser(socket);
            });

            socket.on('CM_Login', (strID, strPassword, iPoint) => {

                console.log(`CM_Login`);

                socket.strID = strID;
                socket.strPassword = strPassword;
                socket.eStage = 'LOBBY';
                //socket.iLocation = -1;
                // socket.iCoin = 100000;
                socket.iPoint = iPoint;

                //console.log(`${socket.strID}, ${socket.eStage}`);

                this.PrintLobbyUsers();

                //socket.emit('SM_Login', {result:'OK', strID:strID, iCoin:socket.iCoin});
            });

            socket.on('CM_RoomList', (objectData) => {

                console.log(`CM_RoomList`);
                console.log(objectData);

                //let listRooms = this.listRooms;
                let listRooms = this.FindRoomList(objectData.reiBlind, objectData.eGameType);

                socket.emit('SM_RoomList', listRooms);
            });

            socket.on('CM_RoomGameList', (objectData) => {

                console.log(`CM_RoomGameList`);
                console.log(objectData);

                //let listRooms = this.listRooms;
                let listRooms = this.FindRoomGameList(objectData.eGameType);

                socket.emit('SM_RoomGameList', listRooms);
            });

            socket.on('CM_CreateRoom', async (objectData) => {

                console.log(`CM_CreateRoom`);
                console.log(objectData);

                const strAddress = `${this.GetChannelAddress(objectData.eGameType)}/create`;
                let request = await this.RequestAxios(strAddress, objectData);
                console.log(`CM_CreateRoom----------------------`);
                console.log(request.data);
                if ( request.result == 'OK' )
                {
                    this.UpdateRoom(request.data);

                    let strGameAddress = this.GetAddress(objectData.eGameType);

                    socket.emit('SM_OpenGame', {result:'OK', eGameType:objectData.eGameType, lUnique:request.data.lUnique, strAddress:strGameAddress});
                }
                else
                {
                    socket.emit('SM_Error', {error:request.error});
                }
            });

            socket.on('CM_JoinRoom', async (objectData) => {

                console.log(`CM_JoinRoom`);
                console.log(objectData);

                const strAddress = `${this.GetChannelAddress(objectData.eGameType)}/join`;
                let request = await this.RequestAxios(strAddress, objectData);
                console.log(request);
                if ( request.result == 'OK' )
                {
                    this.UpdateRoom(request.data);

                    let strGameAddress = this.GetAddress(objectData.eGameType);

                    socket.emit('SM_OpenGame', {result:'OK', eGameType:objectData.eGameType, lUnique:request.data.lUnique, strAddress:strGameAddress});

                    this.JoinRoom(request.data.lUnique);
                }
                else
                {
                    socket.emit('SM_Error', {error:request.error});
                }
            });

            socket.on('CM_QuickJoinRoom', async (objectData) => {

                console.log(`CM_QuickJoinRoom`);
                console.log(objectData);

                const strAddress = `${this.GetChannelAddress(objectData.eGameType)}/quickjoin`;
                let request = await this.RequestAxios(strAddress, objectData);
                console.log(request);
                if ( request.result == 'OK' )
                {
                    this.UpdateRoom(request.data);

                    let strGameAddress = this.GetAddress(objectData.eGameType);

                    socket.emit('SM_OpenGame', {result:'OK', eGameType:objectData.eGameType, lUnique:request.data.lUnique, strAddress:strGameAddress});                                    
                }
                else
                {
                    socket.emit('SM_Error', {error:request.error});
                }
            });
        });
    }

    Update()
    {
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
        console.log(`################################################## #${this.strType} Users`);
        
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
            console.log(`strID : ${this.listUsers.GetSocket(i).strID}, eStage : ${this.listUsers.GetSocket(i).eStage}`);
    }

    RemoveRoom(lUnique)
    {
        for ( let i in this.listRooms )
        {
            if ( this.listRooms[i].lUnique == lUnique )
            {
                this.listRooms.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    LeaveGame(strID)
    {
        let player = this.FindUser(strID);
        if ( player != null )
        {
            player.emit('SM_LeaveGame');
        }
    }

    UpdateRoom(objectData)
    {
        console.log(`ILobby::UpdateRoom`);
        console.log(objectData);

        let instanceRoom = this.FindRoom(objectData.lUnique);
        if ( instanceRoom == null )
        {
            let objectRoom = {
                lUnique:objectData.lUnique,
                eGameType:objectData.eGameType,
                strGameName:objectData.strGameName,
                iDefaultCoin:objectData.iDefaultCoin,
                strPassword:objectData.strPassword,
                iBuyIn:objectData.iBuyIn,
                iMaxPlayer:objectData.iMaxPlayer,
                iNumPlayer:objectData.iNumPlayer,
                iBettingTime:objectData.iBettingTime,

            };
            this.listRooms.push(objectRoom);
        }
        else
        {
            instanceRoom = {
                lUnique:objectData.lUnique,
                strGameName:objectData.strGameName,
                eGameType:objectData.eGameType,
                iDefaultCoin:objectData.iDefaultCoin,
                strPassword:objectData.strPassword,
                iBuyIn:objectData.iBuyIn,
                iMaxPlayer:objectData.iMaxPlayer,
                iNumPlayer:objectData.iNumPlayer,
                iBettingTime:objectData.iBettingTime,
            };
        }
    }

    JoinRoom(lUnique)
    {
        let room = this.FindRoom(lUnique);
        if ( null != room )
        {
            room.iNumPlayer = parseInt(room.iNumPlayer)+1;
        }
    }

    LeaveRoom(lUnique)
    {
        let room = this.FindRoom(lUnique);
        if ( null != room )
        {
            room.iNumPlayer = parseInt(room.iNumPlayer)-1;
        }        
    }

    FindUser(strID)
    {
        for ( let i = 0; i < this.listUsers.GetLength(); ++ i )
        {
            if ( this.listUsers.GetSocket(i).strID == strID )
                return this.listUsers.GetSocket(i);
        }
        return null;
    }

    FindRoom(lUnique)
    {
        console.log(`ILobby::FindRoom : lUnique (${lUnique})`);
        
        for ( let i in this.listRooms )
        {
            if ( this.listRooms[i].lUnique == lUnique )
            {
                return this.listRooms[i];
            }
        }
        return null;
    }

    FindRoomList(iDefaultCoin, eGameType)
    {
        if ( iDefaultCoin == undefined || iDefaultCoin == 0 )
            return this.listRooms;

        console.log(`ILobby::FindRoomList : iDefaultCoin (${iDefaultCoin}) : eGameType (${eGameType})`);

        let listRooms = [];
        
        for ( let i in this.listRooms )
        {
            console.log(this.listRooms[i].iDefaultCoin);
            if ( this.listRooms[i].iDefaultCoin == (iDefaultCoin/2) && this.listRooms[i].eGameType == eGameType)
            {
                listRooms.push(this.listRooms[i]);
            }
        }
        return listRooms;
    }

    FindRoomGameList(eGameType)
    {
        if ( eGameType == undefined || eGameType == '' )
            return this.listRooms;

        console.log(`ILobby::FindRoomGameList : eGameType (${eGameType})`);

        let listRooms = [];
        
        for ( let i in this.listRooms )
        {
            console.log(this.listRooms[i].eGameType);
            if ( this.listRooms[i].eGameType == eGameType )
            {
                listRooms.push(this.listRooms[i]);
            }
        }
        return listRooms;
    }

    GetChannelAddress(eGameType)
    {
        let strAddress = '';
        if ( eGameType == 'HOLDEM' )
        {
            strAddress = global.strGameAddress;
            //const strAddress = 'http://localhost:5555';
            //const strAddress = 'http://157.230.38.106:5555';
        }
        else if ( eGameType == 'BIG2' )
        {
            strAddress = global.strBig2Address;
        }
        
        return `${strAddress}`;
    }

    async RequestAxios(strAddress, objectData)
    {
        console.log(`ILobby::RequestAxios ${strAddress}`);
        console.log(objectData);

        try {

            const customAxios = axios.create({});
            //const response = await axios.post(strAddress, objectData);
            const response = await customAxios.post(strAddress, objectData, {headers:{ 'Accept-Encoding': 'application/json'}});
            console.log(response);
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
    //     console.log(`ILobby::RequestAxios ${strAddress}`);
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
    //     // axios.post(strAddress, objectData)
    //     // .then((response)=> {

    //     //     if ( response.data.result == 'OK' )
    //     //         return {result:'OK', data:response.data};
    //     //     else
    //     //         return {result:'error', error:'response'};    
    //     // })
    //     // .catch((error)=> {

    //     //     return {result:'error', error:'axios'};
    //     // });

    //     // return {result:'error', error:'response'};
    // }
}
module.exports = ILobby;