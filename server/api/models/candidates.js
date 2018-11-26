const mongoose = require('mongoose');

const candidatesSchema = mongoose.Schema({ //the data we are dealing with in candidates
    _id:mongoose.Schema.Types.ObjectId,
    name: {type:String, required :true},
    post: {type:String, required :true},
    degree: {type:String, required :true},
    candidateImage:{type:String, required :true}
});

module.exports=mongoose.model('Candidates', candidatesSchema); // the name we are going to use internally for the schema on the right