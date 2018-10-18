(function () {
  "use strict";

  angular.module('OrangeClient')
    .service('GeneralConfigService', GeneralConfigService);

  /**
   * Service to manage home application params
   */
  GeneralConfigService.$inject = ['$rootScope', 'oCity', 'oDeal', 'oObj',
    'oRoom', 'oTag', 'lodash', '$q', '$log', 'tmhDynamicLocale'];
  function GeneralConfigService($rootScope, oCity, oDeal, oObj,
                                oRoom, oTag, lodash, $q, $log, tmhDynamicLocale) {


    // todo: delete
    console.log('GeneralConfigService');


    var _ = lodash;
    var self = {
      setLang: _setLang,
      getLang: _getLang,
      tokens: _setTokens(),
      t: _translate,
    };

    /**
     * Initialising of app configs
     */

    return self;

    function _setTokens() {
      return {
        en: {
          'BOOKING_SUCCESS_TITLE': 'Thank you for the booking!',
          'BOOKING_SUCCESS_BODY_1': 'Your request for booking object #',
          'BOOKING_SUCCESS_BODY_2': ' was successfully submitted. We\'ll contact you shortly.',

          'BOOKING_ERROR_TITLE': 'Oops...',
          'BOOKING_ERROR_BODY_1': 'Unfortunately your request for booking object #',
          'BOOKING_ERROR_BODY_2': ' was not submitted. Please try again later or contact admin.',

          'INFO_SUCCESS_TITLE': 'Thank you for information request!',
          'INFO_SUCCESS_BODY_1': 'It was successfully submitted. We\'ll contact you shortly.',

          'INFO_ERROR_TITLE': 'Oops...',
          'INFO_ERROR_BODY_1': 'Unfortunately your request for booking object #',
          'INFO_ERROR_BODY_2': ' was not submitted. Please try again later or contact admin.',

          'ADMIN_CREATE_SUCCESS_TITLE': 'Create record request',
          'ADMIN_CREATE_SUCCESS_BODY_1': 'was successfully performed',

          'ADMIN_EDIT_SUCCESS_TITLE': 'Edit record request',
          'ADMIN_EDIT_SUCCESS_BODY_1': 'was successfully performed',

          'ADMIN_DELETE_SUCCESS_TITLE': 'Delete record request',
          'ADMIN_DELETE_SUCCESS_BODY_1': 'was successfully performed',

          'ADMIN_CREATE_ERROR_TITLE': 'Create record request',
          'ADMIN_CREATE_ERROR_BODY_1': 'was NOT performed',

          'ADMIN_EDIT_ERROR_TITLE': 'Edit record request',
          'ADMIN_EDIT_ERROR_BODY_1': 'was NOT performed',

          'ADMIN_DELETE_ERROR_TITLE': 'Delete record request',
          'ADMIN_DELETE_ERROR_BODY_1': 'was NOT performed',

          'ADMIN_HOME_SUCCESS_TITLE': 'Home page update',
          'ADMIN_HOME_SUCCESS_BODY_1': 'was successfully performed',

          'ADMIN_HOME_ERROR_TITLE': 'Home page update',
          'ADMIN_HOME_ERROR_BODY_1': 'was NOT performed',

          'ADMIN_QA_SUCCESS_TITLE': 'Q&A page update',
          'ADMIN_QA_SUCCESS_BODY_1': 'was successfully performed',

          'ADMIN_QA_ERROR_TITLE': 'Q&A page update',
          'ADMIN_QA_ERROR_BODY_1': 'was NOT performed',

          'ADMIN_SERVICE_SUCCESS_TITLE': 'Service page update',
          'ADMIN_SERVICE_SUCCESS_BODY_1': 'was successfully performed',

          'ADMIN_SERVICE_ERROR_TITLE': 'Service page update',
          'ADMIN_SERVICE_ERROR_BODY_1': 'was NOT performed',


        },
        ru: {
          'BOOKING_SUCCESS_TITLE': 'Благодарим за бронирование!',
          'BOOKING_SUCCESS_BODY_1': 'Ваш запрос на бронирование объекта №',
          'BOOKING_SUCCESS_BODY_2': ' был успешно отправлен. Мы свяжемся с вами в ближайшее время.',

          'BOOKING_ERROR_TITLE': 'Небольшие проблемы...',
          'BOOKING_ERROR_BODY_1': 'К сожалению ваш запрос на бронирование объекта #',
          'BOOKING_ERROR_BODY_2': ' не был отправлен. Повторите попытку немного позже или ' +
          'свяжитесь с администратором сайта.',

          'INFO_SUCCESS_TITLE': 'Благодарим за ваш интерес!',
          'INFO_SUCCESS_BODY_1': 'Запрос был успешно отправлен. Мы свяжемся с вами в ближайшее время.',

          'INFO_ERROR_TITLE': 'Небольшие проблемы...',
          'INFO_ERROR_BODY_1': 'К сожалению ваш запрос',
          'INFO_ERROR_BODY_2': ' не был отправлен. Повторите попытку немного позже или ' +
          'свяжитесь с администратором сайта.',

          'ADMIN_CREATE_SUCCESS_TITLE': 'Создание объекта',
          'ADMIN_CREATE_SUCCESS_BODY_1': 'было успешно выполнено',

          'ADMIN_EDIT_SUCCESS_TITLE': 'Редактирование объекта',
          'ADMIN_EDIT_SUCCESS_BODY_1': 'было успешно выполнено',

          'ADMIN_DELETE_SUCCESS_TITLE': 'Удаление объекта',
          'ADMIN_DELETE_SUCCESS_BODY_1': 'было успешно выполнено',

          'ADMIN_CREATE_ERROR_TITLE': 'Создание объекта',
          'ADMIN_CREATE_ERROR_BODY_1': 'НЕ БЫЛО выполнено',

          'ADMIN_EDIT_ERROR_TITLE': 'Редактирование объекта',
          'ADMIN_EDIT_ERROR_BODY_1': 'НЕ БЫЛО выполнено',

          'ADMIN_DELETE_ERROR_TITLE': 'Удаление объекта',
          'ADMIN_DELETE_ERROR_BODY_1': 'НЕ БЫЛО выполнено',

          'ADMIN_HOME_SUCCESS_TITLE': 'Редактирование главной страницы',
          'ADMIN_HOME_SUCCESS_BODY_1': 'было успешно выполнено',

          'ADMIN_HOME_ERROR_TITLE': 'Редактирование главной страницы',
          'ADMIN_HOME_ERROR_BODY_1': 'НЕ БЫЛО выполнено',

          'ADMIN_QA_SUCCESS_TITLE': 'Редактирование страницы вопрос-ответ',
          'ADMIN_QA_SUCCESS_BODY_1': 'было успешно выполнено',

          'ADMIN_QA_ERROR_TITLE': 'Редактирование страницы вопрос-ответ',
          'ADMIN_QA_ERROR_BODY_1': 'НЕ БЫЛО выполнено',

          'ADMIN_SERVICE_SUCCESS_TITLE': 'Редактирование страницы Доп. услуги',
          'ADMIN_SERVICE_SUCCESS_BODY_1': 'было успешно выполнено',

          'ADMIN_SERVICE_ERROR_TITLE': 'Редактирование страницы Доп. услуги',
          'ADMIN_SERVICE_ERROR_BODY_1': 'НЕ БЫЛО выполнено',

        },
      }
    }

    function _translate(key) {
      return self.tokens[$rootScope.lang][key] || '';
    } // _translate


    function _setLang(lang) {
      // console.log('Setting lang=' + lang);
      $rootScope.lang = lang || 'en';
      tmhDynamicLocale.set($rootScope.lang);
    } // _setLang

    function _getLang() {
      return $rootScope.lang || 'en';
    }

  } // GeneralConfigService
})();