const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

var seq = require('./db');
var User = require('./models/user')(seq.sequelize, seq.Sequelize);

module.exports = () => {

    console.log('passport is passed');

    passport.serializeUser((user, done) => {
        //done(null, user.name);
        done(null, user.strID);

        console.log('serialize user');
    });

    passport.deserializeUser((strID, done) => {

        User.findOne({ where: { strID: strID } }).then(function (user) {
            done(null, user);
        });

        //done(null, { name: username });

        console.log('deserialize user' + strID);
    });

    passport.use(new LocalStrategy(
        {
            usernameField: 'strID',
            passwordField: 'strPassword',
            session: true,
            passReqToCallback: true,
        },
        async function (req, username, password, done) {

            try {
                console.log(`********** passport loginid : ${username} / password ${password}`);

                //User.findOne({ where: { name: username } }).then(function (user) {
                    var user = await User.findOne({ where: { strID: username } });//.then(function (user) {
    
                    //if (!user) {
                    if ( user == undefined ) {
                        console.log('not exist user');
                        return done(null, false, { message: '없는 사용자 아이디 입니다.' });
                    }
    
                    if (user.strPassword != password) {
                        console.log('incorrect password');
                        return done(null, false, { message: '비밀번호가 틀렸습니다.' });
                    }
    
                    console.log(`********** user : ${user.strID}` );
    
                    return done(null, user);
    
               
            
            } catch ( e ) {
                console.log(e);
                return done(e);
            }
        }
    ));
}
