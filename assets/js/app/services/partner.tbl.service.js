(function () {
  "use strict";

  angular.module('OrangeClient')
    .factory('oPartner', oPartner);

  oPartner.$inject = ['$resource'];
  function oPartner($resource) {
    return $resource('/partner/:id', {id: '@id'});
  }
})();
