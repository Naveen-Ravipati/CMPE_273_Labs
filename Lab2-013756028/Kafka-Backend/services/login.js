var { student_details } = require('../models/student_details')
var { faculty_details } = require('../models/faculty_details')
var bcrypt = require('bcryptjs');


function handle_request(msg, callback) {
    console.log('Inside  Kafka Backend Login');
    console.log('Message', msg);

    if (msg.student_or_faculty == 'student') {
        student_details.findOne({
            student_id: msg.username
        }, function (err, user) {
            console.log("STUDENT")
            if (err) {
                console.log("Unable to fetch user details.", err);
                callback(err, null);
            }
            else {
                if (user) {
                    if (bcrypt.compareSync(msg.password, user.password)) {
                        console.log('Valid Credentials!');
                        callback(null, user);
                    }
                    else {
                        callback(null, null);
                    }
                } else {
                    console.log("false")
                    callback(null, null);
                }
            }
        })

    }
    else {
        faculty_details.findOne({
            faculty_id: msg.username
        }, function (err, user) {
            console.log("FACULTY")

            if (err) {
                console.log("Unable to fetch faculty details.", err);
                callback(err, null);
            } else {
                if (user) {
                    if (bcrypt.compareSync(msg.password, user.password)) {
                        console.log('Valid Credentials!');
                        callback(null, user);
                    }
                    else {
                        console.log("false false")
                        callback(null, null);
                    }
                } else {
                    console.log("false")
                    callback(null, false);
                }
            }
        }
        
        )
    }
}

exports.handle_request = handle_request;