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


router.post('/people', requireAuth, function (req, res) {
    console.log("Inside people backend");
    console.log(req.body.course_id) 
    let new_result = []
    student_details.aggregate({$unwind: '$courses_registered'}, function (err, result) {
        if (err){
            console.log('Error fetching data for people')
        }
        else if(result){
        result.filter((a)=>{
            if(a.courses_registered.course_id == req.body.course_id){
            new_result.push({student_id:a.student_id,name:a.name})
            }
        })     
        console.log(result);
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        console.log("People : ", JSON.stringify(new_result));
        res.end(JSON.stringify(new_result));
        }
    });
})

router.post('/drop_course', requireAuth, function (req, res) {
    console.log("Inside drop course by faculty backend");
    console.log(typeof req.body.course_id) 
    console.log(typeof req.body.student_id)
    student_details.findOneAndUpdate({student_id:req.body.student_id.toString()},{$pull:{courses_registered:{course_id:Number(req.body.course_id)}}},{upsert:true}, function (err, result) {
        add_courses.findOneAndUpdate({course_id:Number(req.body.course_id)},{$inc: {number_enrolled:-1}},{upsert:true}, function (err, result_new) {
        if (err){
            console.log('Error fetching data')
        }
           
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        console.log("Drop Course : ", JSON.stringify(result));
        res.end();
        
    });
})
})


module.exports = router;