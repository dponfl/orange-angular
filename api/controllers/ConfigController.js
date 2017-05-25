"use strict";

const _ = require('lodash');

module.exports = {
  loadConfig: function (req, res) {

    console.log('<== ConfigController.js:loadConfig ==>');

    var cityPromise = City.find()
      .then(function (data) {

        console.log('City, data:');
        console.log(data);

        var oConfig = [];
        oConfig.cityList = {};

        if (!_.isArray(data)) {
          // todo: Log error message and get data from Sails config
          console.log('Cities data is not an array');
        }

        data.map(_mapCityData, oConfig);

        console.log('City, oConfig:');
        console.log(oConfig);


        console.log('City, oConfig.cityList:');
        console.log(oConfig.cityList);


        _excludeEmptyElem(oConfig.cityList);

        console.log('City, oConfig.cityList after _excludeEmptyElem:');
        console.log(oConfig.cityList);


        return {cityList: oConfig.cityList};
      });

    var objPromise = Obj.find()
      .then(function (data) {
        // console.log('Obj, data:');
        // console.log(data);
        return {obj: data};
      });

    var dealPromise = Deal.find()
      .then(function (data) {
        // console.log('Deal, data:');
        // console.log(data);
        return {deal: data};
      });

    var getHost = function () {
      // todo: change by setting using Sails config
      return {host: 'http://localhost:1337'};
    };

    Promise.all([cityPromise, objPromise, dealPromise, getHost()])
      .then(function (result) {

        console.log('loadConfig, result:');
        console.log(result);

        return res.ok({result: 'ok', data: result});
      }, function (reason) {
        console.log('Promise.all error, reason:');
        console.log(reason);
      });

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

    function test() {
      console.log('test function');
    }

    /**
     * City
     */

    function _mapCityData(elem) {
      console.log('_mapCityData');
      console.log('this:');
      console.log(this);
      if (!_.isArray(this.cityList[elem.lang]))
        this.cityList[elem.lang] = [];
      if (elem.show == 0) {
        this.cityList[elem.lang][elem.order] = -1;
      } else {
        this.cityList[elem.lang][elem.order] = {};
        this.cityList[elem.lang][elem.order]['key'] = elem.key;
        this.cityList[elem.lang][elem.order]['val'] = elem.city;
      }

    } // _mapCityData

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



  },
};