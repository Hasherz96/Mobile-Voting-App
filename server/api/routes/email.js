const express = require('express');
const router = express.Router();

const Email = require("../models/email");
router.get("/",(req, res, next)=>{
    Email.find()
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

module.exports = router;