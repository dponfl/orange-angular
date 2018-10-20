(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('ExclusiveShortPanelCtrl', ExclusiveShortPanelCtrl);

  ExclusiveShortPanelCtrl.$inject = ['GeneralConfigService', 'S_ReqService', '$rootScope', '$scope', '$modal', '$log',
    'lodash', 'toaster'];

  /* @ngInject */
  function ExclusiveShortPanelCtrl(GeneralConfigService, S_ReqService, $rootScope, $scope, $modal, $log,
                         lodash, toaster) {
    var _ = lodash;
    var __=GeneralConfigService;
    var vm = this;
    vm.title = 'ExclusiveShortPanelCtrl';
    vm.badge = false;

    var exclusivePriceModal = $modal({
      scope: $scope,
      templateUrl: '../templates/view/exclusive/exclusiveShortPriceModal.html',
      show: false,
      backdrop: true,
      onHide: function () {
        $('body').css('overflow', 'auto');
      },
      onShow: function () {
        $('body').css('overflow', 'hidden');
      }
    });

    var exclusiveCalendarModal = $modal({
      scope: $scope,
      templateUrl: '../templates/view/exclusive/exclusiveShortCalendarModal.html',
      show: false,
      backdrop: true,
      onHide: function () {
        $('body').css('overflow', 'auto');
      },
      onShow: function () {
        $('body').css('overflow', 'hidden');
      }
    });

    var exclusiveBookObjectModal = $modal({
      scope: $scope,
      templateUrl: '../templates/view/exclusive/exclusiveShortBookObjectModal.html',
      show: false,
      backdrop: true,
      onHide: function () {
        $('body').css('overflow', 'auto');
      },
      onShow: function () {
        $('body').css('overflow', 'hidden');
      }
    });

    this.$onInit = function () {
/*
      $log.info('$onInit');
      $log.info('$scope:');
      $log.debug($scope);
      $log.info('vm.panel');
      $log.debug(vm.panel);
      $log.info('vm.formData');
      $log.debug(vm.formData);
*/
    };

    activate();

    ////////////////

    function activate() {

      vm.formData = {};
      vm.startDate = new Date();
      vm.startDate.setDate(vm.startDate.getDate() - 1);
      vm.busyBook = false;
      vm.objectInfo = '';

      vm.showPrice = _showPrice;
      vm.hidePrice = _hidePrice;
      vm.showCalendar = _showCalendar;
      vm.hideCalendar = _hideCalendar;
      vm.showBookObject = _showBookObject;
      vm.hideBookObject = _hideBookObject;
      vm.book = _book;
      vm.clear = _clear;
    } // activate()

    /**
     * Price modal
     * @private
     */

    function _showPrice() {
      $scope.index = vm.index;

      exclusivePriceModal.$promise.then(exclusivePriceModal.show)
        .then(function () {
          __showPrice();
        });
    }

    function _hidePrice() {
      exclusivePriceModal.$promise.then(exclusivePriceModal.hide);
    }

    function __showPrice() {
      var prices = _.split(vm.panel.price, ';');
      var pricesElems = [];
      var priceTable = $('.price-table');
      var tableContent = '<tbody>';

      for (var i = 0; i < prices.length; i++) {
        tableContent += '<tr>';
        pricesElems = _.split(prices[i], ':');
        for (var ii = 0; ii < pricesElems.length; ii++) {
          if (ii == 0) {
            tableContent += '<th scope="row">' + _.trim(pricesElems[ii]) + '</th>';
          } else {
            tableContent += '<td>' + _.trim(pricesElems[ii]) + '</td>';
          }
        }
        tableContent += '</tr>';
      }
      tableContent += '</tbody>';
      priceTable.append(tableContent);
    } // __showPrice()

    /**
     * Calendar modal
     * @private
     */

    function _showCalendar() {

      exclusiveCalendarModal.$promise.then(exclusiveCalendarModal.show)
        .then(function () {
          __showCalendar();
        });
    } // _showCalendar()

    function __showCalendar() {

      var calendarBlock = $('.calendar-content-block');

      var unavailableDates = [];

      var periods = _.split(vm.panel.calendar, ';');
      var periodsElems = [];
      var periodElem= {};

      for (var i = 0; i < periods.length; i++) {

          periodsElems = _.split(periods[i], '=>');

          unavailableDates[i] = {
            start: periodsElems[0],
            end: periodsElems[1]
          };
      }

      calendarBlock.availabilityCalendar(unavailableDates, $rootScope.lang);

    } // __showCalendar()

    function _hideCalendar() {
      exclusiveCalendarModal.$promise.then(exclusiveCalendarModal.hide);
    }

    /**
     * Book Object modal
     * @private
     */

    function _showBookObject() {
      var city = '';
      var address = '';

      _.forEach(vm.panel.content, function (value) {
        _.forEach(value, function (val) {
          if (val.key === 'city') {
            city = val.text;
          }

          if (val.key === 'address') {
            address = val.text;
          }
        });
      });

      vm.objectInfo = '#' + vm.panel.objNumber + ', ' + city + ', ' + address;

      exclusiveBookObjectModal.$promise.then(exclusiveBookObjectModal.show);
    }

    function _hideBookObject() {
      exclusiveBookObjectModal.$promise.then(exclusiveBookObjectModal.hide);
    }

    function _book() {
      // $log.info('exclusive short _book() activated...');

      vm.busyBook = true;

      // $log.info('_book() activated...');
/*
      $log.info('$scope:');
      $log.info($scope);
      $log.info('vm.panel');
      $log.info(vm.panel);
*/
      vm.formData.objnumber = vm.panel.objNumber;
      vm.formData.deal_type = 'exclusive_short';
      vm.formData.req_type = 'booking';

/*
      $log.info('vm.formData');
      $log.info(vm.formData);
*/

      S_ReqService.createSReq(vm.formData, vm.formData.req_type)
        .then(function (res) {

/*
          $log.info('S_ReqService, res:');
          $log.info(res);
*/


          if (res.status === 200) {
            vm.busyBook = false;
            toaster.pop({
              type: 'success',
              title: __.t('BOOKING_SUCCESS_TITLE'),
              body: __.t('BOOKING_SUCCESS_BODY_1') + vm.objectInfo +
              __.t('BOOKING_SUCCESS_BODY_2'),
              toasterId: vm.formData.objnumber,
              showCloseButton: true,
              timeout: 15000,
            });
          } else {
            vm.busyBook = false;
            toaster.pop({
              type: 'error',
              title: __.t('BOOKING_ERROR_TITLE'),
              body: __.t('BOOKING_ERROR_BODY_1') + vm.objectInfo +
              __.t('BOOKING_ERROR_BODY_2'),
              toasterId: vm.formData.objnumber,
              showCloseButton: true,
              timeout: 15000,
            });
          }
        });

/*
      setTimeout(function () {
        vm.busyBook = false;
        vm.hideBookObject();
      }, 3000);
*/

      vm.busyBook = false;
      vm.hideBookObject();

      // vm.hideBookObject();
    } // _book

    function _clear() {
      // $log.info('exclusive short _clear() activated...');
      vm.formData.period_start = '';
      vm.formData.pariod_end = '';
      vm.formData.name = '';
      vm.formData.email = '';
      vm.formData.phone = '';
      vm.formData.skype = '';
      vm.formData.whatsapp = '';
      vm.formData.telegram = '';
      vm.formData.viber = '';
      vm.formData.additionalInfo = '';
    } // _clear

  }

})();

