var multer = require('multer');
var fs = require('fs');

const path = require('path');
var router = require('express').Router();

router.get('/seeFolders', function (req, res) {
  const Filehound = require('filehound');
  console.log("body", req.query)

  Filehound.create()
    .path("./files/" + req.query.course_id + '/')
    .directory()
    .find((err, subdirectories) => {
      if (err) return console.error(err);

      console.log(subdirectories);
      res.send(subdirectories)
    });
})

router.get('/seeFoldFiles', function (req, res) {
  // if (process.argv.length <= 2) {
  //     console.log("Usage: " + __filename + " ./public/files");
  //     process.exit(-1);
  // }

  console.log(req.query)
  // var path = process.argv[2];
  console.log("inside see files")
  fs.readdir(req.query.path, function (err, items) {
    //console.log(items);

    res.end(JSON.stringify(items));
  });
})

router.get('/seeFiles', function (req, res) {
  // if (process.argv.length <= 2) {
  //     console.log("Usage: " + __filename + " ./public/files");
  //     process.exit(-1);
  // }

  // var path = process.argv[2];
  console.log("inside see files")
  console.log(req.query)
  if (req.query.student_or_faculty == "student") {
    fs.readdir("./submissions/" + req.query.course_id + '/' + req.query.student_id + '/' + req.query.assignment_id + '/', function (err, items) {
      //console.log(items);
      console.log(items)
      res.end(JSON.stringify(items));
    });
  }
  else {
    const Filehound = require('filehound');
    console.log("body", req.query)

    Filehound.create()
      .path("./submissions/" + req.query.course_id + '/')
      .directory()
      .find((err, subdirectories) => {
        if (err) return console.error(err);

        console.log(subdirectories);
        res.send(subdirectories)
      });
  }



})
router.post('/downloadfile-file/:file(*)', function (req, res) {
  console.log('Inside Download File');
  console.log(req.body.pathfile)
  var file = req.params.file;
  var filelocation = path.join(__dirname, '..' + req.body.pathfile, file);
  var img = fs.readFileSync(filelocation);
  var base64img = new Buffer(img).toString('base64');
  res.writeHead(200, {
    'Content-type': 'application/pdf'
  });
  res.end(JSON.stringify(base64img));

});
router.post('/download-file/:file(*)', function (req, res) {
  console.log('Inside DOwnload File');
  console.log(req.body)
  var file = req.params.file;
  var filelocation = path.join(__dirname, '..' + '/submissions/' + req.body.data.course_id + '/' + req.body.data.student_id + '/' + req.body.data.assignment_id + '/', file);
  var img = fs.readFileSync(filelocation);
  var base64img = new Buffer(img).toString('base64');
  res.writeHead(200, {
    'Content-type': 'application/pdf'
  });
  res.end(JSON.stringify(base64img));

});
module.exports = router
