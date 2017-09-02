(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('ShortAdminCtrl', ShortAdminCtrl);

  ShortAdminCtrl.$inject = ['ShortService', '$log', '$rootScope', '$scope', '$q',
    'lodash', 'FileUploader'];

  /* @ngInject */
  function ShortAdminCtrl(ShortService, $log, $rootScope, $scope, $q,
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

    vm.langSet = {};

    vm.activeTab = $rootScope.langActiveTab[0];

    vm.formData = {};

    vm.formData.langContent = [];

    let useLang = '';

    for (let i = 0; i < $rootScope.numLang; i++) {

      useLang = $rootScope.langList[i];

      $log.info('i:');
      $log.info(i);
      $log.info('useLang:');
      $log.info(useLang);

      vm.langSet[useLang] = {
        lang: useLang,
        activeTab: $rootScope.langActiveTab[i],
        activeTabTitle: $rootScope.langTitle[i],
      };

      $log.info('vm.langSet[useLang]:');
      console.dir(vm.langSet[useLang]);

      vm.formData.langContent[useLang] = {};
      vm.formData.langContent[useLang].address = '';
      vm.formData.langContent[useLang].bathroom = '';
      vm.formData.langContent[useLang].pool = '';
      vm.formData.langContent[useLang].price = [];

      for (let j = 0; j < 5; j++) {
        vm.formData.langContent[useLang].price[j] = {
          periodStart: '',
          periodEnd: '',
          periodPrice: '',
        };
      }

      vm.formData.langContent[useLang].description = '';
      vm.formData.langContent[useLang].info = '';
    }



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
    vm.formData.maps = '';
    vm.formData.youtube = '';

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
      // console.info('onWhenAddingFileFailed, uploader:', item, filter, options);
    };
    vm.uploader.onAfterAddingFile = function(fileItem) {
      // console.info('onAfterAddingFile, uploader:', fileItem);
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
      // console.info('onBeforeUploadItem', item);
    };
    vm.uploader.onProgressItem = function(fileItem, progress) {
      // console.info('onProgressItem', fileItem, progress);
    };
    vm.uploader.onProgressAll = function(progress) {
      // console.info('onProgressAll', progress);
    };
    vm.uploader.onSuccessItem = function(fileItem, response, status, headers) {
      // console.info('onSuccessItem', fileItem, response, status, headers);
    };
    vm.uploader.onErrorItem = function(fileItem, response, status, headers) {
      // console.info('onErrorItem', fileItem, response, status, headers);
    };
    vm.uploader.onCancelItem = function(fileItem, response, status, headers) {
      // console.info('onCancelItem', fileItem, response, status, headers);
    };
    vm.uploader.onCompleteItem = function(fileItem, response, status, headers) {
      console.info('onCompleteItem, uploader:', fileItem, response, status, headers);
      console.info('Response:');
      console.dir(response);
      vm.formData.imgGallery += (!firstImg ? ';' : '' ) +
        response.files[0].fd.slice(response.files[0].fd.indexOf('img') + 4);
      if (firstImg) {
        firstImg = false;
      }
    };
/*
    vm.uploader.onCompleteAll = function() {
      var deferred = $q.defer();

      console.info('onCompleteAll, uploader:');
      console.info('Queue:');
      console.dir(vm.uploader.queue);

      deferred.resolve({element: 'uploader'});
      return deferred.promise;
    };
*/

/*
    vm.uploader_2.onCompleteAll = function() {
      var deferred = $q.defer();

      console.info('onCompleteAll, uploader_2:');
      console.info('Queue:');
      console.dir(vm.uploader_2.queue);

      deferred.resolve({element: 'uploader_2'});
      return deferred.promise;
    };
*/



    vm.uploaderMain.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
      // console.info('onWhenAddingFileFailed', item, filter, options);
    };
    vm.uploaderMain.onAfterAddingFile = function(fileItem) {
      // console.info('onAfterAddingFile', fileItem);
    };
    vm.uploaderMain.onAfterAddingAll = function(addedFileItems) {
      console.info('onAfterAddingAll, uploaderMain:', addedFileItems);

      vm.uploaderMain.queue.map(function (el) {
        el.formData = [{obj: vm.formData.objnumber + '_long'}];
      });

      vm.uploaderMain_2.queue = _.cloneDeep(vm.uploaderMain.queue);
      vm.uploaderMain_2.queue.map(function (el) {
        el.alias = vm.uploaderMain_2.alias;
        el.url = vm.uploaderMain_2.url;
        el.formData = [{obj: vm.formData.objnumber + '_long'}];
        el.uploader = vm.uploaderMain_2;
      });

    };
    vm.uploaderMain.onBeforeUploadItem = function(item) {
      // console.info('onBeforeUploadItem', item);
    };
    vm.uploaderMain.onProgressItem = function(fileItem, progress) {
      // console.info('onProgressItem', fileItem, progress);
    };
    vm.uploaderMain.onProgressAll = function(progress) {
      // console.info('onProgressAll', progress);
    };
    vm.uploaderMain.onSuccessItem = function(fileItem, response, status, headers) {
      // console.info('onSuccessItem', fileItem, response, status, headers);
    };
    vm.uploaderMain.onErrorItem = function(fileItem, response, status, headers) {
      // console.info('onErrorItem', fileItem, response, status, headers);
    };
    vm.uploaderMain.onCancelItem = function(fileItem, response, status, headers) {
      // console.info('onCancelItem', fileItem, response, status, headers);
    };
    vm.uploaderMain.onCompleteItem = function(fileItem, response, status, headers) {
      console.info('onCompleteItem, uploaderMain:', fileItem, response, status, headers);
      console.info('Response:');
      console.dir(response);
      vm.formData.imgMain = response.files[0].fd.slice(response.files[0].fd.indexOf('img') + 4);
    };
