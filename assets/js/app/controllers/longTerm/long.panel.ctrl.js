(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('LongPanelCtrl', LongPanelCtrl);

  LongPanelCtrl.$inject = ['$rootScope', '$scope', '$modal', '$log', 'lodash'];

  /* @ngInject */
  function LongPanelCtrl($rootScope, $scope, $modal, $log, lodash) {
    var _ = lodash;
    var vm = this;
    vm.title = 'LongPanelCtrl';
    vm.badge = false;

    var longBookObjectModal = $modal({
      scope: $scope,
      templateUrl: '../templates/view/long/longBookObjectModal.html',
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

      longBookObjectModal.$promise.then(longBookObjectModal.show);
    }

    function _hideBookObject() {
      longBookObjectModal.$promise.then(longBookObjectModal.hide);
    }

  }

})();

