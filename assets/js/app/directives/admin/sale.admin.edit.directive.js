(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .directive('saleAdminEditDirective', saleAdminEditDirective);

  saleAdminEditDirective.$inject = ['$log'];

  /* @ngInject */
  function saleAdminEditDirective($log) {
    var directive = {
      bindToController: true,
      controller: 'SaleEditAdminCtrl',
      controllerAs: 'vm',
      link: _link,
      restrict: 'AE',
      score: true,
      templateUrl: 'templates/view/admin/salePanelEditDirective.html'
    };
    return directive;

    function _link(scope, element, attrs) {
/*
      $log.info('<<< !!! >>> saleAdminEditDirective, _link, scope:');
      console.log(scope);
*/


    } // _link
  }

})();

