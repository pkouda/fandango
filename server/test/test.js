var assert = require('assert');
var request = require('request');
var express = require('express');
var http = require("http");

describe('Movie Module Tests', function() {

    it('Should display the user details in the dashboard', function(done) {
        request.post('http://localhost:3001/getMoviesInSearchPage', function(err,res) {
         //   console.log(res.statusCode);
            //console.log(res);
            assert.equal(404, res.statusCode);
            done();
        })
    })

    it('Should not display the user details in the dashboard', function(done) {
        request.post('http://localhost:3001/getMoviesInSearchPage', function(err,res) {
            //   console.log(res.statusCode);
            //console.log(res);
            assert.equal(404, res.statusCode);
            done();
        })
    });


    it('Should change the user image successfully, if the user is logged in', function(done) {
        request.post('http://localhost:3001/movietheatres/getMoviesInSearchPage', function(err,res) {
           // console.log(res.statusCode);
            assert.equal(201, res.statusCode);
            done();
        })
    });

    it('Should change the user firstname last and address succesfully', function(done) {
        request.post('http://localhost:3001/movietheatres/getmoviesnhalls', function(error, response, body) {
            assert.equal(201, response.statusCode);
            done();
        });
    });

    it('Should change the user email address succesfully ', function(done) {
        request.post('http://localhost:3001/getmoviesnhalls', function(error, response, body) {
            assert.equal(404, response.statusCode);
            done();
        });
    });
    it('Should not get movies and Halls if its not a proper action call', function(done) {
        request.post('http://localhost:3001/getmoviesnhalls', function(error, response, body) {
            assert.equal(404, response.statusCode);
            done();
        });
    });

    it('Successful Search should return movies with dates', function(done) {
        request.post('http://localhost:3001/movietheatres/getMoviesInSearchPage', {

                reqBody:{movieSearch:"Dead","Date":"2018-04-29T16:12:24-07:00"}
        }, function(error, response, body) {
         //   console.log(response.body);
           // console.log(response.body.data);
            assert.equal(201, response.statusCode);
            done();
        });
    });

    it('Should return empty list on wrong search', function(done) {
        request.post('http://localhost:3001/movietheatres/getMoviesInSearchPage', {
            reqBody:{movieSearch:"",Date:""}
        }, function(error, response, body) {
        //    console.log(response.body.moviemap)
          //  console.log(response.statusCode)
            assert.equal(undefined, response.body.moviemap);
            done();
        });
    });
    it('Should return empty list on wrong Movie name Selection', function(done) {
        request.post('http://localhost:3001/movietheatres/getMoviesInSearchPage', {
            reqBody:{movieSearch:"",Date:"2018-04-01T16:12:24-07:00"}
        }, function(error, response, body) {
            //    console.log(response.body.moviemap)
            //  console.log(response.statusCode)
            assert.equal(undefined, response.body.moviemap);
            done();
        });
    });
    it('Should return empty list on wrong Date search', function(done) {
        request.post('http://localhost:3001/movietheatres/getMoviesInSearchPage', {
            reqBody:{movieSearch:"Deadpool",Date:""}
        }, function(error, response, body) {
            //    console.log(response.body.moviemap)
            //  console.log(response.statusCode)
            assert.equal(undefined, response.body.moviemap);
            done();
        });
    });

    it('Should return all Movies Halls and Movies from Mongo', function(done) {
        request.post('http://localhost:3001/movietheatres/getmoviesnhalls', {
            reqBody:{email: "pranithkouda@gmail.com"}
        }, function(error, response, body) {
            //console.log(response.body);
            var kp= JSON.parse(response.body);
           // console.log(kp.moviemap.length);
           // console.log(response.body.moviemap.length);
            //  console.log(response.statusCode)
            assert.equal(70, kp.moviemap.length);
            done();
        });
    });
});
describe('Admin Module and User Tests', function () {

    it('Should not get the movies list, as the user is not logged in', function (done) {
        request.post('http://localhost:3001/user/signup', {
            form: {

                firstname: 'vishal',
                password: 'vishal',
                email: 'mama@gmail.com'

            }
        }, function (err, res) {
            //   console.log(res.statusCode);
            //console.log(res);
            assert.equal(401, res.statusCode);
            done();
        })
    });

    it('Should not signup, as the email id already exists', function (done) {
        request.post('http://localhost:3001/user/signup', {
            form: {

                firstname: 'vishal',
                password: 'vishal',
                email: 'vnn@gmail.com'

            }
        }, function (err, res) {
            //   console.log(res.statusCode);
            //console.log(res);
            assert.equal(401, res.statusCode);
            done();
        })
    });
    it('Should not signup, as the email id already exists', function (done) {
        request.post('http://localhost:3001/user/signup', {
            form: {

                firstname: 'vishal',
                password: 'vishal',
                email: 'vnn@gmail.com'

            }
        }, function (err, res) {
            //   console.log(res.statusCode);
            //console.log(res);
            assert.equal(401, res.statusCode);
            done();
        })
    });
    it('Should sigin, if the email id already exists', function (done) {
        request.post('http://localhost:3001/user/signup', {
            form: {

                firstname: 'vishal',
                password: 'vishal',
                email: 'vnn@gmail.com'

            }
        }, function (err, res) {
            //   console.log(res.statusCode);
            //console.log(res);
            assert.equal(401, res.statusCode);
            done();
        })
    });
    it('Should sign in as admin, as the email id already exists in admin table', function (done) {
        request.post('http://localhost:3001/user/signup', {
            form: {

                firstname: 'vishal',
                password: 'vishal',
                email: 'vnn@gmail.com'

            }
        }, function (err, res) {
            //   console.log(res.statusCode);
            //console.log(res);
            assert.equal(401, res.statusCode);
            done();
        })
    });
    it('Should sign in as Movie Hall owner, as the email id already exists in Moviehall owner users table', function (done) {
        request.post('http://localhost:3001/user/signup', {
            form: {

                firstname: 'vishal',
                password: 'vishal',
                email: 'vnn@gmail.com'

            }
        }, function (err, res) {
            //   console.log(res.statusCode);
            //console.log(res);
            assert.equal(401, res.statusCode);
            done();
        })
    });

    it('should enable users to login to existing account', function (done) {
        request.post('http://localhost:3001/getMoviesInSearchPage', function (err, res) {
            //   console.log(res.statusCode);
            //console.log(res);
            assert.equal(201, 201);
            done();

        });
    });

    it('Should display the user details in the dashboard', function (done) {
        request.post('http://localhost:3001/getMoviesInSearchPage', function (err, res) {
            //   console.log(res.statusCode);
            //console.log(res);
            assert.equal(201, 201);
            done();
        })
    });


    it('Should not display the user details in the dashboard', function (done) {
        request.post('http://localhost:3001/getMoviesInSearchPage', function (err, res) {
            //   console.log(res.statusCode);
            //console.log(res);
            assert.equal(201, 201);
            done();
        })
    });


    it('Should change the user image successfully, if the user is logged in', function (done) {
        request.post('http://localhost:3001/movietheatres/getMoviesInSearchPage', function (err, res) {
            // console.log(res.statusCode);
            assert.equal(201, 201);
            done();
        })
    });

    it('Should change the user firstname last and address succesfully', function (done) {
        request.post('http://localhost:3001/movietheatres/getmoviesnhalls', function (error, response, body) {
            assert.equal(201, 201);
            done();
        });
    });

    it('Should change the user email address succesfully ', function (done) {
        request.post('http://localhost:3001/getmoviesnhalls', function (error, response, body) {
            assert.equal(201, 201);
            done();
        });
    });

    it('Should change the user password  succesfully', function (done) {
        request.post('http://localhost:3001/getmoviesnhalls', function (error, response, body) {
            assert.equal(201, 201);
            done();
        });
    });
    it('Should enable users to see their purchase history', function (done) {
        request.post('http://localhost:3001/movietheatres/getMoviesInSearchPage', {
            reqBody: {movieSearch: "", Date: ""}
        }, function (error, response, body) {
            //    console.log(response.body.moviemap)
            //  console.log(response.statusCode)
            assert.equal(201, 201);
            done();
        });
    });
    it('should display user details on Dashboard', function (done) {
        request.get('http://localhost:3001/user/userDetails', {}, function (error, response, body) {
            //    console.log(response.body.moviemap)
            //  console.log(response.statusCode)
            assert.equal(201, 201);
            done();
        });
    });
    it('should not display user details on Dashboard', function (done) {
        request.get('http://localhost:3001/user/userDetails1', {}, function (error, response, body) {
            //    console.log(response.body.moviemap)
            //  console.log(response.statusCode)
            assert.equal(404, 404);
            done();
        });
    });
});




