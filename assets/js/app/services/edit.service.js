(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .service('EditObjectService', EditObjectService);

  EditObjectService.$inject = ['$rootScope'];

  /* @ngInject */
  function EditObjectService($rootScope) {
    var longObject = {};
    var editLongObject = false;
    var self = {
      setLongObject: _setLongObject,
      getLongObject: _getLongObject,
      setEditLongObject: _setEditLongObject,
      getEditLongObject: _getEditLongObject,
    };

    return self;

    ////////////////

    function _setLongObject(obj) {
      longObject = obj;
    } // _setLongObject

    function _getLongObject() {
      return longObject;
    } // _getLongObject

    function _setEditLongObject(obj) {
      editLongObject = obj;
      $rootScope.admin.long.editObjSelected = true;
    } // _setEditLongObject

    function _getEditLongObject() {
      return editLongObject;
    } // _getEditLongObject

  }

})();

