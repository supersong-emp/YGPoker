const express = require('express');
const passport = require('passport');
const router = express.Router();

const axios = require('axios');
var moment = require('moment');

router.use(express.json());
router.use(express.urlencoded({extended:false}));

const path = require('path');
router.use(express.static(path.join(__dirname, '..', 'public')));

const db = require('../db');
const ITime = require('../utils/time');
const {Op, and, Sequelize}= require('sequelize');




router.get('/input', async (req, res) => {
    console.log("input");
    console.log(req.body);
    if ( req.user == undefined )
        res.redirect('/account/login');
    else
        res.render('agent/input', {type:0, user:req.user});
});

router.post('/inputlist', async (req, res) => {

    console.log('/inputlist');
    console.log(req.body);

    var data = [];
    //var list_count = 0;
    var full_count = 0;
    
    var strTimeStart = req.body.startDate;
    var strTimeEnd = req.body.endDate;
    //console.log("start : " + req.body.start);
    //console.log("startDate : "+ moment(strTimeStart).format('YYYY-MM-DD hh:mm:ss') + " endDate : "+ moment(strTimeEnd).format('YYYY-MM-DD hh:mm:ss'));

    let filter = [];

    if ( req.body.userTypeFilter == '')
    {
        filter.push('STANDBY');
        filter.push('COMPLETE');
        filter.push('CANCEL');
    }
    else
        filter.push(req.body.userTypeFilter);

    var querydatas = await db.Inouts.findAll({
        order: [['id', 'DESC']],
         where:{
            [Op.and]:[{
                 createdAt:{[Op.between]:[ moment(strTimeStart).format('YYYY-MM-DD hh:mm:ss'), moment(strTimeEnd).format('YYYY-MM-DD hh:mm:ss')]},
                 eState:{[Op.or]:filter},
                 eType:{[Op.or]:['INPUT']}
            }]
        }
    });
    full_count = querydatas.length;

    for (var i in querydatas )
    {
        data.push({
            number:querydatas.length-i,
            id:querydatas[i].id,
            strID:querydatas[i].strID,
            strNickname:querydatas[i].strID,
            iClass:querydatas[i].iClass,
            strGroupID:querydatas[i].strGroupID,
            iAmount:querydatas[i].iAmount,
            strDepositor:querydatas[i].strDepositor,
            strMobileNo:querydatas[i].strGroupID,
            createdAt:querydatas[i].createdAt,
            eState:querydatas[i].eState
        });
    }
    //console.log(querydatas);
    var object = {};
    object.draw = req.body.draw;
    object.recordsTotal = full_count;
    //object.recordsFiltered = list_count;
    object.recordsFiltered = full_count;
    object.data = data;

    //console.log(object);

    //res.send({data:list});
    //res.send(object);
    res.send(JSON.stringify(object));

});

router.post('/inputlistgrouptoday', async (req, res) => {

    console.log('/inputlistgrouptoday');
    console.log(req.body);


    // let filter = [];
    // if ( req.body.userTypeFilter == '')
    // {
    //     filter.push('STANDBY');
    //     filter.push('COMPLETE');
    //     filter.push('CANCEL');
    // }
    // else
    //     filter.push(req.body.userTypeFilter);

    var strTimeStart = ITime.getTimeStamp(0);
    var strTimeEnd = ITime.getTimeStamp(0);

    var charges = await db.Inouts.findAll({
        attributes: [
            [db.sequelize.fn('DATE_FORMAT', db.sequelize.col('createdAt'), '%Y-%m-%d'), 'dates'],
            [db.sequelize.fn('SUM', db.sequelize.col('iAmount')), 'total_amount'],
            [db.sequelize.fn('COUNT', db.sequelize.col('iAmount')), 'total_count'],
        ],
        //group: [db.sequelize.fn('DAY', db.sequelize.col('createdAt'))]
        group:'dates',
        raw:true,
        where:{
            createdAt:{
                [Op.between]:[ strTimeStart, require('moment')(strTimeEnd).add(1, 'days').format('YYYY-MM-DD')],
            },
            // eState:{
            //     [Op.or]:filter,
            // }
        }
    });

    console.log(`*********************** charges length :${charges.length}`);

    for ( var i in charges)
    {
        console.log(charges[i]);
        console.log(`createdAt : ${charges[i].createdAt}, total_amount : ${charges[i].total_amount}`);
    }

    var object = {};
    object.draw = req.body.draw;
    object.recordsTotal = charges.length;
    //object.recordsFiltered = list_count;
    object.recordsFiltered =  charges.length;
    object.data = charges;

//    console.log(object);

    //res.send({data:list});
    //res.send(object);
    res.send(JSON.stringify(object));

});

router.post('/inputlistgroup', async (req, res) => {

    console.log('/inputlistgroup');
    console.log(req.body);


    let filter = [];
    if ( req.body.userTypeFilter == '')
    {
        filter.push('STANDBY');
        filter.push('COMPLETE');
        filter.push('CANCEL');
    }
    else
        filter.push(req.body.userTypeFilter);

    var strTimeStart = req.body.startDate;
    var strTimeEnd = req.body.endDate;

    var charges = await db.Inouts.findAll({
        attributes: [
            [db.sequelize.fn('DATE_FORMAT', db.sequelize.col('createdAt'), '%Y-%m-%d'), 'dates'],
            [db.sequelize.fn('SUM', db.sequelize.col('iAmount')), 'total_amount'],
            [db.sequelize.fn('COUNT', db.sequelize.col('iAmount')), 'total_count'],
        ],
        //group: [db.sequelize.fn('DAY', db.sequelize.col('createdAt'))]
        group:'dates',
        raw:true,
        where:{
            createdAt:{
                [Op.between]:[ strTimeStart, require('moment')(strTimeEnd).add(1, 'days').format('YYYY-MM-DD')],
            },
            eState:{
                [Op.or]:filter,
            }
        }
    });

    console.log(`*********************** charges length :${charges.length}`);

    for ( var i in charges)
    {
        console.log(charges[i]);
        console.log(`createdAt : ${charges[i].createdAt}, total_amount : ${charges[i].total_amount}`);
    }

    var object = {};
    object.draw = req.body.draw;
    object.recordsTotal = charges.length;
    //object.recordsFiltered = list_count;
    object.recordsFiltered =  charges.length;
    object.data = charges;

//    console.log(object);

    //res.send({data:list});
    //res.send(object);
    res.send(JSON.stringify(object));

});


