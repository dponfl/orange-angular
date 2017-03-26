
(function () {
  "use strict";

  angular.module('OrangeClient')
    .service('GeneralConfigService', GeneralConfigService);

  /**
   * Service to manage home application params
   */
  GeneralConfigService.$inject = ['$rootScope', 'oCity', 'oDeal', 'oObj',
    'oRoom', 'oTag', 'lodash', '$q', '$log'];
  function GeneralConfigService($rootScope, oCity, oDeal, oObj,
                                oRoom, oTag, lodash, $q, $log) {
    var _ = lodash;
    var self = {
      orangeConfig: {},
      setLang: _setLang,
      getLang: _getLang,
      getCities: _getCities,
      getDeals: _getDeals,
      getObj: _getObj,
      getRoom: _getRoom,
      getTag: _getTag
    };

    /**
     * Initialising of app configs
     */

    self.setLang();
    self.getCities();
    self.getDeals();
    self.getObj();
    self.getRoom();
    self.getTag();

    $q.all([self.getCities(), self.getDeals(), self.getObj(),
      self.getRoom(), self.getTag()])
      .then(function () {
        self.setLang();
        $log.warn('GeneralConfigService');
        $log.info('self.orangeConfig.cityList:');
        $log.debug(self.orangeConfig.cityList);
        $log.info('self.orangeConfig.dealList:');
        $log.debug(self.orangeConfig.dealList);
        $log.info('self.orangeConfig.objList:');
        $log.debug(self.orangeConfig.objList);
        $log.info('self.orangeConfig.roomList:');
        $log.debug(self.orangeConfig.roomList);
        $log.info('self.orangeConfig.tagList:');
        $log.debug(self.orangeConfig.tagList);
      })
      .catch(function (err) {
        // todo: change by Log
        $log.warn('Error...');
        $log.error(err);
        return;
      });

    return self;


    function _setLang(lang) {
      // console.log('Setting lang=' + lang);
      $rootScope.lang = lang || 'en';
    } // _setLang

    function _getLang() {
      return $rootScope.lang || 'en';
    }

    /**
     * Exclude elements wish show = 0 from select list
     */
    function _excludeEmptyElem(arr) {
      _.forEach(arr, function (elem) {
        _.remove(elem, function (innerElem) {
          return innerElem == -1;
        })
      })
    } // _excludeEmptyElem

    /**
     * City
     */

    function _mapCityData(elem) {
      if (!_.isArray(self.orangeConfig.cityList[elem.lang]))
        self.orangeConfig.cityList[elem.lang] = [];
      if (elem.show == 0) {
        self.orangeConfig.cityList[elem.lang][elem.order] = -1;
      } else {
        self.orangeConfig.cityList[elem.lang][elem.order] = {};
        self.orangeConfig.cityList[elem.lang][elem.order]['key'] = elem.key;
        self.orangeConfig.cityList[elem.lang][elem.order]['val'] = elem.city;
      }

    } // _mapCityData

    function _getCities() {
      var deferred = $q.defer();
      oCity.query(function (data) {
          // console.log('!!! Success...');
          // console.dir(data);

          self.orangeConfig.cityList = {};

          if (!_.isArray(data)) deferred.reject(Error('Cities data is not an array'));

          data.map(_mapCityData);

          _excludeEmptyElem(self.orangeConfig.cityList);

          // console.log('self.orangeConfig:');
          // console.dir(self.orangeConfig);
          deferred.resolve();
        });

      return deferred.promise;
    } // _getCities

    /**
     * Deal
     */

    function _mapDealData(elem) {
      if (!_.isArray(self.orangeConfig.dealList[elem.lang]))
        self.orangeConfig.dealList[elem.lang] = [];
      if (elem.show == 0) {
        self.orangeConfig.dealList[elem.lang][elem.order] = -1;
      } else {
        self.orangeConfig.dealList[elem.lang][elem.order] = {};
        self.orangeConfig.dealList[elem.lang][elem.order]['key'] = elem.key;
        self.orangeConfig.dealList[elem.lang][elem.order]['val'] = elem.deal;
      }

    } // _mapDealData

    function _getDeals() {
      var deferred = $q.defer();
      oDeal.query(function (data) {
          // console.log('!!! Success...');
          // console.dir(data);

          self.orangeConfig.dealList = {};

          if (!_.isArray(data)) deferred.reject(Error('Deals data is not an array'));

          data.map(_mapDealData);

          _excludeEmptyElem(self.orangeConfig.dealList);

          // console.log('self.orangeConfig:');
          // console.dir(self.orangeConfig);

          deferred.resolve();
        });
      return deferred.promise;
    } // _getDeals

    /**
     * Object
     */

    function _mapObjData(elem) {
      if (!_.isArray(self.orangeConfig.objList[elem.lang]))
        self.orangeConfig.objList[elem.lang] = [];
      if (elem.show == 0) {
        self.orangeConfig.objList[elem.lang][elem.order] = -1;
      } else {
        self.orangeConfig.objList[elem.lang][elem.order] = {};
        self.orangeConfig.objList[elem.lang][elem.order]['key'] = elem.key;
        self.orangeConfig.objList[elem.lang][elem.order]['val'] = elem.obj;
      }

    } // _mapObjData

    function _getObj() {
      var deferred = $q.defer();
      oObj.query(function (data) {
          // console.log('!!! Success...');
          // console.dir(data);

          self.orangeConfig.objList = {};

          if (!_.isArray(data)) deferred.reject(Error('Obj data is not an array'));

          data.map(_mapObjData);

          _excludeEmptyElem(self.orangeConfig.objList);

          // console.log('self.orangeConfig:');
          // console.dir(self.orangeConfig);

          deferred.resolve();
        });

      return deferred.promise;
    } // _getObjects

    /**
     * Room
     */

    function _mapRoomData(elem) {
      if (!_.isArray(self.orangeConfig.roomList[elem.lang]))
        self.orangeConfig.roomList[elem.lang] = [];
      if (elem.show == 0) {
        self.orangeConfig.roomList[elem.lang][elem.order] = -1;
      } else {
        self.orangeConfig.roomList[elem.lang][elem.order] = {};
        self.orangeConfig.roomList[elem.lang][elem.order]['key'] = elem.key;
        self.orangeConfig.roomList[elem.lang][elem.order]['val'] = elem.room;
      }

    } // _mapRoomData

    function _getRoom() {
      var deferred = $q.defer();
      oRoom.query(function (data) {
          // console.log('!!! Success...');
          // console.dir(data);

          self.orangeConfig.roomList = {};

          if (!_.isArray(data)) deferred.reject(Error('Room data is not an array'));

          data.map(_mapRoomData);

          _excludeEmptyElem(self.orangeConfig.roomList);

          // console.log('self.orangeConfig:');
          // console.dir(self.orangeConfig);

          deferred.resolve();
        });

      return deferred.promise;
    } // _getRoom

    /**
     * Tag
     */

    function _getTag() {
      var deferred = $q.defer();
      oTag.query(function (data) {
          // console.log('!!! Success...');
          // console.dir(data);

          self.orangeConfig.tagList = {};

          if (!_.isArray(data)) deferred.reject(Error('Tag data is not an array'));

          for (var i = 0; i < data.length; i++) {
            if (!_.isArray(self.orangeConfig.tagList[data[i].lang]))
              self.orangeConfig.tagList[data[i].lang] = [];
            self.orangeConfig.tagList[data[i].lang].push({key: data[i].key, val: data[i].tag})
          }

          // console.log('self.orangeConfig.tagList:');
          // console.dir(self.orangeConfig.tagList);

          deferred.resolve();
        })

      return deferred.promise;
    } // _getTag

  } // GeneralConfigService
})();