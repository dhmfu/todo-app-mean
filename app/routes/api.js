var path = require('path');
var task = require('../models/task');


module.exports = function (app, dirPath) {
  app.get('/api/tasks', function (req, res) {
    task.find(function (err, tasks) {
        if (err) res.send(err);
        res.json(tasks);
    });
  });

  app.delete('/api/tasks/:id', function (req, res) {
    task.remove({_id: req.params.id},
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
      createdAt: set.createdAt
    }, function (err, task) {
        if (err) res.send(err);
        res.json(task._id);
    });

  });


  app.patch('/api/tasks/:id', function (req, res) { //it can be better
    var set = req.body;
    task.findById(req.params.id, function (err, task) {
      if (err) res.send(err);
      task.description = set.description;
      task.priority = set.priority;
      task.save(function (err, updatedTask) {
        if (err) res.send(err);
        res.end();
      });
    });
  });

  app.put('/api/tasks/:id', function (req, res) {
    task.findById(req.params.id, function (err, task) {
      if (err) res.send(err);
      task.completed = req.body.completed;
      task.save(function (err, updatedTask) {
        if (err) res.send(err);
        res.end();
      });
    });
  });
};