router.post('/inputdetail', async (req, res) => {

    //console.log("? " + req.body);

    const input = await db.Inouts.findOne({where:{id:req.body.id}});
    if ( input != null )
    {
        let result = {result:'OK', id:req.body.id, state:input.eState};

        console.log(result);

        res.send(result);
    }
    else
        res.send({result:'FAIL', reason:'조회 실패'});
});

router.post('/inputcomplete', async (req, res) => {

    //console.log(req.body);

    const input = await db.Inouts.findOne({where:{id:req.body.id}});
    let result ={};
    console.log(input.strID);
    if ( input != null )
    {
        if ( req.body.state == 'COMPLETE' )
        {
            let user = await db.Users.findOne({where:{strID:input.strID}});
            console.log(input.strID);
            if ( user != null )
            {
                console.log("COMPLETE");
                let total = user.iCash + parseInt(input.iAmount);

                await user.update({iCash:total})
                await input.update({eState:req.body.state});
                result = {result:'OK'}
            }
            else
            {
                result = {result:'NOID'}
            }
        }
        else if(req.body.state == 'CANCEL')
        {
            console.log("CANCEL");
            await input.update({eState:req.body.state});
            result = {result:'OK'}
        }
        else
        {
            console.log("STANDBY");
            result = {result:'OK'}
        }
        //let result = {result:'OK'};

        console.log(result);

        res.send(result);
    }
    else
        res.send({result:'FAIL', reason:'조회 실패'});
});

//  Output


router.get('/output', async (req, res) => {
    if ( req.user == undefined )
        res.redirect('/account/login');
    else
        res.render('agent/output', {type:0, user:req.user});
});

router.post('/outputlist', async (req, res) => {

    console.log('/outputlist');
    //console.log(req.body);

    var data = [];
    var list_count = req.body.length;
    var full_count = 0;
    
    var strTimeStart = req.body.startDate;
    var strTimeEnd = req.body.endDate;
    //console.log("start : " + req.body.start);
    //console.log("startDate : "+ moment(strTimeStart).format('YYYY-MM-DD hh:mm:ss') + " endDate : "+ moment(strTimeEnd).format('YYYY-MM-DD hh:mm:ss'));

    let filter = [];
    if ( req.body.userTypeFilter == '')
    {
        filter.push('STANDBY');
        filter.push('COMPLETE');
        filter.push('CANCEL');
    }
    else
        filter.push(req.body.userTypeFilter);

    var querydatas = await db.Inouts.findAll({
        order: [['id', 'DESC']],
        where:{
            [Op.and]:[{
                createdAt:{[Op.between]:[ moment(strTimeStart).format('YYYY-MM-DD hh:mm:ss'), moment(strTimeEnd).format('YYYY-MM-DD hh:mm:ss')]},
                eState:{[Op.or]:filter},
                eType:{[Op.or]:['OUTPUT']}
           }]
        }
    });

    full_count = querydatas.length;

    for (var i in querydatas )
    {
        data.push({
            id:querydatas.length-i,
            strID:querydatas[i].strID,
            strNickname:querydatas[i].strID,
            iClass:querydatas[i].iClass,
            strGroupID:querydatas[i].strGroupID,
            iAmount:querydatas[i].iAmount,
            strDepositor:querydatas[i].strDepositor,
            strMobileNo:querydatas[i].strGroupID,
            createdAt:querydatas[i].createdAt,
            eState:querydatas[i].eState
        });
    }
    var object = {};
    object.draw = req.body.draw;
    object.recordsTotal = full_count;
    object.recordsFiltered = list_count;
    //object.recordsFiltered = full_count;
    object.data = data;

    console.log(object);

    res.send(JSON.stringify(object));
});


router.post('/outputlistgrouptoday', async (req, res) => {

    console.log('/outputlistgrouptoday');
    console.log(req.body);


    // let filter = [];
    // if ( req.body.userTypeFilter == '')
    // {
    //     filter.push('STANDBY');
    //     filter.push('COMPLETE');
    //     filter.push('CANCEL');
    // }
    // else
    //     filter.push(req.body.userTypeFilter);

    var strTimeStart = ITime.getTimeStamp(0);
    var strTimeEnd = ITime.getTimeStamp(0);

    var charges = await db.Inouts.findAll({
        attributes: [
            [db.sequelize.fn('DATE_FORMAT', db.sequelize.col('createdAt'), '%Y-%m-%d'), 'dates'],
            [db.sequelize.fn('SUM', db.sequelize.col('iAmount')), 'total_amount'],
            [db.sequelize.fn('COUNT', db.sequelize.col('iAmount')), 'total_count'],
        ],
        //group: [db.sequelize.fn('DAY', db.sequelize.col('createdAt'))]
        group:'dates',
        raw:true,
        where:{
            createdAt:{
                [Op.between]:[ strTimeStart, require('moment')(strTimeEnd).add(1, 'days').format('YYYY-MM-DD')],
            },
            // eState:{
            //     [Op.or]:filter,
            // }
        }
    });

    console.log(`*********************** charges length :${charges.length}`);

    for ( var i in charges)
    {
        console.log(charges[i]);
        console.log(`createdAt : ${charges[i].createdAt}, total_amount : ${charges[i].total_amount}`);
    }

    var object = {};
    object.draw = req.body.draw;
    object.recordsTotal = charges.length;
    //object.recordsFiltered = list_count;
    object.recordsFiltered =  charges.length;
    object.data = charges;

//    console.log(object);

    //res.send({data:list});
    //res.send(object);
    res.send(JSON.stringify(object));

});

