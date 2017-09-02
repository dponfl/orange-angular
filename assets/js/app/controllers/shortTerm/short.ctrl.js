(function () {
  "use strict";

  angular.module('OrangeClient')
    .controller('ShortCtrl', ShortCtrl);

  ShortCtrl.$inject = ['GeneralConfigService', 'ShortService',
    '$log', '$rootScope', '$scope', 'lodash', '$q', '$alert'];

  function ShortCtrl(GeneralConfigService, ShortService,
                     $log, $rootScope, $scope, lodash, $q, $alert) {
    var _ = lodash;
    var shortBusyAlert = $alert({title: 'Title',
      content: 'Content',
      container: '#spinner-container-short',
      show: true,
      templateUrl: '../templates/view/busyAlert.html'
    });

    $scope.shortBusy = $rootScope.short.busy;
    $rootScope.short.showNotFound = false;
    $rootScope.short.showServerError = false;
    $rootScope.short.page = 1;
    $rootScope.short.busy = false;
    $rootScope.short.scrollDisabled = false;
    $rootScope.short.showFoundNothing = false;

    $rootScope.short.panelsAllLangs = {};
    $rootScope.short.panels = [];

    $rootScope.objList = $rootScope.orangeConfig.objList[$rootScope.lang];
    $rootScope.cityList = $rootScope.orangeConfig.cityList[$rootScope.lang];
    $rootScope.roomList = $rootScope.orangeConfig.roomList[$rootScope.lang];
    $rootScope.tagList = $rootScope.orangeConfig.tagList[$rootScope.lang];

    $scope.activateNextPage = _activateNextPage;

    $rootScope.$watch('short.FindActivated', _updateData);

    $rootScope.$watch('lang', _update);

    $rootScope.$watch('short.busy', function (newVal, oldVal) {
      $scope.shortBusy = $rootScope.short.busy;
    });

    $scope.$watch('shortBusy', function (newVal, oldVal) {
      if (!oldVal && newVal) {
        shortBusyAlert.$promise.then(shortBusyAlert.show);
      } else if (oldVal && !newVal) {
        shortBusyAlert.$promise.then(shortBusyAlert.hide);
      }
    });

    function _updateData () {

      if ($rootScope.short.FindActivated) {

        $rootScope.short.panels = [];
        $rootScope.short.busy = false;
        $rootScope.short.FindActivated = false;

        $rootScope.short.page = 1;
        $rootScope.short.showNotFound = false;
        $rootScope.short.showServerError = false;
        $rootScope.short.scrollDisabled = false;
        $rootScope.short.showFoundNothing = false;

        $q.when(_performRequest($rootScope.short.FilterData))
          .then(function (res) {

            if (!res.performed &&
              (res.reason == 'notFound' || res.reason == 'serverError')) {
              $rootScope.short.scrollDisabled = true;
              return;
            }

            var buildResult = _buildPanel(res);

            if (!buildResult.performed) return;

            $rootScope.short.panelsAllLangs = buildResult.data;

            _update();

            return;
          });

      }
    } // _updateData

    /**
     *
     * @param reqParams
     * @returns {{performed: boolean, reason: string, data: {keys: {}, objs: {}}}}
     * @private
     */

    function _performRequest(reqParams) {

      if ($rootScope.short.busy) {

        return {
          performed: false,
          reason: 'busy',
          data: {
            keys: {},
            objs: {},
          },
        };
      }

      if ($rootScope.short.showNotFound) {

        return {
          performed: false,
          reason: 'notFound',
          data: {
            keys: {},
            objs: {},
          },
        };
      }

      if ($rootScope.short.showServerError) {

        return {
          performed: false,
          reason: 'serverError',
          data: {
            keys: {},
            objs: {},
          },
        };
      }



      $rootScope.short.busy = true;

      var params = {};
      var objReqParams = {show: 1};
      var objReqPager = {};

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

      objReqPager.limit = $rootScope.pagerNumRecords*$rootScope.numLang;
      objReqPager.page = $rootScope.short.page;

      $rootScope.short.page++;

      return $q.all({keys: ShortService.getAllShortObjectsKeys({show: 1}),
        objs: ShortService.getAllShortObjectsObjsPager(objReqParams, objReqPager)})
        .then(function (results) {
          $rootScope.short.busy = false;

          if (results.objs.status == 404) {
            $rootScope.short.showNotFound = true;

            if (objReqPager.page == 1) {
              $rootScope.short.showFoundNothing = true;
            }

            return {
              performed: false,
              reason: 'notFound',
              data: {
                keys: {},
                objs: {},
              },
            };
          }

          if (results.objs.status == 500) {
            $rootScope.short.showServerError = true;

            return {
              performed: false,
              reason: 'serverError',
              data: {
                keys: {},
                objs: {},
              },
            };
          }

          if (results.objs.status == 200) {
            $rootScope.short.showNotFound = false;
            $rootScope.short.showServerError = false;

            return {
              performed: true,
              reason: 'ok',
              data: {
                keys: results.keys,
                objs: results.objs.data,
              },
            };
          }

        })
        .catch(function (err) {
          // todo: change by Log
          $log.warn('Error...');
          $log.error(err);

          return {
            performed: false,
            reason: 'error',
            data: {
              error: err,
            },
          };
        });
    } // _performRequest

    /**
     *
     * @param requestResult: {{performed: boolean, reason: string,
     * data: {keys: {}, objs: {}}}}
     * @returns {{performed: boolean, reason: string, data: array}}
     * @private
     */

    function _buildPanel(requestResult) {

      if (!requestResult.performed) {

        return {
          performed: requestResult.performed,
          reason: requestResult.reason,
          data: [],
        };
      }

      var result = {};

      $rootScope.langList.map(function (elem) {
        result[elem] = __buildPanelOneLang(requestResult.data.keys[elem],
          requestResult.data.objs[elem], elem);

      });

      return {
        performed: true,
        reason: 'ok',
        data: result,
      };

      function __buildPanelOneLang(panelKeys, panelObjs, lang) {

        var panels = [];
        var record = {};

        panelObjs.map(function (oElem) {
          var tagText = '';
          var _gallery = [];

          $rootScope.orangeConfig.tagList[lang].map(function (listElem) {
            if (listElem.key == oElem.tag) tagText = listElem.val;
          });

          record = {
            badge: oElem.tag ? true : false,
            type: oElem.tag,
            badgeText: tagText,
            objNumber: oElem.objNumber,
            img: {
              href: '../../img/' + oElem.imgMain,
              dataLightbox: oElem.objNumber,
              dataTitle: '',
              src: '../../img/' + oElem.imgMain,
            },
            content: [],
            gallery: [],
          };

          panelKeys.map(function (kElem) {
            var tokenVal = '';

            switch (kElem.key) {
              case 'city':
                $rootScope.orangeConfig.cityList[lang].map(function (listElem) {
                  if (listElem.key == oElem.city) tokenVal = listElem.val;
                });
                break;
              case 'obj':
                $rootScope.orangeConfig.objList[lang].map(function (listElem) {
                  if (listElem.key == oElem.obj) tokenVal = listElem.val;
                });
                break;
              case 'room':
                $rootScope.orangeConfig.roomList[lang].map(function (listElem) {
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

            if (kElem.key !== 'deal') {
              record.content[kElem.group - 1].push({
                key: kElem.key,
                label: kElem.label,
                text:tokenVal,
              })
            }

          });

          _gallery = oElem.imgGallery.replace(/^\s+|\s+$/gm,'').split(';');
          _gallery.map(function (el) {
            record.gallery.push({
              href: '../../img/' + el,
              dataLightbox: 'gallery-' + oElem.objNumber,
              dataTitle: '',
              src: '../../img/' + el,
            });
          });
          record.price = oElem.price;
          record.calendar = oElem.calendar;
          record.googleMap = oElem.googleMap;
          record.youtube = oElem.youtube;
          record.youtubeshow = (oElem.youtube ? true : false);


          panels.push(record);
        });

        return panels;
      }; // __buildPanelOneLang

    } // _buildPanel

    function _update() {
      $rootScope.objList = $rootScope.orangeConfig.objList[$rootScope.lang];
      $rootScope.cityList = $rootScope.orangeConfig.cityList[$rootScope.lang];
      $rootScope.roomList = $rootScope.orangeConfig.roomList[$rootScope.lang];
      $rootScope.tagList = $rootScope.orangeConfig.tagList[$rootScope.lang];

      $rootScope.short.panels = $rootScope.short.panelsAllLangs[$rootScope.lang];

    } // update

    function _activateNextPage() {
      if ($rootScope.short.scrollDisabled) return;

      $q.when(_performRequest($rootScope.short.FilterData))
        .then(function (res) {

          if (!res.performed &&
            (res.reason == 'notFound' || res.reason == 'serverError')) {
            $rootScope.short.scrollDisabled = true;
            return;
          }

          $rootScope.short.scrollDisabled = false;

          var buildResult = _buildPanel(res);

          if (!buildResult.performed) return;
          
          _.forEach(buildResult.data, function (val, key) {
            val.map(function (elem) {
              if (!_.isArray($rootScope.short.panelsAllLangs[key])) {
                $rootScope.short.panelsAllLangs[key] = [];
              }
              $rootScope.short.panelsAllLangs[key].push(elem);
            });

          });

          _update();

          return;
        });

    } // _activateNextPage
  }
})();