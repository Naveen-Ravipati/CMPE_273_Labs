var express = require('express');
var router = express.Router(); // capital R
var app = express();
const mongoClient = require('mongodb').MongoClient;
var bcrypt = require('bcryptjs');
var mysql = require('../config/sql').mysql
var con = require('../config/sql').con
var {add_courses} = require('../models/add_courses')

// router.post('/grades', function (req, res) {
//     console.log("Inside Grades");
//     if (req.body.student_or_faculty == 'student') {
//         con.query("SELECT * FROM grades WHERE student_id = " + mysql.escape(req.body.student_id) + " AND course_id = " + mysql.escape(req.body.course_id), function (err, result) {
//             if (err) throw err;
//             console.log(result);
//             res.writeHead(200, {
//                 'Content-Type': 'application/json'      
//             });
//             console.log("Quizzes : ", JSON.stringify(result));
//             res.end(JSON.stringify(result));
//         });
//     }
//     else if (req.body.student_or_faculty == 'faculty') {
//         con.query("SELECT * FROM grades WHERE course_id = " + mysql.escape(req.body.course_id), function (err, result) {
//             if (err) throw err;
//             console.log(result);
//             res.writeHead(200, {
//                 'Content-Type': 'application/json'
//             });
//             console.log("Quizzes : ", JSON.stringify(result));
//             res.end(JSON.stringify(result));
//         });
//     }
// })

router.post('/grades', function (req, res) {
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