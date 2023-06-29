var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

router.post('/getMoviesInSearchPage', function (req, res) {
console.log("from getMoviesInSearchPage_topic entry");
console.log(req.body,"-----------------------------------------------------");
    kafka.make_request('getMoviesInSearchPage_topic', {"reqBody":req.body}, function (err, results) {

        if (results.code == 200) {
            console.log(results);
            res.status(201).send(results)
        }
        else {
            console.log('fuckedup', results);
            console.log('fuckedup', results);
            // res.status(401).end()
        }

    });
});

router.post('/usertrack', function (req, res) {
console.log("from usertracking_topic entry");
console.log(req,req.body,"-----------------------------------------------------");
    kafka.make_request('usertracking_topic', {"reqBody":req.body}, function (err, results) {
        console.log('Results: ', results);
        res.status(201).send(results)       
        
    });
});

router.post('/usertrackclose', function (req, res) {
console.log("from usertrackclose_topic entry");
console.log(req,req.body,"-----------------------------------------------------");
    kafka.make_request('usertrackclose_topic', {"reqBody":req.body}, function (err, results) {
        console.log('Results: ', results);
        res.status(201).send(results)       
        
    });
});

router.post('/pageclicks', function (req, res) {
console.log("from pageclicks_topic entry");
console.log(req,req.body,"-----------------------------------------------------");
    kafka.make_request('pageclicks_topic', {"reqBody":req.body}, function (err, results) {
        
        console.log('Results: ', results);
        res.status(201).send(results);       
        
    });
});

router.post('/movieclicks', function (req, res) {
console.log("from movieclicks_topic entry");
console.log(req,req.body,"-----------------------------------------------------");
    kafka.make_request('movieclicks_topic', {"reqBody":req.body}, function (err, results) {
        
        console.log('Results: ', results);
        res.status(201).send(results);       
        
    });
});

// getmoviesnhalls
//savePayment
router.post('/getmoviesnhalls', function (req, res) {
    console.log("from getMoviesInSearchPage_topic entry");
    console.log("-----------------------------------------------------");
    kafka.make_request('getMoviesnHalls_topic',{"reqBody":req.body}, function (err, results) {

        if (results.code == 200) {
            console.log(results);
            res.status(201).send(results)
        }
        else {
            console.log('fuckedup', results);
            console.log('fuckedup', results);
            // res.status(401).end()
        }

    });
});
router.post('/savePayment', function (req, res) {
    console.log("from savePayment_topic entry");
    console.log("-----------------------------------------------------");
    kafka.make_request('savePayment_topic',{"reqBody":req.body}, function (err, results) {

        if (results.code == 200) {
            console.log(results);
            res.booking=true;
            res.status(201).send(results)
        }
        else if(results.code == 209) {
            console.log(results);
            res.booking=false;
            res.status(206).send("no seats available")
        }
        else {
            console.log('fuckedup', results);
            console.log('fuckedup', results);
            res.booking=false;
             res.status(201).send()
        }

    });
});
router.post('/editmoviesearch', function (req, res) {
    console.log("from geteditmoviesearch_topic entry");
    console.log("-----------------------------------------------------");
    kafka.make_request('geteditmoviesearch_topic',{"reqBody":req.body}, function (err, results) {

        if (results.code == 200) {
            console.log(results);
            res.status(201).send(results)
        }
        else {
            console.log('fuckedup', results);
            console.log('fuckedup', results);
            // res.status(401).end()
        }

    });
});
router.post('/cancelbooking', function (req, res) {
    console.log("from cancelbooking_topic entry");
    console.log("-----------------------------------------------------");
    kafka.make_request('cancelbooking_topic',{"reqBody":req.body}, function (err, results) {

        if (results.code == 200||results.code == 201) {
            console.log(results);
            res.status(201).send(results)
        }
        else {
            console.log('fuckedup', results);
            console.log('fuckedup', results);
            // res.status(401).end()
        }

    });
});

router.post('/bookingsearch', function (req, res) {
    console.log("from bookingsearch_topic entry");
    console.log("-----------------------------------------------------");
    kafka.make_request('bookingsearch_topic',{"reqBody":req.body}, function (err, results) {

        if (results.code == 200||results.code == 201) {
            console.log(results);
            res.status(201).send(results)
        }
        else {
            console.log('fuckedup', results);
          //  console.log('fuckedup', results);
             res.status(201).send(results)
        }

    });
});



// Get Movies by Genre Search
// Rishith

