var express = require('express');
var router = express.Router(); // capital R
var app = express();
const mongoClient = require('mongodb').MongoClient;
var bcrypt = require('bcryptjs');
var mysql = require('../config/sql').mysql
var con = require('../config/sql').con
var { student_details } = require('../models/student_details')
var { faculty_details } = require('../models/faculty_details')

router.post('/students_list', function (req, res) {
    console.log("Inside students_list message backend");
    console.log(req.body)
    var new_result = []
    if (req.body.student_or_faculty == 'student') {
        student_details.find({}, function (err, result) {
            if (err) {
                console.log('Error fetching data')
            }
            else if (result) {
                result.filter((a) => {
                    if (a.student_id != req.body.id) {
                        new_result.push({ student_id: a.student_id, name: a.name })
                    }
                })
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                console.log("Message_to : ", JSON.stringify(new_result));
                res.end(JSON.stringify(new_result));
            }
        });
    }
    else {
        student_details.find({}, function (err, result) {
            if (err) {
                console.log('Error fetching data')
            }
            else if (result) {
                result.filter((a) => {
                    new_result.push({ student_id: a.student_id, name: a.name })
                })
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                console.log("Message_to : ", JSON.stringify(new_result));
                res.end(JSON.stringify(new_result));
            }
        });
    }
})


router.post('/faculty_list', function (req, res) {
    console.log("Inside faculty list message backend");
    console.log(req.body)
    var new_result = []
    if (req.body.student_or_faculty == 'student') {
        faculty_details.find({}, function (err, result) {
            if (err) {
                console.log('Error fetching data')
            }
            else if (result) {
                result.filter((a) => {
                    new_result.push({ faculty_id: a.faculty_id, name: a.name })
                })
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                console.log("Message_to : ", JSON.stringify(new_result));
                res.end(JSON.stringify(new_result));
            }
        });
    }
    else {
        faculty_details.find({}, function (err, result) {
            if (err) {
                console.log('Error fetching data')
            }
            else if (result) {
                result.filter((a) => {
                    if (a.faculty_id != req.body.id) {
                        new_result.push({ faculty_id: a.faculty_id, name: a.name })
                    }
                })
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                console.log("Message_to : ", JSON.stringify(new_result));
                res.end(JSON.stringify(new_result));
            }
        });
    }
})

router.post('/students_list', function (req, res) {
    console.log("Inside message_to backend");
    console.log(req.body)
    var new_result = []
    if (req.body.student_or_faculty == 'student') {
        student_details.find({}, function (err, result) {
            if (err) {
                console.log('Error fetching data')
            }
            else if (result) {
                result.filter((a) => {
                    if (a.student_id != req.body.id) {
                        new_result.push({ student_id: a.student_id, name: a.name })
                    }
                })
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                console.log("Message_to : ", JSON.stringify(new_result));
                res.end(JSON.stringify(new_result));
            }
        });
    }
    else {
        student_details.find({}, function (err, result) {
            if (err) {
                console.log('Error fetching data')
            }
            else if (result) {
                result.filter((a) => {
                    new_result.push({ student_id: a.student_id, name: a.name })
                })
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                console.log("Message_to : ", JSON.stringify(new_result));
                res.end(JSON.stringify(new_result));
            }
        });
    }
})


