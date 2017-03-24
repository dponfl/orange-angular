"use strict";

(function () {

  angular.module('app.client.routes', [
    'app.core'
  ]).config(OrangeClientRoutesConfig);

  OrangeClientRoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
  function OrangeClientRoutesConfig($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
      .state('home', {
        views: {
          main: {
            templateUrl: 'templates/view/main/main.html'
          },
          exclusive: {
            templateUrl: 'templates/view/main/exclusive.html'
          },
          shortterm: {
            templateUrl: 'templates/view/main/shortterm.html'
          },
          longterm: {
            templateUrl: 'templates/view/main/longterm.html'
          },
          sale: {
            templateUrl: 'templates/view/main/sale.html'
          },
          qa: {
            templateUrl: 'templates/view/main/qa.html'
          },
          services: {
            templateUrl: 'templates/view/main/services.html'
          },
          contacts: {
            templateUrl: 'templates/view/main/contacts.html'
          }
        },
        url: '/'
      })
      .state('exclusive', {
        views: {
          main: {
            templateUrl: 'templates/view/exclusive.html'
          },
        },
        url: '/exclusive',
      })
      .state('shortterm', {
        views: {
          main: {
            templateUrl: 'templates/view/shortterm.html'
          },
        },
        url: '/shortterm',
      })
      .state('longterm', {
        views: {
          main: {
            templateUrl: 'templates/view/longterm.html'
          },
        },
        url: '/longterm',
      })
      .state('sale', {
        views: {
          main: {
            templateUrl: 'templates/view/sale.html'
          },
        },
        url: '/sale',
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