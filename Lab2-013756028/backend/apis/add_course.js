var express = require('express');
var router = express.Router(); // capital R
var app = express();
const mongoClient = require('mongodb').MongoClient;
var bcrypt = require('bcryptjs');
// var mysql = require('../config/sql').mysql
// var con = require('../config/sql').con
var {add_courses} = require('../models/add_courses')

// router.post('/new_user', function (req, res) {

//     console.log("Inside New user Post Request");
//     console.log("Req Body : ", req.body);
//     var salt = bcrypt.genSaltSync(10);
//     // Hash the password with the salt
//     var hash = bcrypt.hashSync(req.body.new_password, salt);
//     if (req.body.new_student_or_faculty == 'student') {
//         con.query("INSERT INTO student_details (student_id, password, email) VALUES(?,?,?)", [req.body.new_studentid, hash, req.body.new_email], function (err, result) {
//             if (err) throw err;
//             res.writeHead(200, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end("Successful signup");
//         })
//     }
//     else {
//         con.query("INSERT INTO faculty_details (faculty_id, password, email) VALUES(?,?,?)", [req.body.new_studentid, hash, req.body.new_email], function (err, result) {
//             if (err) throw err;

//             res.writeHead(200, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end("Successful signup");
//         })
//     }
// });

router.post('/add_course', (req, res) => {
    console.log("Inside add_course backend");
    console.log(req.body)

    var course_details = new add_courses({
        faculty_id: req.body.faculty_id,
        course_id: req.body.course_id,
        course_name: req.body.course_name,
        course_department:req.body.course_department,
        course_description:req.body.course_description,
        course_room:req.body.course_room,
        course_capacity:req.body.course_capacity,
        waitlist_capacity:req.body.waitlist_capacity,
        course_term:req.body.course_term,
        course_color:req.body.course_color,
        number_enrolled:req.body.number_enrolled,
        waitlist_status:req.body.waitlist_status,
        sbc:req.body.waitlist_status,
        });

        course_details.save().then((result) => {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end("Add course Successful");
    }, (err) => {
        console.log("Error Creating User");
        res.end("Error in adding course");
    })
})

module.exports = router;
