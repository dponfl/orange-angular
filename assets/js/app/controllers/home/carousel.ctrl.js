"use strict";

(function () {
  angular.module('OrangeClient')
    .controller('CarouselCtrl',CarouselCtrl);

  // CarouselCtrl.$inject = ['$scope'];
  function CarouselCtrl() {
    this.slides = [
      {
        // image: '//unsplash.it/1200/900',
        image: '../images/main_carousel_medium_01.jpg',
        alt: 'Img01',
        title: 'HOME_CAROUSEL_TITLE_1',
        text: 'HOME_CAROUSEL_TEXT_1',
        active: true,
        id: 1
      },
      {
        // image: '//unsplash.it/1201/900',
        image: '../images/main_carousel_medium_02.jpg',
        alt: 'Img02',
        title: 'HOME_CAROUSEL_TITLE_2',
        text: 'HOME_CAROUSEL_TEXT_2',
        active: false,
        id: 2
      },
      {
        // image: '//unsplash.it/1202/900',
        image: '../images/main_carousel_medium_03.jpg',
        alt: 'Img03',
        title: 'HOME_CAROUSEL_TITLE_3',
        text: 'HOME_CAROUSEL_TEXT_3',
        active: false,
        id: 3
      }
    ];
  }
})();