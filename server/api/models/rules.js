const mongoose = require('mongoose');

const rulesSchema = mongoose.Schema({ //the data we are dealing with in a vote
    _id:mongoose.Schema.Types.ObjectId,
    election: String,   
    rule:String, 
});

module.exports=mongoose.model('rules', rulesSchema); // the name we are going to use internally for the schema on the right