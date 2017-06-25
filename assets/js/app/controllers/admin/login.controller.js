(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['UserService', '$log', '$state', 'lodash', '$rootScope'];

  /* @ngInject */
  function LoginController(UserService, $log, $state, lodash, $rootScope) {
    var _ = lodash;
    var vm = this;
    vm.title = 'LoginController';
    vm.init = _initController;
    vm.login = _loginUser;
    vm.clear = _clear;

    vm.user = null;
    vm.username = 'none';
    vm.password = 'none';
    vm.wrongLogin = false;

    // _initController();

    ////////////////

    function _initController() {
      // get current user
      UserService.getCurrentUser().then(function (data) {
        var keys = _.keys(data);

        $log.info('_initController, data:');
        $log.info(data);

        $log.info('_initController, data, keys:');
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

    function _loginUser() {
      vm.wrongLogin = false;
      UserService.loginUser({
        identifier: vm.username,
        password: vm.password
      }).then(function (data) {
        $log.info('_loginUser, data:');
        $log.info(data);
        $rootScope.currentUser = {
          id: data.id,
          username: data.username,
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
        };
        $state.go('account');
      }).catch(function (err) {
        $log.info('_loginUser, error:');
        $log.info(err);
        vm.wrongLogin = true;
      });

    } // _loginUser

    function _clear() {
      vm.username = '';
      vm.password = '';
      vm.wrongLogin = false;
    } // _clear

  } // LoginController

})();

