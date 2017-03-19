"use strict";

(function () {
  angular.module('OrangeClient')
    .factory('oCity', oCity);

  oCity.$inject = ['$resource'];
  function oCity($resource) {
    return $resource('/city/:id', {id: '@id'});
  }
})();
