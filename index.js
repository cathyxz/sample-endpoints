var countries = require('./countries.json');

var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('Working');
});

app.get('/countries', function(req, res) {
  res.send(countries);
});

app.get('/search/countries', function(req, res) {
  var filtered = [];

  if (req.query.hasOwnProperty('q')) {
    var query = req.query.q.toLowerCase();

    filtered = countries.items
      .filter(country => country.name.toLowerCase().startsWith(query));
  }

  var results = {
    'items': filtered
  };
  res.send(results);
});

var port = process.env.PORT || 5000;

app.listen(port);
console.log('Listening on port ' + port);