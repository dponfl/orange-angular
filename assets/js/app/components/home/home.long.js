(function () {
  "use strict";

  angular.module('OrangeClient')
    .component('smallPanelLong', {
      bindings: {
        badge: '<',
        type: '<',
        badgetext: '<',
        objNumber: '<',
        img: '<',
        content: '<'
      },
      templateUrl: 'templates/view/home/smallPanelLong.html'
    });
})();