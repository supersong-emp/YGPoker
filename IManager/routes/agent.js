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

var requestIp = require('request-ip');

router.get('/agentlist', async(req, res) => {

    if ( req.user == undefined )
        res.redirect('/account/login');
    else
        res.render('agent/agentlist', {type:0, user:req.user});

});

////////////////////////////////////////////////////////////////////////////////////////////////////
//  #agent

let GetChildren = async (strGroupID, iTargetClass, dateStart, dateEnd, strID) => {

    //console.log(`##### GetChildren strGroupID (${strGroupID}), iClass (${iTargetClass})`);
    let idCondition = strID ? `AND t2.strID = '${strID}'` : '';
    const [list] = await db.sequelize.query(`
        SELECT
        t2.id as id,
        t2.strID as strID,
        t2.strNickname as strNickname,
        t2.strGroupID as strGroupID,
        t2.iClass as iClass,
        t2.fSettle as fSettle,
        t2.fHoldemR as fHoldemR,
        t2.iCash as iMyMoney,
        t2.iRolling as iMyRolling,
        t2.createdAt as createdAt,
        t2.updatedAt as updatedAt,
        IFNULL((SELECT sum(iAmount) FROM Inouts WHERE strGroupID LIKE CONCAT(t2.strGroupID,'%') AND eState = 'COMPLETE' AND eType = 'INPUT' AND date(createdAt) BETWEEN '${dateStart}' AND '${dateEnd}' ),0) as iInput,
        IFNULL((SELECT sum(iAmount) FROM Inouts WHERE strGroupID LIKE CONCAT(t2.strGroupID,'%') AND eState = 'COMPLETE' AND eType = 'OUTPUT' AND date(createdAt) BETWEEN '${dateStart}' AND '${dateEnd}'),0) as iOutput,
        IFNULL((SELECT SUM(iCash) FROM Users WHERE strGroupID LIKE CONCAT(t2.strGroupID,'%') AND iClass != 0),0) as iTotalMoney,
        IFNULL((SELECT SUM(iPoint) FROM Users WHERE strGroupID LIKE CONCAT(t2.strGroupID,'%') AND iClass != 0),0) as iTotalPoint,
        IFNULL((SELECT SUM(iAmount) FROM RecordBets WHERE strGroupID LIKE CONCAT(t1.strGroupID,'%')),0) as iTotalBets
        FROM Users AS t1
        LEFT JOIN Users AS t2 ON t2.iParentID = t1.id
        WHERE t2.iClass = '${iTargetClass}' AND t1.strGroupID LIKE CONCAT('${strGroupID}', '%') ${idCondition};`
    );

    return list;
}

let RecursiveGetChildren = async (strGroupID, iTargetClass, dateStart, dateEnd, strID, list) =>
{
    if ( parseInt(iTargetClass) >= 5 )
    //if ( iTargetClass > 0 )
        return;
    
    let children = await GetChildren(strGroupID, parseInt(iTargetClass), dateStart, dateEnd, strID);
    for ( let i in children )
    {
        list.push(children[i]);
        //console.log(`==========> Pushed ${children[i].strID}`);
        //await RecursiveGetChildren(children[i].strGroupID, parseInt(children[i].iClass), dateStart, dateEnd, list);
    }
}

router.post('/request_agentlist', async(req, res) => {

    console.log('/list');
    console.log(req.body);

    //console.log(`strID : ${req.user.strID}, iClass : ${req.user.iClass}, strGroupID : ${req.user.strGroupID}`);
    //console.log(req.body.search);
    var data = [];

    let listAgents = [];

    await RecursiveGetChildren(req.user.strGroupID, req.body.iClass, req.body.dateStart, req.body.dateEnd, req.body.search, listAgents);

    // 이 부분에서 start와 length를 사용해야 합니다.
    let start = req.body.start; // Ajax 요청에서 시작 인덱스를 가져옵니다.
    let length = req.body.length; // Ajax 요청에서 가져올 데이터의 수를 가져옵니다.

    // 잘라낸 배열을 사용해 data를 채웁니다.
    for (let i = start; i < start + length && i < listAgents.length; i++) {
        data.push(listAgents[i]);
    }

    let totalRecords = await db.Users.count();  // 전체 레코드 수를 얻는 쿼리

    let filteredRecords = listAgents.length;

    var object = {};
    object.draw = req.body.draw;
    object.recordsTotal = totalRecords;
    object.recordsFiltered = filteredRecords;
    object.data = data;

    res.send(JSON.stringify(object));
});

