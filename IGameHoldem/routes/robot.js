const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:false}));

const path = require('path');
router.use(express.static(path.join(__dirname, '../', 'public')));

const db = require('../db');
// const db = require('../models');
// const time = require('../utils/time');
// const {Op}= require('sequelize');

router.post('/request_robot', async (req, res) => {

    console.log(`/request_robot`);
    console.log(req.body);

    let joker = await db.Users.findAll({where:{eUserType:'JOKER'}});
    if ( joker != null )
    {
        res.send({result:'OK', data:joker});
    }
    else
    {
        res.send({result:'Error'});
    }
});

module.exports = router;