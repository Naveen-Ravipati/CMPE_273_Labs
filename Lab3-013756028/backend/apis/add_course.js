var express = require('express');
var router = express.Router(); // capital R
var app = express();
const mongoClient = require('mongodb').MongoClient;
var bcrypt = require('bcryptjs');
// var mysql = require('../config/sql').mysql
// var con = require('../config/sql').con
var {add_courses} = require('../models/add_courses')

var passport = require('passport');
var jwt = require('jsonwebtoken');
var requireAuth = passport.authenticate('jwt', { session: false });

//Kafka
var kafka = require('../kafka/client');

router.post('/add_course',requireAuth, (req, res) => {
    console.log("Inside add_course backend");
    console.log(req.body)

    kafka.make_request("add_course", req.body, function (err, result) {
        if (err) {
            console.log("Error in Add Course", err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in Add course');
        }
        else {
            console.log('Add Course', JSON.stringify(result));
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            res.end("Add course Successful");
        }
    })
})

module.exports = router;
