(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('SalePanelAdminTblCtrl', SalePanelAdminTblCtrl);

  SalePanelAdminTblCtrl.$inject = ['GeneralConfigService', 'EditObjectService', '$rootScope',
    '$scope', '$log','lodash'];

  /* @ngInject */
  function SalePanelAdminTblCtrl(GeneralConfigService, EditObjectService, $rootScope,
                             $scope, $log, lodash) {
    var _ = lodash;
    var __=GeneralConfigService;
    var vm = this;
    vm.title = 'SalePanelAdminTblCtrl';

    this.$onInit = function () {
      // $log.info(vm.title + ', $onInit...');
      // $log.info('$scope:');
      // $log.info($scope);
      // $log.info('vm.index:');
      // $log.info(vm.index);
      // $log.info('vm.panel');
      // $log.info(vm.panel);
      // $log.info('$rootScope.sale.panels:');
      // $log.info($rootScope.sale.panels);
      vm.data = $rootScope.sale.panels;
    };

    activate();

    ////////////////

    function activate() {

      // $log.info(vm.title + ', activate...');
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

      EditObjectService.setEditSaleObject(objNumb);

      // $log.warn(vm.title + ', _edit, Edit record button was pressed...');
    } // _edit

    function _delete(objNumb) {
      // $log.warn(vm.title + ', _delete, Delete record button was pressed...');
    } // _delete
  }

})();

