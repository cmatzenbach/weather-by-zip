const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const keys = require('./config/keys');
const app = express();
require('./models/Weather');

// mongoose.connect('mongodb://mongo:27017/weather');
mongoose.connect(keys.mongoUri);
const db = mongoose.connection;

var apikey = '30a8bde24d1b32a9';
var options = {
  host: 'api.wunderground.com',
  path: '/api/' + apikey + '/conditions/q/33143.json',
  method: 'GET',
  port: 80
};

app.get('/', function(req, res) {
  // res.send({ hi: 'there' });

  var callback = function(response) {
    var str = '';
    response.on('data', function(chunk) {
      str += chunk;
    });
    response.on('end', function() {
      var jsonResult = JSON.parse(str);

      db.collection('weatherdata').save(jsonResult, function(err, records) {
        if (err) throw err;
        console.log('record added');
      });

      res.send(jsonResult);
    });

  };

  http.request(options, callback).end();
  // var request = http.request(options, function(response) {
  //   var str = '';
  //   response.on('data', function(chunk) {
  //     str += chunk;
  //   });
  //   response.on('end', function() {
  //     // var jsonResult = JSON.parse(str);
  //     console.log(str);
  //     res.send(str);
  //     // db.collection('weatherdata').save(jsonResult, function(err, records) {
  //     //   if (err) throw err;
  //     //   console.log('record added');
  //     // });
  //   });
  // });
});

app.listen(5000);
