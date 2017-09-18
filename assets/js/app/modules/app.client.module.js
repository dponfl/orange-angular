(function () {
  'use strict';

  angular
    .module('OrangeClient', [
      'app.core',
      'app.client.routes',
      'app.translate.module',
      'app.client.config'
    ])
    .run(setupGlobalScope);

  setupGlobalScope.$inject = ['$rootScope', 'configOrange', '$log'];
  function setupGlobalScope($rootScope, configOrange, $log) {


    // todo: delete
    $log.info('OrangeClient');


    //Generale
    $rootScope.numLang = 2;
    $rootScope.lang = 'en';
    $rootScope.langList = ['en', 'ru'];
    $rootScope.langTitle = ['English', 'Русский'];
    $rootScope.langActiveTab = ['lang_eng', 'lang_rus'];

    $rootScope.pagerNumRecords = 2;
    $rootScope.orangeConfig = configOrange;
    $rootScope.scrollDisabled = false;
    $rootScope.panelsAllLangs = {};

    // Images upload config

    $rootScope.imgFileNameElement = '$$$_-_$$$';

    // Short term
    $rootScope.short = {};
    $rootScope.short.showNotFound = false;
    $rootScope.short.page = 1;
    $rootScope.short.FindActivated = false;
    $rootScope.short.FilterData = {};
    $rootScope.short.scrollDisabled = false;
    $rootScope.short.showFoundNothing = false;
    $rootScope.short.showServerError = false;
    $rootScope.short.panelsAllLangs = {};
    $rootScope.short.panels = [];
    $rootScope.short.busy = false;

    // Long term
    $rootScope.long = {};
    $rootScope.long.showNotFound = false;
    $rootScope.long.page = 1;
    $rootScope.long.FindActivated = false;
    $rootScope.long.FilterData = {};
    $rootScope.long.scrollDisabled = false;
    $rootScope.long.showFoundNothing = false;
    $rootScope.long.showServerError = false;
    $rootScope.long.panelsAllLangs = {};
    $rootScope.long.panelsAllLangsEdit = {};
    $rootScope.long.panels = [];
    $rootScope.long.panelsEdit = [];
    $rootScope.long.busy = false;

    // Sale
    $rootScope.sale = {};
    $rootScope.sale.showNotFound = false;
    $rootScope.sale.page = 1;
    $rootScope.sale.FindActivated = false;
    $rootScope.sale.FilterData = {};
    $rootScope.sale.scrollDisabled = false;
    $rootScope.sale.showFoundNothing = false;
    $rootScope.sale.showServerError = false;
    $rootScope.sale.panelsAllLangs = {};
    $rootScope.sale.panelsAllLangsEdit = {};
    $rootScope.sale.panels = [];
    $rootScope.sale.panelsEdit = [];
    $rootScope.sale.busy = false;

    // Exclusive
    $rootScope.exclusive = {};
    $rootScope.exclusive.showNotFound = false;
    $rootScope.exclusive.page = 1;
    $rootScope.exclusive.FindActivated = false;
    $rootScope.exclusive.FilterData = {};
    $rootScope.exclusive.scrollDisabled = false;
    $rootScope.exclusive.showFoundNothing = false;
    $rootScope.exclusive.showServerError = false;
    $rootScope.exclusive.panelsAllLangs = {};
    $rootScope.exclusive.panels = [];
    $rootScope.exclusive.busy = false;

    // Admin
    $rootScope.admin = {};
    $rootScope.admin.long = {};
    $rootScope.admin.long.editObjSelected = false;
    $rootScope.admin.long.objNumber = '';
    $rootScope.admin.long.editPanelShow = false;
    $rootScope.admin.long.formData = {};
    $rootScope.admin.long.editObjEnableButton = true;

    $log.info('OrangeClient, $rootScope:');
    $log.info($rootScope);
  }

})();