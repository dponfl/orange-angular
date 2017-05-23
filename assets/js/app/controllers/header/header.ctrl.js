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

    activate();

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


        vm.objList = $rootScope.orangeConfig.objList[$rootScope.lang];
        vm.cityList = $rootScope.orangeConfig.cityList[$rootScope.lang];
        vm.roomList = $rootScope.orangeConfig.roomList[$rootScope.lang];

        $log.info('$rootScope.orangeConfig.objList[$rootScope.lang][0]:');
        $log.info($rootScope.orangeConfig.objList[$rootScope.lang][0]);

        vm.formData.obj = $rootScope.orangeConfig.objList[$rootScope.lang][0];
        vm.formData.city = $rootScope.orangeConfig.cityList[$rootScope.lang][0];
        vm.formData.room = $rootScope.orangeConfig.roomList[$rootScope.lang][0];




        $rootScope.$watch('lang', update);





    ////////////////

    function activate() {
      vm.formData = {};
      vm.busyBook = false;

      vm.activateModal = _activateModal;
      vm.closeModal = _closeModal;
      vm.sendRequestShort = _sendRequestShort;
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
      ];

    } // activate

    function _activateModal(param) {

      // todo: delete
      $log.info('header, _activateModal...');
      $log.info(param);

      switch (param) {
        case 'short':
          shortBookObjectModal.$promise.then(shortBookObjectModal.show);
          break;
        case 'long':
          longBookObjectModal.$promise.then(longBookObjectModal.show);
          break;
      }
    } // _activateModal

    function _closeModal(param) {

      switch (param) {
        case 'short':
          shortBookObjectModal.$promise.then(shortBookObjectModal.hide);
          break;
        case 'long':
          longBookObjectModal.$promise.then(longBookObjectModal.hide);
          break;
      }
    } // _closeModal

    function _sendRequestShort() {

    } // _sendRequestShort

    function _clear() {

      if (vm.busyBook) {
        return;
      }

      vm.formData.obj = $rootScope.orangeConfig.objList[$rootScope.lang][0];
      vm.formData.city = $rootScope.orangeConfig.cityList[$rootScope.lang][0];
      vm.formData.room = $rootScope.orangeConfig.roomList[$rootScope.lang][0];

    } // _clear

    var shortBookObjectModal = $modal({
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

    var longBookObjectModal = $modal({
      scope: $scope,
      templateUrl: '../templates/view/long/longBookObjectModal.html',
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

