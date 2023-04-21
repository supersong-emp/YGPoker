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


router.get('/gamelog', async (req, res) => {
    console.log("game");
    console.log(req.body);
    if ( req.user == undefined )
        res.redirect('/account/login');
    else
        res.render('game/gamelog', {type:0, user:req.user});
});
let getRelocationGamelog = async (data,list) => {
    for (let i = 0; i < data.length; i++) {
      let row = data[i];
      let winnerData = row.strWinner.split(':');
      let descData = row.strDesc.split(',');
      let descObj = {};
      for (let j = 0; j < descData.length; j++) {
        let keyValue = descData[j].split(':');
        descObj[keyValue[0]] = keyValue[1];
      }
      let strHand = row.strHand;
      let handList = strHand.split(',');
      let handObj = {};
      for (let k = 0; k < handList.length; k++) {
        let [id, cards] = handList[k].split(':');
        let cardList = cards.split('/');
        handObj[id] = cardList;
      }
      let tablecardObject= row.strTablecard.split(',');
      let newData = {
        lUnique: row.lUnique,
        strWinner: {
          name: winnerData[0],
          amount: winnerData[1]
        },
        strDesc: descObj,
        iStartCoin: row.iStartCoin,
        strHand: handObj,
        strTablecard: tablecardObject,
        createdAt: row.createdAt
      };
      list.push(newData);
    }
  };
  let getGamelog = async (data, strID, list) => {
    for (let i = 0; i < data.length; i++) {
      let row = data[i];
      let strResult = "승";
      let winnerData = row.strWinner.split(':');
      let strCoin = winnerData[1];
      let iResultCoin = 0;
      let gameDealcoin = 0;
      let iTotalMoney = 0;
      let bJackpot = false;
      let strNickname = '';

      user = await db.Users.findOne({where:{strID:strID}});
      strNickname = user.strNickname;

      let descData = row.strDesc.split(',');
      
      let descObj = {};
      for (let j = 0; j < descData.length; j++) {
        let keyValue = descData[j].split(':');
        descObj[keyValue[0]] = keyValue[1];
        iTotalMoney += parseInt(keyValue[1]);
        iResultCoin = parseInt(row.iStartCoin) - parseInt(keyValue[1]);
      }
      if(winnerData[0] != strID)
      {
        strResult = "패";
        strCoin = `-${descObj[strID]}`;
      }
      else 
      {
        strCoin = winnerData[1];
      }
      console.log(descObj);
      //let tablecardObject= row.strTablecard.split(',');
      gameDealcoin = iTotalMoney - winnerData[1];
      let newData = {
        roomId:row.id,
        createdAt: row.createdAt,
        lUnique: row.lUnique,
        ibet: '5000',
        strID: strID,
        strNickname : strNickname,
        strResult: strResult,
        iBettingCoin: strCoin,
        iResultCoin: iResultCoin,
        gameDealcoin: gameDealcoin,
        bJackpot: bJackpot
      };
      list.push(newData);
    }
  };
