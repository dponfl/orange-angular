"use strict";

(function () {
  angular.module('OrangeClient')
    .controller('CarouselCtrl',CarouselCtrl);

  CarouselCtrl.$inject = ['$rootScope'];
  function CarouselCtrl($rootScope) {

    var vm = this;

    vm.useLang = $rootScope.lang;
    vm.slides = [];
    vm.slidesPic = $rootScope.orangeConfig.contentHome[vm.useLang][0].imgCarousel.split(';');

    _update();

    $rootScope.$watch('lang', _update);

    function _update() {

      vm.useLang = $rootScope.lang;

      vm.slides = [
        {
          // image: '//unsplash.it/1200/900',
          // image: '../images/main_carousel_medium_01.jpg',
          image: vm.slidesPic[0] || '../images/main_carousel_medium_01.jpg',
          alt: 'Img01',
          title: $rootScope.orangeConfig.contentHome[vm.useLang][0].slide_01_title || '',
          text: $rootScope.orangeConfig.contentHome[vm.useLang][0].slide_01_text || '',
          active: true,
          id: 1
        },
        {
          // image: '//unsplash.it/1201/900',
          image: vm.slidesPic[1] || '../images/main_carousel_medium_02.jpg',
          alt: 'Img02',
          title: $rootScope.orangeConfig.contentHome[vm.useLang][0].slide_02_title || '',
          text: $rootScope.orangeConfig.contentHome[vm.useLang][0].slide_02_text || '',
          active: false,
          id: 2
        },
        {
          // image: '//unsplash.it/1202/900',
          image: vm.slidesPic[2] || '../images/main_carousel_medium_03.jpg',
          alt: 'Img03',
          title: $rootScope.orangeConfig.contentHome[vm.useLang][0].slide_03_title || '',
          text: $rootScope.orangeConfig.contentHome[vm.useLang][0].slide_03_text || '',
          active: false,
          id: 3
        }
      ];
    } // _update

  } // CarouselCtrl
})();