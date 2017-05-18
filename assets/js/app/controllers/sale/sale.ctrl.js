(function () {
  "use strict";

  angular.module('OrangeClient')
    .controller('SaleCtrl', SaleCtrl);

  SaleCtrl.$inject = ['GeneralConfigService', 'SaleService',
    '$log', '$rootScope', '$scope', 'lodash', '$q', '$alert'];

  function SaleCtrl(GeneralConfigService, SaleService,
                     $log, $rootScope, $scope, lodash, $q, $alert) {
    var _ = lodash;
    var saleBusyAlert = $alert({
      title: 'Title',
      content: 'Content',
      container: '#spinner-container-sale',
      show: true,
      templateUrl: '../templates/view/busyAlert.html'
    });

    $scope.saleBusy = $rootScope.sale.busy;
    $rootScope.sale.showNotFound = false;
    $rootScope.sale.showServerError = false;
    $rootScope.sale.page = 1;
    $rootScope.sale.busy = false;
    $rootScope.sale.scrollDisabled = false;
    $rootScope.sale.showFoundNothing = false;

    $rootScope.sale.panelsAllLangs = {};
    $rootScope.sale.panels = [];

    $rootScope.objList = GeneralConfigService.orangeConfig.objList[$rootScope.lang];
    $rootScope.cityList = GeneralConfigService.orangeConfig.cityList[$rootScope.lang];
    $rootScope.roomList = GeneralConfigService.orangeConfig.roomList[$rootScope.lang];
    $rootScope.tagList = GeneralConfigService.orangeConfig.tagList[$rootScope.lang];

    $scope.activateNextPage = _activateNextPage;

    $rootScope.$watch('sale.FindActivated', _updateData);

    $rootScope.$watch('lang', _update);

    $rootScope.$watch('sale.busy', function (newVal, oldVal) {
      $scope.saleBusy = $rootScope.sale.busy;
    });

    $scope.$watch('saleBusy', function (newVal, oldVal) {
      if (!oldVal && newVal) {
        saleBusyAlert.$promise.then(saleBusyAlert.show);
      } else if (oldVal && !newVal) {
        saleBusyAlert.$promise.then(saleBusyAlert.hide);
      }
    });

    function _updateData () {

      if ($rootScope.sale.FindActivated) {

        $rootScope.sale.panels = [];
        $rootScope.sale.busy = false;
        $rootScope.sale.FindActivated = false;

        $rootScope.sale.page = 1;
        $rootScope.sale.showNotFound = false;
        $rootScope.sale.showServerError = false;
        $rootScope.sale.scrollDisabled = false;
        $rootScope.sale.showFoundNothing = false;

        $q.when(_performRequest($rootScope.sale.FilterData))
          .then(function (res) {

            if (!res.performed &&
              (res.reason == 'notFound' || res.reason == 'serverError')) {
              $rootScope.sale.scrollDisabled = true;
              return;
            }

            var buildResult = _buildPanel(res);

            if (!buildResult.performed) return;

            $rootScope.sale.panelsAllLangs = buildResult.data;

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

      if ($rootScope.sale.busy) {

        return {
          performed: false,
          reason: 'busy',
          data: {
            keys: {},
            objs: {},
          },
        };
      }

      if ($rootScope.sale.showNotFound) {

        return {
          performed: false,
          reason: 'notFound',
          data: {
            keys: {},
            objs: {},
          },
        };
      }

      if ($rootScope.sale.showServerError) {

        return {
          performed: false,
          reason: 'serverError',
          data: {
            keys: {},
            objs: {},
          },
        };
      }



      $rootScope.sale.busy = true;

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
      objReqPager.page = $rootScope.sale.page;

      $rootScope.sale.page++;

      return $q.all({keys: SaleService.getAllSaleObjectsKeys({show: 1}),
        objs: SaleService.getAllSaleObjectsObjsPager(objReqParams, objReqPager)})
        .then(function (results) {
          $rootScope.sale.busy = false;

          if (results.objs.status == 404) {
            $rootScope.sale.showNotFound = true;

            if (objReqPager.page == 1) {
              $rootScope.sale.showFoundNothing = true;
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
            $rootScope.sale.showServerError = true;

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
            $rootScope.sale.showNotFound = false;
            $rootScope.sale.showServerError = false;

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

      $rootScope.sale.panels = $rootScope.sale.panelsAllLangs[$rootScope.lang];

    } // update

    function _activateNextPage() {
      if ($rootScope.sale.scrollDisabled) return;

      $q.when(_performRequest($rootScope.sale.FilterData))
        .then(function (res) {

          if (!res.performed &&
            (res.reason == 'notFound' || res.reason == 'serverError')) {
            $rootScope.sale.scrollDisabled = true;
            return;
          }

          $rootScope.sale.scrollDisabled = false;

          var buildResult = _buildPanel(res);

          if (!buildResult.performed) return;
          
          _.forEach(buildResult.data, function (val, key) {
            val.map(function (elem) {
              if (!_.isArray($rootScope.sale.panelsAllLangs[key])) {
                $rootScope.sale.panelsAllLangs[key] = [];
              }
              $rootScope.sale.panelsAllLangs[key].push(elem);
            });

          });

          _update();

          return;
        });

    } // _activateNextPage
  }
})();