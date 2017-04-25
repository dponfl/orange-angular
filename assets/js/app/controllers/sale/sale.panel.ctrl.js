(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('SalePanelCtrl', SalePanelCtrl);

  SalePanelCtrl.$inject = ['$rootScope', '$scope', '$modal', '$log', 'lodash'];

  /* @ngInject */
  function SalePanelCtrl($rootScope, $scope, $modal, $log, lodash) {
    var _ = lodash;
    var vm = this;
    vm.title = 'SalePanelCtrl';
    vm.badge = false;

    var saleBookObjectModal = $modal({
      scope: $scope,
      templateUrl: '../templates/view/sale/saleBookObjectModal.html',
      show: false,
      backdrop: true,
      onHide: function () {
        $('body').css('overflow', 'auto');
      },
      onShow: function () {
        $('body').css('overflow', 'hidden');
      }
    });

    this.$onInit = function () {
    };

    activate();

    ////////////////

    function activate() {

      vm.showBookObject = _showBookObject;
      vm.hideBookObject = _hideBookObject;
    } // activate()

    /**
     * Book Object modal
     * @private
     */

    function _showBookObject() {
      $scope.index = vm.index;

      saleBookObjectModal.$promise.then(saleBookObjectModal.show);
    }

    function _hideBookObject() {
      saleBookObjectModal.$promise.then(saleBookObjectModal.hide);
    }

  }

})();

