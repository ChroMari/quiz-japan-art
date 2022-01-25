import { IdateGame, Ianswer } from '../abstaraction-types/interfaces';

class ModelGame {
  date: Array<IdateGame>;
  dateScene: Array<IdateGame>;
  allDate: number;
  gameTime: boolean;
  pauseGame: number;
  activeGameTema: number;
  time: number;
  actualQuestion: number;
  answerActual: IdateGame;
  answerGame: Array<IdateGame>;
  resultGame: Array<Ianswer>;
  gameType: string;

  constructor() {
    this.date = [];

    this.allDate = 0;
    this.gameTime = false;
    this.pauseGame = 2;
    this.activeGameTema = 0;
    this.gameType = '';
    this.time = 20;
    this.actualQuestion = 0;

    this.answerActual = {
      id: '',
      anime: '',
      year: '',
      name: '',
      info: '',
      img: '',
      game: false,
    };
    this.answerGame = [];

    this.resultGame = [];
  }

  resultQuestion(id: number): boolean {
    this.actualQuestion += 1;

    if (id === Infinity) {
      this.resultGame.push({
        id: this.answerActual.id,
        active: false,
      });
      return false;
    }

    if (this.answerActual.id === this.answerGame[id].id) {
      this.allDate += 1;
      this.resultGame.push({
        id: this.answerActual.id,
        active: true,
      });
      return true;
    }
    this.resultGame.push({
      id: this.answerActual.id,
      active: false,
    });
    return false;
  }

  getAnswerGameActual() {
    this.answerActual = this.date[this.activeGameTema * 10 + this.actualQuestion];

    let i = 0;
    this.answerGame = [];
    this.answerGame.push(this.answerActual);

    while (i !== 3) {
      const index = Math.floor(Math.random() * this.date.length);
      const answerDate = this.date[index];
      const newItem = this.answerGame.find((data) => data.name === answerDate.name);
      if (!newItem) {
        this.answerGame.push(answerDate);
        i += 1;
      }
    }

    this.answerGame = this.answerGame.sort(() => Math.random() - 0.5);
  }
}

export default ModelGame;