router.post('/outputlistgroup', async (req, res) => {

    console.log('/outputlistgroup');
    console.log(req.body);


    let filter = [];
    if ( req.body.userTypeFilter == '')
    {
        filter.push('STANDBY');
        filter.push('COMPLETE');
        filter.push('CANCEL');
    }
    else
        filter.push(req.body.userTypeFilter);

    var strTimeStart = req.body.startDate;
    var strTimeEnd = req.body.endDate;

    var charges = await db.Inouts.findAll({
        attributes: [
            [db.sequelize.fn('DATE_FORMAT', db.sequelize.col('createdAt'), '%Y-%m-%d'), 'dates'],
            [db.sequelize.fn('SUM', db.sequelize.col('iAmount')), 'total_amount'],
            [db.sequelize.fn('COUNT', db.sequelize.col('iAmount')), 'total_count'],
        ],
        //group: [db.sequelize.fn('DAY', db.sequelize.col('createdAt'))]
        group:'dates',
        raw:true,
        where:{
            createdAt:{
                [Op.between]:[ strTimeStart, require('moment')(strTimeEnd).add(1, 'days').format('YYYY-MM-DD')],
            },
            eState:{
                [Op.or]:filter,
            }
        }
    });

    console.log(`*********************** charges length :${charges.length}`);

    for ( var i in charges)
    {
        console.log(charges[i]);
        console.log(`createdAt : ${charges[i].createdAt}, total_amount : ${charges[i].total_amount}`);
    }

    var object = {};
    object.draw = req.body.draw;
    object.recordsTotal = charges.length;
    //object.recordsFiltered = list_count;
    object.recordsFiltered =  charges.length;
    object.data = charges;

//    console.log(object);

    //res.send({data:list});
    //res.send(object);
    res.send(JSON.stringify(object));

});


router.post('/outputdetail', async (req, res) => {

    console.log(req.body);

    const output = await db.Inouts.findOne({where:{id:req.body.id}});
    if ( output != null )
    {
        let result = {result:'OK', id:req.body.id, state:output.eState};

        console.log(result);

        res.send(result);
    }
    else
        res.send({result:'FAIL', reason:'조회 실패'});
});

router.post('/outputcomplete', async (req, res) => {

    console.log(req.body);

    const output = await db.Inouts.findOne({where:{id:req.body.id}});
    if ( output != null )
    {
        if ( req.body.state == 'COMPLETE' )
        {
            let user = await db.Users.findOne({where:{strID:output.strID}});
            if ( user != null )
            {
                 let total = user.iCash - parseInt(output.iAmount);

                 await user.update({iCash:total})
            }
        }
        // if ( req.body.state == 'CANCEL' )
        // {
        //     await db.User.increment({iPoint:parseInt(output.iAmount)}, {where:{strLoginID:output.strLoginID}});
        // }

        await output.update({eState:req.body.state});

        let result = {result:'OK'};

        console.log(result);

        res.send(result);
    }
    else
        res.send({result:'FAIL', reason:'조회 실패'});
});
router.get('/order', async (req, res) => {
    if ( req.user == undefined )
        res.redirect('/account/login');
    else
        res.render('agent/order', {type:0, user:req.user});
});
//상위배송 DB 가져오기
let GetParent = async (iParentID, dateStart, dateEnd) => {

    console.log(`##### GetParent iParentID (${iParentID})`);

    const [list] = await db.sequelize.query(`
    SELECT
    t1.id as id,
    t1.strID as strID,
    t1.strNickname as strNickname,
    t1.strGroupID as strGroupID,
    t1.iClass as iClass,
    t1.iCash as iCash,
    t1.iParentID as iParentID,
    t2.iAmount as iAmount,
    t2.eType as eType,
    t2.completedAt as completedAt
    FROM Users AS t1
    LEFT JOIN Inouts AS t2 ON t2.strID = t1.strID
    WHERE t1.id = (${iParentID}) AND date(completedAt) BETWEEN '${dateStart}' AND '${dateEnd}' AND (t2.eType ='GIVE' OR t2.eType = 'TAKE')`
    );

    return list;
}