router.post('/conversation', function (req, res) {
    console.log("Inside conversation backend");
    console.log(req.body)
    let conversation_result = []
    if (req.body.from_student_or_faculty == 'student') {
        student_details.findOne({ student_id: req.body.from } , function (err, result) {
            if (err) {
                console.log('Error fetching data')
            }
            else if (result) {
                result.messages.filter((a)=>{
                    if(a.receiver == req.body.to){
                    // console.log(a.content)
                        conversation_result.push({id:req.body.from,content:a.content})
                    }
                    else if(a.sender == req.body.to){
                        // console.log(a.content)
                            conversation_result.push({id:req.body.to,content:a.content})
                        }
                })
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                console.log("Conversation : ", JSON.stringify(conversation_result));
                res.end(JSON.stringify(conversation_result));
            }
            })
    }
    else if(req.body.from_student_or_faculty == 'faculty'){
        faculty_details.findOne({ faculty_id: req.body.from } , function (err, result) {
            if (err) {
                console.log('Error fetching data')
            }
            else if (result) {
                result.messages.filter((a)=>{
                    if(a.receiver == req.body.to){
                    // console.log(a.content)
                        conversation_result.push({id:req.body.from,content:a.content})
                    }
                    else if(a.sender == req.body.to){
                        // console.log(a.content)
                            conversation_result.push({id:req.body.to,content:a.content})
                        }
                })
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                console.log("Conversation : ", JSON.stringify(conversation_result));
                res.end(JSON.stringify(conversation_result));
            }
            })
    }
})

router.post('/send_message', function (req, res) {
    console.log("Inside Send Message backend");
    console.log(req.body)
    if (req.body.from_student_or_faculty == 'student' && req.body.to_student_or_faculty == 'student') {
        student_details.findOneAndUpdate({ student_id: req.body.from }, { $push: { messages: { sender: req.body.from, receiver: req.body.to, content: req.body.message_content } } }, { upsert: true }, function (err, result) {
            student_details.findOneAndUpdate({ student_id: req.body.to }, { $push: { messages: { sender: req.body.from, receiver: req.body.to, content: req.body.message_content } } }, { upsert: true }, function (err, result1) {
            if (err) {
                console.log('Error fetching data')
            }
            else if (result) {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                // console.log("Send Message : ", JSON.stringify(result));
                res.end('Message Pushed');
            }
            })
        });
    }
    else if (req.body.from_student_or_faculty == 'student' && req.body.to_student_or_faculty == 'faculty') {
        student_details.findOneAndUpdate({ student_id: req.body.from }, { $push: { messages: { sender: req.body.from, receiver: req.body.to, content: req.body.message_content } } }, { upsert: true }, function (err, result) {
            faculty_details.findOneAndUpdate({ faculty_id: req.body.to }, { $push: { messages: { sender: req.body.from, receiver: req.body.to, content: req.body.message_content } } }, { upsert: true }, function (err, result1) {
            if (err) {
                console.log('Error fetching data')
            }
            else if (result) {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                // console.log("Send Message : ", JSON.stringify(result));
                res.end('Message Pushed');
            }
        });
    })
    }
    else if (req.body.from_student_or_faculty == 'faculty' && req.body.to_student_or_faculty == 'faculty') {
        faculty_details.findOneAndUpdate({ faculty_id: req.body.from }, { $push: { messages: { sender: req.body.from, receiver: req.body.to, content: req.body.message_content } } }, { upsert: true }, function (err, result) {
            faculty_details.findOneAndUpdate({ faculty_id: req.body.to }, { $push: { messages: { sender: req.body.from, receiver: req.body.to, content: req.body.message_content } } }, { upsert: true }, function (err, result1) {
            if (err) {
                console.log('Error fetching data')
            }
            else if (result) {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                // console.log("Send Message : ", JSON.stringify(result));
                res.end('Message Pushed');
            }
        });
    })
    }
    else if (req.body.from_student_or_faculty == 'faculty' && req.body.to_student_or_faculty == 'student') {
        faculty_details.findOneAndUpdate({ faculty_id: req.body.from }, { $push: { messages: { sender: req.body.from, receiver: req.body.to, content: req.body.message_content } } }, { upsert: true }, function (err, result) {
            student_details.findOneAndUpdate({ student_id: req.body.to }, { $push: { messages: { sender: req.body.from, receiver: req.body.to, content: req.body.message_content } } }, { upsert: true }, function (err, result1) {
            if (err) {
                console.log('Error fetching data')
            }
            else if (result) {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                // console.log("Send Message : ", JSON.stringify(result));
                res.end('Message Pushed');
            }
        });
    })
    }
    
})

module.exports = router;