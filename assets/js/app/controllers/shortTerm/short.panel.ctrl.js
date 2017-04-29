(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('ShortPanelCtrl', ShortPanelCtrl);

  ShortPanelCtrl.$inject = ['$rootScope', '$scope', '$modal', '$log', 'lodash'];

  /* @ngInject */
  function ShortPanelCtrl($rootScope, $scope, $modal, $log, lodash) {
    var _ = lodash;
    var vm = this;
    vm.title = 'ShortPanelCtrl';
    // vm.index = '';
    vm.badge = false;

    var shortPriceModal = $modal({
      scope: $scope,
      templateUrl: '../templates/view/short/shortPriceModal.html',
      show: false,
      backdrop: true,
      onHide: function () {
        $('body').css('overflow', 'auto');
      },
      onShow: function () {
        $('body').css('overflow', 'hidden');
      }
    });

    var shortCalendarModal = $modal({
      scope: $scope,
      templateUrl: '../templates/view/short/shortCalendarModal.html',
      show: false,
      backdrop: true,
      onHide: function () {
        $('body').css('overflow', 'auto');
      },
      onShow: function () {
        $('body').css('overflow', 'hidden');
      }
    });

    var shortBookObjectModal = $modal({
      scope: $scope,
      templateUrl: '../templates/view/short/shortBookObjectModal.html',
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
      vm.busyBook = false;

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

      shortPriceModal.$promise.then(shortPriceModal.show)
        .then(function () {
          __showPrice();
        });
    }

    function _hidePrice() {
      shortPriceModal.$promise.then(shortPriceModal.hide);
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

      shortCalendarModal.$promise.then(shortCalendarModal.show)
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
      shortCalendarModal.$promise.then(shortCalendarModal.hide);
    }

    /**
     * Book Object modal
     * @private
     */

    function _showBookObject() {
      // $scope.index = vm.index;
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

      shortBookObjectModal.$promise.then(shortBookObjectModal.show);
    }

    function _hideBookObject() {
      shortBookObjectModal.$promise.then(shortBookObjectModal.hide);
    }

    function _book() {
      vm.busyBook = true;
      $log.info('_book() activated...');
      $log.info('$scope:');
      $log.info($scope);
      $log.info('vm.panel');
      $log.info(vm.panel);
      $log.info('vm.formData');
      $log.info(vm.formData);

      setTimeout(function () {
        vm.busyBook = false;
        vm.hideBookObject();
      }, 3000);

      // vm.hideBookObject();
    } // _book

    function _clear() {
      $log.info('_clear() activated...');
      vm.formData.name = '';
      vm.formData.phone = '';
    } // _clear

  }

})();

