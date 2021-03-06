(function () {
  "use strict";

  angular.module('OrangeClient')
    .component('panelLong', {
      controller: 'LongPanelCtrl as lpc',
      bindings: {
        badge: '<',
        type: '<',
        badgeText: '<',
        objNumber: '<',
        img: '<',
        gallery: '<',
        content: '<',
        youtube: '<',
        youtubeshow: '<',
        index: '=',
        panel: '=',
      },
      templateUrl: 'templates/view/long/panelLong.html'
    });
})();