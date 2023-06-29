var mongo = require("./mongo");
var MongoConPool = require("./mongoConnPool");
// var mongoURL = "mongodb://localhost:27017/KAYAK";
// var winston = require('winston');

//winston.add(winston.transports.File, { filename: './public/LogFiles/KayakAnalysis.json' });
//winston.remove(winston.transports.Console);

var client = require('../redis');

function handle_request(msg, callback) {

    var res = {};
    var i = 0;
    try {

        console.log("here")
        var regex = ".*" + msg.term + ".*"

        var queryJson = {
            title: new RegExp(regex, 'i'),
        };

       client.get(queryJson.title, function(err, reply) {
            console.log(reply);
            if(reply == null){
                 MongoConPool.find('movies', queryJson, function (err, movies) {
                    if (err) {
                        res.code = "401";
                        res.value = "Flights details fetch unsuccessful";
                        callback(null, res);
                    }
                    else {
                         res.code = 200;
                            res.movies = movies
                       client.set(queryJson.title, JSON.stringify(res), function(err, reply){
                            client.expire(queryJson.title,20);
                            callback(null, res); 
                       });
                       
                    }
                });
            }else{
                    callback(null, JSON.parse(reply));
            }
        });



       

    }
    catch (e) {
        res.code = "401";
        res.value = "Flights details fetch unsuccessful";
        callback(null, res);
    }
    // winston.remove(winston.transports.File);
    // winston.add(winston.transports.Console);
}

exports.handle_request = handle_request;