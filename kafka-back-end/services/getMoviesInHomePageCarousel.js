var mongo = require("./mongo");
var MongoConPool = require("./mongoConnPool");
// var mongoURL = "mongodb://localhost:27017/KAYAK";
// var winston = require('winston');

//winston.add(winston.transports.File, { filename: './public/LogFiles/KayakAnalysis.json' });
//winston.remove(winston.transports.Console);


function handle_request(msg, callback) {

    // winston.remove(winston.transports.Console);
    // winston.add(winston.transports.File, { filename: './public/LogFiles/KayakAnalysis.json' });
    // winston.log('info', 'Flight Page Viewed', { page_name : 'Flights_page'});

    var res = {};
    var i = 0;
    try {

        var d = new Date();
        d.setDate(d.getDate()-30);

        var queryJson = {
            "release_date": {
                "$gte": d,
                "$lte" : new Date()
            }
        };

        MongoConPool.find('movies', queryJson, function (err, movies) {
            if (err) {
                res.code = "401";
                callback(null, res);
            }
            else {
                res.code = 200;
                res.movies = movies;
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