(function () {
  "use strict";

  angular.module('OrangeClient')
    .factory('oDeal', oDeal);

  oDeal.$inject = ['$resource'];
  function oDeal($resource) {
    return $resource('/deal/:id', {id: '@id'});
  }
})();
