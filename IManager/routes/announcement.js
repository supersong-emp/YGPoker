const express = require('express');
const passport = require('passport');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:false}));

const path = require('path');
router.use(express.static(path.join(__dirname, '..', 'public')));

const db = require('../db');
const ITime = require('../utils/time');
const {Op}= require('sequelize');

router.get('/', async(req, res) => {

    if ( req.user == undefined )
        res.redirect('/account/login');
    else
    {
        res.render('announcement/announcement', {type:0, user:req.user});
    }
});

router.post('/annregister', async (req, res) => {

    console.log(`/announcement/register`);
    console.log(req.body);

    let data = await db.Announcements.findOne({where:{id:req.body.id}});

    if ( data == null )
    {
        await db.Announcements.create({strSubject:req.body.strSubject, strContents:req.body.strContents, iClass:req.body.iClass, eType:'ANN'});
    }
    else
    {
        await data.update({strSubject:req.body.strSubject, strContents:req.body.strContents, iClass:req.body.iClass, eType:'ANN'});
    }

    res.send({result:'OK'});
});

router.post('/request_announcementlist', async (req, res) => {

    let list = await db.Announcements.findAll({where:{eType:'ANN'}});

    var object = {};
    object.draw = req.body.draw;
    object.recordsTotal = list.length;
    object.recordsFiltered = list.length;
    object.data = list;

    console.log(object.data);
    res.send(JSON.stringify(object));
});

router.post('/request_main_announcementlist', async (req, res) => {

    let list = await db.Announcements.findAll({
        where: { eType: 'ANN' },
        order: [
            ['id', 'DESC']
        ]
    });

    res.send({result:'OK', data:list});
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
router.get('/popup', async(req, res) => {

    if ( req.user == undefined )
        res.redirect('/account/login');
    else
    {
        res.render('announcement/popup', {type:0, user:req.user});
    }
});

router.post('/request_popuplist', async (req, res) => {

    let list = await db.Announcements.findAll({where:{eType:'POPUP'}});

    var object = {};
    object.draw = req.body.draw;
    object.recordsTotal = list.length;
    object.recordsFiltered = list.length;
    object.data = list;

    console.log(object.data);
    res.send(JSON.stringify(object));
});

router.post('/popupregister', async (req, res) => {

    console.log(`/announcement/popupregister`);
    console.log(req.body);

    let data = await db.Announcements.findOne({where:{id:req.body.id}});

    if ( data == null )
    {
        await db.Announcements.create({strSubject:req.body.strSubject, strContents:req.body.strContents, iClass:req.body.iClass, eType:'POPUP'});
    }
    else
    {
        await data.update({strSubject:req.body.strSubject, strContents:req.body.strContents, iClass:req.body.iClass, eType:'POPUP'});
    }

    res.send({result:'OK'});
});
module.exports = router;