let moment = require('moment');
// require('moment-timezone');
// moment.tz.setDefault('Asia/Seoul');

//const moment = require('moment-timezone');

module.exports = (sequelize, DataTypes) => {

    const ResultHoldems = sequelize.define("ResultHoldems", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        lUnique: {
            type:DataTypes.INTEGER,
        },
        strWinner: {
            type:DataTypes.STRING,
        },
        strDesc: {
            type:DataTypes.STRING,
        },
        iStartCoin: {
            type:DataTypes.INTEGER,
        },
        strHand: {
            type:DataTypes.STRING,
        },
        strTablecard: {
            type:DataTypes.STRING,
        },
        iJackpot: {
            type:DataTypes.INTEGER,
        },
        createdAt:{
            type:DataTypes.DATE,
            get() {
                return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        updatedAt:{
            type:DataTypes.DATE,
            get() {
                return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
    });

    return ResultHoldems;
};