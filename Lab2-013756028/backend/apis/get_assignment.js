var router = require('express').Router();

var kafka = require('../kafka/client');

router.post('/get_assignment', function (req, res) {
  kafka.make_request('get_assignment', req.body, function (err, result) {

    if (result) {
      if (result.length > 0) {
        console.log("Assignment results", result[0].assignments)
        res.end(JSON.stringify(result[0].assignments))
      }
      else {
        res.writeHead(400, {
          'Content-Type': 'text/plain'
        })
        res.end("Error finding results for assignments");
      }
    }
    else {
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end("Error finding results for assignments");
    }


  })


})
router.post('/get_assignment_detail', function (req, res) {

  kafka.make_request('get_assignment_detail', req.body, function (err, results) {

    if (results) {
      if (results.length > 0) {
        arr = results[0].assignments
        console.log("inarray", arr)
        arr.forEach(function (assignment) {
          console.log(assignment)
          if (assignment.assignment_id == req.body.assignment_id) {
            res.end(JSON.stringify([assignment]))
          }
        })
      }
      else {
        res.writeHead(400, {
          'Content-Type': 'text/plain'
        })
        res.end("Error finding results for assignments");
      }
    }
    else {
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end("Error finding results for assignments");
    }
  })

})
module.exports = router