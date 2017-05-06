(function () {
  "use strict";

  angular.module('app.client.config', [])
    .config(LaddaConfig)
    .config(ModalConfig);

  LaddaConfig.$inject = ['laddaProvider', '$datepickerProvider'];
  function LaddaConfig(laddaProvider, $datepickerProvider) {
    laddaProvider.setOption({
      style: 'contract',
      spinnerSize: 35,
      spinnerColor: '#ffffff'
    });
    angular.extend($datepickerProvider.defaults, {
      dateFormat: 'dd/MM/yyyy',
      autoclose: true,
    });
  }

  ModalConfig.$inject = ['$modalProvider'];
  function ModalConfig($modalProvider) {
    angular.extend($modalProvider.defaults, {
      html: true
    });
  }


})();

