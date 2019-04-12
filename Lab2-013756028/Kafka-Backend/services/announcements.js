var {add_courses} = require('../models/add_courses')


function handle_request(message, callback) {

    console.log("Inside Announcements Kafka backend");

    add_courses.find({course_id:message.course_id}, function (err, result) {
        if (err){
            console.log('Error fetching data for announcements')
            callback(err, null);
        }
        else if(result){
        console.log("Announcements : ", JSON.stringify(result));
        callback(null, result);
        }
    });
}

exports.handle_request = handle_request;