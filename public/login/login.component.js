'use strict';

angular.
  module('login').
  component('login', {
    templateUrl: 'login/login.template.html',
    controller:['$http', '$scope', '$location', '$rootScope', function loginController($http, $scope, $location, $rootScope) {
      // This object will be filled by the form
      $scope.username = $scope.password = '';

      // Register the login() function
      $scope.login = function(){
        $rootScope.loggedIn = true;
        $http.post('/login', {
          username: $scope.username,
          password: $scope.password,
        })
        .success(function(user){
          // No error: authentication OK
          $location.url('/todo-list');
        })
        .error(function(){
          // Error: authentication failed
          $location.url('/login');
        });
      };
    }
  ]
  });
