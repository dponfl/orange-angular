(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .service('ContentService', ContentService);

  ContentService.$inject = ['GeneralConfigService', '$rootScope', '$http', '$log',
    'lodash', '$q'];

  /* @ngInject */
  function ContentService(GeneralConfigService, $rootScope, $http, $log, lodash, $q) {
    var _ = lodash;
    var name = 'ContentService';
    var self = {
      updateContentObject: _updateContentObject,
    };

    return self;

    ////////////////


    function _updateContentObject(reqObj) {

      // $log.info('_updateContentObject, reqObj:');
      // console.dir(reqObj);

      // todo: return object having result code (200, 404, etc.) and data

      return $http.post($rootScope.orangeConfig.host + '/content/update', reqObj)
        .then(successCb, errorCb);

      function successCb(data) {

        // $log.info('_updateContentObject, successCb, data:');
        // $log.info(data);

        if (!_.isNumber(data.data.result[0].id)) {
          return new Error('Short data has wrong format');
        }

        var response = data.data.result[0];

/*
        $log.info('_updateContentObject, response:');
        console.dir(response);
        $log.info('_updateContentObject, response.length:');
        console.dir(response.length);
*/

        var __objs = {};


        if (!_.isArray(__objs[response.lang]))
          __objs[response.lang] = [];

        __objs[response.lang].push({
          content: response.content,
          imgcarousel: response.imgcarousel,
          createdAt: response.createdAt,
          updatedAt: response.updatedAt,
        });

        return {
          status: 200,
          data: __objs,
        };
      }

      function errorCb(err) {

        return {
          status: err.status,
          error: err,
        }
      }
    } // _updateContentObject


  } // ContentService


})();

