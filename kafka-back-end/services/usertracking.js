var mongo = require("./mongo");
var MongoConPool = require("./mongoConnPool");
var mongoURL = 'mongodb://cmpe273:sreedevi@ds149613.mlab.com:49613/fandango';

function usertrack(msg, callback) {

    try {
        
        mongo.connect(mongoURL, function () {
            var coll = mongo.collection('usertrack');
            console.log("usertrack msg",msg);            
            coll.findOneAndUpdate(
                { "username": msg.reqBody.username, "status": msg.reqBody.status  },
                { "$push": {sequence: {"pages":msg.reqBody.pagename, "time": new Date(msg.reqBody.time)} }},
                { upsert: true }
                );
            })    
        console.log("usertrack here msg",msg);
        callback(msg, msg.reqBody);

    }
    catch (e) {
        console.log('hhhhhhhh');
        callback(e, {})
    }
}

function usertrackclose(msg, callback) {

    try {
        
        mongo.connect(mongoURL, function () {
            var coll = mongo.collection('usertrack');
            console.log("usertrack msg",msg);            
            
            coll.update(
              { "username": msg.reqBody.username, "status": "open"},
              {
                $set:{ "status": "close" }
              }
            );
            })    
        console.log("usertrack msg",msg);
        callback(msg, msg.reqBody);

    }
    catch (e) {
        console.log('hhhhhhhh');
        callback(e, {})
    }
}

function pageclicks(msg, callback) {

    try {

        mongo.connect(mongoURL, function () {

            var coll = mongo.collection('pageclicks');
            console.log("pageclicks msg",msg);
            
            coll.findOneAndUpdate(
                { "pagename": msg.reqBody.Page },
                { $inc: { "count": 1 } },
                {upsert: true}
                );
            })    

        console.log("pageclicks msg",msg);
        callback(msg, msg.reqBody.Page);


    }
    catch (e) {
        console.log('hhhhhhhh');
        callback(e, {})
    }
}

function movieclicks(msg, callback) {

    try {

        mongo.connect(mongoURL, function () {

            var coll = mongo.collection('movieclicks');
            console.log("movieclicks msg",msg);

            coll.findOneAndUpdate(
                { "moviename": msg.reqBody.movie, "tmdbid":msg.reqBody.tmdbid, "poster_path":msg.reqBody.poster_path },
                { $inc: { "count": 1 } },
                {upsert: true}
                );
            })

        console.log("movieclicks msg",msg);
        callback(msg, msg.reqBody.Page);

    }
    catch (e) {
        console.log('hhhhhhhh');
        callback(e, {})
    }
}


exports.usertrack = usertrack;
exports.pageclicks = pageclicks;
exports.movieclicks = movieclicks;
exports.usertrackclose = usertrackclose;