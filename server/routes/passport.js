var LocalStrategy = require('passport-local').Strategy;
var sqlcon = require('../routes/mysql');
var kafka = require('./kafka/client');


module.exports = function (passport) {
    passport.serializeUser(function (user, cb) {
        console.log('user:' + user.email);
        cb(null, user);
    });

// used to deserialize the user
    passport.deserializeUser(function (email, done) {
        // User.findOne({'email': email}, function (err, user) {
        //     console.log('deserialize', user);
            done(null , email);
        // });
    });

    passport.use('user',new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        }, function (username, password, done) {
            console.log(username);
            console.log(password);
            kafka.make_request('signin', {"email": username, "password": password}, function (err, results) {
                console.log('in result');
                console.log(results);
                if (err) {
                    done(err, {});
                }
                console.log("results status", results.code);
                if (results.code === 401) {
                    console.log("hello strategy");
                    done(null, false, {message: results.message});
                }
                else {
                    console.log("I dont know");
                    done(null, results);
                }
            });


        }
    ));

    passport.use('moviehall',new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        }, function (username, password, done) {
            console.log(username);
            console.log(password);
            kafka.make_request('moviehallsignin', {"email": username, "password": password}, function (err, results) {
                console.log('in result');
                console.log(results);
                if (err) {
                    done(err, {});
                }
                console.log("results status", results.code);
                if (results.code === 401) {
                    console.log("hello strategy");
                    done(null, false, {message: results.message});
                }
                else {
                    console.log("I dont know");
                    done(null, results);
                }
            });
        }
    ));

    passport.use('adminSignin',new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        }, function (username, password, done) {
            console.log(username);
            console.log(password);
            kafka.make_request('adminsignin', {"email": username, "password": password}, function (err, results) {
                console.log('in result');
                console.log(results);
                if (err) {
                    done(err, {});
                }
                console.log("results status", results.code);
                if (results.code === 401) {
                    console.log("hello strategy");
                    done(null, false, {message: results.message});
                }
                else {
                    console.log("I dont know");
                    done(null, results);
                }
            });
        }
    ));

}