router.get('/getMoviesGenreInSearchPage', function (req, res) {
    console.log("from getMoviesGenreInSearchPage_topic entry: 'Request -> '", req.query.action);
    console.log(req,req.body,"-----------------------------------------------------");
    kafka.make_request('getMoviesGenereInSearchPage_topic', {"reqBody":req.query.action}, function (err, results) {

        if (results.code == 200) {
            console.log(results);
            res.status(201).send(results)
        }
        else {
            console.log('fuckedup', results);
            console.log('fuckedup', results);
            // res.status(401).end()
        }

    });
});



router.post('/savemovieListing', function (req, res) {

    console.log("from saveMovieListing_topic entry",req.body);
    console.log("-----------------------------------------------------");
    kafka.make_request('saveMovieListing_topic',{"reqBody":req.body}, function (err, results) {

        if (results.code == 200) {
            console.log(results);
            res.status(201).send(results)
        }
        else {
            console.log('fuckedup', results);
            console.log('fuckedup', results);
            // res.status(401).end()
        }

    });
});


router.post('/getmovieshalllisting', function (req, res) {

    console.log("from getMoviesHallLisiting_topic entry",req.body);
    console.log("-----------------------------------------------------");
    kafka.make_request('getMoviesHallLisiting_topic',{"reqBody":req.body}, function (err, results) {

        if (results.code == 200) {
            console.log(results);
            res.status(201).send(results)
        }
        else {
            console.log('fuckedup', results);
            console.log('fuckedup', results);
            // res.status(401).end()
        }

    });
});

router.post('/addMovieHallAdmin', function (req, res) {
    // console.log("from addmovies_topic entry");
    console.log("-----------------------------------------------------");
    console.log(req.body.Date);
    kafka.make_request('addMovieHallAdmin_topic',{"reqBody":req.body}, function (err, results) {

        if (results.code == 200) {
            // console.log(results);
            res.status(201).send(results)
        }
        else if(results.code=400){

            //console.log(results);
            res.status(208).send("movie not added");
            // res.status(401).end()
        }else {
            console.log('fuckedup', results);

        }

    });
});
router.post('/savemoviehalledits', function (req, res) {
    // console.log("from addmovies_topic entry");
   // console.log("-----------savemoviehalledits------------------------------------------");
  //  console.log(req.body.Date);
    kafka.make_request('savemoviehalledits_topic',{"reqBody":req.body}, function (err, results) {
    console.log(results,"?????????????????????????????????");
        if (results.code == 200||results.code == 201) {
            console.log("-----------savemoviehalledits------------------------------------------");
            // console.log(results);
            res.status(201).send(results)
        }
        else if(results.code=400){

            //console.log(results);
            res.status(208).send("movie not added");
            // res.status(401).end()
        }else {
            console.log('fuckedup', results);

        }

    });
});

router.post('/getAllMovieHalls', function (req, res) {
    // console.log("from addmovies_topic entry");
    console.log("-----------------------------------------------------");
    console.log(req.body.Date);
    kafka.make_request('getAllMovieHalls_topic',{"reqBody":req.body}, function (err, results) {

        if (results.code == 200) {
            // console.log(results);
            res.status(201).send(results)
        }
        else if(results.code=400){

            //console.log(results);
            res.status(208).send("movie halls not found");
            // res.status(401).end()
        }else {
            console.log('fuckedup', results);

        }

    });
});



router.post('/addmovies', function (req, res) {
   // console.log("from addmovies_topic entry");
    console.log("-----------------------------------------------------");
    console.log(req.body.Date);
    kafka.make_request('addmovies_topic',{"reqBody":req.body}, function (err, results) {

        if (results.code == 200) {
           // console.log(results);
            res.status(201).send(results)
        }
        else if(results.code=400){

            //console.log(results);
            res.status(208).send("movie not added");
            // res.status(401).end()
        }else {
            console.log('fuckedup', results);

        }

    });
});



router.post('/savedetails', function (req, res, next) {


    if (req.session) {
        const username = req.param('username');
        const email = req.param('email');
        let phoneNumber = '';
        let aboutMe = '';
        let skills = '';

        if (req.param('phoneNumber')) {
            phoneNumber = req.param('phoneNumber');
        }

        if (req.param('aboutMe')) {
            aboutMe = req.param('aboutMe');
        }

        if (req.param('skills')) {
            skills = req.param('skills');
        }

        kafka.make_request('saveProfileDetails_topic',
            {
                oldname: req.session.username,
                username: username,
                aboutMe: aboutMe,
                skills: skills,
                phoneNumber: phoneNumber,
                email: email,
            },

            function (err, results) {
                console.log('in result');
                if (results.code == 200) {
                    console.log(results);
                    res.status(201).send(results.result)
                }
                else {
                    res.status(401).json({
                        message: results.message
                    })
                }

            });
    }
    else {
        res.status(401).end();
    }

})

module.exports = router;