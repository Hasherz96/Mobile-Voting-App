const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

var mongoose    = require('mongoose'); //mongoose for mongo db
var config 	= require('./config');
//mongoose.connect('mongodb://laiya:123@ucsc-union-election-shard-00-00-7i44v.mongodb.net:27017,ucsc-union-election-shard-00-01-7i44v.mongodb.net:27017,ucsc-union-election-shard-00-02-7i44v.mongodb.net:27017/test?ssl=true&replicaSet=UCSC-UNION-ELECTION-shard-0&authSource=admin&retryWrites=true')
var connection 		= mongoose.connect("mongodb://localhost:27017/MobileApp", { useCreateIndex: true, useNewUrlParser: true })
/* Define Mongoose connection to project's MongoDB database */


const candidatesRoutes = require('./api/routes/candidates');
const rulesRoutes = require('./api/routes/rules');
const voteRoutes = require('./api/routes/vote');
const voterRoutes = require('./api/routes/voter');
const electionRoutes = require('./api/routes/election');

/*Middleware*/

app.use(morgan('dev')); 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


/*Handling CORS errors*/
app.use((req, res, next)=>{
    /* Allow access from any requesting client */
   res.header('Access-Control-Allow-Origin', '*');

   /* Set the Http request header */
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,content-type,Accept,Authorization');

   if (req.method === 'OPTIONS'){ /* check if these actions are allowed*/
    /* Allow access for any of the following Http request types */
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    return res.status(200).json({});

    }
    next();//so that other routes can take over other than errors
   });


/* Routes which should handle requests */
app.use('/candidates', candidatesRoutes); /* every url with candidates */
app.use('/rules', rulesRoutes); /* every url with rules */
app.use('/vote', voteRoutes); /* every url with vote */
app.use('/voter',voterRoutes);
app.use('/election',electionRoutes);



/*if the above two ones are past, meaning there is an error*/
/*Error Handling in routes*/
app.use((req,res, next)=>{
    const error = new Error('Not found');
    error.status=404;
    next(error);
});

/*Handling error from anywhere inthe app*/
app.use((error, req,res, next)=>{
    res.status(error.status|| 500);
    res.json({
        error:{
            message : error.message
        }
    })
});

app.listen(config.port);
console.log("App listening on port 8080");

module.exports=app; /*how this file will be exported*/