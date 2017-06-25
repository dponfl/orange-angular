(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('AccountController', AccountController);

  AccountController.$inject = ['UserService', '$state'];

  /* @ngInject */
  function AccountController(UserService, $state) {
    var vm = this;
    vm.title = 'AccountController';

    vm.user = null;
    vm.saveUser = _updateUser;

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

    function _updateUser() {

      console.log('updateUser...');

/*
      UserService.Update(vm.user)
        .then(function () {
          FlashService.Success('User updated');
        })
        .catch(function (error) {
          FlashService.Error(error);
        });
*/
    } // updateUser

  } // AccountController

})();


