const {add_courses} = require('../models/add_courses');



function handle_request(message, callback) {
    console.log('Inside  Kafka Backend Get Assignment detail');
    console.log('Message', message);

    add_courses.find({ course_id: message.course_id, "assignments.assignment_id": message.assignment_id }, { _id: 0, assignments: 1 }, (err, results) => {
        if (results) {
            console.log("Results Kafka backend Assignment detail", results)
            callback(null, results)
        }

        else {
            console.log(err)
            callback(err, null);
        }
    })

}
exports.handle_request = handle_request;