let RecursiveGetParent = async (iParentID, dateStart, dateEnd, list) =>
{
    let parent = await GetParent(iParentID, dateStart, dateEnd);
    for ( let i in parent )
    {
        list.push(parent[i]);
        console.log(`==========> Pushed ${parent[i].strID}`);
       // await RecursiveGetParent(parent[i].iParentID, dateStart, dateEnd, list);
    }
}
router.post('/parentorderlist', async (req, res) => {

    console.log('/parentorderlist');
    console.log(req.user);

    var data = [];
    var list_count = req.body.length;
    var full_count = 0;
    
    //var strTimeStart = req.body.startDate;
    //var strTimeEnd = req.body.endDate;
    
    // var GroupID = req.body.strGroupID;
    // var myid = $(this).parent().parent().attr("data-loginId");

    // var idquerydatas = await db.User.findone({where:{strID:myid}});
    // var querydatas = await db.Inouts.findAll({
    //     order: [['id', 'DESC']],
    //     where:{
    //         [Op.and]:[{
    //             createdAt:{[Op.between]:[ moment(strTimeStart).format('YYYY-MM-DD hh:mm:ss'), moment(strTimeEnd).format('YYYY-MM-DD hh:mm:ss')]},
    //             strGroupID:{[Op.eq]:GroupID},
    //             iClass:{[Op.gt]:idquerydatas.iClass}
    //        }]
    //     }
    // });
    let listParent = [];

    await RecursiveGetParent(req.user.iParentID, req.body.startDate, req.body.endDate, listParent);

    full_count = listParent.length;

    for (var i in listParent )
    {
        data.push({
            iNum:listParent.length-i,
            strID:listParent[i].strID,
            iAmount:listParent[i].iAmount,
            iCash:listParent[i].iCash,
            completedAt:listParent[i].completedAt,
            eType:listParent[i].eType
        });
    }
    var object = {};
    object.draw = req.body.draw;
    object.recordsTotal = full_count;
    object.recordsFiltered = list_count;
    //object.recordsFiltered = full_count;
    object.data = data;

    console.log(object);

    res.send(JSON.stringify(object));
});
//하위배송 DB 가져오기
let GetChildren = async (strGroupID, iMyClass, dateStart, dateEnd) => {

    console.log(`##### GetChildren strGroupID (${strGroupID}), iClass (${iMyClass})`);
    if(iMyClass == 0 )
    {
        var [list] = await db.sequelize.query(`
        SELECT
        t1.id as id,
        t1.strID as strID,
        t1.strGroupID as strGroupID,
        t1.iClass as iClass,
        t1.iCash as iCash,
        t1.iParentID as iParentID,
        t2.iAmount as iAmount,
        t2.eType as eType,
        t2.completedAt as completedAt
        FROM Users AS t1
        LEFT JOIN Inouts AS t2 ON t2.strID = t1.strID
        WHERE date(completedAt) BETWEEN '${dateStart}' AND '${dateEnd}' AND (t2.eType ='GIVE' OR t2.eType = 'TAKE');`
        );
    }
    else {
        var [list] = await db.sequelize.query(`
        SELECT
        t1.id as id,
        t1.strID as strID,
        t1.strGroupID as strGroupID,
        t1.iClass as iClass,
        t1.iCash as iCash,
        t1.iParentID as iParentID,
        t2.iAmount as iAmount,
        t2.eType as eType,
        t2.completedAt as completedAt
        FROM Users AS t1
        LEFT JOIN Inouts AS t2 ON t2.strID = t1.strID
        WHERE t2.iClass > '${iMyClass}' AND t2.strGroupID LIKE CONCAT('${strGroupID}', '%') AND date(completedAt) BETWEEN '${dateStart}' AND '${dateEnd}' AND (t2.eType ='GIVE' AND t2.eType = 'TAKE');`
        );
    }
    return list;
}

