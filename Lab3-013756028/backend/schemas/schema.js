const graphql = require('graphql');
const _ = require('lodash');
var { student_details } = require('../models/student_details')
var { faculty_details } = require('../models/faculty_details')
var { add_courses } = require('../models/add_courses')
var bcrypt = require('bcryptjs');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} = graphql;

const PropertyType = new GraphQLObjectType({
    name: 'property',
    fields: () => ({
        country: { type: GraphQLString },
        street: { type: GraphQLString },
        building: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        zipcode: { type: GraphQLString },
        headline: { type: GraphQLString },
        description: { type: GraphQLString },
        type: { type: GraphQLString },
        bedrooms: { type: GraphQLInt },
        accomodates: { type: GraphQLInt },
        bathrooms: { type: GraphQLInt },
        bookingoptions: { type: GraphQLInt },
        photos: { type: GraphQLString },
        startdate: { type: GraphQLString },
        enddate: { type: GraphQLString },
        currency: { type: GraphQLString },
        rent: { type: GraphQLInt },
        tax: { type: GraphQLInt },
        cleaningfee: { type: GraphQLInt },
        ownername: { type: GraphQLString },
        bookedUser: { type: GraphQLString },
        status: { type: GraphQLInt }
    })
})

const courses_registered = new GraphQLObjectType({
    name: 'courses_registered',
    fields: ()=>({
        course_id : {type: GraphQLInt}
    })
})

const messages = new GraphQLObjectType({
    name: 'messages',
    fields: ()=>({
        content : {type: GraphQLString},
        receiver : {type: GraphQLString},
        sender  : {type: GraphQLString},
    })
})

const signup_data = new GraphQLObjectType({
    name: 'signup_data',
    fields: ()=>({
        email : {type: GraphQLString},
        password : {type: GraphQLString},
        student_id  : {type: GraphQLString},
    })
})


const student_ProfileType = new GraphQLObjectType({
    name: 'student_ProfileType',
    fields: () => ({
        student_id: { type: GraphQLInt },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        about_me: { type: GraphQLString },
        city: { type: GraphQLString },
        country: { type: GraphQLString },
        gender: { type: GraphQLString },
        hometown: { type: GraphQLString },
        languages: { type: GraphQLString },
        mobile: { type: GraphQLString },
        name: { type: GraphQLString },
        phone_number: { type: GraphQLString },
        school: { type: GraphQLString },
        courses_registered: { type: new GraphQLList(courses_registered) },
        messages : { type : new GraphQLList(messages) }

    })
})


const faculty_ProfileType = new GraphQLObjectType({
    name: 'faculty_ProfileType',
    fields: () => ({
        faculty_id: { type: GraphQLInt },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        about_me: { type: GraphQLString },
        city: { type: GraphQLString },
        country: { type: GraphQLString },
        gender: { type: GraphQLString },
        hometown: { type: GraphQLString },
        languages: { type: GraphQLString },
        mobile: { type: GraphQLString },
        name: { type: GraphQLString },
        phone_number: { type: GraphQLString },
        school: { type: GraphQLString },
        messages : { type : new GraphQLList(messages) }

    })
})


const profile_details = new GraphQLObjectType({
    name: 'profile_details',
    fields: () => ({
        email: { type: GraphQLString },
        about_me: { type: GraphQLString },
        city: { type: GraphQLString },
        country: { type: GraphQLString },
        gender: { type: GraphQLString },
        hometown: { type: GraphQLString },
        languages: { type: GraphQLString },
        mobile: { type: GraphQLString },
        name: { type: GraphQLString },
        phone_number: { type: GraphQLString },
        school: { type: GraphQLString },
    })
})

const course_details = new GraphQLObjectType({
    name: 'course_details',
    fields: () => ({
        faculty_id: { type: GraphQLInt },
        course_id: { type: GraphQLString },
        course_name: { type: GraphQLString },
        course_department: { type: GraphQLString },
        course_description: { type: GraphQLString },
        course_room: { type: GraphQLString },
        course_capacity: { type: GraphQLInt },
        course_color: { type: GraphQLString },
    })
})

const TravelerType = new GraphQLObjectType({
    name: 'Traveler',
    fields: () => ({
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        status: { type: GraphQLInt }
    })
})

const OwnerType = new GraphQLObjectType({
    name: 'Owner',
    fields: () => ({
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        status: { type: GraphQLInt }
    })
})

const signup_type = new GraphQLObjectType({
    name: 'signup_type',
    fields: () => ({
        // student_id: { type: GraphQLString },
        // email: { type: GraphQLString},
        // password: { type: GraphQLString },
        status: { type: GraphQLInt},
        signup_data: { type: signup_data }
    })
})


const student_type = new GraphQLObjectType({
    name: 'student_type',
    fields: () => ({
        // student_id: { type: GraphQLString },
        // email: { type: GraphQLString},
        // password: { type: GraphQLString },
        result: { type: GraphQLBoolean },
        status: { type: GraphQLInt},
        userData: { type: student_ProfileType }
    })
})

const faculty_type = new GraphQLObjectType({
    name: 'faculty_type',
    fields: () => ({
        // student_id: { type: GraphQLString },
        // email: { type: GraphQLString},
        // password: { type: GraphQLString },
        result: { type: GraphQLBoolean },
        status: { type: GraphQLInt},
        userData: { type: faculty_ProfileType }
    })
})

