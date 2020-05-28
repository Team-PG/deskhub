'use strict';

const pg = require('pg');
const app = require('../server.js');

const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', console.error);
client.connect();


function handleLogin(req, res) {
  if(req.body.userType === 'returningUser'){
    const sqlQuery = `SELECT password FROM users WHERE username = $1`;
    const sqlVals = [req.body.returningName];
    client.query(sqlQuery, sqlVals)
      .then(result => {
        if (req.body.returningPass === result.rows[0].password){
          app.set('username', req.body.returningName);
          // app.set('location', req.body.location);
          res.redirect('/');
        } else {
          res.redirect('/login');
        }
      });
  } else {
    const sqlQuery =  `INSERT INTO users (username, password) VALUES ($1, $2)`;
    const sqlVals = [req.body.newName, req.body.newPass];
    req.app.set('username', req.body.newName);
    app.set('location', req.body.location);
    client.query(sqlQuery, sqlVals)
      .then(() => {
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
      });
  }
}


module.exports = handleLogin;
