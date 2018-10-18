angular
    .module('app.translate.module')
    .config(translateConfig);

translateConfig.$inject = ['$translateProvider'];

/* @ngInject */
function translateConfig ($translateProvider) {
  $translateProvider.translations('en', {

    // Header
    'HEADER_OFFICE_PHONE': 'Office',
    'HEADER_MOBILE_PHONE': 'Mobile',
    'HEADER_SKYPE_PHONE': 'Skype',
    'HEADER_SEND_MESSAGE_1': 'Send',
    'HEADER_SEND_MESSAGE_2': 'message',

    // Admin
    'HEADER_ADMIN_LOGIN': 'Login',
    'HEADER_ADMIN_ACCOUNT': 'Account',
    'BTN_ADMIN_LOGOUT': 'Logout',
    'BTN_ADMIN_CREATE': 'Create',
    'BTN_ADMIN_UPDATE': 'Update record',
    'BTN_ADMIN_DECLINE': 'Cancel update',
    'BTN_ADMIN_LOGIN': 'Login',
    'BTN_ADMIN_CLEAR': 'Clear',
    'HEADER_PANEL_EDIT': 'Edit object #',
    'MSG_ADMIN_SECTION' : 'Admin section',
    'MSG_ADMIN_SECTION_2' : 'Use menu on the top to select information to be edited',
    'TITLE_SIGNIN': 'Sign in',
    'TITLE_SIGNUP': 'Sign up',
    'LOGIN_LABEL': 'User name',
    'LOGIN_TEXT': 'Enter user name',
    'PASSWORD_LABEL': 'Password',
    'PASSWORD_TEXT': 'Enter password',
    'MSG_WRONG_PASSWORD': 'Wrong login/password',
    'MSG_WRONG_SIGNUP': 'This profile was created already. Pls sign in at /login',
    'MSG_WRONG_SIGNUP_2': 'This user does not exist. Pls contact administrator.',
    'MSG_WRONG_SIGNUP_3': 'This user does not have Admin rights. Pls contact administrator.',
    'MSG_WRONG_SIGNUP_4': 'Passwords are to be equal. Pls try again.',
    'MSG_WRONG_SIGNUP_5': 'This user is authorized already.',
    'MSG_WRONG_SIGNUP_6': 'Invalid login/password. Pls try again.',
    'MSG_GEN_ERROR': 'Server error. Pls contact administrator.',
    'HEADER_USER': 'User:',
    'HEADER_LOGOUT': 'Logout',
    'NAV_CONTENT_HOME': 'Home page',

    'CONTENT_HOME_PAGE_HEADER_TITLE': 'Home page editor',


    'LBL_HOME_TITLE': 'Home page: Title',
    'OBJ_HOME_TITLE_PLACEHOLDER': 'Home page: Title',
    'LBL_HOME_BODY_LEAD': 'Home page: Lead paragraph',
    'OBJ_HOME_BODY_LEAD_PLACEHOLDER': 'Home page: Lead paragraph',
    'LBL_HOME_BODY_P_1': 'Home page: 1st paragraph',
    'OBJ_HOME_BODY_P_1_PLACEHOLDER': 'Home page: 1st paragraph',
    'LBL_HOME_BODY_P_2': 'Home page: 2nd paragraph',
    'OBJ_HOME_BODY_P_2_PLACEHOLDER': 'Home page: 2nd paragraph',
    'LBL_HOME_BODY_P_3': 'Home page: 3rd paragraph',
    'OBJ_HOME_BODY_P_3_PLACEHOLDER': 'Home page: 3rd paragraph',

    'LBL_HOME_EXCLUSIVE_TITLE': 'Home, exclusive: Title',
    'OBJ_HOME_EXCLUSIVE_TITLE_PLACEHOLDER': 'Home, exclusive: Title',
    'LBL_HOME_EXCLUSIVE_H1': 'Home, exclusive: Sub-title 1',
    'OBJ_HOME_EXCLUSIVE_H1_PLACEHOLDER': 'Home, exclusive: Sub-title 2',
    'LBL_HOME_EXCLUSIVE_H2': 'Home, exclusive: Sub-title 1',
    'OBJ_HOME_EXCLUSIVE_H2_PLACEHOLDER': 'Home, exclusive: Sub-title 2',
    'LBL_HOME_EXCLUSIVE_MORE': 'Home, exclusive: Button',
    'OBJ_HOME_EXCLUSIVE_MORE_PLACEHOLDER': 'Home, exclusive: Button',

    'CONTENT_QA_PAGE_HEADER_TITLE': 'Q&A content editor',

    'LBL_Q': 'Question:',
    'LBL_A': 'Answer:',
    'LBL_QA_Q': 'Question',
    'LBL_QA_A': 'Answer',

    'CONTENT_SERVICE_PAGE_HEADER_TITLE': 'Service content editor',



    // Footer
    'FOOTER_ABOUT_COMPANY_TITLE': 'About us',
    'FOOTER_ABOUT_COMPANY_TEXT': '[En]Лорем ипсум долор сит амет, не дицит легере еос, ' +
    'еос еу волутпат цомпрехенсам, не хас долор омиттам! При утамур сингулис адиписцинг ' +
    'не, не алии ехерци дуо. Тота игнота алияуандо ан яуо, хабео яуидам хендрерит те яуо.',
    'FOOTER_NAVIGATION': 'Navigation',
    'FOOTER_SUBSCRIBE_TITLE': 'Subscribe to our news',
    'FOOTER_SUBSCRIBE_YOUTUBE': 'YouTube',
    'FOOTER_SUBSCRIBE_FACEBOOK': 'Facebook',
    'FOOTER_SUBSCRIBE_TWEETER': 'Tweeter',
    'FOOTER_SUBSCRIBE_GOOGLEPLUS': 'Google Plus',
    'FOOTER_DEVELOPER': 'Developed by',

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
    'LBL_SHOW': 'Show object',
    'LBL_EXCLUSIVE': 'Exclusive object',
    'LBL_HOME': 'Place at home page',
    'LBL_CITY': 'City',
    'LBL_ROOM': 'Number of rooms',
    'LBL_OBJ_NUM': 'Object number',
    'LBL_YOUTUBE': 'YouTube',
    'LBL_CALENDAR': 'Calendar',
    'OBJ_NUM_PLACEHOLDER': 'Object #',
    'OBJ_YOUTUBE_PLACEHOLDER': 'YouTube',
    'OBJ_FROM_PLACEHOLDER': 'From',
    'OBJ_TO_PLACEHOLDER': 'Until',
    'BTN_FIND': 'Find',
    'BTN_CLR': 'Clear',
    'AV_REQ': 'reqEn',

    // Callback or request forms
    'LBL_FIELD_OBJ': 'Object',
    'LBL_FIELD_DATE_START': 'Date start',
    'LBL_FIELD_DATE_END': 'Date end',
    'LBL_FIELD_DATE_FROM': 'from',
    'LBL_FIELD_DATE_TO': 'until',
    'LBL_FIELD_NAME': 'Your name',
    'LBL_FIELD_EMAIL': 'Email',
    'LBL_FIELD_PHONE': 'Phone',
    'LBL_FIELD_SKYPE': 'Skype',
    'LBL_FIELD_WHATSAPP': 'WhatsApp',
    'LBL_FIELD_TELEGRAM': 'Telegram',
    'LBL_FIELD_VIBER': 'Viber',
    'LBL_FIELD_ADDINFO': 'Additional Info',
    'LBL_FIELD_INFO': 'Message',
    'HEADER_INFO_SHORT': 'Short term rent information request',
    'HEADER_INFO_LONG': 'Long term rent information request',
    'HEADER_INFO_LET': 'Let property information submission',
    'HEADER_INFO_BUY': 'Buy property information request',
    'HEADER_INFO_SELL': 'Sell property information submission',
    'HEADER_INFO_GENERAL': 'Send message',
    'FIELD_NAME_ERR': 'nameErrEn',
    'FIELD_EMAIL_ERR': 'emailErrEn',
    'BTN_SUBMIT': 'Submit',
    'HEADER_INFO_MODAL_FOOTER_CLOSE_BUTTON': 'Close',
    'BTN_DELETE_INTERVAL': 'Delete',
    'BTN_ADD_INTERVAL': 'Add',



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

    // Header
    'HEADER_OFFICE_PHONE': 'Офис',
    'HEADER_MOBILE_PHONE': 'Мобильный',
    'HEADER_SKYPE_PHONE': 'Skype',
    'HEADER_SEND_MESSAGE_1': 'Отправить',
    'HEADER_SEND_MESSAGE_2': 'сообщение',

    // Admin
    'HEADER_ADMIN_LOGIN': 'Вход',
    'HEADER_ADMIN_ACCOUNT': 'Профиль',
    'BTN_ADMIN_LOGOUT': 'Выход',
    'BTN_ADMIN_CREATE': 'Создать',
    'BTN_ADMIN_UPDATE': 'Обновить объект',
    'BTN_ADMIN_DECLINE': 'Отменить редактирование объекта',
    'BTN_ADMIN_LOGIN': 'Вход',
    'BTN_ADMIN_CLEAR': 'Очистить',
    'LBL_OBJ_EXCLUSIVE': 'Эксклюзивный объект',
    'LBL_OBJ_SHOW': 'Объект открыт для показа',
    'LBL_OBJ_HOME': 'Размещать объект на главной странице',
    'LBL_TAG': 'Тег',
    'LBL_IMG_MAIN_LABEL_01': 'Выберите файл для основного изображения',
    'LBL_IMG_CAROUSEL_LABEL_01': 'Выберите 3 файла для изображений карусели',
    'LBL_IMG_MAIN_LABEL_02': 'Загрузка основного изображения',
    'LBL_IMG_MAIN_LABEL_03': 'Прогресс загрузки файла основного изображения:',
    'LBL_IMG_CAROUSEL_LABEL_03': 'Прогресс загрузки файлов карусели:',
    'LBL_IMG_GALLERY_LABEL_01': 'Выберите файлы для галлереи',
    'LBL_IMG_GALLERY_LABEL_02': 'Загрузка изображений галлереи',
    'LBL_IMG_CAROUSEL_LABEL_02': 'Загрузка изображений карусели',
    'LBL_IMG_GALLERY_LABEL_03': 'Прогресс загрузки файлов галлереи:',
    'LBL_IMG_GALLERY_LABEL_04': 'Кол-во файлов галлереи:',
    'LBL_IMG_CAROUSEL_LABEL_04': 'Кол-во файлов карусели:',
    'LBL_IMG_MAIN_BTN_REMOVE': 'Удалить',
    'LBL_IMG_MAIN_BTN_REMOVE_ALL': 'Удалить все изображения галлереи',
    'LBL_CAROUSEL_MAIN_BTN_REMOVE_ALL': 'Удалить все изображения карусели',
    'LBL_IMG_TBL_LABEL_NAME': 'Имя файла',
    'LBL_IMG_TBL_LABEL_SIZE': 'Размер',
    'LBL_IMG_TBL_LABEL_PROGRESS': 'Прогресс',
    'LBL_IMG_TBL_LABEL_STATUS': 'Статус',
    'LBL_IMG_TBL_LABEL_ACTION': 'Действие',
    'HEADER_PANEL_EDIT': 'Редактирование объекта #',
    'MSG_ADMIN_SECTION' : 'Административный раздел',
    'MSG_ADMIN_SECTION_2' : 'Используйте меню вверху страницы для выбора типа информации для редактирования',
    'TITLE_SIGNIN': 'Авторизация',
    'TITLE_SIGNUP': 'Активация профиля и создание пароля',
    'LOGIN_LABEL': 'Логин',
    'LOGIN_TEXT': 'Введите имя пользователя',
    'PASSWORD_LABEL': 'Пароль',
    'PASSWORD_TEXT': 'Введите пароль',
    'MSG_WRONG_PASSWORD': 'Неверный логин/пароль',
    'MSG_WRONG_SIGNUP': 'Этот профиль уже создан. Вы будете переведены на страницу авторизации.',
    'MSG_WRONG_SIGNUP_2': 'Этот пользователь не существует. Свяжитесь с администратором.',
    'MSG_WRONG_SIGNUP_3': 'Этот пользователь не имеет административных прав. Свяжитесь с администратором.',
    'MSG_WRONG_SIGNUP_4': 'Пароли должны быть одинаковые. Попробуйте еще раз.',
    'MSG_WRONG_SIGNUP_5': 'Этот пользователь уже авторизован',
    'MSG_WRONG_SIGNUP_6': 'Неверный логин/пароль. Попробуйте снова.',
    'MSG_GEN_ERROR': 'Серверная ошибка. Обратитесь к администратору.',
    'HEADER_USER': 'Пользователь:',
    'HEADER_LOGOUT': 'Выйти',
    'NAV_CONTENT_HOME': 'Главная страница',

    /**
     * Home page edit block
     */

    'CONTENT_HOME_PAGE_HEADER_TITLE': 'Редактирование главной страницы',

    'LBL_SLIDE_01_TITLE': 'Слайд 1: заголовок',
    'OBJ_SLIDE_01_TITLE_PLACEHOLDER': 'Заголовок слайда 1',
    'LBL_SLIDE_01_TEXT': 'Слайд 1: текст',
    'OBJ_SLIDE_01_TEXT_PLACEHOLDER': 'Текст слайда 1',
    'LBL_SLIDE_02_TITLE': 'Слайд 2: заголовок',
    'OBJ_SLIDE_02_TITLE_PLACEHOLDER': 'Заголовок слайда 2',
    'LBL_SLIDE_02_TEXT': 'Слайд 2: текст',
    'OBJ_SLIDE_02_TEXT_PLACEHOLDER': 'Текст слайда 2',
    'LBL_SLIDE_03_TITLE': 'Слайд 3: заголовок',
    'OBJ_SLIDE_03_TITLE_PLACEHOLDER': 'Заголовок слайда 3',
    'LBL_SLIDE_03_TEXT': 'Слайд 3: текст',
    'OBJ_SLIDE_03_TEXT_PLACEHOLDER': 'Текст слайда 3',

    'LBL_HOME_TITLE': 'Заголовок',
    'OBJ_HOME_TITLE_PLACEHOLDER': 'Заголовок',
    'LBL_HOME_BODY_LEAD': 'Ведущий параграф',
    'OBJ_HOME_BODY_LEAD_PLACEHOLDER': 'Ведущий параграф',
    'LBL_HOME_BODY_P_1': '1-ый параграф',
    'OBJ_HOME_BODY_P_1_PLACEHOLDER': '1-ый параграф',
    'LBL_HOME_BODY_P_2': '2-ой параграф',
    'OBJ_HOME_BODY_P_2_PLACEHOLDER': '2-ой параграф',
    'LBL_HOME_BODY_P_3': '3-ий параграф',
    'OBJ_HOME_BODY_P_3_PLACEHOLDER': '3-ий параграф',

    'LBL_HOME_EXCLUSIVE_TITLE': 'Эксклюзивные объекты: Заголовок',
    'OBJ_HOME_EXCLUSIVE_TITLE_PLACEHOLDER': 'Эксклюзивные объекты: Заголовок',
    'LBL_HOME_EXCLUSIVE_H1': 'Эксклюзивные объекты: Подзаголовок 1',
    'OBJ_HOME_EXCLUSIVE_H1_PLACEHOLDER': 'Эксклюзивные объекты: Подзаголовок 1',
    'LBL_HOME_EXCLUSIVE_H2': 'Эксклюзивные объекты: Подзаголовок 2',
    'OBJ_HOME_EXCLUSIVE_H2_PLACEHOLDER': 'Эксклюзивные объекты: Подзаголовок 2',
    'LBL_HOME_EXCLUSIVE_MORE': 'Эксклюзивные объекты: Кнопка',
    'OBJ_HOME_EXCLUSIVE_MORE_PLACEHOLDER': 'Эксклюзивные объекты: Кнопка',

    'LBL_HOME_SHORT_TITLE': 'Посуточная аренда: Заголовок',
    'OBJ_HOME_SHORT_TITLE_PLACEHOLDER': 'Посуточная аренда: Заголовок',
    'LBL_HOME_SHORT_MORE': 'Посуточная аренда: Кнопка',
    'OBJ_HOME_SHORT_MORE_PLACEHOLDER': 'Посуточная аренда: Кнопка',

    'LBL_HOME_LONG_TITLE': 'Долгосрочная аренда: Заголовок',
    'OBJ_HOME_LONG_TITLE_PLACEHOLDER': 'Долгосрочная аренда: Заголовок',
    'LBL_HOME_LONG_MORE': 'Долгосрочная аренда: Кнопка',
    'OBJ_HOME_LONG_MORE_PLACEHOLDER': 'Долгосрочная аренда: Кнопка',

    'LBL_HOME_SALE_TITLE': 'Продажа: Заголовок',
    'OBJ_HOME_SALE_TITLE_PLACEHOLDER': 'Продажа: Заголовок',
    'LBL_HOME_SALE_MORE': 'Продажа: Кнопка',
    'OBJ_HOME_SALE_MORE_PLACEHOLDER': 'Продажа: Кнопка',

    /**
     * Q&A edit block
     */

    'NAV_CONTENT_QA': 'Вопрос-ответ',

    'CONTENT_QA_PAGE_HEADER_TITLE': 'Редактирование страницы Вопрос-ответ',
    'LBL_QA_TITLE': 'Заголовок',
    'OBJ_QA_TITLE_PLACEHOLDER': 'Введите заголовок страницы',
    'BTN_ADD_ELEMENT': 'Добавить',
    'BTN_DEL_ELEMENT': 'Удалить',
    'LBL_Q': 'Вопрос:',
    'LBL_A': 'Ответ:',
    'LBL_QA_Q': 'Вопрос',
    'LBL_QA_A': 'Ответ',

    /**
     * Service edit block
     */

    'NAV_CONTENT_SERVICE': 'Доп. услуги',

    'CONTENT_SERVICE_PAGE_HEADER_TITLE': 'Редактирование страницы Доп. услуги',

    'LBL_SERVICE_TITLE': 'Заголовок',
    'OBJ_SERVICE_TITLE_PLACEHOLDER': 'Введите заголовок страницы',
    'LBL_SERVICE_NAME': 'Наименование',
    'OBJ_SERVICE_NAME_PLACEHOLDER': 'Введите наименование услуги',
    'LBL_SERVICE_SUBNAME': 'Подзаголовок',
    'OBJ_SERVICE_SUBNAME_PLACEHOLDER': 'Введите подзаголовок услуги',
    'LBL_SERVICE_DESC': 'Описание',
    'OBJ_SERVICE_DESC_PLACEHOLDER': 'Введите описание услуги',


    // Footer
    'FOOTER_ABOUT_COMPANY_TITLE': 'О нас',
    'FOOTER_ABOUT_COMPANY_TEXT': 'Лорем ипсум долор сит амет, не дицит легере еос, ' +
    'еос еу волутпат цомпрехенсам, не хас долор омиттам! При утамур сингулис адиписцинг ' +
    'не, не алии ехерци дуо. Тота игнота алияуандо ан яуо, хабео яуидам хендрерит те яуо.',
    'FOOTER_NAVIGATION': 'Навигация',
    'FOOTER_SUBSCRIBE_TITLE': 'Подписаться на новости',
    'FOOTER_SUBSCRIBE_YOUTUBE': 'YouTube',
    'FOOTER_SUBSCRIBE_FACEBOOK': 'Facebook',
    'FOOTER_SUBSCRIBE_TWEETER': 'Tweeter',
    'FOOTER_SUBSCRIBE_GOOGLEPLUS': 'Google Plus',
    'FOOTER_DEVELOPER': 'Разработано',

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
    'LBL_SHOW': 'Показывать объект',
    'LBL_EXCLUSIVE': 'Эксклюзивный объект',
    'LBL_HOME': 'Размещать на главной странице',
    'LBL_CITY': 'Город',
    'LBL_ROOM': 'Кол-во комнат',
    'LBL_OBJ_NUM': 'Номер объекта',
    'LBL_YOUTUBE': 'YouTube',
    'LBL_CALENDAR': 'Календарь',
    'LBL_ADDRESS': 'Адрес',
    'LBL_BATHROOM': 'Сан. узел',
    'LBL_POOL': 'Бассейн',
    'LBL_PRICE': 'Стоимость',
    'LBL_DESCRIPTION': 'Описание',
    'LBL_INFO': 'Доп. информация',
    'OBJ_NUM_PLACEHOLDER': '№ объекта',
    'OBJ_YOUTUBE_PLACEHOLDER': 'YouTube',
    'OBJ_ADDRESS_PLACEHOLDER': 'Введите адрес объекта',
    'OBJ_BATHROOM_PLACEHOLDER': 'Введите описание сан. узла объекта',
    'OBJ_POOL_PLACEHOLDER': 'Введите описание бассейна объекта',
    'OBJ_PRICE_PLACEHOLDER': 'Введите стоимость аренды объекта',
    'OBJ_DESCRIPTION_PLACEHOLDER': 'Введите общее объекта',
    'OBJ_INFO_PLACEHOLDER': 'Введите дополнительную информацию по объекту',
    'OBJ_FROM_PLACEHOLDER': 'Дата начала',
    'OBJ_TO_PLACEHOLDER': 'Дата окончания',
    'BTN_FIND': 'Найти',
    'BTN_CLR': 'Очистить',
    'AV_REQ': 'reqRu',

    // Callback or request forms
    'LBL_FIELD_OBJ': 'Объект',
    'LBL_FIELD_DATE_START': 'Дата начала',
    'LBL_FIELD_DATE_END': 'Дата окончания',
    'LBL_FIELD_DATE_FROM': 'с',
    'LBL_FIELD_DATE_TO': 'по',
    'LBL_FIELD_NAME': 'Ваше имя',
    'LBL_FIELD_EMAIL': 'Email',
    'LBL_FIELD_PHONE': 'Телефон',
    'LBL_FIELD_SKYPE': 'Skype',
    'LBL_FIELD_WHATSAPP': 'WhatsApp',
    'LBL_FIELD_TELEGRAM': 'Telegram',
    'LBL_FIELD_VIBER': 'Viber',
    'LBL_FIELD_ADDINFO': 'Доп. информация',
    'LBL_FIELD_INFO': 'Сообщение',
    'HEADER_INFO_SHORT': 'Запрос информации по краткосрочной аренде',
    'HEADER_INFO_LONG': 'Запрос информации по долгосрочной аренде',
    'HEADER_INFO_LET': 'Предложение по сдаче недвижимости в аренду',
    'HEADER_INFO_BUY': 'Запрос информации по покупке недвижимости',
    'HEADER_INFO_SELL': 'Предложение по продаже недвижимости',
    'HEADER_INFO_GENERAL': 'Отправка сообщения',
    'FIELD_NAME_ERR': 'nameErrRu',
    'FIELD_EMAIL_ERR': 'emailErrRu',
    'BTN_SUBMIT': 'Отправить',
    'HEADER_INFO_MODAL_FOOTER_CLOSE_BUTTON': 'Закрыть',
    'BTN_DELETE_INTERVAL': 'Удалить',
    'BTN_ADD_INTERVAL': 'Добавить интервал',




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