var express = require('express');
var router = express.Router();
var passport = require('passport');
var kafka = require('../kafka/client');

var multer = require('multer');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        cb(null, req.user.user.email + '-' + Date.now() + '.jpeg')
    }
});

var upload = multer({storage: storage});

var type = upload.single('mypic');


router.get('/fetchuser', function (req, res) {
    console.log(req.user)
    if (req.user) {
        res.status(201).json({user: req.user});
    }
    else {
        res.status(202).json({user: null});

    }
});

router.post('/signin', function (req, res, next) {
    passport.authenticate('user', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            console.log("here", info)
            return res.status(200).json({message: info.message});
        }
        else {
            req.logIn(user, function (err) {
                if (err) {
                    console.log(err);

                    return res.status(401).json({message:"Invalid Credentials"});
                }
                else {
                    req.session.save(function (err) {
                        console.log("login user", req.user);
                        console.log(req.isAuthenticated());
                        req.session.email = req.user.user.email;
                        req.session.accountType = "user";
                        req.user.user.accountType = "user";
                        console.log("session email", req.session.email);
                        return res.status(201).json({username: req.user.user});
                    });
                }
            });
        }

    })(req, res, next);
});

router.get('/userDetails', function (req, res) {
    kafka.make_request('userDetails', {"email": req.session.email}, function (err, results) {
        console.log('in result');
        console.log(results.user);
        if (err) {
            res.status(401).json({message: "Unexpected error occured"});
        }
        else {
            if (results.code === 201) {
                console.log("Inside the success criteria");
                res.status(201).json({message: "User details retrieved successfully", user: results.user});
            }
            else {
                res.status(401).json({message: "user details not available"});

            }
        }
    });

});


router.post('/movieHallSignin', function (req, res, next) {
    passport.authenticate('moviehall', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            console.log("here", info)
            return res.status(200).json({message: info.message});
        }
        else {
            req.logIn(user, function (err) {
                if (err) {
                    console.log(err);
                    return res.status(401);
                }
                else {
                    req.session.save(function (err) {
                        console.log("movie hall user", req.user);
                        console.log(req.isAuthenticated());
                        req.session.email = req.user.user.email;
                        req.session.accountType = "MoviehallAdmin";
                        req.user.user.accountType = "MoviehallAdmin";
                        console.log("session email", req.session.email);
                        return res.status(201).
                        json({username: req.user.user,accountType:"MoviehallAdmin"});
                    });
                }
            });
        }
    })(req, res, next);
});

router.post('/adminSignin', function (req, res, next) {
    passport.authenticate('adminSignin', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            console.log("here", info)
            return res.status(200).json({message: info.message});
        }
        else {
            req.logIn(user, function (err) {
                if (err) {
                    console.log(err);
                    return res.status(401);
                }
                else {
                    req.session.save(function (err) {
                        console.log("movie hall user", req.user);
                        console.log(req.isAuthenticated());
                        req.session.email = req.user.user.email;
                        req.session.accountType = "Admin";
                        req.user.user.accountType = "Admin";
                        console.log("session email", req.session.email);
                        return res.status(201).json({username: req.user.user,accountType:"Admin"});
                    });
                }
            });
        }
    })(req, res, next);
});

router.post('/signup', function (req, res) {

    console.log(req.body)

    kafka.make_request('signup', {"user": req.body}, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            res.status(401).json({message: results.message});
        }
        else {
            if (results.code === 201) {
                console.log("Inside the success criteria");

                req.session.accountType = "user";
                //req.user.user.accountType = "user";
                // req.user.user.accountType = "user";
                res.status(201).json({username:results.user,message: "User Details Saved successfully",accountType:"User"});
            }
            else {
                res.status(401).json({message: results.message});

            }
        }
    });

});

router.get('/signout', function (req, res) {
    console.log("Authenticated:", req.user);

    req.logout();
    req.session.destroy(function (err) {
        if (!err) {
            res.status(201).clearCookie('connect.sid').json({message: "Success"});
        } else {
            // handle error case...
        }
    });

});

