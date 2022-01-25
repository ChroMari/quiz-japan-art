import date from '../date';
import dateLocation from '../date-location';
import { IdateGame } from '../abstaraction-types/interfaces';

class ModelScore {
  scoreDate: Array<IdateGame>;

  scoreDateLocation: Array<IdateGame>;

  typeGame: string;

  constructor() {
    this.scoreDate = ModelScore.localDate('person');
    this.scoreDateLocation = ModelScore.localDate('location');
    this.typeGame = '';
  }

  commit() {
    localStorage.setItem('chromari-date', JSON.stringify(this.scoreDate));
    localStorage.setItem('chromari-date-location', JSON.stringify(this.scoreDateLocation));
  }

  static localDate(type: string): Array<IdateGame> {
    let dates;
    if (type === 'person') dates = localStorage.getItem('chromari-date');
    else dates = localStorage.getItem('chromari-date-location');

    if (dates) return JSON.parse(dates);
    return (type === 'person') ? date : dateLocation;
  }

  updateScore(type: string, idQuestion: number, active: boolean) {
    if (type === 'preson') {
      if (active) this.scoreDate[idQuestion].game = true;
      else this.scoreDate[idQuestion].game = false;
    } else if (active) this.scoreDateLocation[idQuestion].game = true;
    else this.scoreDateLocation[idQuestion].game = false;
    this.commit();
  }
}

export default ModelScore;
