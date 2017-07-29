(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .component('longAdminCreate', {
      controller: 'LongAdminCtrl',
      bindings: {
        objList: '=',
        cityList: '=',
        roomList: '='
      },
      templateUrl: 'templates/view/admin/longPanelCreate.html'
    });
})();
