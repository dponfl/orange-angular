"use strict";

  // console.log('angular bootstrap...');

  $.get('/config', config);

  config.$inject = ['data'];

  function config(data) {
    // console.log('config data:');
    // console.log(data);


    angular.module('OrangeClient')
      .config(OrangeConfiguration);

    OrangeConfiguration.$inject = ['configOrangeProvider', 'lodash'];

    function OrangeConfiguration(configOrangeProvider, lodash) {

      var _ = lodash;

      // console.log('OrangeConfiguration...');
      // console.log(data);

      if (_.has(data, 'result') && _.has(data, 'data')) {
        if (data.result == 'ok') {
          configOrangeProvider.initialize(data.data);
        }

        if (_.has(data.data, 'token')) {
          var jwtToken = data.data.token;
        }
      }

    } // OrangeConfiguration

    angular.bootstrap(document, ['OrangeClient']);
}
