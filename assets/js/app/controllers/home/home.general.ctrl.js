"use strict";

(function () {
  angular.module('OrangeClient')
    .controller('HomeGeneralCtrl',HomeGeneralCtrl);

  HomeGeneralCtrl.$inject = ['$rootScope'];
  function HomeGeneralCtrl($rootScope) {

    var vm = this;

    vm.useLang = $rootScope.lang;
    vm.home = {};

    _update();

    $rootScope.$watch('lang', _update);

    function _update() {

      vm.useLang = $rootScope.lang;

      vm.home = {
        home_title: $rootScope.orangeConfig.contentHome[vm.useLang][0].home_title || '',
        home_body_lead: $rootScope.orangeConfig.contentHome[vm.useLang][0].home_body_lead || '',
        home_body_p_1: $rootScope.orangeConfig.contentHome[vm.useLang][0].home_body_p_1 || '',
        home_body_p_2: $rootScope.orangeConfig.contentHome[vm.useLang][0].home_body_p_2 || '',
        home_body_p_3: $rootScope.orangeConfig.contentHome[vm.useLang][0].home_body_p_3 || '',
      };
    } // _update

  } // HomeGeneralCtrl
})();