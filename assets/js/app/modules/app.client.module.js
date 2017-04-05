(function () {
  'use strict';

  angular
    .module('OrangeClient', [
      'app.core',
      'app.client.routes',
      'app.translate.module'
    ])
    .run(setupGlobalScope);

  setupGlobalScope.$inject = ['$rootScope', 'GeneralConfigService'];
  function setupGlobalScope($rootScope, GeneralConfigService) {
    $rootScope.lang = 'en';
    $rootScope.langList = ['en', 'ru'];
    $rootScope.numLang = 2;
    $rootScope.pagerNumRecords = 2;
    $rootScope.pageShort = 1;
    $rootScope.orangeConfig = GeneralConfigService.orangeConfig;
  }

})();