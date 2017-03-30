(function () {
  "use strict";

  angular.module('OrangeClient')
    .factory('oCity', oCity);

  oCity.$inject = ['$resource'];
  function oCity($resource) {
    return $resource('/city/:id', {id: '@id'}, {
      update: {method: 'PUT'},
      find: {
        method: 'GET',
        isArray: true,
        params: {
          lang: '@lang',
          order: '@order',
          key: '@key',
          show: '@show'
        }
      }
    });
  }
})();
