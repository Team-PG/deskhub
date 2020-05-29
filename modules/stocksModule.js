'use strict';
const pg = require('pg');
const superagent = require('superagent');

const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', console.error);
client.connect();

function displaySearchStocks(req, res) {
  const apiKey = process.env.STOCKS_API_KEY;
  const url = `https://financialmodelingprep.com/api/v3/actives`;
  const superQuery = {
    apikey: apiKey,
  };

  superagent.get(url).query(superQuery).then(resultSuper => {
    res.render('pages/stocks/stocks', { 'resultSuper': resultSuper.body });

  }).catch(error => console.error(error));
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
      res.render('pages/stocks/stocksShow', { 'resultSuper': resultSuper.body[0] });
    })
    .catch(error => console.error(error));
}

function sqlSaveStocks(req, res) {
  const sqlSaveIntoStocks = 'INSERT INTO stockssaved (symbol, userid) VALUES ($1, $2)';
  const sqlStocksValues = [req.body.symbol, req.app.get('userId')];


  client.query(sqlSaveIntoStocks, sqlStocksValues)
    .then(() => res.redirect('stocks'))
    .catch(error => console.error(error));
}

function displayTrackedStocks(req, res) {
  const sqlQuery = 'SELECT symbol FROM stockssaved WHERE userid = $1';
  const sqlVal = [req.app.get('userId')];
  client.query(sqlQuery, sqlVal)
    .then(sqlRes => {
      const savedArr = [];

      sqlRes.rows.forEach(curr => {
        const apiKey = process.env.STOCKS_API_KEY;
        const symbol = curr.symbol;
        const url = `https://financialmodelingprep.com/api/v3/profile/${symbol}`;
        const superQuery = {
          apikey: apiKey,
        };

        savedArr.push(superagent.get(url).query(superQuery)
          .then(resultSuper => {
            return resultSuper.body;
          })
          .catch(() => {
            res.redirect('pages/stocks/stocksError');
          }));
      });
      Promise.all(savedArr).then(result => {
        res.render('pages/stocks/trackedStocks', {'sqlSaved': result});
      });

    })
    .catch(error => console.error(error));
}

module.exports = {'displaySearchStocks' : displaySearchStocks, 'displaySingleStock' : displaySingleStock, 'sqlSaveStocks' : sqlSaveStocks, 'displayTrackedStocks' : displayTrackedStocks}