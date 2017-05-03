var task = require('./app/models/task');


for(var i = 0; i<10; i++){
  var test = new task({
    description: 'make this work'+i,
    priority: 'Low',
    completed: false
  });
  test.save(function (err, test, affected) {
    console.log(test.description);
  });
}
