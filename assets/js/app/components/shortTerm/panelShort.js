(function () {
  "use strict";

  angular.module('OrangeClient')
    .component('panelShort', {
      controller: 'ShortPanelCtrl as spc',
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
      templateUrl: 'templates/view/short/panelShort.html'
    });
})();