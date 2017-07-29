(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('LongAdminCtrl', LongAdminCtrl);

  LongAdminCtrl.$inject = ['LongService', '$log', '$rootScope', '$scope', '$q'];

  /* @ngInject */
  function LongAdminCtrl(LongService, $log, $rootScope, $scope, $q) {
    var vm = this;
    vm.create = _create;
    vm.clear = _clear;


    vm.objList = $rootScope.orangeConfig.objList[$rootScope.lang];
    vm.cityList = $rootScope.orangeConfig.cityList[$rootScope.lang];
    vm.roomList = $rootScope.orangeConfig.roomList[$rootScope.lang];

    vm.formData = {};

    vm.formData.obj = $rootScope.orangeConfig.objList[$rootScope.lang][0];
    vm.formData.city = $rootScope.orangeConfig.cityList[$rootScope.lang][0];
    vm.formData.room = $rootScope.orangeConfig.roomList[$rootScope.lang][0];
    vm.formData.objnumber = '';
    vm.formData.exclusive = 'not_exclusive';




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

      vm.formData.obj = $rootScope.orangeConfig.objList[$rootScope.lang][0];
      vm.formData.city = $rootScope.orangeConfig.cityList[$rootScope.lang][0];
      vm.formData.room = $rootScope.orangeConfig.roomList[$rootScope.lang][0];
      vm.formData.objnumber = '';
      vm.formData.exclusive = 'not_exclusive';
    } // _clear
  }
})();