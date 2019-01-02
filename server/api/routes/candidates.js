const express = require('express');
const router = express.Router();
const Candidates = require('../models/candidates');
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename: function(req,file,cb){
        cb(null,process.env.HOME +file.originalname);
    }
});

const fileFilter = (req,file,cb)=>{
    //reject a file
    if(file.mimetype==='image/jpeg'||file.mimetype==='image/png'){
        cb(null,true);
    }
    cb(null,false);    
};
const upload = multer({
    storage : storage,
    fileFilter: fileFilter
}); 

router.get('/',(req, res, next)=>{
    Candidates.find()
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
router.get('/:title',(req, res, next)=>{  //retrieving the candidates based on roles
    console.log(req.params.title);
    Candidates.find({post:req.params.title})
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
router.post("/",upload.single('candidateimage'),(req, res, next)=>{
    console.log(req.file);    
    const candidates = new Candidates({
            _id:new mongoose.Types.ObjectId(),
            election:req.body.election,
            candidatename: req.body.candidatename,
            regnumber:req.body.regnumber,
            post:req.body.post,
            degree:req.body.degree
        });
        console.log(req.body.election);
        candidates
        .save()
        .then(result=>{
            console.log(result);
        })
        .catch(err => console.log(err));
        res.status(201).json({
            message: 'Handling POST requests to /candidates',
            createdCandidates : candidates
        });
    });

router.get("/:candidatesId", (req, res,next)=>{  /*getting a candidate by index nuumber*/
   const id = req.params.candidatesId;
   Candidates.findById(id)
   .exec()
   .then(doc=>{
       console.log("From database",doc);
       if(doc){
       res.status(200).json(doc);
    }else{
        res.status(404).json({message : 'No valid entry found'})
    }
   })
   .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
});
});

router.patch('/:candidatesId', (req, res,next)=>{ /*updating a candidate by index nuumber*/
        res.status(200).json({
            message : 'Updated'
        });
});

router.delete('/:candidatesId', (req, res,next)=>{ /*updating a candidate by index nuumber*/
    res.status(200).json({
        message : 'Deleted'
    });
});




module.exports = router;