(function () {
  "use strict";

  angular.module('OrangeClient')
    .controller('ShortCtrl', ShortCtrl);

  ShortCtrl.$inject = ['GeneralConfigService', 'ShortService',
    '$log', '$rootScope', 'lodash', '$q'];
  function ShortCtrl(GeneralConfigService, ShortService,
                             $log, $rootScope, lodash, $q) {
    var vm = this;
    var _ = lodash;

    vm.objList = GeneralConfigService.orangeConfig.objList[$rootScope.lang];
    vm.cityList = GeneralConfigService.orangeConfig.cityList[$rootScope.lang];
    vm.roomList = GeneralConfigService.orangeConfig.roomList[$rootScope.lang];
    vm.tagList = GeneralConfigService.orangeConfig.tagList[$rootScope.lang];

    vm.panels = [];

    vm.keysAll = [];
    vm.objsAll = [];
    vm.keys = [];
    vm.objs = [];

    $q.all({keys: ShortService.getAllShortObjectsKeys({show: 1}),
      objs: ShortService.getAllShortObjectsObjs({show: 1})})
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
        var _gallery = [];

        vm.tagList.map(function (listElem) {
          if (listElem.key == oElem.tag) tagText = listElem.val;
        });

        record = {
          badge: oElem.tag ? true : false,
          type: oElem.tag,
          badgeText: tagText,
          objNumber: oElem.objNumber,
          img: {
            href: '../../images/' + oElem.imgMain,
            dataLightbox: oElem.objNumber,
            dataTitle: '',
            src: '../../images/' + oElem.imgMain,
          },
          content: [],
          gallery: [],
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

          if (!_.isArray(record.content[kElem.group - 1])) {
            record.content[kElem.group - 1] = [];
          }

          record.content[kElem.group - 1].push({
            label: kElem.label,
            text:tokenVal,
          })
        });

        _gallery = oElem.imgGallery.replace(/^\s+|\s+$/gm,'').split(';');
        _gallery.map(function (el) {
          record.gallery.push({
            href: '../../images/' + el,
            dataLightbox: 'gallery-' + oElem.objNumber,
            dataTitle: '',
            src: '../../images/' + el,
          });
        });
        record.price = oElem.price;
        record.calendar = oElem.calendar;
        record.googleMap = oElem.googleMap;
        record.youtube = oElem.youtube;


        vm.panels.push(record);
      });
    } // _buildPanel


  }
})();