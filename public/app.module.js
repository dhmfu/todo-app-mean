'use strict';

angular.module('toDoApp', ['bgSwitch', 'todoList', 'login','ngRoute']).controller('NavbarController', function($scope) {
  $scope.active = 'home';

  this.isActive = function(source) {
    if(location.hash.substring(2) == source)
      return 'active';
  };

});
