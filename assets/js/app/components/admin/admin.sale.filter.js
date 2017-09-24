(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .component('adminSaleObjectFilter', {
      controller: 'AdminSaleFiltersCtrl',
      bindings: {
        objList: '=',
        cityList: '=',
        roomList: '=',
        showList: '=',
        homeList: '='
      },
      templateUrl: 'templates/view/admin/sale_filter.html'
    });
})();
