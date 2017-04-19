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

    this.$onInit = function () {
    };

    activate();

    ////////////////

    function activate() {

      vm.showPrice = _showPrice;
      vm.hidePrice = _hidePrice;
      vm.showCalendar = _showCalendar;
      vm.hideCalendar = _hideCalendar;
    } // activate()

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

  }

})();

