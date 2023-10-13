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

const Inouts = require('./models/inout')(sequelize, Sequelize);
db.Inouts = Inouts;

const RecordBets = require('./models/bet')(sequelize, Sequelize);
db.RecordBets = RecordBets;

const Announcements = require('./models/announcement')(sequelize, Sequelize);
db.Announcements = Announcements;

const Letters = require('./models/letter')(sequelize, Sequelize);
db.Letters = Letters;

const Settings = require('./models/setting')(sequelize, Sequelize);
db.Settings = Settings;

module.exports = db;