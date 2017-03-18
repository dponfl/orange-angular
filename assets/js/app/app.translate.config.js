angular
    .module('app.translate.module')
    .config(translateConfig);

translateConfig.$inject = ['$translateProvider'];

/* @ngInject */
function translateConfig ($translateProvider) {
  $translateProvider.translations('en', {
    'NAV_HOME': 'Home',
    'GEN_CITY': 'City'
  });

  $translateProvider.translations('ru', {
    'NAV_HOME': 'Главная',
    'GEN_CITY': 'Город'
  });

  $translateProvider.preferredLanguage('en');
  $translateProvider.useSanitizeValueStrategy('escape');
}