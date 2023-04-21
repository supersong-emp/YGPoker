const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    host: 'db-mysql-sgp1-95783-do-user-12885813-0.b.db.ondigitalocean.com',
    database: 'ocgames',
    username: 'sss',
    password: 'AVNS_vyAEdV_VpYhCjpqQ37z',
    dialect: 'mysql',
    port:25060,
    // timezone:'Asia/Seoul'
});

var db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;


const Users = require('./models/user')(sequelize, Sequelize);
db.Users = Users;
const RecordBets = require('./models/bet')(sequelize, Sequelize);
db.RecordBets = RecordBets;
const Fees = require('./models/fee')(sequelize, Sequelize);
db.Fees = Fees;
const ResultHoldems = require('./models/resultHoldem')(sequelize, Sequelize);
db.ResultHoldems = ResultHoldems;

module.exports = db;