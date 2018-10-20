(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('ContentServiceAdminTblCtrl', ContentServiceAdminTblCtrl);

  ContentServiceAdminTblCtrl.$inject = ['GeneralConfigService', '$rootScope',
    'EditObjectService', '$scope', '$log','lodash'];

  /* @ngInject */
  function ContentServiceAdminTblCtrl(GeneralConfigService, $rootScope,
                                   EditObjectService, $scope, $log, lodash) {
    var _ = lodash;
    var __=GeneralConfigService;
    var vm = this;
    vm.title = 'ContentServiceAdminTblCtrl';

    activate();

    ////////////////

    function activate() {

      // $log.info(vm.title + ', activate...');

      vm.activeTabMain = 'new_obj';
      vm.activeTabEdit = 'lang_eng';

      EditObjectService.setEditContentServiceObject();

    } // activate()

  }

})();

