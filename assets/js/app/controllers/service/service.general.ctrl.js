"use strict";

(function () {
  angular.module('OrangeClient')
    .controller('ServiceGeneralCtrl',ServiceGeneralCtrl);

  ServiceGeneralCtrl.$inject = ['$rootScope', '$log', '$sce', 'lodash'];
  function ServiceGeneralCtrl($rootScope, $log, $sce, lodash) {

    var vm = this;
    var _ = lodash;

    vm.useLang = $rootScope.lang;
    vm.home = {};

    _update();

    $rootScope.$watch('lang', _update);

    function _update() {

      var useBody = [];

      vm.useLang = $rootScope.lang;

      $log.info('$rootScope.orangeConfig.contentService[vm.useLang]:');
      $log.info($rootScope.orangeConfig.contentService[vm.useLang]);

      _.forEach($rootScope.orangeConfig.contentService[vm.useLang].body, function (val) {
        useBody.push({
          body: $sce.trustAsHtml(val.body)
        });
      });

      vm.service = {
        title: $rootScope.orangeConfig.contentService[vm.useLang].title || '',
        body: useBody,
      };

      $log.info("ServiceGeneralCtrl, vm.service:");
      $log.info(vm.service);

    } // _update

  } // ServiceGeneralCtrl
})();