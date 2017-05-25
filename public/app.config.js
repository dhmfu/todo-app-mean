angular.
  module('toDoApp').
  config(['$locationProvider', '$routeProvider', '$httpProvider', function config($locationProvider, $routeProvider, $httpProvider) {
    // Check if the user is connected
    //================================================
    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user){
        // Authenticated
        if (user !== '0')
          /*$timeout(deferred.resolve, 0);*/
          deferred.resolve();

        // Not Authenticated
        else {
          $rootScope.message = 'You need to log in.';
          //$timeout(function(){deferred.reject();}, 0);
          deferred.reject();
          $location.url('/login');
        }
      });

      return deferred.promise;
    };

    var whenLoggedin = function($q, $timeout, $http, $location, $rootScope){
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user){
        // Authenticated
        if (user !== '0'){
          /*$timeout(deferred.resolve, 0);*/
          deferred.reject();
          $location.url('/todo-list');
          $rootScope.message = 'You are already logged-in.';
}
        // Not Authenticated
        else {
          //$timeout(function(){deferred.reject();}, 0);
          deferred.resolve();
        }
      });

      return deferred.promise;
    };
    //================================================

    //================================================
    // Add an interceptor for AJAX errors
    //================================================
    $httpProvider.interceptors.push(function($q, $location) {
      return {
        response: function(response) {
          console.log(response);
          return response;
        },
        responseError: function(response) {
          if (response.status === 401)
            $location.url('/login');
          console.log('Error:\n'+response);
          return $q.reject(response);
        }
      };
    });
    //================================================

    $routeProvider.
      when('/todo-list', {
        template: '<todo-list></todo-list>',
        resolve: {
          loggedin: checkLoggedin
        }
      }).
      when('/about', {
        templateUrl: 'about.html'
      }).
      when('/home', {
        templateUrl: 'welcome.html'
      }).
      when('/login', {
        template: '<login></login>',
        resolve: {
          loggedin: whenLoggedin
        }
      }).
      otherwise('/home');
  }]);
