"use strict";

(function () {
  angular.module('OrangeClient')
    .factory('oLong', oLong);

  oLong.$inject = ['$resource'];
  function oLong($resource) {
    return $resource('/long/:id', {id: '@id'}, {
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
