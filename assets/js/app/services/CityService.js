"use strict";

(function () {
  angular.module('Orange')
    .factory('City', City);

  City.$inject = ['$resource'];
  function City($resource) {
    return $resource('/city/:id', {id: '@id'});
  }
})();
