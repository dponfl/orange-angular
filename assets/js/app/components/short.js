(function () {
  "use strict";

  angular.module('OrangeClient')
    .component('panelShort', {
      bindings: {
        badge: '<',
        type: '<',
        badgeText: '<',
        objNumber: '<',
        img: '<',
        gallery: '<',
        contentGroup001: '<'
        contentGroup002: '<'
      },
      templateUrl: 'templates/view/short/panelShort.html'
    });
})();