let RecursiveGetChildren = async (strGroupID, iMyClass, dateStart, dateEnd, list) =>
{
    let children = await GetChildren(strGroupID, iMyClass, dateStart, dateEnd);
    for ( let i in children )
    {
        list.push(children[i]);
        console.log(`==========> Pushed ${children[i].strID}`);
        //await RecursiveGetChildren(children[i].strGroupID, parseInt(children[i].iClass), dateStart, dateEnd, list);
    }
}
router.post('/childrenorderlist', async (req, res) => {

    console.log('/childrenorderlist');
    console.log(req.user);
    console.log(req.body);
    // const draw = parseInt(req.query.draw);
    // const offset = parseInt(req.query.start);
    // const limit = parseInt(req.query.pageSize);

    var data = [];
    var list_count = req.body.length;
    var full_count = 0;
    
    //var strTimeStart = req.body.startDate;
    //var strTimeEnd = req.body.endDate;
    
    // var GroupID = req.body.strGroupID;
    // var myid = $(this).parent().parent().attr("data-loginId");

    // var idquerydatas = await db.User.findone({where:{strID:myid}});
    // var querydatas = await db.Inouts.findAll({
    //     order: [['id', 'DESC']],
    //     where:{
    //         [Op.and]:[{
    //             createdAt:{[Op.between]:[ moment(strTimeStart).format('YYYY-MM-DD hh:mm:ss'), moment(strTimeEnd).format('YYYY-MM-DD hh:mm:ss')]},
    //             strGroupID:{[Op.eq]:GroupID},
    //             iClass:{[Op.gt]:idquerydatas.iClass}
    //        }]
    //     }
    // });
    let listChildren = [];

    await RecursiveGetChildren(req.user.strGroupID, req.user.iClass, req.body.startDate, req.body.endDate, listChildren);

    full_count = listChildren.length;

    for (var i in listChildren )
    {
        data.push({
            iNum:listChildren.length-i,
            strID:listChildren[i].strID,
            iAmount:listChildren[i].iAmount,
            iCash:listChildren[i].iCash,
            completedAt:listChildren[i].completedAt,
            eType:listChildren[i].eType
        });
    }
    var object = {};
    object.draw = req.body.draw;
    object.recordsTotal = full_count;
    object.recordsFiltered = list_count;
    //object.recordsFiltered = full_count;
    object.data = data;

    console.log(object);

    res.send(JSON.stringify(object));
});
router.get('/monthlist', async (req, res) => {
    if ( req.user == undefined )
        res.redirect('/account/login');
    else
        res.render('agent/monthlist', {type:0, user:req.user});
});
router.post('/findmonthlist', async (req, res) => {

    console.log('/findmonthlist');
    var list_count = req.body.length;
    var strMonth = req.body.strMonth;
    var strGroupID = req.user.strGroupID;
    console.log(strGroupID);
    var object = {};
    if ( req.user.iClass == 0 )
    {
        //  Admin
        const [list] = await db.sequelize.query(`
        select *
        from(	
	        select 
                date_format(t1.startAt , '%Y-%m-%d') as date,
                COALESCE(SUM(CASE WHEN t2.eType = 'INPUT' AND t2.eState = 'COMPLETE' THEN t2.iAmount ELSE 0 END), 0) as "total_input",
                COALESCE(SUM(CASE WHEN t2.eType = 'OUTPUT' AND t2.eState = 'COMPLETE' THEN t2.iAmount ELSE 0 END), 0) as "total_output",
                COALESCE(SUM(CASE WHEN t2.eType = 'TAKE' AND t2.eState = 'COMPLETE' THEN t2.iAmount ELSE 0 END), 0) as "total_take",
                COALESCE(SUM(CASE WHEN t2.eType = 'GIVE' AND t2.eState = 'COMPLETE' THEN t2.iAmount ELSE 0 END), 0) as "total_give",
                COALESCE(SUM(CASE t2.eState  WHEN 'COMPLETE' THEN t2.iAmount ELSE 0 END), 0) as "total_amount",
                COALESCE(SUM(t3.iAmount), 0) as "total_bet"
            from 
                Calendar as t1 
                left join Inouts as t2 on t1.startAt = date_format(t2.completedAt,'%Y-%m-%d')
                left join RecordBets as t3 on t1.startAt = date_format(t3.updatedAt,'%Y-%m-%d')
            where t1.startAt like CONCAT('${strMonth}', '%')
            group by date
        )as t`
        );
        object.data = list;
        full_count = list.length;
    }
    else 
    {
        const [list] = await db.sequelize.query(`
        select *
        from(	
	        SELECT 
                date_format(t1.startAt , '%Y-%m-%d') as date,
                COALESCE(SUM(CASE WHEN t2.eType = 'INPUT' AND t2.eState = 'COMPLETE' THEN t2.iAmount ELSE 0 END), 0) as "total_input",
                COALESCE(SUM(CASE WHEN t2.eType = 'OUTPUT' AND t2.eState = 'COMPLETE' THEN t2.iAmount ELSE 0 END), 0) as "total_output",
                COALESCE(SUM(CASE WHEN t2.eType = 'TAKE' AND t2.eState = 'COMPLETE' THEN t2.iAmount ELSE 0 END), 0) as "total_take",
                COALESCE(SUM(CASE WHEN t2.eType = 'GIVE' AND t2.eState = 'COMPLETE' THEN t2.iAmount ELSE 0 END), 0) as "total_give",
                COALESCE(SUM(CASE t2.eState  WHEN 'COMPLETE' THEN t2.iAmount ELSE 0 END), 0) as "total_amount",
                COALESCE(SUM(t3.iAmount), 0) as "total_bet"
            FROM 
                Calendar AS t1 
                LEFT JOIN Inouts AS t2 ON t1.startAt = DATE_FORMAT(t2.completedAt,'%Y-%m-%d') AND t2.strGroupID LIKE '%${strGroupID}'
                LEFT JOIN RecordBets AS t3 ON t1.startAt = DATE_FORMAT(t3.updatedAt,'%Y-%m-%d') AND t3.strGroupID LIKE '%${strGroupID}'
            WHERE 
                t1.startAt LIKE CONCAT('${strMonth}', '%')
            GROUP BY date
        )as t`
        );
        object.data = list;
        full_count = list.length;
    }
    
    object.draw = req.body.draw;
    object.recordsTotal = full_count;
    object.recordsFiltered = list_count;

    //console.log(object);
    res.send(JSON.stringify(object));
});

router.get('/bettinglist', async (req, res) => {
    if ( req.user == undefined )
        res.redirect('/account/login');
    else
        res.render('agent/bettinglist', {type:0, user:req.user});
});

