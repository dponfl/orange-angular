(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('AccountController', AccountController);

  AccountController.$inject = ['$state', 'UserService', 'FlashService'];

  /* @ngInject */
  function AccountController($state, UserService, FlashService) {
    var vm = this;
    vm.title = 'AccountController';

    vm.user = null;
    vm.saveUser = _saveUser;
    vm.deleteUser = _deleteUser;

    initController();

    ////////////////

    function initController() {
      // get current user
/*
      UserService.GetCurrent().then(function (user) {
        vm.user = user;
      });
*/
    } // initController

    function _saveUser() {

      console.log('saveUser...');

/*
      UserService.Update(vm.user)
        .then(function () {
          FlashService.Success('User updated');
        })
        .catch(function (error) {
          FlashService.Error(error);
        });
*/
    } // saveUser

    function _deleteUser() {

      console.log('deleteUser...');

/*
      UserService.Delete(vm.user._id)
        .then(function () {
          // log user out
          $state.go('login');
        })
        .catch(function (error) {
          FlashService.Error(error);
        });
*/
    } // deleteUser

  } // AccountController

})();


