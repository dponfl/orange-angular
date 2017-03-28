"use strict";

(function () {
  angular.module('OrangeClient')
    .factory('oShort', oShort);

  oShort.$inject = ['$resource'];
  function oShort($resource) {
    return $resource('/short/:id', {id: '@id'}, {
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
          deal: '@deal',
          obj: '@obj',
          room: '@room',
        }
      }
    });
  }
})();
