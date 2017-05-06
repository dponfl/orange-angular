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
    $rootScope.short = {};
    $rootScope.short.showNotFound = false;
    $rootScope.short.page = 1;
    $rootScope.short.FindActivated = false;
    $rootScope.short.FilterData = {};
    $rootScope.short.scrollDisabled = false;
    $rootScope.short.showFoundNothing = false;
    $rootScope.short.showServerError = false;
    $rootScope.short.panelsAllLangs = {};
    $rootScope.short.panels = [];
    $rootScope.short.busy = false;

    // Long term
    $rootScope.long = {};
    $rootScope.long.showNotFound = false;
    $rootScope.long.page = 1;
    $rootScope.long.FindActivated = false;
    $rootScope.long.FilterData = {};
    $rootScope.long.scrollDisabled = false;
    $rootScope.long.showFoundNothing = false;
    $rootScope.long.showServerError = false;
    $rootScope.long.panelsAllLangs = {};
    $rootScope.long.panels = [];
    $rootScope.long.busy = false;


  }

})();