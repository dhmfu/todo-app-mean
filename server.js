var express = require('express');
var http = require('http');
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();
app.set('port', 3000);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

app.use(morgan('dev'));
require('./app/routes.js')(app, __dirname);

// app.use(function(err, req, res, next) {
//   // NODE_ENV = 'production'
//   if (app.get('env') == 'development') {
//     var errorHandler = express.errorHandler();
//     errorHandler(err, req, res, next);
//   } else {
//     res.send(500);
//   }
// });

app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

/*

var routes = require('./routes');
var user = require('./routes/user');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);

app.get('/', routes.index);
app.get('/users', user.list);

*/
