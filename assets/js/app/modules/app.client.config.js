(function () {
  "use strict";

  angular.module('app.client.config', [])
    .config(LaddaConfig)
    .config(ModalConfig);

  LaddaConfig.$inject = ['laddaProvider'];
  function LaddaConfig(laddaProvider) {
    laddaProvider.setOption({
      style: 'contract',
      spinnerSize: 35,
      spinnerColor: '#ffffff'
    });
  }

  ModalConfig.$inject = ['$modalProvider'];
  function ModalConfig($modalProvider) {
    angular.extend($modalProvider.defaults, {
      html: true
    });
  }


})();

