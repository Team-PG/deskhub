'use strict'

require('dotenv').config();
const superagent = require('superagent');



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

module.exports = {'newsHeadline': getHeadlineNews, 'newsSearch': getNewsSearch};