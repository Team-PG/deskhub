'use strict';
const pg = require('pg');
const superagent = require('superagent');

const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', console.error);
client.connect();

function Weather(obj){
  this.forecast = obj.weather.description;
  this.weatherTime = new Date(obj.ts * 1000).toDateString();
  this.high = Math.round(obj.high_temp * (9/5) + 32);
  this.low = Math.round(obj.low_temp * (9/5) + 32);
  this.avg = Math.round(obj.temp * (9/5) + 32);
  this.sunrise = new Date(obj.sunrise_ts* 1000).toString().split(' ')[4].slice(0,5);
  this.sunset = new Date(obj.sunset_ts* 1000).toString().split(' ')[4].slice(0,5);
}

function getWeather(req, res) {

  const checkSql = `SELECT * FROM weather INNER JOIN locations ON weather.locid=locations.id WHERE locations.location=$1`;
  const checkVal = [req.app.get('location')];
  console.log('before the delete, location: ', checkVal);

  client.query(checkSql, checkVal)
    .then(result => {
      if (!result.rowCount) {
        setNewSql(req, res);
      }else if (Math.floor(new Date()/3600000) - result.rows[0].timestamp > 0) {
        const getLocId = `SELECT id FROM locations WHERE location=$1`;
        const locVal = [req.app.get('location')];
        client.query(getLocId, locVal)
          .then(result => {
            const delSql = `DELETE FROM weather WHERE locid=$1`;
            const delVal = [result.rows[0].id];
            client.query(delSql, delVal)
              .then(() => setNewSql(req,res));
          });
      } else {
        res.render('pages/weather/weather', {weather : result.rows});
      }
    });
}

function setNewSql(req, res){
  const apiUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';
  const queryParams = {
    key : process.env.WEATHER_API_KEY,
    city : req.app.get('location') || 'Seattle, WA',
    days : 7,
  };
  console.log('Location for search:    ', req.app.get('location'));
  superagent.get(apiUrl)
    .query(queryParams)
    .then(result => handleSuper(req,res,result)).catch(error => {
      console.log('3rd catch');
      console.error(error);
    });
}

function handleSuper(req,res, result) {
  const newWeather = result.body.data.map(obj => new Weather(obj));
  // console.log(result);
  newWeather.forEach(val => {
    const getLocId = `SELECT id FROM locations WHERE location=$1`;
    const locVal = [req.app.get('location')];
    client.query(getLocId, locVal)
      .then(result => {
        const sqlQuery = `INSERT INTO weather (forecast, weatherTime, high, low, avg, sunrise, sunset, timestamp, locid) VALUES ($1,$2,$3,$4,$5,$6,$7, $8,$9)`;
        const sqlVals = [val.forecast, val.weatherTime, val.high, val.low, val.avg, val.sunrise, val.sunset, Math.floor(new Date()/3600000), result.rows[0].id];
        client.query(sqlQuery, sqlVals).catch(error => {
          console.log('Insert Error');
          console.error(error);
        });
      }).catch(error => {
        console.log('Get ID Error');
        console.error(error);
      });
  });
  res.render('pages/weather/weather', {weather : newWeather});
}

function searchWeather(req, res){
  const apiUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';
  const queryParams = {
    key : process.env.WEATHER_API_KEY,
    city : req.body.searchCity,
    days : 7,
  };
  superagent.get(apiUrl)
    .query(queryParams)
    .then(result => {
      const newWeather = result.body.data.map(obj => new Weather(obj));
      res.render('pages/weather/search', {'weather' : newWeather});
    })
    .catch(error => {
      console.error(error);
    });
}

module.exports = {localWeather : getWeather, 'searchWeather' : searchWeather};
