var mongoose = require('mongoose');

const add_course_schema= new mongoose.Schema({
    faculty_id : {
        type : Number,
    },
    course_id : {
        type : Number,
    },
    course_name: {
        type:String
    },

    course_department :{
        type : String,        
    },
    course_description : {
        type : String
    },
    course_room : {
        type : String
    },
    course_capacity : {
        type : Number
    },
    waitlist_capacity : {
        type : Number
    },
    course_term : {
        type : String
    },
    course_color : {
        type : String
    },
    number_enrolled : {
        type : Number
    },
    waitlist_status : {
        type : String
    },
    assignments : {
        type : Array
    },
    announcements : {
        type : Array
    },
    quizzes : {
        type : Array
    },
    grades : {
        type : Array
    },
    permission_numbers : {
        type : Array
    }
    
},{ strict: false })
var add_courses = mongoose.model('add_courses',add_course_schema);

//Users.createIndexes({username:1},{unique:true},)

module.exports = {add_courses};

