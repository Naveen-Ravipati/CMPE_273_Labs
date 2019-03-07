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
    
    // Object.keys(req.body).forEach(function(key){
    //     req.body = JSON.parse(key);
    // });
    // var username = req.body.username;
    // var password = req.body.password;
    console.log("Inside Login Post Request");
    //console.log("Req Body : ", username + "password : ",password);
    console.log("Req Body : ",req.body);
    Users.filter(function(user){
        if(user.username === req.body.username && user.password === req.body.password){
            res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = user;
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end("Successful Login");
        }
    })

    
});

//Route to get All Books when user visits the Home Page
// app.post('/courses', function(req,res){
//     console.log("Inside courses");    
//     res.writeHead(200,{
//         'Content-Type' : 'application/json'
//     });
//     console.log("Courses : ",JSON.stringify(courses));
//     res.end(JSON.stringify(courses));
    
// })

app.post('/courses', function(req,res){
    console.log("Inside courses"); 
    con.query("SELECT * FROM courses", function (err, result) {
        if (err) throw err;
        console.log(result);
         res.writeHead(200,{
            'Content-Type' : 'application/json'
        });
        console.log("Courses : ",JSON.stringify(result));
        res.end(JSON.stringify(result));
        });     
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

app.post('/search', function(req, res){
    console.log('Inside Search: ', req.body);
    console.log(req.body.course_name)
    var searched_Result = []
    var searchResult = []
    var final_Result = []

    con.query("SELECT * FROM courses", function (err, result) {
        if (err) throw err;
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

//Route to get All Books when user visits the Home Page
app.get('/home', function(req,res){
    console.log("Inside Home Login");    
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log("Books : ",JSON.stringify(books));
    res.end(JSON.stringify(books));
    
})
app.post('/create', function(req,res){
    console.log("Inside create");
    let new_entry = {"BookID" : req.body.BookID, "Title" : req.body.Title, "Author" : req.body.Author}
    books.push(new_entry)  
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log("Books : ",JSON.stringify(books));
    res.end(JSON.stringify(books));
    
})

app.post('/delete', function(req,res){
    console.log("Inside delete");
    for(let i = 0; i<books.length; i++){
        if(books[i].BookID == req.body.BookID){
            books.splice(i,1)
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            });
            console.log("Books : ",JSON.stringify(books));
            res.end(JSON.stringify(books));
        }
    }
    
    // res.writeHead(400,{
    //     'Content-Type' : 'application/json'
    // });
    // console.log("Books : ",JSON.stringify(books));
    res.end("No book");
    
})

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");

