(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('ContentHomeAdminCtrl', ContentHomeAdminCtrl);

  ContentHomeAdminCtrl.$inject = ['GeneralConfigService', 'ContentService',
    'EditObjectService', '$log', '$rootScope', '$scope', '$q',
    'lodash', 'FileUploader', 'toaster', '$timeout', '$http'];

  /* @ngInject */
  function ContentHomeAdminCtrl(GeneralConfigService, ContentService,
                              EditObjectService, $log, $rootScope, $scope, $q,
                              lodash, FileUploader, toaster, $timeout, $http) {
    var vm = this;
    var name = 'ContentHomeAdminCtrl';
    var _ = lodash;
    var __=GeneralConfigService;

    // var firstImg = true;
    vm.update = _update;
    vm.clear = _clear;
    vm.cancel = _cancel;
    vm.deleteInterval = _deleteInterval;
    vm.addInterval = _addInterval;

    vm.uploader = new FileUploader({
      alias: 'someimg',
      url: '/file/upload',
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
        el.formData = [{obj: 'home_carousel'}];
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
      // vm.formData.imgGallery += (vm.formData.imgGallery.length > 0 ? ';' : '' ) +
      //   response.files[0].fd.slice(response.files[0].fd.indexOf('img') + 4);

      vm.formData.imgCarousel += (vm.formData.imgCarousel.length > 0 ? ';' : '' ) +
        response.url;

      /*
       if (firstImg) {
       firstImg = false;
       }
       */
    };


     vm.$onInit = function () {
       _setDataInInitialState();

       $log.warn(name + ', <<<<<< vm.formData after _setDataInInitialState() >>>>>>>');
       console.dir(vm.formData);
     };

    function _setDataInInitialState() {

      vm.langSet = {};

      vm.activeTab = $rootScope.langActiveTab[0];

      vm.formData = {};

      // vm.formData.langContent = [];

      var obj = EditObjectService.getEditContentHomeObject();

      $log.warn(name + ', <<<<<< obj >>>>>>>');
      console.dir(obj);

      vm.formData = EditObjectService.convertContentHomeObjectData(obj);

      $log.warn(name + ', <<<<<< vm.formData >>>>>>>');
      console.dir(vm.formData);

      _loadGallery(obj);

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

        vm.formData.langContent[useLang] = $rootScope.orangeConfig.contentHome[useLang];
      }

      vm.formData.imgCarousel = '';
    } // _setDataInInitialState

    function _update() {

      $log.info(name + ', _update, vm.formData:');
      $log.info(vm.formData);

      _delete_by_tag('home_carousel');

      async.parallel({
        uploader: function (cb) {
          vm.uploader.uploadAll();
          vm.uploader.onCompleteAll = function() {

            console.info('onCompleteAll, uploader:');
            console.info('Queue:');
            console.dir(vm.uploader.queue);

            cb(null, {element: 'uploader'});
          };
        },
      }, function (err, results) {
        console.log('async.parallel results:');
        console.dir(results);

        _write(vm.formData);
      });
    } // _update

    function _write(formData) {
      var createResult;

      var createRecords = {};

      $log.info(name + ', _write, formData:');
      $log.info(formData);

      var useLang = '';
      var useLangContent = '';



      for (var i = 0; i < $rootScope.numLang; i++) {

        useLang = $rootScope.langList[i];
        createRecords[useLang] = {};
        createRecords[useLang].lang = useLang;

        if (
          !_.isNil(formData.langContent)
          && _.isArray(formData.langContent[useLang])
          && formData.langContent[useLang].length > 0
        ) {

          useLangContent = JSON.stringify(formData.langContent[useLang]);
        }


        createRecords[useLang].content = useLangContent;
        createRecords[useLang].imgcarousel = formData.imgCarousel;

      }

      createResult = _updateRecordContent({
        content_type: 'home',
        record: createRecords,
      });

      console.log(name + ', _write, createResult:');
      console.dir(createResult);

    } // _write

    function _updateRecordContent(data) {

      console.log('_updateRecordContent, data:');
      console.dir(data);

      var someObj = {};

      _.forEach(data.record, function (val, key) {
        someObj['record_' + key] = ContentService.updateContentObject({
          content_type: data.content_type,
          record: val,
        });
      });

      $q.all(someObj)
        .then(function (results) {

          $log.warn(name + ', _updateRecordContent, results:');
          console.dir(results);

          if (results.record_en.status == 200) {

            for (var i = 0; i < $rootScope.numLang; i++) {

              var useLang = $rootScope.langList[i];

              $rootScope.orangeConfig.contentHome[useLang][0].imgCarousel = results.record_en.data.en[0].imgcarousel;
            }

            _clear();
            _setDataInInitialState();

            toaster.pop({
              type: 'success',
              title: __.t('ADMIN_CREATE_SUCCESS_TITLE'),
              body: __.t('ADMIN_CREATE_SUCCESS_BODY_1'),
              toasterId: '111111',
              showCloseButton: true,
              timeout: 15000,
            });


            return {
              performed: true,
              reason: 'ok',
              data: {
                record: results
              },
            };
          } else {
            // todo: change by Log
            $log.warn(name + ', Error...');
            $log.error(err);

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
          $log.warn(name + ', Error...');
          $log.error(err);

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

    } // _updateRecordContent

    function _clear() {

      var useLang = '';

      /*
       $log.info(name + ', !!!!!!!!! $rootScope.admin.short.formData:');
       console.dir($rootScope.admin.short.formData);
       console.dir(vm);
       */

      /*
       vm.formData.obj = vm.objList[0];
       vm.formData.city = vm.cityList[0];
       vm.formData.room = vm.roomList[0];
       vm.formData.tag = vm.tagList[0];
       */
      vm.formData = {};


      // for (var i = 0; i < $rootScope.numLang; i++) {
      //
      //   useLang = $rootScope.langList[i];
      //
      //   vm.formData.langContent[useLang] = {};
      //   vm.formData.langContent[useLang].address = '';
      //   vm.formData.langContent[useLang].bathroom = '';
      //   vm.formData.langContent[useLang].pool = '';
      //   vm.formData.langContent[useLang].price = '';
      //   vm.formData.langContent[useLang].description = '';
      //   vm.formData.langContent[useLang].info = '';
      // }

      vm.uploader.clearQueue();
    } // _clear

    function _cancel() {
      // _clear();
      _setDataInInitialState();
      $rootScope.admin.short.editPanelShow = false;
      $rootScope.admin.short.editObjEnableButton = true;
    } // _cancel

    function _deleteInterval(ind) {
      vm.formData.calendar.splice(ind, 1);
    } // _deleteInterval

    function _addInterval() {
      var tempCalendar = vm.formData.calendar;

      // console.log('calendar before sort:');
      // console.dir(tempCalendar);

      if (
        vm.formData.calendar.length > 0
        && !_.isNil(vm.formData.calendar[vm.formData.calendar.length - 1])
        && _.trim(vm.formData.calendar[vm.formData.calendar.length - 1].start) != ''
      ) {
        vm.formData.calendar = _.sortBy(tempCalendar, [function (o) {
          return o.start;
        }]);
      }


      // console.log('calendar after sort:');
      // console.dir(vm.formData.calendar);

      if (
        vm.formData.calendar.length > 0
        && !_.isNil(vm.formData.calendar[vm.formData.calendar.length - 1])
        && _.trim(vm.formData.calendar[vm.formData.calendar.length - 1].start) != ''
      ) {
        vm.formData.calendar.push({start: '', end: ''});
      } else if (vm.formData.calendar.length == 0) {
        vm.formData.calendar.push({start: '', end: ''});
      }
    } // _addInterval


    // Load gallery images to file uploader queue
    function _loadGallery(obj) {

      $log.info(name + ', _loadGallery...');

      var url = '';
      var getConf = {
        responseType:'blob'
      };



      // Carousel images

      var imgNum = 0;

      // todo: try to replace forEach by for in order to keep the pics order

      _.forEach(obj.en[0].imgCarousel.replace(/^\s+|\s+$/gm,'').split(';'), function (elem) {
        url = elem;
        $http.get(url, getConf)
          .then(function (response) {
            // success
            $log.info(name + ', <<< Gallery images, Success response >>>');
            console.dir(response);

            var imgName = 'none';
            var imgNameOld = 'none';
            var imgUrl = response.config.url;
            var imgSize = response.data.size;
            var imgType = response.data.type;

            if (imgUrl.indexOf($rootScope.imgFileNameElement)) {
              imgNameOld = imgUrl.slice(imgUrl.indexOf($rootScope.imgFileNameElement) +
                $rootScope.imgFileNameElement.length + 2);

              $log.info('imgNameOld: ' + imgNameOld);

              imgName = 'carousel_' + imgNum;
              imgNum++;
            }

            var imgFile = new File(
              [response.data],
              imgName,
              {
                size: imgSize,
                type: imgType
              }
            );

            /*
             test01 = vm.uploader.isFile(imgFile);
             test02 = vm.uploader.isFileLikeObject(imgFile);

             $log.warn(name + ', imgFile check results:');
             console.log('isFile: ' + test01);
             console.log('isFileLikeObject: ' + test02);
             */

            vm.uploader.addToQueue(imgFile);

          }, function (response) {
            // error
            $log.error(name + ', <<< Gallery images, Error response >>>');
            console.dir(response);
          });
      });

    } // _loadGallery

    function _delete_by_tag(tag) {
      console.log('_delete_by_tag, tag: ' + tag);

      var reqObj = {
        tag: tag,
      };

      $http.post($rootScope.orangeConfig.host + '/file/destroy', reqObj)
        .then(successCb, errorCb);

      function successCb(data) {
        $log.info('ContentHomeAdminCtrl::_delete_by_tag, successCb, data:');
        $log.info(data);


      } // successCb

      function errorCb(err) {
        $log.info('ContentHomeAdminCtrl::_delete_by_tag, errorCb, data:');
        $log.info(err);


      } // errorCb
    } // _delete_by_tag

  }
})();