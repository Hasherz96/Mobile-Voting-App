// const express = require('express');
// const router = express.Router();

// const SendOtp = require('sendOtp'); //using npm install sendotp --save
// const sendOtp = new SendOtp('248630AHSkxvL7OE5bf6ee41'); //create nodejs SDK

// router.post('/verify',(req,res)=>{
//     pnum : req.body.pno;
//     sendOtp.send(pnum, "PRIIND", "4635", function (error, data) {
//         console.log(data);
//     });
// });

// router.post('/verify',(req,res,next)=>{
//     Voter.find({email: req.body.email})
//     .exec()
//     .then(voter=>{
//         if(voter.length>=1){
//             return res.status(200).json({
//                 message: "This email is exists"
//             });
//         }else{
//             return res.status(409).json({
//                 message: "Not valid email"
//             });
//         }
//     })
//     .catch(err=>{
//         console.log(err);
//         res.status(500).json({
//             "message":"ERROR_MESSAGE"
//         });
//     })
// });




































