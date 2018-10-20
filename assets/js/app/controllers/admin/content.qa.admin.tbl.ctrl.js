(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .controller('ContentQAAdminTblCtrl', ContentQAAdminTblCtrl);

  ContentQAAdminTblCtrl.$inject = ['GeneralConfigService', '$rootScope',
    'EditObjectService', '$scope', '$log','lodash'];

  /* @ngInject */
  function ContentQAAdminTblCtrl(GeneralConfigService, $rootScope,
                                   EditObjectService, $scope, $log, lodash) {
    var _ = lodash;
    var __=GeneralConfigService;
    var vm = this;
    vm.title = 'ContentQAAdminTblCtrl';

    activate();

    ////////////////

    function activate() {

      // $log.info(vm.title + ', activate...');

      vm.activeTabMain = 'new_obj';
      vm.activeTabEdit = 'lang_eng';

      EditObjectService.setEditContentQAObject();

    } // activate()

  }

})();

