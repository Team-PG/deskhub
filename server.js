'use strict';

// Packages
require('dotenv').config();
const express = require('express');
const superagent = require('superagent');
// const pg = require('pg');

// Global vars
const PORT = process.env.PORT;
const app = express();


// Config
// const client = new pg.Client(process.env.DATABASE_URL);
// client.on('error', console.error);
// client.connect();
// Middleware
app.use(express.static('./public'));
app.use(express.urlencoded({extended: true}));


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  // Remember me info, check if info in local storage on initial page load, SQL query to get their info if in local storage
  // if (req.body.newUser) {
  //   const sqlQuery = `INSERT INTO table (username, password, location) VALUES ($1, $2, $3)`;
  //   const valArr = [req.body.newName, req.body.newPass, `${req.body.locationCity}, ${req.body.locationState}`];
  //   client.query(sqlQuery, valArr)
  //     .then(() => {
  //       res.render('index', {userData : false});
  //     });
  // }
  // if (userName) {
  //   res.render('index');
  // } else {
  //   res.redirect('/login');
  // }
  res.render('index');
});

app.get('/login', (req, res) => [
  res.render('login')
]);

app.get('/about', (req, res) => {
  res.render('about');
});

function JobCon(obj){
  this.type = obj.type;
  this.url = obj.url;
  this.company = obj.company;
  this.location = obj.location;
  this.title = obj.title;
  this.description = obj.description.replace(/[(]*<[/]*[\w]*[\s]*\S*>[)]*/g, '').replace(/&amp;/g, '&').replace('##', '<br>').split('\n').join(' ');
  this.createdOn = obj.created_at;
}

app.get('/jobs',(req,res) => {
  const userLang = req.body.userLang ? `description=${userLang}` : '';
  const userLoc = req.body.userLoc ? req.body.userLoc : 'California';
  const apiUrl = `https://jobs.github.com/positions.json?${userLang}&location=${userLoc}`;

  superagent.get(apiUrl)
    .then(result => {
      const jobArr = result.body.map(val => new JobCon(val));
      console.log(jobArr);
      res.render('jobs', {'jobArr' : jobArr});
    });
});

// function Weather(obj){
//   this.forecast = obj.weather.description;
//   this.time = new Date(obj.ts * 1000).toDateString();
// }
// Weather.Query = function(req) {
//   this.key = process.env.WEATHER_API_KEY;
//   this.lat = req.query.latitude;
//   this.lon = req.query.longitude;
// };

// function superAgentWeather(req, res){
//   const apiUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';
//   const queryParams = {
//     key : process.env.WEATHER_API_KEY,
//     lat : req.query.latitude,
//     lon : req.query.longitude,
//     days : 7,
//   };
//   superagent.get(apiUrl)
//     .query(queryParams)
//     .then(result => {
//       const newWeather = result.body.data.map(obj => new Weather(obj));
//       return newWeather;
//     });
// }


app.listen(PORT, () => console.log('Listening on ', PORT));
