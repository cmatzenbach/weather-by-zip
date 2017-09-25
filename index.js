const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');
const keys = require('./config/keys');

const app = express();
require('./models/Weather');
//require('./services/weatherService');

// middleware parser to assign json to req.body
app.use(bodyParser.json());

// mongoose.connect('mongodb://mongo:27017/weather');
mongoose.connect("mongodb://mongo:27017");
const db = mongoose.connection;

var options = {
  host: 'api.wunderground.com',
  path: '/api/' + keys.wundergroundKey + '/conditions/q/33143.json',
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
});

require('./routes/Routes')(app);

if (process.env.NODE_ENV === 'production') {
  // ensuring express serves up production assets
  app.use(express.static('client/build'));

  // serve up index.html if express doesn't recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(5000);
