(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('LongAdminCtrl', LongAdminCtrl);

  LongAdminCtrl.$inject = ['LongService', '$log', '$rootScope', '$scope', '$q',
    'lodash', 'FileUploader'];

  /* @ngInject */
  function LongAdminCtrl(LongService, $log, $rootScope, $scope, $q,
                         lodash, FileUploader) {
    var vm = this;
    var _ = lodash;
    vm.create = _create;
    vm.clear = _clear;

    vm.objList = $rootScope.orangeConfig.objList[$rootScope.lang];
    vm.cityList = $rootScope.orangeConfig.cityList[$rootScope.lang];
    vm.roomList = $rootScope.orangeConfig.roomList[$rootScope.lang];
    vm.tagList = _.concat({key: 'none', val: 'Без тега'},
    $rootScope.orangeConfig.tagList[$rootScope.lang]);

    vm.formData = {};

    vm.formData.obj = vm.objList[0];
    vm.formData.city = vm.cityList[0];
    vm.formData.room = vm.roomList[0];
    vm.formData.tag = vm.tagList[0];
    vm.formData.objnumber = '';
    vm.formData.exclusive = 'not_exclusive';
    vm.formData.show = 'show';
    vm.formData.home = 'not_home';
    vm.formData.imgMain = '';
    vm.formData.imgGallery = '';

    vm.uploader = new FileUploader({
      alias: 'someimg',
      url: '/file/upload',
      // formData: []
    });

    // FILTERS

    vm.uploader.filters.push({
      name: 'imageFilter',
      fn: function(item /*{File|FileLikeObject}*/, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    // CALLBACKS

    vm.uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
      console.info('onWhenAddingFileFailed', item, filter, options);
    };
    vm.uploader.onAfterAddingFile = function(fileItem) {
      console.info('onAfterAddingFile', fileItem);
    };
    vm.uploader.onAfterAddingAll = function(addedFileItems) {
      console.info('onAfterAddingAll', addedFileItems);
    };
    vm.uploader.onBeforeUploadItem = function(item) {
      console.info('onBeforeUploadItem', item);
    };
    vm.uploader.onProgressItem = function(fileItem, progress) {
      console.info('onProgressItem', fileItem, progress);
    };
    vm.uploader.onProgressAll = function(progress) {
      console.info('onProgressAll', progress);
    };
    vm.uploader.onSuccessItem = function(fileItem, response, status, headers) {
      console.info('onSuccessItem', fileItem, response, status, headers);
    };
    vm.uploader.onErrorItem = function(fileItem, response, status, headers) {
      console.info('onErrorItem', fileItem, response, status, headers);
    };
    vm.uploader.onCancelItem = function(fileItem, response, status, headers) {
      console.info('onCancelItem', fileItem, response, status, headers);
    };
    vm.uploader.onCompleteItem = function(fileItem, response, status, headers) {
      console.info('onCompleteItem', fileItem, response, status, headers);
    };
    vm.uploader.onCompleteAll = function() {
      console.info('onCompleteAll');
      console.info('Queue:');
      console.dir(vm.uploader.queue);
    };

    function _getObjectNumber() {
      return vm.formData.objnumber;
    } // _getObjectNumber


    function _create() {
      var createResult;
      var createRecords = {
        ru: {},
        en: {}
      };

      $log.info('vm.formData:');
      $log.info(vm.formData);

      createRecords['ru'].objnumber = vm.formData.objnumber;
      createRecords['ru'].lang = 'ru';
      createRecords['ru'].show = 1;
      createRecords['ru'].home = 1;
      createRecords['ru'].city = vm.formData.city.key;
      createRecords['ru'].obj = vm.formData.obj.key;
      createRecords['ru'].room = vm.formData.room.key;
      createRecords['ru'].address = 'Адрес';

      createRecords['en'].objnumber = vm.formData.objnumber;
      createRecords['en'].lang = 'en';
      createRecords['en'].show = 1;
      createRecords['en'].home = 1;
      createRecords['en'].city = vm.formData.city.key;
      createRecords['en'].obj = vm.formData.obj.key;
      createRecords['en'].room = vm.formData.room.key;
      createRecords['en'].address = 'Address';


      switch (vm.formData.exclusive) {
        case 'exclusive': createResult = _createRecordExclusive(createRecords); break;
        case 'not_exclusive': createResult = _createRecordLong(createRecords); break;
      }
    } // _create

    function _createRecordExclusive(data) {

    } // _createRecordExclusive

    function _createRecordLong(data) {
      var someObj = {};

      _.forEach(data, function (val, key) {
        someObj['record' + key] = LongService.putLongObject(val);
      });

      $q.all(someObj)
        .then(function (results) {
          if (results.recorden.status == 201) {
            return {
              performed: true,
              reason: 'ok',
              data: {
                record: results
              },
            };
          }
        })
        .catch(function (err) {
          // todo: change by Log
          $log.warn('Error...');
          $log.error(err);

          return {
            performed: false,
            reason: 'error',
            data: {
              error: err,
            },
          };
        });

    } // _createRecordLong

    function _clear() {

      vm.formData.obj = vm.objList[0];
      vm.formData.city = vm.cityList[0];
      vm.formData.room = vm.roomList[0];
      vm.formData.tag = vm.tagList[0];
      vm.formData.objnumber = '';
      vm.formData.exclusive = 'not_exclusive';
      vm.formData.show = 'show';
      vm.formData.home = 'not_home';
    } // _clear


  }
})();