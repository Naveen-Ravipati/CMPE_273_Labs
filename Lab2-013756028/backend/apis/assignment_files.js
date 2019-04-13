var multer = require('multer');
var fs = require('fs');

const path = require('path');
var router = require('express').Router();



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, './submissions/'+req.query.course_id+'/'+req.query.student_id+'/'+req.query.assignment_id+'/')
    },
    filename: function (req, file, cb) {
      console.log("hi",req.body,file)
    cb(null, '200' + '-' +file.originalname )
    }
    })
    
    var upload = multer({ storage: storage }).single('file')

  router.post('/upload',function(req, res) {
        console.log(req.body)
      upload(req, res, function (err) {
        console.log(err)
      if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
      } else if (err) {
      return res.status(500).json(err)
      }
      return res.status(200).send(req.file)
      })
  });
    module.exports=router