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
            controller: ['$scope', '$stateParams', '$rootScope', function ($scope, $stateParams, $rootScope) {
              $scope.directLinkObjectNumber = $stateParams.objNumber;
              $scope.directLinkDeal = $stateParams.deal;

              _update();

              $rootScope.$watch('lang', _update);

              function _update() {
                $scope.title = $rootScope.orangeConfig.contentHome[$rootScope.lang][0].home_exclusive_title;
              } // _update
            }],
          },
          footer: {
            templateUrl: 'templates/view/footer/footerClient.html'
          },
        },
        url: '/exclusive',
        params: {
          objNumber: null,
          deal: null,
        },
      })
      .state('shortterm', {
        views: {
          header: {
            templateUrl: 'templates/view/header/headerClient.html'
          },
          main: {
            templateUrl: 'templates/view/shortterm.html',
            controller: ['$scope', '$stateParams', '$rootScope', function ($scope, $stateParams, $rootScope) {
              $scope.directLinkObjectNumber = $stateParams.objNumber;

              _update();

              $rootScope.$watch('lang', _update);

              function _update() {
                $scope.title = $rootScope.orangeConfig.contentHome[$rootScope.lang][0].home_short_title;
              } // _update
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
            controller: ['$scope', '$stateParams', '$rootScope', function ($scope, $stateParams, $rootScope) {
              $scope.directLinkObjectNumber = $stateParams.objNumber;

              _update();

              $rootScope.$watch('lang', _update);

              function _update() {
                $scope.title = $rootScope.orangeConfig.contentHome[$rootScope.lang][0].home_long_title;
              } // _update
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
      .state('login', {
        views: {
          header: {
            templateUrl: 'templates/view/header/headerClient.html'
          },
          main: {
            templateUrl: 'templates/view/admin/login.html',
          },
          footer: {
            templateUrl: 'templates/view/footer/footerClient.html',
          },
        },
        url: '/login',
      })
      .state('admin', {
        views: {
          header: {
            templateUrl: 'templates/view/admin/headerAdmin.html'
          },
          main: {
            templateUrl: 'templates/view/admin/admin.html',
          },
          footer: {
            templateUrl: 'templates/view/admin/footerAdmin.html'
          },
        },
        url: '/admin',
      })
      .state('admin_longterm', {
        views: {
          header: {
            templateUrl: 'templates/view/admin/headerAdmin.html'
          },
          main: {
            templateUrl: 'templates/view/admin/longterm.html',
          },
          footer: {
            templateUrl: 'templates/view/admin/footerAdmin.html',
          },
        },
        url: '/admin_longterm',
      })
      .state('admin_sale', {
        views: {
          header: {
            templateUrl: 'templates/view/admin/headerAdmin.html'
          },
          main: {
            templateUrl: 'templates/view/admin/sale.html',
          },
          footer: {
            templateUrl: 'templates/view/admin/footerAdmin.html',
          },
        },
        url: '/admin_sale',
      })
      .state('admin_short', {
        views: {
          header: {
            templateUrl: 'templates/view/admin/headerAdmin.html'
          },
          main: {
            templateUrl: 'templates/view/admin/short.html',
          },
          footer: {
            templateUrl: 'templates/view/admin/footerAdmin.html',
          },
        },
        url: '/admin_short',
      })
      .state('admin_content_home', {
        views: {
          header: {
            templateUrl: 'templates/view/admin/headerAdmin.html'
          },
          main: {
            templateUrl: 'templates/view/admin/content_home.html',
          },
          footer: {
            templateUrl: 'templates/view/admin/footerAdmin.html',
          },
        },
        url: '/admin_content_home',
      });

    // todo: delete
    console.log('app.client.routes: OrangeClientRoutes');

    $urlRouterProvider
      .otherwise('/');

    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
  } // OrangeClientRoutesConfig


})();