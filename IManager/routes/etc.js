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


router.get('/letter', async (req, res) => {

    if ( req.user == undefined )
        res.redirect('/account/login');
    else
        res.render('etc/letter', {type:0, user:req.user});
});

router.post('/request_letterlist', async (req, res) => {

    console.log(`/request_letterlist`);
    console.log(req.body);
    let listStateFilter = ['READED', 'UNREAD'];
    if ( req.body.LetterStateFilter != '' )
    {
        listStateFilter = [];
        listStateFilter.push(req.body.LetterStateFilter);
    }

    var object = {};

    if ( req.body.LetterReadWriteFilter == 'RECEIVED')
    {
        let data = await db.Letters.findAll(
            {
                where:{
                    eType:'LETTER',
                    eState:{[Op.or]:listStateFilter},
                    strTo:req.user.strID
                },
                
            }
        );
        object.draw = req.body.draw;
        object.recordsTotal = data.length;
        object.recordsFiltered = data.length;
        object.data = data;
    }
    else
    {
        let data = await db.Letters.findAll(
            {
                where:{
                    eType:'LETTER',
                    eState:{[Op.or]:listStateFilter},
                    strFrom:req.user.strID
                },
            }
        );
        object.draw = req.body.draw;
        object.recordsTotal = data.length;
        object.recordsFiltered = data.length;
        object.data = data;
    }

    res.send(JSON.stringify(object));
});

router.post('/request_lettersend', async (req, res) => {

    console.log(`/request_lettersendall`);
    console.log(req.body);
    let userTo = await db.Users.findOne({where:{strID:req.body.strTo}});

    if ( req.user == null )
        res.send({result:'Error'});

    await db.Letters.create(
        {
            strTo:req.body.strTo,
            strToNickname:userTo.strNickname,
            strFrom:req.user.strID,
            strFromNickname:req.user.strNickname,
            strContents:req.body.strContents,
            eState:'UNREAD',
            eType:'LETTER',
        }
    );

    // let listClasses = [];
    // for ( let i = 0; i < 6; ++ i )
    // {
    //     if ( i > parseInt(req.user.iClass) )
    //         listClasses.push(i);
    // }

    // let listReceiver = await db.Users.findAll({where:{
    //     iClass:{[Op.or]:listClasses}
    // }})

    // for ( let i in listReceiver )
    // {
    //     await db.Letters.create(
    //         {
    //             strTo:listReceiver[i].strID,
    //             strFrom:req.user.strID,
    //             strContents:req.body.strContents,
    //             eState:'UNREAD',
    //             eType:'LETTER',
    //         }
    //     );
    // }

    res.send({result:'OK'});
});

router.post('/request_letterdetail', async (req,res) => {

    console.log('');
    console.log(req.body);

    let data = await db.Letters.findOne({where:{id:req.body.id}});

    res.send({result:'OK', data:data});
});

router.post('/request_letterremove', async (req, res) => {

    console.log('');
    console.log(req.body);

    await db.Letters.destroy({where:{id:req.body.id}});

    res.send({result:'OK'});
});

router.get('/consulting', async (req, res) => {

    if ( req.user == undefined )
        res.redirect('/account/login');
    else
        res.render('etc/consulting', {type:0, user:req.user});
});

router.post('/request_consultinglist', async (req, res) => {

    console.log(`/request_consultinglist`);
    console.log(req.body);
    let listStateFilter = ['READED', 'UNREAD'];
    if ( req.body.LetterStateFilter != '' )
    {
        listStateFilter = [];
        listStateFilter.push(req.body.LetterStateFilter);
    }

    var object = {};

    if ( req.body.LetterReadWriteFilter == 'RECEIVED')
    {
        let data = await db.Letters.findAll(
            {
                order: [['id', 'DESC']],
                where:{
                    eType:'CONSULTING',
                    eState:{[Op.or]:listStateFilter},
                    strTo:req.user.strID
                },
                
            }
        );
        object.draw = req.body.draw;
        object.recordsTotal = data.length;
        object.recordsFiltered = data.length;
        object.data = data;
    }
    else
    {
        let data = await db.Letters.findAll(
            {
                where:{
                    eType:'CONSULTING',
                    eState:{[Op.or]:listStateFilter},
                    strFrom:req.user.strID
                },
            }
        );
        object.draw = req.body.draw;
        object.recordsTotal = data.length;
        object.recordsFiltered = data.length;
        object.data = data;
    }

    res.send(JSON.stringify(object));
});

router.post('/request_consultingsend', async (req, res) => {

    console.log(`/request_consultingsend`);
    console.log(req.body);
    let userTo = await db.Users.findOne({where:{strID:req.body.strTo}});

    if ( req.user == null )
        res.send({result:'Error'});

    await db.Letters.create(
        {
            strTo:req.body.strTo,
            strToNickname:userTo.strNickname,
            strFrom:req.user.strID,
            strFromNickname:req.user.strNickname,
            strContents:req.body.strContents,
            eState:'UNREAD',
            eType:'CONSULTING',
        }
    );

    // let listClasses = [];
    // for ( let i = 0; i < 6; ++ i )
    // {
    //     if ( i > parseInt(req.user.iClass) )
    //         listClasses.push(i);
    // }

    // let listReceiver = await db.Users.findAll({where:{
    //     iClass:{[Op.or]:listClasses}
    // }})

    // for ( let i in listReceiver )
    // {
    //     await db.Letters.create(
    //         {
    //             strTo:listReceiver[i].strID,
    //             strFrom:req.user.strID,
    //             strContents:req.body.strContents,
    //             eState:'UNREAD',
    //             eType:'LETTER',
    //         }
    //     );
    // }

    res.send({result:'OK'});
});

module.exports = router;