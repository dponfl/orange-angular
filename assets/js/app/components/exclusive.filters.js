(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .component('exclusiveFilter', {
      controller: 'ExclusiveFiltersCtrl',
      bindings: {
        dealList: '=',
        objList: '=',
        cityList: '=',
        roomList: '='
      },
      templateUrl: 'templates/view/exclusive/filter.html'
    });
})();
