(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .service('ShortService', ShortService);

  ShortService.$inject = ['$log', 'oShortKey',
    'oShort', 'lodash', '$q'];

  /* @ngInject */
  function ShortService($log, oShortKey, oShort, lodash, $q) {
    var _ = lodash;
    var self = {
      getAllShortObjectsHomeKeys: _getAllShortObjectsHomeKeys,
      getAllShortObjectsHomeObjs: _getAllShortObjectsHomeObjs,
    };

    return self;

    ////////////////

    function _getAllShortObjectsHomeKeys() {
      var deferred = $q.defer();

      oShortKey.find({home: 1}, function (data) {

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

/*
        $log.info('__keys...');
        $log.debug(__keys);
*/

        deferred.resolve(__keys);

        /*setTimeout(function () {
          deferred.resolve(__keys);
        }, 3000);*/


      });

      return deferred.promise;
    }
    
    function _getAllShortObjectsHomeObjs() {
      var deferred = $q.defer();

      oShort.find({home: 1}, function (data) {
        var __objs = {};

        if (!_.isArray(data)) {
          deferred.reject(new Error('Short data is not an array'))
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

/*
        $log.info('__objs...');
        $log.debug(__objs);
*/

        deferred.resolve(__objs);

        /*setTimeout(function () {
          deferred.resolve(__objs);
        }, 5000);*/

      });

      return deferred.promise;
    }

  } // ShortService

})();

