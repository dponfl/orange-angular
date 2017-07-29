(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .component('adminObjectFilter', {
      controller: 'AdminFiltersCtrl',
      bindings: {
        objList: '=',
        cityList: '=',
        roomList: '='
      },
      templateUrl: 'templates/view/admin/filter.html'
    });
})();
