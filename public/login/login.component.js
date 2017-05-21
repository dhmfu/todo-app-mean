'use strict';

angular.
  module('login').
  component('login', {
    templateUrl: 'login/login.template.html',
    controller: function loginController($http, $scope, $rootScope) {
      // This object will be filled by the form
      $scope.username = $scope.password = '';

      // Register the login() function
      $scope.login = function(){
        $http.post('/login', {
          username: $scope.username,
          password: $scope.password,
        })
        .success(function(user){
          // No error: authentication OK
          // $rootScope.message = 'Authentication successful!';
          $location.url('/todo-list');
        })
        .error(function(){
          // Error: authentication failed
          // $rootScope.message = 'Authentication failed.';
          $location.url('/login');
        });
      };
    }
  });
