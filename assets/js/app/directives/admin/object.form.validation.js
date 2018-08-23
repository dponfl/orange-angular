(function () {
  'use strict';

  var dates = {
    date1: 0,
    date2: 0,
  };

  angular
    .module('OrangeClient')
    .directive('objectFormSelectValidation', objectFormSelectValidation)
    .directive('objectFormDateRangeValidationStart', objectFormDateRangeValidationStart)
    .directive('objectFormDateRangeValidationEnd', objectFormDateRangeValidationEnd);

  objectFormSelectValidation.$inject = ['$log'];

  /* @ngInject */
  function objectFormSelectValidation($log) {
    var directive = {
      link: _link,
      restrict: 'A',
      require: '?ngModel',
      scope: {
        objectFormSelectValidation: '=objectFormSelectValidation',
      },
    };
    return directive;

    function _link(scope, element, attrs, ngModel) {

      if (!ngModel) {
        return;
      }

      ngModel.$validators.objectFormSelectValidation = function (modelValue) {

/*
        $log.info('modelValue:');
        console.dir(modelValue);
        $log.info('scope.objectFormSelectValidation:');
        console.dir(scope.objectFormSelectValidation);
*/

        return ((modelValue.key) ? modelValue.key != 'any' : false);
      };

      scope.$watch('objectFormSelectValidation', function () {
        ngModel.$validate();
      })
    }
  }

  objectFormDateRangeValidationStart.$inject = ['$log'];

  /* @ngInject */
  function objectFormDateRangeValidationStart($log) {
    var directive = {
      link: _link,
      restrict: 'A',
      require: '?ngModel',
      scope: {
        objectFormDateRangeValidationStart: '=objectFormDateRangeValidationStart',
      },
    };
    return directive;

    function _link(scope, element, attrs, ngModel) {

      if (!ngModel) {
        return;
      }

      ngModel.$validators.objectFormDateRangeValidationStart = function (modelValue) {

        dates.date1 = modelValue;

        $log.info('modelValue:');
        console.dir(modelValue);
        $log.info('dates.date1:');
        console.dir(dates.date1);
        $log.info('dates.date2:');
        console.dir(dates.date2);
        $log.info('scope.objectFormDateRangeValidationStart:');
        console.dir(scope.objectFormDateRangeValidationStart);

        return true;
      };

      scope.$watch('objectFormDateRangeValidationStart', function () {
        ngModel.$validate();
      })
    }
  }

  objectFormDateRangeValidationEnd.$inject = ['$log'];

  /* @ngInject */
  function objectFormDateRangeValidationEnd($log) {
    var directive = {
      link: _link,
      restrict: 'A',
      require: '?ngModel',
      scope: {
        objectFormDateRangeValidationEnd: '=objectFormDateRangeValidationEnd',
      },
    };
    return directive;

    function _link(scope, element, attrs, ngModel) {

      if (!ngModel) {
        return;
      }

      ngModel.$validators.objectFormDateRangeValidationEnd = function (modelValue) {

        dates.date2 = modelValue;

        $log.info('modelValue:');
        console.dir(modelValue);
        $log.info('dates.date1:');
        console.dir(dates.date1);
        $log.info('dates.date2:');
        console.dir(dates.date2);
        $log.info('scope.objectFormDateRangeValidationEnd:');
        console.dir(scope.objectFormDateRangeValidationEnd);

        return true;
      };

      scope.$watch('objectFormDateRangeValidationEnd', function () {
        ngModel.$validate();
      })
    }
  }

})();

