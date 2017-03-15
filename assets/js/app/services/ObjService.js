"use strict";

(function () {
  angular.module('Orange')
    .factory('Obj', Obj);

  Obj.$inject = ['$resource'];
  function Obj($resource) {
    return $resource('/obj/:id', {id: '@id'});
  }
})();
