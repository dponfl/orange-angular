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
    vm.showNotFound = false;
    vm.showServerError = false;

    vm.performRequest = _performRequest;

    $rootScope.$watch('shortFindActivated', function () {
      if ($rootScope.shortFindActivated) {
        $log.warn('shortFindActivated...');
        $log.info('$rootScope.shortFilterData');
        $log.debug($rootScope.shortFilterData);
        vm.performRequest($rootScope.shortFilterData);
        $rootScope.shortFindActivated = false;
      }
    });

    vm.objList = GeneralConfigService.orangeConfig.objList[$rootScope.lang];
    vm.cityList = GeneralConfigService.orangeConfig.cityList[$rootScope.lang];
    vm.roomList = GeneralConfigService.orangeConfig.roomList[$rootScope.lang];
    vm.tagList = GeneralConfigService.orangeConfig.tagList[$rootScope.lang];

    vm.panels = [];

    vm.keysAll = [];
    vm.objsAll = [];
    vm.keys = [];
    vm.objs = [];

    _performRequest({});

    function _performRequest(reqParams) {
      var params = {};
      var objReqParams = {show: 1};

      if (typeof reqParams.objnumber != 'undefined' && reqParams.objnumber) {
        objReqParams.objnumber = reqParams.objnumber;
      }
      if (typeof reqParams.city == 'object' && reqParams.city.key != 'any') {
        objReqParams.city = reqParams.city.key;
      }
      if (typeof reqParams.obj == 'object' && reqParams.obj.key != 'any') {
        objReqParams.obj = reqParams.obj.key;
      }
      if (typeof reqParams.room == 'object' && reqParams.room.key != 'any') {
        objReqParams.room = reqParams.room.key;
      }

      $log.info('objReqParams');
      $log.debug(objReqParams);

      $q.all({keys: ShortService.getAllShortObjectsKeys({show: 1}),
        objs: ShortService.getAllShortObjectsObjs(objReqParams)})
        .then(function (results) {

          vm.keysAll= [];
          vm.objsAll = [];

          $log.info('results');
          $log.debug(results);

          vm.keysAll = results.keys;

          if (results.objs.status == 404) {
            vm.showNotFound = true;
          }

          if (results.objs.status == 500) {
            vm.showServerError = true;
          }

          if (results.objs.status == 200) {
            vm.showNotFound = false;
            vm.showServerError = false;
            vm.objsAll = results.objs.data;
          }


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
    } // _performRequest




    function update() {
      vm.objList = GeneralConfigService.orangeConfig.objList[$rootScope.lang];
      vm.cityList = GeneralConfigService.orangeConfig.cityList[$rootScope.lang];
      vm.roomList = GeneralConfigService.orangeConfig.roomList[$rootScope.lang];
      vm.tagList = GeneralConfigService.orangeConfig.tagList[$rootScope.lang];

      $log.info('vm.objsAll');
      $log.debug(vm.objsAll);

      vm.keys = vm.keysAll[$rootScope.lang];
      vm.objs = vm.objsAll[$rootScope.lang];

/*
      $log.debug('$rootScope.lang: ' + $rootScope.lang);
      $log.info('vm.keys');
      $log.debug(vm.keys);
      $log.info('vm.objs');
      $log.debug(vm.objs);
*/

      // todo: make return from _buildPanel true/false and set up controller variable
      // to display message that there is no data
      _buildPanel();
/*
      $log.info('vm.panels:');
      $log.debug(vm.panels);
*/
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

      if (vm.showNotFound || vm.showServerError) return;

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