import './style.sass';

import createElement from './app/abstraction/createElement';
import createImg from './app/abstraction/createImg';
import createLink from './app/abstraction/createLink';

import logoImg from './assets/image/logo.png';
import rsImg from './assets/svg/rs.svg';

import ViewHome from './app/home/ViewHome';
import ControllerHome from './app/home/ControllerHome';

import ViewSetting from './app/setting/ViewSetting';
import ModelSetting from './app/setting/ModelSetting';
import ControllSetting from './app/setting/ControllSetting';

import ViewCategories from './app/categories/ViewCategories';
import ModelCategorie from './app/categories/ModelCategorie';
import ControllerCategorie from './app/categories/ControllCategorie';

import ViewScore from './app/score/ViewScore';
import ModelScore from './app/score/ModelScore';
import ControllScore from './app/score/ControllScore';

import ViewGame from './app/game/ViewGame';
import ModelGame from './app/game/ModelGame';
import ControllGame from './app/game/ControllGame';

const TIME_SETTIMOUT = 130;

const app: HTMLElement | null = document.querySelector('#app');

const header = createElement('header', ['header']);
const headerWrapper = createElement('div', ['wrapper', 'header__wrapper']);
const logo = createImg(logoImg, 'logo', ['']);
const title = createElement('p', ['header__title']);
const headerButtons = createElement('div', ['header__buttons']);
header.append(headerWrapper);
headerWrapper.append(logo, title, headerButtons);

const main = createElement('main', ['main', 'home']);
const mainWrapper = createElement('div', ['wrapper']);
main.append(mainWrapper);

const footer = createElement('footer', ['footer']);
const footerWrapper = createElement('div', ['wrapper', 'footer__wrapper']);
footer.append(footerWrapper);
const footerImg = createImg(rsImg, 'rs school', ['footer__logo']);
const footerImgLink = document.createElement('a');
footerImgLink.href = 'https://rs.school/js/';
footerImgLink.target = '_blank';
footerImgLink.append(footerImg);
const link = createLink('github: chromari', 'https://github.com/ChroMari', ['footer__author']);
(link as HTMLLinkElement).target = '_blank';
const text = createElement('p', ['footer__text']);
text.textContent = '2021';

const overlay = createElement('div', ['overlay']);
const popup = createElement('div', ['popup']);

footerWrapper.append(footerImgLink, link, text);

const viewHomeClass = new ViewHome(title, headerButtons, mainWrapper);
const controllerHomeClass = new ControllerHome(viewHomeClass);

const viewSettingClass = new ViewSetting(title, headerButtons, mainWrapper, popup, overlay);
const modelSettingClass = new ModelSetting();
const controllSettingClass = new ControllSetting(viewSettingClass, modelSettingClass);

const viewCategoriesClass = new ViewCategories(title, headerButtons, mainWrapper);
const modelCategorieClass = new ModelCategorie();
const controllerCategorieClass = new ControllerCategorie(viewCategoriesClass, modelCategorieClass);

const viewScoreClass = new ViewScore(title, headerButtons, mainWrapper, popup, overlay);
const modelScoreClass = new ModelScore();
const controllScoreClass = new ControllScore(viewScoreClass, modelScoreClass);

const viewGameClass = new ViewGame(title, headerButtons, mainWrapper, popup, overlay);
const modelGameClass = new ModelGame();
const controllGameClass = new ControllGame(viewGameClass, modelGameClass);

const songButton = () => modelSettingClass.clickSongButton();

const settingClose = () => {
  setTimeout(() => {
    viewSettingClass.setting.classList.remove('setting', 'setting-active');
    controllerHomeClass.displayComponent();
  }, TIME_SETTIMOUT);
};

const categorie = (type: string) => {
  songButton();
  const date = (type === 'person') ? modelScoreClass.scoreDate : modelScoreClass.scoreDateLocation;
  const activeTime = modelSettingClass.settingGame.activeTimeGame;
  const time = modelSettingClass.settingGame.timeNumber;

  modelScoreClass.typeGame = type;

  controllGameClass.startGame(type, date, activeTime, time, modelSettingClass.clickEffectSongClick);
  controllerCategorieClass.showComponent(modelSettingClass.clickSongButton, type,
    controllScoreClass.showScoreCard, controllGameClass.showComponent);
};

viewHomeClass.settingsButton.onclick = () => {
  songButton();
  viewHomeClass.hideComponent();
  setTimeout(() => controllSettingClass.displayComponent(), TIME_SETTIMOUT);
};

