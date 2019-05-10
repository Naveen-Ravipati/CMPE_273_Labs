var express = require('express');
var router = express.Router(); // capital R
var app = express();
const mongoClient = require('mongodb').MongoClient;
var {student_details} = require('../models/student_details')
var {add_courses} = require('../models/add_courses')



router.post('/assignment_marks_submit', function (req, res) {
    console.log("Inside assignment_marks_submit backend");
    console.log(req.body) 
    const data = req.body.assignment_data
    const courseid = Number(req.body.course_id)
    console.log(courseid)
    console.log(data)
    var count = 0
    data.filter((a,idx)=>{
    add_courses.findOneAndUpdate({course_id : courseid},{$push: {grades:{student_id:a.student_id,quiz_id:a.assignment_id,marks:a.marks }}},{upsert:true}, function (err, result) {
         if(err){
        console.log(err)
        console.log('Error updating database for Assignment grades')
        }
        else{
            count +=1
        }
        if(idx == data.length-1){
            if(count){
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.end('DB updated for assignment marks');
                }
                else{
                    console.log('Error updating database for Assignment grades')
                    res.writeHead(400, {
                        'Content-Type': 'application/json'
                    });
                    res.end('Error in Db update for assignment marks');
                }
        }
    })
    }) 
    
})


module.exports = router;