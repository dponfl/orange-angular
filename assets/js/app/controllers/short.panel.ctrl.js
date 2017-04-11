(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('ShortPanelCtrl', ShortPanelCtrl);

  ShortPanelCtrl.$inject = ['$rootScope', '$scope', '$modal', '$log'];

  /* @ngInject */
  function ShortPanelCtrl($rootScope, $scope, $modal, $log) {
    var vm = this;
    vm.title = 'ShortPanelCtrl';
    var shortPriceModal = $modal({
      scope: $scope,
      templateUrl: '../templates/view/short/shortPriceModal.html',
      show: false,
      // backdrop: false,
    });

    $scope.message = 'Some $scope message to show...';

    $log.info('Before _showPrice() invoked...');
    $log.debug('index: ' + vm.index);
    $log.info('img: ');
    $log.debug(vm.img);
    $log.info('$rootScope.panels:');
    $log.debug($rootScope.panels);

    activate();

    ////////////////

    function activate() {

      vm.showPrice = _showPrice;
      vm.hidePrice = _hidePrice;
      vm.showCalendar = _calendar;

    }

    function _showPrice() {

      $log.info('_showPrice() invoked...');
      $log.debug('index: ' + vm.index);
      $log.info('img: ');
      $log.debug(vm.img);
      $log.info('$rootScope.panels:');
      $log.debug($rootScope.panels);

      $scope.index = vm.index;

      shortPriceModal.$promise.then(shortPriceModal.show);
    }

    function _hidePrice() {
      shortPriceModal.$promise.then(shortPriceModal.hide);
    }

    function _calendar() {
      $log.info('_calendar() invoked...');
      $log.debug('index: ' + vm.index);
      $log.info('img: ');
      $log.debug(vm.img);
      $log.info('$rootScope.panels:');
      $log.debug($rootScope.panels);
    }

  }

})();

