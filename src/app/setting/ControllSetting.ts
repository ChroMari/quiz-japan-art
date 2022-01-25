import ModelSetting from './ModelSetting';
import ViewSetting from './ViewSetting';

class ControllSetting {
  model: ModelSetting;
  view: ViewSetting;

  constructor(view: ViewSetting, model: ModelSetting) {
    this.model = model;
    this.view = view;

    this.view.bindButtonVolume(this.handlerButtonVolume);
    this.view.bindRangeVolume(this.handlerRangeVolume);

    this.view.bindSwitchGame(this.handlerSwitchGame);
    this.view.bindButtonTime(this.handlerButtonTime);
    this.view.bindSaveButton(this.handlerSaveGame);
    this.view.bindResetButton(this.handlerResetComponent);

    this.handlerUpdateComponent();
  }

  displayComponent() {
    this.view.showComponent();
  }

  handlerButtonVolume = (type: number): boolean => {
    this.model.clickSongButton();
    this.model.toggleVolumeMute(type);
    if (type === 0) return this.model.settingGame.activeVolumeGame;
    return this.model.settingGame.activeVolumeSong;
  };

  handlerRangeVolume = (type: number, value: number) => this.model.updateVolume(type, value);

  handlerSwitchGame = () => this.model.toggleGame();

  handlerButtonTime = (type: string): number => {
    this.model.clickSongButton();
    return this.model.updateTimeNumber(type);
  };

  handlerSaveGame = () => {
    this.model.clickSongButton();
    this.model.saveDate();
  }

  handlerUpdateComponent = () => {
    this.model.settingGame = this.model.noSave();
    this.model.saveSettingGame = true;
    const {
      rangeVolumeSong, rangeVolumeGame, activeTimeGame, timeNumber,
    } = this.model.settingGame;
    this.view.updateComponent(rangeVolumeGame, rangeVolumeSong, activeTimeGame, timeNumber);
    this.model.gameSong.volume = rangeVolumeGame;
    this.model.audioSong.volume = rangeVolumeSong;
  };

  handlerResetComponent = () => {
    this.model.clickSongButton();
    this.model.resetDate();
    const { rangeVolumeSong, rangeVolumeGame } = this.model.settingGame;
    this.model.gameSong.volume = rangeVolumeGame;
    this.model.audioSong.volume = rangeVolumeSong;
    this.handlerUpdateComponent();
  }
}

export default ControllSetting;
