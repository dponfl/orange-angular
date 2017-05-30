(function () {
  "use strict";

  angular.module('app.client.config', [])
    .config(LaddaConfig)
    .config(ModalConfig)
    .config(DynamicLocale)
    .provider('configOrange', configOrange);

  LaddaConfig.$inject = ['laddaProvider', '$datepickerProvider'];
  function LaddaConfig(laddaProvider, $datepickerProvider) {


    // todo: delete
    console.log('app.client.config');


    laddaProvider.setOption({
      style: 'contract',
      spinnerSize: 35,
      spinnerColor: '#ffffff'
    });
    angular.extend($datepickerProvider.defaults, {
      dateFormat: 'dd/MM/yyyy',
      autoclose: true,
      startWeek: 1,
    });
  } // LaddaConfig

  ModalConfig.$inject = ['$modalProvider'];
  function ModalConfig($modalProvider) {
    angular.extend($modalProvider.defaults, {
      html: true
    });
  } // ModalConfig

  DynamicLocale.$inject = ['tmhDynamicLocaleProvider'];
  function DynamicLocale(tmhDynamicLocaleProvider) {
    tmhDynamicLocaleProvider.defaultLocale('en');
    tmhDynamicLocaleProvider.localeLocationPattern('vendor/angular-i18n/angular-locale_{{locale}}.js');
  } // DynamicLocale

  configOrange.$inject = ['lodash'];
  function configOrange(lodash) {
    var _ = lodash;
    var configData;

    console.log('configOrange...');

    this.initialize = function (data) {

      console.log('configOrange.initialize...');
      console.log(data);

      configData = _.assign(configData, data);
    };

    this.$get = function () {
      return configData;
    };
  } // configOrange


})();

