var { student_details } = require('../models/student_details')
var { add_courses } = require('../models/add_courses')


function handle_request(message, callback) {

    var new_Result = []
    console.log("Inside Course Register Kafka backend");

    if (message.registration_status == 'Register') {
        student_details.findOneAndUpdate({ student_id: message.student_id }, { $push: { courses_registered: { course_id: message.course_id_register_drop } } }, { upsert: true }, function (err, result) {
            add_courses.findOneAndUpdate({ course_id: message.course_id_register_drop }, { $inc: { number_enrolled: 1 } }, function (err, result) {
                student_details.findOne({ student_id: message.student_id }, function (err, result) {
                    if (err) {
                        console.log(err)
                        callback(err, null);
                    }
                    else if(result){
                    console.log("Course Register : ", JSON.stringify(result));
                    callback(null, result);
                }
                })
            })
        })
    }
    else if (message.registration_status == 'Drop') {
        console.log(typeof message.course_id_register_drop)
        console.log(typeof message.student_id)
        student_details.findOneAndUpdate({ student_id: message.student_id }, { $pull: { courses_registered: { course_id: message.course_id_register_drop } } }, { upsert: true }, function (err, result) {
            add_courses.findOneAndUpdate({ course_id: message.course_id_register_drop }, { $inc: { number_enrolled: -1 } }, { upsert: true }, function (err, result) {
                student_details.findOne({ student_id: message.student_id }, function (err, result) {
                    if (err){
                        console.log(err)
                        callback(err, null);
                    }
                    else if(result){
                    console.log("Course Register : ", JSON.stringify(result));
                    callback(null, result);
                    }
                })
            })
        })
    }
    else {
        student_details.findOne({ student_id: message.student_id }, function (err, result) {
            if (err){
                console.log(err)
                callback(err, null);
            }
            else if(result){
            console.log("Course Register here: ", JSON.stringify(result));
            callback(null, result);
            }
        })
    }
}

exports.handle_request = handle_request;