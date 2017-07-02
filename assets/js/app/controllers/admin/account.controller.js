(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('AccountController', AccountController);

  AccountController.$inject = ['UserService', '$state', '$rootScope', '$log',
    '$timeout', 'lodash'];

  /* @ngInject */
  function AccountController(UserService, $state, $rootScope, $log,
                             $timeout, lodash) {

    var _ = lodash;
    var vm = this;
    vm.title = 'AccountController';

    vm.user = null;
    vm.command = null;
    vm.update = _updateUser;
    vm.create = _createUser;
    vm.clear = _clearUser;
    vm.logout = _logoutUser;
    vm.manageCommand = _manageCommand;
    vm.updateButton = _updateUserButton;
    vm.createButton = _createUserButton;

    _initController();

    ////////////////

    function _initController() {
      vm.first_name = $rootScope.currentUser.first_name;
      vm.last_name = $rootScope.currentUser.last_name;
      vm.email = $rootScope.currentUser.email;
      vm.username = $rootScope.currentUser.username;

      vm.createdUser = {};
      vm.createdUser.first_name = '';
      vm.createdUser.last_name = '';
      vm.createdUser.email = '';
      vm.createdUser.username = '';

      vm.isAdmin = ($rootScope.currentUser.username == 'admin');
      vm.wrongUpdata = false;
      vm.successfulUpdate = false;
      vm.wrongCreate = false;
      vm.successfulCreate = false;
    } // _initController

    function _manageCommand() {

      $log.info('staring _manageCommand...');

      switch (vm.command) {
        case 'update':  vm.update();
                        break;
        case 'create':  vm.create();
                        break;
      }
    } // _manageCommand

    function _updateUserButton() {

      $log.info('staring _updateUserButton...');

      vm.command = 'update';
    } // _updateUserButton

    function _createUserButton() {

      $log.info('staring _createUserButton...');

      vm.command = 'create';
    } // _updateUserButton

    function _updateUser() {

      $log.info('staring _updateUser...');

      UserService.updateUser({
        id: $rootScope.currentUser.id,
        username: vm.username,
        email: vm.email,
        password: vm.password,
        first_name: vm.first_name,
        last_name: vm.last_name,
      }).then(function (data) {

        $log.info('_updateUser, data:');
        $log.info(data);

        vm.first_name = _.has(data, 'first_name') ? data.first_name : $rootScope.currentUser.first_name;
        vm.last_name = _.has(data, 'last_name') ? data.last_name : $rootScope.currentUser.last_name;
        vm.email = _.has(data, 'email') ? data.email : $rootScope.currentUser.email;
        vm.username = _.has(data, 'username') ? data.username : $rootScope.currentUser.username;

        vm.successfulUpdate = true;
        vm.wrongUpdate = false;

        $timeout(function () {
          vm.wrongUpdate = false;
          vm.successfulUpdate = false;
        }, 10000);
      }).catch(function (err) {

        $log.info('_updateUser, error:');
        $log.info(err);

        vm.first_name = $rootScope.currentUser.first_name;
        vm.last_name = $rootScope.currentUser.last_name;
        vm.email = $rootScope.currentUser.email;
        vm.username = $rootScope.currentUser.username;

        vm.successfulUpdate = false;
        vm.wrongUpdate = true;
      });
    } // _updateUser

    function _createUser() {

      $log.info('staring _createUser...');

      UserService.createUser({
        username: vm.username,
        email: vm.email,
        password: vm.password,
        first_name: vm.first_name,
        last_name: vm.last_name,
      }).then(function (data) {

        $log.info('_createUser, data:');
        $log.info(data);

        vm.first_name = $rootScope.currentUser.first_name;
        vm.last_name = $rootScope.currentUser.last_name;
        vm.email = $rootScope.currentUser.email;
        vm.username = $rootScope.currentUser.username;

        vm.createdUser.first_name = _.has(data, 'first_name') ? data.first_name : '';
        vm.createdUser.last_name = _.has(data, 'last_name') ? data.last_name : '';
        vm.createdUser.email = _.has(data, 'email') ? data.email : '';
        vm.createdUser.username = _.has(data, 'username') ? data.username : '';

        vm.successfulCreate = true;
        vm.wrongCreate = false;

        $timeout(function () {
          vm.wrongCreate = false;
          vm.successfulCreate = false;
        }, 10000);
      }).catch(function (err) {

        $log.info('_createUser, error:');
        $log.info(err);

        vm.successfulCreate = false;
        vm.wrongCreate = true;
      });
    } // _createUser

    function _clearUser() {
      vm.first_name = '';
      vm.last_name = '';
      vm.email = '';
      vm.username = '';

      vm.wrongUpdata = false;
      vm.successfulUpdate = false;
      vm.wrongCreate = false;
      vm.successfulCreate = false;
    } // _clearUser

    function _logoutUser() {

      $log.info('staring _logoutUser...');

      UserService.logoutUser().then(function (data) {

        $log.info('_logoutUser, data:');
        // $log.info(data);

        $rootScope.currentUser.first_name = '';
        $rootScope.currentUser.last_name = '';
        $rootScope.currentUser.email = '';
        $rootScope.currentUser.username = '';

        vm.first_name = $rootScope.currentUser.first_name;
        vm.last_name = $rootScope.currentUser.last_name;
        vm.email = $rootScope.currentUser.email;
        vm.username = $rootScope.currentUser.username;

        $state.go('home');

      }).catch(function (err) {

        $log.info('_logoutUser, error:');
        $log.info(err);
      });

    } // _logout

  } // AccountController

})();


