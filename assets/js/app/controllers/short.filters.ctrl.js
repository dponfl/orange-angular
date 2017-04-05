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

/*
    $log.info('1111111111111111111111111');
    $log.debug($rootScope.orangeConfig);
*/

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


    function update () {
      vm.objList = $rootScope.orangeConfig.objList[$rootScope.lang];
      vm.cityList = $rootScope.orangeConfig.cityList[$rootScope.lang];
      vm.roomList = $rootScope.orangeConfig.roomList[$rootScope.lang];
    };

    function _find() {
      $rootScope.shortFindActivated = true;
/*
      $log.info('ShortFiltersCtrl::find()');
      $log.debug(vm.formData);
*/
      $rootScope.shortFilterData = vm.formData;
    };

    function _clear() {
      vm.formData.obj = $rootScope.orangeConfig.objList[$rootScope.lang][0];
      vm.formData.city = $rootScope.orangeConfig.cityList[$rootScope.lang][0];
      vm.formData.room = $rootScope.orangeConfig.roomList[$rootScope.lang][0];
      vm.formData.objnumber = '';
    };
  }
})();