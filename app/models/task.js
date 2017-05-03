var mongoose = require('../mongoose');

var schema = mongoose.Schema({
  description: String,
  priority: String,
  completed: Boolean
});

var task = mongoose.model('task', schema);

module.exports = task;
