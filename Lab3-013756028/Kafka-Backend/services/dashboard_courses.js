var { student_details } = require('../models/student_details')
var { add_courses } = require('../models/add_courses')

function handle_request(message, callback) {

    var new_Result = []
    console.log("Inside courses Kafka backend");
    if (message.student_or_faculty == 'student') {

        student_details.findOne({ student_id: message.student_id }, function (err, result) {
            add_courses.find({}, function (err, all_courses) {
                result.courses_registered.filter((course) => {
                    all_courses.filter((course_list) => {
                        // console.log(course_list)
                        if (course_list.course_id == course.course_id) {
                            new_Result.push(course_list)
                        }
                    })
                })
                if (err) {
                    console.log('Error fetching data from database for dashboard courses')
                    callback(err, null);
                }
                else {
                    console.log("Courses : ", JSON.stringify(new_Result));
                    callback(null, new_Result);
                }
            })
        })

    }
    else {
        add_courses.find({ faculty_id: message.faculty_id },
            function (err, result) {

                if (err) {
                    console.log('Error fetching data from database for dashboard courses')
                    callback(err, null);
                }
                else{
                console.log(result);
                console.log("Courses : ", JSON.stringify(result));
                callback(null, result);
                }
            });
    }


}

exports.handle_request = handle_request;