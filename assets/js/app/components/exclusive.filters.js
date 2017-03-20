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

  ExclusiveFiltersCtrl.$inject = ['GeneralConfigService', '$log', '$scope'];

  /* @ngInject */
  function ExclusiveFiltersCtrl(GeneralConfigService, $log, $scope) {
    var vm = this;

    vm.lang = GeneralConfigService.orangeConfig.lang;

    vm.dealList = GeneralConfigService.orangeConfig.dealList[GeneralConfigService.orangeConfig.lang];
    vm.objList = GeneralConfigService.orangeConfig.objList[GeneralConfigService.orangeConfig.lang];
    vm.cityList = GeneralConfigService.orangeConfig.cityList[GeneralConfigService.orangeConfig.lang];
    vm.roomList = GeneralConfigService.orangeConfig.roomList[GeneralConfigService.orangeConfig.lang];

    vm.initData = {
      deal: GeneralConfigService.orangeConfig.dealList[GeneralConfigService.orangeConfig.lang][0],
      obj: vm.objList[0],
      city: vm.cityList[0],
      room: vm.roomList[0],
      objNum: ''
    };

    // vm.formData = vm.initData;

    vm.formData = {};

    vm.formData.deal = vm.initData.deal;
    vm.formData.obj = vm.initData.obj;
    vm.formData.city = vm.initData.city;
    vm.formData.room = vm.initData.room;
    vm.formData.objNum = vm.initData.objNum;

    $scope.$watch('ExclusiveFiltersCtrl.lang', function (newVal, oldVal) {
      $log.info('newVal: ' + newVal);
      $log.info('oldVal: ' +oldVal);
    });

    vm.test = function (newVal, oldVal) {
      $log.info('newVal: ' + newVal);
      $log.info('oldVal: ' +oldVal);
    };

    vm.update = function () {
      $log.info('vm.update...');
      vm.dealList = GeneralConfigService.orangeConfig.dealList[GeneralConfigService.orangeConfig.lang];
    };

    vm.find = function () {
      $log.info('Find...');
      $log.debug(vm.formData);
    };

    vm.clear = function () {
      $log.info('Clear...');
      $log.warn('GeneralConfigService.orangeConfig.lang: ' + GeneralConfigService.orangeConfig.lang);
      vm.initData = {
        deal: vm.dealList[0],
        obj: vm.objList[0],
        city: vm.cityList[0],
        room: vm.roomList[0],
        objNum: ''
      };

      vm.dealList = GeneralConfigService.orangeConfig.dealList[GeneralConfigService.orangeConfig.lang];
      vm.formData.deal = GeneralConfigService.orangeConfig.dealList[GeneralConfigService.orangeConfig.lang][0];
      vm.formData.obj = vm.initData.obj;
      vm.formData.city = vm.initData.city;
      vm.formData.room = vm.initData.room;
      vm.formData.objNum = vm.initData.objNum;
    };
  }

})();