let GetRolling = async (strGroupID, strTimeStart, strTimeEnd) => {
    var querydatas = await db.RecordBets.findAll({
        order: [['id', 'DESC']],
        attributes: [
            [db.sequelize.literal('IFNULL(SUM(iRollingPAdmin),0)'),'total_iRollingPAdmin'],
            //[db.sequelize.literal('IFNULL(SUM(iRollingVAdmin),0)'),'total_iRollingVAdmin'],
            //[db.sequelize.literal('IFNULL(SUM(iRollingAgent),0)'),'total_iRollingAgent'],
            //[db.sequelize.literal('IFNULL(SUM(iRollingShop),0)'),'total_iRollingShop'],
            [db.sequelize.literal('IFNULL(SUM(iAmount),0)'),'total_iAmount']
        ],
        where:{
                createdAt:{[Op.between]:[ moment(strTimeStart).format('YYYY-MM-DD hh:mm:ss'), moment(strTimeEnd).format('YYYY-MM-DD hh:mm:ss')]},
                strGroupID:{[Op.like]:strGroupID+'%'},
            }
    });
    console.log(querydatas);
    return querydatas;
}
let GetRollingChildren = async (strGroupID, iMyClass, dateStart, dateEnd) => {

    var iTargetClass = iMyClass + 1;
    console.log(`##### GetChildren strGroupID (${strGroupID}), iTargetClass (${iTargetClass})`);
    if(iMyClass == 0)
    {
        var [list] = await db.sequelize.query(`
        SELECT  t2.*,
        IFNULL((SELECT sum(iRollingPAdmin) FROM RecordBets WHERE strGroupID LIKE CONCAT(t2.strGroupID,'%') AND date(createdAt) BETWEEN '${dateStart}' AND '${dateEnd}'),0) as total_RollingMoney,
        IFNULL((SELECT sum(iAmount) FROM RecordBets WHERE strGroupID LIKE CONCAT(t2.strGroupID,'%') AND date(createdAt) BETWEEN '${dateStart}' AND '${dateEnd}'),0) as total_iAmount
        FROM Users AS t1
        LEFT JOIN Users AS t2 ON t2.iParentID = t1.id
        WHERE t2.iClass='${iTargetClass}' AND t1.strGroupID LIKE CONCAT('${strGroupID}', '%');`
        );
    }
    else if(iMyClass == 1)
    {
        var [list] = await db.sequelize.query(`
        SELECT  t2.*,
        IFNULL((SELECT sum(iRollingVAdmin) FROM RecordBets WHERE strGroupID LIKE CONCAT(t2.strGroupID,'%') AND date(createdAt) BETWEEN '${dateStart}' AND '${dateEnd}'),0) as total_RollingMoney,
        IFNULL((SELECT sum(iAmount) FROM RecordBets WHERE strGroupID LIKE CONCAT(t2.strGroupID,'%') AND date(createdAt) BETWEEN '${dateStart}' AND '${dateEnd}'),0) as total_iAmount
        FROM Users AS t1
        LEFT JOIN Users AS t2 ON t2.iParentID = t1.id
        WHERE t2.iClass='${iTargetClass}' AND t1.strGroupID LIKE CONCAT('${strGroupID}', '%');`
        );
    }
    else if(iMyClass == 2)
    {
        var [list] = await db.sequelize.query(`
        SELECT  t2.*,
        IFNULL((SELECT sum(iRollingAgent) FROM RecordBets WHERE strGroupID LIKE CONCAT(t2.strGroupID,'%') AND date(createdAt) BETWEEN '${dateStart}' AND '${dateEnd}'),0) as total_RollingMoney,
        IFNULL((SELECT sum(iAmount) FROM RecordBets WHERE strGroupID LIKE CONCAT(t2.strGroupID,'%') AND date(createdAt) BETWEEN '${dateStart}' AND '${dateEnd}'),0) as total_iAmount
        FROM Users AS t1
        LEFT JOIN Users AS t2 ON t2.iParentID = t1.id
        WHERE t2.iClass='${iTargetClass}' AND t1.strGroupID LIKE CONCAT('${strGroupID}', '%');`
        );
    }
    else if(iMyClass == 3)
    {
        var [list] = await db.sequelize.query(`
        SELECT  t2.*,
        IFNULL((SELECT sum(iRollingShop) FROM RecordBets WHERE strGroupID LIKE CONCAT(t2.strGroupID,'%') AND date(createdAt) BETWEEN '${dateStart}' AND '${dateEnd}'),0) as total_RollingMoney,
        IFNULL((SELECT sum(iAmount) FROM RecordBets WHERE strGroupID LIKE CONCAT(t2.strGroupID,'%') AND date(createdAt) BETWEEN '${dateStart}' AND '${dateEnd}'),0) as total_iAmount
        FROM Users AS t1
        LEFT JOIN Users AS t2 ON t2.iParentID = t1.id
        WHERE t2.iClass='${iTargetClass}' AND t1.strGroupID LIKE CONCAT('${strGroupID}', '%');`
        );
    }
    else if(iMyClass == 4)
    {
        var [list] = await db.sequelize.query(`
        SELECT  t2.*,
        0 as total_RollingMoney,
        IFNULL((SELECT sum(iAmount) FROM RecordBets WHERE strID LIKE t2.strID AND date(createdAt) BETWEEN '${dateStart}' AND '${dateEnd}'),0) as total_iAmount
        FROM Users AS t1
        LEFT JOIN Users AS t2 ON t2.iParentID = t1.id
        WHERE t2.iClass='${iTargetClass}' AND t1.strGroupID LIKE CONCAT('${strGroupID}', '%');`
        );
    }
    return list;
}

let RecursiveGetRollingChildren = async (strGroupID, iMyClass, dateStart, dateEnd, list) =>
{
    let children = await GetRollingChildren(strGroupID, iMyClass, dateStart, dateEnd);
    for ( let i in children )
    {
        list.push(children[i]);
        console.log(`==========> Pushed ${children[i].strID}`);
        //await RecursiveGetChildren(children[i].strGroupID, parseInt(children[i].iClass), dateStart, dateEnd, list);
    }
}

router.post('/findbettinglist', async (req, res) => {

    //var data = [];
    //var list_count = 0;
    var full_count = 0;
    var strTimeStart = req.body.startDate;
    var strTimeEnd = req.body.endDate;
    //console.log("start : " + req.body.start);
    //console.log("startDate : "+ moment(strTimeStart).format('YYYY-MM-DD hh:mm:ss') + " endDate : "+ moment(strTimeEnd).format('YYYY-MM-DD hh:mm:ss'));

    let listPAdmin = await db.Users.findAll({where:{iClass:1}});

    let listObject = [];

    for ( let i in listPAdmin )
    {
        let datas = await GetRolling(listPAdmin[i].strGroupID, strTimeStart, strTimeEnd);

        listObject.push({strID:listPAdmin[i].strID, strName:listPAdmin[i].strName, fHoldemR:listPAdmin[i].fHoldemR, datas});
    }

    full_count = listObject.length;
    //console.log(listObject.total_iRollingPAdmin);
    //console.log(listObject.datas.RecordBets.total_iRollingPAdmin);

    var object = {};
    object.draw = req.body.draw;
    object.recordsTotal = full_count;
    //object.recordsFiltered = list_count;
    object.recordsFiltered = full_count;
    object.data = listObject;

    //console.log(object);

    //res.send({data:list});
    //res.send(object);
    res.send(listObject);
});

