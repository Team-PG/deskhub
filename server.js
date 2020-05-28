'use strict';

// Packages
require('dotenv').config();
const express = require('express');
const superagent = require('superagent');
const pg = require('pg');

// Global vars
const PORT = process.env.PORT;
const app = express();
const methodOverride = require('method-override');
const getJobs = require('./modules/jobModule.js');
const locJobs = getJobs.standard;
const searchJobs = getJobs.search;
const getWeather = require('./modules/weatherModule.js');


// Config
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', console.error);
client.connect();
// Middleware
app.use(express.static('./public'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_overrideMethod'));


app.set('view engine', 'ejs');

app.get('/', renderHome);

app.get('/login', (req, res) => res.render('pages/login'));

app.get('/about', (req, res) => res.render('pages/about'));

app.get('/news', getNewsSearch);

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
  };

  superagent.get(apiUrl)
    .query(queryParams)
    .then(result => {
      const newNews = result.body.results.map(obj => new NewsHeadline(obj));
      res.render('pages/news/search', {'news': newNews});
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

function getQuote() {
  const url = 'https://programming-quotes-api.herokuapp.com/quotes/lang/en';

  return superagent.get(url)
    .then((result) => {
      const quotes = result.body.filter((quote) => {
        return quote.en.length < 150;
      });
      const randomIndex = Math.floor(Math.random() * quotes.length);
      return `${quotes[randomIndex].en} \%0D - ${quotes[randomIndex].author}`;
    })
    .catch((error) => {
      console.error(error);
    });
}

app.get('/jobs', locJobs);

app.post('/jobs/search', searchJobs);

app.get('/weather', getWeather);

app.post('/user', handleLogin);

app.get('/updateInfo', (req, res) => res.render('pages/updateInfo.ejs'));

app.put('/accountUpdate', updateAccount);

app.delete('/accountDelete', deleteAccount);

function renderHome (req, res) {
  if (!app.get('username')) res.redirect('/login');
  else getQuote().then((randomQuote) => {
    res.render('pages/index', { randomQuote , 'username' : app.get('username')});
  });
}

function updateAccount (req, res) {
  const username = req.body.updateUsername || app.get('username');
  const password = req.body.updatePassword || app.get('password');
  app.set('username', username);
  const sqlUpdate = `UPDATE users
  SET username = $1, password = $2
  WHERE id=$3`;
  const updateValues = [username, password, app.get('userId')];
  client.query(sqlUpdate, updateValues)
    .then(res.redirect('/'));
}

function deleteAccount (req, res) {
  const sqlDelete = `DELETE FROM users WHERE id=$1`;
  const sqlVal = [app.get('userId')];
  client.query(sqlDelete, sqlVal)
    .then(() => res.redirect('/login'))
    .catch(err => console.error(err));
}

function handleLogin(req, res) {
  req.body.userType === 'returningUser' ? returningUser(req,res) : newUser(req,res);
}

function returningUser(req,res) {
  const sqlQuery = `SELECT password FROM users WHERE username = $1`;
  const sqlVals = [req.body.returningName];
  client.query(sqlQuery, sqlVals)
    .then(result => returningUserCheck(result, req, res));
}

function returningUserCheck(result,req,res) {
  if(!result.rows[0]) res.redirect('/');
  else if (req.body.returningPass === result.rows[0].password){
    const username = req.body.returningName;
    app.set('username', username);
    const getUserId = `SELECT location FROM locations INNER JOIN users ON locations.userid=users.id WHERE users.username=${username}`;
    client.query(getUserId).then(result => app.set('location', result.rows[0]));
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
}

function newUser(req,res) {
  const sqlQuery =  `INSERT INTO users (username, password) VALUES ($1, $2)`;
  const sqlVals = [req.body.newName, req.body.newPass];
  app.set('username', req.body.newName);
  app.set('location', req.body.location);
  client.query(sqlQuery, sqlVals)
    .then(() => userTableInsert(req,res));
}

function userTableInsert (req, res) {
  const getUserId = `SELECT id FROM users WHERE username=$1`;
  const userName = [req.body.newName];
  client.query(getUserId, userName)
    .then(result => {
      const locQuery = `INSERT INTO locations (location, userid) VALUES ($1, $2)`;
      const userId = result.rows[0].id;
      const locVals = [req.body.location, userId];
      app.set('userId', userId);
      client.query(locQuery, locVals);
    }).then(res.redirect('/'));
}


/* ================ Stocks =========================*/

app.get('/stocks', displaySearchStocks);

app.get('/stocksError', displayStocksError);

function displaySearchStocks(req, res) {
  const apiKey = process.env.STOCKS_API_KEY;
  const url = `https://financialmodelingprep.com/api/v3/actives`;
  const superQuery = {
    apikey: apiKey,
  };

  superagent.get(url).query(superQuery).then(resultSuper => {

    res.render('pages/stocks/stocks', {'resultSuper': resultSuper.body});
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
      res.redirect('pages/stocks/stocksError');
    });
}

app.post('/stocksShow', displaySingleStock);

/* ================================================*/

app.listen(PORT, () => console.log('Listening on ', PORT));


