var express = require('express');
var http = require('http');
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var config = require('./config');
var session = require('express-session');
var mongoose = require('./app/mongoose');


var app = express();
app.set('port', config.get('port'));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
var MongoStore = require('connect-mongo')(session);

app.use(session({
  secret: config.get('session:secret'),
  key: config.get('session:key'),
  resave: false,
  saveUninitialized: true,
  cookie: config.get('session:cookie'),
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(function(err, req, res, next) {
  if (app.get('env') == 'development') {
    var errorHandler = express.errorHandler();
    errorHandler(err, req, res, next);
  } else {
    res.send(500);
  }
});

require('./app/routes.js')(app, __dirname);
