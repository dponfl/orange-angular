(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('SaleCreateAdminCtrl', SaleCreateAdminCtrl);

  SaleCreateAdminCtrl.$inject = ['GeneralConfigService', 'SaleService',
    'EditObjectService', '$log', '$rootScope', '$scope', '$q',
    'lodash', 'FileUploader', 'toaster', '$timeout'];

  /* @ngInject */
  function SaleCreateAdminCtrl(GeneralConfigService, SaleService,
                         EditObjectService, $log, $rootScope, $scope, $q,
                         lodash, FileUploader, toaster, $timeout) {
    var vm = this;
    vm.name = 'SaleCreateAdminCtrl';
    var _ = lodash;
    var __=GeneralConfigService;

    var firstImg = true;
    vm.create = _create;
    vm.clear = _clear;

    vm.$onInit = function () {
      vm.summernoteConfig = {
        toolbar: [
          // [groupName, [list of button]]
          ['style', ['bold', 'italic', 'underline', 'clear']],
          ['font', ['strikethrough', 'superscript', 'subscript']],
          ['fontsize', ['fontsize']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['height', ['height']],
          ['insert', ['picture', 'link', 'hr']],
        ],
        popover: {
          image: [
            ['imagesize', ['imageSize100', 'imageSize50', 'imageSize25', 'imageSize10', 'imageSize5']],
            ['float', ['floatLeft', 'floatRight', 'floatNone']],
            ['remove', ['removeMedia']]
          ],
          link: [
            ['link', ['linkDialogShow', 'unlink']]
          ]
        }
      };
    };

    vm.objList = $rootScope.orangeConfig.objList[$rootScope.lang];
    vm.cityList = $rootScope.orangeConfig.cityList[$rootScope.lang];
    vm.roomList = $rootScope.orangeConfig.roomList[$rootScope.lang];
    vm.tagList = _.concat({key: 'none', val: 'Без тега'},
    $rootScope.orangeConfig.tagList[$rootScope.lang]);

    vm.langSet = {};

    vm.activeTab = $rootScope.langActiveTab[0];

    vm.formData = {};

    vm.formData.langContent = [];

    var useLang = '';

    for (var i = 0; i < $rootScope.numLang; i++) {

      useLang = $rootScope.langList[i];

/*
      $log.info('i:');
      $log.info(i);
      $log.info('useLang:');
      $log.info(useLang);
*/

      vm.langSet[useLang] = {
        lang: useLang,
        activeTab: $rootScope.langActiveTab[i],
        activeTabTitle: $rootScope.langTitle[i],
      };

/*
      $log.info('vm.langSet[useLang]:');
      console.dir(vm.langSet[useLang]);
*/

      vm.formData.langContent[useLang] = {};
      vm.formData.langContent[useLang].address = '';
      vm.formData.langContent[useLang].bathroom = '';
      vm.formData.langContent[useLang].pool = '';
      vm.formData.langContent[useLang].price = '';
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

    // CALLBACKS

    vm.uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
      // console.info('onWhenAddingFileFailed, uploader:', item, filter, options);
    };
    vm.uploader.onAfterAddingFile = function(fileItem) {
      // console.info('onAfterAddingFile, uploader:', fileItem);
    };
    vm.uploader.onAfterAddingAll = function(addedFileItems) {
      // console.info(vm.name + ', onAfterAddingAll, uploader:', addedFileItems);

      vm.uploader.queue.map(function (el) {
        el.formData = [{obj: vm.formData.objnumber + '_short'}];
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
      // console.info(vm.name + ', onCompleteItem, uploader:', fileItem, response, status, headers);
      // console.info('Response:');
      // console.dir(response);
      // vm.formData.imgGallery += (!firstImg ? ';' : '' ) +
      //   response.files[0].fd.slice(response.files[0].fd.indexOf('img') + 4);

      vm.formData.imgGallery += (!firstImg ? ';' : '' ) +
        response.url;

      if (firstImg) {
        firstImg = false;
      }
    };

    vm.uploaderMain.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
      // console.info('onWhenAddingFileFailed', item, filter, options);
    };
    vm.uploaderMain.onAfterAddingFile = function(fileItem) {
      // console.info('onAfterAddingFile', fileItem);
    };
    vm.uploaderMain.onAfterAddingAll = function(addedFileItems) {
      // console.info(vm.name + ', onAfterAddingAll, uploaderMain:', addedFileItems);

      vm.uploaderMain.queue.map(function (el) {
        el.formData = [{obj: vm.formData.objnumber + '_sale'}];
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
      // console.info(vm.name + ', onCompleteItem, uploaderMain:', fileItem, response, status, headers);
      // console.info('Response:');
      // console.dir(response);
      // vm.formData.imgMain = response.files[0].fd.slice(response.files[0].fd.indexOf('img') + 4);
      vm.formData.imgMain = response.url;
    };

    function _create() {

      // $log.info(vm.name + ', _create, vm.formData:');
      // $log.info(vm.formData);

      async.parallel({
        uploaderMain: function (cb) {
          vm.uploaderMain.uploadAll();
          vm.uploaderMain.onCompleteAll = function() {

            // console.info(vm.name + ', onCompleteAll, uploaderMain:');
            // console.info('Queue:');
            // console.dir(vm.uploaderMain.queue);

            cb(null, {element: 'uploaderMain'});
          };
        },
        uploader: function (cb) {
          vm.uploader.uploadAll();
          vm.uploader.onCompleteAll = function() {

            // console.info(vm.name + ', onCompleteAll, uploader:');
            // console.info('Queue:');
            // console.dir(vm.uploader.queue);

            cb(null, {element: 'uploader'});
          };
        },
      }, function (err, results) {
        // console.log(vm.name + ', async.parallel results:');
        // console.dir(results);

        _write(vm.formData);
      });
    } // _create

    function _write(formData) {
      var createResult;

      var createRecords = {};

      // $log.info(vm.name + ', _write, formData:');
      // $log.info(formData);

      var useLang = '';

      for (var i = 0; i < $rootScope.numLang; i++) {

        useLang = $rootScope.langList[i];
        createRecords[useLang] = {};
        createRecords[useLang].lang = useLang;
        // createRecords[useLang].deal = 'long_term';
        createRecords[useLang].objnumber = formData.objnumber;
        createRecords[useLang].exclusive = (formData.exclusive == "exclusive" ? 1 : 0);
        createRecords[useLang].show = (formData.show == "show" ? 1 : 0);
        createRecords[useLang].home = (formData.home == "home" ? 1 : 0);
        createRecords[useLang].tag = (formData.tag.key == 'none' ? null : formData.tag.key);
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

        if (formData.youtube) {
          createRecords[useLang].youtube = formData.youtube;
        }

      }

      createResult = _createRecordSale(createRecords);

    } // _write

    function _createRecordSale(data) {

      // $log.info(vm.name + ', _createRecordSale, data:');
      // console.dir(data);

      var someObj = {};

      _.forEach(data, function (val, key) {
        someObj['record' + key] = SaleService.putSaleObject(val);
      });

      $q.all(someObj)
        .then(function (results) {

/*
          $log.warn(vm.name + ', _createRecordSale, results:');
          console.dir(results);
*/

          if (results.recorden.status == 201) {

            $rootScope.admin.sale.updateEditRecords = true;

            toaster.pop({
              type: 'success',
              title: __.t('ADMIN_CREATE_SUCCESS_TITLE'),
              body: __.t('ADMIN_CREATE_SUCCESS_BODY_1'),
              toasterId: '111111',
              showCloseButton: true,
              timeout: 15000,
            });

            _clear();

            return {
              performed: true,
              reason: 'ok',
              data: {
                record: results
              },
            };
          } else {
            // todo: change by Log
            // $log.warn('Error...');
            // $log.error(err);

            toaster.pop({
              type: 'error',
              title: __.t('ADMIN_CREATE_ERROR_TITLE'),
              body: __.t('ADMIN_CREATE_ERROR_BODY_1'),
              toasterId: '111111',
              showCloseButton: true,
              timeout: 15000,
            });

            return {
              performed: false,
              reason: 'error',
              data: {
                error: err,
              },
            };
          }
        })
        .catch(function (err) {
          // todo: change by Log
          // $log.warn('Error...');
          // $log.error(err);

          toaster.pop({
            type: 'error',
            title: __.t('ADMIN_CREATE_ERROR_TITLE'),
            body: __.t('ADMIN_CREATE_ERROR_BODY_1'),
            toasterId: '111111',
            showCloseButton: true,
            timeout: 15000,
          });

          return {
            performed: false,
            reason: 'error',
            data: {
              error: err,
            },
          };
        });

    } // _createRecordSale

    function _clear() {

      vm.formData.obj = vm.objList[0];
      vm.formData.city = vm.cityList[0];
      vm.formData.room = vm.roomList[0];
      vm.formData.tag = vm.tagList[0];
      vm.formData.objnumber = '';
      vm.formData.exclusive = 'not_exclusive';
      vm.formData.show = 'show';
      vm.formData.home = 'not_home';

      for (var i = 0; i < $rootScope.numLang; i++) {

        useLang = $rootScope.langList[i];

        vm.formData.langContent[useLang] = {};
        vm.formData.langContent[useLang].address = '';
        vm.formData.langContent[useLang].bathroom = '';
        vm.formData.langContent[useLang].pool = '';
        vm.formData.langContent[useLang].price = '';
        vm.formData.langContent[useLang].description = '';
        vm.formData.langContent[useLang].info = '';
      }

      vm.uploader.clearQueue();
      vm.uploaderMain.clearQueue();
    } // _clear

  }
})();