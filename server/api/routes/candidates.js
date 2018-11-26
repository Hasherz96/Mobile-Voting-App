const express = require('express');
const router = express.Router();
const Candidates = require('../models/candidates');
const mongoose = require('mongoose');
const multer = require('multer');

// const storage= multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,'./uploads');

//     },
//     filename: function(req,file,cb){
//         cb(null, new Data().toISOString().replace(/:/g, '-')+file.originalname);
//     }
// });

const fileFilter = (req, file, cb) =>{
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }

}

const upload = multer({dest:'uploads/',
    limits:{
    fileSize:1024*1024*5 //max size of an image is 5Mb 
    },
    fileFilter:fileFilter
});


router.get('/',(req, res, next)=>{
    Candidates.find()
    .select("name post degree candidateImage")
    .exec()
    .then(docs=>{
        const response ={
            count : doc.length,
            candidate:docs.map(doc=>{
                return {
                    name : doc.name,
                    post :doc.post,
                    candidateImage:doc.candidateImage,
                    _id: doc.id,
                    request:{
                        type:"GET",
                        url: "http://localhost:8080/candidates/" +doc._id

                    }

                }
            })
        //     console.log(docs);
        // res.status(200).json(docs);
        }
        
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json()
    });
});

router.get('/president',(req, res, next)=>{ //getting president datacd 
    Candidates.find({"post":"President"})
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


router.post("/",upload.single('candidateImage'),(req, res, next)=>{ //post the pictures to the database
   console.log(req.file);
    const candidates = new Candidates({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        title:req.body.title,
        degree:req.body.degree,
        candidateImage:req.file.path
    });
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
})

router.post("/",(req, res, next)=>{ //post the candidates to the database
    const candidates = new Candidates({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        title:req.body.title,
        degree:req.body.degree
    });
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