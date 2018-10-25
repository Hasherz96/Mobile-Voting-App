const express = require('express');
const router = express.Router();
const Vote = require('../models/vote');
const mongoose = require('mongoose');

router.get('/',(req, res, next)=>{
    Vote.find()
    .exec()
    .then(docs=>{
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json()
    });
});

router.post("/",(req, res, next)=>{
    const vote = new Vote({
        _id:new mongoose.Types.ObjectId(),
        president: req.body.president,
        vpresident:req.body.vpresident,
        secretary:req.body.secretary,
        treasurer:req.body.treasurer,
        jtreasurer:req.body.jtreasurer,
        cmember1:req.body.cmember1,
        cmember2: req.body.cmember2,
        cmember3: req.body.cmember3
    });
    vote
    .save()
    .then(result=>{
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(201).json({
        message: 'Handling POST requests to /vote',
        createdVote : vote
    });
});




module.exports = router;