let IGame = require('./IGame');
let E = require('./IEnum');

class IGameManager
{
    constructor(io)
    {
        this.io = io;

        this.listGames = [];
    }

    // CreateGame(strGameName, iDefaultCoin)
    // {
    //     console.log(`IGameManager::CreateGame : ${strGameName}, iDefaultCoin : ${iDefaultCoin}`);
    //     let instanceGame = new IGame(strGameName, iDefaultCoin);
    //     this.listGames.push(instanceGame);

    //     this.PrintRoomList();

    //     return instanceGame;
    // }
    CreateGame(strGameName, eGameType, strPassword, iDefaultCoin, iBettingTime, iMaxPlayers)
    {
        console.log(`IGameManager::CreateGame : ${strGameName}, iDefaultCoin : ${iDefaultCoin}`);
        //let instanceGame = new IGame(strGameName, iDefaultCoin);
        let instanceGame = new IGame(strGameName, eGameType, strPassword, iDefaultCoin, iBettingTime, iMaxPlayers);
        this.listGames.push(instanceGame);

        this.PrintRoomList();

        return instanceGame;
    }

    DeleteGame(lUnique)
    {
        console.log(`IGameManager::DeleteGame : lUnique : ${lUnique}`);
        const cIndex = this.FindGameIndex(lUnique);
        if ( -1 != cIndex )
        {
            this.listGames.splice(cIndex, 1);
        }
        this.PrintRoomList();
    }

    FindGameIndex(lUnique)
    {
        console.log(`FindGameIndex : ${lUnique}, GameLength : ${this.listGames.length}`);

        for ( let i in this.listGames )
        {
            console.log(`FindGame : ${i}, ${this.listGames[i].strGameName}`);

            if ( this.listGames[i].lUnique == lUnique )
            {
                return i;
            }
        }
        return -1;
    }

    FindGame(iDefaultCoin)
    {
        for ( let i in this.listGames )
        {
            //if ( this.listGames[i].iDefaultCoin == iDefaultCoin && this.listGames[i].GetNumUsers() < 9 )
            if ( this.listGames[i].iDefaultCoin == iDefaultCoin && this.listGames[i].GetNumUsers() < this.listGames[i].cMaxPlayer )
            {
                return this.listGames[i];
            }
        }
        return null;
    }

    SetLocation(socket, iLocation)
    {
        const cIndex = this.FindGameIndex(socket.lUnique);
        if ( -1 != cIndex )
        {
            return this.listGames[cIndex].SetLocation(socket, iLocation);
        }
        return false;
    }

    StartGame(lUnique)
    {
        const cIndex = this.FindGameIndex(lUnique);
        if ( -1 != cIndex )
        {
            return this.listGames[cIndex].StartGame();
        }
        return false;
    }

    QuickJoin(strGameRoom, eGameType,strPassword, iDefaultCoin, iBettingTime, iMaxPlayers, socket)
    {
        let instanceGame = this.FindGame(iDefaultCoin);
        if ( instanceGame != null )
        //if ( instanceGame != null && strGameRoom != '' )
        {
            //console.log(`IGameManager::QuickJoin Join SocketID : ${socket.id}, strID : ${socket.strID}`);
            //instanceGame.Join(socket);
            return instanceGame;
        }
        else if ( instanceGame == null && strGameRoom != '' )
        {
            //console.log(`IGameManager::QuickJoin Create SocketID : ${socket.id}, strID : ${socket.strID}`);

            instanceGame = this.CreateGame(strGameRoom, eGameType,strPassword, iDefaultCoin, iBettingTime, iMaxPlayers);
            //instanceGame.Join(socket);
            return instanceGame;
        }
        return null;
    }

    Join(lUnique, socket)
    {
        const cIndex = this.FindGameIndex(lUnique);
        if ( cIndex != -1 )
        {
            let instanceGame = this.listGames[cIndex];
            console.log(`IGameManager::Join SocketID : ${socket.id}, strID : ${socket.strID}`);
            instanceGame.Join(socket);
            return instanceGame;
        }
        return null;
    }

    CheckJoin(lUnique)
    {
        const cIndex = this.FindGameIndex(lUnique);
        if ( cIndex != -1 )
        {
            let instanceGame = this.listGames[cIndex];

            if ( instanceGame.listUsers.GetLength() >= parseInt(instanceGame.cMaxPlayer) )
            {
                console.log(`IGameManager::CheckJoin : MaxUser(${instanceGame.cMaxPlayer}) CurrentUser(${instanceGame.listUsers.GetLength()})`);
                return null;
            }
            return instanceGame;
        }
        return null;        
    }

    Leave(socket)
    {
        console.log(`IGameManager::Leave : ${socket.lUnique},  ${socket.eStage}, SocketID : ${socket.id}, strID : ${socket.strID}`);
        const cIndex = this.FindGameIndex(socket.lUnique);
        if ( -1 != cIndex )
        {
            let iNumUsers = this.listGames[cIndex].Leave(socket);
            console.log(`IGameManager::Leave : iNumUsers ${iNumUsers}`);
            if ( 0 == iNumUsers )
            {
                this.DeleteGame(this.listGames[cIndex].lUnique);
                // this.listGames.splice(cIndex, 0);  
                // this.PrintRoomList();              

                return true;
            }
            else if ( 1 == iNumUsers )
            {
                this.listGames[cIndex].SetMode(E.EGameMode.Standby);
            }
            //return true;
        }
        return false;
    }

    ProcessSubmit(socket, objectBetting)
    {
        console.log(`IGameManager::ProcessSubmit : ${socket.strID}, ${objectBetting.strBetting}`);
        console.log(objectBetting.list);

        const cIndex = this.FindGameIndex(socket.lUnique);
        if ( -1 != cIndex )
        {
            this.listGames[cIndex].ProcessSubmit(socket, objectBetting);
        }

    }

    GetRoomList()
    {
        let listRooms = [];

        for ( let i in this.listGames )
        {
            let iNumPlayers = this.listGames[i].listUsers.GetLength();
            let iMaxPlayers = this.listGames[i].cMaxPlayer;
            //let iBuyIn = this.listGames[i].iBuyIn;
    
            listRooms.push(
                {
                    iNo:i+1, 
                    strName:this.listGames[i].strGameName, 
                    eGameType:this.listGames[i].eGameType,
                    iNumPlayers:iNumPlayers, 
                    iMaxPlayers:iMaxPlayers,
                    //iBuyIn:iBuyIn,
                    iDefaultCoin:this.listGames[i].iDefaultCoin
                }
            );
        }
        return listRooms;    
    }

    Update()
    {
        for ( let i in this.listGames )
            this.listGames[i].Update();
    }

    async UpdateDB()
    {
        for ( let i in this.listGames )
            this.listGames[i].UpdateDB();        
    }

    PrintRoomList()
    {
        console.log(`################################################## Room List`);
        for ( let i in this.listGames )
        {
            console.log(`Room : ${this.listGames[i].strGameName}, ${this.listGames[i].iDefaultCoin}`);
        }
    }
}
module.exports = IGameManager;