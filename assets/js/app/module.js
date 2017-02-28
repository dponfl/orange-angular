"use strict";

(function () {

  angular.module('Project', [
    'ngRoute',
    'ngResource'
  ]).config(ProjectConfig);

  ProjectConfig.$inject = ['$routeProvider','$locationProvider'];
  function ProjectConfig($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
      // templateUrl: 'templates/view/home.html',
      // controller: 'HomeController'
      templateUrl: 'templates/view/page.html',
    })
      .when('/test', {
        templateUrl: 'templates/view/test.html'
      })
      .when('/404', {
        templateUrl: 'templates/view/404.html'
      })
      .otherwise({
      redirectTo: '/404'
    });

    $locationProvider.hashPrefix('');
  }


})();