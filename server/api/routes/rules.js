const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Rules = require("../models/rules");

router.get("/",(req, res, next)=>{
    Rules.find()
    .exec()
    .then(docs=>{
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json();
    });
});

router.post('/rules',(req,res,next)=>{
    const rules = new Rules({
        _id:new mongoose.Types.ObjectId(),
        election:req.body.election,
        rule :req.body.rule,
    });

    rules.save()
    .then(result=>{        
        res.status(201).json({
            message: 'rule created',
            res: result,
        })
    })
    .catch(err => {
        console.log(err),
        res.status(500).json({
            error:err,
        });
    });
});

router.get('/:rulesId', (req, res,next)=>{ /*getting a rule by number*/
        res.status(200).json({
            message : 'Discovered by id'
        });
});


module.exports = router;