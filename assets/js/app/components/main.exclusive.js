"use strict";

(function () {

  angular.module('OrangeClient')
    .controller('MainExclusiveCtrl', MainExclusiveCtrl)
    .component('smallPanel', {
      bindings: {
        badge: '<',
        type: '<',
        img: '<',
        content: '<'
      },
      templateUrl: 'templates/view/main/exclusivePanel.html'
    });

  MainExclusiveCtrl.$inject = ['ExclusiveService', '$log', '$rootScope'];
  function MainExclusiveCtrl(ExclusiveService, $log, $rootScope) {
    var vm = this;
    vm.panelGroups = [];
    vm.innerGroup = [];
    vm.panels = [];

/*    vm.panels = [
      {
        badge: true,
        type: 'badge-hit',
        img: {
          href: '../../images/30593_700x500.jpg',
          dataLightbox: '1',
          dataTitle: 'Комментарий к фото',
          src: '../../images/30593_700x500.jpg'
        },
        content: [
          { label: 'Адрес:',
            text: 'Lorem ipsum dolor sit amet.'},
          { label: 'Тип объекта:',
            text: 'Lorem ipsum'},
          { label: 'Кол. комнат:',
            text: '3'},
          { label: 'Тип сделки:',
            text: 'Lorem ipsum dolor sit amet.'},
          { label: 'Стоимость:',
            text: 'Lorem ipsum dolor'}
        ]
      },
      {
        badge: false,
        img: {
          href: '../../images/30593_700x500.jpg',
          dataLightbox: '2',
          dataTitle: 'Комментарий к фото',
          src: '../../images/30593_700x500.jpg'
        },
        content: [
          { label: 'Адрес:',
            text: '11111111111111 11111111111 1111111111 111111111111 1111111111111 111111111'},
          { label: 'Тип объекта:',
            text: '222222222'},
          { label: 'Кол. комнат:',
            text: '3'},
          { label: 'Тип сделки:',
            text: '33333333333'},
          { label: 'Стоимость:',
            text: '444444444444'}
        ]
      },
      {
        badge: true,
        type: 'badge-saleoff',
        img: {
          href: '../../images/30593_700x500.jpg',
          dataLightbox: '3',
          dataTitle: 'Комментарий к фото',
          src: '../../images/30593_700x500.jpg'
        },
        content: [
          { label: 'Адрес:',
            text: '55555555555'},
          { label: 'Тип объекта:',
            text: '7777777777777'}
        ]
      },
      {
        badge: true,
        type: 'badge-hit',
        img: {
          href: '../../images/30593_700x500.jpg',
          dataLightbox: '1',
          dataTitle: 'Комментарий к фото',
          src: '../../images/30593_700x500.jpg'
        },
        content: [
          { label: 'Адрес:',
            text: 'Lorem ipsum dolor sit amet.'},
          { label: 'Тип объекта:',
            text: 'Lorem ipsum'},
          { label: 'Кол. комнат:',
            text: '3'},
          { label: 'Тип сделки:',
            text: 'Lorem ipsum dolor sit amet.'},
          { label: 'Стоимость:',
            text: 'Lorem ipsum dolor'}
        ]
      },
      {
        badge: false,
        img: {
          href: '../../images/30593_700x500.jpg',
          dataLightbox: '2',
          dataTitle: 'Комментарий к фото',
          src: '../../images/30593_700x500.jpg'
        },
        content: [
          { label: 'Адрес:',
            text: '11111111111111'},
          { label: 'Тип объекта:',
            text: '222222222'},
          { label: 'Кол. комнат:',
            text: '3'},
          { label: 'Тип сделки:',
            text: '33333333333'},
          { label: 'Стоимость:',
            text: '444444444444'}
        ]
      }
    ];*/

    loadPanels();
    buildPanelGroups();

    function loadPanels() {

    }

    function buildPanelGroups () {
      for (var i = 1; i < vm.panels.length+1; i++) {
        vm.innerGroup.push(vm.panels[i-1]);
        if (i % 3 == 0) {
          vm.panelGroups.push(vm.innerGroup);
          vm.innerGroup = [];
        }
      }
      if (vm.innerGroup.length != 0) vm.panelGroups.push(vm.innerGroup);
    }

  }
  

})();