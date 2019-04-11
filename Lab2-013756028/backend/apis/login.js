var express = require('express');
var router = express.Router(); // capital R
var app = express();
const mongoClient = require('mongodb').MongoClient;
var bcrypt = require('bcryptjs');
// var mysql = require('../config/sql').mysql
// var con = require('../config/sql').con
var { student_details } = require('../models/student_details')
var { faculty_details } = require('../models/faculty_details')

var passport = require('passport');
var jwt = require('jsonwebtoken');
var requireAuth = passport.authenticate('jwt', { session: false });
const secret = "secret";


router.post('/login', function (req, res) {
    console.log("Inside Login backend");
    //console.log(req.body.username)
    if (req.body.student_or_faculty == 'student') {
        student_details.findOne({
            student_id: req.body.username
        }, function (err, user) {
            if (err) {
                res.code = "400";
                res.value = "The password and email entered by you are not correct. Please try again.";
                console.log(res.value);
                res.sendStatus(400).end();
            } else if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    // token create if the password matches and error was not thrown
                    var token = jwt.sign(req.body, secret, {
                        expiresIn: 10080 // in seconds
                    });
                    console.log('user' + user)
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    var result = {
                        Token: token
                    }
                    res.end(JSON.stringify(result));
                }
                else {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Login not successful");
                }
            }
        })

    }
    else {
        faculty_details.findOne({
            faculty_id: req.body.username
        }, function (err, user) {
            if (err) {
                res.code = "400";
                res.value = "The password and email entered by you are not correct. Please try again.";
                console.log(res.value);
                res.sendStatus(400).end();
            } else if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    // token create if the password matches and error was not thrown
                    var token = jwt.sign(req.body, secret, {
                        expiresIn: 10080 // in seconds
                    });
                    console.log('user' + user)
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    var result = {
                        Token: token
                    }
                    res.end(JSON.stringify(result));
                }
                else {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Login not successful");
                }
            }
        })
    }
});

module.exports = router;