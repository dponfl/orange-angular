(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .component('longFilter', {
      controller: 'LongFiltersCtrl',
      bindings: {
        objList: '=',
        cityList: '=',
        roomList: '='
      },
      templateUrl: 'templates/view/long/filter.html'
    });
})();
