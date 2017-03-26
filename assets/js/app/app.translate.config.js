angular
    .module('app.translate.module')
    .config(translateConfig);

translateConfig.$inject = ['$translateProvider'];

/* @ngInject */
function translateConfig ($translateProvider) {
  $translateProvider.translations('en', {

    // Main menu items
    'NAV_HOME': 'Home',
    'NAV_EXCLUSIVE': 'Exclusive',
    'NAV_DAILY': 'Daily',
    'NAV_LONG_TERM': 'Long term',
    'NAV_SALES': 'Sales',
    'NAV_QA': 'Q&A',
    'NAV_SERVICES': 'Services',
    'NAV_CONTACTS': 'Contacts',
    'NAV_REQ_BUTTON': 'Make request',

    // Request button dropdown menu items
    'NAV_REQ_DAILY': 'Daily rent',
    'NAV_REQ_LONG_TERM': 'Long term rent',
    'NAV_REQ_LET_PROP': 'Let property',
    'NAV_REQ_BUY_PROP': 'Buy property',
    'NAV_REQ_SELL_PROP': 'Sell property',

    // Filter form items
    'PANEL_HEADER': 'Choose',
    'LBL_DEAL': 'Deal type',
    'LBL_OBJ': 'Object type',
    'LBL_CITY': 'City',
    'LBL_ROOM': 'Number of rooms',
    'LBL_OBJ_NUM': 'Object number',
    'OBJ_NUM_PLACEHOLDER': 'Object #',
    'BTN_FIND': 'Find',
    'BTN_CLR': 'Clear',
    'AV_REQ': 'reqEn',

    // Home - Carousel
    'HOME_CAROUSEL_TITLE_1': 'Slide 01 message',
    'HOME_CAROUSEL_TEXT_1': 'Text for Slide 01',
    'HOME_CAROUSEL_TITLE_2': 'Slide 02 message',
    'HOME_CAROUSEL_TEXT_2': 'Text for Slide 02',
    'HOME_CAROUSEL_TITLE_3': 'Slide 03 message',
    'HOME_CAROUSEL_TEXT_3': 'Text for Slide 03',

    // Home - Main
    'HOME_TITLE_H1': '[En]Недвижимость на Кипре',

    // Home - Exclusive

    // Exclusive
    'PAGE_HEADER_TITLE': '[En]Эксклюзивные объекты',
    'PAGE_HEADER_SUBTITLE': '[En]Несколько слов...',
    'PAGE_BODY_H1': '[En]Эксклюзивные объекты недвижимости',
    'PAGE_BODY_H2': '[En]Аренда вилл и аппартаментов на Кипре',
    'PAGE_BODY_H3': '[En]Здесь представлена недвижимость, которая находится ' +
    'в эксклюзивном управлении компании Orange Holliday villas.',
    'ELEM_OBJ': 'Object #',
  });

  $translateProvider.translations('ru', {

    // Main menu items
    'NAV_HOME': 'Главная',
    'NAV_EXCLUSIVE': 'Эксклюзив',
    'NAV_DAILY': 'Посуточная аренда',
    'NAV_LONG_TERM': 'Долгосрочная аренда',
    'NAV_SALES': 'Продажа',
    'NAV_QA': 'Вопросы',
    'NAV_SERVICES': 'Доп. услуги',
    'NAV_CONTACTS': 'Контакты',
    'NAV_REQ_BUTTON': 'Оставить заявку',

    // Request button dropdown menu items
    'NAV_REQ_DAILY': 'Снять недв. посуточно',
    'NAV_REQ_LONG_TERM': 'Снять недв. долгосрочно',
    'NAV_REQ_LET_PROP': 'Сдать недвижимость',
    'NAV_REQ_BUY_PROP': 'Купить недвижимость',
    'NAV_REQ_SELL_PROP': 'Продать недвижимость',

    // Filter form items
    'PANEL_HEADER': 'Задайте условия поиска',
    'LBL_DEAL': 'Тип сделки',
    'LBL_OBJ': 'Тип объекта',
    'LBL_CITY': 'Город',
    'LBL_ROOM': 'Кол-во комнат',
    'LBL_OBJ_NUM': 'Номер объекта',
    'OBJ_NUM_PLACEHOLDER': '№ объекта',
    'BTN_FIND': 'Найти',
    'BTN_CLR': 'Очистить',
    'AV_REQ': 'reqRu',

    // Home - Carousel
    'HOME_CAROUSEL_TITLE_1': 'Слайд 01',
    'HOME_CAROUSEL_TEXT_1': 'Текст для слайда 01',
    'HOME_CAROUSEL_TITLE_2': 'Слайд 02',
    'HOME_CAROUSEL_TEXT_2': 'Текст для слайда 02',
    'HOME_CAROUSEL_TITLE_3': 'Слайд 03',
    'HOME_CAROUSEL_TEXT_3': 'Текст для слайда 03',


    // Home - Main
    'HOME_TITLE_H1': 'Недвижимость на Кипре',

    // Home - Exclusive


    // Exclusive
    'PAGE_HEADER_TITLE': 'Эксклюзивные объекты',
    'PAGE_HEADER_SUBTITLE': 'Несколько слов...',
    'PAGE_BODY_H1': 'Эксклюзивные объекты недвижимости',
    'PAGE_BODY_H2': 'Аренда вилл и аппартаментов на Кипре',
    'PAGE_BODY_H3': 'Здесь представлена недвижимость, которая находится ' +
    'в эксклюзивном управлении компании Orange Holliday villas.',
    'ELEM_OBJ': 'Объект №',
  });

  $translateProvider.preferredLanguage('en');
  $translateProvider.useSanitizeValueStrategy('escape');
}