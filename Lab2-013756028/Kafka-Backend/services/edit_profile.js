var {student_details} = require('../models/student_details')
var {faculty_details} = require('../models/faculty_details')

function handle_request(message, callback) {

    console.log("Inside Edit Profile Kafka backend");

    if (message.student_or_faculty == 'student') {
        student_details.find({
            student_id: message.student_id
        }, function (err, result) {
            if (err) {
                console.log("edit_profile error: " + err)
                callback(err, null);
            } 
            else if (result) {
                console.log("Data for edit_profile: " + JSON.stringify(result))
                callback(null, result);
            }
        })
        }
        else {
            faculty_details.find({
                faculty_id: message.faculty_id
            }, function (err, result) {
                if (err) {
                    console.log("edit_profile error: " + err)
                    callback(err, null);
                }
                else if (result) {
                    console.log("Data for edit_profile: " + JSON.stringify(result))
                    callback(null, result);
                }
            })
        }

}

exports.handle_request = handle_request;