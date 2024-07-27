'use strict';
const path = require('path');
const express = require('express');
const beispieleJSON = require('./lib/beispieleJSON-router.js');
const beispieleList = require('./lib/beispieleList-router.js');

// Create the express app
const app = express();
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, '../frontend/'));
// Routes and middleware
// app.use(/* ... */)
app.get(["/", "/index.html"], (req, res) => {
  console.log("req index");
  return res.render("index.html");
});

app.use('/beispieleJSON', beispieleJSON);
// app.use('/beispieleTXT', beispieleTXT);
app.use('/beispiele', beispieleList);
app.use("", express.static('../frontend'));
// Error handlers als Letzte
app.use(function fourOhFourHandler(req, res) {
  res.status(404).send();
});
app.use(function fiveHundredHandler(err, req, res, next) {
  console.error(err);
  res.status(500).send();
});

// Start server
app.listen(1234, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log(`Started ${new Date().toLocaleTimeString()} http://localhost:1234`);
});
