import ViewGame from './ViewGame';
import ModelGame from './ModelGame';
import { IdateGame } from '../abstaraction-types/interfaces';

class ControllGame {
  view: ViewGame;
  model: ModelGame;
  idTimer: NodeJS.Timer;
  pauseGame: number;
  songGame: (type: string) => void;
  timePause: number;

  constructor(view: ViewGame, model: ModelGame) {
    this.view = view;
    this.model = model;

    this.idTimer;
    this.pauseGame = 2;
    this.songGame;
    this.timePause = 0;
  }

  stopGame() {
    this.stopTimer();
    this.model.actualQuestion = 0;
  }

  startGame(type: string, date: Array<IdateGame>, activeTime: boolean,
    time: number, songGame: (typez: string) => void) {
    this.model.date = date;
    this.model.gameTime = activeTime;
    this.model.time = time;
    this.songGame = songGame;
    this.model.gameType = type;
    this.pauseGame = 2;
    this.timePause = 0;
  }

  handlerNextQuestion = () => {
    this.songGame('click');
    this.view.popup.classList.remove('active');

    if (this.model.actualQuestion === 10) {
      this.stopTimer();
      this.songGame('finish');
      this.view.showPopupResult(this.model.allDate);
    } else this.newSetQuestion();
  };

  answerGame = (id: number) => {
    this.stopTimer();
    const isActual = this.model.resultQuestion(id);
    if (isActual) this.songGame('yes');
    else this.songGame('error');
    this.view.showPopup(this.model.gameType, isActual,
      this.model.actualQuestion - 1, id, this.model.answerActual, this.handlerNextQuestion);
  };

  stopTimer() {
    clearInterval(this.idTimer);
    this.timePause = Number(this.view.time.textContent.split(':')[1]);
  }

  pauseGameTime = (type: string) => {
    if (type === 'game') {
      if (this.pauseGame !== 0) {
        this.pauseGame -= 1;
        this.stopTimer();
        this.view.showPopupPauseGame(this.pauseGame, this.timerGame);
      }
    }
  }

  timerGame = () => {
    let activeTimeNumber = this.timePause;

    this.idTimer = setInterval(() => {
      this.view.time.textContent = `00:${activeTimeNumber}`;
      activeTimeNumber -= 1;
      if (activeTimeNumber < 0) this.answerGame(Infinity);
    }, 1000);
  };

  newSetQuestion() {
    let activeTimeNumber = this.model.time;
    this.view.time.textContent = `00:${activeTimeNumber}`;
    if (this.model.gameTime) {
      this.idTimer = setInterval(() => {
        this.view.time.textContent = `00:${activeTimeNumber}`;
        activeTimeNumber -= 1;
        if (activeTimeNumber < 0) this.answerGame(Infinity);
      }, 1000);
    }

    this.model.getAnswerGameActual();

    const answersName: Array<string> = [];
    if (this.model.gameType === 'person') this.model.answerGame.forEach((item) => answersName.push(item.name));
    else this.model.answerGame.forEach((item) => answersName.push(item.img));
    const img = (this.model.gameType === 'person') ? this.model.answerActual.img : this.model.answerActual.name;

    this.view.showQuestion(this.model.gameType, img, answersName, this.answerGame);
  }

  showComponent = (type: string) => {
    this.model.activeGameTema = Number(type);
    const activeTime = this.model.gameTime;
    this.view.showComponent(this.model.gameType, activeTime, this.pauseGameTime);

    this.model.actualQuestion = 0;
    this.newSetQuestion();
  };
}

export default ControllGame;
