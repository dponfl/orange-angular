(function () {
  "use strict";

  angular.module('OrangeClient')
    .factory('oTag', oTag);

  oTag.$inject = ['$resource'];
  function oTag($resource) {
    return $resource('/tag/:id', {id: '@id'});
  }
})();
