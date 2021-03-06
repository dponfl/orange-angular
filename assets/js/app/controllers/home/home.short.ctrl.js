(function () {
  "use strict";

  angular.module('OrangeClient')
    .controller('HomeShortCtrl', HomeShortCtrl);

  HomeShortCtrl.$inject = ['GeneralConfigService', 'ShortService',
    '$log', '$rootScope', 'lodash', '$q'];
  function HomeShortCtrl(GeneralConfigService, ShortService,
                             $log, $rootScope, lodash, $q) {
    var vm = this;
    var _ = lodash;

    vm.objList = $rootScope.orangeConfig.objList[$rootScope.lang];
    vm.cityList = $rootScope.orangeConfig.cityList[$rootScope.lang];
    vm.roomList = $rootScope.orangeConfig.roomList[$rootScope.lang];
    vm.tagList = $rootScope.orangeConfig.tagList[$rootScope.lang];


    vm.showShort = false;
    vm.panelGroups = [];
    vm.innerGroup = [];
    vm.panels = [];

    vm.keysAll = [];
    vm.objsAll = [];
    vm.keys = [];
    vm.objs = [];

    $q.all({keys: ShortService.getAllShortObjectsKeys({show: 1, home: 1}),
      objs: ShortService.getAllShortObjectsObjs({show: 1, home: 1})})
      .then(function (results) {

        // $log.info('HomeShortCtrl, results:');
        // $log.info(results);

        vm.keysAll = results.keys;

        if (!_.isNil(results.objs.status)
          && results.objs.status == 200
          && !_.isNil(results.objs.data)
        ) {
          vm.showShort = true;
          vm.objsAll = results.objs.data;
        }
      })
      .then(function () {
        if (vm.showShort) {
          $rootScope.$watch('lang', update);
        }
      })
      .catch(function (err) {
        // todo: change by Log
        // $log.warn('Error...');
        // $log.error(err);
        return;
      });


    function update() {
      vm.objList = $rootScope.orangeConfig.objList[$rootScope.lang];
      vm.cityList = $rootScope.orangeConfig.cityList[$rootScope.lang];
      vm.roomList = $rootScope.orangeConfig.roomList[$rootScope.lang];
      vm.tagList = $rootScope.orangeConfig.tagList[$rootScope.lang];

      vm.homeShort = {
        home_short_title: $rootScope.orangeConfig.contentHome[$rootScope.lang][0].home_short_title || '',
        home_short_body_more: $rootScope.orangeConfig.contentHome[$rootScope.lang][0].home_short_body_more || '',
      };

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
            // href: '../../img/' + oElem.imgMain,
            href: oElem.imgMain,
            dataLightbox: oElem.objNumber,
            dataTitle: '',
            // src: '../../img/' + oElem.imgMain,
            src: oElem.imgMain,
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