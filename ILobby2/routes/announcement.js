const express = require('express');
const passport = require('passport');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:false}));

const path = require('path');
router.use(express.static(path.join(__dirname, '../', 'public')));

let axios = require('axios');

const db = require('../db');
//const ITime = require('../utils/time');
const {Op}= require('sequelize');

router.get('/', async(req, res) => {

    if ( req.user == undefined )
        res.redirect('/account/login');
    else
    {
        res.render('announcement', {type:0, user:req.user});
    }
});

router.post('/request_announcementlist', async (req, res) => {

    console.log("request_announcementlist");

    if(req.user == undefined)
    {
        return;
    }

    let user = await db.Users.findOne({where:{strID:req.user.strID}});
    console.log(user.iClass);
    let list = await db.Announcements.findAll({
        order: [['id', 'DESC']],
        where: {
            iClass: {[Op.gte]: user.iClass},
            eType:{[Op.like]: 'ANN'}
        }
    });
    console.log(list);
    res.send({result:'OK', data:list});

    // var object = {};
    // object.draw = req.body.draw;
    // object.recordsTotal = 5;
    // object.recordsFiltered = list.length;
    // object.data = list;
    // console.log(object);
    // res.send(JSON.stringify(object));
});

router.post('/request_eventlist', async (req, res) => {

    console.log("request_eventlist");

    if(req.user == undefined)
    {
        return;
    }

    let user = await db.Users.findOne({where:{strID:req.user.strID}});
    console.log(user.iClass);
    let list = await db.Announcements.findAll({
        order: [['id', 'DESC']],
        where: {
            iClass: {[Op.gte]: user.iClass},
            eType:{[Op.like]: 'EVENT'}
        }
    });
    console.log(list);
    res.send({result:'OK', data:list});

    // var object = {};
    // object.draw = req.body.draw;
    // object.recordsTotal = 5;
    // object.recordsFiltered = list.length;
    // object.data = list;
    // console.log(object);
    // res.send(JSON.stringify(object));
});

router.post('/request_announcementdetail', async (req, res) => {

    console.log(`/announcement/request_announcementdetail`);
    console.log(req.body);

    let data = await db.Announcements.findOne({where:{id:req.body.id}});

    res.send({result:'OK', data:data});

    // let list = await db.Announcements.findAll();

    // var object = {};
    // object.draw = req.body.draw;
    // object.recordsTotal = list.length;
    // object.recordsFiltered = list.length;
    // object.data = list;

    // res.send(JSON.stringify(object));
});
router.get('/customer', async(req, res) => {

    if ( req.user == undefined )
        res.redirect('/account/login');
    else
    {
        res.render('customer', {type:0, user:req.user});
    }
});

router.post('/request_customerlist', async (req, res) => {

    console.log("/request_customerlist");

    //let user = await db.Users.findOne({where:{strID:req.user.strID}});
    let list = await db.Letters.findAll({
        order: [['id', 'DESC']],
        where: {
            eType: {[Op.like]: 'CONSULTING'},
            strFrom:{[Op.like]: req.user.strID}
        }
    });
    console.log(list);
    res.send({result:'OK', data:list});

    // var object = {};
    // object.draw = req.body.draw;
    // object.recordsTotal = 5;
    // object.recordsFiltered = list.length;
    // object.data = list;
    // console.log(object);
    // res.send(JSON.stringify(object));
});

router.post('/request_customerdetail', async (req, res) => {

    console.log(`/announcement/request_customerdetail`);
    console.log(req.body);

    let data = await db.Letters.findOne({where:{id:req.body.id}});

    res.send({result:'OK', data:data});
});

router.post('/request_consultingsend', async (req, res) => {

    console.log(`/request_consultingsend`);
    console.log(req.body);
    let adminTo = await db.Users.findOne({where:{strID:req.body.strTo}});

    if ( req.user == null )
        res.send({result:'Error'});

    await db.Letters.create(
        {
            strTo:req.body.strTo,
            strToNickname:adminTo.strNickname,
            strFrom:req.user.strID,
            strFromNickname:req.user.strNickname,
            strContents:req.body.strContents,
            strAnswer:'',
            eState:'UNREAD',
            eType:'CONSULTING',
        }
    );
    res.send({result:'OK'});
    try {

        let objectData = {eType:2, strID:req.user.strID};

        const customAxios = axios.create({});
        //const response = await axios.post(strAddress, objectData);
        const response = await customAxios.post('http://localhost:3000/alert', objectData, {headers:{ 'Accept-Encoding': 'application/json'}});
        console.log(response);
        console.log(response.data);
        if ( response.data.result == 'OK' )
            return {result:'OK', data:response.data};
        else
            return {result:'error', error:response.data.error};    
    }
    catch (error) {

        return {result:'error', error:'axios'};

    }
});
module.exports = router;