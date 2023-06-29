var connection = new require('./kafka/Connection');

var dummyData = require('./services/dummyData');
var getMoviesInHomePageCarousel = require('./services/getMoviesInHomePageCarousel');
var getMovieOverview = require('./services/getMovieOverview');
var user = require('./services/satish/user');
var redis = require('./redis');
var ad = require('./services/mandip/ad');

var producer = connection.getProducer();
var consumer = connection.getConsumer();


var topic_name3 = 'getMovieOverview_topic';
var consumer3 = connection.getConsumer(topic_name3);
var getMoviesGenreInSearchHandle = require('./services/getMoviesGenreInSearchHandle')


var saveReview = require('./services/saveReview');
var adminMovieSearch = require('./services/adminMovieSearch');
var updateMovieAdmin = require('./services/updateMovieAdmin');
var usertracking = require('./services/usertracking');


var getMoviesSearchHandle = require('./services/getMoviesSearchHandle');
var adminBills = require('./services/adminBills');
var adminBillsMonth = require('./services/getBillsMonth');


console.log('server is running');

//Models
var models = require("./models");

//Sync Database
models.sequelize.sync().then(function () {
    console.log('Nice! Database looks fine')
}).catch(function (err) {
    console.log(err, "Something went wrong with the Database Update!")
});

