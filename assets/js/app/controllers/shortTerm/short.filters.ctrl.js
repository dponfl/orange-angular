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

    vm.disabledClear = '';

    vm.objList = $rootScope.orangeConfig.objList[$rootScope.lang];
    vm.cityList = $rootScope.orangeConfig.cityList[$rootScope.lang];
    vm.roomList = $rootScope.orangeConfig.roomList[$rootScope.lang];

    vm.formData = {};

    vm.formData.obj = $rootScope.orangeConfig.objList[$rootScope.lang][0];
    vm.formData.city = $rootScope.orangeConfig.cityList[$rootScope.lang][0];
    vm.formData.room = $rootScope.orangeConfig.roomList[$rootScope.lang][0];
    vm.formData.objnumber = '';

    $rootScope.shortFilterData = vm.formData;

    $rootScope.$watch('lang', update);

    $rootScope.$watch('busy', function (oldVal, newVal) {
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

      if (vm.disabledFind === 'disabled') {
        return;
      }

      $rootScope.shortFilterData = vm.formData;
      vm.busyFind = true;
      vm.disabledClear = 'disabled';
      vm.disabledFind = 'disabled';
      $rootScope.shortFindActivated = true;
    };

    function _clear() {

      if (vm.disabledClear === 'disabled') {
        return;
      }

      vm.formData.obj = $rootScope.orangeConfig.objList[$rootScope.lang][0];
      vm.formData.city = $rootScope.orangeConfig.cityList[$rootScope.lang][0];
      vm.formData.room = $rootScope.orangeConfig.roomList[$rootScope.lang][0];
      vm.formData.objnumber = '';
      $rootScope.shortFilterData = vm.formData;
      vm.busyClear = true;
      vm.disabledFind = 'disabled';
      vm.disabledClear = 'disabled';
      $rootScope.shortFindActivated = true;
    };
  }
})();