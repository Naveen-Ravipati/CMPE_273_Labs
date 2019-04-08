var mongoose = require('mongoose');

const faculty_details_schema= new mongoose.Schema({
    faculty_id : {
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
    
})
var faculty_details = mongoose.model('faculty_details',faculty_details_schema);

//Users.createIndexes({username:1},{unique:true},)

module.exports = {faculty_details};