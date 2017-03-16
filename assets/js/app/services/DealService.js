"use strict";

(function () {
  angular.module('Orange')
    .factory('oDeal', oDeal);

  oDeal.$inject = ['$resource'];
  function oDeal($resource) {
    return $resource('/deal/:id', {id: '@id'});
  }
})();
