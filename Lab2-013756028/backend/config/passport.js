'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var {student_details} = require('../models/student_details')
var {faculty_details} = require('../models/faculty_details')

const secret = "secret";

// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret
    };
    passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {

        if (jwt_payload.student_or_faculty == 'student') {
        student_details.findOne({ 
            student_id: jwt_payload.username 
        }, (err, res) => {

                if (res) {
                    var user = res;
                    callback(null, user);
                }
                else {
                    callback(err, false);
                }
            });
        }
        else{
            faculty_details.findOne({ 
                faculty_id: jwt_payload.username 
            }, (err, res) => {
    
                    if (res) {
                        var user = res;
                        callback(null, user);
                    }
                    else {
                        callback(err, false);
                    }
                });  
        }
    
    }));
};
