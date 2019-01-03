const mongoose = require('mongoose');

const candidatesSchema = mongoose.Schema({ //the data we are dealing with in candidates
    _id:mongoose.Schema.Types.ObjectId,
    election:String,
    candidatename: String,
    regnumber:String,
    post:String,
    degree:String
});

module.exports=mongoose.model('Candidates', candidatesSchema); // the name we are going to use internally 
//for the schema on the right

// const mongoose = require('mongoose');

// var candidateschema =mongoose.Schema(
//     {
//         election:{
//             type:String
//         },
//         post:{
//             type:String
//         },
//         candidatename:{
//             type:String,
//             required :'can\'t empty',
//             unique : true,
//         },
//         regnumber:{
//             type:String,
//             required :'can\'t empty',
//             unique : true,
//         },
//         degree:{
//             type:String,
//             required :'can\'t empty',
           
//         }
        
// }
// )
// mongoose.model('Candidate',candidateschema); //web serverhas canddiate with simple c