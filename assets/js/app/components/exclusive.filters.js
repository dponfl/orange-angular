(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('ExclusiveFiltersCtrl', ExclusiveFiltersCtrl)
    .component('exclusiveFilter', {
      controller: 'ExclusiveFiltersCtrl',
      bindings: {
        dealList: '=',
        objList: '=',
        cityList: '=',
        roomList: '='
      },
      templateUrl: 'templates/view/exclusive/filter.html'
    });

  ExclusiveFiltersCtrl.$inject = ['GeneralConfigService', '$log', '$rootScope'];

  /* @ngInject */
  function ExclusiveFiltersCtrl(GeneralConfigService, $log, $rootScope) {
    var vm = this;

    vm.dealList = GeneralConfigService.orangeConfig.dealList[$rootScope.lang];
    vm.objList = GeneralConfigService.orangeConfig.objList[$rootScope.lang];
    vm.cityList = GeneralConfigService.orangeConfig.cityList[$rootScope.lang];
    vm.roomList = GeneralConfigService.orangeConfig.roomList[$rootScope.lang];

    vm.formData = {};

    vm.formData.deal = GeneralConfigService.orangeConfig.dealList[$rootScope.lang][0];
    vm.formData.obj = GeneralConfigService.orangeConfig.objList[$rootScope.lang][0];
    vm.formData.city = GeneralConfigService.orangeConfig.cityList[$rootScope.lang][0];
    vm.formData.room = GeneralConfigService.orangeConfig.roomList[$rootScope.lang][0];
    vm.formData.objNum = '';

    $rootScope.$watch('lang', update);


    function update () {
      vm.dealList = GeneralConfigService.orangeConfig.dealList[$rootScope.lang];
      vm.objList = GeneralConfigService.orangeConfig.objList[$rootScope.lang];
      vm.cityList = GeneralConfigService.orangeConfig.cityList[$rootScope.lang];
      vm.roomList = GeneralConfigService.orangeConfig.roomList[$rootScope.lang];
    };

    vm.find = function () {
      $log.debug(vm.formData);
    };

    vm.clear = function () {
      vm.formData.deal = GeneralConfigService.orangeConfig.dealList[$rootScope.lang][0];
      vm.formData.obj = GeneralConfigService.orangeConfig.objList[$rootScope.lang][0];
      vm.formData.city = GeneralConfigService.orangeConfig.cityList[$rootScope.lang][0];
      vm.formData.room = GeneralConfigService.orangeConfig.roomList[$rootScope.lang][0];
      vm.formData.objNum = '';
    };
  }

})();
