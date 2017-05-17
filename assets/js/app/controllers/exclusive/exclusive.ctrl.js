(function () {
  "use strict";

  angular.module('OrangeClient')
    .controller('ExclusiveCtrl', ExclusiveCtrl);

  ExclusiveCtrl.$inject = ['GeneralConfigService', 'ExclusiveService',
    'ShortService', 'LongService', 'SaleService',
    '$log', '$rootScope', '$scope', 'lodash', '$q', '$alert'];

  function ExclusiveCtrl(GeneralConfigService, ExclusiveService,
                         ShortService, LongService, SaleService,
                     $log, $rootScope, $scope, lodash, $q, $alert) {
    var _ = lodash;
    var exclusiveBusyAlert = $alert({title: 'Title',
      content: 'Content',
      container: '#spinner-container-exclusive',
      show: true,
      templateUrl: '../templates/view/busyAlert.html'
    });

    $scope.exclusiveBusy = $rootScope.exclusive.busy;
    $rootScope.exclusive.showNotFound = false;
    $rootScope.exclusive.showServerError = false;
    $rootScope.exclusive.page = 1;
    $rootScope.exclusive.busy = false;
    $rootScope.exclusive.scrollDisabled = false;
    $rootScope.exclusive.showFoundNothing = false;

    $rootScope.exclusive.panelsAllLangs = {};
    $rootScope.exclusive.panels = [];

    $rootScope.objList = GeneralConfigService.orangeConfig.objList[$rootScope.lang];
    $rootScope.dealList = GeneralConfigService.orangeConfig.dealList[$rootScope.lang];
    $rootScope.cityList = GeneralConfigService.orangeConfig.cityList[$rootScope.lang];
    $rootScope.roomList = GeneralConfigService.orangeConfig.roomList[$rootScope.lang];
    $rootScope.tagList = GeneralConfigService.orangeConfig.tagList[$rootScope.lang];

    $scope.activateNextPage = _activateNextPage;

    $rootScope.$watch('exclusive.FindActivated', _updateData);

    $rootScope.$watch('lang', _update);

    $rootScope.$watch('exclusive.busy', function (newVal, oldVal) {
      $scope.exclusiveBusy = $rootScope.exclusive.busy;
    });

    $scope.$watch('exclusiveBusy', function (newVal, oldVal) {
      if (!oldVal && newVal) {
        exclusiveBusyAlert.$promise.then(exclusiveBusyAlert.show);
      } else if (oldVal && !newVal) {
        exclusiveBusyAlert.$promise.then(exclusiveBusyAlert.hide);
      }
    });

    function _updateData () {

      if ($rootScope.exclusive.FindActivated) {

        $rootScope.exclusive.panels = [];
        $rootScope.exclusive.busy = false;
        $rootScope.exclusive.FindActivated = false;

        $rootScope.exclusive.page = 1;
        $rootScope.exclusive.showNotFound = false;
        $rootScope.exclusive.showServerError = false;
        $rootScope.exclusive.scrollDisabled = false;
        $rootScope.exclusive.showFoundNothing = false;

        $q.when(_performRequest($rootScope.exclusive.FilterData))
          .then(function (res) {

            if (!res.performed &&
              (res.reason == 'notFound' || res.reason == 'serverError')) {
              $rootScope.exclusive.scrollDisabled = true;
              return;
            }

            var buildResult = _buildPanel(res);

            if (!buildResult.performed) return;

            $rootScope.exclusive.panelsAllLangs = buildResult.data;

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

      if ($rootScope.exclusive.busy) {

        return {
          performed: false,
          reason: 'busy',
          data: {
            keys: {},
            objs: {},
          },
        };
      }

      if ($rootScope.exclusive.showNotFound) {

        return {
          performed: false,
          reason: 'notFound',
          data: {
            keys: {},
            objs: {},
          },
        };
      }

      if ($rootScope.exclusive.showServerError) {

        return {
          performed: false,
          reason: 'serverError',
          data: {
            keys: {},
            objs: {},
          },
        };
      }



      $rootScope.exclusive.busy = true;

      var params = {};
      var objReqParams = {show: 1};
      var objReqPager = {};

      if (typeof reqParams.objnumber != 'undefined' && reqParams.objnumber) {
        objReqParams.objnumber = reqParams.objnumber;
      }
      if (typeof reqParams.deal == 'object' && reqParams.deal.key != 'any') {
        objReqParams.deal = reqParams.deal.key;
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
      objReqPager.page = $rootScope.exclusive.page;

      $rootScope.exclusive.page++;

      return $q.all({keysShort: ShortService.getAllShortObjectsKeys({show: 1}),
        keysLong: LongService.getAllLongObjectsKeys({show: 1}),
        keysSale: SaleService.getAllSaleObjectsKeys({show: 1}),
        objs: ExclusiveService.getAllExclusiveObjectsObjsPager(objReqParams, objReqPager)})
        .then(function (results) {
          $rootScope.exclusive.busy = false;

          if (results.objs.status == 404) {
            $rootScope.exclusive.showNotFound = true;

            if (objReqPager.page == 1) {
              $rootScope.exclusive.showFoundNothing = true;
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
            $rootScope.exclusive.showServerError = true;

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
            $rootScope.exclusive.showNotFound = false;
            $rootScope.exclusive.showServerError = false;

            return {
              performed: true,
              reason: 'ok',
              data: {
                keys: {
                  short_term: results.keysShort,
                  long_term: results.keysLong,
                  sales: results.keysSale,
                },
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

        // todo: delete
        $log.info('requestResult.data.objs[elem]:');
        $log.info(requestResult.data.objs[elem]);
        $log.info('requestResult.data.keys:');
        $log.info(requestResult.data.keys);


        result[elem] = __buildPanelOneLang(requestResult.data.keys,
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
            deal: oElem.deal,
            img: {
              href: '../../images/' + oElem.imgMain,
              dataLightbox: oElem.objNumber,
              dataTitle: '',
              src: '../../images/' + oElem.imgMain,
            },
            content: [],
            gallery: [],
          };

          var tokenValDeal = '';
          GeneralConfigService.orangeConfig.dealList[lang].map(function (listElem) {
            if (listElem.key == oElem.deal) tokenValDeal = listElem.val;
          });

          record.content[0] = [];
          record.content[0].push({
            key: 'deal',
            label: 'Deal type',
            text: tokenValDeal,
          });

          panelKeys[oElem.deal][lang].map(function (kElem) {
            var tokenVal = '';

            switch (kElem.key) {
              case 'deal':
                GeneralConfigService.orangeConfig.dealList[lang].map(function (listElem) {
                  if (listElem.key == oElem.deal) tokenVal = listElem.val;
                });
                break;
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
              key: kElem.key,
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
      $rootScope.dealList = GeneralConfigService.orangeConfig.dealList[$rootScope.lang];
      $rootScope.cityList = GeneralConfigService.orangeConfig.cityList[$rootScope.lang];
      $rootScope.roomList = GeneralConfigService.orangeConfig.roomList[$rootScope.lang];
      $rootScope.tagList = GeneralConfigService.orangeConfig.tagList[$rootScope.lang];

      $rootScope.exclusive.panels = $rootScope.exclusive.panelsAllLangs[$rootScope.lang];

      // todo: delete
      $log.info('$rootScope.exclusive.panels:');
      $log.info($rootScope.exclusive.panels);

    } // update

    function _activateNextPage() {
      if ($rootScope.exclusive.scrollDisabled) return;

      $q.when(_performRequest($rootScope.exclusive.FilterData))
        .then(function (res) {

          if (!res.performed &&
            (res.reason == 'notFound' || res.reason == 'serverError')) {
            $rootScope.exclusive.scrollDisabled = true;
            return;
          }

          $rootScope.exclusive.scrollDisabled = false;

          var buildResult = _buildPanel(res);

          if (!buildResult.performed) return;
          
          _.forEach(buildResult.data, function (val, key) {
            val.map(function (elem) {
              if (!_.isArray($rootScope.exclusive.panelsAllLangs[key])) {
                $rootScope.exclusive.panelsAllLangs[key] = [];
              }
              $rootScope.exclusive.panelsAllLangs[key].push(elem);
            });

          });

          _update();

          return;
        });

    } // _activateNextPage
  }
})();