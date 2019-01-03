const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/voter');
const Email = mongoose.model('email');
const bcrypt = require('bcrypt');
const mailer = require('../misc/mailer');
const randomstring = require('randomstring');
const bodyParser = require('body-parser');


// const SendOtp = require('sendotp');
// const sendOtp = new SendOtp('248630AHSkxvL7OE5bf6ee41', 'Otp for your order is {{otp}}, please do not share it with anybody');


// var otpGenerator = require('otp-generator');
// var otp=otpGenerator.generate(6, { upperCase: false, specialChars: false });

router.get('/',(req,res,next)=>{
    User.find({isadmin:false,isvalid:true},{userName:true,email:true,registrationnumber:true,phonenumber:true})
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

// router.post('/otpmsg',(req,res,next)=>{
//     sendOtp.send("req.body.pno", "PRIIND", "4635", function (error, data) {
//         sendOtp.setOtpExpiry('90');
//         if(error){
//             return response.status(401).json({
//                 message: "Not sent"
//             })
//         }
//         console.log(data);
//         return res.status(200).json({
//             message: "Sent verification"
//         });
//       });
// })

// router.post('/otpverify',(req,res,next)=>{
//     sendOtp.verify("req.body.pno", "PRIIND", "4365", function (error, data) {
//         console.log(data); // data object with keys 'message' and 'type'
//         if(data.type == 'success'){
//             console.log('OTP verified successfully');
//             return res.status(200).json({
//                 message: "OTP verified successfully"
//             });
//         } 
//         if(data.type == 'error'){
//             console.log('OTP verification failed');
//             return response.status(401).json({
//                 message: "OTP verification failed"
//             })
//         }
//     });
// })

router.post('/otp',(req,res,next)=>{
    User.find({email: req.body.email})
    .exec()
    .then(user=>{
        if(user.length>=1){
            return res.status(200).json({
                message: "This email is exists"
            });
        }else{
            return res.status(409).json({
                message: "Not valid email"
            });
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            "message":"ERROR_MESSAGE"
        });
    })
});

router.post('/signup',(req,res,next)=>{
    const user = new User({
        userName : req.body.userName,
        registrationnumber:req.body.registrationnumber,
        email :req.body.email,
        phonenumber:req.body.phonenumber,
        password : req.body.password,
        cpassword:req.body.cpassword,
        randomstring :randomstring.generate(),
        isadmin :false,
    });
   
    const html = `Hi there,
        <br/>
        Thank you for registering!
        <br/><br/>
        Please verify your email by typing the following token:
        <br/>
        Token: <b>${user.randomstring}</b>
        <br/>
        On the following page:
        <a href="http://localhost:8100/verify">http://localhost:8100/verify</a>
        <br/><br/>
        Have a pleasant day.` ;
        console.log(req.body.registrationnumber);

        console.log(user.randomstring);
        Email.findOne({registrationnumber:user.registrationnumber},'email',function(err,result){ //check he is allowed user or not by looking email collection
            console.log(user.registrationnumber);
            if(result){ //allowed user
                if(result.email==user.email){ //check he is already signup
                    console.log("**");
                    user.save((err, doc) => {
                        if (!err){        //if not yet signup                    
                 
                            res.status(200).json({
                                message: "Successfully Inserted",
                                Signup : user
                            })
                            mailer.sendEmail('evotingucsc@gmail.com', req.body.email, 'Please verify your email!', html)

                        }else{
                            if (err.code === 11000){ //if already signup
                                res.status(422).json({  //422 (Unprocessable Entity) 
                                    message: "Already signup"
                                })
                            }else{ //Server Issue
                                return res.status(500).json({
                                    error: err
                                });
                            } 
                        }
                    });
                }else{ //already signup
                    res.status(422).json({  //422 (Unprocessable Entity) 
                        message: "Already signup"
                    })
                    // res.status(422).send('Enter Correct Email Address');
                }
            }else if(!result) {//not a allowed user
                 res.status(404).send('Not allowed user');
                // if(result.email!=user.email){
                //     return res.status(500).json({
                //         error: err
                //     });
                // }else{// if emils equal
                //     console.log("**");
                //     res.status(404).send('Not allowed user');
                // }
            }else{ //Server Issue
                throw errors;
            }
            
    })
});
router.post("/login",(req,res,next)=>{
    User.find({email: req.body.email})
    .exec()
    .then(user=>{
        if(user.length<1){ //when email is not in the database
            return res.status(404).json({//not found entered email or invalid email
                message: 'Invalid email'
            })
        }else{ //when entered email matched 
            bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
                if(err){
                    return res.status(401).json({//unauthorized user login(invalid password entered)
                        message: 'failed'
                    });
                }
                if(result){
                    const token = jwt.sign(//jwt authentication
                        {
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        "secret",
                        { 
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({//valid login
                        message: "Successfully Logged",
                        token:token
                    })
                }
                res.status(401).json({//unauthorized login
                    message: 'failed'
                });
            })
        }
        
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({//not implemented
            error: err
        });
    });
})

router.delete("/:voterId",(req,res,next)=>{
    User.remove({_id: req.params.voterId})
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
});

router.put("/verify",(req,res,next)=>{  //
    User.findOneAndUpdate({
        randomstring : req.body.token
    },
    {$set:{isvalid:true},
    $unset :{randomstring:1}
    },
    function(err,result){
        console.log("sdfghjk");
        if(err){
            res.status(500).json({
                error : err
            })
        }else if(!result){
            res.status(422).send("Invalid Key");
        }
        else{
            res.status(200).json({
                message: "Successfully verified"
            });
        }
    });

})
module.exports = router;