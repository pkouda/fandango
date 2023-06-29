var bcrypt = require('bcryptjs');
var mysql = require('mysql2');
var sequelize = require('sequelize');
var models = require('../../models');
var User = require('../../models/User')(models.sequelize, models.Sequelize);
var MoviehallUser = require("../../models/MoviehallUser")(models.sequelize, models.Sequelize);
var Admin = require("../../models/Admin")(models.sequelize, models.Sequelize);
var pranith= require("../getMoviesSearchHandle");
var transactions = require("../../models/UserTransaction")(models.sequelize, models.Sequelize);
var randomInt = require('random-int');
var client = require('../../redis');


function signin(msg, callback) {

    var res = {};
    var email = msg.email;
    var password = msg.password;
    var isValidPassword = function (userpass, password) {
        return bcrypt.compareSync(password, userpass);
    }
    User.findOne({where: {email: email}}).then(function (user) {
        if (!user) {
            console.log('error');
            res.code = 401;
            res.message = "Email id doesn't exist";
            callback(null, res);
        }
        else if (!isValidPassword(user.password, password)) {
            res.code = 401;
            res.message = 'Incorrect password.';
            callback(null, res);
        }
        else {
            var data = user.get();
            console.log('user', data);
            res.code = 201;
            res.user = data;
            callback(null, res);
        }

    }).catch(function (err) {
        console.log("Error:", err);
        res.code = 401;
        res.message = 'Something went wrong with your Signin';
        callback(null, res);
    });

}

function signup(msg, callback) {

    var reqPassword = msg.user.password;
    var reqFirstname = msg.user.firstname;
    console.log("msg value", msg);
    var reqEmail = msg.user.email;
    var res = {};

    User.findOne({where: {email: reqEmail}}).then(function (user) {
        if (user) {
            res.status = 401;
            console.log("db user", user);
            res.message = 'This email already exists';
            callback(null, res);
            console.log("401 email already exists");
        }
        else {
            console.log("new user save");
            bcrypt.hash(reqPassword, 10, function (err, hash) {
                if (err) {
                    res.status = 401;
                    res.message = 'password encryption failed';
                    callback(null, res);
                    console.log("encryption failed");
                }
                else {
                    var data =
                        {
                            email: reqEmail,
                            password: hash,
                            firstname: reqFirstname,
                            displayname: reqFirstname
                        };
                    User.create(data).then(function (newUser, created) {
                        if (!newUser) {
                            res.message = 'User Account creation failed';
                            callback(null, res);
                        }
                        if (newUser) {
                            res.code = 201;
                            res.message = 'User Account creation Successful';
                            res.user = newUser;
                            callback(null, res);
                        }

                    });
                }
            });
        }
    });
}


function saveTransaction(msg, callback) {


    console.log("msg value", msg);
    var res = {};

    // var data =
    //     {
    //         transactionid: { primaryKey: true, type: Sequelize.INTEGER},
    //         displayname: {type: Sequelize.STRING},
    //         email: {type: Sequelize.STRING, validate: {isEmail: true}, unique: true},
    //         moviename: {type: Sequelize.STRING, allowNull: false},
    //         moviehall: {type: Sequelize.STRING},
    //         screenno: {type: Sequelize.STRING},
    //         movietime: {type: Sequelize.STRING},
    //         Amount : {type: Sequelize.INTEGER},
    //         tax:  {type: Sequelize.INTEGER},
    //         last_login: {type: Sequelize.DATE},
    //         image: {type: Sequelize.STRING}
    //     };


    transactions.create(data).then(function (newUser, created) {
        if (!newUser) {
            res.message = 'Transaction not Saved';
            callback(null, res);
        }
        if (newUser) {
            res.code = 201;
            res.message = 'Transaction Saved';
            res.user = newUser;
            callback(null, res);
        }

    });

}


