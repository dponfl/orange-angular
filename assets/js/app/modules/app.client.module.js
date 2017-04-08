(function () {
  'use strict';

  angular
    .module('OrangeClient', [
      'app.core',
      'app.client.routes',
      'app.translate.module',
      'app.client.config'
    ])
    .run(setupGlobalScope);

  setupGlobalScope.$inject = ['$rootScope', 'GeneralConfigService'];
  function setupGlobalScope($rootScope, GeneralConfigService) {

    //Generale
    $rootScope.lang = 'en';
    $rootScope.langList = ['en', 'ru'];
    $rootScope.numLang = 2;
    $rootScope.pagerNumRecords = 2;
    $rootScope.orangeConfig = GeneralConfigService.orangeConfig;
    $rootScope.scrollDisabled = false;
    $rootScope.panelsAllLangs = {};


    // Short term
    $rootScope.pageShort = 1;
    $rootScope.shortFindActivated = false;
    $rootScope.shortFilterData = {};

  }

})();