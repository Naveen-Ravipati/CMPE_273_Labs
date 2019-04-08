var express = require('express');
var router = express.Router(); // capital R
var app = express();
const mongoClient = require('mongodb').MongoClient;
var bcrypt = require('bcryptjs');
// var mysql = require('../config/sql').mysql
// var con = require('../config/sql').con
var {student_details} = require('../models/student_details')
var {faculty_details} = require('../models/faculty_details')

// router.post('/login', function (req, res) {
//     console.log("Inside Login Post Request");
//     //console.log("Req Body : ", username + "password : ",password);
//     console.log("Req Body : ", req.body);

//     if (req.body.student_or_faculty == 'student') {
//         var qry = "SELECT * FROM student_details WHERE student_id =" + mysql.escape(req.body.username);
//         console.log(qry)
//         con.query(qry, function (err, result) {
//             if (err){
//                 console.log("SQL QUERY ERROR : PULLING FROM DATABASE")
//                 res.writeHead(400, {
//                     'Content-Type': 'text/plain'
//                 })
//                 res.end('Invalid credentials')
//             }
//             else if(result.length>0){
//                 console.log("RECORD FOUND",result)
//                 console.log(result[0].password, req.body.password)
//                 if (bcrypt.compareSync(req.body.password, result[0].password)) {
//                     res.cookie('cookie', "admin", { maxAge: 900000, httpOnly: false, path: '/' });
//                     console.log(result[0])
//                     req.session.user = result[0];
//                     res.writeHead(200, {
//                         'Content-Type': 'text/plain'
//                     })
//                     res.end("Successful Login");
//                 }
//                 else{
//                     res.writeHead(400, {
//                         'Content-Type': 'text/plain'
//                     })
//                     res.end("No Such User");
//                 }
//             }else{
//                 console.log("NO RECORD FOR THIS USER")
//                 res.writeHead(400, {
//                     'Content-Type': 'text/plain'
//                 })
//                 res.end('Invalid credentials')
//             }
           
//         })

//     }
//     else {
//         var qry = "SELECT * FROM faculty_details WHERE faculty_id =" + mysql.escape(req.body.username);
//         console.log(qry)
//         con.query(qry, function (err, result) {
//             if (err) throw err;
//             console.log(result[0].password, req.body.password)
//             console.log(bcrypt.compareSync(req.body.password, result[0].password))
//             if (bcrypt.compareSync(req.body.password, result[0].password)) {
//                 res.cookie('cookie', "admin", { maxAge: 900000, httpOnly: false, path: '/' });
//                 console.log(result[0])
//                 req.session.user = result[0];
//                 res.writeHead(200, {
//                     'Content-Type': 'text/plain'
//                 })
//                 res.end("Successful Login");
//             }
//             else{
//                 res.writeHead(400, {
//                     'Content-Type': 'text/plain'
//                 })
//                 res.end("No Such User");
//             }
//         })

//     }
// });

router.post('/login', function (req, res) {
    console.log("Inside Login backend");
    //console.log(req.body.username)
    if (req.body.student_or_faculty == 'student') {
    student_details.findOne({
        student_id: req.body.username
    }, function (err, user) {
        if (err) {
            res.code = "400";
            res.value = "The password and email entered by you are not correct. Please try again.";
            console.log(res.value);
            res.sendStatus(400).end();
        } else if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                console.log('user'+user)
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Successful Login");
            }
            else {
                res.writeHead(400, {
                    'Content-Type': 'text/plain'
                })
                res.end("Login not successful");
            }
        }
    })
    }   
    else{
        faculty_details.findOne({
            faculty_id: req.body.username
        }, function (err, user) {
            if (err) {
                res.code = "400";
                res.value = "The password and email entered by you are not correct. Please try again.";
                console.log(res.value);
                res.sendStatus(400).end();
            } else if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    console.log('user'+user)
                        res.writeHead(200, {
                            'Content-Type': 'text/plain'
                        })
                        res.end("Successful Login");
                }
                else {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Login not successful");
                }
            }
        })   
    }
});

module.exports = router;