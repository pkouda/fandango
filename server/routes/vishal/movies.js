
var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client')

router.get('/getMoviesInHomePageCarousel', function (req, res) {

    kafka.make_request('getMoviesInHomePageCarousel_topic', {}, function (err, results) {

        if (results.code == 200) {
            console.log(results);
            res.status(201).send(results.movies)
        }
        else {
            console.log('roo', results);
            // res.status(401).end()
        }

    });
});


router.get('/getMovieOverview', function (req, res) {

    console.log(req.param('tmdbid'));

    kafka.make_request('getMovieOverview_topic', {"tmdbid": req.param('tmdbid')}, function (err, results) {


        if (results.code == 200) {
            console.log("inresult", results);
            res.status(201).send(results.movie)
        }
        else {
            console.log('roo', results);
            res.status(401).end()
        }

    });
});


router.post('/saveReview', function (req, res, next) {


    console.log(req.param('projectName'))
    console.log(req.param('projDesc'))
    console.log(req.param('tmdbid'))
    console.log(req.param('stars'))
    console.log(req.param('userEmail'))
    console.log(req.param('userFirstName'))


    kafka.make_request('saveReview_topic', {
        "title": req.param('projectName'),
        "body" : req.param('projDesc'),
        "stars" : req.param('stars'),
        "tmdbid" : req.param('tmdbid'),
        "userEmail": req.param('userEmail'),
        "userFirstName" : req.param('userFirstName')
    }, function (err, results) {
        if (results.code == 200) {
            console.log("inresult", results);
            res.status(201).end()
        }
        else {
            console.log('roo', results);
            res.status(401).end()
        }

    });


})

module.exports = router;

