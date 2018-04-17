var express = require('express');
var router = express.Router();
var mysql = require('../../routes/mysql');
var kafka = require('../kafka/client')
var multer = require('multer');

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public/images')
//     },
//     filename: function (req, file, cb) {
//         cb(null, req.session.username + '-' + Date.now() + '.jpeg')
//     }
// });
//
// var upload = multer({storage: storage});
//
// var type = upload.single('mypic');

router.post('/dummyData', function (req, res, next) {

    console.log(req.param('vishal'))

    // res.status(201).end();


    kafka.make_request('loadDataFromAPI_topic', {
        title: req.param('vishal')
    }, function (err, results) {
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

});


router.get('/', function (req, res) {
    if (req.session) {
        var username = req.session.username;
        kafka.make_request('profile_topic', {"username": username,}, function (err, results) {

            if (results.code == 200) {
                console.log(results);
                // req.session.username = req.param('username');
                res.status(201).send(results.result)
            }
            else {
                console.log('roo', results);
                res.status(401).end()
            }

        });
    }
    else {
        console.log("NoValid");
        res.status(401).send("NO")
    }
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