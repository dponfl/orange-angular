(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .service('ExclusiveService', ExclusiveService);

  ExclusiveService.$inject = ['GeneralConfigService', '$rootScope', '$http', '$log', 'oExclusiveKey',
    'oExclusive', 'lodash', '$q'];

  /* @ngInject */
  function ExclusiveService(GeneralConfigService, $rootScope, $http, $log, oExclusiveKey, oExclusive, lodash, $q) {
    var _ = lodash;
    var self = {
      getAllExclusiveObjectsKeys: _getAllExclusiveObjectsKeys,
      getAllExclusiveObjectsObjs: _getAllExclusiveObjectsObjs,
      getAllExclusiveObjectsObjsPager: _getAllExclusiveObjectsObjsPager,
    };

    return self;

    ////////////////

    function _getAllExclusiveObjectsKeys(reqObj) {
      var deferred = $q.defer();

      oExclusiveKey.find(reqObj, function (data) {

        var sortedData = {};
        var __keys = {};

        if (!_.isArray(data)) {
          deferred.reject(new Error('ExclusiveKey data is not an array'))
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
    } // _getAllExclusiveObjectsKeys

    function _getAllExclusiveObjectsObjs(reqObj) {

      // todo: return object having result code (200, 404, etc.) and data

      return $http.post($rootScope.orangeConfig.host + '/exclusive/find', reqObj)
        .then(successCb, errorCb);

      function successCb(data) {

        var response = [];
        var __objs = {};


        $log.info('_getAllExclusiveObjectsObjs, successCb, data:');
        $log.info(data);

        if (!_.isNil(data.status)
          && data.status == 200
          && !_.isNil(data.data)
        ) {

          /**
           * Get data for short term objects
           */

          if (!_.isNil(data.data.short)
            && !_.isNil(data.data.short.code)
            && data.data.short.code == 200
            && !_.isNil(data.data.short.result)
            && _.isArray(data.data.short.result)
          ) {
            _.forEach(data.data.short.result, function (resElem) {
              response.push(resElem);
            })

            $log.info('_getAllExclusiveObjectsObjs, successCb, short, response:');
            $log.info(response);

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
                deal: 'short_term',
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
          }

          /**
           * Get data for long term objects
           */

          response = [];

          if (!_.isNil(data.data.long)
            && !_.isNil(data.data.long.code)
            && data.data.long.code == 200
            && !_.isNil(data.data.long.result)
            && _.isArray(data.data.long.result)
          ) {
            _.forEach(data.data.long.result, function (resElem) {
              response.push(resElem);
            })

            $log.info('_getAllExclusiveObjectsObjs, successCb, long, response:');
            $log.info(response);

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
                deal: 'long_term',
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
          }

          /**
           * Get data for sale objects
           */

          response = [];

          if (!_.isNil(data.data.sale)
            && !_.isNil(data.data.sale.code)
            && data.data.sale.code == 200
            && !_.isNil(data.data.sale.result)
            && _.isArray(data.data.sale.result)
          ) {
            _.forEach(data.data.sale.result, function (resElem) {
              response.push(resElem);
            })

            $log.info('_getAllExclusiveObjectsObjs, successCb, sale, response:');
            $log.info(response);

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
                deal: 'sales',
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
          }






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
    } // _getAllExclusiveObjectsObjs

    function _getAllExclusiveObjectsObjsPager(reqObj, pager) {

      return $http.post($rootScope.orangeConfig.host + '/exclusive/findp', {
        conditions: reqObj,
        pager: pager
      } )
       .then(successCb, errorCb);

      function successCb(data) {

        var response = [];
        var __objs = {};


        $log.info('_getAllExclusiveObjectsObjsPager, successCb, data:');
        $log.info(data);

        if (!_.isNil(data.status)
          && data.status == 200
          && !_.isNil(data.data)
        ) {

          /**
           * Get data for short term objects
           */

          if (!_.isNil(data.data.short)
            && !_.isNil(data.data.short.code)
            && data.data.short.code == 200
            && !_.isNil(data.data.short.result)
            && _.isArray(data.data.short.result)
          ) {
            _.forEach(data.data.short.result, function (resElem) {
              response.push(resElem);
            })

            $log.info('_getAllExclusiveObjectsObjsPager, successCb, short, response:');
            $log.info(response);

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
                deal: 'short_term',
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
          }

          /**
           * Get data for long term objects
           */

          response = [];

          if (!_.isNil(data.data.long)
            && !_.isNil(data.data.long.code)
            && data.data.long.code == 200
            && !_.isNil(data.data.long.result)
            && _.isArray(data.data.long.result)
          ) {
            _.forEach(data.data.long.result, function (resElem) {
              response.push(resElem);
            })

            $log.info('_getAllExclusiveObjectsObjsPager, successCb, long, response:');
            $log.info(response);

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
                deal: 'long_term',
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
          }

          /**
           * Get data for sale objects
           */

          response = [];

          if (!_.isNil(data.data.sale)
            && !_.isNil(data.data.sale.code)
            && data.data.sale.code == 200
            && !_.isNil(data.data.sale.result)
            && _.isArray(data.data.sale.result)
          ) {
            _.forEach(data.data.sale.result, function (resElem) {
              response.push(resElem);
            })

            $log.info('_getAllExclusiveObjectsObjsPager, successCb, sale, response:');
            $log.info(response);

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
                deal: 'sales',
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
          }
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
    } // _getAllExclusiveObjectsObjsPager

  } // ExclusiveService

})();

