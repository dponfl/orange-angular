"use strict";

(function () {
  angular.module('OrangeClient')
    .factory('oExclusive', oExclusive);

  oExclusive.$inject = ['$resource'];
  function oExclusive($resource) {
    return $resource('/exclusive/:id', {id: '@id'}, {
      update: {method: 'PUT'},
      find: {
        method: 'GET',
        isArray: true,
        params: {
          objnumber: '@objnumber',
          lang: '@lang',
          show: '@show',
          home: '@home',
          tag: '@tag',
          city: '@city',
          deal: '@deal',
          obj: '@obj',
          room: '@room',
        }
      }
    });
  }
})();
