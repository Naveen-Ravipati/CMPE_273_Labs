var express = require('express');
var router = express.Router(); // capital R
var app = express();
const mongoClient = require('mongodb').MongoClient;

var {add_courses} = require('../models/add_courses')

router.post('/permission_numbers_store', function (req, res) {
    console.log("Inside Permission numbers storing backend");
    console.log(req.body)
    add_courses.findOneAndUpdate({course_id:Number(req.body.course_id)},{$push:{permission_numbers:req.body.permission_number_list}},{upsert:true}, function (err, result) {
        if (err){
            console.log('Error fetching data')
        }
        else{  
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        console.log("Permission number stored : ", JSON.stringify(result));
        res.end(); 
        }
    });
})

router.post('/permission_numbers_fetch', function (req, res) {
    console.log("Inside Permission numbers fetching backend");
    console.log(req.body)
    add_courses.find({course_id:Number(req.body.course_id)}, function (err, result) {
        if (err){
            console.log('Error fetching data')
        }
        else{  
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        console.log("Permission number fetched : ", JSON.stringify(result[0].permission_numbers[0]));
        res.end(JSON.stringify(result[0].permission_numbers[0])); 
        }
    });
})

router.post('/permission_number_delete', function (req, res) {
    console.log("Inside Permission number delete backend");
    console.log(req.body)
    var permission_number_deleted_array = []
    add_courses.find({course_id:Number(req.body.course_id)}, function (err, result1) {
    add_courses.findOneAndUpdate({course_id:Number(req.body.course_id)},{$unset:{permission_numbers:1}},{upsert:true}, function (err, result2) {
        if (err){
            res.writeHead(400, {
                'Content-Type': 'application/json'
            });
            console.log('Error fetching data')
            res.end()
        }
        else{
        // res.writeHead(200, {
        //     'Content-Type': 'application/json'
        // });
        let temp = 0
        for(let i=0 ; i<result1[0].permission_numbers[0].length ; i++){
            if(result1[0].permission_numbers[0][i] == req.body.permission_number_to_delete){
                temp = i
            }
        }
        console.log('temp:'+temp)
        result1[0].permission_numbers[0].splice(temp,1)
        permission_number_deleted_array = result1[0].permission_numbers[0]
        console.log('permission_number_deleted_array : '+permission_number_deleted_array)
        add_courses.findOneAndUpdate({course_id:Number(req.body.course_id)},{$push:{permission_numbers:permission_number_deleted_array}},{upsert:true}, function (err, result3) {
            if (err){
                res.writeHead(400, {
                    'Content-Type': 'application/json'
                });
                console.log('Error fetching data here')
                res.end()
            }
            else{
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                console.log("Permission number delete : ", JSON.stringify(result3));
                // console.log("Permission number delete length : ", JSON.stringify(result.length));
                res.end(); 
            }   
        })
    }
})
})
})

module.exports = router;