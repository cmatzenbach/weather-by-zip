const mongoose = require('mongoose');
const { Schema } = mongoose;

// define model for weather data
const weatherSchema = new Schema({
  zip: Number,
  day1: String,
  day1forecast: String,
  day1forecastimg: String,
  day2: String,
  day2forecast: String,
  day2forecastimg: String,
  day3: String,
  day3forecast: String,
  day3forecastimg: String,
  postedTime: String
});

mongoose.model('weatherdata', weatherSchema);