function userDetails(msg, callback) {
    var res = {};
    console.log("email", msg.email);
    User.find({where: {email: msg.email}})
        .then(function (user) {
            res.user = user;
            res.code = 201;
            callback(null, res);
        }).catch(function (err) {
        callback(null, err)
    });
}

function searchUsers(msg,callback){
    var res={};
    var user= msg.user+"%";
    var email = "pranith@gmail.com";
    console.log("Search user function");
    User.findAll({
        where: {
            email: {$like: user}
        },
        order: [['createdAt', 'ASC']]
    }).then(function(users) {
        console.log("users",users.length);
        if (users.length === 0) {
            console.log('error');
            res.code = 401;
            res.message = "user details not found";
            callback(null, res);
        }
        else if(users){
            console.log("users details found");
            res.code = 201;
            res.users= users;
            res.messsage = "users details found";
            callback(null, res);
        }
    }).catch(err =>
        callback(null,err)
    );
}



function getmovierevenue(msg,callback){
    var res={};
    var email = msg.owneremail;
    transactions.findAll({
        attributes: ['moviehall','moviename', [sequelize.fn('sum', sequelize.col('Amount')), 'TotalAmount']],
        group: ["moviename","moviehall"],
        where: {moviehallowner: email},
    }).then(function (results) {
        console.log("results found", results);
        // callback(null, results);
        if (results.length === 0) {
            console.log('error');
            res.code = 401;
            res.message = "No results found";
            callback(null, res);
        }
        else if(results){
            console.log("Movie users details found");
            res.code = 201;
            res.results= results;
            res.messsage = "Movie Hall revenue found";
            callback(null, res);
        }
    }).catch(err =>
        callback(null,err)
    );

}


function searchMoviehallUsers(msg,callback){
    var res= {};
    var user = msg.user+"%";
    console.log("Search user function");
    MoviehallUser.findAll({
        where: {
            email: {$like: user}
        },
        order: [['createdAt', 'ASC']]
    }).then(function(users) {
        console.log("users",users.length);
        if (users.length === 0) {
            console.log('error');
            res.code = 401;
            res.message = "Movie Hall user details not found";
            callback(null, res);
        }
        else if(users){
            console.log("Movie users details found");
            res.code = 201;
            res.users= users;
            res.messsage = "Movie Hall users details found";
            callback(null, res);
        }
    }).catch(err =>
        callback(null,err)
    );
}




function basicInfo(msg, callback) {
    console.log("userdata", msg.user, msg.email);
    var firstName = msg.user.firstname;
    var lastName = msg.user.lastname;
    var displayName = msg.user.displayname;
    var address = msg.user.address;
    var mobile = msg.user.mobile;
    var res = {};
    User.update(
        {firstname: firstName, lastname: lastName, address: address, displayname: displayName, mobile: mobile},
        {returning: true, where: {email: msg.email}}
    )
        .then(function (results) {
            User.find({where: {email: msg.email}})
                .then(function (user) {
                    res.user = user;
                    res.code = 201;
                    callback(null, res);
                }).catch(function (err) {
                console.log(['error'], err.stack);
            });
        })
        .catch(err =>
            callback(null, err)
        )
}

function editUserAccount(msg,callback){
    console.log("userdata", msg.user, msg.email,msg.user.password);
    var firstName = msg.user.firstname;
    var lastName = msg.user.lastname;
    var displayName = msg.user.displayname;
    var address = msg.user.address;
    var mobile = msg.user.mobile;
    var newPassword = msg.user.password;
    var email = msg.user.email;
    var oldPassword = msg.user.oldpassword;
    var res = {};
    var hashnew = oldPassword;

    console.log("user",displayName);

    if(newPassword===null){
        bcrypt.hash(newPassword, 10, function (err, hash) {
            if (err) {
                res.status = 401;
                res.message = 'password encryption failed';
                callback(null, res);
                console.log("encryption failed");
            }
            else{
                hashnew = hash;
            }
        });
    }


    User.update(
        {firstname: firstName, lastname: lastName, address: address, displayname: displayName, mobile: mobile, password:hashnew , email:email},
        {returning: true, where: {email: msg.email}}
    )
        .then(function (results) {
            User.find({where: {email: msg.email}})
                .then(function (user) {
                    res.user = user;
                    res.code = 201;
                    callback(null, res);
                }).catch(function (err) {
                console.log(['error'], err.stack);
            });
        })
        .catch(err =>
            callback(null, err)
        )
}


