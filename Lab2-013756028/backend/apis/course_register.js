var express = require('express');
var router = express.Router(); // capital R
var app = express();
const mongoClient = require('mongodb').MongoClient;
var bcrypt = require('bcryptjs');
var mysql = require('../config/sql').mysql
var con = require('../config/sql').con
var {student_details} = require('../models/student_details')
var {add_courses} = require('../models/add_courses')

var passport = require('passport');
var jwt = require('jsonwebtoken');
var requireAuth = passport.authenticate('jwt', { session: false });

//Kafka
var kafka = require('../kafka/client');

router.post('/course_register',requireAuth, function (req, res) {
    console.log("Inside Course Register");
    console.log(req.body)

    kafka.make_request("course_register", req.body, function (err, result) {
        if (err) {
            console.log("Error in Course Register", err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in Course Register');
        }
        else {
            console.log('Course Register ', JSON.stringify(result));
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            res.end(JSON.stringify(result));
        }
    })
}) 

module.exports = router;