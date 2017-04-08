(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .service('ExclusiveService', ExclusiveService);

  ExclusiveService.$inject = ['$log', 'oExclusiveKey',
    'oExclusive', 'lodash', '$q'];

  /* @ngInject */
  function ExclusiveService($log, oExclusiveKey, oExclusive, lodash, $q) {
    var _ = lodash;
    var self = {
      getAllExclusiveObjectsKeys: _getAllExclusiveObjectsKeys,
      getAllExclusiveObjectsObjs: _getAllExclusiveObjectsObjs,
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
    }
    
    function _getAllExclusiveObjectsObjs(reqObj) {
      var deferred = $q.defer();

      oExclusive.find(reqObj, function (data) {
        var __objs = {};

        if (!_.isArray(data)) {
          deferred.reject(new Error('Exclusive data is not an array'))
        }

        for (var i = 0; i < data.length; i++) {

          if (!_.isArray(__objs[data[i].lang]))
            __objs[data[i].lang] = [];

          __objs[data[i].lang].push({
            objnumber: data[i].objnumber,
            show: data[i].show,
            home: data[i].home,
            tag: data[i].tag,
            city: data[i].city,
            address: data[i].address,
            deal: data[i].deal,
            obj: data[i].obj,
            room: data[i].room,
            bathroom: data[i].bathroom,
            pool: data[i].pool,
            price: data[i].price,
            calendar: data[i].calendar,
            description: data[i].description,
            info: data[i].info,
            map: data[i].map,
            imgmain: data[i].imgmain,
            imggallery: data[i].imggallery,
            youtube: data[i].youtube,
            createdAt: data[i].createdAt,
            updatedAt: data[i].updatedAt,
          })
        }

        deferred.resolve(__objs);

        /*setTimeout(function () {
          deferred.resolve(__objs);
        }, 5000);*/

      });

      return deferred.promise;
    }

    function _getAllExclusiveObjects() {
      return {
        key: 'value',
        keyTwo: 'value 2'
      }
    }
  } // ExclusiveService

})();