function editMoviehallUserAccount(msg,callback){
    console.log("userdata", msg.user, msg.email,msg.user.password);
    var firstName = msg.user.firstname;
    var lastName = msg.user.lastname;
    var displayName = msg.user.displayname;
    var address = msg.user.address;
    var mobile = msg.user.mobile;
    var newPassword = msg.user.password;
    var email = msg.user.email;
    var oldPassword = msg.user.oldpassword;
    var res = {};
    var hashnew = oldPassword;
    if(newPassword!==null){
        hashnew = newPassword;
    }

    console.log("user",displayName);


    MoviehallUser.update(
        {firstname: firstName, lastname: lastName, address: address, displayname: displayName, mobile: mobile, password:hashnew , email:email},
        {returning: true, where: {email: msg.email}}
    )
        .then(function (results) {
            MoviehallUser.find({where: {email: msg.email}})
                .then(function (user) {
                    res.user = user;
                    res.code = 201;
                    callback(null, res);
                }).catch(function (err) {
                console.log(['error'], err.stack);
            });
        })
        .catch(err =>
            callback(null, err)
        )
}

function uploadImage(msg, callback) {
    // console.log("userdata", msg.user, msg.email);
    // var firstName = msg.user.firstname;
    // var lastName = msg.user.lastname;
    // var displayName = msg.user.displayname;
    // var address = msg.user.address;
    // var mobile = msg.user.mobile;
    var res = {};
    User.update(
        {image: msg.filename},
        {returning: true, where: {email: msg.email}}
    )
        .then(function (results) {
            User.find({where: {email: msg.email}})
                .then(function (user) {
                    res.user = user;
                    res.code = 201;
                    callback(null, res);
                }).catch(function (err) {
                console.log(['error'], err.stack);
            });
        })
        .catch(err =>
            callback(null, err)
        )
}


function changeEmail(msg, callback) {

    var res={};
    console.log("userdata", msg.user);
    var newemail = msg.user.newemail;
    var sessionemail = msg.email;

    User.find({where: {email: newemail}})
        .then(function (user) {
            if(user.length>0){
                res.code = 401;
                res.message= "Email already linked with another account"
                callback(null,res);
            }

        });
    User.update(
        {email: newemail},
        {returning: true, where: {email: sessionemail}}
    )
        .then(function (results) {
            User.find({where: {email:newemail }})
                .then(function (user) {
                    res.user = user;
                    res.code = 201;
                    callback(null, res);
                }).catch(function (err) {
                console.log(['error'], err.stack);
            });
        })
        .catch(err =>
            callback(null, err)
        )

}


function changePassword(msg,callback){
    var res={};
    var oldPassword = msg.user.oldpassword;
    var newPassword = msg.user.newpassword;
    var email = msg.email;

    var isValidPassword = function (userpass, password) {
        return bcrypt.compareSync(password, userpass);
    }

    bcrypt.hash(newPassword, 10, function (err, hash) {
        if (err) {
            res.status = 401;
            res.message = 'password encryption failed';
            callback(null, res);
            console.log("encryption failed");
        }
        else {
            User.findOne({where: {email: email}}).then(function (user) {
                if (!user) {
                    console.log('error');
                    res.code = 401;
                    res.message = "Email id doesn't exist";
                    callback(null, res);
                }
                else if (!isValidPassword(user.password, oldPassword)) {
                    res.code = 401;
                    res.message = 'Incorrect old password.';
                    callback(null, res);
                }
                else {
                    User.update(
                        {password: hash},
                        {returning: true, where: {email: email}}
                    )
                        .then(function (results) {
                            var data = user.get();
                            console.log('user', data);
                            res.code = 201;
                            res.user = data;
                            callback(null, res);
                        })
                        .catch(err =>
                            callback(null, err)
                        )
                }

            }).catch(function (err) {
                console.log("Error:", err);
                res.code = 401;
                res.message = 'Something went wrong with change password';
                callback(null, res);
            });

        }
    });
}


