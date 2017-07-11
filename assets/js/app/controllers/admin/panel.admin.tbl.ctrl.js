(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('PanelAdminTblCtrl', PanelAdminTblCtrl);

  PanelAdminTblCtrl.$inject = ['GeneralConfigService', '$rootScope', '$scope', '$log','lodash'];

  /* @ngInject */
  function PanelAdminTblCtrl(GeneralConfigService, $rootScope, $scope, $log, lodash) {
    var _ = lodash;
    var __=GeneralConfigService;
    var vm = this;
    vm.title = 'PanelAdminTblCtrl';

    this.$onInit = function () {
      $log.info('$onInit...');
      $log.info('$scope:');
      $log.info($scope);
      $log.info('vm.index:');
      $log.info(vm.index);
      $log.info('vm.panel');
      $log.info(vm.panel);
    };

    activate();

    ////////////////

    function activate() {

      $log.info('activate...');

    } // activate()


  }

})();

