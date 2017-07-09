(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('AdminLongtermCtrl', AdminLongtermCtrl);

  AdminLongtermCtrl.$inject = ['some'];

  /* @ngInject */
  function AdminLongtermCtrl(some) {
    var vm = this;
    vm.title = 'AdminLongtermCtrl';

    activate();

    ////////////////

    function activate() {
      // some code
    }
  }

})();

