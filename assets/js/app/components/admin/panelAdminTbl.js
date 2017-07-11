(function () {
  "use strict";

  angular.module('OrangeClient')
    .component('panelAdminTbl', {
      controller: 'PanelAdminTblCtrl as patc',
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
      templateUrl: 'templates/view/admin/panelAdminTbl.html'
    });
})();