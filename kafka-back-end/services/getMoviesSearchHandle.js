var mongo = require("./mongo");
var MongoConPool = require("./mongoConnPool");
var moment = require('moment');
const delay = require('delay');
var randomInt = require('random-int');
var MongoClient = require('mongodb').MongoClient;
var user = require("./satish/user");
var client = require('../redis');

// var mongoURL = "mongodb://localhost:27017/KAYAK";
// var winston = require('winston');

//winston.add(winston.transports.File, { filename: './public/LogFiles/KayakAnalysis.json' });
//winston.remove(winston.transports.Console);

function groupBy(arr, key) {
    var newArr = [],
        types = {},
        newItem, i, j, cur;
    for (i = 0, j = arr.length; i < j; i++) {
        cur = arr[i];
        if (!(cur[key] in types)) {
            types[cur[key]] = {type: cur[key], data: []};
            newArr.push(types[cur[key]]);
        }
        types[cur[key]].data.push(cur);
    }
    return newArr;
}


function handle_request(msg, callback) {

    // winston.remove(winston.transports.Console);
    // winston.add(winston.transports.File, { filename: './public/LogFiles/KayakAnalysis.json' });
    // winston.log('info', 'Flight Page Viewed', { page_name : 'Flights_page'});
    console.log("---------------------------------------------", moment(msg.reqBody.Date).format("YYYY-MM-DD"));
    var res = {};
    var i = 0;
    try {
        //console.log((new Date()).format('YYYY MM DD'));
        // console.log("msg is-----------------------------------------------", msg);
        //movieSearch: '95126', Date: '2018-04-20T20:12:00-07:00'
        var d2 = new Date(moment(msg.reqBody.Date).format("YYYY-MM-DD"));

        var d = new Date(moment(msg.reqBody.Date).format("YYYY-MM-DD"));
        d.setDate(d.getDate() + 1);
        console.log(d, d2);

//'^win$'
        var queryJson = {
            "movie.MovieName": new RegExp("^" + msg.reqBody.movieSearch, "i"),
            "Date": {"$gte": new Date(d2), "$lte": new Date(d)}
        };

        console.log(msg)


        client.get(msg.reqBody.movieSearch, function (err, reply) {
            console.log(reply);
            if (reply == null) {
                console.log("in redisssssssssssssssssssssssss");


                MongoConPool.find('movieHall', queryJson, function (err, movie) {
                    if (err) {
                        res.code = "402";
                        console.log(err, "--------------------------");
                        callback(null, res);
                    }
                    else {

                        resArr = [];
                        resArr = movie.map(function (file) {
                            var carsJSON = {};
                            carsJSON.id = movie[i].ID;
                            var spl = movie[i].HallID.split('|');
                            carsJSON.theatreName = spl[0];
                            carsJSON.theatreCity = spl[1];
                            carsJSON.theatreState = spl[2];
                            carsJSON.theatreZip = spl[3];
                            carsJSON.movie = movie[i].movie;
                            carsJSON.ScreenNo = movie[i].ScreenNo;
                            carsJSON.Showtimes = movie[i].Showtimes;
                            carsJSON.NoofSeats = movie[i].NoofSeats;
                            carsJSON.TicketPrice = movie[i].TicketPrice;
                            carsJSON.user = movie[i].user;
                            carsJSON.Date = movie[i].Date;


                            //carsJSON.Company=cars[i].Company;
                            i = i + 1;
                            return carsJSON;
                        });
                        var resmap = groupBy(resArr, "theatreName");
                        // console.log(resmap);

                        res.code = 200;
                        res.movietheatre = resArr;
                        res.moviemap = resmap;
                        //     console.log("movie theatres are", resArr);

                        client.set(msg.reqBody.movieSearch, JSON.stringify(res), function (err, reply) {
                            client.expire(msg.reqBody.movieSearch, 30);
                            callback(null, res);
                        });

                    }
                    //callback(null, res);
                })

            } else {
                console.log("dataaa from redissssssssssssssssssssssssssssss");
                console.log(JSON.parse(reply));
                callback(null, JSON.parse(reply));
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


function handle_addMovies(msg, callback) {

    // winston.remove(winston.transports.Console);
    // winston.add(winston.transports.File, { filename: './public/LogFiles/KayakAnalysis.json' });
    // winston.log('info', 'Flight Page Viewed', { page_name : 'Flights_page'});
    //  console.log("-----------------------------------------in addmovies--");
    var showtimes = [];
    for (let i = 0; i < msg.reqBody.showTimes.length; i++) {
        var showSeats = {};
        showSeats =
            {
                time: msg.reqBody.showTimes[i],
                seats: parseInt(msg.reqBody.noOfSeats)
            };
        showtimes.push(showSeats);
    }


    // console.log(showtimes, "--------------------------------------");
    var res = {};
    var i = 0;


    var d = new Date();
    var arrayDates = [];
    var queryJsonArray = [];

    for (let i = 0; i < 6; i++) {
        let newDate = new Date();
        newDate.setDate(newDate.getDate() + i);
        arrayDates.push(newDate);
        //  console.log(newDate);
    }
    console.log(arrayDates);
    for (let i = 0; i < 7; i++) {

        //console.log(d,"??????????????????????????????????????????????????????????????????????????????????");
        var queryJson = {
            // "_id":parseInt(randomInt(9,1000000)),
            "ID": randomInt(9, 1000000),
            "HallID": msg.reqBody.theatre.data[0].theatreName + "|" + msg.reqBody.theatre.data[0].theatreCity + "|" +
            msg.reqBody.theatre.data[0].theatreState + "|" + msg.reqBody.theatre.data[0].theatreZip,
            "movie": {
                "movieId": msg.reqBody.movie.tmdbid,
                "poster_path": msg.reqBody.movie.poster_path,
                "MovieName": msg.reqBody.movie.movie
            },
            "ScreenNo": msg.reqBody.screenNo,
            "Showtimes": showtimes,
            "NoofSeats": msg.reqBody.noOfSeats,
            "TicketPrice": msg.reqBody.tktPrice,
            "Date": arrayDates[i],
            "user": msg.reqBody.userEmail
        };


        queryJsonArray.push(queryJson);

    }
    console.log(queryJson)
    // console.log(queryJsonArray);
    {
        // console.log(msg.reqBody,"????????????????????????????????????????????????????");
        try {

            //  console.log("msg is-----------------------------------------------");


            var queryJsonSearch = {
                "HallID": msg.reqBody.theatre.data[0].theatreName + "|" + msg.reqBody.theatre.data[0].theatreCity + "|" +
                msg.reqBody.theatre.data[0].theatreState + "|" + msg.reqBody.theatre.data[0].theatreZip,
                "ScreenNo": msg.reqBody.screenNo,
                "Date": {$lte: d}
            };


            /* var queryJson = {
                // "_id":parseInt(randomInt(9,1000000)),
                 "ID": 108.0,
                 "HallID": msg.reqBody.theatre.data[0].theatreName + "|" + msg.reqBody.theatre.data[0].theatreCity + "|" +
                 msg.reqBody.theatre.data[0].theatreState + "|" + msg.reqBody.theatre.data[0].theatreZip,
                 "movie": {
                     "movieId": msg.reqBody.movie.tmdbid,
                     "poster_path": msg.reqBody.movie.poster_path,
                     "MovieName": msg.reqBody.movie.movie
                 },
                 "ScreenNo": 1,
                 "Showtimes": showtimes,
                 "NoofSeats": msg.reqBody.noOfSeats,
                 "TicketPrice": 10,
                 "Date": d
             };*/
            //   console.log("before delay)

            {
                // Executed after 200 milliseconds
                //  console.log("after delay)

                MongoConPool.findOne('movieHall', queryJsonSearch, function (err, movie) {
                    if (err) {
                        res.code = "401";
                        callback(null, res);
                        //  console.log("into error===============================================", err)
                    }
                    else {
                        if (movie == null) {
                            console.log(movie);


                            // var batch = col.initializeOrderedBulkOp();
                            // console.log("adding movie================================================");
                            MongoConPool.insertMany('movieHall', queryJsonArray, function (err, movie) {
                                if (err) {
                                    res.code = "401";
                                    //  callback(null, res);
                                    console.log(err);
                                    console.log("error in adding movie-=-=============------------------------------=======")
                                }
                                else {

                                    console.log("-moviea added-----------------------------------------------");
                                    res.result = movie;

                                    res.code = 200;
                                    callback(null, res);
                                }
                            });

                        }
                        else {
                            res.code = 400;
                            callback(null, res);
                        }

                        //  res.result = movie;
                        // res.code = 200;
                        // callback(null, res);
                    }
                });

            }


            /* MongoConPool.insert('movieHall', queryJson, function (err, movie) {
                 if (err) {
                     res.code = "401";
                     callback(null, res);
                 }
                 else {

                     console.log(movie, "------------------------------------------------");
                     res.result = movie;
                     res.code = 200;
                     callback(null, res);
                 }
             });*/
        }
        catch
            (e) {
            res.code = "401";
            callback(null, res);
        }
    }


    // winston.remove(winston.transports.File);
    // winston.add(winston.transports.Console);
}

function handle_addOwnerMovies(msg, callback) {

    // winston.remove(winston.transports.Console);
    // winston.add(winston.transports.File, { filename: './public/LogFiles/KayakAnalysis.json' });
    // winston.log('info', 'Flight Page Viewed', { page_name : 'Flights_page'});
    console.log("-----------------------------------------in add Ownermovies--");
    var showtimes = [];


    // console.log(showtimes, "--------------------------------------");
    var res = {};
    var i = 0;


    var d = new Date();
    let newDate = new Date();
    d.setDate(d.getDate() -4);

    {

        //console.log(d,"??????????????????????????????????????????????????????????????????????????????????");
        var queryJson = {
            // "_id":parseInt(randomInt(9,1000000)),
            "ID": randomInt(9, 1000000),
            "HallID": msg.reqBody.movietheatername + "|" + msg.reqBody.city + "|" +
            msg.reqBody.state + "|" + msg.reqBody.zipcode,
            "movie": {
                "movieId": 1,
                "poster_path": "/30oXQKwibh0uANGMs0Sytw3uN22.jpg",
                "MovieName": "Rampage"
            },
            "ScreenNo": 1,
            "Showtimes":[ { time:"10:30a",seats:40},{ time:"9:30a",seats:40}],
            "NoofSeats": 15,
            "TicketPrice": 10,
            "Date": d,
            "user": msg.reqBody.owner_email
        };


        //queryJsonArray.push(queryJson);

    }

    {
        // console.log(msg.reqBody,"????????????????????????????????????????????????????");
        try {


            {



                // var batch = col.initializeOrderedBulkOp();
                // console.log("adding movie================================================");
                MongoConPool.insert('movieHall', queryJson, function (err, movie) {
                    if (err) {
                        res.code = "401";
                        //  callback(null, res);
                        console.log(err);
                        console.log("error in adding movie-=-=============------------------------------=======")
                    }
                    else {

                        console.log("-moviea added-----------------------------------------------");
                        res.result = movie;

                        res.code = 200;
                        callback(null, res);
                    }
                });

            }

        }
        catch
            (e) {
            res.code = "401";
            callback(null, res);
        }
    }


    // winston.remove(winston.transports.File);
    // winston.add(winston.transports.Console);
}


function handle_geteditmoviesearch(msg, callback) {

    // winston.remove(winston.transports.Console);
    // winston.add(winston.transports.File, { filename: './public/LogFiles/KayakAnalysis.json' });
    // winston.log('info', 'Flight Page Viewed', { page_name : 'Flights_page'});
    var d2 = new Date(moment(msg.reqBody.dateSelected).format("YYYY-MM-DD"));

    var d = new Date(moment(msg.reqBody.dateSelected).format("YYYY-MM-DD"));
    d.setDate(d.getDate() + 1);
    console.log("---------------------------------------------", d, d2);

    var res = {};
    var i = 0;
    try {
        //  var date = new Date();
        //   console.log("date is-----------------------------------------------");
        // console.log(date);
        console.log("msg is---------------------handle_geteditmoviesearch--------------------------", msg);
        var queryJson = {
            //  "Date": {$gte : new Date()}

            //hard code
            "user": msg.reqBody.email, "Date": {"$gte": new Date(d2), "$lte": new Date(d)}
        };


        var queryMovies = {poster_path: new RegExp('/')};

        MongoConPool.find('movieHall', queryJson, function (err, movies) {
            if (err) {
                res.code = "401";
                callback(null, res);
            }
            else {

                resArr1 = [];
                //        console.log("error------------------------------------------------------");
                //      console.log(movies);
                resArr1 = movies.map(function (file) {
                    var carsJSON = {};
                    // carsJSON.id = movie[i].ID;
                    var spl = file.HallID.split('|');
                    carsJSON.theatreName = spl[0];
                    carsJSON.theatreCity = spl[1];
                    carsJSON.theatreState = spl[2];
                    carsJSON.theatreZip = spl[3];
                    carsJSON.user = file.user;
                    carsJSON.movie = file.movie;
                    carsJSON.ScreenNo = file.ScreenNo;
                    carsJSON.Showtimes = file.Showtimes;
                    carsJSON.NoofSeats = file.NoofSeats;
                    carsJSON.TicketPrice = file.TicketPrice;
                    carsJSON.user = file.user;
                    carsJSON.ID = file.ID;
                    carsJSON.Date = file.Date;


                    //carsJSON.Company=cars[i].Company;
                    i = i + 1;
                    return carsJSON;
                });
                var resmap1 = groupBy(resArr1, "theatreName");
                //  console.log("---------------------------------------------------=========================-------------")
                //    console.log(resmap1);

                res.code = 200;
                //res.movietheatre = resArr1;
                res.movietheatre = resmap1;
                console.log("movie theatres are", resmap1);
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

function handle_MoviesnHalls(msg, callback) {

    // winston.remove(winston.transports.Console);
    // winston.add(winston.transports.File, { filename: './public/LogFiles/KayakAnalysis.json' });
    // winston.log('info', 'Flight Page Viewed', { page_name : 'Flights_page'});

    var res = {};
    var i = 0;
    try {
        var date = new Date();
        //   console.log("date is-----------------------------------------------");
        // console.log(date);
        console.log("msg is-----------------------------------------------", msg.reqBody);
        var queryJson = {
            //  "Date": {$gte : new Date()}

            //hard code
            "HallID": new RegExp("|"), "user": msg.reqBody.email
        };

        var queryMovies = {poster_path: new RegExp('/')};


        MongoConPool.find('movies', queryMovies, function (err, movie) {
            if (err) {
                //      console.log("error------------------------------------------------------");
                res.code = "403";
                callback(null, res);
            }
            else {
                var movies = [];
                //   console.log("found movie names");
                resArr = [];
                resArr = movie.map(function (file) {

                    var carsJSON = {};
                    carsJSON.movie = movie[i].title;
                    //carsJSON.title=movie[i].title;
                    carsJSON.tmdbid = movie[i].tmdbid;
                    carsJSON.poster_path = movie[i].poster_path;


                    //carsJSON.Company=cars[i].Company;
                    i = i + 1;
                    return carsJSON;
                });
                // var resmap=groupBy(resArr,"theatreName");
                //console.log(resArr);
                //console.log(movies);

                res.code = 200;
                // res.movietheatre = resArr;
                res.moviemap = resArr;
                // console.log("movie theatres are",resArr);

                //  var movieTheatres=getMovieTheatresO();


                //callback(null, res);


                MongoConPool.find('movieHall', queryJson, function (err, movies) {
                    if (err) {
                        res.code = "401";
                        callback(null, res);
                    }
                    else {

                        resArr1 = [];
                        //        console.log("error------------------------------------------------------");
                        //      console.log(movies);
                        resArr1 = movies.map(function (file) {
                            var carsJSON = {};
                            // carsJSON.id = movie[i].ID;
                            var spl = file.HallID.split('|');
                            carsJSON.theatreName = spl[0];
                            carsJSON.theatreCity = spl[1];
                            carsJSON.theatreState = spl[2];
                            carsJSON.theatreZip = spl[3];
                            carsJSON.user = file.user;
                            carsJSON.movie = file.movie;
                            carsJSON.ScreenNo = file.ScreenNo;
                            carsJSON.Showtimes = file.Showtimes;
                            carsJSON.NoofSeats = file.NoofSeats;
                            carsJSON.TicketPrice = file.Price;
                            carsJSON.user = file.user;
                            carsJSON.ID = file.ID;
                            carsJSON.Date = file.Date;


                            //carsJSON.Company=cars[i].Company;
                            i = i + 1;
                            return carsJSON;
                        });
                        var resmap1 = groupBy(resArr1, "theatreName");
                        //  console.log("---------------------------------------------------=========================-------------")
                        //    console.log(resmap1);

                        res.code = 200;
                        //res.movietheatre = resArr1;
                        res.movietheatre = resmap1;
                        console.log("movie theatres are", resmap1);
                        callback(null, res);
                    }
                });
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

function handle_getAllMovieHalls(msg, callback) {

    // winston.remove(winston.transports.Console);
    // winston.add(winston.transports.File, { filename: './public/LogFiles/KayakAnalysis.json' });
    // winston.log('info', 'Flight Page Viewed', { page_name : 'Flights_page'});

    var res = {};
    var i = 0;
    try {
        var date = new Date();
        //   console.log("date is-----------------------------------------------");
        // console.log(date);
        console.log("msg is-----------------------------------------------", msg.reqBody);
        var queryJson = {
            //  "Date": {$gte : new Date()}

            //hard code
            "HallID": new RegExp("|")
        };

        var queryMovies = {poster_path: new RegExp('/')};


        MongoConPool.find('movies', queryMovies, function (err, movie) {
            if (err) {
                //      console.log("error------------------------------------------------------");
                res.code = "403";
                callback(null, res);
            }
            else {
                var movies = [];
                //   console.log("found movie names");
                resArr = [];
                resArr = movie.map(function (file) {

                    var carsJSON = {};
                    carsJSON.movie = movie[i].title;
                    //carsJSON.title=movie[i].title;
                    carsJSON.tmdbid = movie[i].tmdbid;
                    carsJSON.poster_path = movie[i].poster_path;


                    //carsJSON.Company=cars[i].Company;
                    i = i + 1;
                    return carsJSON;
                });
                // var resmap=groupBy(resArr,"theatreName");
                //console.log(resArr);
                //console.log(movies);

                res.code = 200;
                // res.movietheatre = resArr;
                res.moviemap = resArr;
                // console.log("movie theatres are",resArr);

                //  var movieTheatres=getMovieTheatresO();


                //callback(null, res);


                MongoConPool.find('movieHall', queryJson, function (err, movies) {
                    if (err) {
                        res.code = "401";
                        callback(null, res);
                    }
                    else {

                        resArr1 = [];
                        //        console.log("error------------------------------------------------------");
                        //      console.log(movies);
                        resArr1 = movies.map(function (file) {
                            var carsJSON = {};
                            // carsJSON.id = movie[i].ID;
                            var spl = file.HallID.split('|');
                            carsJSON.theatreName = spl[0];
                            carsJSON.theatreCity = spl[1];
                            carsJSON.theatreState = spl[2];
                            carsJSON.theatreZip = spl[3];
                            carsJSON.user = file.user;
                            carsJSON.movie = file.movie;
                            carsJSON.ScreenNo = file.ScreenNo;
                            carsJSON.Showtimes = file.Showtimes;
                            carsJSON.NoofSeats = file.NoofSeats;
                            carsJSON.TicketPrice = file.Price;
                            carsJSON.user = file.user;
                            carsJSON.ID = file.ID;
                            carsJSON.Date = file.Date;


                            //carsJSON.Company=cars[i].Company;
                            i = i + 1;
                            return carsJSON;
                        });
                        var resmap1 = groupBy(resArr1, "theatreName");
                        //  console.log("---------------------------------------------------=========================-------------")
                        //    console.log(resmap1);

                        res.code = 200;
                        //res.movietheatre = resArr1;
                        res.movietheatre = resmap1;
                        console.log("movie theatres are", resmap1);
                        callback(null, res);
                    }
                });
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

function handle_savemoviehalledits(msg, callback) {

    // winston.remove(winston.transports.Console);
    // winston.add(winston.transports.File, { filename: './public/LogFiles/KayakAnalysis.json' });
    // winston.log('info', 'Flight Page Viewed', { page_name : 'Flights_page'});

    var res = {};
    var i = 0;
    try {
        var date = new Date();
        //   console.log("date is-----------------------------------------------");
        // console.log(date);
        console.log("msg is----------------from handle_savemoviehalledits-------------------------------", msg.reqBody);
        var Hallnew = msg.reqBody.theatername + "|" + msg.reqBody.city + "|" + msg.reqBody.state + "|" + msg.reqBody.zipcode;
        console.log(Hallnew);
        console.log(msg.reqBody.movietheatername.data.length);
        console.log(msg.reqBody.owner_email);

        var insertQuery={
        "$set":{
        "HallID":Hallnew,
            "user":msg.reqBody.owner_email

        }
        }






        user.checkaddMovieHallAdmin(msg, function (err, results) {
            console.log(results);
            if (results.code == 201) {
                for (var i = 0; i < msg.reqBody.movietheatername.data.length; i++) {
                    console.log(msg.reqBody.movietheatername.data[i].ID);
                    MongoConPool.updateOne('movieHall', {ID: msg.reqBody.movietheatername.data[i].ID}, insertQuery, function (err, movie) {
                        if (err) {
                            //      console.log("error------------------------------------------------------");
                            res.code = 200;
                            callback(null, res);
                        }
                        else {
                            console.log(movie);
                            res.code = 200;


                        }
                    });
                }
                res.code=200;
                res.value="Tried Changing values";
                callback(null,res);

            }else if(results.code==401){
                res.code=401;
                res.msg="error";
                callback(null,res);
            }


        });
        }
    catch
        (e) {
        res.code = 401;
        callback(null, res);
    }
    // winston.remove(winston.transports.File);
    // winston.add(winston.transports.Console);
}

function handle_getMovieListing(msg, callback) {

    // winston.remove(winston.transports.Console);
    // winston.add(winston.transports.File, { filename: './public/LogFiles/KayakAnalysis.json' });
    // winston.log('info', 'Flight Page Viewed', { page_name : 'Flights_page'});

    var res = {};
    var i = 0;
    try {

        console.log("msg is----handle_getMovieListing=----------------------------------------------------", parseInt(msg.reqBody.id));
        var queryJson = {
            //  "Date": {$gte : new Date()}

            //hard code
            // "ID": new RegExp("|"),"user":"pranithkouda@gmail.com"
            "ID": parseInt(msg.reqBody.id)
        };


        MongoConPool.find('movieHall', queryJson, function (err, movie) {
            if (err) {
                //      console.log("error------------------------------------------------------");
                res.code = "403";
                callback(null, res);
            }
            else {
                var movies = [];
                //   console.log("found movie names");
                resArr = [];
                console.log(movie);
                res.code = 200;
                // res.movietheatre = resArr;
                res.moviemap = movie;

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


function handle_saveMovieListing(msg, callback) {

    // winston.remove(winston.transports.Console);
    // winston.add(winston.transports.File, { filename: './public/LogFiles/KayakAnalysis.json' });
    // winston.log('info', 'Flight Page Viewed', { page_name : 'Flights_page'});
    console.log("-----------------------------------------in handle_saveMovieListing--", msg);
    var showtimes = [];
    for (let i = 0; i < msg.reqBody.showTimes.length; i++) {
        var showSeats = {};
        //showSeats[msg.reqBody.showTimes[i]] = msg.reqBody.noOfSeats;
        showSeats = {"time": msg.reqBody.showTimes[i], "seats": msg.reqBody.noOfSeats}
        showtimes.push(showSeats);
    }
    console.log(showtimes);

    // console.log(showtimes, "--------------------------------------");
    var res = {};
    var i = 0;


    var d = new Date();
    var arrayDates = [];
    var queryJsonArray = [];


    console.log(arrayDates);
    //  for (let i = 0; i < 6; i++)

    {

        //console.log(d,"??????????????????????????????????????????????????????????????????????????????????");
        var queryJsonInsert = {
            $set: {
                // "_id":parseInt(randomInt(9,1000000))
                "Showtimes": showtimes,
                "NoofSeats": msg.reqBody.noOfSeats,
                "TicketPrice": parseInt(msg.reqBody.tktPrice),
                "ScreenNo": msg.reqBody.screenNo
            }

        };

        //   queryJsonArray.push(queryJson);

    }
    // console.log(queryJsonArray);
    {
        // console.log(msg.reqBody,"????????????????????????????????????????????????????");
        try {

            //  console.log("msg is-----------------------------------------------");


            var queryJsonSearch = {
                "ID": parseInt(msg.reqBody.ID)
            }


            console.log(msg.reqBody);

            MongoConPool.updateOne('movieHall', queryJsonSearch, queryJsonInsert, function (err, movie) {
                if (err) {
                    res.code = "401";
                    callback(null, res);
                    //  console.log("into error===============================================", err)
                }
                else {
                    // if (movie == null)
                    {
                        console.log("????????????????????????????????????????", movie);
                        res.code = 200;
                        callback(null, res);
                    }


                }

            });

        }


        catch
            (e) {
            res.code = "401";
            callback(null, res);
        }
    }


    // winston.remove(winston.transports.File);
    // winston.add(winston.transports.Console);
}


function handle_savePayment(msg, callback) {

    console.log("-----------------------------------------in handle_savePayment--", msg);
    var showtimes = [];

    console.log(showtimes);

    // console.log(showtimes, "--------------------------------------");
    var res = {};
    var i = 0;


    var d = new Date();
    var arrayDates = [];
    var queryJsonArray = [];


    //console.log(arrayDates);
    //  for (let i = 0; i < 6; i++)

    {

        //console.log(d,"??????????????????????????????????????????????????????????????????????????????????");


        //   queryJsonArray.push(queryJson);

    }
    // console.log(queryJsonArray);
    {
        // console.log(msg.reqBody,"????????????????????????????????????????????????????");
        try {

            //  console.log("msg is-----------------------------------------------");


            var queryJsonSearch = {
                "ID": parseInt(msg.reqBody.movies.id)
            };
            var queryJsonSearchInsert = {
                "ID": parseInt(msg.reqBody.movies.id),
                "Showtimes.time": msg.reqBody.showtime
            };


            console.log(msg.reqBody);
            console.log(queryJsonSearch)

            MongoConPool.findOne('movieHall', queryJsonSearch, function (err, movie) {
                if (err) {
                    res.code = 401;
                    callback(null, res);
                    //  console.log("into error===============================================", err)
                }
                else {
                    // if (movie[0] != null)
                    {

                        //{user_id : 123456 , "items.item_name":"my_item_one"} , {$inc: {"items.$.price": 10}}
                        //{"ID":649463,"Showtimes.time":"12:30p"},{$set:{"Showtimes.$.seats":4}}
                        console.log("?????????????????????????????????????????????????????", movie);
                        // console.log( parseInt(movie.NoofSeats),parseInt(msg.reqBody.total.noOfTickets));
                        var seatsMovie;
                        for (var i = 0; i < movie.Showtimes.length; i++) {
                            if (movie.Showtimes[i].time == msg.reqBody.showtime) {
                                seatsMovie = movie.Showtimes[i].seats;
                            }

                        }


                        console.log(parseInt(seatsMovie), parseInt(msg.reqBody.total.noOfTickets));
                        if (parseInt(seatsMovie) >= parseInt(msg.reqBody.total.noOfTickets)) {
                            //  var seatsLeft=parseInt(movie.NoofSeats)-parseInt(msg.reqBody.total.noOfTickets);

                            var queryJsonInsert = {
                                $inc: {
                                    "Showtimes.$.seats": -parseInt(msg.reqBody.total.noOfTickets)

                                }

                            };

                            MongoConPool.updateOne('movieHall', queryJsonSearchInsert, queryJsonInsert, function (err, movie) {
                                if (err) {
                                    res.code = "401";
                                    //  callback(null, res);
                                    console.log(err);
                                    console.log("error in adding movie-=-=============------------------------------=======")
                                }
                                else {

                                    console.log("-moviea updated-----------------------------------------------");
                                    res.result = movie;

                                    user.saveTransaction(msg, function (err, status) {
                                        if (err) {
                                            res.code = "401";
                                            //  callback(null, res);
                                            console.log(err);
                                            console.log("error in adding movie-=-=============------------------------------=======")
                                        }
                                        else {
                                            console.log(status);
                                            res.code = 200;
                                            callback(null, res);
                                        }


                                    });
                                    //res.code = 200;

                                    //
                                }
                            });

                        }
                        else {
                            res.code = 209;
                            callback(null, res);
                        }

                        // var batch = col.initializeOrderedBulkOp();
                        // console.log("adding movie================================================");
                        /*
      */
                    }


                    //  res.result = movie;
                    // res.code = 200;
                    // callback(null, res);
                }
            });

        }


            /* MongoConPool.insert('movieHall', queryJson, function (err, movie) {
                 if (err) {
                     res.code = "401";
                     callback(null, res);
                 }
                 else {

                     console.log(movie, "------------------------------------------------");
                     res.result = movie;
                     res.code = 200;
                     callback(null, res);
                 }
             });*/






            /*     MongoConPool.updateOne('movieHall', queryJsonSearch, queryJsonInsert, function (err, movie) {
                     if (err) {
                         res.code = "401";
                         callback(null, res);
                         //  console.log("into error===============================================", err)
                     }
                     else {
                         // if (movie == null)
                         {
                             console.log("????????????????????????????????????????",movie);
                             res.code=200;
                             callback(null,res);
                         }


                     }

                 });
            */


        catch
            (e) {
            res.code = "401";
            // callback(null, res);
        }
    }


}

function handle_cancelPayment(msg, callback) {

    console.log("-----------------------------------------in handle_cancelPayment--", msg);
    var showtimes = [];

    console.log(showtimes);

    // console.log(showtimes, "--------------------------------------");
    var res = {};
    var i = 0;


    var d = new Date();
    var arrayDates = [];
    var queryJsonArray = [];


    {
        console.log(msg.reqBody, "????????????????????????????????????????????????????");
        try {

            //  console.log("msg is-----------------------------------------------");


            var queryJsonSearch = {
                "ID": parseInt(msg.reqBody.movieid)
            };
            var queryJsonSearchInsert = {
                "ID": parseInt(msg.reqBody.movieid),
                "Showtimes.time": msg.reqBody.movietime
            };


            //  console.log(msg.reqBody);
            console.log(queryJsonSearch)

            var queryJsonInsert = {
                $inc: {
                    "Showtimes.$.seats": parseInt(msg.reqBody.nooftickets)

                }

            };
            console.log(queryJsonInsert, queryJsonSearchInsert)

            MongoConPool.updateOne('movieHall', queryJsonSearchInsert, queryJsonInsert, function (err, movie) {
                if (err) {
                    res.code = "401";
                    callback(null, res);
                    console.log(err);
                    console.log("error in adding movie-=-=============------------------------------=======")
                }
                else {
                    console.log(movie);
                    console.log("-moviea updated-----------------------------------------------");
                    res.result = movie;
                    callback(null, res)
                    //res.code = 200;

                    //
                }
            });

        }
        catch
            (e) {
            res.code = "401";
            callback(null, res);
        }
    }


}


exports.handle_request = handle_request;
exports.handle_MoviesnHalls = handle_MoviesnHalls;
exports.handle_addMovies = handle_addMovies;
exports.handle_getMovieListing = handle_getMovieListing;
exports.handle_saveMovieListing = handle_saveMovieListing;
exports.handle_geteditmoviesearch = handle_geteditmoviesearch;
exports.handle_savePayment = handle_savePayment;
exports.handle_addOwnerMovies = handle_addOwnerMovies;
exports.handle_cancelPayment = handle_cancelPayment;
exports.handle_getAllMovieHalls = handle_getAllMovieHalls;
exports.handle_savemoviehalledits = handle_savemoviehalledits;