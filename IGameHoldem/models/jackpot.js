let moment = require('moment');
// require('moment-timezone');
// moment.tz.setDefault('Asia/Seoul');

//const moment = require('moment-timezone');

module.exports = (sequelize, DataTypes) => {

    const Jackpots = sequelize.define("Jackpots", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        strGame: {
            type:DataTypes.STRING,
            // allowNull: false,
        },
        iRSFAmount: {
            type:DataTypes.INTEGER,
            // allowNull: false,
        },
        iSFAmount: {
            type:DataTypes.INTEGER,
            // allowNull: false,
        },
        iFCAmount:{
            type:DataTypes.INTEGER,
        },
        iJackpot:{
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
                return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
    });

    return Jackpots;
};