var { student_details } = require('../models/student_details')
var { faculty_details } = require('../models/faculty_details')


function handle_request(message, callback) {

    console.log("Inside Students list message Kafka backend");

    var new_result = []
    if (message.student_or_faculty == 'student') {
        student_details.find({}, function (err, result) {
            if (err) {
                console.log('Error fetching data')
                callback(err, null);
            }
            else if (result) {
                result.filter((a) => {
                    if (a.student_id != message.id) {
                        new_result.push({ student_id: a.student_id, name: a.name })
                    }
                })
                console.log("Message Students list : ", JSON.stringify(new_result));
                callback(null, new_result);
            }
        });
    }
    else {
        student_details.find({}, function (err, result) {
            if (err) {
                console.log('Error fetching data')
                callback(err, null);
            }
            else if (result) {
                result.filter((a) => {
                    new_result.push({ student_id: a.student_id, name: a.name })
                })
                console.log("Message students list : ", JSON.stringify(new_result));
                callback(null, new_result);
            }
        });
    }
}

exports.handle_request = handle_request;