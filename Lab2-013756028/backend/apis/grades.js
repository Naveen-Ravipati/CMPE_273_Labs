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

router.post('/grades', requireAuth, function (req, res) {
    console.log("Inside grades backend");
    add_courses.find({course_id:req.body.course_id}, function (err, result) {
        if (err){
            console.log('Error fetching data for grades')
        }
        console.log(result);
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        console.log("grades : ", JSON.stringify(result));
        res.end(JSON.stringify(result));
    });
})

module.exports = router;