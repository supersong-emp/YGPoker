const express = require('express');
const passport = require('passport');
const router = express.Router();

const axios = require('axios');

router.use(express.json());
router.use(express.urlencoded({extended:false}));

const path = require('path');
router.use(express.static(path.join(__dirname, '..', 'public')));

const db = require('../db');
const ITime = require('../utils/time');
const {Op}= require('sequelize');

////////////////////////////////////////////////////////////////////////////////////////////////////
//  #user
router.get('/userlist', async(req, res) => {

    if ( req.user == undefined )
        res.redirect('/account/login');
    else
        res.render('user/userlist', {type:0, user:req.user});
});

router.post('/request_userlist', async(req, res) => {

    console.log('/list');
    console.log(req.body);

    var data = [];
    var list_count = req.body.length;
    var full_count = 0;

    // var userTypeFilter = 'NORMAL';
    // var querydatas = null;

    let tagState = `('NORMAL', 'BLOCK', 'QUIT')`;
    if ( req.body.userTypeFilter != '' )
    {
        tagState = `('${req.body.userTypeFilter}')`;
    }

    let tagSearch = ``;
    if ( req.body.search != '' )
    {
        tagSearch = `AND t6.strID = '${req.body.search}'`;
    }
    const [list] = await db.sequelize.query(`
        SELECT 
        t1.strID AS lev1, 
        t2.strID as lev2, 
        t3.strID as lev3, 
        t4.strID as lev4, 
        t5.strID as lev5, 
        t6.strID as lev6, 
        t6.*
        FROM Users AS t1
        LEFT JOIN Users AS t2 ON t2.iParentID = t1.id
        LEFT JOIN Users AS t3 ON t3.iParentID = t2.id
        LEFT JOIN Users AS t4 ON t4.iParentID = t3.id
        LEFT JOIN Users AS t5 ON t5.iParentID = t4.id
        LEFT JOIN Users AS t6 ON t6.iParentID = t5.id
        WHERE t6.iClass='5' AND t6.strGroupID LIKE CONCAT('${req.user.strGroupID}', '%') AND t6.eStatus IN ${tagState} ${tagSearch};`
    );
            
    full_count = list.length;


    var object = {};
    object.draw = req.body.draw;
    object.recordsTotal = full_count;
    object.recordsFiltered = list_count;
    object.data = list;

    res.send(JSON.stringify(object));
});

router.post('/request_userdetail', async (req, res)=> {

    console.log('/userdetail');
    console.log(req.body);

    var object = {};
    object.result = "OK";
    var user = await db.Users.findOne({where:{strID:req.body.strID}});
    if ( user == null )
    {
        object.result = "사용자 조회 실패";
    }
    else
    {
        //object.data = user;
        let shop = await db.Users.findOne({where:{id:user.iParentID}});
        //object.data.strShopID = shop.strID;

        let data = {
            id:user.id,
            strID:user.strID,
            strNickname:user.strNickname,
            strPassword:user.strPassword,
            iPoint:user.iPoint,
            iCash:user.iCash,
            eStatus:user.eStatus,
            strShopID:shop.strID,
            strDesc:user.strDesc,
            strName:user.strName,
            strAccount:user.strAccount
        };
        object.data = data;
    }
    res.send(object);
});

router.post('/request_userleave', async (req, res) => {

    var user = await db.Users.findOne({where:{strID:req.body.strID}});
    var object = {};
    object.result = "OK";

    if ( user != null )
    {
        await user.update({eStatus:"QUIT"});
    }

    res.send(object);
});

router.post('/request_checkid', async (req, res) => {

    console.log(`/request_checkid`);
    console.log(req.body);

    const user = await db.Users.findOne({where:{strID:req.body.strID}});
    if ( user != null )
    {
        res.send({result:'Exist'});
    }
    else
        res.send({result:'OK'});
});

