var express = require('express');
var router = express.Router(); // capital R
var app = express();
const mongoClient = require('mongodb').MongoClient;
var bcrypt = require('bcryptjs');
var mysql = require('../config/sql').mysql
var con = require('../config/sql').con
var {add_courses} = require('../models/add_courses')

// router.post('/submit_announce', function (req, res) {
//     console.log("Inside Submit Announcement");
//     console.log("Req Body : ", req.body);
//     con.query("INSERT INTO announcements (course_id, Date, Announce) VALUES(?,?,?)", [req.body.course_id, req.body.date, req.body.announce], function (err, result) {
//         if (err) throw err;
//         res.writeHead(200, {
//             'Content-Type': 'text/plain'
//         })
//         res.end("Successfully Updated");
//     })
// });

router.post('/submit_announce', function (req, res) {
    console.log("Inside Submit Announcement");
    console.log("Req Body : ", req.body);
    add_courses.findOneAndUpdate({course_id : req.body.course_id},{$push: {announcements:{course_id:req.body.course_id , date:req.body.date , announce:req.body.announce}}},{upsert:true}, function (err, result) {
        if (err){
            console.log('Error fetching data for announcements')
        }
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        })
        res.end("Successfully Updated");
    })
});


// router.post('/announcements', function (req, res) {
//     console.log("Inside announcements");
//     con.query("SELECT * FROM announcements", function (err, result) {
//         if (err) throw err;
//         console.log(result);
//         res.writeHead(200, {
//             'Content-Type': 'application/json'
//         });
//         console.log("Announcements : ", JSON.stringify(result));
//         res.end(JSON.stringify(result));
//     });
// })

router.post('/announcements', function (req, res) {
    console.log("Inside announcements");
    add_courses.find({course_id:req.body.course_id}, function (err, result) {
        if (err){
            console.log('Error fetching data for announcements')
        }
        console.log(result);
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        console.log("Announcements : ", JSON.stringify(result));
        res.end(JSON.stringify(result));
    });
})

module.exports = router;