router.post('/gameloglist', async (req, res) => {

    console.log('/gameloglist');
    console.log(req.body);

    var data = [];
    //var list_count = 0;
    var full_count = 0;
    
    var strTimeStart = req.body.startDate;
    var strTimeEnd = req.body.endDate;
    var accountId = req.body.accountId;
    
    if(accountId == '')
    {
        res.send({result:'NOID', reason:'ID를 적고 검색해주세요.'});
        return data;
    }
    //console.log("start : " + req.body.start);
    //console.log("startDate : "+ moment(strTimeStart).format('YYYY-MM-DD hh:mm:ss') + " endDate : "+ moment(strTimeEnd).format('YYYY-MM-DD hh:mm:ss'));
    var querydatas = await db.ResultHoldems.findAll({
        order: [['createdAt', 'DESC']],
         where:{
            [Op.and]:[{
                 createdAt:{[Op.between]:[ moment(strTimeStart).format('YYYY-MM-DD hh:mm:ss'), moment(strTimeEnd).format('YYYY-MM-DD hh:mm:ss')]},
                 strDesc:{[Op.like]:`%${accountId}%`},
            }]
        }
    });
    let listGamelog = [];
    //console.log(querydatas);
    //full_count = querydatas.length;
    await getRelocationGamelog(querydatas,listGamelog);
    console.log(listGamelog);
    full_count = listGamelog.length;

    for (var i in listGamelog )
    {
        data.push({
            createdAt:listGamelog[i].createdAt,
            lUnique:listGamelog[i].lUnique,
            iClass:listGamelog[i].iClass,
            strGroupID:listGamelog[i].strGroupID,
            iAmount:listGamelog[i].iAmount,
            strDepositor:listGamelog[i].strDepositor,
            strMobileNo:listGamelog[i].strGroupID,
            eState:listGamelog[i].eState
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
    res.send(object);
});

router.post('/gamelogresult', async (req, res) => {

    console.log('/gamelogresult');
    console.log(req.body);

    var data = [];
    //var list_count = 0;
    var full_count = 0;
    
    var strTimeStart = req.body.startDate;
    var strTimeEnd = req.body.endDate;
    var accountId = req.body.accountId;
    //let strId = await db.Users.findAll({where:{strID:accountId}});
    
    if(accountId == '')
    {
        res.send({result:'NOID', reason:'ID를 적고 검색해주세요.'});
        return;
    }
    // if(!strId)
    // {
    //     res.send({result:'NOID', reason:'ID를 적고 검색해주세요.'});
    //     return;
    // }
    //console.log("start : " + req.body.start);
    //console.log("startDate : "+ moment(strTimeStart).format('YYYY-MM-DD hh:mm:ss') + " endDate : "+ moment(strTimeEnd).format('YYYY-MM-DD hh:mm:ss'));
    var querydatas = await db.ResultHoldems.findAll({
        order: [['createdAt', 'DESC']],
         where:{
            [Op.and]:[{
                 createdAt:{[Op.between]:[ moment(strTimeStart).format('YYYY-MM-DD hh:mm:ss'), moment(strTimeEnd).format('YYYY-MM-DD hh:mm:ss')]},
                 strDesc:{[Op.like]:`%${accountId}%`},
            }]
        }
    });
    let listGamelog = [];
    //console.log(querydatas);
    //full_count = querydatas.length;
    await getGamelog(querydatas,accountId,listGamelog);
    console.log(listGamelog);
    full_count = listGamelog.length;

    for (var i in listGamelog )
    {
        data.push(
            listGamelog[i]
        );
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

router.get('/fee', async (req, res) => {

    console.log("/game/fee");
    console.log(req.body);
    if ( req.user == undefined )
        res.redirect('/account/login');
    else
        res.render('game/fee', {type:0, user:req.user});
});

router.post('/request_fee', async ( req, res ) => {

    let data = await db.Fees.findAll();

    console.log(`/request_fee : ${data.fHoldem}`);

    var object = {};
    object.draw = req.body.draw;
    object.recordsTotal = 1;
    object.recordsFiltered = 1;
    object.data = data;
    res.send(JSON.stringify(object));
});

router.post('/request_feedetail', async ( req, res ) => {

    let data = await db.Fees.findOne();

    console.log(`/request_feedetail : ${data.fHoldem}`);

    res.send({result:'OK', data:data});
})

router.post('/request_modifyfee', async (req,res) => {

    await db.Fees.update({fHoldem:req.body.fHoldem, fSitgo:req.body.fSitgo, fBig2:req.body.fBig2, fOmaha:req.body.fOmaha, fBaccarat:req.body.fBaccarat}, {where:{id:1}});

    res.send({result:'OK'});
});

router.get('/jackpot', async (req, res) => {

    console.log("/game/jackpot");
    console.log(req.body);
    if ( req.user == undefined )
        res.redirect('/account/login');
    else
        res.render('game/jackpot', {type:0, user:req.user});
});

router.post('/request_jackpot', async ( req, res ) => {

    let data = await db.Jackpots.findAll();

    console.log(`/request_jackpot : ${data.strGame}`);

    var object = {};
    object.draw = req.body.draw;
    object.recordsTotal = 1;
    object.recordsFiltered = 1;
    object.data = data;
    res.send(JSON.stringify(object));
});

router.post('/request_jackpotdetail', async ( req, res ) => {

    let data = await db.Jackpots.findOne({where:{id:req.body.id}});

    console.log(`/request_feedetail : ${data.fHoldem}`);

    res.send({result:'OK', data:data});
})

router.post('/request_modifyjackpot', async (req,res) => {

    await db.Jackpots.update({iRSFAmount:req.body.iRSFAmount, iSFAmount:req.body.iSFAmount, iFCAmount:req.body.iFCAmount}, {where:{id:req.body.id}});

    res.send({result:'OK'});
});


router.get('/roomlist', async (req, res) => {

    console.log("/game/fee");
    console.log(req.body);
    if ( req.user == undefined )
        res.redirect('/account/login');
    else
        res.render('game/roomlist', {type:0, user:req.user});
});

router.post('/request_roomlist', async (req,res) => {

    let data = {};

    //axios.post(`http://localhost:7000/request_roomlist`, data)
    axios.post(`http://localhost:5555/request_roomlist`, data)
        .then((response)=> {
            //console.log(response);

            const data = response.data;

            console.log(data);

            var object = {};
            object.draw = req.body.draw;
            object.recordsTotal = 1;
            object.recordsFiltered = 1;
            object.data = data;
            res.send(JSON.stringify(object));

            //res.send({data:response.data});
        })
        .catch((error)=> {
    });
})

module.exports = router;