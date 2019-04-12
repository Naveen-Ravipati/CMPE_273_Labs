var {student_details} = require('../models/student_details')
var {faculty_details} = require('../models/faculty_details')

function handle_request(message, callback) {

    console.log("Inside Profile update Kafka backend");

    if (message.student_or_faculty == 'student') {
        student_details.updateOne({
            student_id: message.student_id
        }, {name:message.name,email:message.email,company:message.company,school:message.school,languages:message.languages,gender:message.gender,mobile:message.mobile,phone_number:message.phone_number,city:message.city,hometown:message.hometown,country:message.country,about_me:message.about_me}, function (err, result) {
            console.log(err)
            if (err) {
            console.log(err)
            callback(err, null);
            }
            else if (result) {
            callback(null, null);
            }
        })
    }
    else if (message.student_or_faculty == 'faculty') {
        faculty_details.updateOne({
            faculty_id: message.faculty_id
        }, {name:message.name,email:message.email,company:message.company,school:message.school,languages:message.languages,gender:message.gender,mobile:message.mobile,phone_number:message.phone_number,city:message.city,hometown:message.hometown,country:message.country,about_me:message.about_me}, function (err, result) {
            if (err) {
                console.log(err)
                callback(err, null);
            }
            else if (result) {
                callback(null, null);
            }
        })
    }

}

exports.handle_request = handle_request;