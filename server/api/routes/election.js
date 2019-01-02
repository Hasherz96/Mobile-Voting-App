const express = require('express');
const router = express.Router();
const Election = require('../models/election');
const mongoose = require('mongoose');


router.get('/',(req, res, next)=>{
    console.log("gets here")
    Election.find()
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
        const election = new Election({
            _id:new mongoose.Types.ObjectId(),
            Name:req.body.name,
            date: req.body.date,
            stime:req.body.stime,
            etime:req.body.etime,
        });
        election
        .save()
        .then(result=>{
            console.log(result);
        })
        .catch(err => console.log(err));
        res.status(201).json({
            message: 'Handling POST requests to /election',
            createdelection : election
        });
    });


module.exports = router;