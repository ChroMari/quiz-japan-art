import srcSong from '../../assets/song.mp3';
import btnSong from '../../assets/btn-song.mp3';
import yesSong from '../../assets/yes-song.mp3';
import noSong from '../../assets/no-song.mp3';
import gameFinish from '../../assets/gameFinish.mp3';
import {ISetting} from '../abstaraction-types/interfaces'

class ModelSetting {
  audioSong: HTMLAudioElement;
  gameSong: HTMLAudioElement;
  settingGame: ISetting;
  minTime: number;
  maxTime: number;
  saveSettingGame: boolean;

  constructor() {
    this.audioSong = new Audio();
    this.audioSong.src = srcSong;
    this.audioSong.preload = 'auto';
    this.audioSong.loop = true;

    this.gameSong = new Audio();
    this.gameSong.src = srcSong;
    this.gameSong.preload = 'auto';

    this.minTime = 5;
    this.maxTime = 30;
    this.saveSettingGame = true;

    this.settingGame = ModelSetting.localDate();
  }

  static localDate(): ISetting {
    const date = localStorage.getItem('chromari-setting');

    if (date) return JSON.parse(date);

    return ({
      activeVolumeSong: true,
      activeVolumeGame: true,
      rangeVolumeSong: 0.5,
      rangeVolumeGame: 0.5,
      activeTimeGame: true,
      timeNumber: 20,
    });
  }

  resetDate() {
    this.settingGame.activeVolumeSong = true;
    this.settingGame.activeVolumeGame = true;
    this.settingGame.rangeVolumeSong = 0.5;
    this.settingGame.rangeVolumeGame = 0.5;
    this.settingGame.activeTimeGame = true;
    this.settingGame.timeNumber = 20;

    this.saveSettingGame = true;
    this.commit();
  }

  saveDate() {
    this.saveSettingGame = true;
    this.commit();
  }

  commit() {
    localStorage.setItem('chromari-setting', JSON.stringify(this.settingGame));
  }

  toggleVolumeMute(type: number) {
    if (type === 0) {
      this.settingGame.activeVolumeGame = !this.settingGame.activeVolumeGame;
      this.gameSong.volume = (this.settingGame.activeVolumeGame) ? 0.5 : 0;
      this.settingGame.rangeVolumeGame = this.gameSong.volume;
    } else if (type === 1) {
      this.settingGame.activeVolumeSong = !this.settingGame.activeVolumeSong;
      this.audioSong.volume = (this.settingGame.activeVolumeSong) ? 0.5 : 0;
      this.settingGame.rangeVolumeSong = this.audioSong.volume;
    }

    this.saveSettingGame = false;
  }

  updateVolume(type: number, value: number) {
    if (type === 0) {
      this.settingGame.rangeVolumeGame = value / 10;
      this.gameSong.volume = this.settingGame.rangeVolumeGame;
      if (value === 0 && this.settingGame.activeVolumeGame) {
        this.settingGame.activeVolumeGame = false;
      } else if (value !== 0 && !this.settingGame.activeVolumeGame) {
        this.settingGame.activeVolumeGame = true;
      }
    } else if (type === 1) {
      this.settingGame.rangeVolumeSong = value / 10;
      this.audioSong.volume = this.settingGame.rangeVolumeSong;
      if (value === 0 && this.settingGame.activeVolumeSong) {
        this.settingGame.activeVolumeSong = false;
      } else if (value !== 0 && !this.settingGame.activeVolumeSong) {
        this.settingGame.activeVolumeSong = true;
      }
    }
    this.clickSongButton();
    this.saveSettingGame = false;
  }

  toggleGame() {
    this.settingGame.activeTimeGame = !this.settingGame.activeTimeGame;
    this.saveSettingGame = false;
  }

  updateTimeNumber(type: string): number {
    if (type === 'minus') {
      if (this.settingGame.timeNumber - 5 >= this.minTime) this.settingGame.timeNumber -= 5;
    } else if (type === 'plus') {
      if (this.settingGame.timeNumber + 5 <= this.maxTime) this.settingGame.timeNumber += 5;
    }

    this.saveSettingGame = false;
    return this.settingGame.timeNumber;
  }

  clickSongButton = () => {
    this.gameSong.pause();
    this.gameSong.src = btnSong;
    this.gameSong.currentTime = 0;
    this.gameSong.play();
  }

  clickEffectSongClick = (type: string) => {
    this.gameSong.pause();
    if (type === 'yes') this.gameSong.src = yesSong;
    else if (type === 'error') this.gameSong.src = noSong;
    else if (type === 'click') this.gameSong.src = btnSong;
    else if (type === 'finish') this.gameSong.src = gameFinish;
    this.gameSong.currentTime = 0;
    this.gameSong.play();
  }

  noSave() {
    this.audioSong.volume = 0;
    return ModelSetting.localDate();
  }
}

export default ModelSetting;
