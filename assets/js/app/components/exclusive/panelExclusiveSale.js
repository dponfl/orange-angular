(function () {
  "use strict";

  angular.module('OrangeClient')
    .component('panelExclusiveSale', {
      controller: 'ExclusiveSalePanelCtrl as esalepc',
      bindings: {
        badge: '<',
        type: '<',
        badgeText: '<',
        objNumber: '<',
        img: '<',
        gallery: '<',
        content: '<',
        youtube: '<',
        index: '=',
        panel: '=',
      },
      templateUrl: 'templates/view/exclusive/panelExclusiveSale.html'
    });
})();