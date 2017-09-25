module.exports = app => {

  var weatherService = require('../services/weatherService');

  // display current weather based on zip
  app.get('/api/weather', (req, res) => {
    res.send(); //send back weather json
  });
  // send zip to api to get weather data
  app.post('/api/weather', (req, res) => {
    var zip = Number(req.body.data);
    weatherService.fetchWeather(zip, function(entry) {
      if (entry) {
        weatherService.checkExpiration(entry);
      }
      else if (!entry) {
        weatherService.storeAreaWeather(zip);
      }
      res.send(entry);
    }); // send this to check for zip in database
  });
};
