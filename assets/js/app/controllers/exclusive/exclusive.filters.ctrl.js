(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('ExclusiveFiltersCtrl', ExclusiveFiltersCtrl);

  ExclusiveFiltersCtrl.$inject = ['$log', '$rootScope', '$scope', 'lodash'];

  /* @ngInject */
  function ExclusiveFiltersCtrl($log, $rootScope, $scope, lodash) {
    var _ = lodash;
    var vm = this;
    vm.find = _find;
    vm.clear = _clear;

    // todo: delete
    vm.exclusiveBusy = $rootScope.exclusive.busy;

    vm.filterDisabled = false;

    vm.objList = $rootScope.orangeConfig.objList[$rootScope.lang];
    vm.dealList = $rootScope.orangeConfig.dealList[$rootScope.lang];
    vm.cityList = $rootScope.orangeConfig.cityList[$rootScope.lang];
    vm.roomList = $rootScope.orangeConfig.roomList[$rootScope.lang];

    vm.formData = {};

    vm.formData.obj = $rootScope.orangeConfig.objList[$rootScope.lang][0];
    vm.formData.deal = _getDealObj($scope.$parent.directLinkDeal) || $rootScope.orangeConfig.dealList[$rootScope.lang][0];
    vm.formData.city = $rootScope.orangeConfig.cityList[$rootScope.lang][0];
    vm.formData.room = $rootScope.orangeConfig.roomList[$rootScope.lang][0];
    vm.formData.objnumber = '';
    vm.formData.objnumber = $scope.$parent.directLinkObjectNumber || '';

    $log.info('<<<<<<<< passed params: >>>>>>');
    $log.info('directLinkDeal: ', $scope.$parent.directLinkDeal);
    $log.info('directLinkObjectNumber: ', $scope.$parent.directLinkObjectNumber);
    $log.info('dealList: ', $rootScope.orangeConfig.dealList[$rootScope.lang]);


    $rootScope.exclusive.FilterData = vm.formData;

    $rootScope.$watch('lang', update);

    $rootScope.$watch('exclusive.busy', function (newVal, oldVal) {
      vm.busy = newVal;
      vm.filterDisabled = newVal;
/*
      if (!newVal) {
        vm.filterDisabled = newVal;
      }
*/
    });

    function _getDealObj(key) {
      var foundObj = null;
      _.forEach($rootScope.orangeConfig.dealList[$rootScope.lang], function (el) {
        if (el.key == key) {
          foundObj = el;
        }
      });
      return foundObj
    } // _getDealObj


    function update () {
      vm.objList = $rootScope.orangeConfig.objList[$rootScope.lang];
      vm.dealList = $rootScope.orangeConfig.dealList[$rootScope.lang];
      vm.cityList = $rootScope.orangeConfig.cityList[$rootScope.lang];
      vm.roomList = $rootScope.orangeConfig.roomList[$rootScope.lang];
    };

    function _find() {

      if (vm.filterDisabled) {
        return;
      }

      // vm.filterDisabled = true;
      $rootScope.exclusive.FilterData = vm.formData;
      $rootScope.exclusive.FindActivated = true;
    };

    function _clear() {

      if (vm.filterDisabled) {
        return;
      }

      // vm.filterDisabled = true;
      vm.formData.obj = $rootScope.orangeConfig.objList[$rootScope.lang][0];
      vm.formData.deal = $rootScope.orangeConfig.dealList[$rootScope.lang][0];
      vm.formData.city = $rootScope.orangeConfig.cityList[$rootScope.lang][0];
      vm.formData.room = $rootScope.orangeConfig.roomList[$rootScope.lang][0];
      vm.formData.objnumber = '';
      $rootScope.exclusive.FilterData = vm.formData;
      $rootScope.exclusive.FindActivated = true;
    };
  }
})();