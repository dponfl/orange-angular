(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .component('adminShortObjectFilter', {
      controller: 'AdminShortFiltersCtrl',
      bindings: {
        objList: '=',
        cityList: '=',
        roomList: '=',
        showList: '=',
        homeList: '='
      },
      templateUrl: 'templates/view/admin/short_filter.html'
    });
})();
