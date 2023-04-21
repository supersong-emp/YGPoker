let moment = require('moment');
// require('moment-timezone');
// moment.tz.setDefault('Asia/Seoul');

//const moment = require('moment-timezone');

module.exports = (sequelize, DataTypes) => {

    const Fees = sequelize.define("Fees", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        fHoldem: {
            type:DataTypes.FLOAT,
            // allowNull: false,
        },
        fBig2: {
            type:DataTypes.FLOAT,
            // allowNull: false,
        },
        fSitgo: {
            type:DataTypes.FLOAT,
            // allowNull: false,
        },
        fBaccarat: {
            type:DataTypes.FLOAT,
            // allowNull: false,
        },
        fOmaha: {
            type:DataTypes.FLOAT,
            // allowNull: false,
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

    return Fees;
};