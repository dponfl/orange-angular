"use strict";

(function () {
  angular.module('Orange')
    .factory('oRoom', oRoom);

  oRoom.$inject = ['$resource'];
  function oRoom($resource) {
    return $resource('/room/:id', {id: '@id'});
  }
})();