viewSettingClass.homeButton.onclick = () => {
  songButton();
  if (!modelSettingClass.saveSettingGame) viewSettingClass.showPopup();
  else settingClose();
};

viewSettingClass.buttonNoSave.onclick = () => {
  songButton();
  viewSettingClass.hidePopup();
  controllSettingClass.handlerUpdateComponent();
  settingClose();
};

viewSettingClass.buttonYesSave.onclick = () => {
  songButton();
  viewSettingClass.hidePopup();
  controllSettingClass.handlerSaveGame();
  settingClose();
};

viewHomeClass.sceneButton.onclick = () => categorie('scene');

viewHomeClass.personButton.onclick = () => categorie('person');

viewCategoriesClass.buttonHome.onclick = () => {
  songButton();
  setTimeout(() => controllerHomeClass.displayComponent(), TIME_SETTIMOUT);
};

viewScoreClass.homeButton.onclick = () => {
  modelSettingClass.clickSongButton();
  setTimeout(() => controllerHomeClass.displayComponent(), TIME_SETTIMOUT);
};

viewScoreClass.categorieButton.onclick = () => {
  modelSettingClass.clickSongButton();

  const date = (modelCategorieClass.activeCategoria === 'person') ? modelScoreClass.scoreDate : modelScoreClass.scoreDateLocation;
  const activeTime = modelSettingClass.settingGame.activeTimeGame;
  const time = modelSettingClass.settingGame.timeNumber;

  controllGameClass.startGame(modelCategorieClass.activeCategoria, date,
    activeTime, time, modelSettingClass.clickEffectSongClick);
  controllerCategorieClass.showComponent(modelSettingClass.clickSongButton,
    modelCategorieClass.activeCategoria, controllScoreClass.showScoreCard,
    controllGameClass.showComponent);
};

if (app) {
  app.append(header, main, footer, popup, overlay);

  viewScoreClass.closePopupButton.onclick = () => {
    modelSettingClass.clickSongButton();
    viewScoreClass.popup.classList.remove('popup-scoor', 'active');
    viewScoreClass.overlay.classList.remove('active');
    app.classList.remove('app-active-popup');
  };

  viewGameClass.buttonCategoriaResult.onclick = () => {
    modelSettingClass.clickSongButton();
    modelCategorieClass.updateCategorieDate(modelCategorieClass.activeCategoria,
      modelGameClass.activeGameTema, modelGameClass.allDate);

    modelGameClass.resultGame.forEach((item) => {
      modelScoreClass.updateScore(modelCategorieClass.activeCategoria,
        Number(item.id), item.active);
    });

    viewGameClass.popup.classList.remove('answer__active');
    controllerCategorieClass.showComponent(
      modelSettingClass.clickSongButton,
      modelCategorieClass.activeCategoria, controllScoreClass.showScoreCard,
      controllGameClass.showComponent,
    );
  };

  viewGameClass.homeButton.onclick = () => {
    controllGameClass.stopGame();
    setTimeout(() => controllerHomeClass.displayComponent(), TIME_SETTIMOUT);
    modelSettingClass.clickSongButton();
  };

  viewGameClass.categoriaButton.onclick = () => {
    modelSettingClass.clickSongButton();
    controllGameClass.stopGame();

    controllerCategorieClass.showComponent(modelSettingClass.clickSongButton,
      modelCategorieClass.activeCategoria,
      controllScoreClass.showScoreCard, controllGameClass.showComponent);
  };

  window.onload = () => {
    controllerHomeClass.displayComponent();
  };

  const song = () => {
    modelSettingClass.audioSong.play();
    document.removeEventListener('click', song);
  };

  document.addEventListener('click', song);
}

