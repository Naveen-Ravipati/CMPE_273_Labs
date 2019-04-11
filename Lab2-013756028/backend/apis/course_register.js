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

router.post('/course_register',requireAuth, function (req, res) {
    console.log("Inside Course Register");
    console.log(req.body)

    if (req.body.registration_status == 'Register') {
        student_details.findOneAndUpdate({student_id:req.body.student_id},{$push: {courses_registered:{course_id:req.body.course_id_register_drop}}},{upsert:true}, function (err, result) {
            add_courses.findOneAndUpdate({course_id:req.body.course_id_register_drop},{$inc: {number_enrolled:1}}, function (err, result) {
            student_details.findOne({student_id:req.body.student_id},function(err,result){
                if (err) {
                    console.log(err)
                    throw err;}
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                console.log("Course Register : ", JSON.stringify(result));
                res.end(JSON.stringify(result));
            })
        })
    })
    }
    else if (req.body.registration_status == 'Drop') {
        console.log(typeof req.body.course_id_register_drop) 
        console.log(typeof req.body.student_id)
        student_details.findOneAndUpdate({student_id:req.body.student_id},{$pull: {courses_registered:{course_id:req.body.course_id_register_drop}}},{upsert:true}, function (err, result) {
            add_courses.findOneAndUpdate({course_id:req.body.course_id_register_drop},{$inc: {number_enrolled:-1}},{upsert:true}, function (err, result) {
            student_details.findOne({student_id:req.body.student_id},function(err,result){
                if (err) throw err;
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                console.log("Course Register : ", JSON.stringify(result));
                res.end(JSON.stringify(result));
            })
        })
    })
    }
    else{
        student_details.findOne({student_id:req.body.student_id},function(err,result){
            if (err) throw err;
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            console.log("Course Register here: ", JSON.stringify(result));
            res.end(JSON.stringify(result));

    })
    }
}) 

module.exports = router;