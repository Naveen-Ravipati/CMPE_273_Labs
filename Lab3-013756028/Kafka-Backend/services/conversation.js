var { student_details } = require('../models/student_details')
var { faculty_details } = require('../models/faculty_details')


function handle_request(message, callback) {

    console.log("Inside Conversation Kafka backend");
    let conversation_result = []
    if (message.from_student_or_faculty == 'student') {
        student_details.findOne({ student_id: message.from } , function (err, result) {
            if (err) {
                console.log('Error fetching data')
                callback(err, null);
            }
            else if (result) {
                result.messages.filter((a)=>{
                    if(a.receiver == message.to){
                    // console.log(a.content)
                        conversation_result.push({id:message.from,content:a.content})
                    }
                    else if(a.sender == message.to){
                        // console.log(a.content)
                            conversation_result.push({id:message.to,content:a.content})
                        }
                })
                console.log("Conversation : ", JSON.stringify(conversation_result));
                callback(null, conversation_result);
            }
            })
    }
    else if(message.from_student_or_faculty == 'faculty'){
        faculty_details.findOne({ faculty_id: message.from } , function (err, result) {
            if (err) {
                console.log('Error fetching data')
                callback(err, null);
            }
            else if (result) {
                result.messages.filter((a)=>{
                    if(a.receiver == message.to){
                    // console.log(a.content)
                        conversation_result.push({id:message.from,content:a.content})
                    }
                    else if(a.sender == message.to){
                        // console.log(a.content)
                        conversation_result.push({id:message.to,content:a.content})
                    }
                })
                console.log("Conversation : ", JSON.stringify(conversation_result));
                callback(null, conversation_result);
            }
            })
    }
}

exports.handle_request = handle_request;