(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('ExclusiveFiltersCtrl', ExclusiveFiltersCtrl);

  ExclusiveFiltersCtrl.$inject = ['GeneralConfigService', '$log', '$rootScope', 'oCity', 'oExclusiveKey'];

  /* @ngInject */
  function ExclusiveFiltersCtrl(GeneralConfigService, $log, $rootScope, oCity, oExclusiveKey) {
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
    vm.formData.objnumber = '';

    $rootScope.$watch('lang', update);


    function update () {
      vm.dealList = GeneralConfigService.orangeConfig.dealList[$rootScope.lang];
      vm.objList = GeneralConfigService.orangeConfig.objList[$rootScope.lang];
      vm.cityList = GeneralConfigService.orangeConfig.cityList[$rootScope.lang];
      vm.roomList = GeneralConfigService.orangeConfig.roomList[$rootScope.lang];
    };

    vm.find = function () {
    };

    vm.clear = function () {
      vm.formData.deal = GeneralConfigService.orangeConfig.dealList[$rootScope.lang][0];
      vm.formData.obj = GeneralConfigService.orangeConfig.objList[$rootScope.lang][0];
      vm.formData.city = GeneralConfigService.orangeConfig.cityList[$rootScope.lang][0];
      vm.formData.room = GeneralConfigService.orangeConfig.roomList[$rootScope.lang][0];
      vm.formData.objnumber = '';
    };

    vm.testGetData = function () {
      oCity.find({key: ['pafos', 'limassol'], lang: 'ru'}, function (data) {})
        .$promise
        .then(function (data) {
        })
        .catch(function (err) {
          // todo: change by Log
          console.log('Error...');
          console.dir(err);
          return;
        })

      // oExclusiveKey.query(function (data) {
      oExclusiveKey.find({lang: 'en'}, function (data) {})
        .$promise
        .then(function(data) {
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