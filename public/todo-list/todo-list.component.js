'use strict';

angular.
  module('todoList').
  component('todoList', {
    templateUrl: 'todo-list/todo-list.template.html',
    controller: ['$http', '$scope', '$window',function todoListController($http, $scope, $window) {
      var self = this;
      this.tasks = [];

      function updateTouched() {
        if(!self.tasks.length) return;
        self.touchedTasks().forEach(function (task) {
          $http.put('/api/tasks/'+task._id, task).success(function () {
            task.touched = false;
            console.log(`Successfully updated ${task._id}`);
          });
        });
      }

      $scope.$on('$destroy', function () { //update tasks on server if it's needed when user change page
        clearInterval(autosave);
        updateTouched();
      });

      angular.element($window).on('beforeunload', updateTouched);

      var autosave = setInterval(updateTouched, 15000); //autosave every 15 seconds


      $http.get('/api/tasks').success(function(data) { //fetch all tasks from database
        self.tasks = data;
        self.tasks.forEach(function (task) {
          task.selection = (!task.completed ? 'Select' : 'Unselect');
        });
      });

      this.newTask = {
        priority: 'Low',
        selection: 'Select' //this property is used only for mobile version
      };

      this.addTask = function() {
        this.newTask.completed = false;
        this.newTask.createdAt = new Date();
        this.tasks.push(this.newTask);
        $http.post('/api/tasks/new', this.newTask).success(function (resId) {
          self.tasks[self.tasks.length-1]._id = resId;
          self.newTask = {
            priority: 'Low',
            selection: 'Select' //this property is used only for mobile version
          };
        });
      };

      this.removeCompleted = function() { //can it be better?
        this.tasks.forEach(function (task) {
          if(task.completed)
            self.taskRemove(task);
        });
      };

      this.selectAll = function() {
        if (this.completedTasks() == this.tasks.length)
          this.tasks.forEach(function(task) {
            task.completed = false;
            task.touched = true;
          });
        else
          this.tasks.forEach(function(task) {
            task.completed = true;
            task.touched = true;
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

      this.touchedTasks = function () {
        return this.tasks.filter(function (task) {
          return task.touched;
        });
      }

      this.selectAll_button = function() {
        return (this.completedTasks() != this.tasks.length ? 'Select' : 'Unselect') + ' all';
      };

      this.select_button = function(task) { //this function is used only for mobile version
        task.completed = !task.completed;
        task.touched = true;
        task.selection = (!task.completed ? 'Select' : 'Unselect');
      };

      this.acceptEdit = function(task, $event) {
        if ($event.keyCode == 13 || $event.type == 'click') {
          if (!task.description)
            this.taskRemove(task);
          else
            $http.patch('/api/tasks/'+task._id, task).success(function () {
              task.editing = false;
            });
        }
      };

      this.determinePriority = function(task) {
        if (!task.completed)
          return (task.priority == 'High') ? 'label-warning' : 'label-success';
      };

      $scope.logout = function(){
        // $rootScope.message = 'Logged out.';
        $http.post('/logout');
      };
    }
  ]
  });
