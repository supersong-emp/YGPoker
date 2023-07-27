import IRobot from "../game/IRobot.js";

let robots = [];

// 사용자 데이터를 기반으로 IRobot 객체를 생성하는 함수
function createRobots(userData) {
    for (let i = 0; i < userData.length; i++) {
        // Check if the user has enough iCash
        if (userData[i].iCash && userData[i].iCash > 0) {
            //console.log(userData[i]);
            let robot = new IRobot(userData[i], i);
            robots.push(robot);
            robot.OnIO();
        }
    }
}

// Async version of selectRandomRoom
IRobot.prototype.selectRandomRoom = async function() {
    // 먼저 방 목록을 업데이트합니다.
    await this.RequestRoomList();

    // 룸 리스트에서 랜덤하게 방을 선택하고 lUnique 값을 갱신합니다.
    let availableRooms = this.listRooms.filter(room => room.iNumPlayers < room.iMaxPlayers);
    if (availableRooms.length > 0) {
        let randomRoom = availableRooms[Math.floor(Math.random() * availableRooms.length)];
        this.lUnique = randomRoom.lUnique;
    }
    // Ensure updated room list before returning
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
};

IRobot.prototype.update = async function() {
   // Wait for random interval before selecting room
   
   ++this.iElapsedTime;
   console.log('Update');
   console.log(this.account.strID);
   console.log(this.iElapsedTime);
    if (this.bConnected == false && this.iElapsedTime > 3) {
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
        // Select room
        await this.selectRandomRoom();
        let availableRooms = this.listRooms.filter(room => room.iNumPlayers < room.iMaxPlayers);
        if (availableRooms.length > 0) {
            // Choose a random room
            let randomRoom = availableRooms[Math.floor(Math.random() * availableRooms.length)];
            this.lUnique = randomRoom.lUnique;

            let selectedRoom = this.listRooms.find(room => room.lUnique == this.lUnique);
            if (selectedRoom && this.account.iCash && this.account.iCash > 0) {
                let existingLocations = selectedRoom.listPlayer.map(player => player.iLocation);
                let availableLocations = [];

                for (let i = 0; i < parseInt(selectedRoom.iMaxPlayers); i++) {
                    if (!existingLocations.includes(i)) {
                        availableLocations.push(i);
                    }
                }

                if (availableLocations.length > 0) {
                    let randomIndex = Math.floor(Math.random() * availableLocations.length);
                    this.iLocation = availableLocations[randomIndex];
                    console.log(this.iLocation);

                    this.socket.emit('CM_JoinGame', this.account.strID, this.lUnique, this.account.iCash, this.account.iAvatar, this.account.strOptionCode, this.account.strGroupID, this.account.iClass);
                    this.bConnected = true;
                }
            }
        }
    }

   if ( this.bEnableBetting == true && this.iElapsedTime > 1 )
   {
        //console.log(this.iElapsedTime);
        let objectBetting = {strBetting:'Call', iAmount:this.iCallAmount};
        this.socket.emit('CM_Betting', objectBetting);
        this.bEnableBetting = false;
   } 
};

async function doRandomInterval() {
    for (let robot of robots) {
        await robot.update();
        // if(!robot.bConnected)
        // robot.RequestRoomList();
    }
    // iCash가 0 이하 또는 null인 로봇을 제거
    robots = robots.filter(robot => robot.account.iCash && robot.account.iCash > 0);
    setTimeout(doRandomInterval, 800);
}

window.onload = function() {
    // 이벤트 리스너 설정
    document.addEventListener('receivedRobotData', function (event) {
        // 이벤트에서 데이터를 받아 처리
        var userData = event.detail;
        // userData를 사용하여 IRobot 객체 생성
        console.log(userData);
        createRobots(userData);
    });
    // 최초 실행
    doRandomInterval();
};