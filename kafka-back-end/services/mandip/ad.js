//const mongo = require('./mongo');
//const url = 'mongodb://localhost:27017/fl';
//const url = 'mongodb://mandipgohil:mjgohil@ds155160.mlab.com:55160/fl';
var mongo = require("../mongo");
var MongoConPool = require("../mongoConnPool");
var mongoURL = 'mongodb://cmpe273:sreedevi@ds149613.mlab.com:49613/fandango';
var mysql = require('./mysql');

function check_request(msg, callback) {
    var res = {};
    console.log("In check_request:" + JSON.stringify(msg));

    var total_user = '', total_tickets = '', total_rev = '';
    var labels2 = [], series2 = [];
    var labels3 = [], series3 = [];
    var labels4 = [], series4 = [], tdar1 = [], tdar2 = [];

    var sqlQuery = "SELECT SUM(Amount) revenue FROM usertransactions;";
    mysql.runQuery((err, rows) => {
        console.log("inside if");
        if (rows.length > 0) {
            //callback(true);
            total_rev = rows[0].revenue;
        } else {
            //callback(false);
        }
    }, sqlQuery);

    var sqlQuery = "SELECT COUNT(*) total_users FROM users;";
    mysql.runQuery((err, rows) => {
        if (rows.length > 0) {
            //callback(true);
            //console.log("rows ---->"+JSON.stringify(rows));
            total_user = rows[0].total_users;
            //console.log("total user --->"+total_user);

            var sqlQuery1 = "SELECT SUM(nooftickets) total_tickets, SUM(Amount) total_revenue FROM usertransactions;";
            mysql.runQuery((err, rows) => {
                if (rows.length > 0) {
                    //callback(true);
                    console.log("Total Tickets ---->" + JSON.stringify(rows));
                    total_tickets = rows[0].total_tickets;

                    var sqlQuery2 = "SELECT moviename, SUM(Amount) revenue FROM usertransactions GROUP BY moviename ORDER BY SUM(Amount) DESC;";
                    mysql.runQuery((err, rows) => {
                        if (rows.length > 0) {
                            //callback(true);
                            console.log("Movies Revenue---->" + JSON.stringify(rows));
                            var len = rows.length;
                            var i = 0;

                            for (i = 0; i < len; i++) {
                                labels2[i] = rows[i].moviename;
                                series2[i] = rows[i].revenue;
                                //tdar[i] = rows[i];
                            }
                            // console.log(" Movie name labes --->"+labels2);
                            // console.log("Movie name series --->"+series2);

                            var sqlQuery3 = "SELECT city, SUM(Amount) revenue FROM usertransactions GROUP BY city ORDER BY SUM(Amount) DESC;";
                            mysql.runQuery((err, rows) => {
                                if (rows.length > 0) {
                                    //callback(true);
                                    console.log("City Revenue ---->" + JSON.stringify(rows));
                                    var len = rows.length;
                                    var i = 0;

                                    for (i = 0; i < len; i++) {
                                        labels3[i] = rows[i].city;
                                        series3[i] = rows[i].revenue;
                                    }
                                    // console.log("City labes --->"+labels3);
                                    // console.log("City series --->"+series3);

                                    var sqlQuery4 = "SELECT moviehall, SUM(nooftickets) revenue FROM usertransactions GROUP BY moviehall ORDER BY SUM(nooftickets) DESC;";
                                    mysql.runQuery((err, rows) => {
                                        if (rows.length > 0) {
                                            //callback(true);
                                            console.log("Movie Hall Revenue ---->" + JSON.stringify(rows));
                                            var len = rows.length;
                                            var i = 0;

                                            for (i = 0; i < len; i++) {
                                                labels4[i] = rows[i].moviehall;
                                                series4[i] = rows[i].revenue;
                                                tdar2[i] = rows[i];
                                            }
                                            // console.log("Movie Hall labels --->"+labels4);
                                            // console.log("Movie hall series --->"+series4);

                                        } else {
                                            //callback(false);
                                        }
                                    }, sqlQuery4);
                                } else {
                                    //callback(false);
                                }
                            }, sqlQuery3);
                        } else {
                            //callback(false);
                        }
                    }, sqlQuery2);
                } else {
                    //callback(false);
                }
            }, sqlQuery1);
        } else {
            //callback(false);
        }
    }, sqlQuery);


    //SELECT moviename, SUM(Amount) FROM usertransactions GROUP BY moviename ORDER BY SUM(Amount) DESC;
    //SELECT city, SUM(Amount) FROM usertransactions GROUP BY city ORDER BY SUM(Amount) DESC;
    //SELECT moviehall, SUM(nooftickets) FROM usertransactions GROUP BY moviehall ORDER BY SUM(nooftickets) DESC;


    mongo.connect(mongoURL, (db) => {
        console.log("callback from mongo-->" + db);
        var trackuser = [];
        var track = [];
        //Tracking of User
        var collection = db.collection('usertrack');
        collection.find({status: "close"}).limit(30).toArray(function (err, docs) {
            console.log("User Tacking ----->" + JSON.stringify(docs));

            var i = 0, j = 0, k = 0;
            var doclen = docs.length;
            for (k = 0; k < doclen; k++) {
                trackuser[k] = docs[k].username;
                track[k] = docs[k].pages;
            }
            console.log("trackuser ----->" + JSON.stringify(track));
        });//Track user temp
        //Page click counts to find area that less seen
        var collection = db.collection('pageclicks');
        collection.find({}).sort({count: 1}).limit(5).toArray(function (err, docs) {
            console.log("sort page click ----->" + JSON.stringify(docs));
            var pageslessseen = [], lesscount = [];
            var i = 0;
            var len = docs.length;

            for (i = 0; i < len; i++) {
                pageslessseen[i] = docs[i].pagename;
                lesscount[i] = docs[i].count;
            }
            // console.log("pageslessseen --->" + JSON.stringify(pageslessseen));
            // console.log("lesscount --->" + JSON.stringify(lesscount));

            //Movie Click counts
            var collection = db.collection('movieclicks');
            collection.find({}).toArray(function (err, docs) {
                var movieclick = [], mcount = [];
                var i = 0;
                var len = docs.length;
                for (i = 0; i < len; i++) {
                    movieclick[i] = docs[i].moviename;
                    mcount[i] = docs[i].count;
                }
                // console.log("Movies --->" + JSON.stringify(movieclick));
                // console.log("count --->" + JSON.stringify(mcount));

                //Page click counts
                var collection = db.collection('pageclicks');
                collection.find({}).toArray(function (err, docs) {
                    //console.log("clicks --->"+JSON.stringify(docs));
                    var pages = [], count = [];
                    var i = 0;
                    var len = docs.length;
                    for (i = 0; i < len; i++) {
                        pages[i] = docs[i].pagename;
                        count[i] = docs[i].count;
                    }
                    //console.log("Pages --->" + JSON.stringify(pages));
                    //console.log("count --->" + JSON.stringify(count));

                    //Calculate the Movies with rating
                    var collection = db.collection('movies');
                    collection.find({}).toArray(function (err, docs) {
                        //console.log("Result in Find---->"+JSON.stringify(docs[7].reviews));
                        var doclen = docs.length;
                        //console.log("len of docs --->"+doclen);
                        var i = 0, ts = 0, j = 0, c = 0;
                        var avg = [], movies = [];

                        for (j = 0; j < doclen; j++) {
                            var avgstar = 0;
                            var review = docs[j].reviews;
                            var len = review.length;
                            ts = 0;
                            //console.log("\n review each ---->"+JSON.stringify(review));
                            //console.log("review len  --->"+len);
                            if (len === 0) {
                                continue;
                            } else {
                                for (i = 0; i < len; i++) {
                                    ts += review[i].stars;
                                }
                                avgstar = Number(ts / len);
                                avg[c] = avgstar;
                                movies[c] = docs[j].title;
                                c = c + 1;
                            }
                        }
                        console.log("avg  starts movies -->" + avg);
                        console.log("starts movies -->" + movies);

                        collection.aggregate([{
                            $group: {
                                _id: "title",
                                total_movie: {$sum: 1}
                            }
                        }]).toArray(function (err, docs) {
                            console.log("Result  -->" + JSON.stringify(docs));
                            if (docs.length > 0) {
                                res.code = 200;
                                res.value = "Successfully count Movies";
                                res.total_movies = docs[0].total_movie;
                                res.avg = avg;
                                res.movies = movies;

                                res.pages = pages;//Pages that clicks
                                res.count = count;//count for Pages

                                res.movieclick = movieclick;//Movies that clicks
                                res.mcount = mcount;//count for Movie Click

                                res.pageslessseen = pageslessseen;//Movies that clicks
                                res.lesscount = lesscount;//count for Movie Click

                                res.trackuser = trackuser;
                                res.track = track;

                                res.total_user = total_user;
                                res.total_tickets = total_tickets;
                                res.total_rev = total_rev;
                                res.labels2 = labels2;
                                res.labels3 = labels3;
                                res.labels4 = labels4;

                                res.series2 = series2;
                                res.series3 = series3;
                                res.series4 = series4;

                                res.tdar2 = tdar2;
                                res.tdar1 = tdar1;

                                console.log("total user --->" + total_user);
                                callback(null, res);
                            } else {
                                res.code = 401;
                                res.value = "Your Graph API is not working";
                                res.email = msg.email;
                                callback(null, res);
                            }
                        }); //Total movie count end
                    }); //Movie rating graph end
                });//Page count end
            });//Movies Click count
        });//Find 5 Less seen Pages
    });// Mongo connection
}

