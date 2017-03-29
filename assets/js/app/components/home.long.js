(function () {
  "use strict";

  angular.module('OrangeClient')
    .component('smallPanelLong', {
      bindings: {
        badge: '<',
        type: '<',
        badgetext: '<',
        objnumber: '<',
        img: '<',
        content: '<'
      },
      templateUrl: 'templates/view/home/longPanelHome.html'
    });
})();