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
      controller: 'LongEditAdminCtrl',
      controllerAs: 'vm',
      link: _link,
      restrict: 'AE',
      scope: true,
      templateUrl: 'templates/view/admin/longPanelEditDirective.html'
    };
    return directive;

    function _link(scope, element, attrs) {
/*
      $log.info('<<< !!! >>> longAdminEditDirective, _link, scope:');
      console.log(scope);
*/


    } // _link
  }

})();

