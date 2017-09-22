const mongoose = require('mongoose');
const http = require('http');
const keys = require('../config/keys');

const Weather = mongoose.models('weatherdata'); // is this the correct reference?

// set up mongodb connection
// mongoose.connect('mongodb://mongo:27017/weather');
mongoose.connect(keys.mongoUri);
const db = mongoose.connection;

// set up wunderground api connection values
var options = {
  host: 'api.wunderground.com',
  path: '/api/' + keys.wundergroundKey + '/conditions/q/33143.json',
  method: 'GET',
  port: 80
};

// function to call out to wunderground api and store result in mongo
// is this refactored correctly? (min 5:00 of "Saving Model Instances")
// need to create a new instance of weather
// need to check to see if data is already in mongo; if it is and is less than an hour old,
// then don't overwrite record in mongo (min 1:30 of Mongoose Queries)
function storeAreaWeather(options, db) {

  var callback = function(response) {
    var str = '';
    response.on('data', function(chunk) {
      str += chunk;
    });
    response.on('end', function() {
      var jsonResult = JSON.parse(str);

      // new Weather({ temp: jsonsource.temp, city: jsonsource: city, ... }).save();
      db.collection('weatherdata').save(jsonResult, function(err, records) {
        if (err) throw err;
        console.log('record added');
      });

    });

  };

  http.request(options, callback).end();
}
