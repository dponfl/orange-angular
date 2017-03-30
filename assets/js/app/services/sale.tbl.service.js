(function () {
  "use strict";

  angular.module('OrangeClient')
    .factory('oSale', oSale);

  oSale.$inject = ['$resource'];
  function oSale($resource) {
    return $resource('/sale/:id', {id: '@id'}, {
      update: {method: 'PUT'},
      find: {
        method: 'GET',
        isArray: true,
        params: {
          partner: '@partner',
          objnumber: '@objnumber',
          lang: '@lang',
          show: '@show',
          home: '@home',
          tag: '@tag',
          city: '@city',
          obj: '@obj',
          room: '@room',
        }
      }
    });
  }
})();
