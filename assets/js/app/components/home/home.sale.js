(function () {
  "use strict";

  angular.module('OrangeClient')
    .component('smallPanelSale', {
      bindings: {
        badge: '<',
        type: '<',
        badgetext: '<',
        objNumber: '<',
        img: '<',
        content: '<'
      },
      templateUrl: 'templates/view/home/smallPanelSale.html'
    });
})();