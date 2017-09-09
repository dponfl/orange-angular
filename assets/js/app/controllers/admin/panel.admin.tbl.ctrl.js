(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('PanelAdminTblCtrl', PanelAdminTblCtrl);

  PanelAdminTblCtrl.$inject = ['GeneralConfigService', 'EditObjectService', '$rootScope',
    '$scope', '$log','lodash'];

  /* @ngInject */
  function PanelAdminTblCtrl(GeneralConfigService, EditObjectService, $rootScope,
                             $scope, $log, lodash) {
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
      $log.info('$rootScope.long.panels:');
      $log.info($rootScope.long.panels);
      vm.data = $rootScope.long.panels;
    };

    activate();

    ////////////////

    function activate() {

      $log.info('activate...');
      vm.sort = _sort;
      vm.clearSort = _clearSort;
      vm.edit = _edit;
      vm.delete =_delete;

      vm.reverse = false;

      vm.activeTabMain = 'new_obj';
      vm.activeTabEdit = 'lang_eng';

    } // activate()

    function _sort(keyName) {
      // $log.info('sort...');

      vm.sortKey = keyName;
      vm.reverse = !vm.reverse;
    } // _sort

    function _clearSort() {
      vm.sortKey ='';
      vm.reverse = false;
    } // _clearSort

    function _edit(objNumb) {

      EditObjectService.setEditLongObject(objNumb);

      $log.warn('Edit record button was pressed...');
    } // _edit

    function _delete(objNumb) {
      $log.warn('Delete record button was pressed...');
    } // _delete
  }

})();

