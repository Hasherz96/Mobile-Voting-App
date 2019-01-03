const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');


var mongoose    = require('mongoose'); //mongoose for mongo db
var config 	= require('./config');

mongoose.connect('mongodb+srv://laiya:123@ucsc-union-election-7i44v.mongodb.net/MEAN?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',{ useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false })
const conn = mongoose.connection;
conn.on('connected',()=>{
    console.log('connected to mongodb');
})
// var connection 	= mongoose.connect("mongodb://localhost:27017/MobileApp", { useCreateIndex: true, useNewUrlParser: true })

/* Define Mongoose connection to project's MongoDB database */

/*Middleware*/
app.use(morgan('dev')); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require('./api/models/voter');
require('./api/models/candidates');
require('./api/models/email');
require('./api/models/vote');
require('./api/models/rules')


const candidatesRoutes = require('./api/routes/candidates');
const rulesRoutes = require('./api/routes/rules');
const voteRoutes = require('./api/routes/vote');
const voterRoutes = require('./api/routes/voter');

const electionRoutes = require('./api/routes/election');

/*Middleware*/

app.use(morgan('dev')); 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const emailRoutes = require('./api/routes/email');


// app.use(bodyParser.urlencoded({extended: true}));
app.use('/uploads',express.static('uploads'));



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

app.use('/email',emailRoutes)


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