var mongo = require("./mongo");
var MongoConPool = require("./mongoConnPool");
var moment = require('moment')

var mysql = require('mysql2');
var sequelize = require('sequelize');
var models = require('../models');
var transactions = require("../models/UserTransaction")(models.sequelize, models.Sequelize);


// var mongoURL = "mongodb://localhost:27017/KAYAK";
// var winston = require('winston');

//winston.add(winston.transports.File, { filename: './public/LogFiles/KayakAnalysis.json' });
//winston.remove(winston.transports.Console);


function handle_request(msg, callback) {

    var res = {};
    var date = msg.date;

    var tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);


    date = new Date(date);
    console.log(date)
    console.log(tomorrow)
    console.log("Search user function");
    transactions.findAll({
        where: {
            date: {$gt: date, $lt: tomorrow}
        },
    }).then(function (users) {
        console.log("users", users.length);
        if (users.length === 0) {
            console.log('error');
            res.code = 401;
            res.message = "Bills not found";
            callback(null, res);
        }
        else if (users) {
            console.log("users details found");
            res.code = 201;
            res.bills = users;
            res.messsage = "Bills found";
            callback(null, res);
        }
    }).catch(err =>
        callback(null, err)
    );

}

exports.handle_request = handle_request;