'use strict';

angular.module('toDoApp', ['bgSwitch', 'todoList', 'ngRoute']).controller('NavbarController', function($scope) {
  $scope.active = 'home';

  this.isActive = function(source) {
    if(location.hash.substring(2) == source)
      return 'active';
  };

});
