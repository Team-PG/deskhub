'use strict';
const superagent = require('superagent');

function Weather(obj){
  this.forecast = obj.weather.description;
  this.time = new Date(obj.ts * 1000).toDateString();
  this.high = Math.round(obj.high_temp * (9/5) + 32);
  this.low = Math.round(obj.low_temp * (9/5) + 32);
  this.avg = Math.round(obj.temp * (9/5) + 32);
  this.sunrise = new Date(obj.sunrise_ts* 1000).toString().split(' ')[4].slice(0,5);
  this.sunset = new Date(obj.sunset_ts* 1000).toString().split(' ')[4].slice(0,5);
}

function getWeather(req, res) {
  const apiUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';
  const queryParams = {
    key : process.env.WEATHER_API_KEY,
    city : 'San Francisco',
    days : 7,
  };
  superagent.get(apiUrl)
    .query(queryParams)
    .then(result => {
      const newWeather = result.body.data.map(obj => new Weather(obj));
      console.log(result);
      res.render('pages/weather', {weather : newWeather});
    });
}

module.exports = getWeather;
