(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('ShortFiltersCtrl', ShortFiltersCtrl);

  ShortFiltersCtrl.$inject = ['$log', '$rootScope'];

  /* @ngInject */
  function ShortFiltersCtrl($log, $rootScope) {
    var vm = this;
    vm.find = _find;
    vm.clear = _clear;

    // todo: delete
    vm.shortBusy = $rootScope.short.busy;

    vm.filterDisabled = false;

    vm.objList = $rootScope.orangeConfig.objList[$rootScope.lang];
    vm.cityList = $rootScope.orangeConfig.cityList[$rootScope.lang];
    vm.roomList = $rootScope.orangeConfig.roomList[$rootScope.lang];

    vm.formData = {};

    vm.formData.obj = $rootScope.orangeConfig.objList[$rootScope.lang][0];
    vm.formData.city = $rootScope.orangeConfig.cityList[$rootScope.lang][0];
    vm.formData.room = $rootScope.orangeConfig.roomList[$rootScope.lang][0];
    vm.formData.objnumber = '';

    $rootScope.short.FilterData = vm.formData;

    $rootScope.$watch('lang', update);

    $rootScope.$watch('short.busy', function (newVal, oldVal) {
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
    };

    function _find() {

      if (vm.filterDisabled) {
        return;
      }

      // vm.filterDisabled = true;
      $rootScope.short.FilterData = vm.formData;
      $rootScope.short.FindActivated = true;
    };

    function _clear() {

      if (vm.filterDisabled) {
        return;
      }

      // vm.filterDisabled = true;
      vm.formData.obj = $rootScope.orangeConfig.objList[$rootScope.lang][0];
      vm.formData.city = $rootScope.orangeConfig.cityList[$rootScope.lang][0];
      vm.formData.room = $rootScope.orangeConfig.roomList[$rootScope.lang][0];
      vm.formData.objnumber = '';
      $rootScope.short.FilterData = vm.formData;
      $rootScope.short.FindActivated = true;
    };
  }
})();