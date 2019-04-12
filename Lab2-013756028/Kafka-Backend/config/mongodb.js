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

module.exports = {mongoose};