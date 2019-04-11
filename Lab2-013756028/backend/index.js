//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');
var bcrypt = require('bcryptjs');
var mongoose = require('./config/mongodb');

var passport = require('passport');
require('./config/passport')(passport);


var login = require('./apis/login')
var signup = require('./apis/signup')
var profile = require('./apis/profile')
var course_register = require('./apis/course_register')
var dashboard_courses = require('./apis/dashboard_courses')
var assignments = require('./apis/assignments')
var grades = require('./apis/grades')
var search = require('./apis/search')
var announcements = require('./apis/announcements')
var quiz = require('./apis/quiz')
var people = require('./apis/people')
var add_course = require('./apis/add_course')
var message_to = require('./apis/messages')
var send_message = require('./apis/messages')

// var mlog =require('mocha-logger');

//   mlog.log('checking login credentials');
//   mlog.log('validating login');
// mlog.pending('pending...');
// mlog.success('Login Successful');

// mlog.log('checking signup');
// mlog.log('validating signup');
// mlog.pending('pending...');
// mlog.success('Signup Successful');

// mlog.log('checking course page');
// mlog.log('validating course page');
// mlog.pending('pending...');
// mlog.success('Course page Successful');

// mlog.log('checking profile update');
// mlog.log('validating profile update');
// mlog.pending('pending...');
// mlog.success('Profile update Successful');

// mlog.log('checking search for courses');
// mlog.log('validating search');
// mlog.pending('pending...');
// mlog.success('Searching Successful');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret: 'cmpe273_kafka_passport_mongo',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});






    app.use('/', login);
    app.use('/', signup);
    app.use('/', profile);
    app.use('/', course_register);
    app.use('/', dashboard_courses);
    app.use('/', assignments);
    app.use('/', grades);
    app.use('/', search);
    app.use('/', announcements);
    app.use('/', quiz);
    app.use('/', people);
    app.use('/', add_course);
    app.use('/', message_to);
    app.use('/', send_message);


//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");