router.post('/basicInfo', function (req, res) {
    console.log("session email", req.session.email);
    kafka.make_request('basicInfo', {"user": req.body, "email": req.session.email}, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            res.status(401).json({message: "Unexpected error occured"});
        }
        else {
            if (results.code === 201) {
                console.log("Inside the success criteria");
                res.status(201).json({message: "User Basic info Saved successfully", user: results.user});
            }
            else {
                res.status(401).json({message: "user Basic info update failed"});

            }
        }
    });
});

router.delete('/deleteuser',function(req,res){
    var email = req.query.email;
    console.log("user email",req.query.email);
    kafka.make_request('deleteuser', {"email":email}, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            res.status(401).json({message: "Unexpected error occured"});
        }
        else {
            if (results.code === 201) {
                console.log("Inside the success criteria");
                res.status(201).json({message: "User account deleted successfully"});
            }
            else {
                res.status(401).json({message: results.message});

            }
        }
    });


})


router.delete('/deleteMoviehallUser',function(req,res){
    var email = req.query.email;
    console.log("user email",req.query.email);
    kafka.make_request('deleteMoviehallUser', {"email":email}, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            res.status(401).json({message: "Unexpected error occured"});
        }
        else {
            if (results.code === 201) {
                console.log("Inside the success criteria");
                res.status(201).json({message: "Movie hall User account deleted successfully"});
            }
            else {
                res.status(401).json({message: results.message});

            }
        }
    });


})

router.delete('/deleteSelfuser',function(req,res){
    var email = req.query.email;
    console.log("user email",req.query.email);
    kafka.make_request('deleteuser', {"email":email}, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            res.status(401).json({message: "Unexpected error occured"});
        }
        else {
            if (results.code === 201) {
                console.log("Inside the success criteria");
                req.logout();
                req.session.destroy(function (err) {
                    if (!err) {
                        res.status(201).clearCookie('connect.sid').json({message: "User account deleted successfully"});
                    } else {
                        // handle error case...
                    }
                });
            }
            else {
                res.status(401).json({message: results.message});

            }
        }
    });


})

router.post('/editUserAccount', function (req, res) {
    // console.log("req user",req.user);
    console.log("session email", req.session.email);
    // console.log("req user",req.user);
    var email = req.body.oldemail;
    kafka.make_request('editUserAccount', {"user": req.body,"email":email}, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            res.status(401).json({message: "Unexpected error occured"});
        }
        else {
            if (results.code === 201) {
                console.log("Inside the success criteria");
                req.session.email= results.user.email;
                req.user= results.user;
                res.status(201).json({message: "user Account Saved successfully",user:results.user});
            }
            else {
                res.status(401).json({message: results.message});

            }
        }
    });

});


router.post('/editMoviehallUserAccount', function (req, res) {
    // console.log("req user",req.user);
    console.log("session email", req.session.email);
    // console.log("req user",req.user);
    var email = req.body.oldemail;
    kafka.make_request('editMoviehallUserAccount', {"user": req.body,"email":email}, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            res.status(401).json({message: "Unexpected error occured"});
        }
        else {
            if (results.code === 201) {
                console.log("Inside the success criteria");
                req.session.email= results.user.email;
                req.user= results.user;
                res.status(201).json({message: "Movie hall user Account Saved successfully",user:results.user});
            }
            else {
                res.status(401).json({message: results.message});

            }
        }
    });

});



router.post('/editMoviehallUserAccount', function (req, res) {
    // console.log("req user",req.user);
    console.log("session email", req.session.email);
    // console.log("req user",req.user);
    var email = req.body.oldemail;
    kafka.make_request('editMoviehallUserAccount', {"user": req.body,"email":email}, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            res.status(401).json({message: "Unexpected error occured"});
        }
        else {
            if (results.code === 201) {
                console.log("Inside the success criteria");
                req.session.email= results.user.email;
                req.user= results.user;
                res.status(201).json({message: "Movie hall user Account Saved successfully",user:results.user});
            }
            else {
                res.status(401).json({message: results.message});

            }
        }
    });

});