router.post('/request_checknickname', async (req, res) => {

    console.log(`/request_checknickname`);
    console.log(req.body);

    const user = await db.Users.findOne({where:{strNickname:req.body.strNickname}});
    if ( user != null )
    {
        res.send({result:'Exist'});
    }
    else
        res.send({result:'OK'});
});

// let GetCode = (n, digits) => {

//     let zero = '';
//     n = n.toString();

//     if (n.length < digits) {
//         for (let i = 0; i < digits - n.length; i++)
//             zero += '0';
//     }
//     return zero + n;
// }

// let GetGroupID = async (strParentGroupID) => {

//     let iCurrent = 0;
//     while ( 1 )
//     {
//         const strGroupID = strParentGroupID + GetCode(iCurrent, 2);
//         console.log(`Check GroupID : ${strGroupID}`);

//         let user = await db.Users.findOne({where:{strGroupID:strGroupID}});
//         if ( user == null )
//             return strGroupID;

//         ++ iCurrent;
//     }

//     return null;
// }

router.post('/request_register', async(req, res) => {

    console.log('/request_register');
    console.log(req.body);

    var object = {};
    object.result = "OK";

    let parent = await db.Users.findOne({where:{strID:req.body.strShopID, iClass:4}});

    if ( parent == null )
    {
        object.result = 'Error';
        object.error = 'NotExistParent';
        res.send(object);
    }
    else
    {
        var user = await db.Users.findOne({where:{strID:req.body.strID}});
        if ( null == user )
        {
            let nick = await db.Users.findOne({where:{strNickname:req.body.strNickname}});
            if ( null != nick )
            {
                object.result = 'Error';
                object.error = 'ExistNickname';
                res.send(object);
                return;
            }

            let strGroupID = parent.strGroupID;

            await db.Users.create({
                strID:req.body.strID,
                strPassword:req.body.strPassword,
                strNickname:req.body.strNickname,
                iClass:5,
                strGroupID:strGroupID,
                iParentID:parent.id,
                fSettle:0,
                fHoldemR:0,
                iPoint:req.body.iPoint,
                iCash:req.body.iCash,
                strName:req.body.strName,
                eUserType:'NORMAL',
                strEMail:'',
                strImage:'',
                eStatus:'NORMAL',
                eAuthenticated:'NONE',
                iAvatar:0,
                iLevel:0,
                iExp:0,
                strDesc:req.body.strDesc,
                strMobileNo:req.body.strAccount,
                strOptionCode:'11110000'
            });
            
            res.send(object);
        }
        else
        {
            await user.update({
                strPassword:req.body.strPassword,
                iPoint:req.body.iPoint,
                iCash:req.body.iCash,
                strDesc:req.body.strDesc,
                strMobileNo:req.body.strAccount
            });
            res.send(object);
        }
    }
});

router.get('/recordcash', (req, res) => {

    if ( req.user == undefined )
        res.redirect('/account/login');
    else
        res.render('user/recordcash', {type:0, user:req.user});

});

let GetRecordCashUser = async (strGroupID, iTargetClass, dateStart, dateEnd) => {

    console.log(`##### GetRecordCashUser strGroupID (${strGroupID}), iClass (${iTargetClass})`);

    const [list] = await db.sequelize.query(`
        SELECT
        t2.id as id,
        t2.strID as strID,
        t2.strNickname as strNickname,
        t2.strGroupID as strGroupID,
        t2.iClass as iClass,
        t2.iCash as iCash,
        t2.iPoint as iPoint,
        t2.createdAt as createdAt,
        t2.updatedAt as updatedAt,
        IFNULL((SELECT sum(iAmount) FROM Inouts WHERE strID = t2.strID AND eState = 'COMPLETE' AND eType = 'INPUT' AND date(createdAt) BETWEEN '${dateStart}' AND '${dateEnd}' ),0) as iInput,
        IFNULL((SELECT sum(iAmount) FROM Inouts WHERE strID = t2.strID AND eState = 'COMPLETE' AND eType = 'OUTPUT' AND date(createdAt) BETWEEN '${dateStart}' AND '${dateEnd}'),0) as iOutput
        FROM Users AS t1
        LEFT JOIN Users AS t2 ON t2.iParentID = t1.id
        WHERE t2.iClass = '${iTargetClass}' AND t1.strGroupID LIKE CONCAT('${strGroupID}', '%');`
    );

    return list;
}

