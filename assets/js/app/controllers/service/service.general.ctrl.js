"use strict";

(function () {
  angular.module('OrangeClient')
    .controller('ServiceGeneralCtrl',ServiceGeneralCtrl);

  ServiceGeneralCtrl.$inject = ['$rootScope', '$log'];
  function ServiceGeneralCtrl($rootScope, $log) {

    var vm = this;

    vm.useLang = $rootScope.lang;
    vm.home = {};

    _update();

    $rootScope.$watch('lang', _update);

    function _update() {

      vm.useLang = $rootScope.lang;

      vm.service = {
        title: $rootScope.orangeConfig.contentService[vm.useLang].title || '',
        body: $rootScope.orangeConfig.contentService[vm.useLang].body || [],
      };

      // $log.info("ServiceGeneralCtrl, vm.qa:");
      // $log.info(vm.service);

    } // _update

  } // ServiceGeneralCtrl
})();