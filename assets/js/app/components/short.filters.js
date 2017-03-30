(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .component('shortFilter', {
      controller: 'ShortFiltersCtrl',
      bindings: {
        objList: '=',
        cityList: '=',
        roomList: '='
      },
      templateUrl: 'templates/view/short/filter.html'
    });
})();
