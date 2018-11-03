"use strict";

(function () {
  angular.module('OrangeClient')
    .controller('QAGeneralCtrl',QAGeneralCtrl);

  QAGeneralCtrl.$inject = ['$rootScope', '$log', '$sce', 'lodash'];
  function QAGeneralCtrl($rootScope, $log, $sce, lodash) {

    var vm = this;
    var _ = lodash;

    vm.useLang = $rootScope.lang;
    vm.home = {};

    _update();

    $rootScope.$watch('lang', _update);

    function _update() {

      var useBody = [];

      vm.useLang = $rootScope.lang;

      $log.info('$rootScope.orangeConfig.contentQA[vm.useLang].body:');
      $log.info($rootScope.orangeConfig.contentQA[vm.useLang].body);

      _.forEach($rootScope.orangeConfig.contentQA[vm.useLang].body, function (val) {
        useBody.push({
          q: val.q,
          a: $sce.trustAsHtml(val.a)
        });
      });


      vm.qa = {
        title: $rootScope.orangeConfig.contentQA[vm.useLang].title || '',
        body: useBody,
      };


      // $log.info("QAGeneralCtrl, vm.qa:");
      // $log.info(vm.qa);

    } // _update

  } // QAGeneralCtrl
})();