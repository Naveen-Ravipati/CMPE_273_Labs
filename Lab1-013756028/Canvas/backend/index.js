//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

  var Users = [{
      username : "admin",
      password : "admin"
  }]

  var books = [
    {"BookID" : "1", "Title" : "Book 1", "Author" : "Author 1"},
    {"BookID" : "2", "Title" : "Book 2", "Author" : "Author 2"},
    {"BookID" : "3", "Title" : "Book 3", "Author" : "Author 3"}
]

var courses = [
    {"course" : "CMPE-220 Sec 02 - System Software"},
    { "course" : "CMPE-273 Sec 01 - Ent Dist Systems"}
]

var mysql = require('mysql');
var con = mysql.createConnection({
    host:'localhost',
    user: 'admin',
    password:'admin',
    port:'3306',
    database:'canvas'
})
con.connect(function(err){
    if(err) throw err;
    console.log('connected');
})

//Route to handle Post Request Call
app.post('/login',function(req,res){
    console.log("Inside Login Post Request");
    //console.log("Req Body : ", username + "password : ",password);
    console.log("Req Body : ",req.body);
    if(req.body.student_or_faculty == 'student'){
    con.query("SELECT * FROM student_details", function (err, result) {
        if (err) throw err;

        result.filter(function(user){
            console.log(user)
            if(user.student_id === req.body.username && user.password === req.body.password){
                res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                req.session.user = user;
                res.writeHead(200,{
                'Content-Type' : 'text/plain'
                })
                res.end("Successful Login");
            }
    })
})}
    else{
        con.query("SELECT * FROM faculty_details", function (err, result) {
            if (err) throw err;
    
            result.filter(function(user){
                console.log(user)
                if(user.faculty_id === req.body.username && user.password === req.body.password){
                    res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                    req.session.user = user;
                    res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                    })
                    res.end("Successful Login");
                }
        })
    })
    }      
});

app.post('/new_user',function(req,res){
    
    console.log("Inside New user Post Request");
    console.log("Req Body : ",req.body);
    if(req.body.new_student_or_faculty == 'student'){
        con.query("INSERT INTO student_details (student_id, password, email) VALUES(?,?,?)",[req.body.new_studentid,req.body.new_password,req.body.new_email], function (err, result) {
        if (err) throw err;
                res.writeHead(200,{
                'Content-Type' : 'text/plain'
                })
                res.end("Successful signup");           
    })
    }
    else{
        con.query("INSERT INTO faculty_details (faculty_id, password, email) VALUES(?,?,?)",[req.body.new_studentid,req.body.new_password,req.body.new_email], function (err, result) {
            if (err) throw err;
  
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                    })
                    res.end("Successful signup");    
        })
    }    
});

app.post('/submit_quiz_question',function(req,res){   
    console.log("Inside Submit Quiz Question");
    console.log("Req Body : ",req.body);
        con.query("INSERT INTO quizzes (course_id, quiz_id, question_number,question,option_1,option_2,option_3,option_4,correct_answer) VALUES(?,?,?,?,?,?,?,?,?)",[req.body.course_id,req.body.quiz_id,req.body.question_number,req.body.question,req.body.option_1,req.body.option_2,req.body.option_3,req.body.option_4,req.body.correct_answer], function (err, result) {
        if (err) throw err;
            res.writeHead(200,{
            'Content-Type' : 'text/plain'
            })
            res.end("Successfully Updated");           
    })   
});

app.post('/submit_announce',function(req,res){   
    console.log("Inside Submit Announcement");
    console.log("Req Body : ",req.body);
        con.query("INSERT INTO announcements (course_id, Date, Announce) VALUES(?,?,?)",[req.body.course_id,req.body.date,req.body.announce], function (err, result) {
        if (err) throw err;
            res.writeHead(200,{
            'Content-Type' : 'text/plain'
            })
            res.end("Successfully Updated");           
    })   
});

app.post('/courses', function(req,res){
    var new_Result = []
    console.log("Inside courses");
    if(req.body.student_or_faculty == 'student'){
        con.query("SELECT * FROM courses LEFT OUTER JOIN courses_registered ON courses.course_id = courses_registered.course_Id",
                                 function (err, result) {
        if (err) throw err;
        
        new_Result = result.filter((course)=>{
            return course.student_id ==req.body.student_id;
            });
        console.log(new_Result);
         res.writeHead(200,{
            'Content-Type' : 'application/json'
        });
        console.log("Courses : ",JSON.stringify(new_Result));
        res.end(JSON.stringify(new_Result));
        }); 
    }
    else{
        con.query("SELECT * FROM courses WHERE faculty_id  = "+mysql.escape(req.body.faculty_id),
                                 function (err, result) {
        
        if (err) throw err;
        console.log(result);
         res.writeHead(200,{
            'Content-Type' : 'application/json'
        }); 
        console.log("Courses : ",JSON.stringify(result));
        res.end(JSON.stringify(result));

        });
    }  
})

