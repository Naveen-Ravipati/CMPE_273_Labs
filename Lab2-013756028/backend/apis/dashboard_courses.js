var express = require('express');
var router = express.Router(); // capital R
var app = express();
const mongoClient = require('mongodb').MongoClient;
var bcrypt = require('bcryptjs');
var mysql = require('../config/sql').mysql
var con = require('../config/sql').con
var {student_details} = require('../models/student_details')
var {add_courses} = require('../models/add_courses')


// router.post('/dashboard_courses', function (req, res) {
//     var new_Result = []
//     console.log("Inside courses");
//     if (req.body.student_or_faculty == 'student') {
//         con.query("SELECT * FROM courses LEFT OUTER JOIN courses_registered ON courses.course_id = courses_registered.course_Id",
//             function (err, result) {
//                 if (err) throw err;

//                 new_Result = result.filter((course) => {
//                     return course.student_id == req.body.student_id;
//                 });
//                 console.log(new_Result);
//                 res.writeHead(200, {
//                     'Content-Type': 'application/json'
//                 });
//                 console.log("Courses : ", JSON.stringify(new_Result));
//                 res.end(JSON.stringify(new_Result));
//             });
//     }
//     else {
//         con.query("SELECT * FROM courses WHERE faculty_id  = " + mysql.escape(req.body.faculty_id),
//             function (err, result) {

//                 if (err) throw err;
//                 console.log(result);
//                 res.writeHead(200, {
//                     'Content-Type': 'application/json'
//                 });
//                 console.log("Courses : ", JSON.stringify(result));
//                 res.end(JSON.stringify(result));

//             });
//     }
// })

router.post('/dashboard_courses', function (req, res) {
    var new_Result = []
    console.log("Inside courses");
    if (req.body.student_or_faculty == 'student') {

        student_details.findOne({student_id:req.body.student_id},function (err, result) {
            add_courses.find({},function(err,all_courses){
                result.courses_registered.filter((course)=>{
                all_courses.filter((course_list)=>{
                    // console.log(course_list)
                if(course_list.course_id == course.course_id){
                    new_Result.push(course_list)
                } 
            })
        })
                if (err){
                    console.log('Error fetching data from database for dashboard courses')
                }
                else{
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                console.log("Courses : ", JSON.stringify(new_Result));
                res.end(JSON.stringify(new_Result));
                }
            })
        })
        
    }
    else {
        add_courses.find({faculty_id:req.body.faculty_id},
            function (err, result) {

                if (err){
                    console.log('Error fetching data from database for dashboard courses')
                }
                console.log(result);
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                console.log("Courses : ", JSON.stringify(result));
                res.end(JSON.stringify(result));

            });
    }
})

module.exports = router;