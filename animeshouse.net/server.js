var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser'),
  apicache = require('apicache'),
  cache = apicache.middleware;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cache('5 days'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var routes = require('./api/routes/routes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('HouseAnime server started on: ' + port);