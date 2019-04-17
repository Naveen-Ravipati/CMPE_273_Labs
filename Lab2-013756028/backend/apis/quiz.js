var express = require('express');
var router = express.Router(); // capital R
var app = express();
const mongoClient = require('mongodb').MongoClient;
var bcrypt = require('bcryptjs');
var mysql = require('../config/sql').mysql
var con = require('../config/sql').con
var {add_courses} = require('../models/add_courses')

// router.post('/quizzes', function (req, res) {
//     console.log("Inside Quizzes backend");
//     con.query("SELECT * FROM quizzes WHERE course_id = " + mysql.escape(req.body.course_id), function (err, result) {
//         if (err) throw err;
//         console.log(result);
//         res.writeHead(200, {
//             'Content-Type': 'application/json'
//         });
//         console.log("Quizzes : ", JSON.stringify(result));
//         res.end(JSON.stringify(result));
//     });
// })

router.post('/quizzes', function (req, res) {
    console.log("Inside Quizzes backend");
    add_courses.find({course_id:req.body.course_id}, function (err, result) {
        if (err){
            console.log('Error fetching from database')
        }
        else if(result){
        console.log(result);
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        console.log("Quizzes : ", JSON.stringify(result));
        res.end(JSON.stringify(result));
    }
    });
})


router.post('/quiz_questions', function (req, res) {
    console.log("Inside Quiz Questions backend");
    add_courses.find({course_id:req.body.course_id}, function (err, result) {
        if (err){
            console.log('Error fetching data from database')
        }
        else if(result){
        console.log(result);
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        console.log("Quiz questions : ", JSON.stringify(result));
        res.end(JSON.stringify(result));
    }
    });
})



router.post('/quiz_submit',async function (req, res) {
    let score = 0
    console.log("Inside Quiz submit backend");
    console.log('Submitted ' + JSON.stringify(req.body))
    request = req.body.quiz_responses
    add_courses.find({course_id:req.body.course_id}, function (err, result) {
        if (err){
            console.log('Error fetching data from database')
        }
        else if(result){
        console.log("here1", request)
        console.log('here2' + JSON.stringify(result[0].quizzes))
        result[0].quizzes.filter(function (quiz_answers) {
            request.filter(function (student) {
                if (quiz_answers.question_number == student.question_number && quiz_answers.correct_answer == student.response) {
                    score += 1
                }
            })
        })
        add_courses.findOneAndUpdate({course_id : req.body.course_id},{$push: {grades:{student_id:req.body.student_id,quiz_id:req.body.quiz_id,marks:score }}},{upsert:true}, function (err, result) {
            console.log(err)
        if(err){
            console.log('Error updating database for Grades')
            throw err
        }
        else if(result){
        console.log(result)
        console.log('score'+score)
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end('Score updated');
    }
        })
        }
    });
})

// router.post('/submit_quiz_question', function (req, res) {
//     console.log("Inside Submit Quiz Question");
//     console.log("Req Body : ", req.body);
//     con.query("INSERT INTO quizzes (course_id, quiz_id, question_number,question,option_1,option_2,option_3,option_4,correct_answer) VALUES(?,?,?,?,?,?,?,?,?)", [req.body.course_id, req.body.quiz_id, req.body.question_number, req.body.question, req.body.option_1, req.body.option_2, req.body.option_3, req.body.option_4, req.body.correct_answer], function (err, result) {
//         if (err) throw err;
//         res.writeHead(200, {
//             'Content-Type': 'text/plain'
//         })
//         res.end("Successfully Updated");
//     })
// });

router.post('/submit_quiz_question', function (req, res) {
    console.log("Inside Submit Quiz Question");
    console.log("Req Body : ", req.body);
    add_courses.findOneAndUpdate({course_id : req.body.course_id},{$push: {quizzes:{quiz_id:req.body.quiz_id ,question_number:req.body.question_number,question:req.body.question,option_1:req.body.option_1,option_2:req.body.option_2,option_3:req.body.option_3,option_4:req.body.option_4,correct_answer:req.body.correct_answer}}},{upsert:true},
    function (err, result) {
        if (err){
            console.log('Error fectching data from database')
        }
        else if(result){
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        })
        res.end("Successfully Updated");
    }
    })

});

module.exports = router;