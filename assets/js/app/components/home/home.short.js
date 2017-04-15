(function () {
  "use strict";

  angular.module('OrangeClient')
    .component('smallPanelShort', {
      bindings: {
        badge: '<',
        type: '<',
        badgetext: '<',
        objNumber: '<',
        img: '<',
        content: '<'
      },
      templateUrl: 'templates/view/home/smallPanelShort.html'
    });
})();