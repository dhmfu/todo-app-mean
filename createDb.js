var task = require('./app/models/task');

var test = new task({
  description: 'make this work3',
  priority: 'Low',
  completed: false
});

test.save(function (err, test, affected) {
  console.log(test.completed);
});
