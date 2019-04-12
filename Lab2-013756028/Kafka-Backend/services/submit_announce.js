var {add_courses} = require('../models/add_courses')


function handle_request(message, callback) {

    console.log("Inside Submit Announcements Kafka backend");

    add_courses.findOneAndUpdate({course_id : message.course_id},{$push: {announcements:{course_id:message.course_id , date:message.date , announce:message.announce}}},{upsert:true}, function (err, result) {
        if (err){
            console.log('Error updating data for Submit announcements')
            callback(err, null);
        }
        else if(result){
        callback(null, null);
        }
    })
}

exports.handle_request = handle_request;