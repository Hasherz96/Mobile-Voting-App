const express = require('express');
const router = express.Router();

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

router.get('/:rulesId', (req, res,next)=>{ /*getting a rule by number*/
        res.status(200).json({
            message : 'Discovered by id'
        });
});


module.exports = router;