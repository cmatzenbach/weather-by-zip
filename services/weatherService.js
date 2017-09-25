const mongoose = require('mongoose');
const http = require('http');
const keys = require('../config/keys');
const moment = require('moment');


// set up mongodb connection
mongoose.connect('mongodb://mongo:27017');
// mongoose.connect(keys.mongoUri);
const db = mongoose.connection;

const Weather = mongoose.model('weatherdata'); // is this the correct reference?


// Service Flow:
// submits zip
// check if weather for zip exists in db
// if not, go get from api
// if it does, check how old
// if < 1 hour, return weather from db
// if > 1 hour, go fetch updated weather from api, store in db, and return

module.exports = {

 fetchWeather: function (zipcode, callback) {
    // check if weather for zip exists in db
    db.collection('weatherdatas').findOne({ 'zip': zipcode }, function(err, res) {
      if (err) throw err;
      if (res) callback & callback(res);
      else callback & callback(false);
    });
  },

  checkExpiration: function (data) {
    // get current date in string to compare
    var currentDate = moment().format("MM/DD/YYYY HH:mm");
    // wunderground gives date in rfc822 format, so do some crazy things to get it to normal
    var updateDate = moment(data.postedTime).format('ddd, DD MMM YYYY HH:mm:ss Z');
    updateDate = moment(updateDate).utc().format("MM/DD/YYYY HH:mm");

    // get minute difference between two dates
    var timeDiff = moment(currentDate,"MM/DD/YYYY HH:mm").diff(moment(updateDate,"MM/DD/YYYY HH:mm"), 'minutes');
    console.log("TIME DIFF: " + timeDiff);

    if (timeDiff > 60) {
      // now we need to refresh data in db - TODO - currently just adding data to db
      module.exports.storeAreaWeather(data.zip);
    }
  },

  storeAreaWeather: function(zipcode) {
    // set up wunderground api connection values
    var options = {
      host: 'api.wunderground.com',
      path: '/api/' + keys.wundergroundKey + '/conditions/q/' + zipcode +'.json',
      method: 'GET',
      port: 80
    };

    // callback to send to wunderground api
    var callback = function(response) {
      console.log("CALLBACK");
      var str = '';
      response.on('data', function(chunk) {
        str += chunk;
      });
      response.on('end', function() {
        var jsonResult = JSON.parse(str);
        console.log(jsonResult);
        console.log(Date.parse(jsonResult.current_observation.observation_time_rfc822));
        // take json data and store in new model to send to db
        new Weather({
          zip: zipcode,
          city: jsonResult.current_observation.display_location.city,
          state: jsonResult.current_observation.display_location.state,
          weatherDesc: jsonResult.current_observation.weather,
          temp: jsonResult.current_observation.temperature_string,
          feelsLike: jsonResult.current_observation.feelslike_string,
          postedTime: jsonResult.current_observation.observation_time_rfc822
        }).save(function (err) {
          if (err) return console.error(err);
        });
      });
    };

    // send request
    http.request(options, callback).end();
  }
};




