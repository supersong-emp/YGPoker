const EnumGameMode = Object.freeze({
    "Standby":0, 
    "Start":1,
    "HandCard":2,
    "BuildPlayerType":3,
    "SubmitCard":4,
    "Result":5,
    // "Plob":4, 
    // "BettingFlop":5, 
    // "Turn":6, 
    // "BettingTurn":7, "River":8, "RiverBetting":9, "Result":10, "Celebration":11
});
module.exports.EGameMode = EnumGameMode;

// DefaultAnte,
// BettingPreFlop,
// Plob,
// BettingFlop,
// Turn,
// BettingTurn,
// River,
// BettingRever,


const EnumGameTime = Object.freeze({
    "Start":1, 
    "BuildPlayerType":1,
    "HandCard":2,
    "MyTurn":1,
    "Result":5,
});
module.exports.EGameTime = EnumGameTime;

const EnumDBType = Object.freeze({
    "Users":0, 
    "RecordBets":1,
    "RecodrdGames":2,
});
module.exports.EDBType = EnumDBType;

const EnumUserDBType = Object.freeze({
    "UpdatePoint":0, 
});
module.exports.EUserDBType = EnumUserDBType;

const EnumRecordBetDBType = Object.freeze({
    "Create":0, 
});
module.exports.ERecordBetDBType = EnumRecordBetDBType;

const EnumRecordResultDBType = Object.freeze({
    "Create":0, 
});
module.exports.ERecordResultBType = EnumRecordResultDBType;