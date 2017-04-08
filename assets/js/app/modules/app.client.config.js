(function () {
  "use strict";

  angular.module('app.client.config', [])
    .config(LaddaConfig);

  LaddaConfig.$inject = ['laddaProvider'];
  function LaddaConfig(laddaProvider) {
    laddaProvider.setOption({
      style: 'contract',
      spinnerSize: 35,
      spinnerColor: '#ffffff'
    });
  }
})();

