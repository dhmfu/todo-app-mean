'use strict';

angular.
  module('bgSwitch').
  component('bgSwitch', {
    templateUrl: 'background-switcher/background-switcher.template.html',
    controller: function bgSwitchController($http, $rootScope) {
      this.isShown = false;

      this.setBackground = function setBackground(source) {
        $rootScope.mainBackgroundUrl = source;
      }

      this.toggleMenu = function toggleMenu() {
        this.isShown=!self.isShown;
      }

      var self = this;

      $http.get('background-switcher/data/backgrounds.json').then(function(response) {
        self.backgrounds = response.data;
        $rootScope.mainBackgroundUrl = self.backgrounds[Math.floor(Math.random() * 4)].url;
      });
    }
  });