router.post('/bettinglog', async (req, res) => {
    console.log(req.body);

    var data = [];
    var strID = req.body.strID;
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;

    var querydatas = await db.RecordBets.findAll({
        order: [['id', 'DESC']],
        where: {
            strID: {
                [Op.like]:[strID]
            },
            createdAt: {
                [Op.between]: [startDate, endDate]
            }
        }
    });

    let count = 0;

for (var i in querydatas)
    {
        // iAmount가 0인 경우 skip
        if (querydatas[i].iAmount == 0) {
            continue;
        }
        data.push({
            iGame:0,
            iBetting:querydatas[i].iAmount,
            strBet:querydatas[i].strBet,
        });

        count++;
        if (count >= 200) {  // Maximum 200 items
            break;
        }
    }
    console.log(querydatas);

    //res.send({data:list});
    //res.send(object);
    res.send(data);
});

router.post('/bettingdetail', async (req, res) => {

    // let children = await db.Users.findAll({where:{iParentID:req.body.id}});
    // for ( let i in children )
    // {
    //     console.log(`child [${i}] : strID : ${children[i].strID}`);
    // }


    console.log("? " + req.body.id);

    const parentID = await db.Users.findOne({where:{strID:req.body.id}});
    var data = [];
    let listChildren = [];
    console.log("? ??" + parentID.iClass);

    await RecursiveGetRollingChildren(parentID.strGroupID, parentID.iClass, req.body.startDate, req.body.endDate, listChildren);

    full_count = listChildren.length;

    for (var i in listChildren )
    {
        data.push({
            strID:listChildren[i].strID,
            strName:listChildren[i].strName,
            iAmount:listChildren[i].total_iAmount,
            iRolling:listChildren[i].total_RollingMoney,
            fHoldemR:listChildren[i].fHoldemR
        });
    }
    if ( parentID != null && parentID.iClass !=5)
    {
        let result = {result:'OK', data};

        console.log(result);

        res.send(result);
    }
    else
        res.send({result:'FAIL', reason:'더이상에 하부는 없습니다.'});
});

router.get('/inputcharge', async (req, res) => {
    if ( req.user == undefined )
        res.redirect('/account/login');
    else
        res.render('agent/inputcharge', {type:0, user:req.user});
});
router.post('/inputchargelist', async (req, res) => {
    var data = [];
    //var list_count = 0;
    var full_count = 0;
    var strID = req.user.strID;
    var querydatas = await db.Inouts.findAll({
        order: [['id', 'DESC']],
        where:{
            [Op.and]:[{
                 strID:{[Op.like]:[strID]},
                 eType:{[Op.like]:['INPUT']}
            }]
        }
    });
    full_count = querydatas.length;

    for (var i in querydatas )
    {
        data.push({
            iChargeMoney:querydatas[i].iAmount,
            strDepositor:querydatas[i].strDepositor,
            strChargeDate:querydatas[i].createdAt,
            eState:querydatas[i].eState
        });
    }
    console.log(querydatas);
    var object = {};
    object.draw = req.body.draw;
    object.recordsTotal = full_count;
    //object.recordsFiltered = list_count;
    object.recordsFiltered = full_count;
    object.data = data;

    console.log(object);

    //res.send({data:list});
    //res.send(object);
    res.send(JSON.stringify(object));
});

let IsSameGroup = (strGroupID1, strGroupID2) => {

    if ( strGroupID1 != undefined && strGroupID2 != undefined )
    {
        let strBaseGroupID = '';
        let strTargetGroupID = '';

        if ( strGroupID1.length > strGroupID2.length )
        {
            strBaseGroupID = strGroupID2;
            strTargetGroupID = strGroupID1;
        }
        else
        {
            strBaseGroupID = strGroupID1;
            strTargetGroupID = strGroupID2;
        }

        strTargetGroupID = strTargetGroupID.substring(0, strBaseGroupID.length);

        console.log(`IsSameGroup ${strBaseGroupID}, ${strTargetGroupID}`);

        if ( strTargetGroupID == strBaseGroupID )
            return true;
        
        // for ( let i in strBaseGroupID )
        // {
        //     if ( strBaseGroupID[i] != strTargetGroupID[i])
        //     {
        //         return false;
        //     }
        //     return true;
        // }
    }
    return false;
}

router.post('/inputsendcharge', async (req, res) => {

    console.log(`/inputsendcharge`);
    console.log(req.body);
    if(req.body.iAmount <= 0)
    {
        res.send({result:'NOMONEY', reason:'충전금액이 0원입니다.'});
        return;
    }
    else if(req.body.strName == '')
    {
        res.send({result:'NONAME',reason:'입금자명을 써주세요.'});
        return;
    }

    for ( let i in global.socket_list )
    {
        if ( IsSameGroup(global.socket_list[i].strGroupID, req.body.strGroupID ) )
            global.socket_list[i].emit('SM_Alert', {eType:0});
    }

    await db.Inouts.create({
        strID:req.user.strID,
        strNickname:req.user.strNickname,
        iClass:req.user.iClass,
        strGroupID:req.user.strGroupID,
        strDepositor:req.body.strName,
        iAmount:req.body.iAmount,
        eType:'INPUT',
        eState:'STANDBY',
    });

    //let user = await db.Users.findOne({where:{strID:req.body.strID}});
    const user = await db.Users.increment({iCash:parseInt(req.body.iAmount)}, {where:{strID:req.user.strID}, returning:true, plain:true});

    console.log(user);

    res.send({result:'OK'});
});

router.get('/outputcharge', async (req, res) => {
    if ( req.user == undefined )
        res.redirect('/account/login');
    else
        res.render('agent/outputcharge', {type:0, user:req.user});
});

