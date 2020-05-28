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
  console.log('App set user  ', req.app.get('username'));
  console.log('userid       ', req.app.get('userId'));

  const userLoc = req.app.get('location') || 'USA';
  const apiUrl = `https://jobs.github.com/positions.json?&location=${userLoc}`;
  superagent.get(apiUrl)
    .then(result => {
      const jobArr = result.body.map(val => new JobCon(val));
      res.render('pages/jobs/jobs', {'jobArr' : jobArr});
    });
}

function searchJobs(req, res){
  console.log('body  ', req.body);
  const searchLang = req.body.searchLang ? `description=${req.body.searchLang}` : '';
  const searchLoc = req.body.searchLoc ? req.body.searchLoc : 'USA';
  console.log('language ', searchLang);
  console.log('location', searchLoc);
  const apiUrl = `https://jobs.github.com/positions.json?${searchLang}&location=${searchLoc}`;

  superagent.get(apiUrl)
    .then(result => {
      const jobArr = result.body.map(val => new JobCon(val));
      res.render('pages/jobs/search', {'jobArr' : jobArr});
    });
}

module.exports = {'standard' : standardJobs, 'search' : searchJobs};
