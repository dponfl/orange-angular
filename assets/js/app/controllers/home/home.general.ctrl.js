"use strict";

(function () {
  angular.module('OrangeClient')
    .controller('HomeGeneralCtrl',HomeGeneralCtrl);

  HomeGeneralCtrl.$inject = ['$rootScope', '$sce'];
  function HomeGeneralCtrl($rootScope, $sce) {

    var vm = this;

    vm.useLang = $rootScope.lang;
    vm.home = {};

    _update();

    $rootScope.$watch('lang', _update);

    function _update() {

      vm.useLang = $rootScope.lang;

      vm.home = {
        home_title: $rootScope.orangeConfig.contentHome[vm.useLang][0].home_title || '',
        home_body:  $sce.trustAsHtml($rootScope.orangeConfig.contentHome[vm.useLang][0].home_body || ''),
      };
    } // _update

  } // HomeGeneralCtrl
})();