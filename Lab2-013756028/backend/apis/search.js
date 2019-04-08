var express = require('express');
var router = express.Router(); // capital R
var app = express();
const mongoClient = require('mongodb').MongoClient;
var bcrypt = require('bcryptjs');
var mysql = require('../config/sql').mysql
var con = require('../config/sql').con
var { add_courses} = require('../models/add_courses')

// router.post('/search', function (req, res) {
//     console.log('Inside Search: ', req.body);
//     console.log(req.body.course_name)
//     var searched_Result = []
//     var searchResult = []
//     var final_Result = []
//     var new_Result = []

//     con.query("SELECT * FROM courses LEFT OUTER JOIN courses_registered ON courses.course_id = courses_registered.course_Id AND courses_registered.student_id =" + mysql.escape(req.body.student_id),
//         function (err, result) {

//             if (err) throw err;

//             if (req.body.course_term != '') {
//                 searchResult = result.filter((course) => {
//                     return course.course_term.indexOf(req.body.course_term) > -1;
//                 });
//                 if (searchResult.course_name != '') {
//                     searched_Result = searchResult.filter((course) => {
//                         return course.course_name.indexOf(req.body.course_name) > -1;
//                     });
//                 }
//             }

//             if (req.body.course_id) {

//                 if (req.body.search_condition == 'greater') {
//                     final_Result = searched_Result.filter((course) => {
//                         return course.course_id > req.body.course_id;
//                     });
//                 }

//                 else if (req.body.search_condition == 'exactly') {
//                     final_Result = searched_Result.filter((course) => {
//                         return course.course_id == req.body.course_id;
//                     });

//                 }
//                 else if (req.body.search_condition == 'lesser') {
//                     console.log('here1')
//                     final_Result = searched_Result.filter((course) => {
//                         return course.course_id < req.body.course_id;
//                     });
//                 }
//             }
//             else {
//                 final_Result = searched_Result
//             }

//             res.writeHead(200, {
//                 'Content-Type': 'application/json'
//             });
//             console.log("Final result : ", JSON.stringify(final_Result));
//             res.end(JSON.stringify(final_Result));

//         });
// })



router.post('/search', function (req, res) {
    console.log('Inside Search: ', req.body);
    console.log(req.body.course_name)
    var searched_Result = []
    var final_Result = []

        add_courses.find({course_term:req.body.course_term},
        function (err, result) {

            if (err) throw err;

            if (req.body.course_name != '') {
                searched_Result = result.filter((course) => {
                    return course.course_name.indexOf(req.body.course_name) > -1;
                });
            }

            else{
                searched_Result = result;
            }

            if (req.body.course_id) {

                if (req.body.search_condition == 'greater') {
                    final_Result = searched_Result.filter((course) => {
                        return course.course_id > req.body.course_id;
                    });
                }

                else if (req.body.search_condition == 'exactly') {
                    final_Result = searched_Result.filter((course) => {
                        return course.course_id == req.body.course_id;
                    });

                }
                else if (req.body.search_condition == 'lesser') {
                    final_Result = searched_Result.filter((course) => {
                        return course.course_id < req.body.course_id;
                    });
                }
            }
            else {
                final_Result = searched_Result
            }

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            console.log("Final result : ", JSON.stringify(final_Result));
            res.end(JSON.stringify(final_Result));

        });
})


module.exports = router;