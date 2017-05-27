(function () {
  "use strict";

  angular.module('OrangeClient')
    .component('panelExclusiveShort', {
      controller: 'ExclusiveShortPanelCtrl as eshortpc',
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
      templateUrl: 'templates/view/exclusive/panelExclusiveShort.html'
    });
})();