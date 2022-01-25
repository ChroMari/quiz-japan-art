export interface Idate {
  img: string,
  numberQuestion: number
}

export interface ISetting {
  activeVolumeSong: boolean,
  activeVolumeGame: boolean,
  rangeVolumeSong: number,
  rangeVolumeGame: number,
  activeTimeGame: boolean,
  timeNumber: number,
}

export interface IdateGame {
  id: string,
  anime: string,
  year: string,
  name: string,
  info: string,
  img: string,
  game: boolean,
}

export interface Ianswer {
  id: string,
  active: boolean,
}