(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .directive('longAdminEditDirective', longAdminEditDirective);

  longAdminEditDirective.$inject = ['$log'];

  /* @ngInject */
  function longAdminEditDirective($log) {
    var directive = {
      bindToController: true,
      controller: 'LongAdminCtrl',
      controllerAs: 'vm',
      link: _link,
      restrict: 'AE',
      score: true,
      templateUrl: 'templates/view/admin/longPanelEditDirective.html'
    };
    return directive;

    function _link(scope, element, attrs) {

    }
  }

})();

