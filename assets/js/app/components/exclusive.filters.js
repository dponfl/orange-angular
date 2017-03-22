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

  ExclusiveFiltersCtrl.$inject = ['GeneralConfigService', '$log', '$rootScope', 'oCity'];

  /* @ngInject */
  function ExclusiveFiltersCtrl(GeneralConfigService, $log, $rootScope, oCity) {
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

    vm.testGetData = function () {
      oCity.find({key: ['pafos', 'limassol'], lang: 'ru'}, function (data) {
      })
        .$promise
        .then(function (data) {
          $log.info('testGetData');
          $log.debug(data);
        })
        .catch(function (err) {
          // todo: change by Log
          console.log('Error...');
          console.dir(err);
          return;
        })
    }
  }

})();
