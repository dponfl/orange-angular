(function () {
  "use strict";

  angular.module('OrangeClient')
    .component('panelShort', {
      controller: 'ShortPanelCtrl',
      bindings: {
        badge: '<',
        type: '<',
        badgeText: '<',
        objNumber: '<',
        img: '<',
        gallery: '<',
        content: '<'
      },
      templateUrl: 'templates/view/short/panelShort.html'
    });
})();