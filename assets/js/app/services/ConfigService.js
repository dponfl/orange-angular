"use strict";

(function () {
  angular.module('Orange')
    .service('GeneralConfigService', GeneralConfigService);

  function GeneralConfigService() {
    let self = {
      orangeConfig: {
        lang: 'en'
      },
      setLang: function (lang) {
        // console.log('Setting lang=' + lang);
        self.orangeConfig.lang = lang;
      }
    };

    return self;
  }
})();