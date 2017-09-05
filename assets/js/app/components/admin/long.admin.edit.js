(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .component('longAdminEdit', {
      controller: 'LongAdminCtrl',
      bindings: {
        objList: '=',
        cityList: '=',
        roomList: '=',
        obj: '='
      },
      templateUrl: 'templates/view/admin/longPanelEdit.html'
    });
})();
