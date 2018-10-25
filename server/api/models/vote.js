const mongoose = require('mongoose');

const voteSchema = mongoose.Schema({ //the data we are dealing with in a vote
    _id:mongoose.Schema.Types.ObjectId,
    president: String,
    vpresident:String,
    secretary:String,
    treasurer: String,
    jtreasurer:String,
    cmember1:String,
    cmember2: String,
    cmember3:String
});

module.exports=mongoose.model('Vote', voteSchema); // the name we are going to use internally for the schema on the right