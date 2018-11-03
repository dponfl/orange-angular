(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('ContentServiceAdminCtrl', ContentServiceAdminCtrl);

  ContentServiceAdminCtrl.$inject = ['GeneralConfigService', 'ContentService',
    'EditObjectService', '$log', '$rootScope', '$scope', '$q',
    'lodash', 'FileUploader', 'toaster', '$timeout', '$http'];

  /* @ngInject */
  function ContentServiceAdminCtrl(GeneralConfigService, ContentService,
                              EditObjectService, $log, $rootScope, $scope, $q,
                              lodash, FileUploader, toaster, $timeout, $http) {
    var vm = this;
    var name = 'ContentServiceAdminCtrl';
    var _ = lodash;
    var __=GeneralConfigService;

    var initiated = false;
    vm.update = _update;
    vm.clear = _clear;
    vm.cancel = _cancel;
    vm.deleteElement = _deleteElement;
    vm.addElement = _addElement;

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

       if (!initiated) {
         _setDataInInitialState();
         initiated = true;

         // $log.warn(name + ', <<<<<< vm.formData after _setDataInInitialState() >>>>>>>');
         // console.dir(vm.formData);

       }
     };

    function _setDataInInitialState() {

      vm.langSet = {};

      vm.activeTab = $rootScope.langActiveTab[0];

      vm.formData = {};

      // vm.formData.langContent = [];

      var obj = EditObjectService.getEditContentServiceObject();

      // $log.warn(name + ', <<<<<< obj >>>>>>>');
      // console.dir(obj);

      vm.formData = EditObjectService.convertContentServiceObjectData(obj);

      // $log.warn(name + ', <<<<<< vm.formData >>>>>>>');
      // console.dir(vm.formData);

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

        vm.formData.langContent[useLang] = $rootScope.orangeConfig.contentService[useLang];
      }

    } // _setDataInInitialState

    function _update() {

      // $log.info(name + ', _update, vm.formData:');
      // $log.info(vm.formData);

      _write(vm.formData);

    } // _update

    function _write(formData) {
      var createResult;

      var createRecords = {};

      // $log.info(name + ', _write, formData:');
      // $log.info(formData);

      var useLang = '';
      var useLangContent = '';



      for (var i = 0; i < $rootScope.numLang; i++) {

        useLang = $rootScope.langList[i];
        createRecords[useLang] = {};
        createRecords[useLang].lang = useLang;

        if (
          !_.isNil(formData.langContent)
          && !_.isNil(formData.langContent[useLang].title)
          && formData.langContent[useLang].title != ''
          && !_.isNil(formData.langContent[useLang].body)
        ) {

          useLangContent = JSON.stringify(formData.langContent[useLang]);
        }


        createRecords[useLang].content = useLangContent;

      }



      createResult = _updateRecordContent({
        content_type: 'service',
        record: createRecords,
      });

      // console.log(name + ', _write, createResult:');
      // console.dir(createResult);

    } // _write

    function _updateRecordContent(data) {

      // console.log('_updateRecordContent, data:');
      // console.dir(data);

      var someObj = {};

      _.forEach(data.record, function (val, key) {
        someObj['record_' + key] = ContentService.updateContentObject({
          content_type: data.content_type,
          record: val,
        });
      });

      $q.all(someObj)
        .then(function (results) {

          // $log.warn(name + ', _updateRecordContent, results:');
          // console.dir(results);

          if (results.record_en.status == 200) {

            _clear();
            _setDataInInitialState();

            toaster.pop({
              type: 'success',
              title: __.t('ADMIN_SERVICE_SUCCESS_TITLE'),
              body: __.t('ADMIN_SERVICE_SUCCESS_BODY_1'),
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
            // $log.warn(name + ', Error...');
            // $log.error(err);

            toaster.pop({
              type: 'error',
              title: __.t('ADMIN_SERVICE_ERROR_TITLE'),
              body: __.t('ADMIN_SERVICE_ERROR_BODY_1'),
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
          // $log.warn(name + ', Error...');
          // $log.error(err);

          toaster.pop({
            type: 'error',
            title: __.t('ADMIN_SERVICE_ERROR_TITLE'),
            body: __.t('ADMIN_SERVICE_ERROR_BODY_1'),
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
      vm.formData = {};
    } // _clear

    function _cancel() {
      _setDataInInitialState();
    } // _cancel

    function _deleteElement(ind, useLang) {
      vm.formData.langContent[useLang].body.splice(ind, 1);
    } // _deleteElement

    function _addElement(ind, useLang) {

      // $log.info('_addElement, useLang:' + useLang);

      vm.formData.langContent[useLang].body.splice(ind + 1, 0, {name: '', subname: '', desc: ''});

    } // _addElement

  }
})();