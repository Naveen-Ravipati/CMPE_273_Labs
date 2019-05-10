var { add_courses} = require('../models/add_courses')


function handle_request(message, callback) {

    console.log("Inside Search Kafka backend");

    // if (message.registration_status == 'Register') {
    //     student_details.findOneAndUpdate({ student_id: message.student_id }, { $push: { courses_registered: { course_id: message.course_id_register_drop } } }, { upsert: true }, function (err, result) {
    //         add_courses.findOneAndUpdate({ course_id: message.course_id_register_drop }, { $inc: { number_enrolled: 1 } }, function (err, result) {
    //             student_details.findOne({ student_id: message.student_id }, function (err, result) {
    //                 if (err) {
    //                     console.log(err)
    //                     callback(err, null);
    //                 }
    //                 else if(result){
    //                 console.log("Course Register : ", JSON.stringify(result));
    //                 callback(null, result);
    //             }
    //             })
    //         })
    //     })
    // }
    // else if (message.registration_status == 'Drop') {
    //     console.log(typeof message.course_id_register_drop)
    //     console.log(typeof message.student_id)
    //     student_details.findOneAndUpdate({ student_id: message.student_id }, { $pull: { courses_registered: { course_id: message.course_id_register_drop } } }, { upsert: true }, function (err, result) {
    //         add_courses.findOneAndUpdate({ course_id: message.course_id_register_drop }, { $inc: { number_enrolled: -1 } }, { upsert: true }, function (err, result) {
    //             student_details.findOne({ student_id: message.student_id }, function (err, result) {
    //                 if (err){
    //                     console.log(err)
    //                     callback(err, null);
    //                 }
    //                 else if(result){
    //                 console.log("Course Register : ", JSON.stringify(result));
    //                 callback(null, result);
    //                 }
    //             })
    //         })
    //     })
    // }
    // else {
    //     student_details.findOne({ student_id: message.student_id }, function (err, result) {
    //         if (err){
    //             console.log(err)
    //             callback(err, null);
    //         }
    //         else if(result){
    //         console.log("Course Register here: ", JSON.stringify(result));
    //         callback(null, result);
    //         }
    //     })
    // }

    var searched_Result = []
    var final_Result = []

        add_courses.find({course_term:message.course_term},
        function (err, result) {

            if (err){
                console.log(err)
                callback(err, null);
            }

            if (message.course_name != '') {
                searched_Result = result.filter((course) => {
                    return course.course_name.indexOf(message.course_name) > -1;
                });
            }

            else{
                searched_Result = result;
            }

            if (message.course_id) {

                if (message.search_condition == 'greater') {
                    final_Result = searched_Result.filter((course) => {
                        return course.course_id > message.course_id;
                    });
                }

                else if (message.search_condition == 'exactly') {
                    final_Result = searched_Result.filter((course) => {
                        return course.course_id == message.course_id;
                    });

                }
                else if (message.search_condition == 'lesser') {
                    final_Result = searched_Result.filter((course) => {
                        return course.course_id < message.course_id;
                    });
                }
            }
            else {
                final_Result = searched_Result
            }

            console.log("Final result : ", JSON.stringify(final_Result));
            callback(null, final_Result);

        });
}

exports.handle_request = handle_request;