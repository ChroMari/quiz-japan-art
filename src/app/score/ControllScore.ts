import ViewScore from './ViewScore';
import ModelScore from './ModelScore';

class ControllScore {
  view: ViewScore;
  model: ModelScore;

  constructor(view: ViewScore, model: ModelScore) {
    this.view = view;
    this.model = model;
  }

  showScoreCard = (id: string) => {
    this.view.showComponent('Score');
    let start = Number(id) * 10;
    const finish = start + 10;

    while (start < finish) {
      const item = (this.model.typeGame === 'person') ? this.model.scoreDate[start] : this.model.scoreDateLocation[start];
      this.view.showCard(start, item.img, item.id, item.game, this.handlerPopup);
      start += 1;
    }
  }

  handlerPopup = (id: string) => {
    const item = (this.model.typeGame === 'person') ? this.model.scoreDate[Number(id)] : this.model.scoreDateLocation[Number(id)];
    this.view.showPopup(item.name, item.img, item.anime, item.year, item.info);
  }
}

export default ControllScore;