router.post('/request_recordcash', async(req, res) => {

    console.log('/list');
    console.log(req.body);


    let list = await GetRecordCashUser(req.user.strGroupID, 5, req.body.dateStart, req.body.dateEnd);
            
    var iNumDisplay = req.body.length;
    var iNumTotal = list.length;
    
    var object = {};
    object.draw = req.body.draw;
    object.recordsTotal = iNumTotal;
    object.recordsFiltered = iNumDisplay;
    object.data = list;

    res.send(JSON.stringify(object));
});

router.post('/request_recordcashuser', async (req, res) => {

    let list = await db.Inouts.findAll({
        where: {  
            createdAt:{
                [Op.between]:[ req.body.dateStart, require('moment')(req.body.dateEnd).add(1, 'days').format('YYYY-MM-DD')],
            },
            strID:req.body.strID,
        },
        order:[['createdAt','DESC']]
    });
    res.send({result:'OK', data:list});
});

router.get('/onlineuserlist', async (req, res) => {

    if ( req.user == undefined )
        res.redirect('/account/login');
    else
        res.render('user/onlineuserlist', {type:0, user:req.user});
});

router.post('/request_onlineuserlist', async(req, res) => {

    let listOnline = [];
    try {
        const response = await axios.post(`${global.strLobbyAddress}/request_onlineuser`);
        console.log(response.data);
        if ( response.data.result == 'OK' )
            listOnline = response.data.list;
    }
    catch (error) {

    }
    console.log('/onlineuserlist');
    console.log(listOnline);

    console.log(req.body);

    var data = [];
    var list_count = req.body.length;
    var full_count = 0;

    // var userTypeFilter = 'NORMAL';
    // var querydatas = null;

    let list2 = [];
    for ( let i in listOnline )
    {
        const [list] = await db.sequelize.query(`
        SELECT 
        t1.strID AS lev1, 
        t2.strID as lev2, 
        t3.strID as lev3, 
        t4.strID as lev4, 
        t5.strID as lev5, 
        t6.strID as lev6, 
        t6.*
        FROM Users AS t1
        LEFT JOIN Users AS t2 ON t2.iParentID = t1.id
        LEFT JOIN Users AS t3 ON t3.iParentID = t2.id
        LEFT JOIN Users AS t4 ON t4.iParentID = t3.id
        LEFT JOIN Users AS t5 ON t5.iParentID = t4.id
        LEFT JOIN Users AS t6 ON t6.iParentID = t5.id
        WHERE t6.iClass='5' AND t6.strID='${listOnline[i]}' ;`
        );

        if ( list.length > 0 )
            list2.push(list[0]);
    }
            
    full_count = list2.length;


    var object = {};
    object.draw = req.body.draw;
    object.recordsTotal = full_count;
    object.recordsFiltered = list_count;
    object.data = list2;

    res.send(JSON.stringify(object));
});

router.get('/recorddailycash', (req, res) => {

    if ( req.user == undefined )
        res.redirect('/account/login');
    else
        res.render('user/recorddailycash', {type:0, user:req.user});
});

router.get('/dailyonlinechart', (req, res) => {

    if ( req.user == undefined )
        res.redirect('/account/login');
    else
        res.render('user/dailyonlinechart', {type:0, user:req.user});
});

router.get('/recordlogin', (req, res) => {

    if ( req.user == undefined )
        res.redirect('/account/login');
    else
        res.render('user/recordlogin', {type:0, user:req.user});
});

module.exports = router;
