(function () {
  "use strict";

  angular.module('OrangeClient')
    .component('smallPanelExclusive', {
      bindings: {
        badge: '<',
        type: '<',
        badgetext: '<',
        objnumber: '<',
        img: '<',
        content: '<'
      },
      templateUrl: 'templates/view/home/smallPanelExclusive.html'
    });
})();