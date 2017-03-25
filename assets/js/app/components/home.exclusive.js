"use strict";

(function () {

  angular.module('OrangeClient')
    .controller('HomeExclusiveCtrl', HomeExclusiveCtrl)
    .component('smallPanel', {
      bindings: {
        badge: '<',
        type: '<',
        img: '<',
        content: '<'
      },
      templateUrl: 'templates/view/home/exclusivePanelHome.html'
    });

  HomeExclusiveCtrl.$inject = ['GeneralConfigService', 'ExclusiveService',
    '$log', '$rootScope', 'lodash', '$q'];
  function HomeExclusiveCtrl(GeneralConfigService, ExclusiveService,
                             $log, $rootScope, lodash, $q) {
    var vm = this;
    var _ = lodash;

    vm.dealList = GeneralConfigService.orangeConfig.dealList[$rootScope.lang];
    vm.objList = GeneralConfigService.orangeConfig.objList[$rootScope.lang];
    vm.cityList = GeneralConfigService.orangeConfig.cityList[$rootScope.lang];
    vm.roomList = GeneralConfigService.orangeConfig.roomList[$rootScope.lang]

    vm.panelGroups = [];
    vm.innerGroup = [];
    vm.panels = [];

    vm.keysAll = [];
    vm.objsAll = [];
    vm.keys = [];
    vm.objs = [];

    $q.all({keys: ExclusiveService.getAllExclusiveObjectsHomeKeys(),
    objs: ExclusiveService.getAllExclusiveObjectsHomeObjs()})
      .then(function (results) {

        vm.keysAll = results.keys;
        vm.objsAll = results.objs;

/*
        $log.info('loadPanels');
        $log.debug('$rootScope.lang: ' + $rootScope.lang);

        $log.info('results.keys');
        $log.debug(results.keys);
        $log.info('results.objs');
        $log.debug(results.objs);
*/

      }/*, function (error) {
        $log.error(error);
      }*/)
      .then(function () {

/*
        $rootScope.$watch('lang', function () {
          vm.keys = vm.keysAll[$rootScope.lang];
          vm.objs = vm.objsAll[$rootScope.lang];

          $log.debug('$rootScope.lang: ' + $rootScope.lang);
          $log.info('vm.keys');
          $log.debug(vm.keys);
          $log.info('vm.objs');
          $log.debug(vm.objs);
        });
*/
        $rootScope.$watch('lang', update);
      })
      .catch(function (err) {
        // todo: change by Log
        $log.warn('Error...');
        $log.error(err);
        return;
      });


    function update() {
      vm.keys = vm.keysAll[$rootScope.lang];
      vm.objs = vm.objsAll[$rootScope.lang];

      $log.debug('$rootScope.lang: ' + $rootScope.lang);
      $log.info('vm.keys');
      $log.debug(vm.keys);
      $log.info('vm.objs');
      $log.debug(vm.objs);

      _buildRecord();
    }

    
    function _buildRecord(/*elem*/) {
      $log.warn('_buildRecord invoked...');
      $log.debug('$rootScope.lang: ' + $rootScope.lang);
      $log.info('vm.keys');
      $log.debug(vm.keys);
      $log.info('vm.objs');
      $log.debug(vm.objs);
    }

    function buildPanelGroups () {
      for (var i = 1; i < vm.panels.length+1; i++) {
        vm.innerGroup.push(vm.panels[i-1]);
        if (i % 3 == 0) {
          vm.panelGroups.push(vm.innerGroup);
          vm.innerGroup = [];
        }
      }
      if (vm.innerGroup.length != 0) vm.panelGroups.push(vm.innerGroup);
    }

  }
  

})();