(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('ShortFiltersCtrl', ShortFiltersCtrl);

  ShortFiltersCtrl.$inject = ['GeneralConfigService', '$log', '$rootScope'];

  /* @ngInject */
  function ShortFiltersCtrl(GeneralConfigService, $log, $rootScope) {
    var vm = this;
    vm.find = _find;
    vm.clear = _clear;

    vm.objList = GeneralConfigService.orangeConfig.objList[$rootScope.lang];
    vm.cityList = GeneralConfigService.orangeConfig.cityList[$rootScope.lang];
    vm.roomList = GeneralConfigService.orangeConfig.roomList[$rootScope.lang];

    vm.formData = {};

    vm.formData.obj = GeneralConfigService.orangeConfig.objList[$rootScope.lang][0];
    vm.formData.city = GeneralConfigService.orangeConfig.cityList[$rootScope.lang][0];
    vm.formData.room = GeneralConfigService.orangeConfig.roomList[$rootScope.lang][0];
    vm.formData.objnumber = '';

    $rootScope.$watch('lang', update);


    function update () {
      vm.objList = GeneralConfigService.orangeConfig.objList[$rootScope.lang];
      vm.cityList = GeneralConfigService.orangeConfig.cityList[$rootScope.lang];
      vm.roomList = GeneralConfigService.orangeConfig.roomList[$rootScope.lang];
    };

    function _find() {
      $rootScope.shortFindActivated = true;
      $log.info('ShortFiltersCtrl::find()');
      $log.debug(vm.formData);
      $rootScope.shortFilterData = vm.formData;
    };

    function _clear() {
      vm.formData.obj = GeneralConfigService.orangeConfig.objList[$rootScope.lang][0];
      vm.formData.city = GeneralConfigService.orangeConfig.cityList[$rootScope.lang][0];
      vm.formData.room = GeneralConfigService.orangeConfig.roomList[$rootScope.lang][0];
      vm.formData.objnumber = '';
    };
  }
})();