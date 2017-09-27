module.exports = app => {

  var weatherService = require('../services/weatherService');

  // only one route for API, to get weather from form in frontend
  app.get('/api/weather', (req, res) => {
    var zip = Number(req.query.data);

    weatherService.fetchWeather(zip, function(err, entry) {

      // if data exists in db
      if (entry) {
        let expired = weatherService.checkExpiration(entry);
        if (expired) {
          weatherService.updateAreaWeather(zip, function(err, entry) {
            if (err) throw err;
            res.send(entry);
          });
        }
        else res.send(entry);
      }

      // if data doesn't already exist in db
      else if (!entry) {
        weatherService.storeAreaWeather(zip, function(err, entry) {
          if (err) throw err;
          res.send(entry);
        });
      }
    });
  });
};
