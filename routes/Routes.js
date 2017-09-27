module.exports = app => {

  var weatherService = require('../services/weatherService');

  // display current weather based on zip
  app.get('/api/weather', (req, res) => {
    res.send(); //send back weather json
  });
  // send zip to api to get weather data
  app.post('/api/weather', (req, res) => {
    var zip = Number(req.body.data);
    weatherService.fetchWeather(zip, function(err, entry) {
      if (entry) {
        console.log("ROUTE 1");
        let expired = weatherService.checkExpiration(entry);
        if (expired) {
          weatherService.updateAreaWeather(zip, function(err, entry) {
            res.send(entry);
          });
        }
        else res.send(entry);
      }
      else if (!entry) {
        console.log("ROUTE 2");
        weatherService.storeAreaWeather(zip, function(err, entry) {
          res.send(entry);
        });
      }
    }); // send this to check for zip in database
  });
};
