(function () {
  "use strict";

  angular.module('OrangeClient')
    .factory('oSaleKey', oSaleKey);

  oSaleKey.$inject = ['$resource'];
  function oSaleKey($resource) {
    return $resource('/sale_key/:id', {id: '@id'}, {
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
