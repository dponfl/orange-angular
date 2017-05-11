(function () {
  "use strict";

  angular.module('OrangeClient')
    .component('panelSale', {
      controller: 'SalePanelCtrl as slpc',
      bindings: {
        badge: '<',
        type: '<',
        badgeText: '<',
        objNumber: '<',
        img: '<',
        gallery: '<',
        content: '<',
        youtube: '<',
        index: '=',
        panel: '=',
      },
      templateUrl: 'templates/view/sale/panelSale.html'
    });
})();