(function () {
  'use strict';

  angular
    .module('app.core', [
      'ngResource',
      'ui.router',
      'ngLodash',
      'jcs-autoValidate',
      'infinite-scroll',
      'angularSpinner',
      'angular-ladda',
    ])
    .run(errorMsgResolver);

  errorMsgResolver.$inject = ['defaultErrorMessageResolver'];
  errorMsgFunction.$inject = ['errorMessages'];
  function errorMsgFunction(errorMessages) {
    errorMessages['tooShort'] = 'Object number should be at least {0} digits';
    errorMessages['reqEn'] = 'Required field - English';
    errorMessages['reqRu'] = 'Обязательное поле - Русский';
  }

  function errorMsgResolver(defaultErrorMessageResolver) {
    defaultErrorMessageResolver.getErrorMessages().then(errorMsgFunction);
  }

})();