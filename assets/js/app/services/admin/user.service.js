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
    service.deleteUser = _delete;

    return service;

    ////////////////

    function _getCurrent() {
      return $http.get($rootScope.orangeConfig.host + '/me').then(handleSuccess, handleError);
    } // _getCurrent

    function _create(reqObj) {
      return $http.post('/users', user).then(handleSuccess, handleError);
    } // _create

    function _login(reqObj) {
      return $http.post('/users', user).then(handleSuccess, handleError);
    } // _login

    function _update(user) {
      return $http.put('/users/' + user._id, user).then(handleSuccess, handleError);
    } // _update

    function _delete(_id) {
      return $http.delete('/users/' + _id).then(handleSuccess, handleError);
    } // _delete

    // private functions

    function handleSuccess(res) {
      return res.data;
    } // handleSuccess

    function handleError(res) {
      return $q.reject(res.data);
    } // handleError
  }

})();

