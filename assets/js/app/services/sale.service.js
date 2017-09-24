(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .service('SaleService', SaleService);

  SaleService.$inject = ['GeneralConfigService', '$log', '$rootScope', '$http', 'oSaleKey',
    'oSale', 'lodash', '$q'];

  /* @ngInject */
  function SaleService(GeneralConfigService, $log, $rootScope, $http, oSaleKey, oSale, lodash, $q) {
    var _ = lodash;
    var name = 'SaleService';
    var self = {
      getAllSaleObjectsKeys: _getAllSaleObjectsKeys,
      getAllSaleObjectsObjs: _getAllSaleObjectsObjs,
      getAllSaleObjectsObjsPager: _getAllSaleObjectsObjsPager,
      putSaleObject: _putSaleObject,
      updateSaleObject: _updateSaleObject,
    };

    return self;

    ////////////////

    function _getAllSaleObjectsKeys(reqObj) {
      var deferred = $q.defer();

      oSaleKey.find(reqObj, function (data) {

        var sortedData = {};
        var __keys = {};

        if (!_.isArray(data)) {
          deferred.reject(new Error(name + ', _getAllSaleObjectsKeys: SaleKey data is not an array'))
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
    }

    function _getAllSaleObjectsObjs(reqObj) {

      // todo: return object having result code (200, 404, etc.) and data

      return $http.post($rootScope.orangeConfig.host + '/sale/find', reqObj)
        .then(successCb, errorCb);

      function successCb(data) {

        if (!_.isArray(data.data.result)) {
          return new Error(name + ', _getAllSaleObjectsObjs: Sale data is not an array');
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
    } // _getAllSaleObjectsObjs

    function _getAllSaleObjectsObjsPager(reqObj, pager) {

      return $http.post($rootScope.orangeConfig.host + '/sale/findp', {
        conditions: reqObj,
        pager: pager
      } )
        .then(successCb, errorCb);

      function successCb(data) {

        if (!_.isArray(data.data.result)) {
          return new Error(name + ', _getAllSaleObjectsObjsPager: Sale data is not an array');
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
    } // _getAllSaleObjectsObjsPager

    function _putSaleObject(reqObj) {

      // todo: return object having result code (200, 404, etc.) and data

      return $http.post($rootScope.orangeConfig.host + '/sale/put', reqObj)
        .then(successCb, errorCb);

      function successCb(data) {

        $log.info(name + ', _putSaleObject, successCb, data:');
        $log.info(data);

        if (!_.isNumber(data.data.result.id)) {
          return new Error(name + ', _putSaleObject: Sale data has wrong format');
        }

        var response = data.data.result;

        var __objs = {};


        if (!_.isArray(__objs[response.lang]))
          __objs[response.lang] = [];

        __objs[response.lang].push({
          objNumber: response.objnumber,
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
    } // _putSaleObject

    function _updateSaleObject(reqObj) {

      // todo: return object having result code (200, 404, etc.) and data

      return $http.post($rootScope.orangeConfig.host + '/sale/update', reqObj)
        .then(successCb, errorCb);

      function successCb(data) {

        $log.info('_updateSaleObject, successCb, data:');
        $log.info(data);

        if (!_.isNumber(data.data.result.id)) {
          return new Error('Sale data has wrong format');
        }

        var response = data.data.result;

        var __objs = {};


        if (!_.isArray(__objs[response.lang]))
          __objs[response.lang] = [];

        __objs[response.lang].push({
          objNumber: response.objnumber,
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
    } // _updateSaleObject


  } // SaleService


})();

