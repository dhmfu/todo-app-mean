angular.
  module('toDoApp').
  config(['$locationProvider', '$routeProvider', '$httpProvider', function config($locationProvider, $routeProvider, $httpProvider) {
    // Check if the user is connected
    //================================================
    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
      var deferred = $q.defer();

      $http.get('/loggedin').success(function(check){
        // Authenticated
        if (check)
          deferred.resolve();
        else { //Not Authenticated
          deferred.reject();
          $location.url('/login');
        }
      });

      return deferred.promise;
    };

    var whenLoggedin = function($q, $timeout, $http, $location, $rootScope){
      var deferred = $q.defer();

      $http.get('/loggedin').success(function(check){
         //Not Authenticated
        if (!check)
          deferred.resolve();
        else {// Authenticated
          deferred.reject();
          $location.url('/todo-list');
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
          loggedIn: whenLoggedin
        }
      }).
      otherwise('/home');
  }]);
