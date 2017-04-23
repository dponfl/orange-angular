(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('LongFiltersCtrl', LongFiltersCtrl);

  LongFiltersCtrl.$inject = ['$log', '$rootScope'];

  /* @ngInject */
  function LongFiltersCtrl($log, $rootScope) {
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

    $rootScope.long.longFilterData = vm.formData;

    $rootScope.$watch('lang', update);

    $rootScope.$watch('long.busy', function (oldVal, newVal) {
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
      $rootScope.long.longFilterData = vm.formData;
      vm.busyFind = true;
      vm.disabledClear = 'disabled';
      $rootScope.long.longFindActivated = true;
    };

    function _clear() {
      vm.formData.obj = $rootScope.orangeConfig.objList[$rootScope.lang][0];
      vm.formData.city = $rootScope.orangeConfig.cityList[$rootScope.lang][0];
      vm.formData.room = $rootScope.orangeConfig.roomList[$rootScope.lang][0];
      vm.formData.objnumber = '';
      $rootScope.long.longFilterData = vm.formData;
      vm.busyClear = true;
      vm.disabledFind = 'disabled';
      $rootScope.long.longFindActivated = true;
    };
  }
})();