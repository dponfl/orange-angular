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
    vm.username = '';
    vm.password = '';
    vm.wrongLogin = false;

    _initController();

    ////////////////

    function _initController() {
      // get current user
      UserService.getCurrentUser().then(function (data) {

        $log.info('_initController, data:');
        $log.info(data);

        if (_.has(data, 'session')
          && _.has(data.session, 'authenticated')
          && _.has(data.session, 'passport')
          && _.has(data.session.passport, 'user')
          && _.has($rootScope.currentUser, 'username')
          && _.has($rootScope.currentUser, 'id')
          && $rootScope.currentUser.id == data.session.passport.user
        ) {

          vm.username = $rootScope.currentUser.username;
        } else {
          vm.username = '';
          vm.password = '';
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

