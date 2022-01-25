import createButton from '../abstraction/createButton';
import createElement from '../abstraction/createElement';
import  { IdateGame } from '../abstaraction-types/interfaces';

class ViewGame {
  title: HTMLElement;
  headerButtons: HTMLElement;
  game: HTMLElement;
  popup: HTMLElement;
  time: HTMLElement;
  levels: Array<HTMLElement>;
  gameTitleQuestion: HTMLElement;
  img: HTMLImageElement;
  answers: Array<HTMLElement>;
  answersImgs: Array<HTMLImageElement>;
  buttonCategoriaResult: HTMLButtonElement;
  homeButton: HTMLButtonElement;
  categoriaButton: HTMLButtonElement;
  overlay: HTMLElement;

  constructor(title: HTMLElement, headerButtons: HTMLElement,
              mainWrapper: HTMLElement, popup: HTMLElement, overlay: HTMLElement) {
    this.title = title;
    this.headerButtons = headerButtons;
    this.game = mainWrapper;
    this.popup = popup;
    this.overlay = overlay;

    this.time = createElement('p', ['game__title']);
    this.levels = [];
    this.gameTitleQuestion = createElement('p', ['game__title']);

    this.img = new Image();
    this.answers = [];
    this.answersImgs = [];

    this.buttonCategoriaResult = createButton('Next', ['button', 'button__itog']);

    this.homeButton = createButton('Home', ['button']);
    this.categoriaButton = createButton('Categoria', ['button']);
  }

  showPopupResult(all: number) {
    this.popup.innerHTML = `<p class="itog__title">The game has come to an end, thanks for playing.</p>
      <h3 class="itog__text">${all}/10</h3>`;
    this.popup.classList.add('answer__active');
    this.popup.append(this.buttonCategoriaResult);
  }

  showPopup(type: string, activeGame: boolean,
            index: number, id: number, date: IdateGame, handler: () => void) {
    this.popup.innerHTML = '';

    const p = document.createElement('p');

    if (activeGame) {
      this.levels[index].classList.add('game__answer_yes');
      if (type === 'person') this.answers[id].classList.add('game__answer_yes');
      else this.answersImgs[id].classList.add('game__answers-img_yes');
      p.classList.add('popup-answer__yes');
      p.textContent = 'right';
    } else {
      this.levels[index].classList.add('game__answer_error');
      if (id !== Infinity && type === 'person') this.answers[id].classList.add('game__answer_error');
      else if (id !== Infinity && type === 'scene') this.answersImgs[id].classList.add('game__answers-img_error');
      p.classList.add('popup-answer__no');
      p.textContent = 'wrong';
    }

    this.popup.classList.add('answer__active');
    this.overlay.classList.add('active');

    const img = new Image();
    img.src = `./public/${date.img}.jpg`;
    img.classList.add('answer__img');
    const name = createElement('p', ['']);
    name.textContent = date.name;
    name.classList.add('answer__title');

    const buttonNext = createButton('Next', ['button', 'button__next']);
    buttonNext.onclick = () => {
      this.overlay.classList.remove('active');
      this.popup.classList.remove('answer__active');
      handler();
    };

    this.popup.append(p, img, name, buttonNext);
  }

  showPopupPauseGame(pause: number, handlerStart: () => void) {
    this.popup.innerHTML = '';
    this.popup.innerHTML = '<p class="itog__title">The game is paused, you can have tea or coffee and take a break.</p>';
    this.popup.innerHTML += `<h3 class="itog__text">You also have the ${pause} option to pause the game.</h3>`;
    this.popup.classList.add('answer__active');
    this.overlay.classList.add('active');
    const button = createButton('game', ['button']);
    button.onclick = () => {
      handlerStart();
      this.popup.classList.remove('answer__active');
      this.overlay.classList.remove('active');
    };
    this.popup.append(button);
  }

  showComponent(type: string, activeTime: boolean, handlerPause: (typez: string) => void) {
    this.answersImgs = [];

    this.answers = [];
    this.levels = [];
    this.img.classList.add('game__img-one');

    this.title.textContent = 'Game';
    this.game.innerHTML = '';

    this.headerButtons.innerHTML = '';
    this.headerButtons.append(this.homeButton, this.categoriaButton);

    if (activeTime) {
      this.game.append(this.time);
      this.time.textContent = '00:00';
      this.time.onclick = () => handlerPause('game');
    }

    const ul = createElement('ul', ['levels']);
    for (let i = 0; i < 10; i += 1) {
      const li = createElement('li', ['level']);
      this.levels.push(li);
      ul.append(li);
    }

    const divWrapper = createElement('div', ['game__wrapper']);
    const answer = createElement('div', ['game__answers']);

    if (type !== 'person') answer.classList.add('game__answers-img');

    for (let i = 0; i < 4; i += 1) {
      const p = createElement('p', ['game__answer']);

      const img = new Image();
      img.classList.add('game__answer-img');
      this.answers.push(p);
      this.answersImgs.push(img);
      if (type === 'person') answer.append(p);
      else answer.append(img);
    }

    if (type === 'person') divWrapper.append(this.img, answer);
    else divWrapper.append(answer);

    this.game.append(ul, this.gameTitleQuestion, divWrapper);
  }

  showQuestion(type: string, src: string,
               answersName: Array<string>, handler: (index: number) => void) {
    if (type === 'person') {
      this.answers.forEach((item) => {
        item.classList.remove('game__answer_yes');
        item.classList.remove('game__answer_error');
        return item;
      });
    } else {
      this.answersImgs.forEach((item) => {
        item.classList.remove('game__answers-img_yes');
        item.classList.remove('game__answers-img_error');
        return item;
      });
    }

    if (type === 'person') {
      this.img.src = `./public/${src}.jpg`;
      this.gameTitleQuestion.textContent = 'What is the name of the character in the picture?';
    } else this.gameTitleQuestion.textContent = `Indicate which picture is the place "${src}"`;

    if (type === 'person') {
      this.answers.forEach((item, index) => {
        const p = item;
        p.textContent = answersName[index];
        p.onclick = () => handler(index);
      });
    } else {
      this.answersImgs.forEach((item, index) => {
        const img = item;
        img.src = `./public/${answersName[index]}.jpg`;
        img.onclick = () => handler(index);
      });
    }
  }
}

export default ViewGame;
