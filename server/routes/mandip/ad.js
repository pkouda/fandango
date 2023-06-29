var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
const nodemailer = require('nodemailer');


//Ckeck Function
router.post('/check', (req, res, next) => {
  console.log("check Function");

  let container = {
		payload: req.body
  };//container
  container.payload.func = "check";
  console.log("check-->" + JSON.stringify(container.payload));

  kafka.make_request('login_topic', container.payload, function(err,results){
      console.log('in result check function ');
      console.log(results);
      if(err){
          done(err,{});
      }
      else
      {
          if(results.code == 200){
              res.json(results);
          }
          else {
            res.json(results);
          }
      }
  }); //kafka signupuser function end */
});

//Ckeck Function
router.post('/getRevenue', (req, res, next) => {
  console.log("getRevenue Function");

  let container = {
		payload: req.body
  };//container
  container.payload.func = "getRevenue";
  console.log("getRevenue-->" + JSON.stringify(container.payload));

  kafka.make_request('getRevenue_topic', container.payload, function(err,results){
      console.log('in result check function ');
      console.log(results);
      if(err){
          done(err,{});
      }
      else
      {
          if(results.code == 200){
              res.json(results);
          }
          else {
            res.json(results);
          }
      }
  }); //kafka signupuser function end */
});


module.exports = router;
