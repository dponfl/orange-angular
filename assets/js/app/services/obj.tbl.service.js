(function () {
  "use strict";

  angular.module('OrangeClient')
    .factory('oObj', oObj);

  oObj.$inject = ['$resource'];
  function oObj($resource) {
    return $resource('/obj/:id', {id: '@id'});
  }
})();
