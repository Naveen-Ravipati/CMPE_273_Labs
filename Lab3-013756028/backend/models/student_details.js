var mongoose = require('mongoose');

const student_details_schema= new mongoose.Schema({
    student_id : {
        type : Number,
        required:true,
        unique:true
    },
    password : {
        type : String,
        required:true,
        unique:true
    },
    name: {
        type:String
    },

    email :{
        type : String,
        required:true,
        unique:true        
    },
    company : {
        type : String
    },
    school : {
        type : String
    },
    languages : {
        type : String
    },
    gender : {
        type : String
    },
    mobile : {
        type : Number
    },
    phone_number : {
        type : Number
    },
    city : {
        type : String
    },
    hometown : {
        type : String
    },
    country : {
        type : String
    },
    about_me : {
        type : String
    },
    courses_registered: {
        type:Array
    },
    messages:{
        type:Array
    }
},{ strict: false })
var student_details = mongoose.model('student_details',student_details_schema);

//Users.createIndexes({username:1},{unique:true},)

module.exports = {student_details};