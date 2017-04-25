(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .component('saleFilter', {
      controller: 'SaleFiltersCtrl',
      bindings: {
        objList: '=',
        cityList: '=',
        roomList: '='
      },
      templateUrl: 'templates/view/sale/filter.html'
    });
})();