function savePayment(msg, callback) {
    var res = {};
    var cardnumber = msg.user.cardnumber;
    var month = msg.user.month;
    var year = msg.user.year;
    var zipcode = msg.user.zipcode;
    User.update(
        {cardnumber: cardnumber, cardmonth: month, cardyear: year, zipcode: zipcode},
        {returning: true, where: {email: msg.email}}
    )
        .then(function (results) {
            User.find({where: {email: msg.email}})
                .then(function (user) {
                    res.user = user;
                    res.code = 201;
                    callback(null, res);
                }).catch(function (err) {
                console.log(['error'], err.stack);
            });
        })
        .catch(err =>
            callback(null, err)
        )
}


function purchaseHistory(msg,callback){
    var res= {};
    console.log("Search user function");
    var email = msg.email;

    
    client.get(email, function(err, reply) {
            console.log(reply);
            if(reply == null){
                console.log("In redisssssssssssss");

                transactions.findAll({
                    where: {
                        email: email}
                }).then(function(transactions) {
                    console.log("users",transactions.length);
                    if (transactions.length === 0) {
                        console.log('error');
                        res.code = 401;
                        res.message = "purchase History not available";
                        callback(null, res);
                    }
                    else if(transactions){
                        console.log("purchase  History found");
                        res.code = 201;
                        res.transactions= transactions;
                        res.messsage = "purchase  History  found";
                        client.set(email, JSON.stringify(res), function(err, reply){
                            console.log("resssssss",res);
                            client.expire(email,20);
                            callback(null, res); 
                       });
                    }
                }).catch(err =>
                    callback(null,err)
                );

        }
        else
        {
            console.log("from redisssssssssssss");
            console.log(JSON.parse(reply));
            callback(null,JSON.parse(reply));
        }    
    })

}

function deletePayment(msg, callback) {
    var res = {};
    console.log("userdata", msg.user);
    var cardnumber = "";
    var month = "";
    var year = "";
    var zipcode = "";
    User.update(
        {cardnumber: cardnumber, cardmonth: month, cardyear: year, zipcode: zipcode},
        {returning: true, where: {email: msg.email}}
    )
        .then(function (results) {
            User.find({where: {email: msg.email}})
                .then(function (user) {
                    res.user = user;
                    res.code = 201;
                    callback(null, res);
                }).catch(function (err) {
                console.log(['error'], err.stack);
            });
        })
        .catch(err =>
            callback(null, err)
        )
}


function deleteUser(msg,callback){
    var res={};
    console.log("email",msg.email);
    User.destroy({
        where: {
            email: msg.email
        }
    }).then(function(result){
        res.code = 201;
        res.message= "Delete User Successful";
        callback(null,res);
    }).catch( err =>
        callback(null,err)
    );
}



function deleteMoviehallUser(msg,callback){
    var res={};
    console.log("email",msg.email);
    MoviehallUser.destroy({
        where: {
            email: msg.email
        }
    }).then(function(result){
        res.code = 201;
        res.message= "Delete Moviehall User Successful";
        callback(null,res);
    }).catch( err =>
        callback(null,err)
    );
}


