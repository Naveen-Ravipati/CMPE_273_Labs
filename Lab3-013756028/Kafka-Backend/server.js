var connection = require('./kafka/Connection');

var mongoose = require('mongoose');
//var configLink=require('./../config');
mongoose.Promise = global.Promise;

// mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://admin:admin@cmpe273-lab2-shard-00-00-bmdyb.mongodb.net:27017,cmpe273-lab2-shard-00-01-bmdyb.mongodb.net:27017,cmpe273-lab2-shard-00-02-bmdyb.mongodb.net:27017/canvas?ssl=true&replicaSet=cmpe273-lab2-shard-0&authSource=admin",{useMongoClient: true});
// mongoose.set('useCreateIndex', true);
var mdb=mongoose.connection;

mdb.on('error',console.error.bind(console,'Connection error'))
mdb.on('open',()=>{
    console.log('MongoDB connected!')
})


var Login = require('./services/login');
var Dashboard_courses = require('./services/dashboard_courses');
var Edit_profile = require('./services/edit_profile');
var Profile_update = require('./services/profile_update');
var Course_register = require('./services/course_register');
var Search = require('./services/search');
var Add_course = require('./services/add_course');
var Submit_announce = require('./services/submit_announce');
var Announcements = require('./services/announcements');
var Grades = require('./services/grades');
var Students_list = require('./services/students_list');
var Faculty_list = require('./services/faculty_list');
var Conversation = require('./services/conversation');
var Send_message = require('./services/send_message');
var Get_assignment = require('./services/get_assignment');
var Get_assignment_detail = require('./services/get_assignment_detail');


function handleTopicRequest(topic_name, function_name){

    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();

    console.log('server is running');
    consumer.on('message', function(message){
        console.log('message recieved for ' + topic_name + " " + function_name);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        function_name.handle_request(data.data, function(err, res){
            console.log('After request handling: ', res);
            var payload = [{
                topic: data.replyTo,
                messages: JSON.stringify({
                    correlationId : data.correlationId,
                    data : res
                }),
                partition: 0
            }];

            producer.send(payload, function(err, data){
                console.log('Data: ', data);
            });
            return;

        });
    });
}

handleTopicRequest("login", Login);
handleTopicRequest("dashboard_courses", Dashboard_courses);
handleTopicRequest("edit_profile", Edit_profile);
handleTopicRequest("profile_update", Profile_update);
handleTopicRequest("course_register", Course_register);
handleTopicRequest("search", Search);
handleTopicRequest("add_course", Add_course);
handleTopicRequest("submit_announce", Submit_announce);
handleTopicRequest("announcements", Announcements);
handleTopicRequest("grades", Grades);
handleTopicRequest("students_list", Students_list);
handleTopicRequest("faculty_list", Faculty_list);
handleTopicRequest("conversation", Conversation);
handleTopicRequest("send_message", Send_message);
handleTopicRequest("get_assignment", Get_assignment);
handleTopicRequest("get_assignment_detail", Get_assignment_detail);
