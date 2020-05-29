'use strict';
const superagent = require('superagent');


function JobCon(obj){
  this.type = obj.type;
  this.url = obj.url;
  this.company = obj.company;
  this.location = obj.location;
  this.title = obj.title;
  this.description = obj.description.replace(/[(]*<[/]*[\w]*[\s]*\S*>[)]*/g, '').replace(/&amp;/g, '&').replace('##', '\n');
  this.createdOn = obj.created_at;
}

function standardJobs(req, res) {
  const userLoc = req.app.get('location') || 'USA';
  const apiUrl = `https://jobs.github.com/positions.json?&location=${userLoc}`;
  superagent.get(apiUrl)
    .then(result => {
      const jobArr = result.body.map(val => new JobCon(val));
      res.render('pages/jobs/jobs', {'jobArr' : jobArr});
    }).catch(error => console.error(error));
}

function searchJobs(req, res){
  const searchLang = req.body.searchLang ? `description=${req.body.searchLang}` : '';
  const searchLoc = req.body.searchLoc ? req.body.searchLoc : 'USA';
  const apiUrl = `https://jobs.github.com/positions.json?${searchLang}&location=${searchLoc}`;

  superagent.get(apiUrl)
    .then(result => {
      const jobArr = result.body.map(val => new JobCon(val));
      res.render('pages/jobs/search', {'jobArr' : jobArr});
    })
    .catch(error => console.error(error));
}

module.exports = {'standard' : standardJobs, 'search' : searchJobs};
