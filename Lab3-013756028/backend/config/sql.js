var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    port: '3306',
    database: 'canvas'
})
con.connect(function (err) {
    if (err){
        console.log('Error connecting to sql database')
    }
    else{
    console.log('connected');
    }
})

module.exports = {mysql,con};