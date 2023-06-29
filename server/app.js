var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')
// var session = require('client-sessions');
var router = express.Router();
var kafka = require('./routes/kafka/client');

var passport = require('passport');
require('./routes/passport')(passport);

var index = require('./routes/vishal/index');
var movies = require('./routes/vishal/movies');
var admin = require('./routes/vishal/admin');

var usertracking = require('./routes/mangesh/usertracking');

var ad = require('./routes/mandip/ad');


var movietheatres = require('./routes/pranith/movietheatre');
var user = require('./routes/satish/users');


var mongoSessionURL = "mongodb://cmpe273:sreedevi@ds149613.mlab.com:49613/fandango";



var expressSessions = require("express-session");
// var MysqlStore = require('express-mysql-session')(expressSessions);
var mongoStore = require("connect-mongo")(expressSessions);

var app = express();

var corsOptions = {
    origin: true,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    exposedHeaders: ['x-auth-token'],
    optionsSuccessStatus: 200// some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});





app.use(cors(corsOptions));
/*

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
*/

// app.use(session({
//     cookieName : 'session',
//     secret : 'CMPE273_Redux',
//     duration : 30 *60 *1000,
//     activeDuration : 20*60*1000
// }));

var options = {

    host: 'fandango.coiprk9rsjrx.us-west-1.rds.amazonaws.com',
    user: 'test',
    password: 'pass',
    database: 'fandango',
    port: 3306

};


app.use(expressSessions({
    secret: 'CMPE273_fandango',
    cookie: {secure: false},
    httpOnly: true,
    secure: false,
    maxAge: null,
    duration: 30 * 60 * 1000,    //setting the time for active session
    activeDuration: 5 * 60 * 1000,
    resave: false,
    store: new mongoStore({
        url: mongoSessionURL
    }),
    saveUninitialized: false,
    unset: 'destroy'
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/user', user);//satish

app.use('/', index); //vishal
app.use('/movies', movies); //vishal
app.use('/admin', admin); //vishal
app.use('/movietheatres', movietheatres); //pranith

//app.use('/usertracking', usertracking); //mangesh


// delete it later







app.use('/ad', ad); //mandip


// catch 404 and forward to error handlers
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.post('/usertrackclose', function (req, res) {
console.log("from usertrackclose_topic entry");
console.log(req,req.body,"-----------------------------------------------------");
    kafka.make_request('usertrackclose_topic', {"reqBody":req.body}, function (err, results) {
        console.log('Results: ', results);
        res.status(201).send(results)       
        
    });
});

app.post('/pageclicks', function (req, res) {
console.log("from pageclicks_topic entry");
console.log(req,req.body,"-----------------------------------------------------");
    kafka.make_request('pageclicks_topic', {"reqBody":req.body}, function (err, results) {
        
        console.log('Results: ', results);
        res.status(201).send(results);       
        
    });
});

app.post('/usertrack', function (req, res) {
console.log("from usertracking_topic entry");
console.log(req,req.body,"-----------------------------------------------------");
    kafka.make_request('usertracking_topic', {"reqBody":req.body}, function (err, results) {
        console.log('Results: ', results);
        res.status(201).send(results)       
        
    });
});

app.post('/usertrack123', function (req, res) {
console.log("from usertracking_topic entry");
console.log(req,req.body,"-----------------------------------------------------");
    kafka.make_request('usertracking_topic', {"reqBody":req.body}, function (err, results) {
        console.log('Results: ', results);
        res.status(201).send(results)       
        
    });
});


app.post('/movieclicks', function (req, res) {
console.log("from movieclicks_topic entry");
console.log(req,req.body,"-----------------------------------------------------");
    kafka.make_request('movieclicks_topic', {"reqBody":req.body}, function (err, results) {
        
        console.log('Results: ', results);
        res.status(201).send(results);       
        
    });
});


module.exports = app;