router.post('/outputchargelist', async (req, res) => {
    var data = [];
    //var list_count = 0;
    var full_count = 0;
    var strID = req.user.strID;
    var querydatas = await db.Inouts.findAll({
        order: [['id', 'DESC']],
        where:{
            [Op.and]:[{
                 strID:{[Op.like]:[strID]},
                 eType:{[Op.like]:['OUTPUT']}
            }]
        }
    });
    full_count = querydatas.length;

    for (var i in querydatas )
    {
        data.push({
            iChargeMoney:querydatas[i].iAmount,
            strChargeDate:querydatas[i].createdAt,
            eState:querydatas[i].eState
        });
    }
    console.log(querydatas);
    var object = {};
    object.draw = req.body.draw;
    object.recordsTotal = full_count;
    //object.recordsFiltered = list_count;
    object.recordsFiltered = full_count;
    object.data = data;

    console.log(object);

    //res.send({data:list});
    //res.send(object);
    res.send(JSON.stringify(object));
});

router.post('/outputsendcharge', async (req, res) => {

    console.log(`/outputsendcharge`);
    console.log(req.body);
    if(req.body.iAmount <= 0)
    {
        res.send({result:'NOMONEY', reason:'충전금액이 0원입니다.'});
        return;
    }
    else if(req.body.strName == '')
    {
        res.send({result:'NONAME',reason:'입금자명을 써주세요.'});
        return;
    }

    for ( let i in global.socket_list )
    {
        if ( IsSameGroup(global.socket_list[i].strGroupID, req.body.strGroupID ) )
            global.socket_list[i].emit('SM_Alert', {eType:1});
    }

    await db.Inouts.create({
        strID:req.user.strID,
        strNickname:req.user.strNickname,
        iClass:req.user.iClass,
        strGroupID:req.user.strGroupID,
        strDepositor:req.body.strName,
        strAccount:req.body.strAccount,
        strBank:req.body.strBank,
        iAmount:req.body.iAmount,
        eType:'OUTPUT',
        eState:'STANDBY',
    });

    //let user = await db.Users.findOne({where:{strID:req.body.strID}});
    const user = await db.Users.increment({iCash:parseInt(req.body.iAmount)}, {where:{strID:req.user.strID}, returning:true, plain:true});

    console.log(user);

    res.send({result:'OK'});
});

router.post('/request_inoutgt', async ( req, res) => {

    if ( req.body.eInoutType == 'GIVE' )
    {
        const user = await db.Users.findOne({where:{strID:req.body.strID}});
        if ( user != null )
        {
            await db.Users.increment({iCash:parseInt(req.body.iAmount)}, {where:{strID:req.body.strID}});
            await db.Inouts.create({
                strID:user.strID,
                strNickname:user.strNickname,
                iClass:user.iClass,
                strGroupID:user.strGroupID,
                strDepositor:req.user.strID,
                iAmount:parseInt(req.body.iAmount),
                strBank:'',
                strAccount:req.user.strNickname,
                eType:'GIVE',
                eState:'COMPLETE',
            });
            res.send({result:'OK'});
        }
        else
        {
            res.send({result:'Error', code:'UnknownUser'});
        }
    }
    else if ( req.body.eInoutType == 'TAKE' )
    {
        const user = await db.Users.findOne({where:{strID:req.body.strID}});
        if ( user != null )
        {
            if ( user.iCash < parseInt(req.body.iAmount) )
            {
                res.send({reuslt:'Error', code:'NotEnough'});
            }
            else
            {
                await db.Users.decrement({iCash:parseInt(req.body.iAmount)}, {where:{strID:req.body.strID}});
                await db.Inouts.create({
                    strID:user.strID,
                    strNickname:user.strNickname,
                    iClass:user.iClass,
                    strGroupID:user.strGroupID,
                    strDepositor:req.user.strID,
                    iAmount:parseInt(req.body.iAmount),
                    strBank:'',
                    strAccount:req.user.strNickname,
                    eType:'TAKE',
                    eState:'COMPLETE',
                });
                res.send({result:'OK'});
            }
        }
        else
        {
            res.send({result:'Error', code:'UnknownUser'});
        }
    }
});

router.post('/request_recordgt', async (req, res) => {

    console.log('/request_recordgt');
    console.log(req.body);

    let eType = req.body['eType[]'];

    var gives = await db.Inouts.findAll({
        where:{
            createdAt:{
                [Op.between]:[ req.body.startDate, require('moment')(req.body.endDate).add(1, 'days').format('YYYY-MM-DD')],
            },
            strGroupID:{[Op.like]:req.user.strGroupID+'%'},
            eType: { [Op.in]: eType }
        }
    });

    var object = {};
    object.draw = req.body.draw;
    object.recordsTotal = gives.length;
    //object.recordsFiltered = list_count;
    object.recordsFiltered = gives.length;
    object.data = gives;

    //console.log(object);

    //res.send({data:list});
    //res.send(object);
    res.send(JSON.stringify(object));
});

router.post('/request_autoAccount', async (req, res) => {

    console.log(`/request_autoAccount`);
    console.log(req.body);

    let admin = await db.Users.findOne({where:{iClass:0}});
    if ( req.user == null )
        res.send({result:'Error'});

    await db.Letters.create(
        {
            strTo:admin.strID,
            strToNickname:admin.strNickname,
            strFrom:req.user.strID,
            strFromNickname:req.user.strNickname,
            strContents:'계좌 문의',
            strAnswer:`입금자명 : ${admin.strName}, 계좌번호 : ${admin.strAccount}, 은행명 : ${admin.strBank} 로 입금 부탁드립니다.`,
            eState:'UNREAD',
            eType:'CONSULTING',
        }
    );
    res.send({result:'OK'});
});

module.exports = router;