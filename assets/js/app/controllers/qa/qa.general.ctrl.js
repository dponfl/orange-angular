"use strict";

(function () {
  angular.module('OrangeClient')
    .controller('QAGeneralCtrl',QAGeneralCtrl);

  QAGeneralCtrl.$inject = ['$rootScope', '$log'];
  function QAGeneralCtrl($rootScope, $log) {

    var vm = this;

    vm.useLang = $rootScope.lang;
    vm.home = {};

    _update();

    $rootScope.$watch('lang', _update);

    function _update() {

      vm.useLang = $rootScope.lang;

      vm.qa = {
        title: $rootScope.orangeConfig.contentQA[vm.useLang].title || '',
        body: $rootScope.orangeConfig.contentQA[vm.useLang].body || [],
      };

      // $log.info("QAGeneralCtrl, vm.qa:");
      // $log.info(vm.qa);

    } // _update

  } // QAGeneralCtrl
})();