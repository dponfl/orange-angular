(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .service('EditObjectService', EditObjectService);

  EditObjectService.$inject = ['$rootScope', 'lodash', '$log'];

  /* @ngInject */
  function EditObjectService($rootScope, lodash, $log) {
    var _ = lodash;

    var editLongObject = {};
    var editSaleObject = {};

    var self = {
      setEditLongObject: _setEditLongObject,
      getEditLongObject: _getEditLongObject,
      convertLongObjectData: _convertLongObjectData,
      setEditSaleObject: _setEditSaleObject,
      getEditSaleObject: _getEditSaleObject,
      convertSaleObjectData: _convertSaleObjectData,
      getIndexByKey: _getIndexByKey,
    };

    return self;

    ////////////////

    //======================
    // Long object
    //======================

    function _setEditLongObject(objNumb) {
      var obj = {};
      // Get object from $rootScope using objNumb
      _.forEach($rootScope.long.panelsAllLangsEdit, function (value, key) {

/*
        $log.info('EditObjectService, _setEditLongObject, panelsAllLangsEdit:');
        $log.info('key:');
        console.dir(key);
        $log.info('value:');
        console.dir(value);
*/

        _.forEach(value, function (v) {
          if (v.objNumber == objNumb) {
            obj[key] = v;
          }
        });
      });

      editLongObject = obj;
      $rootScope.admin.long.editObjSelected = true;
      $rootScope.admin.long.editObjEnableButton = false;
    } // _setEditLongObject

    function _getEditLongObject() {
      return editLongObject;
    } // _getEditLongObject

    function _convertLongObjectData(obj) {

      var langContent = [];
      var tag = _.concat({key: 'none', val: 'Без тега'},
        $rootScope.orangeConfig.tagList[$rootScope.lang]);

      _.forEach(obj, function (value, key) {
        langContent[key] = {
          address: value.contentObj.address.text,
          bathroom: value.contentObj.bathroom.text,
          pool: value.contentObj.pool.text,
          price: value.contentObj.price.text,
          description: value.contentObj.description.text,
          info: value.contentObj.info.text,
        }
      });

      var newObj = {
        objnumber: obj['en'].objNumber,
        show: ((obj['en'].show == '1') ? 'show' : 'not_show'),
        home: ((obj['en'].home == '1') ? 'home' : 'not_home'),
        imgMain: '',
        imgGallery: '',
        maps: '',
        youtube: obj['en'].youtube,
        obj: $rootScope.orangeConfig.objList['en'][_getIndexByKey($rootScope.orangeConfig.objList['en'], obj.en.contentObj.obj.key)],
        city: $rootScope.orangeConfig.cityList['en'][_getIndexByKey($rootScope.orangeConfig.cityList['en'], obj.en.contentObj.city.key)],
        room: $rootScope.orangeConfig.roomList['en'][_getIndexByKey($rootScope.orangeConfig.roomList['en'], obj.en.contentObj.room.key)],
        tag: tag[(_getIndexByKey($rootScope.orangeConfig.tagList['en'], obj.en.type) !== null
          ? _getIndexByKey($rootScope.orangeConfig.tagList['en'], obj.en.type) + 1
          : 0)],
        langContent: langContent,
      };

      return newObj;
    } // _convertLongObjectData

    //======================
    // Sale object
    //======================

    function _setEditSaleObject(objNumb) {
      var obj = {};
      // Get object from $rootScope using objNumb
      _.forEach($rootScope.sale.panelsAllLangsEdit, function (value, key) {

/*
        $log.info('EditObjectService, _setEditSaleObject, panelsAllLangsEdit:');
        $log.info('key:');
        console.dir(key);
        $log.info('value:');
        console.dir(value);
*/

        _.forEach(value, function (v) {
          if (v.objNumber == objNumb) {
            obj[key] = v;
          }
        });
      });

      editSaleObject = obj;
      $rootScope.admin.sale.editObjSelected = true;
      $rootScope.admin.sale.editObjEnableButton = false;
    } // _setEditSaleObject

    function _getEditSaleObject() {
      return editSaleObject;
    } // _getEditSaleObject

    function _convertSaleObjectData(obj) {

      var langContent = [];
      var tag = _.concat({key: 'none', val: 'Без тега'},
        $rootScope.orangeConfig.tagList[$rootScope.lang]);

      _.forEach(obj, function (value, key) {
        langContent[key] = {
          address: value.contentObj.address.text,
          bathroom: value.contentObj.bathroom.text,
          pool: value.contentObj.pool.text,
          price: value.contentObj.price.text,
          description: value.contentObj.description.text,
          info: value.contentObj.info.text,
        }
      });

      var newObj = {
        objnumber: obj['en'].objNumber,
        show: ((obj['en'].show == '1') ? 'show' : 'not_show'),
        home: ((obj['en'].home == '1') ? 'home' : 'not_home'),
        imgMain: '',
        imgGallery: '',
        maps: '',
        youtube: obj['en'].youtube,
        obj: $rootScope.orangeConfig.objList['en'][_getIndexByKey($rootScope.orangeConfig.objList['en'], obj.en.contentObj.obj.key)],
        city: $rootScope.orangeConfig.cityList['en'][_getIndexByKey($rootScope.orangeConfig.cityList['en'], obj.en.contentObj.city.key)],
        room: $rootScope.orangeConfig.roomList['en'][_getIndexByKey($rootScope.orangeConfig.roomList['en'], obj.en.contentObj.room.key)],
        tag: tag[(_getIndexByKey($rootScope.orangeConfig.tagList['en'], obj.en.type) !== null
          ? _getIndexByKey($rootScope.orangeConfig.tagList['en'], obj.en.type) + 1
          : 0)],
        langContent: langContent,
      };

      return newObj;
    } // _convertSaleObjectData

    function _getIndexByKey(arr, findKey) {
      var res = null;

      _.forEach(arr, function (value, key) {
        if (value.key == findKey) {
          res = key;
        }
      });

/*
      $log.warn('_getIndexByKey');
      $log.warn('arr:');
      console.dir(arr);
      $log.warn('findKey:');
      console.dir(findKey);
      $log.warn('res:');
      console.dir(res);
*/

      return res;
    } // _getIndexByKey

  }

})();

