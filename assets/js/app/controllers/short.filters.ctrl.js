(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('ShortFiltersCtrl', ShortFiltersCtrl);

  ShortFiltersCtrl.$inject = ['GeneralConfigService', '$log', '$rootScope'];

  /* @ngInject */
  function ShortFiltersCtrl(GeneralConfigService, $log, $rootScope) {
    var vm = this;

    vm.objList = GeneralConfigService.orangeConfig.objList[$rootScope.lang];
    vm.cityList = GeneralConfigService.orangeConfig.cityList[$rootScope.lang];
    vm.roomList = GeneralConfigService.orangeConfig.roomList[$rootScope.lang];

    vm.formData = {};

    vm.formData.obj = GeneralConfigService.orangeConfig.objList[$rootScope.lang][0];
    vm.formData.city = GeneralConfigService.orangeConfig.cityList[$rootScope.lang][0];
    vm.formData.room = GeneralConfigService.orangeConfig.roomList[$rootScope.lang][0];
    vm.formData.objNum = '';

    $rootScope.$watch('lang', update);


    function update () {
      vm.objList = GeneralConfigService.orangeConfig.objList[$rootScope.lang];
      vm.cityList = GeneralConfigService.orangeConfig.cityList[$rootScope.lang];
      vm.roomList = GeneralConfigService.orangeConfig.roomList[$rootScope.lang];
    };

    vm.find = function () {
      $log.debug(vm.formData);
    };

    vm.clear = function () {
      vm.formData.obj = GeneralConfigService.orangeConfig.objList[$rootScope.lang][0];
      vm.formData.city = GeneralConfigService.orangeConfig.cityList[$rootScope.lang][0];
      vm.formData.room = GeneralConfigService.orangeConfig.roomList[$rootScope.lang][0];
      vm.formData.objNum = '';
    };
  }
})();