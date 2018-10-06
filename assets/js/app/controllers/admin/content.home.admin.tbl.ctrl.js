(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('ContentHomeAdminTblCtrl', ContentHomeAdminTblCtrl);

  ContentHomeAdminTblCtrl.$inject = ['GeneralConfigService', '$rootScope',
    'EditObjectService', '$scope', '$log','lodash'];

  /* @ngInject */
  function ContentHomeAdminTblCtrl(GeneralConfigService, $rootScope,
                                   EditObjectService, $scope, $log, lodash) {
    var _ = lodash;
    var __=GeneralConfigService;
    var vm = this;
    vm.title = 'ContentHomeAdminTblCtrl';

    activate();

    ////////////////

    function activate() {

      $log.info(vm.title + ', activate...');

      vm.activeTabMain = 'new_obj';
      vm.activeTabEdit = 'lang_eng';

      EditObjectService.setEditContentHomeObject();

    } // activate()

  }

})();

