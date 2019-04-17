var express = require('express');
var router = express.Router(); // capital R
var app = express();
const mongoClient = require('mongodb').MongoClient;
var bcrypt = require('bcryptjs');
// var mysql = require('../config/sql').mysql
// var con = require('../config/sql').con
var {student_details} = require('../models/student_details')
var {faculty_details} = require('../models/faculty_details')



router.post('/new_user', (req, res) => {
    console.log("Inside Signup backend");
    var salt = bcrypt.genSaltSync(10);
    // Hash the password with the salt
    var hash = bcrypt.hashSync(req.body.new_password, salt);
    if(req.body.new_student_or_faculty == 'student'){
    var new_user = new student_details({
        student_id: req.body.new_studentid,
        password: hash,
        email: req.body.new_email,
        });
    }
    else{
    var new_user = new faculty_details({
        faculty_id: req.body.new_studentid,
        password: hash,
        email: req.body.new_email,
        })
    }
    new_user.save().then((user) => {
        console.log("User created : ", user);
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end("Successful signup");
    }, (err) => {
        console.log("Error Creating User");
        console.log(err)
        res.writeHead(400, {
            'Content-Type': 'text/plain'
        })
        res.end("Signup failed");
    })
})

module.exports = router;