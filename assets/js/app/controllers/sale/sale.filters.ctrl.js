(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('SaleFiltersCtrl', SaleFiltersCtrl);

  SaleFiltersCtrl.$inject = ['$log', '$rootScope'];

  /* @ngInject */
  function SaleFiltersCtrl($log, $rootScope) {
    var vm = this;
    vm.find = _find;
    vm.clear = _clear;

    vm.objList = $rootScope.orangeConfig.objList[$rootScope.lang];
    vm.cityList = $rootScope.orangeConfig.cityList[$rootScope.lang];
    vm.roomList = $rootScope.orangeConfig.roomList[$rootScope.lang];

    vm.formData = {};

    vm.formData.obj = $rootScope.orangeConfig.objList[$rootScope.lang][0];
    vm.formData.city = $rootScope.orangeConfig.cityList[$rootScope.lang][0];
    vm.formData.room = $rootScope.orangeConfig.roomList[$rootScope.lang][0];
    vm.formData.objnumber = '';

    $rootScope.sale.saleFilterData = vm.formData;

    $rootScope.$watch('lang', update);

    $rootScope.$watch('sale.busy', function (oldVal, newVal) {
      vm.busy = newVal;
      if (!newVal) {
        vm.busyFind = newVal;
        vm.busyClear = newVal;
        vm.disabledClear = '';
        vm.disabledFind = '';
      }
    });


    function update () {
      vm.objList = $rootScope.orangeConfig.objList[$rootScope.lang];
      vm.cityList = $rootScope.orangeConfig.cityList[$rootScope.lang];
      vm.roomList = $rootScope.orangeConfig.roomList[$rootScope.lang];
    };

    function _find() {
      $rootScope.sale.saleFilterData = vm.formData;
      vm.busyFind = true;
      vm.disabledClear = 'disabled';
      $rootScope.sale.saleFindActivated = true;
    };

    function _clear() {
      vm.formData.obj = $rootScope.orangeConfig.objList[$rootScope.lang][0];
      vm.formData.city = $rootScope.orangeConfig.cityList[$rootScope.lang][0];
      vm.formData.room = $rootScope.orangeConfig.roomList[$rootScope.lang][0];
      vm.formData.objnumber = '';
      $rootScope.sale.saleFilterData = vm.formData;
      vm.busyClear = true;
      vm.disabledFind = 'disabled';
      $rootScope.sale.saleFindActivated = true;
    };
  }
})();