router.post('/email', function (req, res) {
    console.log("session email", req.session.email);
    console.log("req user",req.user);
    kafka.make_request('changeEmail', {"user": req.body,"email":req.session.email}, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            res.status(401).json({message: "Unexpected error occured"});
        }
        else {
            if (results.code === 201) {
                console.log("Inside the success criteria");
                req.session.email= results.user.email;
                req.user= results.user;
                res.status(201).json({message: "User email Saved successfully",user:results.user});
            }
            else {
                res.status(401).json({message: results.message});

            }
        }
    });

});



router.post('/password', function (req, res) {
    kafka.make_request('changePassword', {"user": req.body,"email":req.session.email}, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            res.status(401).json({message: "Unexpected error occured"});
        }
        else {
            if (results.code === 201) {
                console.log("Inside the success criteria");
                res.status(201).json({message: "password Saved successfully",user:results.user});
            }
            else {
                res.status(401).json({message: "password update failed"});

            }
        }
    });

});


router.get('/searchusers',function(req,res){
    var user = req.query.user;
    kafka.make_request('searchusers', {"user": user}, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            res.status(401).json({message: "Unexpected error occured"});
        }
        else {
            if (results.code === 201) {
                console.log("Inside the success criteria");
                res.status(201).json({message: "Users details found", users: results.users});
            }
            else {
                res.status(401).json({message: "users  details not found "});

            }
        }
    });
});


router.get('/movieRevenue', function (req, res) {

    //console.log(req.param('term'));
    console.log("Inside Movie Revenue - Server");

    kafka.make_request('getMovieRevenue_topic', {'owneremail': req.session.email}, function (err, results) {

        if (results.code === 201) {
            console.log(results);
            res.status(201).json({message:results.message,data:results.results});
        }
        else {
            console.log('roo', results);
            res.status(401).json({message:results.message});
        }

    });
});


router.get('/searchMoviehallUsers',function(req,res){
    var user = req.query.user;
    kafka.make_request('searchMoviehallUsers', {"user": user}, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            res.status(401).json({message: "Unexpected error occured"});
        }
        else {
            if (results.code === 201) {
                console.log("Inside the success criteria");
                res.status(201).json({message: "Movie hall Users details found", users: results.users});
            }
            else {
                res.status(401).json({message: "Movie hall users  details not found "});

            }
        }
    });
});




router.get('/purchaseHistory',function (req, res) {
    var email = req.session.email;

    kafka.make_request('purchaseHistory', {"email": email}, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            res.status(401).json({message: "Unexpected error occured"});
        }
        else {
            if (results.code === 201) {
                console.log("Inside the success criteria");
                res.status(201).json({message: "Purchase History found", purchase: results.transactions});
            }
            else {
                res.status(401).json({message: "Purchase History not available "});

            }
        }
    });
});


router.post('/savePayment', function (req, res) {
    kafka.make_request('savePayment', {"user": req.body,"email":req.session.email}, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            res.status(401).json({message: "Unexpected error occured"});
        }
        else {
            if (results.code === 201) {
                console.log("Inside the success criteria");
                res.status(201).json({message: "payment details Saved successfully"});
            }
            else {
                res.status(401).json({message: "payment details failed "});

            }
        }
    });

});


router.post('/image', type, function (req, res) {

    console.log("dfghjbkn")
    console.log("fghjm",req.user.user.email)
    console.log(req.file.filename)
    req.file.filename;

    kafka.make_request('uploadimage', {"filename": req.file.filename, "email" : req.user.user.email}, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            res.status(401).json({message: "Unexpected error occured"});
        }
        else {
            if (results.code === 201) {
                console.log("Inside the success criteria");
                res.status(201).json({message: "User email Saved successfully", user : results.user});
            }
            else {
                res.status(401).json({message: "user email update failed"});

            }
        }
    });

});


module.exports = router;