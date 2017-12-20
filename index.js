var countries = require('./countries.json');

var express = require('express');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res, next) {
  res.send('Working');
});

app.get('/countries', function(req, res, next) {
  res.send(countries);
});

app.get('/search/countries', function(req, res, next) {
  var filtered = [];

  if (req.query.hasOwnProperty('q')) {
    var query = req.query.q.toLowerCase();

    filtered = countries.items
      .filter(country => country.name.toLowerCase().startsWith(query));
  }

  var results = {
    'items': [
      {
        'results': filtered
      }
    ]
  };
  res.send(results);
});

var port = process.env.PORT || 5000;

app.listen(port);
console.log('Listening on port ' + port);