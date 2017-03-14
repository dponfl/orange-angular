
(function () {
  "use strict";

  angular.module('Orange')
    .service('GeneralConfigService', GeneralConfigService);

  /**
   * Service to manage main application params
   */
  GeneralConfigService.$inject = ['City', 'lodash'];
  function GeneralConfigService(City, lodash) {
    _ = lodash;
    let self = {
      orangeConfig: {},
      setLang: _setLang,
      getCities: _getCities
    };

    function _setLang(lang = '') {
      // console.log('Setting lang=' + lang);
      self.orangeConfig.lang = lang || 'en';
    } // _setLang

    function _mapCityData(elem) {
      if (!_.isArray(self.orangeConfig.cityList[elem.lang])) self.orangeConfig.cityList[elem.lang] = [];
      self.orangeConfig.cityList[elem.lang][elem.order] = {};
      self.orangeConfig.cityList[elem.lang][elem.order]['key'] = elem.key;
      self.orangeConfig.cityList[elem.lang][elem.order]['val'] = elem.city;
    } // _mapCityData

    function _getCities() {
      City.query(function (data) {
      })
        .$promise
        .then(function (data) {
          // console.log('!!! Success...');
          // console.dir(data);

          self.orangeConfig.cityList = {};

          if (!_.isArray(data)) throw Error('Error: cities data is not an array');

          data.map(_mapCityData);

          // console.log('self.orangeConfig:');
          // console.dir(self.orangeConfig);
          return;
        })
        .catch(function (err) {

          // todo: change by Log
          console.log('Error...');
          console.dir(err);
          return;
        });
    } // _getCities

    self.setLang();
    self.getCities();

    return self;
  }
})();