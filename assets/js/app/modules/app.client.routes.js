"use strict";

(function () {

  angular.module('app.client.routes', [
    'app.core'
  ]).config(OrangeClientRoutesConfig);

  OrangeClientRoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
  function OrangeClientRoutesConfig($stateProvider, $urlRouterProvider, $locationProvider) {


    // todo: delete
    console.log('app.client.routes');


    $stateProvider
      .state('home', {
        views: {
          main: {
            templateUrl: 'templates/view/home/main.html'
          },
          exclusive: {
            templateUrl: 'templates/view/home/exclusive.html'
          },
          shortterm: {
            templateUrl: 'templates/view/home/shortterm.html'
          },
          longterm: {
            templateUrl: 'templates/view/home/longterm.html'
          },
          sale: {
            templateUrl: 'templates/view/home/sale.html'
          },
          qa: {
            templateUrl: 'templates/view/home/qa.html'
          },
          services: {
            templateUrl: 'templates/view/home/services.html'
          },
          contacts: {
            templateUrl: 'templates/view/home/contacts.html'
          }
        },
        url: '/'
      })
      .state('exclusive', {
        views: {
          main: {
            templateUrl: 'templates/view/exclusive.html',
            controller: function ($scope, $stateParams) {
              $scope.directLinkObjectNumber = $stateParams.objNumber;
            },
          },
        },
        url: '/exclusive',
        params: {
          objNumber: null,
        },
      })
      .state('shortterm', {
        views: {
          main: {
            templateUrl: 'templates/view/shortterm.html',
            controller: function ($scope, $stateParams) {
              $scope.directLinkObjectNumber = $stateParams.objNumber;
            },
          },
        },
        url: '/shortterm',
        params: {
          objNumber: null,
        },
      })
      .state('longterm', {
        views: {
          main: {
            templateUrl: 'templates/view/longterm.html',
            controller: function ($scope, $stateParams) {
              $scope.directLinkObjectNumber = $stateParams.objNumber;
            },
          },
        },
        url: '/longterm',
        params: {
          objNumber: null,
        },
      })
      .state('sale', {
        views: {
          main: {
            templateUrl: 'templates/view/sale.html',
            controller: function ($scope, $stateParams) {
              $scope.directLinkObjectNumber = $stateParams.objNumber;
            },
          },
        },
        url: '/sale',
        params: {
          objNumber: null,
        },
      })
      .state('qa', {
        views: {
          main: {
            templateUrl: 'templates/view/qa.html'
          },
        },
        url: '/qa',
      })
      .state('services', {
        views: {
          main: {
            templateUrl: 'templates/view/services.html'
          },
        },
        url: '/services',
      })
      .state('contacts', {
        views: {
          main: {
            templateUrl: 'templates/view/contacts.html'
          },
        },
        url: '/contacts',
      });

    $urlRouterProvider.otherwise('/');

    $locationProvider.hashPrefix('');
  }


})();