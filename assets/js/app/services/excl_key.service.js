"use strict";

(function () {
  angular.module('OrangeClient')
    .factory('oExclusiveKey', oExclusiveKey);

  oExclusiveKey.$inject = ['$resource'];
  function oExclusiveKey($resource) {
    return $resource('/exclusive_key/:id', {id: '@id'}, {
      update: {method: 'PUT'},
      find: {
        method: 'GET',
        isArray: true,
        params: {
          lang: '@lang',
          order: '@order',
          key: '@key',
          show: '@show',
          main: '@home'
        }
      }
    });
  }
})();
