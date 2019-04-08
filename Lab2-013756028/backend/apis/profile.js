var express = require('express');
var router = express.Router(); // capital R
var app = express();
const mongoClient = require('mongodb').MongoClient;
var bcrypt = require('bcryptjs');
var mysql = require('../config/sql').mysql
var con = require('../config/sql').con
var {student_details} = require('../models/student_details')
var {faculty_details} = require('../models/faculty_details')

// router.post('/profile_update', function (req, res) {
//     console.log("Inside Profile_update");

//     console.log('abc' + req.body.email)
//     console.log('SID' + req.body.student_id)
//     console.log(req.body.name)
//     if (req.body.student_or_faculty == 'student') {
//         let qury = "UPDATE student_details SET name = " + mysql.escape(req.body.name) + "," + "email = " + mysql.escape(req.body.email) + "," + "company = " + mysql.escape(req.body.company) + "," + "school = " + mysql.escape(req.body.school) + "," + "languages = " + mysql.escape(req.body.languages) + "," + "gender = " + mysql.escape(req.body.gender) + "," + "mobile = " + mysql.escape(req.body.mobile_number) + "," + "phone_number = " + mysql.escape(req.body.phone_number) + "," + "city = " + mysql.escape(req.body.city) + "," + "hometown = " + mysql.escape(req.body.hometown) + "," + "country = " + mysql.escape(req.body.country) + "," + "about_me = " + mysql.escape(req.body.about_me) + " WHERE student_id = " + mysql.escape(req.body.student_id) + ";"
//         console.log(qury)
//         con.query(qury, function (err, result) {
//             if (err) throw err;
//             // console.log(result);
//             res.writeHead(200, {
//                 'Content-Type': 'application/json'
//             });
//             res.end('update completed');
//         });
//     }
//     else {
//         let qury = "UPDATE faculty_details SET name = " + mysql.escape(req.body.name) + "," + "email = " + mysql.escape(req.body.email) + "," + "company = " + mysql.escape(req.body.company) + "," + "school = " + mysql.escape(req.body.school) + "," + "languages = " + mysql.escape(req.body.languages) + "," + "gender = " + mysql.escape(req.body.gender) + "," + "mobile = " + mysql.escape(req.body.mobile_number) + "," + "phone_number = " + mysql.escape(req.body.phone_number) + "," + "city = " + mysql.escape(req.body.city) + "," + "hometown = " + mysql.escape(req.body.hometown) + "," + "country = " + mysql.escape(req.body.country) + "," + "about_me = " + mysql.escape(req.body.about_me) + " WHERE faculty_id = " + mysql.escape(req.body.faculty_id) + ";"
//         console.log(qury)
//         con.query(qury, function (err, result) {
//             if (err) throw err;
//             // console.log(result);
//             res.writeHead(200, {
//                 'Content-Type': 'application/json'
//             });
//             res.end('update completed');
//         });
//     }
// })

router.post('/profile_update', function (req, res) {
    console.log("Inside Profile_update");

    console.log('abc' + req.body.email)
    console.log('SID' + req.body.student_id)
    console.log(req.body.student_or_faculty)
    console.log(req.body)
    if (req.body.student_or_faculty == 'student') {
        student_details.updateOne({
            student_id: req.body.student_id
        }, {name:req.body.name,email:req.body.email,company:req.body.company,school:req.body.school,languages:req.body.languages,gender:req.body.gender,mobile:req.body.mobile,phone_number:req.body.phone_number,city:req.body.city,hometown:req.body.hometown,country:req.body.country,about_me:req.body.about_me}, function (err, result) {
            console.log(err)
            if (err) {
            console.log('here')
            res.writeHead(400, {
                'Content-Type': 'application/json'
            });
            res.end('Update not successful');
            }
            else if (result) {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end('update completed');
            }
        })
    }
    else if (req.body.student_or_faculty == 'faculty') {
        faculty_details.updateOne({
            faculty_id: req.body.faculty_id
        }, {name:req.body.name,email:req.body.email,company:req.body.company,school:req.body.school,languages:req.body.languages,gender:req.body.gender,mobile:req.body.mobile,phone_number:req.body.phone_number,city:req.body.city,hometown:req.body.hometown,country:req.body.country,about_me:req.body.about_me}, function (err, result) {
            if (err) {
            res.writeHead(400, {
                'Content-Type': 'application/json'
            });
            res.end('Update not successful');
            }
            else if (result) {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end('update completed');
            }
        })
    }

});


// router.post('/edit_profile', function (req, res) {
//     console.log("Inside edit Profile");
//     console.log(req.body.student_id)
//     console.log(req.body.student_or_faculty)

//     if (req.body.student_or_faculty == 'student') {
//         con.query("SELECT * FROM student_details WHERE student_id = " + mysql.escape(req.body.student_id), function (err, result) {
//             if (err) throw err;
//             // console.log(result);
//             res.writeHead(200, {
//                 'Content-Type': 'application/json'
//             });
//             console.log("Edit Profile : ", JSON.stringify(result));
//             res.end(JSON.stringify(result));
//         });

//     }
//     else {
//         con.query("SELECT * FROM faculty_details WHERE faculty_id = " + mysql.escape(req.body.faculty_id), function (err, result) {
//             if (err) throw err;
//             // console.log(result);
//             res.writeHead(200, {
//                 'Content-Type': 'application/json'
//             });
//             console.log("Edit Profile : ", JSON.stringify(result));
//             res.end(JSON.stringify(result));
//         });
//     }
// })

router.post('/edit_profile', function (req, res) {
    console.log("Inside edit Profile backend");
    console.log(req.body.student_id)
    console.log(req.body.student_or_faculty)
    if (req.body.student_or_faculty == 'student') {
    student_details.find({
        student_id: req.body.student_id
    }, function (err, result) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'application/json'
            })
            console.log("edit_profile error: " + JSON.stringify(result))
            res.end(JSON.stringify(result));
        } else if (result) {
            res.writeHead(200, {
                    'Content-Type': 'application/json'
                })
                console.log("Data for edit_profile: " + JSON.stringify(result))
                res.end(JSON.stringify(result));
        }
    })
    }
    else {
        faculty_details.find({
            faculty_id: req.body.faculty_id
        }, function (err, result) {
            if (err) {
                res.writeHead(400, {
                    'Content-Type': 'application/json'
                })
                console.log("edit_profile error: " + JSON.stringify(result))
                res.end(JSON.stringify(result));
            } else if (result) {
                res.writeHead(200, {
                        'Content-Type': 'application/json'
                    })
                    console.log("Data for edit_profile: " + JSON.stringify(result))
                    res.end(JSON.stringify(result));
            }
        })
    }


});

module.exports = router;