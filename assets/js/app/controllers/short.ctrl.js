(function () {
  "use strict";

  angular.module('OrangeClient')
    .controller('ShortCtrl', ShortCtrl);

  ShortCtrl.$inject = ['GeneralConfigService', 'ShortService',
    '$log', '$rootScope', '$scope', 'lodash', '$q', '$alert'];
  function ShortCtrl(GeneralConfigService, ShortService,
                     $log, $rootScope, $scope, lodash, $q, $alert) {
    var _ = lodash;
    var busyAlert = $alert({title: 'Title',
      content: 'Content',
      container: '#spinner-container',
      show: true,
      templateUrl: '../templates/view/busyAlert.html'});

    $rootScope.showNotFound = false;
    $scope.showServerError = false;
    $rootScope.pageShort = 1;
    $scope.busy = false;
    $rootScope.scrollDisabled = false;
    $rootScope.showFoundNothing = false;

    $rootScope.panelsAllLangs = {};
    $rootScope.panels = [];

    $rootScope.objList = GeneralConfigService.orangeConfig.objList[$rootScope.lang];
    $rootScope.cityList = GeneralConfigService.orangeConfig.cityList[$rootScope.lang];
    $rootScope.roomList = GeneralConfigService.orangeConfig.roomList[$rootScope.lang];
    $rootScope.tagList = GeneralConfigService.orangeConfig.tagList[$rootScope.lang];

    $scope.activateNextPage = _activateNextPage;

    $rootScope.$watch('shortFindActivated', _updateData);

    $rootScope.$watch('lang', _update);

    $scope.$watch('busy', function (oldVal, newVal) {
      $rootScope.busy = newVal;
      if (oldVal && !newVal) {
        $log.debug('busyAlert.show() - oldVal: ' + oldVal + ', newVal: ' + newVal);
        busyAlert.$promise.then(busyAlert.show);
      } else if (!oldVal && newVal) {
        $log.debug('busyAlert.hide() - oldVal: ' + oldVal + ', newVal: ' + newVal);
        busyAlert.$promise.then(busyAlert.hide);
      }
    });

    function _updateData () {

      if ($rootScope.shortFindActivated) {

        $scope.busy = false;
        $rootScope.shortFindActivated = false;

        $rootScope.pageShort = 1;
        $rootScope.showNotFound = false;
        $scope.showServerError = false;
        $rootScope.scrollDisabled = false;
        $rootScope.showFoundNothing = false;

        $q.when(_performRequest($rootScope.shortFilterData))
          .then(function (res) {

            // todo: only for notFound and serverError
            if (!res.performed) {
              $rootScope.scrollDisabled = true;
              return;
            }

            var buildResult = _buildPanel(res);

            if (!buildResult.performed) return;

            $rootScope.panelsAllLangs = buildResult.data;

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

      if ($scope.busy) {

        return {
          performed: false,
          reason: 'busy',
          data: {
            keys: {},
            objs: {},
          },
        };
      }

      if ($rootScope.showNotFound) {

        return {
          performed: false,
          reason: 'notFound',
          data: {
            keys: {},
            objs: {},
          },
        };
      }

      if ($scope.showServerError) {

        return {
          performed: false,
          reason: 'serverError',
          data: {
            keys: {},
            objs: {},
          },
        };
      }



      $scope.busy = true;

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
      objReqPager.page = $rootScope.pageShort;

      $rootScope.pageShort++;

      return $q.all({keys: ShortService.getAllShortObjectsKeys({show: 1}),
        objs: ShortService.getAllShortObjectsObjsPager(objReqParams, objReqPager)})
        .then(function (results) {
          $scope.busy = false;

          if (results.objs.status == 404) {
            $rootScope.showNotFound = true;

            if (objReqPager.page == 1) {
              $rootScope.showFoundNothing = true;
            }

            return {
              performed: false,
              reason: 'notFound',
              data: {
                keys: results.keys,
                objs: {},
              },
            };
          }

          if (results.objs.status == 500) {
            $scope.showServerError = true;

            return {
              performed: false,
              reason: 'serverError',
              data: {
                keys: results.keys,
                objs: {},
              },
            };
          }

          if (results.objs.status == 200) {
            $rootScope.showNotFound = false;
            $scope.showServerError = false;

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

          GeneralConfigService.orangeConfig.tagList[lang].map(function (listElem) {
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

          panelKeys.map(function (kElem) {
            var tokenVal = '';

            switch (kElem.key) {
              case 'city':
                GeneralConfigService.orangeConfig.cityList[lang].map(function (listElem) {
                  if (listElem.key == oElem.city) tokenVal = listElem.val;
                });
                break;
              case 'obj':
                GeneralConfigService.orangeConfig.objList[lang].map(function (listElem) {
                  if (listElem.key == oElem.obj) tokenVal = listElem.val;
                });
                break;
              case 'room':
                GeneralConfigService.orangeConfig.roomList[lang].map(function (listElem) {
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


          panels.push(record);
        });

        return panels;
      }; // __buildPanelOneLang

    } // _buildPanel

    function _update() {
      $rootScope.objList = GeneralConfigService.orangeConfig.objList[$rootScope.lang];
      $rootScope.cityList = GeneralConfigService.orangeConfig.cityList[$rootScope.lang];
      $rootScope.roomList = GeneralConfigService.orangeConfig.roomList[$rootScope.lang];
      $rootScope.tagList = GeneralConfigService.orangeConfig.tagList[$rootScope.lang];

      $rootScope.panels = $rootScope.panelsAllLangs[$rootScope.lang];

    } // update

    function _activateNextPage() {
      if ($rootScope.scrollDisabled) return;

      $q.when(_performRequest($rootScope.shortFilterData))
        .then(function (res) {

          if (!res.performed) {
            $rootScope.scrollDisabled = true;
            return;
          }

          $rootScope.scrollDisabled = false;

          var buildResult = _buildPanel(res);

          if (!buildResult.performed) return;
          
          _.forEach(buildResult.data, function (val, key) {
            val.map(function (elem) {
              if (!_.isArray($rootScope.panelsAllLangs[key])) {
                $rootScope.panelsAllLangs[key] = [];
              }
              $rootScope.panelsAllLangs[key].push(elem);
            });

          });

          _update();

          return;
        });

    } // _activateNextPage
  }
})();