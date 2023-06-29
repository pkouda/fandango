var mongo = require("./mongo");
var MongoConPool = require("./mongoConnPool");
// var mongoURL = "mongodb://localhost:27017/KAYAK";
// var winston = require('winston');

//winston.add(winston.transports.File, { filename: './public/LogFiles/KayakAnalysis.json' });
//winston.remove(winston.transports.Console);
var client = require('../redis');

function handle_request(msg, callback) {

    // winston.remove(winston.transports.Console);
    // winston.add(winston.transports.File, { filename: './public/LogFiles/KayakAnalysis.json' });
    // winston.log('info', 'Flight Page Viewed', { page_name : 'Flights_page'});

    var res = {};
    var i = 0;
    try {

        console.log("msg.tmdbid", msg.tmdbid)
        var queryJson = {
            "tmdbid": Number.parseInt(msg.tmdbid)
        };


        /*client.get(queryJson.tmdbid, function(err, reply) {
            console.log(reply);
            if(reply == null){
                console.log("in redisssssssssssssssssssssssss");
                MongoConPool.findOne('movies', queryJson, function (err, movie) {
                    if (err) {
                        res.code = "401";
                        callback(null, res);
                    }
                    else {
                        res.code = 200;
                        res.movie = movie;
                        client.set(queryJson.tmdbid, JSON.stringify(res), function(err, reply){
                            client.expire(queryJson.tmdbid, 20);
                            callback(null, res); 
                       });
                        /*console.log("movie",movie)
                        callback(null, res);
                    }
                });

            }else{
                    console.log("dataa from redissssssssssssssssssssssssssssss");
                    //console.log(JSON.parse(reply));
                    callback(null, JSON.parse(reply));
                    //callback(null, reply);
            }
        });*/



        MongoConPool.findOne('movies', queryJson, function (err, movie) {
            if (err) {
                res.code = "401";
                callback(null, res);
            }
            else {
                res.code = 200;
                res.movie = movie;
                console.log("movie",movie)
                callback(null, res);
            }
        });

    }
    catch
        (e) {
        res.code = "401";
        callback(null, res);
    }
    // winston.remove(winston.transports.File);
    // winston.add(winston.transports.Console);
}

exports.handle_request = handle_request;