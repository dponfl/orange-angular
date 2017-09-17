"use strict";

const _ = require('lodash');

module.exports = {
  loadConfig: function (req, res) {

    console.log('<== ConfigController.js:loadConfig ==>');

    var cityPromise = City.find()
      .then(function (data) {

/*
        console.log('City, data:');
        console.log(data);
*/

        var cityConfig = [];
        cityConfig.cityList = {};

        if (!_.isArray(data)) {
          // todo: Log error message and get data from Sails config
          console.log('Cities data is not an array');
        }

        data.map(_mapCityData, cityConfig);

/*
        console.log('City, cityConfig:');
        console.log(cityConfig);
*/


/*
        console.log('City, cityConfig.cityList:');
        console.log(cityConfig.cityList);
*/


        _excludeEmptyElem(cityConfig.cityList);

/*
        console.log('City, cityConfig.cityList after _excludeEmptyElem:');
        console.log(cityConfig.cityList);
*/


        return {cityList: cityConfig.cityList};
      });

    var objPromise = Obj.find()
      .then(function (data) {

        var objConfig = [];
        objConfig.objList = {};

        if (!_.isArray(data)) {
          // todo: Log error message and get data from Sails config
          console.log('Obj data is not an array');
        }

        data.map(_mapObjData, objConfig);

        _excludeEmptyElem(objConfig.objList);

        return {objList: objConfig.objList};
      });

    var dealPromise = Deal.find()
      .then(function (data) {

        var dealConfig = [];
        dealConfig.dealList = {};

        if (!_.isArray(data)) {
          // todo: Log error message and get data from Sails config
          console.log('Deal data is not an array');
        }

        data.map(_mapDealData, dealConfig);

        _excludeEmptyElem(dealConfig.dealList);

        return {dealList: dealConfig.dealList};
      });

    var roomPromise = Room.find()
      .then(function (data) {

        var roomConfig = [];
        roomConfig.roomList = {};

        if (!_.isArray(data)) {
          // todo: Log error message and get data from Sails config
          console.log('Room data is not an array');
        }

        data.map(_mapRoomData, roomConfig);

        _excludeEmptyElem(roomConfig.roomList);

        return {roomList: roomConfig.roomList};
      });

    var tagPromise = Tag.find()
      .then(function (data) {

        var tagConfig = [];
        tagConfig.tagList = {};

        if (!_.isArray(data)) {
          // todo: Log error message and get data from Sails config
          console.log('Tag data is not an array');
        }

        data.map(_mapTagData, tagConfig);

        _excludeEmptyElem(tagConfig.tagList);

        return {tagList: tagConfig.tagList};
      });

    var getHost = function () {
      // todo: change by setting using Sails config
      return {host: 'http://localhost:1337'};
    };

    var getToken = function () {
      return {token: '123'};
    }; // getToken

    Promise.all([cityPromise, objPromise, dealPromise, roomPromise, tagPromise,
      getHost(), getToken()])
      .then(function (data) {

        var result = {};

        _.forEach(data, function (value) {
          _.forEach(value, function (val, key) {
            result[key] = val;
          });
        });

        result['showList'] = {
          en: [
            {
              key: 'any',
              val: 'Any',
            },
            {
              key: 'show',
              val: 'Show',
            },
            {
              key: 'not_show',
              val: 'Do not show',
            },
          ],
          ru: [
            {
              key: 'any',
              val: 'Любой',
            },
            {
              key: 'show',
              val: 'Показывать',
            },
            {
              key: 'not_show',
              val: 'Не показывать',
            },
          ],
        };

        result['homeList'] = {
          en: [
            {
              key: 'any',
              val: 'Any',
            },
            {
              key: 'home',
              val: 'Place at home',
            },
            {
              key: 'not_home',
              val: 'Do not place at home',
            },
          ],
          ru: [
            {
              key: 'any',
              val: 'Любой',
            },
            {
              key: 'home',
              val: 'Размещать',
            },
            {
              key: 'not_home',
              val: 'Не размещать',
            },
          ],
        };

        console.log('loadConfig, result:');
        console.dir(result);

        return res.ok({result: 'ok', data: result, token: '123'});
      }, function (reason) {
        console.log('Promise.all error, reason:');
        console.dir(reason);
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

    /**
     * City
     */

    function _mapCityData(elem) {

/*
      console.log('_mapCityData');
      console.log('this:');
      console.log(this);
*/

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
     * Object
     */

    function _mapObjData(elem) {
      if (!_.isArray(this.objList[elem.lang]))
        this.objList[elem.lang] = [];
      if (elem.show == 0) {
        this.objList[elem.lang][elem.order] = -1;
      } else {
        this.objList[elem.lang][elem.order] = {};
        this.objList[elem.lang][elem.order]['key'] = elem.key;
        this.objList[elem.lang][elem.order]['val'] = elem.obj;
      }

    } // _mapObjData

    /**
     * Deal
     */

    function _mapDealData(elem) {
      if (!_.isArray(this.dealList[elem.lang]))
        this.dealList[elem.lang] = [];
      if (elem.show == 0) {
        this.dealList[elem.lang][elem.order] = -1;
      } else {
        this.dealList[elem.lang][elem.order] = {};
        this.dealList[elem.lang][elem.order]['key'] = elem.key;
        this.dealList[elem.lang][elem.order]['val'] = elem.deal;
      }

    } // _mapDealData

    /**
     * Room
     */

    function _mapRoomData(elem) {
      if (!_.isArray(this.roomList[elem.lang]))
        this.roomList[elem.lang] = [];
      if (elem.show == 0) {
        this.roomList[elem.lang][elem.order] = -1;
      } else {
        this.roomList[elem.lang][elem.order] = {};
        this.roomList[elem.lang][elem.order]['key'] = elem.key;
        this.roomList[elem.lang][elem.order]['val'] = elem.room;
      }

    } // _mapRoomData

    /**
     * Tag
     */

    function _mapTagData(elem) {
      if (!_.isArray(this.tagList[elem.lang])) {
        this.tagList[elem.lang] = [];
      }

      this.tagList[elem.lang].push({key: elem.key, val: elem.tag})
    } // _mapTagData



  },
};