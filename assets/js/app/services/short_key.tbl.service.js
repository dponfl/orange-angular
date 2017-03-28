"use strict";

(function () {
  angular.module('OrangeClient')
    .factory('oShortKey', oShortKey);

  oShortKey.$inject = ['$resource'];
  function oShortKey($resource) {
    return $resource('/short_key/:id', {id: '@id'}, {
      update: {method: 'PUT'},
      find: {
        method: 'GET',
        isArray: true,
        params: {
          lang: '@lang',
          order: '@order',
          key: '@key',
          show: '@show',
          home: '@home'
        }
      }
    });
  }
})();
