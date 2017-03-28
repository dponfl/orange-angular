(function () {
  "use strict";

  angular.module('OrangeClient')
    .controller('HomeExclusiveCtrl', HomeExclusiveCtrl);

  HomeExclusiveCtrl.$inject = ['GeneralConfigService', 'ExclusiveService',
    '$log', '$rootScope', 'lodash', '$q'];
  function HomeExclusiveCtrl(GeneralConfigService, ExclusiveService,
                             $log, $rootScope, lodash, $q) {
    var vm = this;
    var _ = lodash;

    vm.dealList = GeneralConfigService.orangeConfig.dealList[$rootScope.lang];
    vm.objList = GeneralConfigService.orangeConfig.objList[$rootScope.lang];
    vm.cityList = GeneralConfigService.orangeConfig.cityList[$rootScope.lang];
    vm.roomList = GeneralConfigService.orangeConfig.roomList[$rootScope.lang];
    vm.tagList = GeneralConfigService.orangeConfig.tagList[$rootScope.lang];


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
      vm.dealList = GeneralConfigService.orangeConfig.dealList[$rootScope.lang];
      vm.objList = GeneralConfigService.orangeConfig.objList[$rootScope.lang];
      vm.cityList = GeneralConfigService.orangeConfig.cityList[$rootScope.lang];
      vm.roomList = GeneralConfigService.orangeConfig.roomList[$rootScope.lang];
      vm.tagList = GeneralConfigService.orangeConfig.tagList[$rootScope.lang];

      vm.keys = vm.keysAll[$rootScope.lang];
      vm.objs = vm.objsAll[$rootScope.lang];

      $log.debug('$rootScope.lang: ' + $rootScope.lang);
      $log.info('vm.keys');
      $log.debug(vm.keys);
      $log.info('vm.objs');
      $log.debug(vm.objs);

      _buildPanel();
      _buildPanelGroups();
      $log.info('vm.panels:');
      $log.debug(vm.panels);
    }


    function _buildPanel() {
      vm.panels = [];
      var record = {};
      /*
       $log.warn('_buildRecord invoked...');
       $log.debug('$rootScope.lang: ' + $rootScope.lang);
       $log.info('vm.keys');
       $log.debug(vm.keys);
       $log.info('vm.objs');
       $log.debug(vm.objs);
       */

      vm.objs.map(function (oElem) {
        var tagText = '';

        vm.tagList.map(function (listElem) {
          if (listElem.key == oElem.tag) tagText = listElem.val;
        });

        record = {
          badge: oElem.tag ? true : false,
          type: oElem.tag,
          badgetext: tagText,
          objnumber: oElem.objnumber,
          img: {
            href: '../../images/' + oElem.imgmain,
            dataLightbox: '1',
            dataTitle: '',
            src: '../../images/' + oElem.imgmain,
          },
          content: [],
        };
        vm.keys.map(function (kElem) {
          var tokenVal = '';

          switch (kElem.key) {
            case 'city':
              vm.cityList.map(function (listElem) {
                if (listElem.key == oElem.city) tokenVal = listElem.val;
              });
              break;
            case 'deal':
              vm.dealList.map(function (listElem) {
                if (listElem.key == oElem.deal) tokenVal = listElem.val;
              });
              break;
            case 'obj':
              vm.objList.map(function (listElem) {
                if (listElem.key == oElem.obj) tokenVal = listElem.val;
              });
              break;
            case 'room':
              vm.roomList.map(function (listElem) {
                if (listElem.key == oElem.room) tokenVal = listElem.val;
              });
              break;
            default:
              tokenVal = oElem[kElem.key] || '';
              break;
          }
          record.content.push({
            label: kElem.label,
            text:tokenVal,
          })
        });
        vm.panels.push(record);
      });
    } // _buildPanel

    function _buildPanelGroups () {
      vm.panelGroups = [];
      vm.innerGroup = [];

      for (var i = 1; i < vm.panels.length+1; i++) {
        vm.innerGroup.push(vm.panels[i-1]);
        if (i % 3 == 0) {
          vm.panelGroups.push(vm.innerGroup);
          vm.innerGroup = [];
        }
      }
      if (vm.innerGroup.length != 0) vm.panelGroups.push(vm.innerGroup);
    } // buildPanelGroups

  }
})();