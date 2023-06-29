var mongo = require("./mongo");
var MongoConPool = require("./mongoConnPool");
var mongoURL = 'mongodb://cmpe273:sreedevi@ds149613.mlab.com:49613/fandango';
// var winston = require('winston');

//winston.add(winston.transports.File, { filename: './public/LogFiles/KayakAnalysis.json' });
//winston.remove(winston.transports.Console);

function handle_request(msg, callback) {
    var res = {};

    try {
        mongo.connect(mongoURL, function () {
            console.log('Connected to mongo at: ' + mongoURL);
            var coll = mongo.collection('movies');

            coll.update({
                    tmdbid: msg.tmdbid,
                },
                {
                    $push: {
                        reviews: {
                            title: msg.title,
                            body: msg.body,
                            stars: msg.stars,
                            userEmail: msg.userEmail,
                            userFirstName: msg.userFirstName
                        }
                    }
                }, function (err, check) {
                    if (check) {
                        console.log(check)
                        res.code = "200";
                        res.message = '';
                        callback(null, res);

                    } else {
                        res.code = "401";
                        res.message = '';
                        callback(null, res);
                    }
                });
        });
    }
    catch (e) {
        console.log('hhhhhhhh');
        callback(e, {})
    }
}

exports.handle_request = handle_request;