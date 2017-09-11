(function () {
  'use strict';

  angular
    .module('OrangeClient')
    .directive('objectFormSelectValidation', objectFormSelectValidation);

  objectFormSelectValidation.$inject = ['$log'];

  /* @ngInject */
  function objectFormSelectValidation($log) {
    var directive = {
      link: _link,
      restrict: 'A',
      require: 'ngModel',
      scope: {
        objectFormSelectValidation: '=objectFormSelectValidation',
      },
    };
    return directive;

    function _link(scope, element, attrs, ngModel) {
      ngModel.$validators.objectFormSelectValidation = function (modelValue) {

        $log.info('modelValue:');
        console.dir(modelValue);
        $log.info('scope.objectFormSelectValidation:');
        console.dir(scope.objectFormSelectValidation);

        return (modelValue.key != 'any');
      };

      scope.$watch('objectFormSelectValidation', function () {
        ngModel.$validate();
      })
    }
  }

})();

