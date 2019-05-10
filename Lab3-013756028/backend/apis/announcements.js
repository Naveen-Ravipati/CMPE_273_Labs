var express = require('express');
var router = express.Router(); // capital R
var app = express();
const mongoClient = require('mongodb').MongoClient;
var bcrypt = require('bcryptjs');
var mysql = require('../config/sql').mysql
var con = require('../config/sql').con
var {add_courses} = require('../models/add_courses')

var passport = require('passport');
var jwt = require('jsonwebtoken');
var requireAuth = passport.authenticate('jwt', { session: false });

//Kafka
var kafka = require('../kafka/client');


router.post('/submit_announce',requireAuth, function (req, res) {
    console.log("Inside Submit Announcement");
    console.log("Req Body : ", req.body);

    kafka.make_request("submit_announce", req.body, function (err, result) {
        if (err) {
            console.log("Error in Submitting Announcement", err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in Submitting Announcement');
        }
        else {
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            res.end("Successfully Updated");
        }
    })
});


router.post('/announcements',requireAuth, function (req, res) {
    console.log("Inside announcements");

    kafka.make_request("announcements", req.body, function (err, result) {
        if (err) {
            console.log("Error in Announcements", err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in Announcements');
        }
        else {
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            res.end(JSON.stringify(result));
        }
    })
})

module.exports = router;