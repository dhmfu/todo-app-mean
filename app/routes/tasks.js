var path = require('path');
var task = require('../models/task');
var User = require('../models/user').User;


module.exports = function (app) {

  // Define a middleware function to be used for every secured routes
  var auth = function(req, res, next){
    if (!req.isAuthenticated()) res.sendStatus(401);
    else next();
  };
  //==================================================================

  app.get('/tasks', auth, function (req, res) {
    task.find({user: req.user._id}, function (err, tasks) {
        if (err) res.send(err);
        res.json(tasks);
    });
  });

  app.delete('/tasks/:id', auth, function (req, res) {
    task.remove({_id: req.params.id},
    function (err, todo) {
      if (err) res.send(err);
      res.end();
    });
  });

  app.post('/tasks/new', auth, function (req, res) {
    var set = req.body;

    task.create({
      description: set.description,
      priority: set.priority,
      completed: set.completed,
      createdAt: set.createdAt,
      user: req.user._id
    }, function (err, task) {
        if (err) res.send(err);
        res.json(task._id);
    });

  });

  app.patch('/tasks/:id', auth, function (req, res) {
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

  app.put('/tasks', auth, function (req, res) {
    req.body.forEach(function (set) {
      task.findById(set._id, function (err, task) {
        if (err) res.send(err);
        task.completed = set.completed;
        task.save(function (err, updatedTask) {
          if (err) res.send(err);
          res.end();
        });
      });
    });
  });

};
