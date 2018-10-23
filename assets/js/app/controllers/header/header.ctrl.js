(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('HeaderCtrl', HeaderCtrl);

  HeaderCtrl.$inject = ['GeneralConfigService', 'S_ReqService', '$rootScope', '$scope', '$modal', '$log',
    'lodash', 'toaster'];

  /* @ngInject */
  function HeaderCtrl(GeneralConfigService, S_ReqService, $rootScope, $scope, $modal, $log,
                      lodash, toaster) {
    var vm = this;
    vm.title = 'HeaderCtrl';
    var _ = lodash;
    var __=GeneralConfigService;

    activate();

/*
    $log.info('$rootScope.orangeConfig:');
    $log.info($rootScope.orangeConfig);
    $log.info('$rootScope.orangeConfig.host:');
    $log.info($rootScope.orangeConfig.host);
    $log.info('$rootScope.orangeConfig.objList:');
    $log.info($rootScope.orangeConfig.objList);
    $log.info('$rootScope.lang:');
    $log.info($rootScope.lang);
    $log.info('keys:');
    $log.info(_.keys($rootScope.orangeConfig));
*/


    vm.objList = $rootScope.orangeConfig.objList[$rootScope.lang];
    vm.cityList = $rootScope.orangeConfig.cityList[$rootScope.lang];
    vm.roomList = $rootScope.orangeConfig.roomList[$rootScope.lang];

    // $log.info('$rootScope.orangeConfig.objList[$rootScope.lang][0]:');
    // $log.info($rootScope.orangeConfig.objList[$rootScope.lang][0]);

    vm.formData.obj = $rootScope.orangeConfig.objList[$rootScope.lang][0];
    vm.formData.city = $rootScope.orangeConfig.cityList[$rootScope.lang][0];
    vm.formData.room = $rootScope.orangeConfig.roomList[$rootScope.lang][0];




    $rootScope.$watch('lang', update);





    ////////////////

    function activate() {
      vm.modalType = '';
      vm.formData = {};
      vm.startDate = new Date();
      vm.startDate.setDate(vm.startDate.getDate() - 1);
      vm.busyBook = false;

      vm.activateModal = _activateModal;
      vm.closeModal = _closeModal;
      vm.sendRequest = _sendRequest;
      vm.clear = _clear;



      vm.navMeny = [
        {
          href: 'home',
          text: 'NAV_HOME',
        },
        {
          href: 'exclusive',
          text: 'NAV_EXCLUSIVE',
        },
        {
          href: 'shortterm',
          text: 'NAV_DAILY',
        },
        {
          href: 'longterm',
          text: 'NAV_LONG_TERM',
        },
        {
          href: 'sale',
          text: 'NAV_SALES',
        },
        {
          href: 'qa',
          text: 'NAV_QA',
        },
        {
          href: 'services',
          text: 'NAV_SERVICES',
        },
        {
          href: 'contacts',
          text: 'NAV_CONTACTS',
        },
      ];

      vm.dropdownMenu = [
        {
          action: 'short',
          text: 'NAV_REQ_DAILY',
        },
        {
          action: 'long',
          text: 'NAV_REQ_LONG_TERM',
        },
        {
          action: 'let',
          text: 'NAV_REQ_LET_PROP',
        },
        {
          action: 'buy',
          text: 'NAV_REQ_BUY_PROP',
        },
        {
          action: 'sell',
          text: 'NAV_REQ_SELL_PROP',
        },
      ];

    } // activate

    function _activateModal(param) {

      // todo: delete
      // $log.info('header, _activateModal...');
      // $log.info(param);

      vm.modalType = param;

      switch (param) {
        case 'short':
          headerSendRequestShortModal.$promise.then(headerSendRequestShortModal.show);
          break;
        case 'long':
          headerSendRequestLongModal.$promise.then(headerSendRequestLongModal.show);
          break;
        case 'let':
          headerSendRequestLetModal.$promise.then(headerSendRequestLetModal.show);
          break;
        case 'buy':
          headerSendRequestBuyModal.$promise.then(headerSendRequestBuyModal.show);
          break;
        case 'sell':
          headerSendRequestSellModal.$promise.then(headerSendRequestSellModal.show);
          break;
        case 'general':
          headerSendRequestGeneralModal.$promise.then(headerSendRequestGeneralModal.show);
          break;
      }
    } // _activateModal

    function _closeModal(param) {

      switch (param) {
        case 'short':
          headerSendRequestShortModal.$promise.then(headerSendRequestShortModal.hide);
          break;
        case 'long':
          headerSendRequestLongModal.$promise.then(headerSendRequestLongModal.hide);
          break;
        case 'let':
          headerSendRequestLetModal.$promise.then(headerSendRequestLetModal.hide);
          break;
        case 'buy':
          headerSendRequestBuyModal.$promise.then(headerSendRequestBuyModal.hide);
          break;
        case 'sell':
          headerSendRequestSellModal.$promise.then(headerSendRequestSellModal.hide);
          break;
        case 'general':
          headerSendRequestGeneralModal.$promise.then(headerSendRequestGeneralModal.hide);
          break;
      }
    } // _closeModal

    function _sendRequest(param) {

      var formDataToSend = vm.formData;

      if (param != 'general') {
        formDataToSend.obj = vm.formData.obj.val;
        formDataToSend.city = vm.formData.city.val;
        formDataToSend.room = vm.formData.room.val;
      } else {
        formDataToSend = _.omit(formDataToSend, ['obj', 'city', 'room']);
      }

      switch (param) {
        case 'short':
          break;
        case 'sell':
          formDataToSend = _.omit(formDataToSend, ['period_start', 'pariod_end']);
          break;
        case 'long':
          formDataToSend = _.omit(formDataToSend, ['pariod_end']);
          break;
        case 'let':
          formDataToSend = _.omit(formDataToSend, ['pariod_end']);
          break;
        case 'buy':
          formDataToSend = _.omit(formDataToSend, ['period_start', 'pariod_end']);
          break;
        case 'general':
          formDataToSend = _.omit(formDataToSend, ['obj', 'city', 'room', 'period_start', 'pariod_end']);
          break;
      }

      vm.busyBook = true;

      formDataToSend.deal_type = param;
      formDataToSend.req_type = 'info';

      S_ReqService.createSReq(formDataToSend, formDataToSend.req_type)
        .then(function (res) {

          /*
           $log.info('S_ReqService, res:');
           $log.info(res);
           */


          if (res.status === 200) {
            vm.busyBook = false;
            toaster.pop({
              type: 'success',
              title: __.t('INFO_SUCCESS_TITLE'),
              body: __.t('INFO_SUCCESS_BODY_1'),
              toasterId: '12345',
              showCloseButton: true,
              timeout: 15000,
            });
          } else {
            vm.busyBook = false;
            toaster.pop({
              type: 'error',
              title: __.t('INFO_ERROR_TITLE'),
              body: __.t('INFO_ERROR_BODY_1') + __.t('INFO_ERROR_BODY_2'),
              toasterId: '12345',
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
      vm.closeModal(vm.modalType);

    } // _sendRequestShort

    function _clear() {

      if (vm.busyBook) {
        return;
      }

      vm.formData.obj = $rootScope.orangeConfig.objList[$rootScope.lang][0];
      vm.formData.city = $rootScope.orangeConfig.cityList[$rootScope.lang][0];
      vm.formData.room = $rootScope.orangeConfig.roomList[$rootScope.lang][0];
      vm.formData.period_start = '';
      vm.formData.pariod_end = '';
      vm.formData.name = '';
      vm.formData.email = '';
      vm.formData.phone = '';
      vm.formData.skype = '';
      vm.formData.whatsapp = '';
      vm.formData.telegram = '';
      vm.formData.viber = '';
      vm.formData.additionalInfo = '';

    } // _clear

    var headerSendRequestShortModal = $modal({
      scope: $scope,
      templateUrl: '../templates/view/header/headerSendRequestShortModal.html',
      show: false,
      backdrop: true,
      onHide: function () {
        $('body').css('overflow', 'auto');
      },
      onShow: function () {
        $('body').css('overflow', 'hidden');
      }
    });

    var headerSendRequestLongModal = $modal({
      scope: $scope,
      templateUrl: '../templates/view/header/headerSendRequestLongModal.html',
      show: false,
      backdrop: true,
      onHide: function () {
        $('body').css('overflow', 'auto');
      },
      onShow: function () {
        $('body').css('overflow', 'hidden');
      }
    });

    var headerSendRequestLetModal = $modal({
      scope: $scope,
      templateUrl: '../templates/view/header/headerSendRequestLetModal.html',
      show: false,
      backdrop: true,
      onHide: function () {
        $('body').css('overflow', 'auto');
      },
      onShow: function () {
        $('body').css('overflow', 'hidden');
      }
    });

    var headerSendRequestBuyModal = $modal({
      scope: $scope,
      templateUrl: '../templates/view/header/headerSendRequestBuyModal.html',
      show: false,
      backdrop: true,
      onHide: function () {
        $('body').css('overflow', 'auto');
      },
      onShow: function () {
        $('body').css('overflow', 'hidden');
      }
    });

    var headerSendRequestSellModal = $modal({
      scope: $scope,
      templateUrl: '../templates/view/header/headerSendRequestSellModal.html',
      show: false,
      backdrop: true,
      onHide: function () {
        $('body').css('overflow', 'auto');
      },
      onShow: function () {
        $('body').css('overflow', 'hidden');
      }
    });

    var headerSendRequestGeneralModal = $modal({
      scope: $scope,
      templateUrl: '../templates/view/header/headerSendRequestGeneralModal.html',
      show: false,
      backdrop: true,
      onHide: function () {
        $('body').css('overflow', 'auto');
      },
      onShow: function () {
        $('body').css('overflow', 'hidden');
      }
    });

    function update () {
      vm.objList = $rootScope.orangeConfig.objList[$rootScope.lang];
      vm.cityList = $rootScope.orangeConfig.cityList[$rootScope.lang];
      vm.roomList = $rootScope.orangeConfig.roomList[$rootScope.lang];
    }


  }

})();

