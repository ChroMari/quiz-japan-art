import createElement from '../abstraction/createElement';
import createImg from '../abstraction/createImg';
import createButton from '../abstraction/createButton';

class ViewCategories {
  title: HTMLElement;
  categorie: HTMLElement;
  wrapperCategorie: HTMLElement;
  headerButtons: HTMLElement;
  buttonHome: HTMLElement;

  constructor(title: HTMLElement, headerButtons: HTMLElement, categorie: HTMLElement) {
    this.title = title;
    this.categorie = categorie;
    this.wrapperCategorie = createElement('div', ['categorie']);
    this.headerButtons = headerButtons;
    this.buttonHome = createButton('Home', ['button']);
  }

  showError() {
    const div = createElement('div', ['card-error']);
    const p = createElement('p', ['card-error__text']);
    p.textContent = 'Something went wrong. Update the page';
    this.categorie.classList.add('categorie_error');
    div.append(p);
    this.categorie.append(div);
  }

  showComponent() {
    this.title.textContent = 'Categories';
    this.categorie.innerHTML = '';
    this.wrapperCategorie.innerHTML = '';
    this.categorie.append(this.wrapperCategorie);
    this.headerButtons.innerHTML = '';
    this.headerButtons.append(this.buttonHome);
  }

  showCard(index: number, src: string, activeQuestion: number, handlerScore: (id: string) => void,
           handlerGame: (type: string) => void, handlerClick: () => void) {
    const card = createElement('div', ['categorie-card']);
    const img = createImg(`./public/${src}.jpg`, src, ['categorie-card__img']);
    const divInfo = createElement('div', ['categorie-card__info']);
    const categorieNumber = createElement('span', ['categorie-card__title']);
    categorieNumber.textContent = (index + 1 < 10) ? `0${index + 1}` : `${index + 1}`;
    const scoor = createElement('p', ['categorie-card__button']);
    scoor.textContent = 'Scroor';
    const button = createButton('Play', ['categorie-card__play']);
    const question = createElement('p', ['categorie-card__text']);
    question.textContent = `${activeQuestion}/10`;

    divInfo.append(categorieNumber);
    card.append(img, divInfo, button);

    if (activeQuestion > 0) {
      card.classList.add('active');
      img.classList.add('active');
      divInfo.classList.add('active');
      divInfo.append(scoor, question);
      divInfo.addEventListener('click', () => {
        handlerClick();
        const id = String(index);
        handlerScore(id);
      });
    }

    img.onclick = () => {
      handlerClick();
      const type = String(index);
      handlerGame(type);
    };

    setTimeout(() => {
      card.classList.add('active-animation');
    }, 100 * (index + 1));

    this.wrapperCategorie.append(card);
  }
}

export default ViewCategories;
