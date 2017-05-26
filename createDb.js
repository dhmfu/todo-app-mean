var task = require('./app/models/task');


for(var i = 0; i<5; i++){
  var test = new task({
    description: 'make this work'+i,
    priority: 'Low',
    completed: false,
    createdAt: Date.now()
  });
  test.save(function (err, test, affected) {
    console.log(test.description);
  });
}

for(var i = 5; i<10; i++){
  var test = new task({
    description: 'make this work'+i,
    priority: 'Low',
    completed: false,
    createdAt: Date.now(),
    user: 'admin'
  });
  test.save(function (err, test, affected) {
    console.log(test.description);
  });
}
