(function () {
  "use strict";

  angular.module('OrangeClient')
    .factory('oLongKey', oLongKey);

  oLongKey.$inject = ['$resource'];
  function oLongKey($resource) {
    return $resource('/long_key/:id', {id: '@id'}, {
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
