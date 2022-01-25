import createButton from '../abstraction/createButton';
import createElement from '../abstraction/createElement';
import createRange from '../abstraction/createRange';

import {volumeSVG, muteSVG} from './SVG';

class ViewSetting {
  title: HTMLElement;
  headerButtons: HTMLElement;
  setting: HTMLElement;
  homeButton: HTMLButtonElement;
  buttonEffectVolume: HTMLButtonElement;
  inputEffectVolume: HTMLInputElement;
  buttonSongVolume: HTMLButtonElement;
  inputSongVolume: HTMLInputElement;
  timeToggleText: HTMLElement;
  switchGame: HTMLInputElement;
  buttonTimeMinus: HTMLButtonElement;
  buttonTimePlus: HTMLButtonElement;
  spanTimeNumber: HTMLElement;
  buttonDefault: HTMLButtonElement;
  buttonSave: HTMLButtonElement;
  popup: HTMLElement;
  buttonNoSave: HTMLButtonElement;
  buttonYesSave: HTMLButtonElement;
  overlay: HTMLElement;

  constructor(title: HTMLElement, headerButtons: HTMLElement, mainWrapper: HTMLElement,
              popup: HTMLElement, overlay: HTMLElement) {
    this.title = title;
    this.headerButtons = headerButtons;
    this.setting = mainWrapper;
    this.overlay = overlay;

    this.homeButton = createButton('Home', ['button']);

    this.buttonEffectVolume = createButton('', ['setting__button-volume']);
    this.buttonEffectVolume.innerHTML = volumeSVG;
    this.inputEffectVolume = createRange(['setting__range']);

    this.buttonSongVolume = createButton('', ['setting__button-volume']);
    this.buttonSongVolume.innerHTML = volumeSVG;
    this.inputSongVolume = createRange(['setting__range']);

    this.timeToggleText = createElement('p', ['setting__text-game']);
    this.timeToggleText.textContent = 'on';

    this.switchGame = document.createElement('input');
    this.switchGame.type = 'checkbox';
    this.switchGame.checked = true;

    this.buttonTimeMinus = createButton('-', ['setting__button']);
    this.spanTimeNumber = createElement('span', ['setting__text', 'setting__text-time']);
    this.spanTimeNumber.textContent = '20';
    this.buttonTimePlus = createButton('+', ['setting__button']);

    this.buttonDefault = createButton('Default', ['button']);
    this.buttonSave = createButton('Save', ['button']);

    this.popup = popup;

    this.buttonNoSave = createButton('No', ['button']);
    this.buttonYesSave = createButton('Yes', ['button']);
  }

  hidePopup() {
    this.popup.classList.remove('active');
    this.overlay.classList.remove('active');
  }

  showPopup() {
    this.popup.classList.add('active');
    this.overlay.classList.add('active');
    this.popup.innerHTML = '';
    this.popup.innerHTML = `<p class="popup__text">Are you sure you want to return to the home page? Your settings will not be saved and revert to their original state.</p>
            <p class="popup__text popup__text_buttom">Save data before going to home page?</p>`;
    const div = createElement('span', ['settings__buttons', 'popup__buttons']);
    div.append(this.buttonNoSave, this.buttonYesSave);
    this.popup.append(div);
  }

  showComponent() {
    this.setting.classList.add('setting');

    this.title.textContent = 'Setting';
    this.headerButtons.innerHTML = '';
    this.headerButtons.append(this.homeButton);

    this.setting.innerHTML = '';

    const titleVolume = createElement('h3', ['setting__title']);
    titleVolume.textContent = 'Volume';

    const volumeWrapper = createElement('div', ['setting__wrapper']);
    const volumeDiv = createElement('div', ['']);
    const volumeEffectTitle = createElement('h4', ['setting__text']);
    volumeEffectTitle.textContent = 'Volume effect game';
    const volumeRow = createElement('div', ['setting__row']);
    volumeRow.append(this.buttonEffectVolume, this.inputEffectVolume);
    volumeDiv.append(volumeEffectTitle, volumeRow);

    const volumeDivSong = createElement('div', ['']);
    const volumeSongTitle = createElement('h4', ['setting__text']);
    volumeSongTitle.textContent = 'Volume song';
    const volumeRowSong = createElement('div', ['setting__row']);
    volumeRowSong.append(this.buttonSongVolume, this.inputSongVolume);
    volumeDivSong.append(volumeSongTitle, volumeRowSong);
    volumeWrapper.append(volumeDiv, volumeDivSong);

    const titleGame = createElement('h3', ['setting__title']);
    titleGame.textContent = 'Game';

    const gameWrapper = createElement('div', ['setting__wrapper']);
    const timeDiv = createElement('div', ['']);
    const timeTitle = createElement('h4', ['setting__text']);
    timeTitle.textContent = 'time game';
    const timeRow = createElement('div', ['setting__row']);
    const label = createElement('label', ['switch']);
    const spanLabel = createElement('span', ['slider', 'round']);
    label.append(this.switchGame, spanLabel);

    timeRow.append(this.timeToggleText, label);
    timeDiv.append(timeTitle, timeRow);

    const timeNumberDiv = createElement('div', ['']);
    const timeNumberTitle = createElement('h4', ['setting__text']);
    timeNumberTitle.textContent = 'time to answer';
    const timeNumberRow = createElement('div', ['setting__row']);

    timeNumberRow.append(this.buttonTimeMinus, this.spanTimeNumber, this.buttonTimePlus);
    timeNumberDiv.append(timeNumberTitle, timeNumberRow);

    gameWrapper.append(timeDiv, timeNumberDiv);

    const divButton = createElement('div', ['settings__buttons']);
    divButton.append(this.buttonDefault, this.buttonSave);

    this.setting.append(titleVolume, volumeWrapper, titleGame, gameWrapper, divButton);

    setTimeout(() => {
      this.setting.classList.add('setting-active');
    }, 130);
  }

