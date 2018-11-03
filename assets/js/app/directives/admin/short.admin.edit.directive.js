(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .directive('shortAdminEditDirective', shortAdminEditDirective);

  shortAdminEditDirective.$inject = ['$log'];

  /* @ngInject */
  function shortAdminEditDirective($log) {
    var directive = {
      bindToController: true,
      controller: 'ShortEditAdminCtrl',
      controllerAs: 'vm',
      link: _link,
      restrict: 'AE',
      scope: true,
      templateUrl: 'templates/view/admin/shortPanelEditDirective.html'
    };
    return directive;

    function _link(scope, element, attrs) {
      // $log.info('<<< !!! >>> shortAdminEditDirective, _link, scope:');
      // console.log(scope);
    } // _link
  }

})();

