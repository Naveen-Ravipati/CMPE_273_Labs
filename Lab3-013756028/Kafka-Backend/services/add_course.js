var {add_courses} = require('../models/add_courses')

function handle_request(message, callback) {

    var new_Result = []
    console.log("Inside Add Courses Kafka backend");
    // if (message.student_or_faculty == 'student') {

    //     student_details.findOne({ student_id: message.student_id }, function (err, result) {
    //         add_courses.find({}, function (err, all_courses) {
    //             result.courses_registered.filter((course) => {
    //                 all_courses.filter((course_list) => {
    //                     // console.log(course_list)
    //                     if (course_list.course_id == course.course_id) {
    //                         new_Result.push(course_list)
    //                     }
    //                 })
    //             })
    //             if (err) {
    //                 console.log('Error fetching data from database for dashboard courses')
    //                 callback(err, null);
    //             }
    //             else {
    //                 console.log("Courses : ", JSON.stringify(new_Result));
    //                 callback(null, new_Result);
    //             }
    //         })
    //     })

    // }
    // else {
    //     add_courses.find({ faculty_id: message.faculty_id },
    //         function (err, result) {

    //             if (err) {
    //                 console.log('Error fetching data from database for dashboard courses')
    //                 callback(err, null);
    //             }
    //             else{
    //             console.log(result);
    //             console.log("Courses : ", JSON.stringify(result));
    //             callback(null, result);
    //             }
    //         });
    // }


    var course_details = new add_courses({
        faculty_id: message.faculty_id,
        course_id: message.course_id,
        course_name: message.course_name,
        course_department:message.course_department,
        course_description:message.course_description,
        course_room:message.course_room,
        course_capacity:message.course_capacity,
        waitlist_capacity:message.waitlist_capacity,
        course_term:message.course_term,
        course_color:message.course_color,
        number_enrolled:message.number_enrolled,
        waitlist_status:message.waitlist_status,
        sbc:message.waitlist_status,
        });

        course_details.save().then((result) => {
            callback(null, result);
    }, (err) => {
        console.log("Error Creating Course");
        callback(err, null);
    })

}

exports.handle_request = handle_request;