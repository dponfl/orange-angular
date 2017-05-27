(function () {
  "use strict";

  angular.module('OrangeClient')
    .service('GeneralConfigService', GeneralConfigService);

  /**
   * Service to manage home application params
   */
  GeneralConfigService.$inject = ['$rootScope', 'oCity', 'oDeal', 'oObj',
    'oRoom', 'oTag', 'lodash', '$q', '$log'];
  function GeneralConfigService($rootScope, oCity, oDeal, oObj,
                                oRoom, oTag, lodash, $q, $log) {


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

        },
      }
    }

    function _translate(key) {
      return self.tokens[$rootScope.lang][key] || '';
    } // _translate


    function _setLang(lang) {
      // console.log('Setting lang=' + lang);
      $rootScope.lang = lang || 'en';
    } // _setLang

    function _getLang() {
      return $rootScope.lang || 'en';
    }



    /**
     * Tag
     */

    function _getTag() {
      var deferred = $q.defer();
      oTag.query(function (data) {
          // console.log('!!! Success...');
          // console.dir(data);

          self.orangeConfig.tagList = {};

          if (!_.isArray(data)) deferred.reject(Error('Tag data is not an array'));

          for (var i = 0; i < data.length; i++) {
            if (!_.isArray(self.orangeConfig.tagList[data[i].lang]))
              self.orangeConfig.tagList[data[i].lang] = [];
            self.orangeConfig.tagList[data[i].lang].push({key: data[i].key, val: data[i].tag})
          }

          // console.log('self.orangeConfig.tagList:');
          // console.dir(self.orangeConfig.tagList);

          deferred.resolve();
        })

      return deferred.promise;
    } // _getTag

  } // GeneralConfigService
})();