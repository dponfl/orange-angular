"use strict";

(function () {
  function MainExclusiveCtrl() {
    this.panelGroups = [];
    this.innerGroup = [];
    this.panels = [
      {
        hit: true,
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
        hit: false,
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
        hit: true,
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
            text: '7777777777777'},
          /*{ label: 'Кол. комнат:',
            text: '3'},
          { label: 'Тип сделки:',
            text: '888888888888.'},
          { label: 'Стоимость:',
            text: '99999999999999'}*/
        ]
      },
      {
        hit: true,
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
        hit: false,
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
      },
/*
      {
        hit: true,
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
            text: '7777777777777'},
          { label: 'Кол. комнат:',
           text: '3'},
           { label: 'Тип сделки:',
           text: '888888888888.'},
           { label: 'Стоимость:',
           text: '99999999999999'}
        ]
      }
*/
    ];
    for (let i = 1; i < this.panels.length+1; i++) {
      this.innerGroup.push(this.panels[i-1]);
      if (i % 3 == 0) {
        this.panelGroups.push(this.innerGroup);
        this.innerGroup = [];
      }
    }
    if (this.innerGroup.length != 0) this.panelGroups.push(this.innerGroup);
  }
  
  angular.module('Orange')
    .controller('MainExclusiveCtrl', MainExclusiveCtrl)
    .component('smallPanel', {
      bindings: {
        hit: '<',
        img: '<',
        content: '<'
      },
      templateUrl: 'templates/view/main/exclusivePanel.html'
    })
})();