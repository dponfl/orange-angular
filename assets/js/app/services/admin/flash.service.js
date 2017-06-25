(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .factory('FlashService', FlashService);

  FlashService.$inject = ['$rootScope'];

  /* @ngInject */
  function FlashService($rootScope) {
    var service = {};

    service.Success = _Success;
    service.Error = _Error;

    initService();

    return service;

    ////////////////

    function initService() {
      $rootScope.$on('$locationChangeStart', function () {
        clearFlashMessage();
      });

      function clearFlashMessage() {
        var flash = $rootScope.flash;
        if (flash) {
          if (!flash.keepAfterLocationChange) {
            delete $rootScope.flash;
          } else {
            // only keep for a single location change
            flash.keepAfterLocationChange = false;
          }
        }
      }
    } // initService

    function _Success(message, keepAfterLocationChange) {
      $rootScope.flash = {
        message: message,
        type: 'success',
        keepAfterLocationChange: keepAfterLocationChange
      };
    } // Success

    function _Error(message, keepAfterLocationChange) {
      $rootScope.flash = {
        message: message,
        type: 'danger',
        keepAfterLocationChange: keepAfterLocationChange
      };
    } // Error
  }

})();

