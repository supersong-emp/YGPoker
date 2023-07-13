const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    host: 'db-mysql-sgp1-95783-do-user-12885813-0.b.db.ondigitalocean.com',
    database: 'ocgames',
    username: 'sss',
    password: 'AVNS_vyAEdV_VpYhCjpqQ37z',
    dialect: 'mysql',
    port:25060,
    timezone:'Asia/Seoul'
});
var db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;


const Users = require('./models/user')(sequelize, Sequelize);
db.Users = Users;

const RecordBets = require('./models/bet')(sequelize, Sequelize);
db.RecordBets = RecordBets;

const Inouts = require('./models/inout')(sequelize, Sequelize);
db.Inouts = Inouts;

const Fees = require('./models/fee')(sequelize, Sequelize);
db.Fees = Fees;

const Jackpots = require('./models/jackpot')(sequelize, Sequelize);
db.Jackpots = Jackpots;

const ResultHoldems = require('./models/resultHoldem')(sequelize, Sequelize);
db.ResultHoldems = ResultHoldems;

const Announcements = require('./models/announcement')(sequelize, Sequelize);
db.Announcements = Announcements;

const Letters = require('./models/letter')(sequelize, Sequelize);
db.Letters = Letters;

const Rollings = require('./models/Rolling')(sequelize, Sequelize);
db.Rollings = Rollings;

const Settings = require('./models/setting')(sequelize, Sequelize);
db.Settings = Settings;

module.exports = db;