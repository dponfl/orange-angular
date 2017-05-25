(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .service('S_ReqService', S_ReqService);

  S_ReqService.$inject = ['GeneralConfigService', '$http', '$log', 'lodash', '$q'];

  /* @ngInject */
  function S_ReqService(GeneralConfigService, $http, $log, lodash, $q) {
    var _ = lodash;
    var self = {
      createSReq: _createSReq,
    };

    return self;

    ////////////////

    function _createSReq(reqObj) {

      // todo: return object having result code (200, 404, etc.) and data

      return $http.post($rootScope.orangeConfig.host + '/sreq/create', reqObj)
       .then(successCb, errorCb);

      function successCb(data) {

        $log.info('_createSReq, successCb, data:');
        $log.info(data);

        return {
          status: 200,
          data: data,
        };
      }

      function errorCb(err) {

        $log.info('_createSReq, errorCb, err:');
        $log.info(err);


        return {
         status: err.status,
         error: err,
       }
      }
    } // _createSReq

  } // S_ReqService

})();

