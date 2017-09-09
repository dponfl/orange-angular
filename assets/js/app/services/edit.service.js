(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .service('EditObjectService', EditObjectService);

  EditObjectService.$inject = ['$rootScope', 'lodash', '$log'];

  /* @ngInject */
  function EditObjectService($rootScope, lodash, $log) {
    var _ = lodash;
    var longObject = {};
    var editLongObject = false;
    var self = {
      setEditLongObject: _setEditLongObject,
      getEditLongObject: _getEditLongObject,
      convertObjectData: _convertObjectData,
    };

    return self;

    ////////////////

    function _setEditLongObject(objNumb) {
      var obj = {};
      // Get object from $rootScope using objNumb
      _.forEach($rootScope.long.panelsAllLangs, function (value, key) {

/*
        $log.info('EditObjectService, _setEditLongObject, panelsAllLangs:');
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
    } // _setEditLongObject

    function _getEditLongObject() {
      return editLongObject;
    } // _getEditLongObject

    function _convertObjectData(obj) {
      var newObj = {langContent: []};

      _.forEach(obj, function (value, key) {

        var tag = _.concat({key: 'none', val: 'Без тега'},
          $rootScope.orangeConfig.tagList[key]);

        newObj = _.concat(newObj, {
          objnumber: value.objNumber,
          show: ((value.show == '1') ? 'show' : 'not_show'),
          home: ((value.home == '1') ? 'home' : 'not_home'),
          imgMain: '',
          imgGallery: '',
          maps: '',
          youtube: value.youtube,
          obj: $rootScope.orangeConfig.objList[key][0],
          city: $rootScope.orangeConfig.cityList[key][0],
          room: $rootScope.orangeConfig.roomList[key][0],
          tag: tag[0],
        }) ;

        newObj.langContent[key] = {
          address: value.contentObj.address,
          bathroom: value.contentObj.bathroom,
          pool: value.contentObj.pool,
          price: value.contentObj.price,
          description: value.contentObj.description,
          info: value.contentObj.info,
        }
      });

      return newObj;
    } // _convertObjectData

  }

})();

