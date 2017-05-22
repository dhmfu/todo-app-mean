var path = require('path');
var task = require('../models/task');


module.exports = function (app) {

  // Define a middleware function to be used for every secured routes
  var auth = function(req, res, next){
    if (!req.isAuthenticated())
    	res.send(401);
    else
    	next();
  };
  //==================================================================

  app.get('/api/tasks', auth, function (req, res) {
    task.find(function (err, tasks) {
        if (err) res.send(err);
        res.json(tasks);
    });
  });

  app.delete('/api/tasks/:id', auth, function (req, res) {
    task.remove({_id: req.params.id},
    function (err, todo) {
      if (err) res.send(err);
      res.end();
    });
  });

  app.post('/api/tasks/new', auth, function (req, res) {
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


  app.patch('/api/tasks/:id', auth, function (req, res) { //it can be better
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

  app.put('/api/tasks/', auth, function (req, res) {
    console.log(req.body);
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
