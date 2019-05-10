var express = require('express');
var router = express.Router(); // capital R
var app = express();
const mongoClient = require('mongodb').MongoClient;
var bcrypt = require('bcryptjs');
var mysql = require('../config/sql').mysql
var con = require('../config/sql').con
var {add_courses} = require('../models/add_courses')



// app.get('/seeFiles',function(req,res){
//    console.log("inside see files")
//   fs.readdir( "./submissions/assignments/", function(err, items) {
//       //console.log(items);
   
//       res.end(JSON.stringify(items));
//   });
// })

// router.post('/getassignmentdet',function(req,res){
//     con.query("SELECT * FROM assignmentlist WHERE courseid ="+req.body.courseid+" AND assignmentid="+req.body.assignmentid, function (err, result, fields) {
//       if (err) console.log(err);
//       res.end(JSON.stringify(result))
//   });

  
  // router.post('/get_assignment',function(req,res){
  //   var courseid = req.body.courseid
  //   console.log(courseid)
  //   var res1 = ""
  //     con.query("SELECT * FROM assignmentlist WHERE courseid ="+courseid, function (err, result, fields) {
  //       if (err) console.log(err);       
  //       res.end(JSON.stringify(result))
  //   });
  //   })

  router.post('/get_assignment',function(req,res){
    var course_id = req.body.course_id
      add_courses.find({course_id:req.body.course_id},function(err,result){
        if (err) console.log(err);   
        console.log('Assignment fetch'+result)    
        res.end(JSON.stringify(result))
    });
    })

    // router.post('/createassignment',function(req,res){
    //     console.log(req.body)
    //     con.query("INSERT INTO  assignmentlist(name,due,marks,courseid) VALUES(?,?,?,?)",[req.body.asgmnt_name,req.body.asgmnt_due,req.body.asgmnt_marks,req.body.courseid], function (err, result, fields) {
    //       if (err) console.log(err)
    //   });
    //   res.writeHead(200,{
    //     'Content-Type' : 'text/plain'
    //   })
    //   res.end();  
    //   });

      router.post('/create_assignment',function(req,res){
        console.log(req.body)
      add_courses.findOneAndUpdate({course_id:req.body.course_id},{$push: {assignments:{assignment_name:req.body.assignment_name , assignment_due:req.body.assignment_due , assignment_marks:req.body.assignment_marks}}},{upsert:true},function (err, result) {
        if(err){
          console.log(err)
        }
        else{
      res.writeHead(200,{
        'Content-Type' : 'text/plain'
      })
      res.end(); 
    } 
      })
    })
      

      module.exports = router;