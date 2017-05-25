'use strict';

angular.
  module('todoList').
  component('todoList', {
    templateUrl: 'todo-list/todo-list.template.html',
    controller: ['$http', '$scope', '$window', '$location', '$rootScope',function todoListController($http, $scope, $window, $location, $rootScope) {
      var self = this;
      this.tasks = [];
      this.orderProp = 'createdAt';
      $scope.reverse = false;
      $scope.sortColor = '#f0ad4e';

      this.sort = function () {
        if ($scope.reverse) {
          $scope.reverse = false;
          $scope.sortColor = '#f0ad4e';
        }
        else {
          $scope.reverse = true;
          $scope.sortColor = '#5cb85c';
        }
      };

      function updateTouched(str='l') {
        console.log('GOT IT FROM '+str);
        console.log(self.touchedTasks().length);
        return $http.put('/api/tasks/', self.touchedTasks());
      }

      $scope.$on('$locationChangeStart', function () { //update tasks on server if it's needed when user change page
        // clearInterval(autosave);
        // alert($location.path());
        if($location.path()=='/login') return;
        if (!self.tasks.length) return;
        if (!self.touchedTasks().length) return;
        updateTouched('from destroy');
      });

      // angular.element($window).on('beforeunload', updateTouched);

      // var autosave = setInterval(function () {
      //   updateTouched();
      // }, 15000); //autosave every 15 seconds


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
        this.newTask.createdAt = new Date().toISOString();
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

      this.logout = function(){
        $rootScope.test = false;
        if (self.touchedTasks().length)
          updateTouched('from logout').success(function () {
            return $http.post('/logout');
          }).success(function() {
            $location.url('/login');
          });
        else $http.post('/logout').success(function () {
          $location.url('/login');
        });
      };

      var interval = setInterval(function () {
        if ($rootScope.fire == 47) {
          self.logout();
          $rootScope.fire=7;
          clearInterval(interval);
        }
      },100);
    }
  ]
  });
