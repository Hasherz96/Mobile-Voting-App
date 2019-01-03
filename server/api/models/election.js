const mongoose = require('mongoose');

const electionSchema = mongoose.Schema({ //the data we are dealing with in candidates
    _id:mongoose.Schema.Types.ObjectId,
    Name:String,
    date: Date,
    stime:String,
    etime:String,
   
});

module.exports=mongoose.model('Election', electionSchema); // the name we are going to use internally for the schema on the right