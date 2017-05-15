(function () {
  "use strict";

  angular.module('OrangeClient')
    .component('smallPanelExclusive', {
      bindings: {
        badge: '<',
        type: '<',
        badgetext: '<',
        objNumber: '<',
        img: '<',
        content: '<'
      },
      templateUrl: 'templates/view/home/smallPanelExclusive.html'
    });
})();