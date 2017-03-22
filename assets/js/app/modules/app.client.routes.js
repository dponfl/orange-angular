"use strict";

(function () {

  angular.module('app.client.routes', [
    'app.core'
  ]).config(OrangeClientRoutesConfig);

  OrangeClientRoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
  function OrangeClientRoutesConfig($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'templates/view/page.html'
      })
      .state('exclusive', {
        url: '/exclusive',
        templateUrl: 'templates/view/exclusive.html'
      })
      .state('shortterm', {
        url: '/shortterm',
        templateUrl: 'templates/view/shortterm.html'
      })
      .state('longterm', {
        url: '/longterm',
        templateUrl: 'templates/view/longterm.html'
      })
      .state('sale', {
        url: '/sale',
        templateUrl: 'templates/view/sale.html'
      })
      .state('qa', {
        url: '/qa',
        templateUrl: 'templates/view/qa.html'
      })
      .state('services', {
        url: '/services',
        templateUrl: 'templates/view/services.html'
      })
      .state('contacts', {
        url: '/contacts',
        templateUrl: 'templates/view/contacts.html'
      });

    $urlRouterProvider.otherwise('/');

    $locationProvider.hashPrefix('');
  }


})();