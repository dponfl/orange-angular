(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('ShortPanelCtrl', ShortPanelCtrl);

  ShortPanelCtrl.$inject = ['$rootScope', '$modal', '$log'];

  /* @ngInject */
  function ShortPanelCtrl($rootScope, $modal, $log) {
    var vm = this;
    vm.title = 'ShortPanelCtrl';

    activate();

    ////////////////

    function activate() {
      vm.price = _price;
      vm.calendar = _calendar;
    }

    function _price(index) {
      $log.info('_price() invoked...');
      $log.debug('index: ' + vm.index);
      $log.info('img: ');
      $log.debug(vm.img);
      $log.info('$rootScope.panels:');
      $log.debug($rootScope.panels);
    }

    function _calendar() {
      $log.info('_calendar() invoked...');
    }

  }

})();

