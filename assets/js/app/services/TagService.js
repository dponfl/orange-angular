"use strict";

(function () {
  angular.module('Orange')
    .factory('oTag', oTag);

  oTag.$inject = ['$resource'];
  function oTag($resource) {
    return $resource('/tag/:id', {id: '@id'});
  }
})();
