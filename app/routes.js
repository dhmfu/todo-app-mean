var path = require('path');
var task = require('./models/task');

function getTasks(res) {
  task.find(function (err, tasks) {
      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err) {
          res.send(err);
      }

      res.json(tasks); // return all todos in JSON format
  });
};

module.exports = function (app, dirPath) {

  app.get('/api/tasks', function (req, res) {
    getTasks(res);
  });

  app.delete('/api/tasks/:id', function (req, res) {
    task.remove({
        _id: req.params.id
    },
    function (err, todo) {
      if (err) res.send(err);
      res.end();
    });
  });

  app.get('*', function (req, res) {
    res.sendFile(path.join(dirPath+'/public' + req.url));
    // res.end(req.url);
  });
};
