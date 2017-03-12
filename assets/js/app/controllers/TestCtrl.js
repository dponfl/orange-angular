"use strict";

(function () {
  angular.module('Orange')
    .controller('TestCtrl', TestCtrl);

  TestCtrl.$inject = ['GeneralConfigService', 'City'];
  function TestCtrl(GeneralConfigService, City) {

    this.test = GeneralConfigService.orangeConfig;

    this.showCities = function () {
      console.log('showCities:City.query');
        City.query(function (data) {
        })
          .$promise
          .then(function (data) {
          console.log('!!! Success...');
          console.dir(data);
          return;
        })
          .catch(function (err) {
            console.log('Error...');
            console.dir(err);
            return;
          });
    };

    this.showTest = function () {
      console.log('$scope.showTest:$scope.test');
      console.dir(this.test);
    };

    this.setupLang = function (lang) {
      GeneralConfigService.setLang(lang);
    };

    this.showTestPhrase = function () {
      if (GeneralConfigService.orangeConfig.lang == 'en') {
        return "Message in English...";
      } else {
        return "Текст на русском языке..."
      }
    }
  }
})();