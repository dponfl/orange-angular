(function () {
  'use strict';

  angular
    .module('OrangeClient', [
      'app.core',
      'app.client.routes',
      'app.translate.module'
    ])
    .run(setupGlobalScope);

  setupGlobalScope.$inject = ['$rootScope'];
  function setupGlobalScope($rootScope) {
    $rootScope.lang = 'en';
  }

})();