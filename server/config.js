module.exports = {
    'port'		: process.env.PORT || 8080,
    'database'	: 'mongodb://localhost:27017/MobileApp'
 };

//  mongoose.connect("mongodb+srv://laiya:123@ucsc-union-election-7i44v.mongodb.net/MEAN?retryWrites=true",{ useNewUrlParser: true },(err) =>{
//   if(!err){
//     console.log("connection success");
//   }
//   else{
//     console.log("error in connection: "+ JSON.stringify(err,undefined,2));
//   }
// })