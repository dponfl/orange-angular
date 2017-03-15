"use strict";

(function () {
  angular.module('Orange')
    .factory('Deal', Deal);

  Deal.$inject = ['$resource'];
  function Deal($resource) {
    return $resource('/deal/:id', {id: '@id'});
  }
})();