app.post('/announcements', function(req,res){
    console.log("Inside announcements"); 
    con.query("SELECT * FROM announcements", function (err, result) {
        if (err) throw err;
        console.log(result);
         res.writeHead(200,{
            'Content-Type' : 'application/json'
        });
        console.log("Announcements : ",JSON.stringify(result));
        res.end(JSON.stringify(result));
        });     
})

app.post('/people', function(req,res){
    console.log("Inside People"); 
    con.query("SELECT * FROM student_details LEFT OUTER JOIN courses_registered ON student_details.student_id = courses_registered.student_id",
                                 function (err, result) {
        if (err) throw err;
        console.log(result);
         res.writeHead(200,{
            'Content-Type' : 'application/json'
        });
        console.log("People : ",JSON.stringify(result));
        res.end(JSON.stringify(result));
        });     
})

app.post('/profile_update', function(req,res){
    console.log("Inside Profile_update"); 

    console.log('abc'+req.body.email)
    console.log('SID'+req.body.student_id)
    console.log(req.body.name)
    if(req.body.student_or_faculty == 'student')
    {   
        let qury = "UPDATE student_details SET name = "+ mysql.escape(req.body.name)+"," +"email = "+mysql.escape(req.body.email) +"," +"company = "+mysql.escape(req.body.company) +"," +"school = "+mysql.escape(req.body.school)+"," +"languages = "+mysql.escape(req.body.languages)+"," +"gender = "+mysql.escape(req.body.gender)+"," +"mobile = "+mysql.escape(req.body.mobile_number)+"," +"phone_number = "+mysql.escape(req.body.phone_number)+"," +"city = "+mysql.escape(req.body.city)+"," +"hometown = "+mysql.escape(req.body.hometown)+"," +"country = "+mysql.escape(req.body.country)+"," +"about_me = "+mysql.escape(req.body.about_me)+" WHERE student_id = "+mysql.escape(req.body.student_id)+";"
        console.log(qury)
        con.query(qury, function (err, result){ 
        if (err) throw err;
        // console.log(result);
         res.writeHead(200,{
            'Content-Type' : 'application/json'
        });
        res.end('update completed');
        }); 
    }
    else
    {   
        let qury = "UPDATE faculty_details SET name = "+ mysql.escape(req.body.name)+"," +"email = "+mysql.escape(req.body.email) +"," +"company = "+mysql.escape(req.body.company) +"," +"school = "+mysql.escape(req.body.school)+"," +"languages = "+mysql.escape(req.body.languages)+"," +"gender = "+mysql.escape(req.body.gender)+"," +"mobile = "+mysql.escape(req.body.mobile_number)+"," +"phone_number = "+mysql.escape(req.body.phone_number)+"," +"city = "+mysql.escape(req.body.city)+"," +"hometown = "+mysql.escape(req.body.hometown)+"," +"country = "+mysql.escape(req.body.country)+"," +"about_me = "+mysql.escape(req.body.about_me)+" WHERE faculty_id = "+mysql.escape(req.body.faculty_id)+";"
        console.log(qury)
        con.query(qury, function (err, result){ 
        if (err) throw err;
        // console.log(result);
         res.writeHead(200,{
            'Content-Type' : 'application/json'
        });
        res.end('update completed');
        });
    }    
})


app.post('/edit_profile', function(req,res){
    console.log("Inside edit Profile"); 

    if(req.body.student_or_faculty == 'student')
    {   
        con.query("SELECT * FROM student_details WHERE student_id = "+mysql.escape(req.body.student_id), function (err, result) {
        if (err) throw err;
        // console.log(result);
         res.writeHead(200,{
            'Content-Type' : 'application/json'
        });
        console.log("Edit Profile : ",JSON.stringify(result));
        res.end(JSON.stringify(result));
        }); 
    
    }
    else
    {   
        con.query("SELECT * FROM faculty_details WHERE faculty_id = "+mysql.escape(req.body.faculty_id), function (err, result) {
        if (err) throw err;
        // console.log(result);
         res.writeHead(200,{
            'Content-Type' : 'application/json'
        });
        console.log("Edit Profile : ",JSON.stringify(result));
        res.end(JSON.stringify(result));
        }); 
    }    
})

app.post('/quizzes', function(req,res){
    console.log("Inside Quizzes"); 
    con.query("SELECT * FROM quizzes WHERE course_id = "+mysql.escape(req.body.course_id), function (err, result) {
        if (err) throw err;
        console.log(result);
         res.writeHead(200,{
            'Content-Type' : 'application/json'
        });
        console.log("Quizzes : ",JSON.stringify(result));
        res.end(JSON.stringify(result));
        });     
})

app.post('/grades', function(req,res){
    console.log("Inside Grades"); 
    if(req.body.student_or_faculty == 'student'){
        con.query("SELECT * FROM grades WHERE student_id = "+mysql.escape(req.body.student_id)+" AND course_id = "+mysql.escape(req.body.course_id), function (err, result) {
        if (err) throw err;
        console.log(result);
         res.writeHead(200,{
            'Content-Type' : 'application/json'
        });
        console.log("Quizzes : ",JSON.stringify(result));
        res.end(JSON.stringify(result));
        });   
    } 
    else if(req.body.student_or_faculty == 'faculty'){ 
        con.query("SELECT * FROM grades WHERE course_id = "+mysql.escape(req.body.course_id), function (err, result) {
        if (err) throw err;
        console.log(result);
        res.writeHead(200,{
            'Content-Type' : 'application/json'
        });
        console.log("Quizzes : ",JSON.stringify(result));
        res.end(JSON.stringify(result));
        }); 
    }
})

