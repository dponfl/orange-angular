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

    this.$onInit = function () {
/*
      $log.info('$onInit...');

      $log.info('_showPrice() invoked within $onInit...');
      $log.debug('index: ' + vm.index);
      $log.info('img: ');
      $log.debug(vm.img);
      $log.info('$rootScope.panels:');
      $log.debug($rootScope.panels);
*/
    };

    $scope.message = 'Some $scope message to show...';
    vm.myHtml = '<h1> Some HTML example: h1</h1>' +
        '<h2> Some HTML example: h2</h2>';

/*
    $log.info('Before _showPrice() invoked...');
    $log.debug('index: ' + vm.index);
    $log.info('img: ');
    $log.debug(vm.img);
    $log.info('$rootScope.panels:');
    $log.debug($rootScope.panels);
*/

    activate();

    ////////////////

    function activate() {

      vm.showPrice = _showPrice;
      vm.hidePrice = _hidePrice;
      vm.showCalendar = _calendar;

    }

    function _showPrice() {

/*
      $log.info('_showPrice() invoked...');
      $log.debug('index: ' + vm.index);
      $log.info('img: ');
      $log.debug(vm.img);
      $log.info('$rootScope.panels:');
      $log.debug($rootScope.panels);
*/

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
      priceTable.append(tableContent);
    }

    function _calendar() {
/*
      $log.info('_calendar() invoked...');
      $log.debug('index: ' + vm.index);
      $log.info('img: ');
      $log.debug(vm.img);
      $log.info('$rootScope.panels:');
      $log.debug($rootScope.panels);
*/
    }

  }

})();

