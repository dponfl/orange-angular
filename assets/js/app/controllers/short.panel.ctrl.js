(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('ShortPanelCtrl', ShortPanelCtrl);

  ShortPanelCtrl.$inject = ['$modal', '$log'];

  /* @ngInject */
  function ShortPanelCtrl($modal, $log) {
    var vm = this;
    vm.title = 'ShortPanelCtrl';

    activate();

    ////////////////

    function activate() {
      vm.price = _price;
      vm.calendar = _calendar;
    }

    function _price() {
      $log.info('_price() invoked...');
    }

    function _calendar() {
      $log.info('_calendar() invoked...');
    }

  }

})();

