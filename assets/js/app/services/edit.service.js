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
    var editShortObject = {};
    var editContentHomeObject = {};
    var editContentQAObject = {};
    var editContentServiceObject = {};

    var self = {
      setEditLongObject: _setEditLongObject,
      getEditLongObject: _getEditLongObject,
      convertLongObjectData: _convertLongObjectData,

      setEditSaleObject: _setEditSaleObject,
      getEditSaleObject: _getEditSaleObject,
      convertSaleObjectData: _convertSaleObjectData,

      setEditShortObject: _setEditShortObject,
      getEditShortObject: _getEditShortObject,
      convertShortObjectData: _convertShortObjectData,

      setEditContentHomeObject: _setEditContentHomeObject,
      getEditContentHomeObject: _getEditContentHomeObject,
      convertContentHomeObjectData: _convertContentHomeObjectData,

      setEditContentQAObject: _setEditContentQAObject,
      getEditContentQAObject: _getEditContentQAObject,
      convertContentQAObjectData: _convertContentQAObjectData,

      setEditContentServiceObject: _setEditContentServiceObject,
      getEditContentServiceObject: _getEditContentServiceObject,
      convertContentServiceObjectData: _convertContentServiceObjectData,

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
          address: value.address,
          bathroom: value.bathroom,
          pool: value.pool,
          price: value.price,
          description: value.description,
          info: value.info,
        }
      });

      var newObj = {
        objnumber: obj['en'].objNumber,
        exclusive: ((obj['en'].exclusive) ? 'exclusive' : 'not_exclusive'),
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
          address: value.address,
          bathroom: value.bathroom,
          pool: value.pool,
          price: value.price,
          description: value.description,
          info: value.info,
        }
      });

      var newObj = {
        objnumber: obj['en'].objNumber,
        exclusive: ((obj['en'].exclusive) ? 'exclusive' : 'not_exclusive'),
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


    //======================
    // Short object
    //======================

    function _setEditShortObject(objNumb) {
      var obj = {};
      // Get object from $rootScope using objNumb
      _.forEach($rootScope.short.panelsAllLangsEdit, function (value, key) {

/*
        $log.info('EditObjectService, _setEditShortObject, panelsAllLangsEdit:');
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

      editShortObject = obj;
      $rootScope.admin.short.editObjSelected = true;
      $rootScope.admin.short.editObjEnableButton = false;
    } // _setEditShortObject

    function _getEditShortObject() {
      return editShortObject;
    } // _getEditShortObject

    function _convertShortObjectData(obj) {

      var langContent = [];
      var useCalendarRaw = '';
      var tag = _.concat({key: 'none', val: 'Без тега'},
        $rootScope.orangeConfig.tagList[$rootScope.lang]);

      _.forEach(obj, function (value, key) {
        langContent[key] = {
          address: value.address,
          bathroom: value.bathroom,
          pool: value.pool,
          price: value.price,
          description: value.description,
          info: value.info,
        };

        useCalendarRaw = value.calendar || "[]";
      });

      var newObj = {
        objnumber: obj['en'].objNumber,
        exclusive: ((obj['en'].exclusive) ? 'exclusive' : 'not_exclusive'),
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
        calendar: JSON.parse(useCalendarRaw),
      };

      return newObj;
    } // _convertShortObjectData


    //======================
    // Content home object
    //======================

    function _setEditContentHomeObject() {

      editContentHomeObject = $rootScope.orangeConfig.contentHome;

    } // _setEditContentHomeObject

    function _getEditContentHomeObject() {

      return editContentHomeObject;

    } // _getEditContentHomeObject

    function _convertContentHomeObjectData(obj) {

      var langContent = {};
      var imgCarousel = '';

      _.forEach(obj, function (value, key) {
        langContent[key] = value;
        imgCarousel = value.imgCarousel;
      });

      var newObj = {
        imgCarousel: imgCarousel,
        langContent: langContent,
      };

      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.log('_convertContentHomeObjectData, langContent:');
      console.dir(langContent);
      console.log('_convertContentHomeObjectData, newObj:');
      console.dir(newObj);

      return newObj;
    } // _convertContentHomeObjectData




    //======================
    // Content Q&A object
    //======================

    function _setEditContentQAObject() {

      editContentQAObject = $rootScope.orangeConfig.contentQA;

    } // _setEditContentQAObject

    function _getEditContentQAObject() {

      return editContentQAObject;

    } // _getEditContentQAObject

    function _convertContentQAObjectData(obj) {

      var langContent = {};

      $log.error('_convertContentQAObjectData, obj:');
      $log.info(obj);

      _.forEach(obj, function (value, key) {
        langContent[key] = {};
        langContent[key].title = value.title;
        langContent[key].body = value.body;
      });

      var newObj = {
        langContent: langContent,
      };

      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.log('_convertContentQAObjectData, langContent:');
      console.dir(langContent);
      console.log('_convertContentQAObjectData, newObj:');
      console.dir(newObj);

      return newObj;
    } // _convertContentQAObjectData


    //======================
    // Content Service object
    //======================

    function _setEditContentServiceObject() {

      editContentServiceObject = $rootScope.orangeConfig.contentService;

    } // _setEditContentServiceObject

    function _getEditContentServiceObject() {

      return editContentServiceObject;

    } // _getEditContentQAObject

    function _convertContentServiceObjectData(obj) {

      var langContent = {};

      _.forEach(obj, function (value, key) {
        langContent[key] = {};
        langContent[key].title = value.title;
        langContent[key].body = value.body;
      });

      var newObj = {
        langContent: langContent,
      };

      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.log('_convertContentServiceObjectData, langContent:');
      console.dir(langContent);
      console.log('_convertContentServiceObjectData, newObj:');
      console.dir(newObj);

      return newObj;
    } // _convertContentServiceObjectData





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

