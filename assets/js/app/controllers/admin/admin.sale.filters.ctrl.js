(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('AdminSaleFiltersCtrl', AdminSaleFiltersCtrl);

  AdminSaleFiltersCtrl.$inject = ['$log', '$rootScope', '$scope'];

  /* @ngInject */
  function AdminSaleFiltersCtrl($log, $rootScope, $scope) {
    var vm = this;
    vm.find = _find;
    vm.clear = _clear;

    // todo: delete
    vm.saleBusy = $rootScope.sale.busy;

    vm.filterDisabled = false;

    vm.objList = $rootScope.orangeConfig.objList[$rootScope.lang];
    vm.cityList = $rootScope.orangeConfig.cityList[$rootScope.lang];
    vm.roomList = $rootScope.orangeConfig.roomList[$rootScope.lang];
    vm.exclusiveList = $rootScope.orangeConfig.exclusiveList[$rootScope.lang];
    vm.showList = $rootScope.orangeConfig.showList[$rootScope.lang];
    vm.homeList = $rootScope.orangeConfig.homeList[$rootScope.lang];

    vm.formData = {};

    vm.formData.obj = $rootScope.orangeConfig.objList[$rootScope.lang][0];
    vm.formData.city = $rootScope.orangeConfig.cityList[$rootScope.lang][0];
    vm.formData.room = $rootScope.orangeConfig.roomList[$rootScope.lang][0];
    vm.formData.exclusive = $rootScope.orangeConfig.exclusiveList[$rootScope.lang][0];
    vm.formData.show = $rootScope.orangeConfig.showList[$rootScope.lang][0];
    vm.formData.home = $rootScope.orangeConfig.homeList[$rootScope.lang][0];
    vm.formData.objnumber = '';
    vm.formData.objnumber = $scope.$parent.directLinkObjectNumber || '';

    $rootScope.sale.FilterData = vm.formData;

    $rootScope.$watch('lang', update);

    $rootScope.$watch('sale.busy', function (newVal, oldVal) {
      vm.busy = newVal;
      vm.filterDisabled = newVal;
/*
      if (!newVal) {
        vm.filterDisabled = newVal;
      }
*/
    });


    function update () {
      vm.objList = $rootScope.orangeConfig.objList[$rootScope.lang];
      vm.cityList = $rootScope.orangeConfig.cityList[$rootScope.lang];
      vm.roomList = $rootScope.orangeConfig.roomList[$rootScope.lang];
      vm.exclusiveList = $rootScope.orangeConfig.exclusiveList[$rootScope.lang];
      vm.showList = $rootScope.orangeConfig.showList[$rootScope.lang];
      vm.homeList = $rootScope.orangeConfig.homeList[$rootScope.lang];
    };

    function _find() {

      if (vm.filterDisabled) {
        return;
      }

      // vm.filterDisabled = true;
      $rootScope.sale.FilterData = vm.formData;
      $rootScope.admin.sale.FindActivated = true;
    };

    function _clear() {

      if (vm.filterDisabled) {
        return;
      }

      // vm.filterDisabled = true;
      vm.formData.obj = $rootScope.orangeConfig.objList[$rootScope.lang][0];
      vm.formData.city = $rootScope.orangeConfig.cityList[$rootScope.lang][0];
      vm.formData.room = $rootScope.orangeConfig.roomList[$rootScope.lang][0];
      vm.formData.exclusive = $rootScope.orangeConfig.exclusiveList[$rootScope.lang][0];
      vm.formData.show = $rootScope.orangeConfig.showList[$rootScope.lang][0];
      vm.formData.home = $rootScope.orangeConfig.homeList[$rootScope.lang][0];
      vm.formData.objnumber = '';
      $rootScope.sale.FilterData = vm.formData;
      $rootScope.admin.sale.FindActivated = true;
    };
  }
})();