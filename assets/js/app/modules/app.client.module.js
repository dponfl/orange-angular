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
    $rootScope.orangeConfig = GeneralConfigService.orangeConfig;
  }

})();