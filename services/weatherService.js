const mongoose = require('mongoose');
const http = require('http');
const keys = require('../config/keys');
const moment = require('moment-timezone');
// const momentTz = require('moment-timezone');


// set up mongodb connection
// mongoose.connect('mongodb://mongo:27017');
mongoose.connect(keys.mongoUri);
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
    // get current time in string to compare
    // is this checking for day rollovers too?
    var currentTime = moment().utc();
    var updateTime = moment(data.postedTime);
    var timeDiff = currentTime.diff(updateTime, 'minutes');

    console.log('TIME DIFF: ' + timeDiff);
    if (timeDiff > 60) {
      // now we need to refresh data in db - TODO - currently just adding data to db
      module.exports.updateAreaWeather(data.zip);
    }
  },

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
        }).save(function (err, res) {
          cb(err, res);
        });
      });
    };

    // send request
    http.request(options, callback).end();
  },

  updateAreaWeather: function(zipcode) {
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
        console.log(jsonResult);
        // get current time as moment ISO string to store in db
        var currentTime = moment().utc().toISOString();

        // take json data and store in new model to send to db
        var updatedSchema = new Weather({
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
        });
        Weather.findOneAndUpdate({'zip': zipcode}, updatedSchema, {upsert: false}, function (err, res) {
          if (err) return console.error(err);
          else {
            console.log("GOOSE UPDATED");
            console.log(res);
          }
        });
      });
    };

    // send request
    http.request(options, callback).end();
  }
};




