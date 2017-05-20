(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('ExclusiveLongPanelCtrl', ExclusiveLongPanelCtrl);

  ExclusiveLongPanelCtrl.$inject = ['GeneralConfigService', 'S_ReqService', '$rootScope', '$scope', '$modal', '$log',
    'lodash', 'toaster'];

  /* @ngInject */
  function ExclusiveLongPanelCtrl(GeneralConfigService, S_ReqService, $rootScope, $scope, $modal, $log,
                         lodash, toaster) {
    var _ = lodash;
    var __=GeneralConfigService;
    var vm = this;
    vm.title = 'ExclusiveLongPanelCtrl';
    vm.badge = false;

    var exclusiveLongBookObjectModal = $modal({
      scope: $scope,
      templateUrl: '../templates/view/exclusive/exclusiveLongBookObjectModal.html',
      show: false,
      backdrop: true,
      onHide: function () {
        $('body').css('overflow', 'auto');
      },
      onShow: function () {
        $('body').css('overflow', 'hidden');
      }
    });

    this.$onInit = function () {
/*
      $log.info('$onInit');
      $log.info('$scope:');
      $log.debug($scope);
      $log.info('vm.panel');
      $log.debug(vm.panel);
      $log.info('vm.formData');
      $log.debug(vm.formData);
*/
    };

    activate();

    ////////////////

    function activate() {

      vm.formData = {};
      vm.busyBook = false;
      vm.objectInfo = '';

      vm.showBookObject = _showBookObject;
      vm.hideBookObject = _hideBookObject;
      vm.book = _book;
      vm.clear = _clear;
    } // activate()

    /**
     * Book Object modal
     * @private
     */

    function _showBookObject() {
      var city = '';
      var address = '';

      _.forEach(vm.panel.content, function (value) {
        _.forEach(value, function (val) {
          if (val.key === 'city') {
            city = val.text;
          }

          if (val.key === 'address') {
            address = val.text;
          }
        });
      });

      vm.objectInfo = '#' + vm.panel.objNumber + ', ' + city + ', ' + address;

      exclusiveLongBookObjectModal.$promise.then(exclusiveLongBookObjectModal.show);
    }

    function _hideBookObject() {
      exclusiveLongBookObjectModal.$promise.then(exclusiveLongBookObjectModal.hide);
    }

    function _book() {
      $log.info('exclusive long _book() activated...');

      vm.busyBook = true;

      // $log.info('_book() activated...');
/*
      $log.info('$scope:');
      $log.info($scope);
      $log.info('vm.panel');
      $log.info(vm.panel);
*/
      vm.formData.objnumber = vm.panel.objNumber;
      vm.formData.deal_type = 'exclusive_long';
      vm.formData.req_type = 'booking';

/*
      $log.info('vm.formData');
      $log.info(vm.formData);
*/

      S_ReqService.createSReq(vm.formData)
        .then(function (res) {

/*
          $log.info('S_ReqService, res:');
          $log.info(res);
*/


          if (res.status === 200) {
            vm.busyBook = false;
            toaster.pop({
              type: 'success',
              title: __.t('BOOKING_SUCCESS_TITLE'),
              body: __.t('BOOKING_SUCCESS_BODY_1') + vm.objectInfo +
              __.t('BOOKING_SUCCESS_BODY_2'),
              toasterId: vm.formData.objnumber,
              showCloseButton: true,
              timeout: 15000,
            });
          } else {
            vm.busyBook = false;
            toaster.pop({
              type: 'error',
              title: __.t('BOOKING_ERROR_TITLE'),
              body: __.t('BOOKING_ERROR_BODY_1') + vm.objectInfo +
              __.t('BOOKING_ERROR_BODY_2'),
              toasterId: vm.formData.objnumber,
              showCloseButton: true,
              timeout: 15000,
            });
          }
        });

/*
      setTimeout(function () {
        vm.busyBook = false;
        vm.hideBookObject();
      }, 3000);
*/

      vm.busyBook = false;
      vm.hideBookObject();

      // vm.hideBookObject();
    } // _book

    function _clear() {
      $log.info('exclusive long _clear() activated...');
      vm.formData.period_start = '';
      vm.formData.name = '';
      vm.formData.email = '';
      vm.formData.phone = '';
      vm.formData.skype = '';
      vm.formData.whatsapp = '';
      vm.formData.telegram = '';
      vm.formData.viber = '';
      vm.formData.additionalInfo = '';
    } // _clear

  }

})();

