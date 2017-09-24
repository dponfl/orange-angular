(function () {
  "use strict";

  angular.module('OrangeClient')
    .controller('LongCtrl', LongCtrl);

  LongCtrl.$inject = ['GeneralConfigService', 'LongService',
    '$log', '$rootScope', '$scope', 'lodash', '$q', '$alert'];

  function LongCtrl(GeneralConfigService, LongService,
                     $log, $rootScope, $scope, lodash, $q, $alert) {
    var _ = lodash;
    var ctrlTitle = 'LongCtrl';
    var longBusyAlert = $alert({
      title: 'Title',
      content: 'Content',
      container: '#spinner-container-long',
      show: true,
      templateUrl: '../templates/view/busyAlert.html'
    });

    $scope.longBusy = $rootScope.long.busy;
    $rootScope.long.showNotFound = false;
    $rootScope.long.showServerError = false;
    $rootScope.long.page = 1;
    $rootScope.long.busy = false;
    $rootScope.long.scrollDisabled = false;
    $rootScope.long.showFoundNothing = false;

    $rootScope.long.panelsAllLangs = {};
    $rootScope.long.panels = [];

    $rootScope.objList = $rootScope.orangeConfig.objList[$rootScope.lang];
    $rootScope.cityList = $rootScope.orangeConfig.cityList[$rootScope.lang];
    $rootScope.roomList = $rootScope.orangeConfig.roomList[$rootScope.lang];
    $rootScope.tagList = $rootScope.orangeConfig.tagList[$rootScope.lang];

    $scope.activateNextPage = _activateNextPage;
    $scope.updateData = _updateData;
    $scope.updateDataAll = _updateDataAll;
    $scope.updateDataEdit = _updateDataEdit;

    // $rootScope.$watch('long.FindActivated', _updateData);
    $rootScope.$watch('long.FindActivated', function () {
        _updateData();
    });

    $rootScope.$watch('admin.long.FindActivated', function (newVal, oldVal) {
      if (newVal) {
        // _updateDataAll();
        _updateDataEdit();
        $rootScope.admin.long.FindActivated = false;
      }

    });

    $rootScope.$watch('admin.long.updateEditRecords', function (newVal, oldVal) {
      if (newVal) {
        _updateDataAll();
        _updateDataEdit();
        $rootScope.admin.long.updateEditRecords = false;
      }
    });

    $rootScope.$watch('lang', _update);

    $rootScope.$watch('long.busy', function (newVal, oldVal) {
      $scope.longBusy = $rootScope.long.busy;
    });

    $scope.$watch('longBusy', function (newVal, oldVal) {
      if (!oldVal && newVal) {
        longBusyAlert.$promise.then(longBusyAlert.show);
      } else if (oldVal && !newVal) {
        longBusyAlert.$promise.then(longBusyAlert.hide);
      }
    });

    function _updateDataAll() {
      $log.info(ctrlTitle + ', _updateDataAll activated...');

      $rootScope.long.panels = [];
      $rootScope.long.busy = false;
      $rootScope.long.FindActivated = false;

      $rootScope.long.page = 1;
      $rootScope.long.showNotFound = false;
      $rootScope.long.showServerError = false;
      $rootScope.long.showFoundNothing = false;

      $q.when(_performRequestAll($rootScope.long.FilterData))
        .then(function (res) {

          if (!res.performed &&
            (res.reason == 'notFound' || res.reason == 'serverError')) {
            return;
          }

          var buildResult = _buildPanel(res);

          if (!buildResult.performed) return;

          $rootScope.long.panelsAllLangs = buildResult.data;

          _update();

          return;
        });

    } // _updateDataAll

    function _updateDataEdit() {
      $log.info(ctrlTitle + ', _updateDataAll activated...');

      $rootScope.long.panels = [];
      $rootScope.long.busy = false;
      $rootScope.long.FindActivated = false;

      $rootScope.long.page = 1;
      $rootScope.long.showNotFound = false;
      $rootScope.long.showServerError = false;
      $rootScope.long.showFoundNothing = false;

      $q.when(_performRequestAll($rootScope.long.FilterData, true))
        .then(function (res) {

          if (!res.performed &&
            (res.reason == 'notFound' || res.reason == 'serverError')) {
            return;
          }

          var buildResult = _buildPanel(res);

          if (!buildResult.performed) return;

          $rootScope.long.panelsAllLangsEdit = buildResult.data;

          _updateEdit();

          return;
        });

    } // _updateDataEdit



    function _updateData () {

      if ($rootScope.long.FindActivated) {

        $rootScope.long.panels = [];
        $rootScope.long.busy = false;
        $rootScope.long.FindActivated = false;

        $rootScope.long.page = 1;
        $rootScope.long.showNotFound = false;
        $rootScope.long.showServerError = false;
        $rootScope.long.scrollDisabled = false;
        $rootScope.long.showFoundNothing = false;

        $q.when(_performRequest($rootScope.long.FilterData))
          .then(function (res) {

            if (!res.performed &&
              (res.reason == 'notFound' || res.reason == 'serverError')) {
              $rootScope.long.scrollDisabled = true;
              return;
            }

            var buildResult = _buildPanel(res);

            if (!buildResult.performed) return;

            $rootScope.long.panelsAllLangs = buildResult.data;

            _update();

            return;
          });

      }
    } // _updateData

    function _performRequestAll(reqParams, showAll = false) {

      var getRecordsConfig = {};
      var objReqParams = {};

      if (!showAll) {
        getRecordsConfig = {show: 1};
        objReqParams = {show: 1};
      }

      if ($rootScope.long.busy) {

        return {
          performed: false,
          reason: 'busy',
          data: {
            keys: {},
            objs: {},
          },
        };
      }

      if ($rootScope.long.showNotFound) {

        return {
          performed: false,
          reason: 'notFound',
          data: {
            keys: {},
            objs: {},
          },
        };
      }

      if ($rootScope.long.showServerError) {

        return {
          performed: false,
          reason: 'serverError',
          data: {
            keys: {},
            objs: {},
          },
        };
      }

      $rootScope.long.busy = true;

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
      if (typeof reqParams.show == 'object' && reqParams.show.key != 'any') {
        objReqParams.show = (reqParams.show.key == 'show' ? '1' : '0');
      }
      if (typeof reqParams.home == 'object' && reqParams.home.key != 'any') {
        objReqParams.home = (reqParams.home.key == 'home' ? '1' : '0');
      }




      return $q.all({keys: LongService.getAllLongObjectsKeys(getRecordsConfig),
        objs: LongService.getAllLongObjectsObjs(objReqParams)})
        .then(function (results) {
          $rootScope.long.busy = false;

          if (results.objs.status == 404) {
            $rootScope.long.showNotFound = true;
            $rootScope.long.showFoundNothing = true;

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
            $rootScope.long.showServerError = true;

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
            $rootScope.long.showNotFound = false;
            $rootScope.long.showServerError = false;

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
          $log.warn(ctrlTitle + ', Error...');
          $log.error(err);

          return {
            performed: false,
            reason: 'error',
            data: {
              error: err,
            },
          };
        });
    } // _performRequestAll

    /**
     *
     * @param reqParams
     * @returns {{performed: boolean, reason: string, data: {keys: {}, objs: {}}}}
     * @private
     */

    function _performRequest(reqParams) {

      if ($rootScope.long.busy) {

        return {
          performed: false,
          reason: 'busy',
          data: {
            keys: {},
            objs: {},
          },
        };
      }

      if ($rootScope.long.showNotFound) {

        return {
          performed: false,
          reason: 'notFound',
          data: {
            keys: {},
            objs: {},
          },
        };
      }

      if ($rootScope.long.showServerError) {

        return {
          performed: false,
          reason: 'serverError',
          data: {
            keys: {},
            objs: {},
          },
        };
      }



      $rootScope.long.busy = true;

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
      objReqPager.page = $rootScope.long.page;

      $rootScope.long.page++;

      return $q.all({keys: LongService.getAllLongObjectsKeys({show: 1}),
        objs: LongService.getAllLongObjectsObjsPager(objReqParams, objReqPager)})
        .then(function (results) {
          $rootScope.long.busy = false;

          if (results.objs.status == 404) {
            $rootScope.long.showNotFound = true;

            if (objReqPager.page == 1) {
              $rootScope.long.showFoundNothing = true;
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
            $rootScope.long.showServerError = true;

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
            $rootScope.long.showNotFound = false;
            $rootScope.long.showServerError = false;

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
          $log.warn(ctrlTitle + ', Error...');
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
          var keyVal = '';

          $rootScope.orangeConfig.tagList[lang].map(function (listElem) {
            if (listElem.key == oElem.tag) {
              tagText = listElem.val;
              keyVal = listElem.key;
            }
          });

          record = {
            badge: oElem.tag ? true : false,
            type: oElem.tag,
            badgeText: tagText,
            objNumber: oElem.objNumber,
            show: oElem.show,
            home: oElem.home,
            img: {
              href: '../../img/' + oElem.imgMain,
              dataLightbox: oElem.objNumber,
              dataTitle: '',
              src: '../../img/' + oElem.imgMain,
            },
            content: [],
            contentObj: {},
            gallery: [],
            address: oElem.address,
            bathroom: oElem.bathroom,
            description: oElem.description,
            googleMap: oElem.googleMap,
            info: oElem.info,
            pool: oElem.pool,
            price: oElem.price,
            youtube: oElem.youtube,
            youtubeshow: (oElem.youtube ? true : false),
          };

          panelKeys.map(function (kElem) {
            var tokenVal = '';

            switch (kElem.key) {
              case 'city':
                $rootScope.orangeConfig.cityList[lang].map(function (listElem) {
                  if (listElem.key == oElem.city) {
                    tokenVal = listElem.val;
                    keyVal = listElem.key;
                  }
                });
                break;
              case 'obj':
                $rootScope.orangeConfig.objList[lang].map(function (listElem) {
                  if (listElem.key == oElem.obj) {
                    tokenVal = listElem.val;
                    keyVal = listElem.key;
                  }
                });
                break;
              case 'room':
                $rootScope.orangeConfig.roomList[lang].map(function (listElem) {
                  if (listElem.key == oElem.room) {
                    tokenVal = listElem.val;
                    keyVal = listElem.key;
                  }
                });
                break;
              default:
                tokenVal = oElem[kElem.key] || '';
                break;
            }

            if (!_.isArray(record.content[kElem.group - 1])) {
              record.content[kElem.group - 1] = [];
            }

            // if (kElem.key !== 'deal') {
              record.content[kElem.group - 1].push({
                key: kElem.key,
                label: kElem.label,
                text:tokenVal,
              });

              record.contentObj[kElem.key] = {
                key: keyVal,
                label: kElem.label,
                text:tokenVal,
              };
            // }

          });

          _gallery = oElem.imgGallery.replace(/^\s+|\s+$/gm,'').split(';');
          _gallery.map(function (el) {
            record.gallery.push({
              // href: '../../images/' + el,
              href: '../../img/' + el,
              dataLightbox: 'gallery-' + oElem.objNumber,
              dataTitle: '',
              // src: '../../images/' + el,
              src: '../../img/' + el,
            });
          });
/*
          record.price = oElem.price;
          record.calendar = oElem.calendar;
          record.googleMap = oElem.googleMap;
          record.youtube = oElem.youtube;
          record.youtubeshow = (oElem.youtube ? true : false);
*/

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

      $rootScope.long.panels = $rootScope.long.panelsAllLangs[$rootScope.lang];

    } // update

    function _updateEdit() {
      $rootScope.objList = $rootScope.orangeConfig.objList[$rootScope.lang];
      $rootScope.cityList = $rootScope.orangeConfig.cityList[$rootScope.lang];
      $rootScope.roomList = $rootScope.orangeConfig.roomList[$rootScope.lang];
      $rootScope.tagList = $rootScope.orangeConfig.tagList[$rootScope.lang];

      $rootScope.long.panelsEdit = $rootScope.long.panelsAllLangsEdit[$rootScope.lang];

    } // updateEdit

    function _activateNextPage() {
      if ($rootScope.long.scrollDisabled) return;

      $q.when(_performRequest($rootScope.long.FilterData))
        .then(function (res) {

          if (!res.performed &&
            (res.reason == 'notFound' || res.reason == 'serverError')) {
            $rootScope.long.scrollDisabled = true;
            return;
          }

          $rootScope.long.scrollDisabled = false;

          var buildResult = _buildPanel(res);

          if (!buildResult.performed) return;
          
          _.forEach(buildResult.data, function (val, key) {
            val.map(function (elem) {
              if (!_.isArray($rootScope.long.panelsAllLangs[key])) {
                $rootScope.long.panelsAllLangs[key] = [];
              }
              $rootScope.long.panelsAllLangs[key].push(elem);
            });

          });

          _update();

          return;
        });

    } // _activateNextPage
  }
})();