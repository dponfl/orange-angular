"use strict";

(function () {

  angular.module('app.client.routes', [
    'app.core'
  ])
    .config(OrangeClientRoutesConfig);

  OrangeClientRoutesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
  function OrangeClientRoutesConfig($stateProvider, $locationProvider, $urlRouterProvider) {


    // todo: delete
    console.log('app.client.routes: OrangeClientRoutesConfig');


    $stateProvider
      .state('home', {
        views: {
          header: {
            templateUrl: 'templates/view/header/headerClient.html'
          },
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
          },
          footer: {
            templateUrl: 'templates/view/footer/footerClient.html'
          },
        },
        url: '/'
      })
      .state('exclusive', {
        views: {
          header: {
            templateUrl: 'templates/view/header/headerClient.html'
          },
          main: {
            templateUrl: 'templates/view/exclusive.html',
            controller: ['$scope', '$stateParams', function ($scope, $stateParams) {
              $scope.directLinkObjectNumber = $stateParams.objNumber;
            }],
          },
          footer: {
            templateUrl: 'templates/view/footer/footerClient.html'
          },
        },
        url: '/exclusive',
        params: {
          objNumber: null,
        },
      })
      .state('shortterm', {
        views: {
          header: {
            templateUrl: 'templates/view/header/headerClient.html'
          },
          main: {
            templateUrl: 'templates/view/shortterm.html',
            controller: ['$scope', '$stateParams', function ($scope, $stateParams) {
              $scope.directLinkObjectNumber = $stateParams.objNumber;
            }],
          },
          footer: {
            templateUrl: 'templates/view/footer/footerClient.html'
          },
        },
        url: '/shortterm',
        params: {
          objNumber: null,
        },
      })
      .state('longterm', {
        views: {
          header: {
            templateUrl: 'templates/view/header/headerClient.html'
          },
          main: {
            templateUrl: 'templates/view/longterm.html',
            controller: ['$scope', '$stateParams', function ($scope, $stateParams) {
              $scope.directLinkObjectNumber = $stateParams.objNumber;
            }],
          },
          footer: {
            templateUrl: 'templates/view/footer/footerClient.html'
          },
        },
        url: '/longterm',
        params: {
          objNumber: null,
        },
      })
      .state('sale', {
        views: {
          header: {
            templateUrl: 'templates/view/header/headerClient.html'
          },
          main: {
            templateUrl: 'templates/view/sale.html',
            controller: ['$scope', '$stateParams', function ($scope, $stateParams) {
              $scope.directLinkObjectNumber = $stateParams.objNumber;
            }],
          },
          footer: {
            templateUrl: 'templates/view/footer/footerClient.html'
          },
        },
        url: '/sale',
        params: {
          objNumber: null,
        },
      })
      .state('qa', {
        views: {
          header: {
            templateUrl: 'templates/view/header/headerClient.html'
          },
          main: {
            templateUrl: 'templates/view/qa.html'
          },
          footer: {
            templateUrl: 'templates/view/footer/footerClient.html'
          },
        },
        url: '/qa',
      })
      .state('services', {
        views: {
          header: {
            templateUrl: 'templates/view/header/headerClient.html'
          },
          main: {
            templateUrl: 'templates/view/services.html'
          },
          footer: {
            templateUrl: 'templates/view/footer/footerClient.html'
          },
        },
        url: '/services',
      })
      .state('contacts', {
        views: {
          header: {
            templateUrl: 'templates/view/header/headerClient.html'
          },
          main: {
            templateUrl: 'templates/view/contacts.html'
          },
          footer: {
            templateUrl: 'templates/view/footer/footerClient.html'
          },
        },
        url: '/contacts',
      })
      .state('admin', {
        views: {
          header: {
            templateUrl: 'templates/view/header/headerAdmin.html'
          },
          main: {
            templateUrl: 'templates/view/home/main.html'
          },
          footer: {
            templateUrl: 'templates/view/footer/footerClient.html'
          },
        },
        url: '/admin',
      })
      .state('exclusive_admin', {
        views: {
          header: {
            templateUrl: 'templates/view/header/headerAdmin.html'
          },
          main: {
            templateUrl: 'templates/view/exclusive.html'
          },
          footer: {
            templateUrl: 'templates/view/footer/footerClient.html'
          },
        },
        url: '/admin222',
      });

    // todo: delete
    console.log('app.client.routes: OrangeClientRoutes');

    $urlRouterProvider
/*
      .when('/qa', '/qa')
*/
     .when('/qa', ['$state', function ($state) {
     $state.go('qa');
     }])
/*
      .when(state.url, ['$match', '$stateParams', function ($match, $stateParams) {
        if ($state.$current.navigable != state || !equalForKeys($match, $stateParams)) {
          $state.transitionTo(state, $match, false);
        }
      }])
*/
      .otherwise('/');

    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
  } // OrangeClientRoutesConfig


})();