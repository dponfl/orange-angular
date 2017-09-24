(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .component('adminLongObjectFilter', {
      controller: 'AdminLongFiltersCtrl',
      bindings: {
        objList: '=',
        cityList: '=',
        roomList: '=',
        showList: '=',
        homeList: '='
      },
      templateUrl: 'templates/view/admin/long_filter.html'
    });
})();
