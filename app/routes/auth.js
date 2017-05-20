var path = require('path');
var User = require('../models/user').User;


module.exports = function (app, dirPath) {

  var auth = function(req, res, next){
    if (!req.isAuthenticated())
    	res.send(401);
    else
    	next();
  };

  app.get('/', function (req, res) {
    res.sendFile(path.join(dirPath+'/public/index.html'));
  });

};
