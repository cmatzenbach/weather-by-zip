const mongoose = require('mongoose');
const { Schema } = mongoose;

// city, state, time, weather, temperature, feelsLike
// define model for weather data
const weatherSchema = new Schema({
  city: String,
  state: String,
  weatherDesc: String,
  temp: String,
  feelsLike: String,
  postedTime: String // this shouldn't be a string
});

mongoose.model('weatherdata', weatherSchema);