router.post('/request_agentlistchild', async(req, res) => {

    console.log('/request_agentlistchild');
    console.log(req.body);

    //console.log(`strID : ${req.user.strID}, iClass : ${req.user.iClass}, strGroupID : ${req.user.strGroupID}`);
    var user = await db.Users.findOne({where:{id:req.body.id}});
    let iTargetClass = 0;
    let message = '';
    let result = '';

    if (user.iClass == 4) {
        // Send a message if user.iClass is 4.
        //res.send({result:'NotChild', reason:'더 이상의 하부는 없습니다.'});

        iTargetClass = parseInt(user.iClass);
        message = '더 이상의 하부는 없습니다.';
        result = 'NotChild';
    }
    else
    {
        iTargetClass = parseInt(user.iClass) + 1;
        result = 'OK';
    }

    var data = [];
    let listAgents = [];
    
    await RecursiveGetChildren(user.strGroupID, iTargetClass, req.body.dateStart, req.body.dateEnd, req.body.search, listAgents);

    // 이 부분에서 start와 length를 사용해야 합니다.
    let start = req.body.start; // Ajax 요청에서 시작 인덱스를 가져옵니다.
    let length = req.body.length; // Ajax 요청에서 가져올 데이터의 수를 가져옵니다.

    // 잘라낸 배열을 사용해 data를 채웁니다.
    for (let i = start; i < start + length && i < listAgents.length; i++) {
        data.push(listAgents[i]);
    }

    let totalRecords = await db.Users.count();  // 전체 레코드 수를 얻는 쿼리

    let filteredRecords = listAgents.length;

    var object = {};
    object.draw = req.body.draw;
    object.recordsTotal = totalRecords;
    object.recordsFiltered = filteredRecords;
    object.data = data;
    object.message = message;
    object.result = result;

    res.send(JSON.stringify(object));
});

router.post('/request_agentdetail', async (req, res)=> {

    console.log('/request_agentdetail');
    //console.log(req.body);

    var object = {};
    object.result = "OK";
    var user = await db.Users.findOne({where:{strID:req.body.strID}});

    if ( user == null )
    {
        object.result = "사용자 조회 실패";
    }
    else
    {
        let objectData = {
            strID:user.strID,
            strNickname:user.strNickname,
            iClass:user.iClass,
            strParentID:'',
            strPassword:user.strPassword,
            fHoldemR:user.fHoldemR,
            fBig2R:user.fBig2R,
            fSitgoR:user.fSitgoR,
            fOmahaR:user.fOmahaR,
            fBaccaratR:user.fBaccaratR,
            fSettle:user.fSettle,
            iPoint:user.iPoint,
            iCash:user.iCash,
            strBank:user.strBank,
            strName:user.strName,
            strAccount:user.strAccount,
        };

        let parent = null;
        if ( user.iParentID != null )
        {
            parent = await db.Users.findOne({where:{id:user.iParentID}});
        }
        // object.data = ;
        // object.data.strParentID = '';
        if ( parent != null )
            objectData.strParentID = parent.strID;

        object.data = objectData;
    }
    res.send(object);
});

