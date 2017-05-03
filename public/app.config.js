angular.
  module('toDoApp').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {

      $routeProvider.
        when('/todo-list', {
          template: '<todo-list></todo-list>'
        }).
        when('/about', {
          templateUrl: 'about.html'
        }).
        when('/home', {
          templateUrl: 'welcome.html'
        }).
        otherwise('/home');
    }
  ]);
