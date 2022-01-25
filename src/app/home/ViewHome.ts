import createButton from '../abstraction/createButton';
import createElement from '../abstraction/createElement';
import createImg from '../abstraction/createImg';

import scene from '../../assets/image/scene.jpg';
import person from '../../assets/image/person_2.jpg';

class ViewHome {
  title: HTMLElement;
  buttons: HTMLElement;
  settingsButton: HTMLButtonElement;
  main: HTMLElement;
  containerImgs: HTMLElement;
  sceneImg: HTMLImageElement;
  personImg: HTMLImageElement;
  containerButtons: HTMLElement;
  sceneButton: HTMLButtonElement;
  personButton: HTMLButtonElement;

  constructor(title: HTMLElement, headerButtons: HTMLElement, main: HTMLElement) {
    this.title = title;
    this.buttons = headerButtons;
    this.settingsButton = createButton('Setting', ['button']);

    this.main = main;
    this.containerImgs = createElement('div', ['home__images']);
    this.sceneImg = createImg(scene, 'scene', ['img-scene']);
    this.personImg = createImg(person, 'personage', ['img-scene', 'img-personage']);
    this.containerImgs.append(this.sceneImg, this.personImg);

    this.containerButtons = createElement('div', ['home__buttons']);
    this.sceneButton = createButton('Scene', ['button']);
    this.personButton = createButton('Personage', ['button']);
    this.containerButtons.append(this.sceneButton, this.personButton);
  }

  hideComponent() {
    this.containerImgs.classList.add('active');
    this.containerButtons.classList.add('active');
  }

  showComponent() {
    this.title.textContent = 'Home';
    this.buttons.innerHTML = '';
    this.buttons.append(this.settingsButton);

    this.main.innerHTML = '';

    this.containerImgs.classList.add('active');
    this.containerButtons.classList.add('active');
    this.main.append(this.containerImgs, this.containerButtons);

    setTimeout(() => {
      this.containerImgs.classList.remove('active');
      this.containerButtons.classList.remove('active');
    }, 130);
  }

  bindButtonHover() {
    this.personButton.onpointerover = () => this.personImg.classList.add('active-person');
    this.personButton.onpointerout = () => this.personImg.classList.remove('active-person');

    this.sceneButton.onpointerover = () => this.personImg.classList.add('active-scene');
    this.sceneButton.onpointerout = () => this.personImg.classList.remove('active-scene');
  }
}

export default ViewHome;
