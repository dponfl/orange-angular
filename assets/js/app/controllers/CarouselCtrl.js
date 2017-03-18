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
        title: 'Slide 01 message',
        text: 'Text for Slide 01',
        active: true,
        id: 1
      },
      {
        // image: '//unsplash.it/1201/900',
        image: '../images/main_carousel_medium_02.jpg',
        alt: 'Img02',
        title: 'Slide 02 message',
        text: 'Text for Slide 02',
        active: false,
        id: 2
      },
      {
        // image: '//unsplash.it/1202/900',
        image: '../images/main_carousel_medium_03.jpg',
        alt: 'Img03',
        title: 'Slide 03 message',
        text: 'Text for Slide 03',
        active: false,
        id: 3
      }
    ];
  }
})();