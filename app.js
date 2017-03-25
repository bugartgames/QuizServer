global.__base = __dirname + '/';

global.API_KEY = "TEST_API_KEY";
global.ADMIN_API_KEY = "ADMIN_TEST_API_KEY";

global.DB = null;

require('./prototypes');

var express = require('express');
var mongo = require('mongodb');
var bodyParser = require('body-parser');
var MongoClient = mongo.MongoClient;
var app = express();
var adminModule = require('./admin');
var playerModule = require('./player');

// mongo database host
var mongoDBHost = "localhost";
// mongo database port
var mongoPort = 27017;
// mongo database name
var mongoDBName = "QuizMaker";

// initialize mongo db connection
MongoClient.connect('mongodb://' + mongoDBHost + ':' + mongoPort + '/' + mongoDBName, function(err, db)
{
    if (err)
        throw err;

    // define global variable to use it everywhere
    global.DB = db;

});

// for parsing application/json
app.use(bodyParser.json());

// set images folder as static
app.use("/images", express.static(__dirname + '/images'))

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded(
{
    extended: true
}));

// initialize administrator monule
// comment this line if you don't want to administrate database
adminModule.Initialize(app);

// initialize player module
playerModule.Initialize(app);

// port for listening
var serverPort = 3000;

// set listener
app.listen(serverPort, function()
{
    console.log('QuizMaker server app is started [PORT ' + serverPort + ']');
});