exports.check_request = check_request;


function getRevenue_request(msg, callback) {
    var res = {};
    console.log("In getRevenue_request:" + JSON.stringify(msg));
    var movierev = [];
    var moviehallrev = [];

    var sqlQuery4 = "SELECT moviehall, SUM(Amount) revenue FROM usertransactions GROUP BY moviehall ORDER BY SUM(nooftickets) DESC;";
    mysql.runQuery((err, rows) => {
        if (rows.length > 0) {
            //callback(true);
            console.log("Movie Hall Revenue ---->" + JSON.stringify(rows));
            var len = rows.length;
            var i = 0;

            for (i = 0; i < len; i++) {
                movierev.push([rows[i].moviehall, rows[i].revenue]);
            }
            //console.log(movierev);
            var sqlQuery2 = "SELECT moviename, SUM(Amount) revenue FROM usertransactions GROUP BY moviename ORDER BY SUM(Amount) DESC;";
            mysql.runQuery((err, rows) => {
                if (rows.length > 0) {
                    //callback(true);
                    console.log("Movies Revenue---->" + JSON.stringify(rows));
                    var len = rows.length;
                    var i = 0;

                    for (i = 0; i < len; i++) {
                        moviehallrev.push([rows[i].moviename, rows[i].revenue]);
                    }
                    //console.log("movierev---->"+moviehallrev);
                    res.movierev = movierev;
                    res.moviehallrev = moviehallrev;
                    callback(null, res);
                }
            }, sqlQuery2);
        } else {
            //callback(false);
        }
    }, sqlQuery4);


}

exports.getRevenue_request = getRevenue_request;
