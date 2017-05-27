(function () {
  "use strict";

  angular.module('OrangeClient')
    .component('panelExclusiveLong', {
      controller: 'ExclusiveLongPanelCtrl as elongpc',
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
      templateUrl: 'templates/view/exclusive/panelExclusiveLong.html'
    });
})();