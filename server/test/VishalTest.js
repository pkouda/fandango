var assert = require('assert');
var request = require('request');
var express = require('express');
var http = require("http");

describe('HTTP Tests', function () {

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
            assert.equal(201, res.statusCode);
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


});