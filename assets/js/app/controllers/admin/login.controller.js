(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['UserService', '$log', 'lodash'];

  /* @ngInject */
  function LoginController(UserService, $log, lodash) {
    var _ = lodash;
    var vm = this;
    vm.title = 'LoginController';
    vm.init = _initController;

    vm.user = null;
    vm.username = 'none';
    vm.password = 'none';

    // _initController();

    ////////////////

    function _initController() {
      // get current user
      UserService.getCurrentUser().then(function (data) {
        var keys = _.keys(data);

        $log.info('initController, data:');
        $log.info(data);

        $log.info('initController, data, keys:');
        $log.info(keys);

        if (_.indexOf(keys, 'passport') != -1) {
          var user = _.find(data.passport, 'user');
          vm.username = data.passport.user;
        } else {
          vm.username = 'new none';
          vm.password = 'new none';
        }
      });
    } // _initController

    function loginUser() {

    } // loginUser

  } // LoginController

})();

