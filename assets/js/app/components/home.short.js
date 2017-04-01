(function () {
  "use strict";

  angular.module('OrangeClient')
    .component('smallPanelShort', {
      bindings: {
        badge: '<',
        type: '<',
        badgetext: '<',
        objnumber: '<',
        img: '<',
        content: '<'
      },
      templateUrl: 'templates/view/home/smallPanelShort.html'
    });
})();