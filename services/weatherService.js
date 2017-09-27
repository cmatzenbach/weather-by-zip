const mongoose = require('mongoose');
const http = require('http');
const keys = require('../config/keys');
const moment = require('moment-timezone');

// set up mongodb connection
// mongoose.connect('mongodb://mongo:27017');
mongoose.connect(keys.mongoUri);
const db = mongoose.connection;

const Weather = mongoose.model('weatherdata'); // is this the correct reference?

module.exports = {

  // check if weather for zip already exists in db
 fetchWeather: function (zipcode, callback) {
    // check if weather for zip exists in db
    db.collection('weatherdatas').findOne({ "zip": zipcode }, function(err, res) {
      if (err) throw err;
      if (res) callback(err, res);
      else callback(err, false);
    });
  },

  // check if data for that zipcode is expired; return boolean
  checkExpiration: function (data) {
    // get current time in moment obj to compare
    var currentTime = moment().utc();
    // get posted time from db in moment obj to compare
    var updateTime = moment(data.postedTime);
    var timeDiff = currentTime.diff(updateTime, 'minutes');

    if (timeDiff > 60) {
      return true;
    }
    else {
      return false;
    }
  },

  // grab weather data from wunderground API and store in db
  storeAreaWeather: function(zipcode, cb) {
    // set up wunderground api connection values
    var options = {
      host: 'api.wunderground.com',
      path: '/api/' + keys.wundergroundKey + '/forecast/q/' + zipcode +'.json',
      method: 'GET',
      port: 80
    };

    // callback to send to wunderground api
    var callback = function(response) {
      var str = '';
      response.on('data', function(chunk) {
        str += chunk;
      });
      response.on('end', function() {
        var jsonResult = JSON.parse(str);

        // if zip doesn't exist, return error and break
        if (jsonResult.response.error) {
          cb(null, {error: 'Zip Code not found'});
          return '';
        }

        // get current time as moment ISO string to store in db
        var currentTime = moment().utc().toISOString();

        // take json data and store in new model to send to db
        new Weather({
          zip: zipcode,
          day1: jsonResult.forecast.txt_forecast.forecastday[0].title,
          day1forecast: jsonResult.forecast.txt_forecast.forecastday[0].fcttext,
          day1forecastimg: jsonResult.forecast.txt_forecast.forecastday[0].icon_url,
          day2: jsonResult.forecast.txt_forecast.forecastday[2].title,
          day2forecast: jsonResult.forecast.txt_forecast.forecastday[2].fcttext,
          day2forecastimg: jsonResult.forecast.txt_forecast.forecastday[2].icon_url,
          day3: jsonResult.forecast.txt_forecast.forecastday[4].title,
          day3forecast: jsonResult.forecast.txt_forecast.forecastday[4].fcttext,
          day3forecastimg: jsonResult.forecast.txt_forecast.forecastday[4].icon_url,
          postedTime: currentTime
        })
        .save(function (err, res) {
          cb(err, res);
        });
      });
    };

    // send request
    http.request(options, callback).end();
  },

  // called when weather exists in db but is expired; get new weather data and overwrite in db
  updateAreaWeather: function(zipcode, cb) {
    console.log("UPDATE");
    // set up wunderground api connection values
    var options = {
      host: 'api.wunderground.com',
      path: '/api/' + keys.wundergroundKey + '/forecast/q/' + zipcode +'.json',
      method: 'GET',
      port: 80
    };

    // callback to send to wunderground api
    var callback = function(response) {
      var str = '';
      response.on('data', function(chunk) {
        str += chunk;
      });
      response.on('end', function() {
        var jsonResult = JSON.parse(str);

        // get current time as moment ISO string to store in db
        var currentTime = moment().utc().toISOString();

        // take json data and store in empty object to update model in db
        // do not assign to model object, or id's won't match and mongo won't allow update
        var updatedSchema = {
          zip: zipcode,
          day1: jsonResult.forecast.txt_forecast.forecastday[0].title,
          day1forecast: jsonResult.forecast.txt_forecast.forecastday[0].fcttext,
          day1forecastimg: jsonResult.forecast.txt_forecast.forecastday[0].icon_url,
          day2: jsonResult.forecast.txt_forecast.forecastday[2].title,
          day2forecast: jsonResult.forecast.txt_forecast.forecastday[2].fcttext,
          day2forecastimg: jsonResult.forecast.txt_forecast.forecastday[2].icon_url,
          day3: jsonResult.forecast.txt_forecast.forecastday[4].title,
          day3forecast: jsonResult.forecast.txt_forecast.forecastday[4].fcttext,
          day3forecastimg: jsonResult.forecast.txt_forecast.forecastday[4].icon_url,
          postedTime: currentTime
        };
        Weather.findOneAndUpdate({"zip": zipcode}, updatedSchema, {upsert: false}, function (err, res) {
          cb(err, res);
        });
      });
    };

    // send request
    http.request(options, callback).end();
  }
};




