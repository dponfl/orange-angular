"use strict";

(function () {
  angular.module('OrangeClient')
    .controller('TestCtrl', TestCtrl);

  TestCtrl.$inject = ['GeneralConfigService', 'lodash', '$rootScope'];
  function TestCtrl(GeneralConfigService, lodash, $rootScope) {

    var _ = lodash;

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
      if ($rootScope.lang == 'en') {
        return "Message in English...";
      } else {
        return "Текст на русском языке..."
      }
    }
  }
})();