app.post('/quiz_questions', function(req,res){
    console.log("Inside Quiz Questions"); 
    con.query("SELECT * FROM quizzes WHERE course_id = "+mysql.escape(req.body.course_id)+"and quiz_id = "+mysql.escape(req.body.quiz_id), function (err, result) {
        if (err) throw err;
        console.log(result);
         res.writeHead(200,{
            'Content-Type' : 'application/json'
        });
        console.log("Quiz questions : ",JSON.stringify(result));
        res.end(JSON.stringify(result));
        });     
})

app.post('/quiz_submit', async function(req,res){
    let score = 0
    console.log("Inside Quiz submit"); 
    console.log('Submitted '+JSON.stringify(req.body))
    request = req.body.quiz_responses
    await con.query("SELECT question_number,correct_answer FROM quizzes WHERE course_id = "+mysql.escape(req.body.course_id)+"and quiz_id = "+mysql.escape(req.body.quiz_id), function (err, result) {
        if (err) throw err;
        console.log("here1",request)
        console.log('here2'+JSON.stringify(result))
        result.filter(function(quiz_answers){
            request.filter(function(student){
                if(quiz_answers.question_number == student.question_number && quiz_answers.correct_answer == student.response){
                    score+=1
                }
            })
        })
        con.query("INSERT INTO grades (student_id, course_id, marks, assignment_id) VALUES(?,?,?,?)",[req.body.student_id,req.body.course_id,score,req.body.quiz_id], function (err, result) {
        })
        console.log(score)

         res.writeHead(200,{
            'Content-Type' : 'application/json'
        });
        res.send(score);
        }); 
})

app.post('/search', function(req, res){
    console.log('Inside Search: ', req.body);
    console.log(req.body.course_name)
    var searched_Result = []
    var searchResult = []
    var final_Result = []
    var new_Result = []


    con.query("SELECT * FROM courses LEFT OUTER JOIN courses_registered ON courses.course_id = courses_registered.course_Id AND courses_registered.student_id ="+mysql.escape(req.body.student_id),
                                 function (err, result) {

        if (err) throw err;
        // new_Result = result.filter((course)=>{
        //     return course.student_id ==req.body.student_id;
        //     });
        if(req.body.course_term!=''){
            searchResult = result.filter((course)=>{
            return course.course_term.indexOf(req.body.course_term) > -1;
            });
            if(searchResult.course_name!=''){
                searched_Result = searchResult.filter((course)=>{
                return course.course_name.indexOf(req.body.course_name) > -1;
                    });
            }
        }

    if(req.body.course_id){

        if(req.body.search_condition == 'greater')
        {
            final_Result = searched_Result.filter((course)=>{
                return course.course_id > req.body.course_id;
                    }); 
        }

        else if(req.body.search_condition == 'exactly')
        {
            final_Result = searched_Result.filter((course)=>{
                return course.course_id == req.body.course_id;
                    }); 

        }
        else if(req.body.search_condition == 'lesser')
        {
            console.log('here1')
            final_Result = searched_Result.filter((course)=>{
                return course.course_id < req.body.course_id;
                    }); 
        }
    }
    else{
        final_Result = searched_Result
    }
     
        res.writeHead(200,{
            'Content-Type' : 'application/json'
            });
             console.log("Final result : ",JSON.stringify(final_Result));
             res.end(JSON.stringify(final_Result));

});
})

app.post('/course_register', function(req,res){
    console.log("Inside Course Register"); 
    console.log(req.body.student_id)
    console.log(req.body.register_drop)
    console.log(req.body.course_id_register_drop)


    if(req.body.register_drop == 'Register'){
        con.query("INSERT INTO courses_registered (course_Id, student_id, registration_status) VALUES(?,?,?)",[req.body.course_id_register_drop,req.body.student_id,'registered'], function (err, result) {
            con.query("UPDATE courses SET number_enrolled = number_enrolled + 1 WHERE courses.course_id = "+req.body.course_id_register_drop, function (err, result){ 
            if (err) throw err;
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            });
            console.log("Course Register : ",JSON.stringify(result));
            res.end(JSON.stringify(result));
            })
        })
    }
    else{
        con.query("DELETE FROM courses_registered WHERE courses_registered.course_Id = " +req.body.course_id_register_drop+ " AND courses_registered.student_id ="+mysql.escape(req.body.student_id), function (err, result){    
            con.query("UPDATE courses SET number_enrolled = number_enrolled - 1 WHERE courses.course_id = "+req.body.course_id_register_drop, function (err, result){   
            if (err) throw err;
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            });
            console.log("Course Register : ",JSON.stringify(result));
            res.end(JSON.stringify(result));
            })
        })   
    }
})




//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");

