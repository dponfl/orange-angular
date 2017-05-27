"use strict";

// angular.element(document).ready(function () {

  console.log('angular bootstrap...');



/*
  var data = {
    myKey: 'myValue',
  };
*/

  $.get('/config', config);

  config.$inject = ['data'];

  function config(data) {
    console.log('config data:');
    console.log(data);


    angular.module('OrangeClient')
      .config(OrangeConfiguration);

    OrangeConfiguration.$inject = ['configOrangeProvider', 'lodash'];

    function OrangeConfiguration(configOrangeProvider, lodash) {

      var _ = lodash;

      console.log('OrangeConfiguration...');
      console.log(data);

      if (_.has(data, 'result') && _.has(data, 'data')) {
        console.log('11111111');
        if (data.result == 'ok') {
          console.log('2222222222');
          configOrangeProvider.initialize(data.data);
        }
      }



    } // OrangeConfiguration

/*
    angular.bootstrap(document, ['OrangeClient'], {
      strictDi: true
    });
*/
    angular.bootstrap(document, ['OrangeClient']);
}


// });