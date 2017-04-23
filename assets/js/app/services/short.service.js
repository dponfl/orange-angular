(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .service('ShortService', ShortService);

  ShortService.$inject = ['$http', '$log', 'oShortKey',
    'oShort', 'lodash', '$q'];

  /* @ngInject */
  function ShortService($http, $log, oShortKey, oShort, lodash, $q) {
    var _ = lodash;
    var self = {
      getAllShortObjectsKeys: _getAllShortObjectsKeys,
      getAllShortObjectsObjs: _getAllShortObjectsObjs,
      getAllShortObjectsObjsPager: _getAllShortObjectsObjsPager,
    };

    return self;

    ////////////////

    function _getAllShortObjectsKeys(reqObj) {
      var deferred = $q.defer();

      oShortKey.find(reqObj, function (data) {

        var sortedData = {};
        var __keys = {};

        if (!_.isArray(data)) {
          deferred.reject(new Error('ShortKey data is not an array'))
        }

        sortedData = _.sortBy(data, 'order');

        for (var i = 0; i < sortedData.length; i++) {

          if (!_.isArray(__keys[sortedData[i].lang]))
            __keys[sortedData[i].lang] = [];

          __keys[sortedData[i].lang].push({
            id: sortedData[i].id,
            lang: sortedData[i].lang,
            order: sortedData[i].order,
            group: sortedData[i].group,
            key: sortedData[i].key,
            label: sortedData[i].label,
            show: sortedData[i].show,
            home: sortedData[i].home,
            createdAt: sortedData[i].createdAt,
            updatedAt: sortedData[i].updatedAt,
          })
        }

        deferred.resolve(__keys);

        /*setTimeout(function () {
          deferred.resolve(__keys);
        }, 3000);*/


      });

      return deferred.promise;
    } // _getAllShortObjectsKeys

    function _getAllShortObjectsObjs(reqObj) {

      // todo: return object having result code (200, 404, etc.) and data

      return $http.post('http://localhost:1337/short/find', reqObj)
       .then(successCb, errorCb);

      function successCb(data) {

        if (!_.isArray(data.data.result)) {
          return new Error('Short data is not an array');
        }

        var response = data.data.result;

        var __objs = {};

        for (var i = 0; i < response.length; i++) {

          if (!_.isArray(__objs[response[i].lang]))
            __objs[response[i].lang] = [];

          __objs[response[i].lang].push({
            objNumber: response[i].objnumber,
            show: response[i].show,
            home: response[i].home,
            tag: response[i].tag,
            city: response[i].city,
            address: response[i].address,
            obj: response[i].obj,
            room: response[i].room,
            bathroom: response[i].bathroom,
            pool: response[i].pool,
            price: response[i].price,
            calendar: response[i].calendar,
            description: response[i].description,
            info: response[i].info,
            googleMap: response[i].maps,
            imgMain: response[i].imgmain,
            imgGallery: response[i].imggallery,
            youtube: response[i].youtube,
            createdAt: response[i].createdAt,
            updatedAt: response[i].updatedAt,
          })
        }

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
    } // _getAllShortObjectsObjs

    function _getAllShortObjectsObjsPager(reqObj, pager) {

      return $http.post('http://localhost:1337/short/findp', {
        conditions: reqObj,
        pager: pager
      } )
       .then(successCb, errorCb);

      function successCb(data) {

        if (!_.isArray(data.data.result)) {
          return new Error('Short data is not an array');
        }

        var response = data.data.result;

        var __objs = {};

        for (var i = 0; i < response.length; i++) {

          if (!_.isArray(__objs[response[i].lang]))
            __objs[response[i].lang] = [];

          __objs[response[i].lang].push({
            objNumber: response[i].objnumber,
            show: response[i].show,
            home: response[i].home,
            tag: response[i].tag,
            city: response[i].city,
            address: response[i].address,
            obj: response[i].obj,
            room: response[i].room,
            bathroom: response[i].bathroom,
            pool: response[i].pool,
            price: response[i].price,
            calendar: response[i].calendar,
            description: response[i].description,
            info: response[i].info,
            googleMap: response[i].maps,
            imgMain: response[i].imgmain,
            imgGallery: response[i].imggallery,
            youtube: response[i].youtube,
            createdAt: response[i].createdAt,
            updatedAt: response[i].updatedAt,
          })
        }

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
    } // _getAllShortObjectsObjsPager



  } // ShortService

})();

