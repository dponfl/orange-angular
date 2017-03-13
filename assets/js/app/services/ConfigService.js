
(function () {
  "use strict";

  angular.module('Orange')
    .service('GeneralConfigService', GeneralConfigService);

  /**
   * Service to manage main application params
   */
  GeneralConfigService.$inject = ['City'];
  function GeneralConfigService(City) {
    let self = {
      orangeConfig: {},
      setLang: _setLang,
      getCities: _getCities
    };

    function _setLang(lang = '') {
      // console.log('Setting lang=' + lang);
      self.orangeConfig.lang = lang || 'en';
    } // _setLang

    function _getCities() {
      City.query(function (data) {
      })
        .$promise
        .then(function (data) {
          console.log('!!! Success...');
          console.dir(data);
          return;
        })
        .catch(function (err) {
          console.log('Error...');
          console.dir(err);
          return;
        });
    } // _getCities

    self.setLang();

    return self;
  }
})();