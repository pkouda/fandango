var mongo = require("./mongo");
var MongoConPool = require("./mongoConnPool");

function handle_request(msg,callback) {

    var genre = msg.reqBody;
    // var genre = 'Action';
    var res ={};
    console.log("Inside the KAFKA backend-> 'Movie Genre Search'-> ", msg.reqBody);
    try{



        MongoConPool.find('movies', {"genre":msg.reqBody}, function (err, movie) {

            if (err){
                res.code = "402";
                console.log(err, "--------------------------");
                callback(null, res);
            }
            else{
                console.log("Result from Genre Search -> ", movie);
                res.code = 200;
                res.movieGenreData = movie;
                callback(null, res);
            }


        });}
    catch(e){
        res.code = "401";
        callback(null, res);
    }

}

exports.handle_request = handle_request;
