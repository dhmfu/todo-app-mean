var path = require('path');
var task = require('./models/task');
var bodyParser = require('body-parser');

module.exports = function (app, dirPath) {

  app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
  app.use(bodyParser.json()); // parse application/json
  app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
  app.get('/api/tasks', function (req, res) {
    task.find(function (err, tasks) {
        if (err) res.send(err);
        res.json(tasks);
    });
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

  app.post('/api/tasks/new', function (req, res) {
    var set = req.body;

    task.create({
      description: set.description,
      priority: set.priority,
      completed: set.completed,
    }, function (err, task) {
        if (err) res.send(err);
        res.end();
    });

  });


  app.post('/api/tasks', function (req, res) { //it can be better
    var set = req.body;
    task.findById(set._id, function (err, task) {
      if (err) res.send(err);
      task.description = set.description;
      task.priority = set.priority;
      task.save(function (err, updatedTask) {
        if (err) res.send(err);
        res.end();
      });
    });
  });

  app.get('*', function (req, res) {
    res.sendFile(path.join(dirPath+'/public' + req.url));
  });
};
