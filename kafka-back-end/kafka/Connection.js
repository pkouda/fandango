var kafka = require('kafka-node');

function ConnectionProvider() {
    this.getConsumer = function (topic_name) {

        this.client = new kafka.Client("localhost:2181");
        this.kafkaConsumerConnection = new kafka.Consumer(this.client, [
            //vishal
            {topic: 'loadDataFromAPI_topic', partition: 0},
            {topic: 'getMoviesInHomePageCarousel_topic', partition: 0},
            {topic: 'getMovieOverview_topic', partition: 0},
            {topic: 'saveReview_topic', partition: 0},
            {topic: 'getSearchedMoviesAdmin_topic', partition: 0},
            {topic: 'UpdateMovieAdmin_topic', partition: 0},
            {topic: 'getBillsAdmin_topic', partition: 0},
            {topic: 'getBillsMonthAdmin_topic', partition: 0},


            //pranith
            {topic: 'getMoviesInSearchPage_topic', partition: 0},
            {topic: 'getMoviesnHalls_topic', partition: 0},
            {topic: 'addmovies_topic', partition: 0},
            {topic: 'saveMovieListing_topic', partition: 0},
            {topic: 'getMoviesHallLisiting_topic', partition: 0},
            {topic: 'geteditmoviesearch_topic', partition: 0},
            {topic: 'savePayment_topic', partition: 0},
            {topic: 'addMovieHallAdmin_topic', partition: 0},
            {topic: 'bookingsearch_topic', partition: 0},
            {topic: 'cancelbooking_topic', partition: 0},
            {topic: 'getAllMovieHalls_topic', partition: 0},
            {topic: 'savemoviehalledits_topic', partition: 0},



            {topic: 'getMoviesGenereInSearchPage_topic', partition: 0}, //Rishith
            {topic: 'addMovieHallAdmin_topic', partition: 0},
            {topic: 'bookingsearch_topic', partition: 0},
            {topic: 'getMoviesGenereInSearchPage_topic',partition:0}, //Rishith

            //satish
            {topic: 'signup', partition: 0},
            {topic: 'signin', partition: 0},
            {topic: 'moviehallsignin', partition: 0},
            {topic: 'adminsignin', partition: 0},
            {topic: 'purchaseHistory', partition: 0},
            {topic: 'deleteuser', partition: 0},
            {topic: 'deleteMoviehallUser', partition: 0},
            {topic: 'editUserAccount', partition: 0},
            {topic: 'editMoviehallUserAccount', partition: 0},
            {topic: 'getMovieRevenue_topic', partition: 0},


            {topic: 'searchMoviehallUsers', partition: 0},
            {topic: 'basicInfo', partition: 0},
            {topic: 'changeEmail', partition: 0},
            {topic: 'changePassword', partition: 0},
            {topic: 'savePayment', partition: 0},
            {topic: 'userDetails', partition: 0},
            {topic: 'deletePayment', partition: 0},


            //mangesh
            {topic: 'usertracking_topic', partition: 0},
            {topic: 'pageclicks_topic', partition: 0},
            {topic: 'movieclicks_topic', partition: 0},
            {topic: 'usertrackclose_topic', partition: 0},

            {topic: 'uploadimage', partition: 0},

            {topic: 'uploadimage', partition: 0},
            {topic: 'login_topic', partition: 0},
            {topic: 'searchusers', partition: 0},
            {topic: 'getRevenue_topic', partition: 0}


        ]);
        this.client.on('ready', function () {
            console.log('client ready!')
        })

        return this.kafkaConsumerConnection;
    };

    //Code will be executed when we start Producer
    this.getProducer = function () {
        this.client = new kafka.Client("localhost:2181");
        var HighLevelProducer = kafka.HighLevelProducer;
        this.kafkaProducerConnection = new HighLevelProducer(this.client);
        //this.kafkaConnection = new kafka.Producer(this.client);
        console.log('producer ready');

        return this.kafkaProducerConnection;
    };
}

exports = module.exports = new ConnectionProvider;
