(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .service('LongService', LongService);

  LongService.$inject = ['GeneralConfigService', '$rootScope', '$http', '$log', 'oLongKey',
    'oLong', 'lodash', '$q'];

  /* @ngInject */
  function LongService(GeneralConfigService, $rootScope, $http, $log, oLongKey, oLong, lodash, $q) {
    var _ = lodash;
    var self = {
      getAllLongObjectsKeys: _getAllLongObjectsKeys,
      getAllLongObjectsObjs: _getAllLongObjectsObjs,
      getAllLongObjectsObjsPager: _getAllLongObjectsObjsPager,
      putLongObject: _putLongObject,
      updateLongObject: _updateLongObject,
    };

    return self;

    ////////////////

    function _getAllLongObjectsKeys(reqObj) {
      var deferred = $q.defer();

      oLongKey.find(reqObj, function (data) {

        var sortedData = {};
        var __keys = {};

        if (!_.isArray(data)) {
          deferred.reject(new Error('LongKey data is not an array'))
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
            exclusive: sortedData[i].exclusive,
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
    }

    function _getAllLongObjectsObjs(reqObj) {

      // todo: return object having result code (200, 404, etc.) and data

      return $http.post($rootScope.orangeConfig.host + '/long/find', reqObj)
        .then(successCb, errorCb);

      function successCb(data) {

        if (!_.isArray(data.data.result)) {
          return new Error('Long data is not an array');
        }

        var response = data.data.result;

        var __objs = {};

        for (var i = 0; i < response.length; i++) {

          if (!_.isArray(__objs[response[i].lang]))
            __objs[response[i].lang] = [];

          __objs[response[i].lang].push({
            objNumber: response[i].objnumber,
            exclusive: response[i].exclusive,
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
    } // _getAllLongObjectsObjs

    function _getAllLongObjectsObjsPager(reqObj, pager) {

      return $http.post($rootScope.orangeConfig.host + '/long/findp', {
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
            exclusive: response[i].exclusive,
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
    } // _getAllLongObjectsObjsPager

    function _putLongObject(reqObj) {

      // todo: return object having result code (200, 404, etc.) and data

      return $http.post($rootScope.orangeConfig.host + '/long/put', reqObj)
        .then(successCb, errorCb);

      function successCb(data) {

        // $log.info('_putLongObject, successCb, data:');
        // $log.info(data);

        if (!_.isNumber(data.data.result.id)) {
          return new Error('Long data has wrong format');
        }

        var response = data.data.result;

        var __objs = {};


        if (!_.isArray(__objs[response.lang]))
          __objs[response.lang] = [];

        __objs[response.lang].push({
          objNumber: response.objnumber,
          exclusive: response.exclusive,
          show: response.show,
          home: response.home,
          tag: response.tag,
          city: response.city,
          address: response.address,
          obj: response.obj,
          room: response.room,
          bathroom: response.bathroom,
          pool: response.pool,
          price: response.price,
          description: response.description,
          info: response.info,
          googleMap: response.maps,
          imgMain: response.imgmain,
          imgGallery: response.imggallery,
          youtube: response.youtube,
          createdAt: response.createdAt,
          updatedAt: response.updatedAt,
        });

        return {
          status: 201,
          data: __objs,
        };
      }

      function errorCb(err) {

        return {
          status: err.status,
          error: err,
        }
      }
    } // _putLongObject

    function _updateLongObject(reqObj) {

      // $log.info('_updateLongObject, reqObj:');
      // console.dir(reqObj);

      // todo: return object having result code (200, 404, etc.) and data

      return $http.post($rootScope.orangeConfig.host + '/long/update', reqObj)
        .then(successCb, errorCb);

      function successCb(data) {

        // $log.info('_updateLongObject, successCb, data:');
        // $log.info(data);

        if (!_.isNumber(data.data.result[0].id)) {
          return new Error('Long data has wrong format');
        }

        var response = data.data.result[0];

/*
        $log.info('_updateLongObject, response:');
        console.dir(response);
        $log.info('_updateLongObject, response.length:');
        console.dir(response.length);
*/

        var __objs = {};


        if (!_.isArray(__objs[response.lang]))
          __objs[response.lang] = [];

        __objs[response.lang].push({
          objNumber: response.objnumber,
          exclusive: response.exclusive,
          show: response.show,
          home: response.home,
          tag: response.tag,
          city: response.city,
          address: response.address,
          obj: response.obj,
          room: response.room,
          bathroom: response.bathroom,
          pool: response.pool,
          price: response.price,
          description: response.description,
          info: response.info,
          googleMap: response.maps,
          imgMain: response.imgmain,
          imgGallery: response.imggallery,
          youtube: response.youtube,
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
    } // _updateLongObject

  } // LongService

})();

