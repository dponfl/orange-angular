
(function () {
  "use strict";

  angular.module('OrangeClient')
    .service('GeneralConfigService', GeneralConfigService);

  /**
   * Service to manage main application params
   */
  GeneralConfigService.$inject = ['oCity', 'oDeal', 'oObj', 'oRoom', 'oTag', 'lodash'];
  function GeneralConfigService(oCity, oDeal, oObj, oRoom, oTag, lodash) {
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

    return self;


    function _setLang(lang) {
      // console.log('Setting lang=' + lang);
      self.orangeConfig.lang = lang || 'en';
    } // _setLang

    function _getLang() {
      return self.orangeConfig.lang || 'en';
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
      if (!_.isArray(self.orangeConfig.cityList[elem.lang])) self.orangeConfig.cityList[elem.lang] = [];
      if (elem.show == 0) {
        self.orangeConfig.cityList[elem.lang][elem.order] = -1;
      } else {
        self.orangeConfig.cityList[elem.lang][elem.order] = {};
        self.orangeConfig.cityList[elem.lang][elem.order]['key'] = elem.key;
        self.orangeConfig.cityList[elem.lang][elem.order]['val'] = elem.city;
      }

    } // _mapCityData

    function _getCities() {
      oCity.query(function (data) {
      })
        .$promise
        .then(function (data) {
          // console.log('!!! Success...');
          // console.dir(data);

          self.orangeConfig.cityList = {};

          if (!_.isArray(data)) throw Error('Error: Cities data is not an array');

          data.map(_mapCityData);

          _excludeEmptyElem(self.orangeConfig.cityList);

          // console.log('self.orangeConfig:');
          // console.dir(self.orangeConfig);
          return;
        })
        .catch(function (err) {

          // todo: change by Log
          console.log('Error...');
          console.dir(err);
          return;
        });
    } // _getCities

    /**
     * Deal
     */

    function _mapDealData(elem) {
      if (!_.isArray(self.orangeConfig.dealList[elem.lang])) self.orangeConfig.dealList[elem.lang] = [];
      if (elem.show == 0) {
        self.orangeConfig.dealList[elem.lang][elem.order] = -1;
      } else {
        self.orangeConfig.dealList[elem.lang][elem.order] = {};
        self.orangeConfig.dealList[elem.lang][elem.order]['key'] = elem.key;
        self.orangeConfig.dealList[elem.lang][elem.order]['val'] = elem.deal;
      }

    } // _mapDealData

    function _getDeals() {
      oDeal.query(function (data) {
      })
        .$promise
        .then(function (data) {
          // console.log('!!! Success...');
          // console.dir(data);

          self.orangeConfig.dealList = {};

          if (!_.isArray(data)) throw Error('Error: Deals data is not an array');

          data.map(_mapDealData);

          _excludeEmptyElem(self.orangeConfig.dealList);

          // console.log('self.orangeConfig:');
          // console.dir(self.orangeConfig);
          return;
        })
        .catch(function (err) {

          // todo: change by Log
          console.log('Error...');
          console.dir(err);
          return;
        });
    } // _getDeals

    /**
     * Object
     */

    function _mapObjData(elem) {
      if (!_.isArray(self.orangeConfig.objList[elem.lang])) self.orangeConfig.objList[elem.lang] = [];
      if (elem.show == 0) {
        self.orangeConfig.objList[elem.lang][elem.order] = -1;
      } else {
        self.orangeConfig.objList[elem.lang][elem.order] = {};
        self.orangeConfig.objList[elem.lang][elem.order]['key'] = elem.key;
        self.orangeConfig.objList[elem.lang][elem.order]['val'] = elem.obj;
      }

    } // _mapObjData

    function _getObj() {
      oObj.query(function (data) {
      })
        .$promise
        .then(function (data) {
          // console.log('!!! Success...');
          // console.dir(data);

          self.orangeConfig.objList = {};

          if (!_.isArray(data)) throw Error('Error: Obj data is not an array');

          data.map(_mapObjData);

          _excludeEmptyElem(self.orangeConfig.objList);

          // console.log('self.orangeConfig:');
          // console.dir(self.orangeConfig);
          return;
        })
        .catch(function (err) {

          // todo: change by Log
          console.log('Error...');
          console.dir(err);
          return;
        });
    } // _getObjects

    /**
     * Room
     */

    function _mapRoomData(elem) {
      if (!_.isArray(self.orangeConfig.roomList[elem.lang])) self.orangeConfig.roomList[elem.lang] = [];
      if (elem.show == 0) {
        self.orangeConfig.roomList[elem.lang][elem.order] = -1;
      } else {
        self.orangeConfig.roomList[elem.lang][elem.order] = {};
        self.orangeConfig.roomList[elem.lang][elem.order]['key'] = elem.key;
        self.orangeConfig.roomList[elem.lang][elem.order]['val'] = elem.room;
      }

    } // _mapRoomData

    function _getRoom() {
      oRoom.query(function (data) {
      })
        .$promise
        .then(function (data) {
          // console.log('!!! Success...');
          // console.dir(data);

          self.orangeConfig.roomList = {};

          if (!_.isArray(data)) throw Error('Error: Room data is not an array');

          data.map(_mapRoomData);

          _excludeEmptyElem(self.orangeConfig.roomList);

          // console.log('self.orangeConfig:');
          // console.dir(self.orangeConfig);
          return;
        })
        .catch(function (err) {

          // todo: change by Log
          console.log('Error...');
          console.dir(err);
          return;
        });
    } // _getRoom

    /**
     * Tag
     */

    function _getTag() {
      oTag.query(function (data) {
      })
        .$promise
        .then(function (data) {
          // console.log('!!! Success...');
          // console.dir(data);

          self.orangeConfig.tagList = {};

          if (!_.isArray(data)) throw Error('Error: Tag data is not an array');

          for (var i = 0; i < data.length; i++) {
            if (!_.isArray(self.orangeConfig.tagList[data[i].lang])) self.orangeConfig.tagList[data[i].lang] = [];
            self.orangeConfig.tagList[data[i].lang].push({key: data[i].key, val: data[i].tag})
          }

          // console.log('self.orangeConfig:');
          // console.dir(self.orangeConfig);
          return;
        })
        .catch(function (err) {

          // todo: change by Log
          console.log('Error...');
          console.dir(err);
          return;
        });
    } // _getTag

  }
})();