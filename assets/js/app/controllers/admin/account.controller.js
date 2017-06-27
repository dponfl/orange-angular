(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('AccountController', AccountController);

  AccountController.$inject = ['UserService', '$state', '$rootScope', '$log', '$timeout'];

  /* @ngInject */
  function AccountController(UserService, $state, $rootScope, $log, $timeout) {
    var vm = this;
    vm.title = 'AccountController';

    vm.user = null;
    vm.update = _updateUser;
    vm.create = _createUser;
    vm.clear = _clear;

    _initController();

    ////////////////

    function _initController() {
      vm.first_name = $rootScope.currentUser.first_name;
      vm.last_name = $rootScope.currentUser.last_name;
      vm.email = $rootScope.currentUser.email;
      vm.username = $rootScope.currentUser.username;
      vm.isAdmin = ($rootScope.currentUser.username == 'admin');
      vm.wrongUpdata = false;
      vm.successfulUpdate = false;
      vm.wrongCreate = false;
      vm.successfulCreate = false;
    } // _initController

    function _updateUser() {

    } // _updateUser

    function _createUser() {
      UserService.createUser({
        username: vm.username,
        email: vm.email,
        password: vm.password,
        first_name: vm.first_name,
        last_name: vm.last_name,
      }).then(function (data) {

        $log.info('_createUser, data:');
        $log.info(data);

        vm.successfulCreate = true;
        vm.wrongCreate = false;

        $timeout(function () {
          vm.wrongCreate = false;
          vm.successfulCreate = false;
        }, 10000);
      }).catch(function (err) {

        $log.info('_loginUser, error:');
        $log.info(err);

        vm.successfulCreate = false;
        vm.wrongCreate = true;
      });
    } // _createUser

    function _clear() {
      vm.first_name = '';
      vm.last_name = '';
      vm.email = '';
      vm.username = '';
    } // _clear

  } // AccountController

})();


