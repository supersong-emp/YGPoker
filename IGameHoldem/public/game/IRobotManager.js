import IRobot from "../game/IRobot.js";

let account = {strID:'robot2', strPassword:'123123', iAvatar:5, lUnique:85330, iCoin:100000, strOptionCode:'01120000', strGroupID:'001010101', iClass:5};
let account2 = {strID:'robot3', strPassword:'123123', iAvatar:5, lUnique:85330, iCoin:100000, strOptionCode:'01120000', strGroupID:'001010101', iClass:5};

let robot = new IRobot(account, 0);
let robot2 = new IRobot(account2, 1);

robot.OnIO();
robot2.OnIO();

setInterval( () => {

    robot.Update();
    robot2.Update();

}, 1000);

setInterval( () => {

    robot.RequestRoomList();
}, 3000);