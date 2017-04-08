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
      $rootScope.shortFindActivated = true;
      $rootScope.shortFilterData = vm.formData;
      vm.busyFind = true;
      vm.disabledClear = 'disabled';
    };

    function _clear() {
      $rootScope.shortFindActivated = true;
      vm.formData.obj = $rootScope.orangeConfig.objList[$rootScope.lang][0];
      vm.formData.city = $rootScope.orangeConfig.cityList[$rootScope.lang][0];
      vm.formData.room = $rootScope.orangeConfig.roomList[$rootScope.lang][0];
      vm.formData.objnumber = '';
      vm.busyClear = true;
      vm.disabledFind = 'disabled';
    };
  }
})();