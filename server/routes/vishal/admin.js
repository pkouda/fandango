var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client')

router.get('/movieSearch', function (req, res) {

    console.log(req.param('term'));
    console.log("vish")

    kafka.make_request('getSearchedMoviesAdmin_topic', {'term': req.param('term')}, function (err, results) {

        if (results.code == 200) {
            console.log(results);
            res.status(201).send(results.movies)
        }
        else {
            console.log('roo', results);
            res.status(401).end()
        }

    });
});


router.get('/bills', function (req, res) {

    console.log(req.param('date'));
    console.log("vish")

    kafka.make_request('getBillsAdmin_topic', {'date': req.param('date')}, function (err, results) {

        if (results.code == 201) {
            console.log(results);
            res.status(201).json({'bills': results.bills});
        }
        else {
            console.log('roo', results);
            res.status(401).end()
        }

    });
});



router.get('/billMonth', function (req, res) {

    console.log(req.param('date'));
    console.log("vish")

    kafka.make_request('getBillsMonthAdmin_topic', {'date': req.param('date')}, function (err, results) {

        if (results.code == 201) {
            console.log(results);
            res.status(201).json({'bills': results.bills});
        }
        else {
            console.log('roo', results);
            res.status(401).end()
        }

    });
});


router.post('/saveMovie', function (req, res, next) {

    // console.log(req.param('title'));

    console.log(req.param('tmdbid'),
        req.param('title'),
        req.param('original_language'),
        req.param('overview'),
        req.param('release_date'),
        req.param('runtime'),
        req.param('status'),
        req.param('tagline'),
        req.param('genre'),
        req.param('youtube_trailer'),
        req.param('rating'))


    kafka.make_request('UpdateMovieAdmin_topic',
        {
            tmdbid: req.param('tmdbid'),
            title: req.param('title'),
            original_language: req.param('original_language'),
            overview: req.param('overview'),
            release_date: req.param('release_date'),
            runtime: req.param('runtime'),
            status: req.param('status'),
            tagline: req.param('tagline'),
            genre: req.param('genre'),
            youtube_trailer: req.param('youtube_trailer'),
            rating: req.param('rating'),
        },

        function (err, results) {
            console.log('in result');
            if (results.code == 200) {
                console.log(results);
                res.status(201).end();
            }
            else {
                res.status(401).json({
                    message: results.message
                })
            }

        });


});









module.exports = router;