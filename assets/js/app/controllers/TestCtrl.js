"use strict";

(function () {
  angular.module('Orange')
    .controller('TestCtrl', TestCtrl);

  TestCtrl.$inject = ['GeneralConfigService', 'lodash'];
  function TestCtrl(GeneralConfigService, lodash) {

    _ = lodash;

    this.test = GeneralConfigService.orangeConfig;

    this.showCities = function () {
      console.log('showCities:City.query');
      GeneralConfigService.getCities();
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