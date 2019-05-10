var express = require('express');
var router = express.Router(); // capital R
var app = express();
const mongoClient = require('mongodb').MongoClient;
var bcrypt = require('bcryptjs');
var mysql = require('../config/sql').mysql
var con = require('../config/sql').con
var {student_details} = require('../models/student_details')
var {faculty_details} = require('../models/faculty_details')

var passport = require('passport');
var jwt = require('jsonwebtoken');
var requireAuth = passport.authenticate('jwt', { session: false });

//Kafka
var kafka = require('../kafka/client');

router.post('/profile_update',requireAuth, function (req, res) {
    console.log("Inside Profile_update");

    console.log(req.body.email)
    console.log(req.body.student_id)
    console.log(req.body.student_or_faculty)
    console.log(req.body)

    kafka.make_request("profile_update", req.body, function (err, result) {
        if (err) {
            console.log("Error in Profile update", err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in Profile update');
        }
        else {
            console.log('Profile update: ', JSON.stringify(result));
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            res.end('Profile update completed');
        }
    })

});


router.post('/edit_profile',requireAuth, function (req, res) {
    console.log("Inside edit Profile backend");
    console.log(req.body.student_id)
    console.log(req.body.student_or_faculty)

    kafka.make_request("edit_profile", req.body, function (err, result) {
        if (err) {
            console.log("Error in Editing Profile", err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end(JSON.stringify(err));
        }
        else {
            console.log('Editing Profile: ', JSON.stringify(result));
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            res.end(JSON.stringify(result));
        }
    })


});

module.exports = router;