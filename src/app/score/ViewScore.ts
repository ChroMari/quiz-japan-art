import createElement from '../abstraction/createElement';
import createImg from '../abstraction/createImg';
import createButton from '../abstraction/createButton';

class ViewScore {
  title: HTMLElement;
  handerButtons: HTMLElement;
  score: HTMLElement;
  popup: HTMLElement;
  wrapperCategorie: HTMLElement;
  homeButton: HTMLButtonElement;
  categorieButton: HTMLButtonElement;
  overlay: HTMLElement;
  closePopupButton: HTMLButtonElement;

  constructor(title: HTMLElement, headerButtons: HTMLElement,
              mainWrapper: HTMLElement, popup: HTMLElement, overlay: HTMLElement) {
    this.title = title;
    this.score = mainWrapper;
    this.handerButtons = headerButtons;
    this.popup = popup;
    this.wrapperCategorie = createElement('div', ['categorie']);
    this.overlay = overlay;

    this.homeButton = createButton('Home', ['button']);
    this.categorieButton = createButton('Categorie', ['button']);

    this.closePopupButton = createButton('Close', ['button', 'button-scoor']);
  }

  showComponent(titleText: string) {
    this.title.textContent = titleText;
    this.score.innerHTML = '';
    this.score.append(this.wrapperCategorie);
    this.handerButtons.innerHTML = '';
    this.handerButtons.append(this.homeButton, this.categorieButton);
    this.wrapperCategorie.innerHTML = '';
  }

  showPopup(title: string, src: string, anime: string, year: string, info: string) {
    const app = document.querySelector('#app');
    if (app) app.classList.add('app-active-popup');

    this.popup.classList.add('popup-scoor');
    this.overlay.classList.add('active');
    const img = new Image();
    img.src = `./public/${src}.jpg`;
    img.classList.add('popup__img-scoor');

    this.popup.innerHTML = `<h3 class="popup__title-scoor">${title}</h3>`;
    this.popup.classList.add('active');
    this.popup.append(img);
    this.popup.innerHTML += `<p class="popup__subtitle-scoor"> ${anime} <span>(${year})</span></p>`;
    this.popup.innerHTML += `<p class="popup__text-scoor">${info}</p>`;

    this.popup.append(this.closePopupButton);
  }

  showCard(index: number, src: string, id: string,
           activeCard: boolean, handler: (idz: string) => void) {
    const card = createElement('div', ['categorie-card', 'card-scoor']);
    const img = createImg(`./public/${src}.jpg`, src, ['scoor-card__img']);

    card.append(img);

    if (activeCard) {
      img.classList.add('active');
      card.addEventListener('click', () => handler(id));
    }
    this.wrapperCategorie.append(card);

    setTimeout(() => {
      card.classList.add('active-animation');
    }, 120 * (index + 1));
  }
}

export default ViewScore;