function moviehallSignin(msg, callback) {

    var res = {};
    var email = msg.email;
    var password = msg.password;

    MoviehallUser.findOne({where: {email: email}}).then(function (user) {
        if (!user) {
            console.log('error');
            res.code = 401;
            res.message = "Email id doesn't exist";
            callback(null, res);
        }
        else if (user.password !== password) {
            res.code = 401;
            res.message = 'Incorrect password.';
            callback(null, res);
        }
        else {
            var data = user.get();
            console.log('user', data);
            res.code = 201;
            res.user = data;
            callback(null, res);
        }

    }).catch(function (err) {
        console.log("Error:", err);
        res.code = 401;
        res.message = 'Something went wrong with your Signin';
        callback(null, res);
    });

}


function adminSignin(msg, callback) {
    var res = {};
    var email = msg.email;
    var password = msg.password;


    Admin.findOne({where: {email: email}}).then(function (user) {
        console.log("userpassword", password);
        if (!user) {
            console.log('error');
            res.code = 401;
            res.message = "Email id doesn't exist";
            callback(null, res);
        }
        else if (user.password !== password) {
            res.code = 401;
            res.message = 'Incorrect password.';
            callback(null, res);
        }
        else {
            var data = user.get();
            console.log('user', data);
            res.code = 201;
            res.user = data;
            callback(null, res);
        }
    }).catch(function (err) {
        console.log("Error:", err);
        res.code = 401;
        res.message = 'Something went wrong with your Signin';
        callback(null, res);
    });
}
function saveTransaction(msg, callback) {
    console.log("In save Transaction ===============================================")
// Date: msg.reqBody.movies.Date

    console.log("msg value", msg);
    var res = {};

    var data =
         {
             transactionid: randomInt(9,1000000),
           displayname: msg.reqBody.user.displayname,
          email: msg.reqBody.user.email,
             moviename: msg.reqBody.movies.movie.MovieName,
             movieid:parseInt(msg.reqBody.movies.id),

             moviehall: msg.reqBody.movies.theatreName,
             screenno: parseInt(msg.reqBody.movies.ScreenNo),
             movietime: msg.reqBody.showtime,
             Amount : parseInt(msg.reqBody.total.totalSum),
             tax:  parseInt(msg.reqBody.total.tax),
             image: msg.reqBody.movies.movie.poster_path,
             date: new Date(msg.reqBody.movies.Date),
             moviehallowner: msg.reqBody.movies.user,
             city: msg.reqBody.movies.theatreCity,
             nooftickets:parseInt(msg.reqBody.total.noOfTickets),

         };


    transactions.create(data).then(function (newUser, created) {
        if (!newUser) {
            res.message = 'Transaction not Saved';
            callback(null, res);
        }
        if (newUser) {
            res.code = 201;
            res.message = 'Transaction Saved';
            res.user = newUser;
            callback(null, res);
        }

    });

}

