(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('HeaderAdminCtrl', HeaderAdminCtrl);

  HeaderAdminCtrl.$inject = ['GeneralConfigService', '$translate', '$log', 'lodash'];

  /* @ngInject */
  function HeaderAdminCtrl(GeneralConfigService, $translate, $log, lodash) {
    var vm = this;
    vm.title = 'HeaderAdminCtrl';
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


    ////////////////

    function activate() {
      $translate.use('ru');
      __.setLang('ru');

      vm.navMeny = [
        {
          href: 'admin_short',
          text: 'NAV_DAILY',
        },
        {
          href: 'admin_longterm',
          text: 'NAV_LONG_TERM',
        },
        {
          href: 'admin_sale',
          text: 'NAV_SALES',
        },
        {
          href: 'admin_content_home',
          text: 'NAV_CONTENT_HOME',
        },
        {
          href: 'admin_content_qa',
          text: 'NAV_CONTENT_QA',
        },
        {
          href: 'admin_content_service',
          text: 'NAV_CONTENT_SERVICE',
        },
      ];

    } // activate

  }

})();

