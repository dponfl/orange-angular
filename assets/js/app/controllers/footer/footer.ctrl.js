(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('FooterCtrl', FooterCtrl);

  FooterCtrl.$inject = ['GeneralConfigService', 'S_ReqService', '$rootScope', '$scope', '$modal', '$log',
    'lodash', 'toaster'];

  /* @ngInject */
  function FooterCtrl(GeneralConfigService, S_ReqService, $rootScope, $scope, $modal, $log,
                      lodash, toaster) {
    var vm = this;
    vm.title = 'FooterCtrl';
    var _ = lodash;
    var __=GeneralConfigService;

    activate();

    ////////////////

    function activate() {

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

      vm.subscription = [
        {
          href: 'http://www.youtube.com',
          text: 'FOOTER_SUBSCRIBE_YOUTUBE',
        },
        {
          href: 'http://www.facebook.com',
          text: 'FOOTER_SUBSCRIBE_FACEBOOK',
        },
        {
          href: 'http://www.twitter.com',
          text: 'FOOTER_SUBSCRIBE_TWEETER',
        },
        {
          href: 'http://plus.google.com',
          text: 'FOOTER_SUBSCRIBE_GOOGLEPLUS',
        },
      ];

      vm.developer = {
          href: 'http://www.studiodtd.com',
          text: 'iStudioDTD.com',
        };

    } // activate

  }

})();

