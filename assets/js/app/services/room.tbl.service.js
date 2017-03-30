(function () {
  "use strict";

  angular.module('OrangeClient')
    .factory('oRoom', oRoom);

  oRoom.$inject = ['$resource'];
  function oRoom($resource) {
    return $resource('/room/:id', {id: '@id'});
  }
})();
