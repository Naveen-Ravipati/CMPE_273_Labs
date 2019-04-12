var express = require('express');
var router = express.Router(); // capital R
var app = express();
const mongoClient = require('mongodb').MongoClient;
var bcrypt = require('bcryptjs');
var mysql = require('../config/sql').mysql
var con = require('../config/sql').con
var { student_details } = require('../models/student_details')
var { faculty_details } = require('../models/faculty_details')

var passport = require('passport');
var jwt = require('jsonwebtoken');
var requireAuth = passport.authenticate('jwt', { session: false });

//Kafka
var kafka = require('../kafka/client');

router.post('/students_list',requireAuth, function (req, res) {
    console.log("Inside students_list message backend");
    console.log(req.body)

    kafka.make_request("students_list", req.body, function (err, result) {
        if (err) {
            console.log("Error in messages Students list", err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in messages Students list');
        }
        else {
            console.log('Students list', JSON.stringify(result));
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            res.end(JSON.stringify(result));
        }
    })
})


router.post('/faculty_list',requireAuth, function (req, res) {
    console.log("Inside faculty list message backend");
    console.log(req.body)
    
    kafka.make_request("faculty_list", req.body, function (err, result) {
        if (err) {
            console.log("Error in messages Faculty list", err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in messages Faculty list');
        }
        else {
            console.log('Faculty list', JSON.stringify(result));
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            res.end(JSON.stringify(result));
        }
    })
})


router.post('/conversation',requireAuth, function (req, res) {
    console.log("Inside Conversation backend");
    console.log(req.body)

    kafka.make_request("conversation", req.body, function (err, result) {
        if (err) {
            console.log("Error in Conversations", err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in Conversations');
        }
        else {
            console.log('Conversation list', JSON.stringify(result));
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            res.end(JSON.stringify(result));
        }
    })
})

router.post('/send_message',requireAuth, function (req, res) {
    console.log("Inside Send Message backend");
    console.log(req.body)

    kafka.make_request("send_message", req.body, function (err, result) {
        if (err) {
            console.log("Error in Send Message", err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in Send Message');
        }
        else {
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            res.end('Message Pushed');
        }
    })
    
})

module.exports = router;