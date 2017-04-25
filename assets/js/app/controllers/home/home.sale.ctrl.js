(function () {
  "use strict";

  angular.module('OrangeClient')
    .controller('HomeSaleCtrl', HomeSaleCtrl);

  HomeSaleCtrl.$inject = ['GeneralConfigService', 'SaleService',
    '$log', '$rootScope', 'lodash', '$q'];
  function HomeSaleCtrl(GeneralConfigService, SaleService,
                             $log, $rootScope, lodash, $q) {
    var vm = this;
    var _ = lodash;

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

    $q.all({keys: SaleService.getAllSaleObjectsKeys({show: 1, home: 1}),
      objs: SaleService.getAllSaleObjectsObjs({show: 1, home: 1})})
      .then(function (results) {

        vm.keysAll = results.keys;
        vm.objsAll = results.objs.data;

      })
      .then(function () {

        $rootScope.$watch('lang', update);
      })
      .catch(function (err) {
        // todo: change by Log
        $log.warn('Error...');
        $log.error(err);
        return;
      });


    function update() {
      vm.objList = GeneralConfigService.orangeConfig.objList[$rootScope.lang];
      vm.cityList = GeneralConfigService.orangeConfig.cityList[$rootScope.lang];
      vm.roomList = GeneralConfigService.orangeConfig.roomList[$rootScope.lang];
      vm.tagList = GeneralConfigService.orangeConfig.tagList[$rootScope.lang];

      vm.keys = vm.keysAll[$rootScope.lang];
      vm.objs = vm.objsAll[$rootScope.lang];

      _buildPanel();
      _buildPanelGroups();
    }


    function _buildPanel() {
      vm.panels = [];
      var record = {};

      vm.objs.map(function (oElem) {
        var tagText = '';

        vm.tagList.map(function (listElem) {
          if (listElem.key == oElem.tag) tagText = listElem.val;
        });

        record = {
          badge: oElem.tag ? true : false,
          type: oElem.tag,
          badgetext: tagText,
          objNumber: oElem.objNumber,
          img: {
            href: '../../images/' + oElem.imgMain,
            dataLightbox: oElem.objNumber,
            dataTitle: '',
            src: '../../images/' + oElem.imgMain,
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