router.post('/request_checkrolling', async (req, res) => {

    console.log(`/request_checkrolling`);
    console.log(req.body);
    var object = {};
    
    const user = await db.Users.findOne({where:{strID:req.body.strID}});
        var games = ['HOLDEM', 'BIG2', 'SITGO', 'OMAHA', 'BACCARAT'];
        var classRange = ['fClass1', 'fClass2', 'fClass3', 'fClass4', 'fClass5'];
    
        var rolling = {};
        for (var i = 0; i < games.length; i++) {
            var game = await db.Rollings.findOne({ where: { strGame: games[i] } });
            rolling[games[i]] = game;
        }
    
        var fMax = {};
        var fMin = {};
        for (var j = 0; j < classRange.length; j++) {
            for (var k = 0; k < games.length; k++) {
                var key = games[k];
                fMax[key] = fMax[key] || {};
                fMin[key] = fMin[key] || {};
                fMax[key][classRange[j]] = rolling[key][classRange[j] + 'Max'];
                fMin[key][classRange[j]] = rolling[key][classRange[j] + 'Min'];
            }
        }
        //const cClass = parseInt(req.body.iClass);
        let parent = null;
        if ( user.iClass > 1 )
        {
            parent = await db.Users.findOne({where:{id:user.iParentID}});
        }
        else
        {
            parent = await db.Users.findOne({where:{strID:'admin'}});
        }
    
    
        if ( parent == null )
        {
            object.result = 'Error';
            object.error = 'NotExistParent';
            res.send(object);
        }
        else
        { 
            for (var k = 0; k < games.length; k++) {
                var key = games[k];
                if(parent[key.toLowerCase() + 'R'] < fMax[key][classRange[req.body.iClass - 1]]) {
                  fMax[key][classRange[req.body.iClass - 1]] = parent[key.toLowerCase() + 'R'];
                }
            }
            var fHoldemRMax = fMax['HOLDEM'][classRange[req.body.iClass - 1]];
            var fHoldemRMin = fMin['HOLDEM'][classRange[req.body.iClass - 1]];
            var fBig2RMax = fMax['BIG2'][classRange[req.body.iClass - 1]];
            var fBig2RMin = fMin['BIG2'][classRange[req.body.iClass - 1]];
            var fSitgoRMax = fMax['SITGO'][classRange[req.body.iClass - 1]];
            var fSitgoRMin = fMin['SITGO'][classRange[req.body.iClass - 1]];
            var fOmahaRMax = fMax['OMAHA'][classRange[req.body.iClass - 1]];
            var fOmahaRMin = fMin['OMAHA'][classRange[req.body.iClass - 1]];
            var fBaccaratRMax = fMax['BACCARAT'][classRange[req.body.iClass - 1]];
            var fBaccaratRMin = fMin['BACCARAT'][classRange[req.body.iClass - 1]];
    
            console.log(`fHoldemRMax : ${fHoldemRMax}, fHoldemRMax : ${fHoldemRMin}, fHoldemRMax : ${fBig2RMax}, fHoldemRMax : ${fBig2RMin}`);
            let objectData = {
                fHoldemRMax:fHoldemRMax,
                fHoldemRMin:fHoldemRMin,
                fBig2RMax:fBig2RMax,
                fBig2RMin:fBig2RMin,
                fSitgoRMax:fSitgoRMax,
                fSitgoRMin:fSitgoRMin,
                fOmahaRMax:fOmahaRMax,
                fOmahaRMin:fOmahaRMin,
                fBaccaratRMax:fBaccaratRMax,
                fBaccaratRMin:fBaccaratRMin
            };
            object.result = "OK";
            object.data = objectData;
            res.send(object);
        }
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

let GetCode = (n, digits) => {

    let zero = '';
    n = n.toString();

    if (n.length < digits) {
        for (let i = 0; i < digits - n.length; i++)
            zero += '0';
    }
    return zero + n;
}

let GetGroupID = async (strParentGroupID) => {

    let iCurrent = 0;
    while ( 1 )
    {
        const strGroupID = strParentGroupID + GetCode(iCurrent, 2);
        console.log(`Check GroupID : ${strGroupID}`);

        let user = await db.Users.findOne({where:{strGroupID:strGroupID}});
        if ( user == null )
            return strGroupID;

        ++ iCurrent;
    }

    return null;
}

router.post('/request_register', async(req, res) => {

    console.log('/request_register');
    console.log(req.body);

    const ip = requestIp.getClientIp(req);

    var object = {};
    object.result = "OK";

    var games = ['HOLDEM', 'BIG2', 'SITGO', 'OMAHA', 'BACCARAT'];
    var classRange = ['fClass1', 'fClass2', 'fClass3', 'fClass4', 'fClass5'];

    var rolling = {};
    for (var i = 0; i < games.length; i++) {
        var game = await db.Rollings.findOne({ where: { strGame: games[i] } });
        rolling[games[i]] = game;
    }

    var fMax = {};
    var fMin = {};
    for (var j = 0; j < classRange.length; j++) {
        for (var k = 0; k < games.length; k++) {
            var key = games[k];
            fMax[key] = fMax[key] || {};
            fMin[key] = fMin[key] || {};
            fMax[key][classRange[j]] = rolling[key][classRange[j] + 'Max'];
            fMin[key][classRange[j]] = rolling[key][classRange[j] + 'Min'];
        }
    }
    const cClass = parseInt(req.body.iClass);
    let parent = null;
    if ( cClass > 1 )
    {
        parent = await db.Users.findOne({where:{strID:req.body.strParentID, iClass:parseInt(req.body.iClass)-1}});
    }
    else
    {
        parent = await db.Users.findOne({where:{strID:req.body.strParentID}});
    }


    if ( parent == null )
    {
        object.result = 'Error';
        object.error = 'NotExistParent';
        res.send(object);
    }
    else
    {
        var user = await db.Users.findOne({where:{strID:req.body.strID}});
        for (var k = 0; k < games.length; k++) {
            var key = games[k];
            if(parent[key.toLowerCase() + 'R'] < fMax[key][classRange[req.body.iClass - 1]]) {
              fMax[key][classRange[req.body.iClass - 1]] = parent[key.toLowerCase() + 'R'];
            }
        }
        var fHoldemRMax = fMax['HOLDEM'][classRange[req.body.iClass - 1]];
        var fHoldemRMin = fMin['HOLDEM'][classRange[req.body.iClass - 1]];
        var fBig2RMax = fMax['BIG2'][classRange[req.body.iClass - 1]];
        var fBig2RMin = fMin['BIG2'][classRange[req.body.iClass - 1]];
        var fSitgoRMax = fMax['SITGO'][classRange[req.body.iClass - 1]];
        var fSitgoRMin = fMin['SITGO'][classRange[req.body.iClass - 1]];
        var fOmahaRMax = fMax['OMAHA'][classRange[req.body.iClass - 1]];
        var fOmahaRMin = fMin['OMAHA'][classRange[req.body.iClass - 1]];
        var fBaccaratRMax = fMax['BACCARAT'][classRange[req.body.iClass - 1]];
        var fBaccaratRMin = fMin['BACCARAT'][classRange[req.body.iClass - 1]];
    
        console.log(`fHoldemRMax : ${fHoldemRMax}, fHoldemRMax : ${fHoldemRMin}, fHoldemRMax : ${fBig2RMax}, fHoldemRMax : ${fBig2RMin}`);
        if(parseFloat(req.body.fHoldemR) > parseFloat(fHoldemRMax) || parseFloat(req.body.fHoldemR) < parseFloat(fHoldemRMin))
        {
            object.result = 'Error';
            object.error = 'ExistHoldemR';
            object.fHoldemRMax = fHoldemRMax;
            object.fHoldemRMin = fHoldemRMin;
            res.send(object);
            return;
        }
        if(parseFloat(req.body.fBig2R) > parseFloat(fBig2RMax) || parseFloat(req.body.fBig2R) < parseFloat(fBig2RMin))
        {
            object.result = 'Error';
            object.error = 'ExistBig2R';
            object.fBig2RMax = fBig2RMax;
            object.fBig2RMin = fBig2RMin;
            res.send(object);
            return;
        }
        if(parseFloat(req.body.fSitgoR) > parseFloat(fSitgoRMax) || parseFloat(req.body.fSitgoR) < parseFloat(fSitgoRMin))
        {
            object.result = 'Error';
            object.error = 'ExistSitgoR';
            object.fSitgoRMax = fSitgoRMax;
            object.fSitgoRMin = fSitgoRMin;
            res.send(object);
            return;
        }
        if(parseFloat(req.body.fOmahaR) > parseFloat(fOmahaRMax) || parseFloat(req.body.fOmahaR) < parseFloat(fOmahaRMin))
        {
            object.result = 'Error';
            object.error = 'ExistOmahaR';
            object.fOmahaRMax = fOmahaRMax;
            object.fOmahaRMin = fOmahaRMin;
            res.send(object);
            return;
        }
        if(parseFloat(req.body.fBaccaratR) > parseFloat(fBaccaratRMax) || parseFloat(req.body.fBaccaratR) < parseFloat(fBaccaratRMin))
        {
            object.result = 'Error';
            object.error = 'ExistBaccaratR';
            object.fBaccaratRMax = fBaccaratRMax;
            object.fBaccaratRMin = fBaccaratRMin;
            res.send(object);
            return;
        }
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
            let strGroupID = await GetGroupID(parent.strGroupID);

            await db.Users.create({
                strID:req.body.strID,
                strPassword:req.body.strPassword,
                strNickname:req.body.strNickname,
                iClass:req.body.iClass,
                strGroupID:strGroupID,
                iParentID:parent.id,
                fSettle:req.body.fSettle,
                fHoldemR:req.body.fHoldemR,
                fBig2R:req.body.fBig2R,
                fSitgoR:req.body.fSitgoR,
                fOmahaR:req.body.fOmahaR,
                fBaccaratR:req.body.fBaccaratR,
                iPoint:0,
                iCash:0,
                strName:req.body.strName,
                eUserType:'AGENT',
                strEMail:'',
                strImage:'',
                eStatus:req.body.eStatus,
                eAuthenticated:'NONE',
                iAvatar:0,
                iLevel:0,
                iExp:0,
                strBank:req.body.strBank,
                strAccount:req.body.strAccount,
                strMobileNo:req.body.strMobileNo,
                strOptionCode:'11110000',
                iRolling:0,
                iPointBase:0,
                iCashBase:0,
                strDesc:'',
                strIP:ip
            });
            
            res.send(object);
        }
        else
        {
            //let admin = await db.Users.findOne({where:{strID:req.user.strID}});

            await user.update({
                strPassword:req.body.strPassword,
                fSettle:req.body.fSettle,
                fHoldemR:req.body.fHoldemR,
                fBig2R:req.body.fBig2R,
                fSitgoR:req.body.fSitgoR,
                fOmahaR:req.body.fOmahaR,
                fBaccaratR:req.body.fBaccaratR,
                //iPoint:req.body.iPoint,
                //iCash:req.body.iCash,
                strBank:req.body.strBank,
                strName:req.body.strName,
                strAccount:req.body.strAccount,
                strNickname:req.body.strNickname,
            });
            
            res.send(object);
        }
    }
});

router.post( '/request_moneysend', async (req, res) => {
    console.log('/request_moneysend');
    console.log(req.body);

    var object = {};
    object.result = "OK";

    var user = await db.Users.findOne({where:{strID:req.body.strID}});
    var admin = await db.Users.findOne({where:{strID:req.user.strID}});
        if ( null != user )
        {
            await admin.decrement({iCash:req.body.iCash,iPoint:req.body.iPoint});
            await user.increment({iCash:req.body.iCash,iPoint:req.body.iPoint});
            if(req.body.iCash > 0)
            {
                await db.Inouts.create({
                    strID:user.strID,
                    strNickname:user.strNickname,
                    iClass:user.iClass,
                    strGroupID:user.strGroupID,
                    strDepositor:user.strName,
                    iAmount:req.body.iCash,
                    strGivename:req.user.strNickname,
                    eType:'GIVE',
                    eState:'COMPLETE',
                });
            }
            if(req.body.iPoint > 0)
            {
                await db.Inouts.create({
                    strID:user.strID,
                    strNickname:user.strNickname,
                    iClass:user.iClass,
                    strGroupID:user.strGroupID,
                    strDepositor:user.strName,
                    iAmount:req.body.iPoint,
                    strGivename:req.user.strNickname,
                    eType:'PGIVE',
                    eState:'COMPLETE',
                });
            }
            res.send(object);
        }
        else
        {
            object.result = 'Error';
            object.error = 'NotExistUser';
            res.send(object);
        }
});

router.post('/request_accountchange', async(req, res) => {

    console.log('/request_accountchange');
    console.log(req.body);

    var object = {};
    
    var user = await db.Users.findOne({where:{strID:req.body.strID}});
    if(user == null)
    {
        res.send({result:'NOTID', reason:'아이디를 확인해주세요.'});
        return;
    }

    await user.update({
        strName:req.body.strName,
        strBank:req.body.strBank,
        strAccount:req.body.strAccount,
    });
    object.result = "OK";
    res.send(object);
});

router.post('/request_passwordchange', async(req, res) => {
    console.log('/request_passwordchange');
    console.log(req.body);

    var object = {};
    
    var user = await db.Users.findOne({where:{strID:req.body.strID}});
    if(user.strPassword == req.body.currentPassword)
    {
        res.send({result:'SAMEPASSWORD', reason:'비밀번호가 같습니다.'});
        return;
    }
    await user.update({
        strPassword:req.body.newPassword
    });
    object.result = "OK";
    res.send(object);
});

router.get('/recorddailyagent', (req, res) => {

    if ( req.user == undefined )
        res.redirect('/account/login');
    else
        res.render('agent/recorddailyagent', {type:0, user:req.user});
});

router.post('/request_recorddailyagent', async(req, res) => {

    console.log('/list');
    console.log(req.body);

    console.log(`strID : ${req.user.strID}, iClass : ${req.user.iClass}, strGroupID : ${req.user.strGroupID}`);

    var data = [];
    var list_count = req.body.length;
    var full_count = 0;

    //let listAgents = [];

    const [listAgents] = await db.sequelize.query(`
    SELECT
        t2.id as id,
        t2.strID as strID,
        t2.strNickname as strNickname,
        t2.iCash as iCash,
        t2.iPoint as iPoint,
        t2.iCashBase-t2.iCash as iCashInout,
        t2.iPointBase-t2.iPoint as iPointInout,
        IFNULL((SELECT sum(iAmount) FROM Inouts WHERE strGroupID LIKE CONCAT(t2.strGroupID,'%') AND eState = 'COMPLETE' AND eType = 'INPUT' AND date(createdAt) BETWEEN '${req.body.dateStart}' AND '${req.body.dateEnd}' ),0) as iInput,
        IFNULL((SELECT sum(iAmount) FROM Inouts WHERE strGroupID LIKE CONCAT(t2.strGroupID,'%') AND eState = 'COMPLETE' AND eType = 'OUTPUT' AND date(createdAt) BETWEEN '${req.body.dateStart}' AND '${req.body.dateEnd}'),0) as iOutput,
        IFNULL((SELECT sum(iAmount) FROM RecordBets WHERE strGroupID LIKE CONCAT(t2.strGroupID,'%') AND date(createdAt) BETWEEN '${req.body.dateStart}' AND '${req.body.dateEnd}'),0) as iBetting,
        IFNULL((SELECT COUNT(*) FROM Users WHERE strGroupID LIKE CONCAT(t2.strGroupID,'%') AND date(createdAt) BETWEEN '${req.body.dateStart}' AND '${req.body.dateEnd}'),0) as iNumNewUsers,
        IFNULL((SELECT COUNT(*) FROM Users WHERE strGroupID LIKE CONCAT(t2.strGroupID,'%') AND iClass='5'),0) as iNumUsers
		FROM Users AS t1
        LEFT JOIN Users AS t2 ON t2.iParentID = t1.id
        WHERE t2.iClass='${req.body.iClassTarget}' AND t1.strGroupID LIKE CONCAT('${req.body.strGroupID}', '%');`
);

    full_count = listAgents.length;

    for (var i in listAgents )
    {
        data.push(
            listAgents[i]
        );
    }

    var object = {};
    object.draw = req.body.draw;
    object.recordsTotal = full_count;
    object.recordsFiltered = list_count;
    object.data = data;

    res.send(JSON.stringify(object));
});

router.get('/recordcash', (req, res) => {

    if ( req.user == undefined )
        res.redirect('/account/login');
    else
        res.render('agent/recordcash', {type:0, user:req.user});
});

router.get('/recordpoint', (req, res) => {

    if ( req.user == undefined )
        res.redirect('/account/login');
    else
        res.render('agent/recordpoint', {type:0, user:req.user});
});

router.post('/request_accountchangelist', async (req, res)=> {

    console.log('/request_accountchangelist');
    console.log(req.body);

    var object = {};
    object.result = "OK";
    var user = await db.Users.findOne({where:{strID:req.body.strID}});
    let objectData = {
        strName:user.strName,
        strBank:user.strBank,
        strAccount:user.strAccount,
    };
    object.data = objectData;
    res.send(object);
});

router.post('/request_admininfo', async (req, res)=> {

    console.log('/request_admininfo');
    console.log(req.body);

    var object = {};
    object.result = "OK";
    var user = await db.Users.findOne({where:{strID:req.body.strID}});
    let objectData = {
        strName:user.strName,
        strBank:user.strBank,
        strAccount:user.strAccount,
    };
    object.data = objectData;
    res.send(object);
});

router.post('/request_rollingchange', async(req, res) => {
    console.log('/request_rollingchange');
    console.log(req.body);

    var object = {};
    
    var user = await db.Users.findOne({where:{strID:req.user.strID}});
    if(user.iRolling < req.body.iRolling)
    {
        res.send({result:'NOMONEY', reason:'내 보유 롤링금액보다 큽니다.'});
        return;
    }

    await db.Users.increment({iCash:req.body.iRolling}, {where:{strID:user.strID}});
    await db.Users.decrement({iRolling:req.body.iRolling}, {where:{strID:user.strID}});

    object.result = "OK";
    res.send(object);
});
module.exports = router;
