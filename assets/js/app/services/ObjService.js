"use strict";

(function () {
  angular.module('Orange')
    .factory('oObj', oObj);

  oObj.$inject = ['$resource'];
  function oObj($resource) {
    return $resource('/obj/:id', {id: '@id'});
  }
})();
