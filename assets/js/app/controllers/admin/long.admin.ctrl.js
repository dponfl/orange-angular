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

    var firstImg = true;
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
      formData: []
    });

    vm.uploaderMain = new FileUploader({
      alias: 'someimgmain',
      url: '/file/uploadmain',
      formData: []
    });

    vm.uploader_2 = new FileUploader({
      alias: 'someimg2',
      url: '/file/upload2',
      formData: []
    });

    vm.uploaderMain_2 = new FileUploader({
      alias: 'someimgmain2',
      url: '/file/uploadmain2',
      formData: []
    });

    // FILTERS

    vm.uploader.filters.push({
      name: 'imageFilter',
      fn: function(item /*{File|FileLikeObject}*/, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    vm.uploaderMain.filters.push({
      name: 'imageFilter',
      fn: function(item /*{File|FileLikeObject}*/, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    vm.uploader_2.filters.push({
      name: 'imageFilter',
      fn: function(item /*{File|FileLikeObject}*/, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    vm.uploaderMain_2.filters.push({
      name: 'imageFilter',
      fn: function(item /*{File|FileLikeObject}*/, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    // CALLBACKS

    vm.uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
      console.info('onWhenAddingFileFailed, uploader:', item, filter, options);
    };
    vm.uploader.onAfterAddingFile = function(fileItem) {
      console.info('onAfterAddingFile, uploader:', fileItem);
    };
    vm.uploader.onAfterAddingAll = function(addedFileItems) {
      console.info('onAfterAddingAll, uploader:', addedFileItems);

      vm.uploader.queue.map(function (el) {
        el.formData = [{obj: vm.formData.objnumber + '_long'}];
      });

      vm.uploader_2.queue = _.cloneDeep(vm.uploader.queue);
      vm.uploader_2.queue.map(function (el) {
        el.alias = vm.uploader_2.alias;
        el.url = vm.uploader_2.url;
        el.formData = [{obj: vm.formData.objnumber + '_long'}];
        el.uploader = vm.uploader_2;
      });

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
      console.info('Response:');
      console.dir(response);
      vm.formData.imgGallery += (!firstImg ? ';' : '' ) +
        response.files[0].fd.slice(response.files[0].fd.indexOf('img') + 4);
      if (firstImg) {
        firstImg = false;
      }
    };
    vm.uploader.onCompleteAll = function() {
      var deferred = $q.defer();

      console.info('onCompleteAll');
      console.info('Queue:');
      console.dir(vm.uploader.queue);

      deferred.resolve({element: 'uploader'});
      return deferred.promise;
    };

    vm.uploader_2.onCompleteAll = function() {
      var deferred = $q.defer();

      console.info('onCompleteAll (uploader_2)');
      console.info('Queue:');
      console.dir(vm.uploader_2.queue);

      deferred.resolve({element: 'uploader_2'});
      return deferred.promise;
    };



    vm.uploaderMain.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
      console.info('onWhenAddingFileFailed', item, filter, options);
    };
    vm.uploaderMain.onAfterAddingFile = function(fileItem) {
      console.info('onAfterAddingFile', fileItem);
    };
    vm.uploaderMain.onAfterAddingAll = function(addedFileItems) {
      console.info('onAfterAddingAll', addedFileItems);

      vm.uploaderMain.queue.map(function (el) {
        el.formData = [{obj: vm.formData.objnumber + '_long'}];
      });

      vm.uploaderMain_2.queue = _.cloneDeep(vm.uploader.queue);
      vm.uploaderMain_2.queue.map(function (el) {
        el.alias = vm.uploaderMain_2.alias;
        el.url = vm.uploaderMain_2.url;
        el.formData = [{obj: vm.formData.objnumber + '_long'}];
        el.uploader = vm.uploaderMain_2;
      });

    };
    vm.uploaderMain.onBeforeUploadItem = function(item) {
      console.info('onBeforeUploadItem', item);
    };
    vm.uploaderMain.onProgressItem = function(fileItem, progress) {
      console.info('onProgressItem', fileItem, progress);
    };
    vm.uploaderMain.onProgressAll = function(progress) {
      console.info('onProgressAll', progress);
    };
    vm.uploaderMain.onSuccessItem = function(fileItem, response, status, headers) {
      console.info('onSuccessItem', fileItem, response, status, headers);
    };
    vm.uploaderMain.onErrorItem = function(fileItem, response, status, headers) {
      console.info('onErrorItem', fileItem, response, status, headers);
    };
    vm.uploaderMain.onCancelItem = function(fileItem, response, status, headers) {
      console.info('onCancelItem', fileItem, response, status, headers);
    };
    vm.uploaderMain.onCompleteItem = function(fileItem, response, status, headers) {
      console.info('onCompleteItem', fileItem, response, status, headers);
      console.info('Response:');
      console.dir(response);
      vm.formData.imgMain = response.files[0].fd.slice(response.files[0].fd.indexOf('img') + 4);
    };
    vm.uploaderMain.onCompleteAll = function() {
      var deferred = $q.defer();

      console.info('onCompleteAll');
      console.info('Queue:');
      console.dir(vm.uploaderMain.queue);

      deferred.resolve({element: 'uploaderMain'});
      return deferred.promise;
    };

    vm.uploaderMain_2.onCompleteAll = function() {
      var deferred = $q.defer();

      console.info('onCompleteAll (uploaderMain_2)');
      console.info('Queue:');
      console.dir(vm.uploaderMain_2.queue);

      deferred.resolve({element: 'uploaderMain_2'});
      return deferred.promise;
    };

    function _create() {
      vm.uploaderMain.uploadAll();
      vm.uploader.uploadAll();

      vm.uploaderMain_2.uploadAll();
      vm.uploader_2.uploadAll();

      $q.all({
        u: vm.uploader.onCompleteAll(),
        um: vm.uploaderMain.onCompleteAll(),
        u2: vm.uploader_2.onCompleteAll(),
        um2: vm.uploaderMain_2.onCompleteAll(),
      })
        .then(function (results) {
          $log.info('All uploads results:');
          console.dir(results);
          _write();
        })
        .catch(function (err) {
          $log.info('ERROR upload:');
          console.dir(err);
        })
    } // _create

    function _write() {
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
      createRecords['ru'].imggallery = vm.formData.imgGallery;
      createRecords['ru'].imgmain = vm.formData.imgMain;

      createRecords['en'].objnumber = vm.formData.objnumber;
      createRecords['en'].lang = 'en';
      createRecords['en'].show = 1;
      createRecords['en'].home = 1;
      createRecords['en'].city = vm.formData.city.key;
      createRecords['en'].obj = vm.formData.obj.key;
      createRecords['en'].room = vm.formData.room.key;
      createRecords['en'].address = 'Address';
      createRecords['en'].imggallery = vm.formData.imgGallery;
      createRecords['en'].imgmain = vm.formData.imgMain;

      switch (vm.formData.exclusive) {
        case 'exclusive': createResult = _createRecordExclusive(createRecords); break;
        case 'not_exclusive': createResult = _createRecordLong(createRecords); break;
      }

    } // _write

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
      vm.uploader.clearQueue();
      vm.uploaderMain.clearQueue();
      vm.uploader_2.clearQueue();
      vm.uploaderMain_2.clearQueue();
    } // _clear


  }
})();