/*
    vm.uploaderMain.onCompleteAll = function(cb) {
      // var deferred = $q.defer();

      console.info('onCompleteAll, uploaderMain:');
      console.info('Queue:');
      console.dir(vm.uploaderMain.queue);

      cb(null, {element: 'uploaderMain'});

      // deferred.resolve({element: 'uploaderMain'});
      // return deferred.promise;
    };
*/

/*
    vm.uploaderMain_2.onCompleteAll = function() {
      var deferred = $q.defer();

      console.info('onCompleteAll, uploaderMain_2:');
      console.info('Queue:');
      console.dir(vm.uploaderMain_2.queue);

      deferred.resolve({element: 'uploaderMain_2'});
      return deferred.promise;
    };
*/

    function _create() {

      $log.info('_create, vm.formData:');
      $log.info(vm.formData);

      async.parallel({
        uploaderMain: function (cb) {
          vm.uploaderMain.uploadAll();
          vm.uploaderMain.onCompleteAll = function() {

            console.info('onCompleteAll, uploaderMain:');
            console.info('Queue:');
            console.dir(vm.uploaderMain.queue);

            cb(null, {element: 'uploaderMain'});
          };
        },
        uploader: function (cb) {
          vm.uploader.uploadAll();
          vm.uploader.onCompleteAll = function() {

            console.info('onCompleteAll, uploader:');
            console.info('Queue:');
            console.dir(vm.uploader.queue);

            cb(null, {element: 'uploader'});
          };
        },
        uploaderMain_2: function (cb) {
          vm.uploaderMain_2.uploadAll();
          vm.uploaderMain_2.onCompleteAll = function() {

            console.info('onCompleteAll, uploaderMain_2:');
            console.info('Queue:');
            console.dir(vm.uploaderMain_2.queue);

            cb(null, {element: 'uploaderMain_2'});
          };
        },
        uploader_2: function (cb) {
          vm.uploader_2.uploadAll();
          vm.uploader_2.onCompleteAll = function() {

            console.info('onCompleteAll, uploader_2:');
            console.info('Queue:');
            console.dir(vm.uploader_2.queue);

            cb(null, {element: 'uploader_2'});
          };
        },
      }, function (err, results) {
        console.log('async.parallel results:');
        console.dir(results);

        _write(vm.formData);
      });



/*
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
          _write(vm.formData);
        })
        .catch(function (err) {
          $log.info('ERROR upload:');
          console.dir(err);
        });
*/

    } // _create
    
    function _convertPrice(price) {
      let res = '';
      price.map(function (elem) {
        
      })
    } // _convertPrice

    function _write(formData) {
      var createResult;

      var createRecords = {};

      $log.info('formData:');
      $log.info(formData);

      let useLang = '';

      for (let i = 0; i < $rootScope.numLang; i++) {

        useLang = $rootScope.langList[i];
        createRecords[useLang] = {};
        createRecords[useLang].lang = useLang;
        createRecords[useLang].objnumber = formData.objnumber;
        createRecords[useLang].show = (formData.show == "show" ? 1 : 0);
        createRecords[useLang].home = (formData.home == "home" ? 1 : 0);
        createRecords[useLang].tag = formData.tag.key;
        createRecords[useLang].obj = formData.obj.key;
        createRecords[useLang].city = formData.city.key;
        createRecords[useLang].room = formData.room.key;
        createRecords[useLang].imggallery = formData.imgGallery;
        createRecords[useLang].imgmain = formData.imgMain;
        createRecords[useLang].address = formData.langContent[useLang].address;
        createRecords[useLang].bathroom = formData.langContent[useLang].bathroom;
        createRecords[useLang].pool = formData.langContent[useLang].pool;
        createRecords[useLang].price = formData.langContent[useLang].price;
        createRecords[useLang].description = formData.langContent[useLang].description;
        createRecords[useLang].info = formData.langContent[useLang].info;
      }

      switch (formData.exclusive) {
        case 'exclusive': createResult = _createRecordExclusive(createRecords); break;
        case 'not_exclusive': createResult = _createRecordShort(createRecords); break;
      }

    } // _write

    function _createRecordExclusive(data) {

    } // _createRecordExclusive

    function _createRecordShort(data) {

      console.log('_createRecordShort, data:');
      console.dir(data);

      var someObj = {};

      // todo: create ShortService.putShortObject and un-comment
/*
      _.forEach(data, function (val, key) {
        someObj['record' + key] = ShortService.putShortObject(val);
      });
*/

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

    } // _createRecordShort

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