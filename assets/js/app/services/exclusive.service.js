(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .service('ExclusiveService', ExclusiveService);

  ExclusiveService.$inject = ['$rootScope'];

  /* @ngInject */
  function ExclusiveService($rootScope) {
    var self = {
      getExclusiveObjectsMain: _getExclusiveObjectsMain,
      getExclusiveObjects: _getExclusiveObjects
    };

    ////////////////
    
    function _getExclusiveObjectsMain() {

    }

    function _getExclusiveObjects() {
      return {
        key: 'value',
        keyTwo: 'value 2'
      }
    }
    return self;
  }

})();

