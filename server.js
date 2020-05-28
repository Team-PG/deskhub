'use strict';

// Packages
require('dotenv').config();
const express = require('express');
const superagent = require('superagent');
// const pg = require('pg');

// Global vars
const PORT = process.env.PORT;
const app = express();
const getJobs = require('./modules/jobModule.js');
const locJobs = getJobs.standard;
const searchJobs = getJobs.search;
const getWeather = require('./modules/weatherModule.js');

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
  // quotes API
  app.set('username', 'Niccoryan0');
  app.set('location', 'Seattle, Wa');
  getQuote().then((randomQuote) => {
    res.render('pages/index', { randomQuote });
  });
});

app.get('/login', (req, res) => [
  res.render('pages/login')
]);

app.get('/about', (req, res) => {
  res.render('pages/about');
});

app.get('/search', getNewsSearch);

app.post('/news/show', getHeadlineNews);


function getHeadlineNews (req, res) {
  const searchType = req.body.searchType;
  const apiUrl = `https://api.nytimes.com/svc/topstories/v2/${searchType}.json`;
  const queryParams = {
    'api-key': process.env.NEWS_API_KEY
  };

  superagent.get(apiUrl)
    .query(queryParams)
    .then(result => {
      const newNews = result.body.results.map(obj => new NewsHeadline(obj));
      res.render('pages/news/show', {'news': newNews});
    })
    .catch(error =>{
      res.send(error).status(500);
      console.log(error);
    });
}

function getNewsSearch(req, res){
  const apiUrl = `https://api.nytimes.com/svc/topstories/v2/home.json`;
  const queryParams = {
    'api-key': process.env.NEWS_API_KEY
  }

  superagent.get(apiUrl)
    .query(queryParams)
    .then(result => {
      const newNews = result.body.results.map(obj => new NewsHeadline(obj));
  res.render('pages/news/search', {'news': newNews});
  //     console.log(result.body.response.docs);
    })
    .catch(error =>{
    res.send(error).status(500);
    console.log(error);
  });
}


function NewsHeadline(obj){
  this.title = obj.title ? obj.title: 'No Title Found';
  this.byline = obj.byline ? obj.byline: 'No Author Found';
  this.abstract = obj.abstract ? obj.abstract: 'No Description Found';
  this.url = obj.url ? obj.url: 'No URL Found';
}

function NewsSearch(obj){

}

function getQuote() {
  const url = 'https://programming-quotes-api.herokuapp.com/quotes/lang/en';
  return superagent.get(url)
    .then((result) => {
      const quotes = result.body.filter((quote) => {
        return quote.en.length < 150;
      });
      const randomIndex = Math.floor(Math.random() * quotes.length);
      return quotes[randomIndex].en;
    })
    .catch((error) => {
      console.error(error);
    });
}

app.get('/jobs', locJobs);

app.post('/jobs/search', searchJobs);

app.get('/weather', getWeather);

app.post('/login', (req, res) => {
//   if(req.body.userType === 'returningUser'){
//     const sqlQuery = `SELECT password FROM users WHERE username = $1`;
//     const sqlVals = [req.body.returningName];
//     client.query(sqlQuery, sqlVals)
//       .then(result => {
//         if (req.body.returningPass === result.rows[0]){
//           res.redirect('/');
//         } else {
//           res.redirect('/login');
//         }
//       });
//   }
//   if(req.body.saveInfo) {
//     res.json({username : req.body.returningName || req.body.newName, password : req.body.returningPass || req.body.newPass});
//   }
//   console.log(req.body);
});

/* ================Stocks =========================*/

app.get('/stocks', displaySearchStocks);

app.get('/stocksError', displayStocksError)

function displaySearchStocks(req, res) {
  const apiKey = process.env.STOCKS_API_KEY;
  const url = `https://financialmodelingprep.com/api/v3/actives`;
  const superQuery = {
    apikey: apiKey,
  };

  superagent.get(url).query(superQuery).then(resultSuper => {

    res.render('pages/stocks/stocks', {'resultSuper': resultSuper.body})
  });
}

function displayStocksError (req, res) {

}

function displaySingleStock(req, res) {
  const apiKey = process.env.STOCKS_API_KEY;
  const symbol = req.body.searchStock.toUpperCase();
  const url = `https://financialmodelingprep.com/api/v3/profile/${symbol}`;
  const superQuery = {
    apikey: apiKey,
  };

  superagent.get(url).query(superQuery)
    .then(resultSuper => {
      res.render('pages/stocks/stocksShow', {'resultSuper': resultSuper.body[0]});
    })
    .catch(error => {
      res.redirect('pages/stocks/stocksError')
    });
}

app.post('/stocksShow', displaySingleStock);

/* ================================================*/

app.listen(PORT, () => console.log('Listening on ', PORT));
