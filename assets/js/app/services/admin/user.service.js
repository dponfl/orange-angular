(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .factory('UserService', UserService);

  UserService.$inject = ['$rootScope', '$http', '$q'];

  /* @ngInject */
  function UserService($rootScope, $http, $q) {
    var service = {};

    service.getCurrentUser = _getCurrent;
    service.createUser = _create;
    service.loginUser = _login;
    service.updateUser = _update;
    service.logoutUser = _logout;

    return service;

    ////////////////

    function _getCurrent() {
      return $http.get($rootScope.orangeConfig.host + '/me')
        .then(handleSuccess, handleError);
    } // _getCurrent

    function _create(reqObj) {
      return $http.post($rootScope.orangeConfig.host + '/register', reqObj)
        .then(handleSuccess, handleError);
    } // _create

    function _login(reqObj) {
      return $http.post($rootScope.orangeConfig.host + '/auth/local', reqObj)
        .then(handleSuccess, handleError);
    } // _login

    function _update(reqObj) {
      return $http.post($rootScope.orangeConfig.host + '/update', reqObj)
        .then(handleSuccess, handleError);
    } // _update

    function _logout() {
      return $http.post($rootScope.orangeConfig.host + '/logout')
        .then(handleSuccess, handleError);
    } // _update

    // private functions

    function handleSuccess(res) {
      return res.data;
    } // handleSuccess

    function handleError(res) {
      return $q.reject(res);
    } // handleError
  }

})();

