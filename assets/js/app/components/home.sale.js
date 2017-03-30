(function () {
  "use strict";

  angular.module('OrangeClient')
    .component('smallPanelSale', {
      bindings: {
        badge: '<',
        type: '<',
        badgetext: '<',
        objnumber: '<',
        img: '<',
        content: '<'
      },
      templateUrl: 'templates/view/home/salePanelHome.html'
    });
})();