var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

router.post('/usertracking', function (req, res) {
console.log("from usertracking_topic entry");
console.log(req,req.body,"-----------------------------------------------------");
    kafka.make_request('usertracking_topic', {"reqBody":req.body}, function (err, results) {

        if (results.code == 200) {
            console.log(results);
            res.status(201).send(results)
        }
        else {
            console.log('Error', results);
        }

    });
});

module.exports = router;