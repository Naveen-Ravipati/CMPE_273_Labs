var multer = require('multer');
var fs = require('fs');

const path = require('path');
var router = require('express').Router();

router.post('/createfolder', function (req, res) {
    console.log(req.body)
    var dir = req.body.foldname;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    res.send(200).end();
});
var store = multer.diskStorage({
    destination: function (req, file, cb) {
    +96 +
        cb(null, './files/' + req.query.course_id + '/' + req.query.foldname)
    },
    filename: function (req, file, cb) {
        console.log("hi", req.body, file)
        cb(null, '200' + '-' + file.originalname)
    }
})

var upl = multer({ storage: store }).single('file')
router.post('/uploadfile', function (req, res) {
    console.log("body", req.body, req.query)
    upl(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)
    })
});
module.exports = router