"use strict";

(function () {
  angular.module('OrangeClient')
    .controller('ExclusiveCtrl', ExclusiveCtrl);

  ExclusiveCtrl.$inject = ['GeneralConfigService', 'lodash'];
  function ExclusiveCtrl(GeneralConfigService, lodash) {

    var _ = lodash;

    this.orangeConfig = GeneralConfigService.orangeConfig;

  }
})();