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

        var queryJson = {
            tmdbid: msg.tmdbid,
            title: msg.title,
            backdrop_path: msg.backdrop_path,
            original_language: msg.original_language,
            overview: msg.overview,
            poster_path: msg.poster_path,
            release_date: new Date(msg.release_date),
            runtime: msg.runtime,
            status: msg.status,
            tagline: msg.tagline,
            vote_average: msg.vote_average,
            vote_count: msg.vote_count,
            youtube_trailer: msg.youtube_trailer,
            cast: msg.cast,
            crew: msg.crew,
            rating: msg.rating,
            reviews: msg.reviews,
            genre: msg.genre
        };

        MongoConPool.insert('movies', queryJson, function (err, flights) {
            if (err) {
                res.code = "401";
                res.value = "Flights details fetch unsuccessful";
                callback(null, res);
            }
            else {
                res.code = 200;
                console.log("mama", flights)
                callback(null, res);
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

