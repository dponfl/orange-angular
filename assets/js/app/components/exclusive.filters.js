(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('ExclusiveFiltersCtrl', ExclusiveFiltersCtrl)
    .component('exclusiveFilter', {
      controller: 'ExclusiveFiltersCtrl',
      bindings: {
        ttt: '<',
        dealList: '<',
        objList: '<',
        cityList: '<',
        roomList: '<'
      },
      templateUrl: 'templates/view/exclusive/filter.html'
    });

  ExclusiveFiltersCtrl.$inject = ['GeneralConfigService'];

  /* @ngInject */
  function ExclusiveFiltersCtrl(GeneralConfigService) {
    var vm = this;

    vm.dealList = GeneralConfigService.orangeConfig.dealList[GeneralConfigService.orangeConfig.lang];
    vm.objList = GeneralConfigService.orangeConfig.objList[GeneralConfigService.orangeConfig.lang];
    vm.cityList = GeneralConfigService.orangeConfig.cityList[GeneralConfigService.orangeConfig.lang];
    vm.roomList = GeneralConfigService.orangeConfig.roomList[GeneralConfigService.orangeConfig.lang];

    vm.find = function () {
      console.log('Find...');
    };

    vm.clear = function () {
      console.log('Clear...')
    };
  }

})();
