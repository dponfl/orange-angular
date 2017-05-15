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

    // Callback or request forms
    'LBL_FIELD_OBJ': 'Object',
    'LBL_FIELD_DATE_START': 'Date start',
    'LBL_FIELD_DATE_END': 'Date end',
    'LBL_FIELD_NAME': 'Your name',
    'LBL_FIELD_EMAIL': 'Your email',
    'LBL_FIELD_PHONE': 'Your phone',
    'LBL_FIELD_SKYPE': 'Your Skype',
    'LBL_FIELD_WHATSAPP': 'Your WhatsApp',
    'LBL_FIELD_TELEGRAM': 'Your Telegram',
    'LBL_FIELD_VIBER': 'Your Viber',
    'LBL_FIELD_ADDINFO': 'Additional Info',
    'FIELD_NAME_ERR': 'nameErrEn',
    'FIELD_EMAIL_ERR': 'emailErrEn',
    'BTN_SUBMIT': 'Submit',

    // Home - Carousel
    'HOME_CAROUSEL_TITLE_1': 'Slide 01 message',
    'HOME_CAROUSEL_TEXT_1': 'Text for Slide 01',
    'HOME_CAROUSEL_TITLE_2': 'Slide 02 message',
    'HOME_CAROUSEL_TEXT_2': 'Text for Slide 02',
    'HOME_CAROUSEL_TITLE_3': 'Slide 03 message',
    'HOME_CAROUSEL_TEXT_3': 'Text for Slide 03',

    // Home - Main
    'HOME_TITLE_H1': '[En]Недвижимость на Кипре',
    'HOME_SUBTITLE': '[En]Несколько слов о том, что мы будем рады вам предложить...',
    'HOME_PAGE_BODY_LEAD': '[En]Лудус утрояуе оцурререт ет мел, видит цонтентионес ин иус! ' +
    'Яуот опортере те дуо, фабеллас цонсулату еум еи. Ех солеат пхилосопхиа при?',
    'HOME_PAGE_BODY_P_1': '[En]Лорем ипсум долор сит амет, не дицит легере еос, еос еу волутпат цомпрехенсам, ' +
    'не хас долор омиттам! При утамур сингулис адиписцинг не, не алии ехерци дуо. ' +
    'Тота игнота алияуандо ан яуо, хабео яуидам хендрерит те яуо. Меи ерипуит фацилис ' +
    'перицулис не, виси адиписци ад меи. Вел прима интегре те, вениам адверсариум вим цу. ' +
    'Долорум мнесарчум диссентиунт иус не, но агам примис видерер нец. Еа поссе миним ' +
    'дицерет сеа, усу менандри цонсулату еи.',
    'HOME_PAGE_BODY_P_2': '[En]Лорем ипсум долор сит амет, не дицит легере еос, еос еу волутпат цомпрехенсам, ' +
    'не хас долор омиттам! При утамур сингулис адиписцинг не, не алии ехерци дуо. ' +
    'Тота игнота алияуандо ан яуо, хабео яуидам хендрерит те яуо. Меи ерипуит фацилис ' +
    'перицулис не, виси адиписци ад меи. Вел прима интегре те, вениам адверсариум вим цу. ' +
    'Долорум мнесарчум диссентиунт иус не, но агам примис видерер нец. Еа поссе миним ' +
    'дицерет сеа, усу менандри цонсулату еи.',
    'HOME_PAGE_BODY_P_3': '[En]Лорем ипсум долор сит амет, не дицит легере еос, еос еу волутпат цомпрехенсам, ' +
    'не хас долор омиттам! При утамур сингулис адиписцинг не, не алии ехерци дуо. ' +
    'Тота игнота алияуандо ан яуо, хабео яуидам хендрерит те яуо. Меи ерипуит фацилис ' +
    'перицулис не, виси адиписци ад меи. Вел прима интегре те, вениам адверсариум вим цу. ' +
    'Долорум мнесарчум диссентиунт иус не, но агам примис видерер нец. Еа поссе миним ' +
    'дицерет сеа, усу менандри цонсулату еи.',

    // General
    'GENERAL_ELEM_OBJ': 'Object #',
    'GENERAL_ELEM_MORE_DETAILS': 'More details...',
    'GENERAL_FOUND_NOTHING_HEADER': 'Nothing found...',
    'GENERAL_FOUND_NOTHING': 'Nothing found. Change search criteria and try again.',
    'GENERAL_LOADING_SPINNER': 'Loading...',

    // Exclusive
    'EXCLUSIVE_PAGE_HEADER_TITLE': '[En]Эксклюзивные объекты',
    'EXCLUSIVE_PAGE_HEADER_SUBTITLE': '[En]Несколько слов...',
    'EXCLUSIVE_PAGE_BODY_H1': '[En]Эксклюзивные объекты недвижимости',
    'EXCLUSIVE_PAGE_BODY_H2': '[En]Аренда вилл и аппартаментов на Кипре',
    'EXCLUSIVE_PAGE_BODY_H3': '[En]Здесь представлена недвижимость, которая находится ' +
    'в эксклюзивном управлении компании Orange Holliday villas.',
    'EXCLUSIVE_PAGE_MORE_OBJ': '[En]Подробная информация об этих и других эксклюзивных объектах',
    'EXCLUSIVE_PAGE_BUTTON_PRICE': 'Price',
    'EXCLUSIVE_PAGE_PRICE_MODAL_HEADER': 'Price',
    'EXCLUSIVE_PAGE_PRICE_MODAL_TABLE_HEAD_COL_1': 'Period',
    'EXCLUSIVE_PAGE_PRICE_MODAL_TABLE_HEAD_COL_2': 'Price',
    'EXCLUSIVE_PAGE_MODAL_FOOTER_CLOSE_BUTTON': 'Close',
    'EXCLUSIVE_PAGE_BUTTON_CALENDAR': 'Calendar',
    'EXCLUSIVE_PAGE_CALENDAR_MODAL_HEADER': 'Calendar',
    'EXCLUSIVE_PAGE_BUTTON_BOOK_OBJECT': 'Book this object',
    'EXCLUSIVE_PAGE_BUTTON_YOUTUBE': 'See object in YouTube',
    'EXCLUSIVE_PAGE_BOOK_OBJECT_MODAL_HEADER': 'Object booking',

    // Short term
    'SHORTTERM_PAGE_HEADER_TITLE': '[En]Посуточная аренда',
    'SHORTTERM_PAGE_HEADER_SUBTITLE': '[En]Несколько слов...',
    'SHORTTERM_PAGE_MORE_OBJ': '[En]Подробная информация об этих и других объектах с посуточной арендой',
    'SHORTTERM_PAGE_BUTTON_PRICE': 'Price',
    'SHORTTERM_PAGE_PRICE_MODAL_HEADER': 'Price',
    'SHORTTERM_PAGE_PRICE_MODAL_TABLE_HEAD_COL_1': 'Period',
    'SHORTTERM_PAGE_PRICE_MODAL_TABLE_HEAD_COL_2': 'Price',
    'SHORTTERM_PAGE_MODAL_FOOTER_CLOSE_BUTTON': 'Close',
    'SHORTTERM_PAGE_BUTTON_CALENDAR': 'Calendar',
    'SHORTTERM_PAGE_CALENDAR_MODAL_HEADER': 'Calendar',
    'SHORTTERM_PAGE_BUTTON_BOOK_OBJECT': 'Book this object',
    'SHORTTERM_PAGE_BUTTON_YOUTUBE': 'See object in YouTube',
    'SHORTTERM_PAGE_BOOK_OBJECT_MODAL_HEADER': 'Object booking',


    // Long term
    'LONGTERM_PAGE_HEADER_TITLE': '[En]Долгосрочная аренда',
    'LONGTERM_PAGE_HEADER_SUBTITLE': '[En]Несколько слов...',
    'LONGTERM_PAGE_MORE_OBJ': '[En]Подробная информация об этих и других объектах с долгосрочной арендой',
    'LONGTERM_PAGE_BUTTON_BOOK_OBJECT': 'Book this object',
    'LONGTERM_PAGE_BUTTON_YOUTUBE': 'See object in YouTube',
    'LONGTERM_PAGE_BOOK_OBJECT_MODAL_HEADER': 'Object booking',
    'LONGTERM_PAGE_MODAL_FOOTER_CLOSE_BUTTON': 'Close',


    // Sale
    'SALE_PAGE_HEADER_TITLE': '[En]Продажа',
    'SALE_PAGE_HEADER_SUBTITLE': '[En]Несколько слов...',
    'SALE_PAGE_MORE_OBJ': '[En]Подробная информация об этих и других объектах продажи',
    'SALE_PAGE_BUTTON_BOOK_OBJECT': 'Book this object',
    'SALE_PAGE_BUTTON_YOUTUBE': 'See object in YouTube',
    'SALE_PAGE_BOOK_OBJECT_MODAL_HEADER': 'Object booking',
    'SALE_PAGE_MODAL_FOOTER_CLOSE_BUTTON': 'Close',

    // Q&A
    'QA_PAGE_HEADER_TITLE': '[En]Вопросы и ответы',
    'QA_PAGE_HEADER_SUBTITLE': '[En]Несколько слов...',

    // Services
    'SERVICES_PAGE_HEADER_TITLE': '[En]Дополнительные услуги',
    'SERVICES_PAGE_HEADER_SUBTITLE': '[En]Несколько слов...',

    // Contacts
    'CONTACTS_PAGE_HEADER_TITLE': '[En]Наши контакты',
    'CONTACTS_PAGE_HEADER_SUBTITLE': '[En]Несколько слов...',


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

    // Callback or request forms
    'LBL_FIELD_OBJ': 'Объект',
    'LBL_FIELD_DATE_START': 'Дата начала',
    'LBL_FIELD_DATE_END': 'Дата окончания',
    'LBL_FIELD_NAME': 'Ваше имя',
    'LBL_FIELD_EMAIL': 'Ваш email',
    'LBL_FIELD_PHONE': 'Ваш телефон',
    'LBL_FIELD_SKYPE': 'Ваш Skype',
    'LBL_FIELD_WHATSAPP': 'Ваш WhatsApp',
    'LBL_FIELD_TELEGRAM': 'Ваш Telegram',
    'LBL_FIELD_VIBER': 'Ваш Viber',
    'LBL_FIELD_ADDINFO': 'Доп. информация',
    'FIELD_NAME_ERR': 'nameErrRu',
    'FIELD_EMAIL_ERR': 'emailErrRu',
    'BTN_SUBMIT': 'Отправить',


    // Home - Carousel
    'HOME_CAROUSEL_TITLE_1': 'Слайд 01',
    'HOME_CAROUSEL_TEXT_1': 'Текст для слайда 01',
    'HOME_CAROUSEL_TITLE_2': 'Слайд 02',
    'HOME_CAROUSEL_TEXT_2': 'Текст для слайда 02',
    'HOME_CAROUSEL_TITLE_3': 'Слайд 03',
    'HOME_CAROUSEL_TEXT_3': 'Текст для слайда 03',

    // Home - Main
    'HOME_TITLE_H1': 'Недвижимость на Кипре',
    'HOME_SUBTITLE': 'Несколько слов о том, что мы будем рады вам предложить...',
    'HOME_PAGE_BODY_LEAD': 'Лудус утрояуе оцурререт ет мел, видит цонтентионес ин иус! ' +
    'Яуот опортере те дуо, фабеллас цонсулату еум еи. Ех солеат пхилосопхиа при?',
    'HOME_PAGE_BODY_P_1': 'Лорем ипсум долор сит амет, не дицит легере еос, еос еу волутпат цомпрехенсам, ' +
    'не хас долор омиттам! При утамур сингулис адиписцинг не, не алии ехерци дуо. ' +
    'Тота игнота алияуандо ан яуо, хабео яуидам хендрерит те яуо. Меи ерипуит фацилис ' +
    'перицулис не, виси адиписци ад меи. Вел прима интегре те, вениам адверсариум вим цу. ' +
    'Долорум мнесарчум диссентиунт иус не, но агам примис видерер нец. Еа поссе миним ' +
    'дицерет сеа, усу менандри цонсулату еи.',
    'HOME_PAGE_BODY_P_2': 'Лорем ипсум долор сит амет, не дицит легере еос, еос еу волутпат цомпрехенсам, ' +
    'не хас долор омиттам! При утамур сингулис адиписцинг не, не алии ехерци дуо. ' +
    'Тота игнота алияуандо ан яуо, хабео яуидам хендрерит те яуо. Меи ерипуит фацилис ' +
    'перицулис не, виси адиписци ад меи. Вел прима интегре те, вениам адверсариум вим цу. ' +
    'Долорум мнесарчум диссентиунт иус не, но агам примис видерер нец. Еа поссе миним ' +
    'дицерет сеа, усу менандри цонсулату еи.',
    'HOME_PAGE_BODY_P_3': 'Лорем ипсум долор сит амет, не дицит легере еос, еос еу волутпат цомпрехенсам, ' +
    'не хас долор омиттам! При утамур сингулис адиписцинг не, не алии ехерци дуо. ' +
    'Тота игнота алияуандо ан яуо, хабео яуидам хендрерит те яуо. Меи ерипуит фацилис ' +
    'перицулис не, виси адиписци ад меи. Вел прима интегре те, вениам адверсариум вим цу. ' +
    'Долорум мнесарчум диссентиунт иус не, но агам примис видерер нец. Еа поссе миним ' +
    'дицерет сеа, усу менандри цонсулату еи.',

    // General
    'GENERAL_ELEM_OBJ': 'Объект №',
    'GENERAL_ELEM_MORE_DETAILS': 'Подробнее...',
    'GENERAL_FOUND_NOTHING_HEADER': 'Ничего не найдено...',
    'GENERAL_FOUND_NOTHING': 'По вашему запросу ничего не найдено. Измените условия и повторите поиск.',
    'GENERAL_LOADING_SPINNER': 'Информация загружается...',



    // Exclusive
    'EXCLUSIVE_PAGE_HEADER_TITLE': 'Эксклюзивные объекты',
    'EXCLUSIVE_PAGE_HEADER_SUBTITLE': 'Несколько слов...',
    'EXCLUSIVE_PAGE_BODY_H1': 'Эксклюзивные объекты недвижимости',
    'EXCLUSIVE_PAGE_BODY_H2': 'Аренда вилл и аппартаментов на Кипре',
    'EXCLUSIVE_PAGE_BODY_H3': 'Здесь представлена недвижимость, которая находится ' +
    'в эксклюзивном управлении компании Orange Holliday villas.',
    'EXCLUSIVE_PAGE_MORE_OBJ': 'Подробная информация об этих и других эксклюзивных объектах',
    'EXCLUSIVE_PAGE_BUTTON_PRICE': 'Стоимость',
    'EXCLUSIVE_PAGE_PRICE_MODAL_HEADER': 'Стоимость',
    'EXCLUSIVE_PAGE_PRICE_MODAL_TABLE_HEAD_COL_1': 'Период',
    'EXCLUSIVE_PAGE_PRICE_MODAL_TABLE_HEAD_COL_2': 'Стоимость',
    'EXCLUSIVE_PAGE_MODAL_FOOTER_CLOSE_BUTTON': 'Закрыть',
    'EXCLUSIVE_PAGE_BUTTON_CALENDAR': 'Календарь занятости',
    'EXCLUSIVE_PAGE_CALENDAR_MODAL_HEADER': 'Календарь занятости',
    'EXCLUSIVE_PAGE_BUTTON_BOOK_OBJECT': 'Забронировать этот объект',
    'EXCLUSIVE_PAGE_BUTTON_YOUTUBE': 'Посмотреть объект в YouTube',
    'EXCLUSIVE_PAGE_BOOK_OBJECT_MODAL_HEADER': 'Бронирование объекта',

    // Short term
    'SHORTTERM_PAGE_HEADER_TITLE': 'Посуточная аренда',
    'SHORTTERM_PAGE_HEADER_SUBTITLE': 'Несколько слов...',
    'SHORTTERM_PAGE_MORE_OBJ': 'Подробная информация об этих и других объектах с посуточной арендой',
    'SHORTTERM_PAGE_BUTTON_PRICE': 'Стоимость',
    'SHORTTERM_PAGE_PRICE_MODAL_HEADER': 'Стоимость',
    'SHORTTERM_PAGE_PRICE_MODAL_TABLE_HEAD_COL_1': 'Период',
    'SHORTTERM_PAGE_PRICE_MODAL_TABLE_HEAD_COL_2': 'Стоимость',
    'SHORTTERM_PAGE_MODAL_FOOTER_CLOSE_BUTTON': 'Закрыть',
    'SHORTTERM_PAGE_BUTTON_CALENDAR': 'Календарь занятости',
    'SHORTTERM_PAGE_CALENDAR_MODAL_HEADER': 'Календарь занятости',
    'SHORTTERM_PAGE_BUTTON_BOOK_OBJECT': 'Забронировать этот объект',
    'SHORTTERM_PAGE_BUTTON_YOUTUBE': 'Посмотреть объект в YouTube',
    'SHORTTERM_PAGE_BOOK_OBJECT_MODAL_HEADER': 'Бронирование объекта',


    // Long term
    'LONGTERM_PAGE_HEADER_TITLE': 'Долгосрочная аренда',
    'LONGTERM_PAGE_HEADER_SUBTITLE': 'Несколько слов...',
    'LONGTERM_PAGE_MORE_OBJ': 'Подробная информация об этих и других объектах с долгосрочной арендой',
    'LONGTERM_PAGE_BUTTON_BOOK_OBJECT': 'Забронировать этот объект',
    'LONGTERM_PAGE_BUTTON_YOUTUBE': 'Посмотреть объект в YouTube',
    'LONGTERM_PAGE_BOOK_OBJECT_MODAL_HEADER': 'Бронирование объекта',
    'LONGTERM_PAGE_MODAL_FOOTER_CLOSE_BUTTON': 'Закрыть',



    // Sale
    'SALE_PAGE_HEADER_TITLE': 'Продажа',
    'SALE_PAGE_HEADER_SUBTITLE': 'Несколько слов...',
    'SALE_PAGE_MORE_OBJ': 'Подробная информация об этих и других объектах продажи',
    'SALE_PAGE_BUTTON_BOOK_OBJECT': 'Забронировать этот объект',
    'SALE_PAGE_BUTTON_YOUTUBE': 'Посмотреть объект в YouTube',
    'SALE_PAGE_BOOK_OBJECT_MODAL_HEADER': 'Бронирование объекта',
    'SALE_PAGE_MODAL_FOOTER_CLOSE_BUTTON': 'Закрыть',

    // Q&A
    'QA_PAGE_HEADER_TITLE': 'Вопросы и ответы',
    'QA_PAGE_HEADER_SUBTITLE': 'Несколько слов...',

    // Services
    'SERVICES_PAGE_HEADER_TITLE': 'Дополнительные услуги',
    'SERVICES_PAGE_HEADER_SUBTITLE': 'Несколько слов...',

    // Contacts
    'CONTACTS_PAGE_HEADER_TITLE': 'Наши контакты',
    'CONTACTS_PAGE_HEADER_SUBTITLE': 'Несколько слов...',


  });

  $translateProvider.preferredLanguage('en');
  $translateProvider.useSanitizeValueStrategy('escape');
}