consumer.on('message', function (message) {
    console.log('message received');
    console.log(message);
    console.log(JSON.stringify(message.value));

    var data = JSON.parse(message.value);

    switch (message.topic) {
        case 'loadDataFromAPI_topic':
            dummyData.handle_request(data.data, function (err, res) {
                response(data, res);
                return;
            });
            break;
        case 'getMoviesInHomePageCarousel_topic':
            getMoviesInHomePageCarousel.handle_request(data.data, function (err, res) {
                response(data, res);
                return;
            })
            break;
        case 'getMovieOverview_topic':
            getMovieOverview.handle_request(data.data, function (err, res) {
                response(data, res);
                return;
            })
            break;

        case 'getMoviesInSearchPage_topic':
            getMoviesSearchHandle.handle_request(data.data, function (err, res) {
                response(data, res);
                return;
            });
            break;
        case 'getMoviesnHalls_topic':
            getMoviesSearchHandle.handle_MoviesnHalls(data.data, function (err, res) {
                response(data, res);
                return;
            })
            break;
        case 'savePayment_topic':
            getMoviesSearchHandle.handle_savePayment(data.data, function (err, res) {
                response(data, res);
                return;
            })
            break;

        case 'getMoviesHallLisiting_topic':
            getMoviesSearchHandle.handle_getMovieListing(data.data, function (err, res) {
                response(data, res);
                return;
            })
            break;
        case 'saveMovieListing_topic':
            getMoviesSearchHandle.handle_saveMovieListing(data.data, function (err, res) {
                response(data, res);
                return;
            })
            break;
        case 'saveTransaction_topic':
            user.saveTransaction(data.data, function (err, res) {
                response(data, res);
                return;
            })
            break;
        case 'addMovieHallAdmin_topic':
            user.addMovieHallAdmin(data.data, function (err, res) {
                response(data, res);
                return;
            })
            break;
        case 'getAllMovieHalls_topic':
            getMoviesSearchHandle.handle_getAllMovieHalls(data.data, function (err, res) {
                response(data, res);
                return;
            })
            break;
        case 'savemoviehalledits_topic':
            getMoviesSearchHandle.handle_savemoviehalledits(data.data, function (err, res) {
                response(data, res);
                return;
            })
            break;



        case 'getMoviesGenereInSearchPage_topic':
            getMoviesGenreInSearchHandle.handle_request(data.data, function (err, res) {          //Rishith
                console.log("Inside Server: ", data.data);
                response(data, res);
                return;
            });
            break;

        case 'geteditmoviesearch_topic':
            getMoviesSearchHandle.handle_geteditmoviesearch(data.data, function (err, res) {
                response(data, res);
                return;
            })

        case 'cancelbooking_topic':
            user.handle_cancelbooking(data.data, function(err,res){
                response(data,res);
                return;
            })

            break;
        case 'bookingsearch_topic':
            user.handle_bookingsearch(data.data, function (err, res) {
                response(data, res);
                return;
            })
            break;


        case 'addmovies_topic':
            getMoviesSearchHandle.handle_addMovies(data.data, function (err, res) {
                response(data, res);
                return;
            })
            break;
        case 'saveReview_topic':
            saveReview.handle_request(data.data, function (err, res) {
                response(data, res);
                return;
            })
            break;
        case 'getSearchedMoviesAdmin_topic':
            adminMovieSearch.handle_request(data.data, function (err, res) {
                response(data, res);
                return;
            })
            break;

        case 'UpdateMovieAdmin_topic':
            updateMovieAdmin.handle_request(data.data, function (err, res) {
                response(data, res);
                return;
            })
            break;


        case 'signup':
            user.signup(data.data, function (err, res) {
                response(data, res);
                return;
            });
            break;
        case 'signin':
            user.signin(data.data, function (err, res) {
                console.log("res: ", res);
                response(data, res);
                return;
            });
            break;
        case 'userDetails':
            user.userDetails(data.data, function (err, res) {
                console.log("res: ", res);
                response(data, res);
                return;
            });
            break;
        case 'savePayment':
            user.savePayment(data.data, function (err, res) {
                console.log("res: ", res);
                response(data, res);
                return;
            });
            break;
        case 'deletePayment':
            user.deletePayment(data.data, function (err, res) {
                console.log("res: ", res);
                response(data, res);
                return;
            });
            break;
        case 'basicInfo':
            user.basicInfo(data.data, function (err, res) {
                response(data, res);
                return;
            });
            break;
        case 'changeEmail':
            user.changeEmail(data.data, function (err, res) {
                console.log("Inside change email switch case", res);
                response(data, res);
                return;
            })
            break;
        case 'changePassword':
            user.changePassword(data.data, function (err, res) {
                response(data, res);
                return;
            })
            break

        case 'usertracking_topic':
            console.log("here")
            usertracking.usertrack(data.data, function (err, res) {
                response(data, res);
                return;
            })
            break
        case 'usertrackclose_topic':
            usertracking.usertrackclose(data.data, function (err, res) {
                response(data, res);
                return;
            })
            break
        case 'pageclicks_topic':
            console.log("reached pageclicks_topic");
            usertracking.pageclicks(data.data, function (err, res) {
                response(data, res);
                return;
            })
            break
        case 'movieclicks_topic':
            console.log("reached movieclicks_topic");
            usertracking.movieclicks(data.data, function (err, res) {
                response(data, res);
                return;
            })
            break

        case 'uploadimage':
            user.uploadImage(data.data, function (err, res) {
                response(data, res);
                return;
            })
            break

        case 'moviehallsignin':
            user.moviehallSignin(data.data, function (err, res) {
                console.log("res: ", res);
                response(data, res);
                return;
            });
            break;
        case 'adminsignin':
            user.adminSignin(data.data, function (err, res) {
                console.log("res: ", res);
                response(data, res);
                return;
            });
            break;
        case 'searchusers':
            user.searchUsers(data.data, function (err, res) {
                console.log("res: ", res);
                response(data, res);
                return;
            });
            break;
        case 'login_topic':
            ad.check_request(data.data, function (err, res) {
                console.log('after getProjectsthatbidbyfreelancer_request handle-->' + JSON.stringify(res));
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    console.log(data);
                });
                return;
            });
            break;

        case 'getRevenue_topic':
            ad.getRevenue_request(data.data, function (err, res) {
                console.log('after getRevenue_request handle-->' + JSON.stringify(res));
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    console.log(data);
                });
                return;
            });
            break;

        case 'searchMoviehallUsers':
            user.searchMoviehallUsers(data.data, function (err, res) {
                console.log("res: ", res);
                response(data, res);
                return;
            });
            break;
        case 'purchaseHistory':
            user.purchaseHistory(data.data, function (err, res) {
                console.log("res: ", res);
                response(data, res);
            });
            break;
        case 'deleteuser':
            user.deleteUser(data.data, function (err, res) {
                console.log("res: ", res);
                response(data, res);
            })
            break;
        case 'deleteMoviehallUser':
            user.deleteMoviehallUser(data.data, function (err, res) {
                console.log("res: ", res);
                response(data, res);
            })
            break;
        case 'editUserAccount':
            user.editUserAccount(data.data, function (err, res) {
                console.log("res: ", res);
                response(data, res);
            })
            break
        case 'purchaseHistory':
            user.purchaseHistory(data.data, function (err, res) {
                console.log("res: ", res);
                response(data, res);
            });
            break;
        case 'getMovieRevenue_topic':
            user.getmovierevenue(data.data, function (err, res) {
                console.log("res: ", res);
                response(data, res);
            });
            break;

        case 'getBillsAdmin_topic':
            adminBills.handle_request(data.data, function (err, res) {
                console.log("res: ", res);
                response(data, res);
            })
            break;
        case 'getBillsMonthAdmin_topic':
            adminBillsMonth.handle_request(data.data, function (err, res) {
                console.log("res: ", res);
                response(data, res);
            })
            break;

    }
});

function response(data, res) {
    var payloads = [
        {
            topic: data.replyTo,
            messages: JSON.stringify({
                correlationId: data.correlationId,
                data: res
            }),
            partition: 0
        }
    ];
    producer.send(payloads, function (err, data) {
        console.log(data);
    });
}