const course = new GraphQLObjectType({
    name: 'course',
    fields: () => ({
        // student_id: { type: GraphQLString },
        // email: { type: GraphQLString},
        // password: { type: GraphQLString },
        status: { type: GraphQLInt},
        course_data: { type: new GraphQLList(course_details) }
    })
})

const edit_profile = new GraphQLObjectType({
    name: 'edit_profile',
    fields: () => ({
        // student_id: { type: GraphQLString },
        // email: { type: GraphQLString},
        // password: { type: GraphQLString },
        status: { type: GraphQLInt},
        user_data: { type: profile_details }
    })
})

var login_result;
var dashboard_result
var edit_profile_result
const Query = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        student_login: {
            type: student_type,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            async resolve(parent, args) {
                console.log(args);
                await student_details.findOne({ student_id: args.username }, function (err, res) {
                    // console.log(res)
                    if (bcrypt.compareSync(args.password, res.password)) {
                        // res.status = 200;
                        login_result = {
                            result: true,
                            status:200,
                            userData: res
                        }
                        console.log('login result ',login_result)
                    } else {
                        login_result = {
                        result: false,
                        status:400,
                        }
                    }
                })
                return login_result;
                
            }
        },
        faculty_login: {
            type: faculty_type,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            async resolve(parent, args) {
                console.log(args);
                await faculty_details.findOne({ faculty_id: args.username }, function (err, res) {
                    // console.log(res)
                    if (bcrypt.compareSync(args.password, res.password)) {
                        // res.status = 200;
                        login_result = {
                            result: true,
                            status:200,
                            userData: res
                        }
                        console.log('login result ',login_result)
                    } else {
                        login_result = {
                        result: false,
                        status:400,
                        }
                    }
                })
                return login_result;
                
            }
        },
        dashboard: {
            type: course,
            args: {
                login_id: { type: GraphQLString },
                student_or_faculty: { type: GraphQLString },
            },
             resolve(parent, args) {
                return new Promise((resolve,reject) =>{
                console.log(args);
                if(args.student_or_faculty == 'student'){
                 student_details.findOne({ student_id: args.login_id }, function (err, result) {
                    add_courses.find({}, function (err, all_courses) {
                        var new_Result = []
                        result.courses_registered.filter((course) => {
                            all_courses.filter((course_list) => {
                                // console.log(course_list)
                                if (course_list.course_id == course.course_id) {
                                    new_Result.push(course_list)
                                }
                            })
                        })
                        if (err) {
                            console.log('Error fetching data from database for dashboard courses')
                            dashboard_result = {
                                status:400
                            }
                        }
                        else {
                            console.log('Courses',new_Result);
                            dashboard_result = {
                                status: 200,
                                course_data: new_Result
                            }
                        }
                    })
                })
                resolve(dashboard_result);
            }
            else{
                    add_courses.find({faculty_id:args.login_id}, function (err, result) {
                        if (err) {
                            console.log('Error fetching data from database for dashboard courses')
                            dashboard_result = {
                                status:400
                            }
                        }
                        else {
                            dashboard_result = {
                                status: 200,
                                course_data: result
                            }
                        }
                    })
                
                resolve(dashboard_result);
            }
            })      
            }
        
        },
        edit_profile: {
            type: edit_profile,
            args: {
                login_id: { type: GraphQLString },
                student_or_faculty: { type: GraphQLString },
            },
            resolve(parent, args) {
                return new Promise((resolve,reject) =>{
                console.log(args);
                if(args.student_or_faculty == 'student'){
                student_details.findOne({ student_id: args.login_id }, function (err, result) {
                    if(err){
                        edit_profile_result = {
                            status:400,
                        }
                    }
                    else{
                        edit_profile_result = {
                            status:200,
                            user_data: result
                        }

                    }
                })
                resolve(edit_profile_result);
            }
            else{
                faculty_details.findOne({ faculty_id: args.login_id }, function (err, result) {
                    if(err){
                        edit_profile_result = {
                            status:400,
                        }
                    }
                    else{
                        edit_profile_result = {
                            status:200,
                            user_data: result
                        }

                    }
                })
                resolve(edit_profile_result);
            }

        })   
            }
        },
    }
})

var signup_result;

const Mutation = new GraphQLObjectType({
    name: 'Mutation', //used in exports
    fields: {
        signup: {
            type: signup_type,
            args: {
                new_email: { type: GraphQLString },
                new_student_id: { type: GraphQLString },
                new_password: { type: GraphQLString },
                new_student_or_faculty: { type: GraphQLString }
            },
            async resolve(parent, args) {
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(args.new_password, salt);
                let new_student = new student_details({
                    email: args.new_email,
                    student_id: args.new_student_id,
                    password: hash
                })
                await new_student.save().then((res)=> {
                    if (res) {
                        signup_result = {
                            status:200,
                            signup_data:res
                        }
                    }
                    else {
                        signup_result = {
                            status:400
                        }
                    }
                })
                return signup_result;

            }
        },
    }
})

module.exports = new GraphQLSchema({
    //query and mutation are predefined, must be used as it is (as per my observation)//
    query: Query,
    mutation: Mutation,
});