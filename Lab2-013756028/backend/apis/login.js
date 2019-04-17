var express = require('express');
var router = express.Router(); // capital R
var app = express();
const mongoClient = require('mongodb').MongoClient;
var bcrypt = require('bcryptjs');
// var mysql = require('../config/sql').mysql
// var con = require('../config/sql').con


var passport = require('passport');
var jwt = require('jsonwebtoken');
var requireAuth = passport.authenticate('jwt', { session: false });
const secret = "secret";

//Kafka
var kafka = require('../kafka/client');


router.post('/login', function (req, res) {
    console.log("Inside Login backend");
    //console.log(req.body.username)
    kafka.make_request('login', req.body, function (err, result) {
        console.log('In results login');
        console.log('results', result);
        if (err) {
            console.log('Inside err login');
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in login!');
        }
        else if(result == false){
            console.log("userid invalid")
            res.sendStatus(400).end();
        }
        else if(result == null){
            console.log("userid invalid")
            res.sendStatus(401).end();
        }
        else {

            if (result) {
                console.log(req.body)
                console.log(result)
                // req.session.user = result;

                // Create token if the password matched and no error was thrown
                var token = jwt.sign(req.body, secret, {
                    expiresIn: 10080 // in seconds
                });

                //res.json({success: true, token: 'JWT ' + token});
                res.writeHead(200, {
                    'Content-type': 'text/plain'
                });

                //res.status(200).json({success: true, Authorization: 'Bearer ' + token});
                var result = {
                    Token: token
                }

                res.end(JSON.stringify(result));
            }
            else {
                // res.writeHead(401,
                //     {
                //         'Content-type': 'text/plain'
                //     })
                // console.log('Invalid Credentials!');
            res.sendStatus(400).end();

                res.end('Invalid Credentials!');
            }
        }
    })
});

module.exports = router;