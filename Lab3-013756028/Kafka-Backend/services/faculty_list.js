var { student_details } = require('../models/student_details')
var { faculty_details } = require('../models/faculty_details')


function handle_request(message, callback) {

    console.log("Inside Faculty list message Kafka backend");
    var new_result = []
    if (message.student_or_faculty == 'student') {
        faculty_details.find({}, function (err, result) {
            if (err) {
                console.log('Error fetching data')
                callback(err, null);
            }
            else if (result) {
                result.filter((a) => {
                    new_result.push({ faculty_id: a.faculty_id, name: a.name })
                })
                console.log("Messages Faculty list : ", JSON.stringify(new_result));
                callback(null, new_result);
            }
        });
    }
    else {
        faculty_details.find({}, function (err, result) {
            if (err) {
                console.log('Error fetching data')
                callback(err, null);
            }
            else if (result) {
                result.filter((a) => {
                    if (a.faculty_id != message.id) {
                        new_result.push({ faculty_id: a.faculty_id, name: a.name })
                    }
                })
                console.log("Messages Faculty list : ", JSON.stringify(new_result));
                callback(null, new_result);
            }
        });
    }
}

exports.handle_request = handle_request;