'use strict';

angular.module('toDoApp', ['bgSwitch', 'todoList', 'login','ngRoute']).controller('NavbarController', function($scope, $rootScope, $http) {
  $scope.active = 'home';

  var self = this;

  this.isActive = function(source) {
    if(location.hash.substring(2) == source)
      return 'active';
  };

  $rootScope.test = false;

  $http.get('/loggedin').success(function(user){
    // Authenticated
    if (user !== '0') $rootScope.test = true;
    // Not Authenticated
    else $rootScope.test = false;
  });


  $rootScope.fire = 7;

  this.logout = function () {
    $rootScope.fire=47;
  };

});