function checkaddMovieHallAdmin(msg, callback) {
    console.log("In checkaddMovieHallAdmin ===============================================")
// Date: msg.reqBody.movies.Date

    console.log("msg value from addMovieHallAdmin++++++++++++++++++ ", msg);
    var res = {};
    MoviehallUser.findAll({
        where: {
            email: {$like: msg.reqBody.owner_email}
        },
        order: [['createdAt', 'ASC']]
    }).then(function(users) {
        console.log("users",users.length);
        if (users.length === 0) {
            console.log('error');
            res.code = 401;
            res.message = "user details not found";
            callback(null, res);
        }
        else if(users) {
            console.log("users details found");
            res.code = 201;
            res.users = users;
            res.messsage = "users details found";
            callback(null, res);
        }


            //callback(null, res);

    }).catch(err =>{
        res.code=401;
        callback(null,err)}
    );


    /*transactions.create(data).then(function (newUser, created) {
        if (!newUser) {
            res.message = 'Transaction not Saved';
            callback(null, res);
        }
        if (newUser) {
            res.code = 201;
            res.message = 'Transaction Saved';
            res.user = newUser;
            callback(null, res);
        }

    });*/

}
function addMovieHallAdmin(msg, callback) {
    console.log("In save Transaction ===============================================")
// Date: msg.reqBody.movies.Date

    console.log("msg value from addMovieHallAdmin++++++++++++++++++ ", msg);
    var res = {};
    MoviehallUser.findAll({
        where: {
            email: {$like: msg.reqBody.owner_email}
        },
        order: [['createdAt', 'ASC']]
    }).then(function(users) {
        console.log("users",users.length);
        if (users.length === 0) {
            console.log('error');
            res.code = 401;
            res.message = "user details not found";
            callback(null, res);
        }
        else if(users){
            console.log("users details found");
            res.code = 201;
            res.users= users;
            res.messsage = "users details found";
            pranith.handle_addOwnerMovies(msg,function(err,status){
                if (err) {
                    res.code = "401";
                    //  callback(null, res);
                    console.log(err);
                    console.log("error in adding  owner movie movie-=-=============------------------------------=======")
                }
                else {
                    console.log(status);
                    res.code = 200;
                    callback(null, res);
                }


            })


            //callback(null, res);
        }
    }).catch(err =>{
        res.code=401;
        callback(null,err)}
    );


    /*transactions.create(data).then(function (newUser, created) {
        if (!newUser) {
            res.message = 'Transaction not Saved';
            callback(null, res);
        }
        if (newUser) {
            res.code = 201;
            res.message = 'Transaction Saved';
            res.user = newUser;
            callback(null, res);
        }

    });*/

}


function handle_cancelbooking(msg,callback){
    var res= {};
    console.log("handle_cancelbooking function");
    console.log(msg);
  //  var email = msg.reqBody.email;
    transactions.destroy({
        where: {
            transactionid: msg.reqBody.transactionid}
    }).then(function(transactions) {
        console.log("users",transactions);
        //if (transactions.length === 0)
        {
            console.log('success');
            res.code = 200;
            res.message = "Transactions Deleted";
pranith.handle_cancelPayment(msg,function(err,results){
    if(err)
    {
        console.log(err);
    }
    else {
        callback(null, res);
    }
});

        }
    }).catch(err =>
        callback(null,err)
    );
}
function handle_bookingsearch(msg,callback){
    var res= {};
    console.log("Search transaction function");
    var email = msg.reqBody.email;
    transactions.findAll({
        where: {
            moviehallowner: email}
    }).then(function(transactions) {
        console.log("users",transactions.length);
        if (transactions.length === 0) {
            console.log('error');
            res.code = 401;
            res.message = "Transactions not available";
            callback(null, res);
        }
        else if(transactions){
            console.log("Transactions History found===============================================",transactions);
            res.code = 201;
            res.transactions= transactions;
            res.messsage = "purchase  History  found";
            callback(null, res);
        }
    }).catch(err =>
        callback(null,err)
    );
}

exports.signin = signin;
exports.signup = signup;
exports.basicInfo = basicInfo;
exports.changeEmail = changeEmail;
exports.changePassword = changePassword;
exports.savePayment = savePayment;
exports.userDetails = userDetails;
exports.deletePayment = deletePayment;
exports.moviehallSignin = moviehallSignin;
exports.uploadImage = uploadImage;
exports.adminSignin = adminSignin;
exports.searchUsers = searchUsers;
exports.searchMoviehallUsers = searchMoviehallUsers;
exports.purchaseHistory = purchaseHistory;
exports.deleteUser = deleteUser;
exports.deleteMoviehallUser = deleteMoviehallUser;
exports.editUserAccount = editUserAccount;
exports.editMoviehallUserAccount = editMoviehallUserAccount;
exports.saveTransaction=saveTransaction;
exports.getmovierevenue = getmovierevenue;
exports.addMovieHallAdmin=addMovieHallAdmin;
exports.handle_bookingsearch=handle_bookingsearch;
exports.handle_cancelbooking=handle_cancelbooking;
exports.checkaddMovieHallAdmin=checkaddMovieHallAdmin;