  backgroundInputEffect(value: number) {
    this.inputEffectVolume.value = String(value);
    this.inputEffectVolume.style.background = `linear-gradient(to right, #8A67F7 0%, #8A67F7 ${value * 10}%, #fff ${value * 10}%, #fff 100%)`;
    if (value === 0) this.buttonEffectVolume.innerHTML = muteSVG;
    else if (value !== 0) this.buttonEffectVolume.innerHTML = volumeSVG;
  }

  backgroundInputSong(value: number) {
    this.inputSongVolume.value = String(value);
    this.inputSongVolume.style.background = `linear-gradient(to right, #8A67F7 0%, #8A67F7 ${value * 10}%, #fff ${value * 10}%, #fff 100%)`;
    if (value === 0) this.buttonSongVolume.innerHTML = muteSVG;
    else if (value !== 0) this.buttonSongVolume.innerHTML = volumeSVG;
  }

  bindButtonVolume(handler: (type: number) => boolean) {
    this.buttonEffectVolume.onclick = () => {
      if (handler(0)) this.backgroundInputEffect(5);
      else this.backgroundInputEffect(0);
    };
    this.buttonSongVolume.onclick = () => {
      if (handler(1)) this.backgroundInputSong(5);
      else this.backgroundInputSong(0);
    };
  }

  bindRangeVolume(handler: (type: number, value: number) => void) {
    let mousedownVolume = false;

    this.inputEffectVolume.onpointermove = () => {
      if (mousedownVolume) {
        const value = Number(this.inputEffectVolume.value);
        handler(0, value);
        this.backgroundInputEffect(value);
      }
    };

    this.inputEffectVolume.onclick = () => {
      const value = Number(this.inputEffectVolume.value);
      handler(0, value);
      this.backgroundInputEffect(value);
    };

    this.inputEffectVolume.onpointerdown = () => {
      mousedownVolume = true;
    };

    this.inputEffectVolume.onpointerup = () => {
      mousedownVolume = false;
    };

    this.inputSongVolume.onpointermove = () => {
      if (mousedownVolume) {
        const value = Number(this.inputSongVolume.value);
        handler(1, value);
        this.backgroundInputSong(value);
      }
    };

    this.inputSongVolume.onclick = () => {
      const value = Number(this.inputSongVolume.value);
      handler(1, value);
      this.backgroundInputSong(value);
    };

    this.inputSongVolume.onpointerdown = () => {
      mousedownVolume = true;
    };

    this.inputSongVolume.onpointerup = () => {
      mousedownVolume = false;
    };
  }

  bindSwitchGame(handler: () => void) {
    this.switchGame.onclick = () => {
      handler();
      if (this.switchGame.checked) this.timeToggleText.textContent = 'on';
      else this.timeToggleText.textContent = 'off';
    };
  }

  bindButtonTime(handler: (type: string) => void) {
    this.buttonTimeMinus.onclick = () => {
      this.spanTimeNumber.textContent = String(handler('minus'));
    };
    this.buttonTimePlus.onclick = () => {
      this.spanTimeNumber.textContent = String(handler('plus'));
    };
  }

  bindSaveButton(handler: () => void) {
    this.buttonSave.onclick = () => {
      handler();
      this.popup.innerHTML = '<p class="popup__text">The data has been successfully saved.</p>';
      this.popup.classList.add('active');
      this.overlay.classList.add('active');
      setTimeout(() => {
        this.popup.classList.remove('active');
        this.overlay.classList.remove('active');
      }, 1000);
    };
  }

  updateComponent(valueEffect: number, valueSong: number, activeGame: boolean, time: number) {
    this.backgroundInputEffect(valueEffect * 10);
    this.backgroundInputSong(valueSong * 10);

    this.switchGame.checked = activeGame;
    this.timeToggleText.textContent = (activeGame) ? 'on' : 'off';
    this.spanTimeNumber.textContent = String(time);
  }

  bindResetButton(handler: () => void) {
    this.buttonDefault.onclick = () => {
      handler();
      this.popup.innerHTML = '<p class="popup__text">Data has been successfully reset to standard.</p>';
      this.popup.classList.add('active');
      this.overlay.classList.add('active');
      setTimeout(() => {
        this.popup.classList.remove('active');
        this.overlay.classList.remove('active');
      }, 1000);
    };
  }
}

export default ViewSetting;
