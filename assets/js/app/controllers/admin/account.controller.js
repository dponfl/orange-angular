(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('AccountController', AccountController);

  AccountController.$inject = ['UserService', '$state', '$rootScope'];

  /* @ngInject */
  function AccountController(UserService, $state, $rootScope) {
    var vm = this;
    vm.title = 'AccountController';

    vm.user = null;
    vm.update = _updateUser;
    vm.clear = _clear;

    _initController();

    ////////////////

    function _initController() {
      vm.first_name = $rootScope.currentUser.first_name;
      vm.last_name = $rootScope.currentUser.last_name;
      vm.email = $rootScope.currentUser.email;
      vm.username = $rootScope.currentUser.username;
    } // _initController

    function _updateUser() {

      console.log('updateUser...');

    } // _updateUser

    function _clear() {
      vm.first_name = '';
      vm.last_name = '';
      vm.email = '';
      vm.username = '';
    } // _clear

  } // AccountController

})();


