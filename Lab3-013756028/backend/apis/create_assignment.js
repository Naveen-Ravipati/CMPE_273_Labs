var router = require('express').Router();
var {add_courses} = require('../models/add_courses');


router.post('/create_assignment',function(req,res){
  console.log(req.body)
  add_courses.find({course_id:req.body.course_id}, {_id:0, assignments: 1}, (err, results) => {
    
    if(err){
      console.log("Error finding mongo results for assignments");
      res.writeHead(400, {
          'Content-Type': 'text/plain'
      })
      res.end("Error finding mongo results for assignments");
  }
   else {
     console.log(results)
     arr = results[0].assignments
     console.log("array",arr)
    if(arr.length>0){
     var max_id = arr[arr.length-1].assignment_id
    }
    else{
      var max_id = 0
    }
     console.log("max_id",parseInt(max_id)+1)
     console.log(results[0].assignments)

     add_courses.findOneAndUpdate({
      course_id: req.body.course_id
    }, {
      $push: {
          assignments: {
            assignment_id: (parseInt(max_id) + 1).toString() ,
            name: req.body.assignment_name,
            due:req.body.assignment_due,
            marks: req.body.assignment_marks,
          }
      }
    }, {
      upsert: true
    }, function (err, result) {
      if (err)
          return res.send(500, {
              error: err
          });
      else{
        res.writeHead(200,{
          'Content-Type' : 'text/plain'
        })
      console.log("assignment created successfully")
        res.end();
      }
    
    });

  }

  })

  });

  module.exports=router
