'use strict';



angular.
  module('todoList').
  component('todoList', {
    templateUrl: 'todo-list/todo-list.template.html',
    controller: ['$http',function todoListController($http) {
      var self = this;
      this.tasks = [];

      $http.get('/api/tasks').success(function(data) {
        self.tasks = data;
      });

      this.newTask = {
        priority: 'Low'
      };

      this.addTask = function() {
        this.newTask.completed = false;
        this.tasks.push(this.newTask);
        $http.post('/api/tasks/new', this.newTask).success(function () {
          self.newTask = {
            priority: 'Low'
          };
        });
      };

      this.removeCompleted = function() {
        this.tasks = this.tasks.filter(function(task) {
          return !task.completed;
        });
      };

      this.selectAll = function() {
        if (this.completedTasks() == this.tasks.length)
          this.tasks.forEach(function(task) {
            task.completed = false;
          });
        else
          this.tasks.forEach(function(task) {
            task.completed = true;
          });
      };

      this.taskRemove = function(task) {
        $http.delete('/api/tasks/' + task._id).success(function () {
          self.tasks.splice(self.tasks.indexOf(task),1);
        });
      };

      this.completedTasks = function() {
        return this.tasks.filter(function(task) {
          return task.completed;
        }).length;
      };

      this.selectAll_button = function() {
        return (this.completedTasks() != this.tasks.length ? 'Select' : 'Unselect') + ' all';
      };

      this.select_button = function(task) {
        return (!task.completed ? 'Select' : 'Unselect');
      };

      this.acceptEdit = function(task, $event) {
        if ($event.keyCode == 13 || $event.type == 'click') {
          if (!task.description)
            this.taskRemove(task);
          else
            $http.post('/api/tasks', task).success(function () {
              task.editing = false;
            });
        }
      };

      this.determinePriority = function(task) {
        if (!task.completed)
          return (task.priority == 'High') ? 'label-warning' : 'label-success';
      };

    }
  ]
  });
