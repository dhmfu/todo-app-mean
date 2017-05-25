'use strict';

angular.module('toDoApp').controller('NavbarController', function($scope, $rootScope, $http) {
  $scope.active = 'home';

  var self = this;

  this.isActive = function(source) {
    if(location.hash.substring(2) == source)
      return 'active';
  };

  $rootScope.loggedIn = false;

  $http.get('/loggedin').success(function(loggedin){
    $rootScope.loggedIn = loggedin;
  });


  $rootScope.fireLogout = false;

  this.logout = function () {
    $rootScope.fireLogout=true;
  };

});