console.log(`
  Адаптив приложения есть с 1920 до 360. После 360 за кривость не отвечаю) Хорошей игры и погружения в миры Миядзаки и студии Гибли ^_^.

  - Стартовая страница и навигация +20/20:
    - [✓] вёрстка, дизайн, UI стартовой страницы приложения. Выполняются требования к вёрстке и оформлению приложения +10;
            На стартовой странице есть кнопка, при клике по которой открываются настройки викторины, и две кнопки, при кликах по которым можно выбрать тип вопроса:
              - угадать персонажа по картинке.
              - угадать локацию по названию.
    - [✓] реализована навигация по страницам приложения +10
           - со стартовой страницы при клике по кнопке с типом вопроса пользователь попадает на страницу категорий выбранного типа вопросов. Со страницы категорий пользователь может вернуться на стартовую страницу приложения.
           - со страницы категорий при клике по карточке категории пользователь попадает на страницу с вопросами категории. На карточке сыгранной категории есть кнопка, при клике по которой пользователь попадает на страницу с результатами прохождения раунда. Со страницы с вопросами и со страницы с результатами пользователь может вернуться на страницу категорий или на стартовую страницу приложения.
  ------

  - Настройки +40/40:
    - [✓] в настройках есть возможность включать/выключать звук, есть регулятор громкости звука. Если звук включён, есть звуковая индикация разная для правильных и неправильных ответов, звуковое сопровождение окончания раунда +10.
    - [✓] в настройках есть возможность включать/выключать игру на время. Если выбрана игра на время, на странице с вопросами викторины отображается таймер, отсчитывающий время, которое отведено для ответа на вопрос +10.
    - [✓] в настройках можно указать время для ответа на вопрос в интервале от 5 до 30 секунд с шагом в 5 секунд. Если время истекает, а ответа нет, это засчитывается как неправильный ответ на вопрос +10.
    - [✓] при перезагрузке страницы приложения выбранные настройки сохраняются +10.
  ------

  - Страница категорий +30/30:
    - [✓] вёрстка, дизайн, UI страницы категории. Выполняются требования к вёрстке и оформлению приложения +10.
           - на странице категорий размещаются карточки категорий.
           - карточки категорий могут иметь названия, или их можно просто пронумеровать.
           - карточки категорий вопросов про художников и про картины внешне отличаются между собой, например, в их оформлении использутся разные изображения.
    - [✓] карточка сыгранной категории внешне отличается от карточки категории, которая ещё не игралась +10.
    - [✓] на карточке сыгранной категории отображается результат прохождения раунда - количество вопросов, на которые был дан правильный ответ +10.
  ------

  - Страница с вопросами +50/50:
    - [✓] вёрстка, дизайн, UI страницы с вопросами. Выполняются требования к вёрстке и оформлению приложения +10.
    - [✓] варианты ответов на вопросы генерируются случайным образом +10.
    - [✓] правильным и неправильным ответам пользователя соответствуют индикаторы разного цвета +10.
    - [✓] после того, как ответ выбран, появляется модальное окно с правильным ответом на вопрос и кнопкой "Продолжить". При клике по кнопке "Продолжить" пользователь переходит к следующему вопросу категории +10.
    - [✓] после окончания раунда выводится уведомление об окончании раунда и его результат - количество вопросов, на которые был дан правильный ответ. Есть кнопка "Продолжить" при клике по которой пользователь перенаправляется на страницу категорий данного типа вопросов +10.
  ------

  - Страница с результатами +50/50:
     - [✓] вёрстка, дизайн, UI страницы с результатами. Выполняются требования к вёрстке и оформлению приложения +10.
     - [✓] страница с результатами содержит превью всех картин категории +10.
     - [✓] картины, на вопросы про которые или про их авторов был дан правильный ответ, цветные; картины, на вопросы про которые или про их авторов был дан неправильный ответ, черно-белые +10.
     - [✓] при клике по карточке выводится информация о ней  +10.
     - [✓] если раунд переигрывался, и результаты изменились, эти изменения отображаются на странице с результатами +10.
  ------

  - Плавная смена изображений; картинки сначала загружаются, потом отображаются; нет ситуации, когда пользователь видит частично загрузившиеся изображения. Плавную смену изображений не проверяем: 1) при загрузке и перезагрузке приложения 2) при открытой консоли браузера +10/10.
  ------

  - Реализована анимация отдельных деталей интерфейса, также анимированы переходы и взаимодействия, чтобы работа с приложением шла плавным и непрерывным потоком +20/20:
     - [✓] При наведение на кнопку типа вопросов игры, превью на странице изменяется в зависимости от того на какую кнопку навел пользователь.
     - [✓] появление главной страницы и страницы с настройками имеют разную анимацию появления.
     - [✓] карточки в категории появляются с анимацией одна за другой.
     - [✓] все модальные окна появляются с анимацией и на искосок от левого угла.
  ------

  - Дополнительный функционал на выбор:
     - [✓] фоновая музыка и отдельный пункт в настройках (вкл/выкл и громкость) для неё +2

  ИТОГ: 222 БАЛЛА.
  `);
