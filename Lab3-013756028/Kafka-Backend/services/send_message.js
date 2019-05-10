var { student_details } = require('../models/student_details')
var { faculty_details } = require('../models/faculty_details')


function handle_request(message, callback) {

    console.log("Inside Send Message Kafka backend");
    if (message.from_student_or_faculty == 'student' && message.to_student_or_faculty == 'student') {
        student_details.findOneAndUpdate({ student_id: message.from }, { $push: { messages: { sender: message.from, receiver: message.to, content: message.message_content } } }, { upsert: true }, function (err, result) {
            student_details.findOneAndUpdate({ student_id: message.to }, { $push: { messages: { sender: message.from, receiver: message.to, content: message.message_content } } }, { upsert: true }, function (err, result1) {
            if (err) {
                console.log('Error fetching data')
                callback(err, null);
            }
            else if (result) {
                // console.log("Send Message : ", JSON.stringify(result));
                callback(null, null);
            }
            })
        });
    }
    else if (message.from_student_or_faculty == 'student' && message.to_student_or_faculty == 'faculty') {
        student_details.findOneAndUpdate({ student_id: message.from }, { $push: { messages: { sender: message.from, receiver: message.to, content: message.message_content } } }, { upsert: true }, function (err, result) {
            faculty_details.findOneAndUpdate({ faculty_id: message.to }, { $push: { messages: { sender: message.from, receiver: message.to, content: message.message_content } } }, { upsert: true }, function (err, result1) {
            if (err) {
                console.log('Error fetching data')
                callback(err, null);
            }
            else if (result) {
                // console.log("Send Message : ", JSON.stringify(result));
                callback(null, null);
            }
        });
    })
    }
    else if (message.from_student_or_faculty == 'faculty' && message.to_student_or_faculty == 'faculty') {
        faculty_details.findOneAndUpdate({ faculty_id: message.from }, { $push: { messages: { sender: message.from, receiver: message.to, content: message.message_content } } }, { upsert: true }, function (err, result) {
            faculty_details.findOneAndUpdate({ faculty_id: message.to }, { $push: { messages: { sender: message.from, receiver: message.to, content: message.message_content } } }, { upsert: true }, function (err, result1) {
            if (err) {
                console.log('Error fetching data')
                callback(err, null);
            }
            else if (result) {
                // console.log("Send Message : ", JSON.stringify(result));
                callback(null, null);
            }
        });
    })
    }
    else if (message.from_student_or_faculty == 'faculty' && message.to_student_or_faculty == 'student') {
        faculty_details.findOneAndUpdate({ faculty_id: message.from }, { $push: { messages: { sender: message.from, receiver: message.to, content: message.message_content } } }, { upsert: true }, function (err, result) {
            student_details.findOneAndUpdate({ student_id: message.to }, { $push: { messages: { sender: message.from, receiver: message.to, content: message.message_content } } }, { upsert: true }, function (err, result1) {
            if (err) {
                console.log('Error fetching data')
                callback(err, null);
            }
            else if (result) {
                // console.log("Send Message : ", JSON.stringify(result));
                callback(null, null);
            }
        });
    })
    }
}

exports.handle_request = handle_request;