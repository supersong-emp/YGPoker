const EnumGameMode = Object.freeze({
    "Standby":0, 
    "Start":1,
    "BuildPlayerType":2,
    "DefaultAnteSB":3, 
    "DefaultAnteBB":4,
    "HandCard":5,
    "BettingPreFlop":6,
    "Flop":7,
    "BettingFlop":8,
    "Turn":9,
    "BettingTurn":10,
    "River":11,
    "BettingRiver":12,
    "Result":13,
    "RebuyIn":14,
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
    "Start":3, 
    "BuildPlayerType":1.5,
    "DefaultAnteSB":0.5,
    "DefaultAnteBB":0.5,
    "HandCard":1,
    "Flop":3,
    "Turn":3,
    "River":3,
    "Result":5,
    "RebuyIn":3,
});
module.exports.EGameTime = EnumGameTime;

const EnumDBType = Object.freeze({
    "Users":0, 
    "RecordBets":1,
    "RecodrdGames":2,
});
module.exports.EDBType = EnumDBType;

const EnumUserDBType = Object.freeze({
    "UpdateCash":0, 
});
module.exports.EUserDBType = EnumUserDBType;

const EnumRecordBetDBType = Object.freeze({
    "Create":0, 
    "Update":1
});
module.exports.ERecordBetDBType = EnumRecordBetDBType;

const EnumRecordResultDBType = Object.freeze({
    "Create":0, 
});
module.exports.ERecordResultBType = EnumRecordResultDBType;