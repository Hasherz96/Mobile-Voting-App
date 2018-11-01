const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Voter = require('../models/voter');

router.get('/',(req,res,next)=>{
    Voter.find()
    .exec()
    .then(docs=>{
        console.log(docs);
        res.status(500).json(docs);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json();
    })
});

router.post('/signup',(req,res,next)=>{
    Voter.find({email: req.body.email})
    .exec()
    .then(voter=>{
        if(voter.length>=1){
            return res.status(409).json({
                message: "This email is already exists"
            });
        }else{
            bcrypt.hash(req.body.password, 10, (err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                }else{
                    const voter =new Voter({
                        _id: new mongoose.Types.ObjectId(),
                        email : req.body.email,
                        password : hash
                    });
                    voter.save().then(result=>{
                        console.log(result);
                    }).catch(err=>console.log(err));
                    res.status(200).json({
                        message: "Successfully Inserted",
                        Signup : voter
                    })
                }
            });
        }
    })
});
router.post("/login",(req,res,next)=>{
    Voter.find({email: req.body.email})
    .exec()
    .then(voter=>{
        if(voter.length<1){ //when email is not in the databse
            return res.status(404).json({
                message: 'You are not yet signup.Please signup or your  password is incorrect'
            })
        }
        bcrypt.compare(req.body.password,voter[0].password,(err,result)=>{
            if(err){
                return res.status(401).json({
                    message: 'failed'
                });
            }
            if(result){
                const token = jwt.sign(
                    {
                        email: voter[0].email,
                        voterId: voter[0]._id
                    },
                    "secret",
                    { 
                        expiresIn: "1h"
                    }
                );
                return res.status(200).json({
                    message: "Successfully Logged",
                    token:token
                })
            }
            res.status(401).json({
                message: 'failed'
            });
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
})

router.delete("/:voterId",(req,res,next)=>{
    Voter.remove({_id: req.params.voterId})
    .exec()
    .then(result=>{
        res.status(200).json({
            message: "Voter deleted"
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error : err
        });
    })
})

module.exports = router;